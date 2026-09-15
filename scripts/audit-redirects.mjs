// URL-surface regression test: asserts that the build ships exactly the URLs it
// is supposed to, and nothing that duplicates them.
//
// This site is a static export on GitHub Pages. Pages serves every file it is
// handed at HTTP 200 and offers exactly one redirect of its own — appending a
// trailing slash to a directory. It cannot serve a 301 we author, cannot run
// middleware, and ignores `vercel.json` and `public/_headers` completely.
// So "controlling our redirects" here means controlling which *files* exist.
//
// Checks (offline, against out/)
//   1. no RSC flight payload (`index.txt`) survives the post-build normaliser
//   2. `out/404.html` exists and `out/404/` does not
//   3. no dead host config (`_headers`, `vercel.json`, `_redirects`) is shipped
//   4. the only text documents shipped are the intentional ones
//   5. the retired app alias still exists, canonicals to a real page, and is
//      absent from the sitemap
//   6. robots.txt keeps the AI search crawlers allowed, points at the sitemap,
//      has no site-wide Disallow, and does not block anything we ship
//
// `--live` additionally probes production and prints the observed status of
// every URL variation documented in docs/url-normalization-audit.md. Live mode
// reports; it does not gate the build, because it depends on the network and on
// a deploy having already happened.
//
// Run: node scripts/audit-redirects.mjs [--live]

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');
const SITE = 'https://reigncreativellc.com';
const LIVE = process.argv.includes('--live');

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

const LEGACY_ALIAS = 'apps/82-0-pro-basketball-draft/';

// Text documents this site publishes on purpose. Anything else ending in .txt
// is either an RSC payload or dead host config that has leaked into out/.
const INTENTIONAL_TEXT = new Set(['robots.txt', 'app-ads.txt', 'llms.txt']);

// Files that configure a host this site is not deployed to. Shipping them means
// publishing a 200-status junk URL and advertising headers nobody serves.
const DEAD_HOST_CONFIG = ['_headers', '_redirects', 'vercel.json', 'netlify.toml', 'staticwebapp.config.json'];

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

const rel = (f) => f.slice(OUT.length + 1).split('\\').join('/');

const problems = [];
const fail = (m) => problems.push(m);

const files = walk(OUT).map(rel);
const fileSet = new Set(files);

/* ------------------------------------------- 1. RSC flight payloads removed */

const payloads = files.filter((f) => basename(f) === 'index.txt');
if (payloads.length > 0) {
  fail(
    `${payloads.length} RSC flight payload(s) still in out/ — each is a 200 text/plain duplicate ` +
      `of its HTML page with no possible canonical. Run \`node scripts/postbuild-normalize-urls.mjs\`. ` +
      `First: ${payloads.slice(0, 3).join(', ')}`
  );
}

/* -------------------------------------------------- 2. the 404 handler only */

if (!fileSet.has('404.html')) fail('out/404.html is missing — GitHub Pages would serve its generic 404 page');
if (files.some((f) => f.startsWith('404/'))) {
  fail('out/404/ exists — GitHub Pages serves it at HTTP 200, which is a soft 404 duplicate of /404.html');
}

/* -------------------------------------------------- 3. no dead host config */

for (const name of DEAD_HOST_CONFIG) {
  if (fileSet.has(name)) {
    fail(
      `out/${name} is shipped. GitHub Pages ignores it but still serves it at ${SITE}/${name} ` +
        'with HTTP 200 — a crawlable junk URL that also advertises headers that are not actually sent.'
    );
  }
}

/* ------------------------------------------------ 4. only intended text docs */

const payloadSet = new Set(payloads);
for (const f of files) {
  if (!f.endsWith('.txt')) continue;
  if (INTENTIONAL_TEXT.has(f)) continue;
  // RSC payloads are already reported once, in aggregate, above.
  if (payloadSet.has(f)) continue;
  fail(`out/${f} is an unexpected text document — it will be served at ${SITE}/${f} with no canonical`);
}
for (const required of INTENTIONAL_TEXT) {
  if (!fileSet.has(required)) fail(`out/${required} is missing`);
}

/* ------------------------------------------------------ 5. the retired alias */

const aliasFile = `${LEGACY_ALIAS}index.html`;
if (!fileSet.has(aliasFile)) {
  fail(`out/${aliasFile} is missing — the retired URL would start returning 404 and lose its inbound links`);
} else {
  const doc = readFileSync(join(OUT, ...aliasFile.split('/')), 'utf8');
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(doc)?.[1];
  if (!canonical) fail(`/${LEGACY_ALIAS} has no canonical — it would be an orphaned duplicate`);
  else {
    const target = canonical.slice(SITE.length).replace(/^\//, '');
    if (!fileSet.has(`${target}index.html`)) {
      fail(`/${LEGACY_ALIAS} canonicals to ${canonical}, which does not exist in out/`);
    }
    if (canonical === `${SITE}/${LEGACY_ALIAS}`) {
      fail(`/${LEGACY_ALIAS} self-canonicals — a retired URL must point at its replacement`);
    }
  }
  if (/<meta name="robots" content="[^"]*noindex/i.test(doc)) {
    fail(
      `/${LEGACY_ALIAS} carries noindex. Combined with a cross-page canonical that strands the ` +
        'retired URL instead of consolidating it onto the replacement.'
    );
  }
  const ogUrl = /<meta property="og:url" content="([^"]*)"/.exec(doc)?.[1];
  if (ogUrl && ogUrl !== canonical) {
    fail(`/${LEGACY_ALIAS} og:url (${ogUrl}) disagrees with its canonical (${canonical})`);
  }
}

if (fileSet.has('sitemap.xml')) {
  const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
  if (sitemap.includes(LEGACY_ALIAS)) {
    fail(`sitemap.xml lists the retired alias /${LEGACY_ALIAS} — a sitemap must only contain canonical URLs`);
  }
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE}/`)) fail(`sitemap.xml lists a URL that is not on ${SITE} — ${loc}`);
    else if (!loc.endsWith('/') && !/\.[a-z0-9]{2,5}$/i.test(loc)) {
      fail(`sitemap.xml lists a page URL without a trailing slash — ${loc}`);
    }
  }
} else {
  fail('out/sitemap.xml is missing');
}

/* ----------------------------------------------------------- 6. robots.txt */

const robots = readFileSync(join(OUT, 'robots.txt'), 'utf8');
for (const agent of ['OAI-SearchBot', 'Claude-SearchBot', 'Claude-User']) {
  if (!new RegExp(`User-agent: ${agent}\\s*\\n\\s*Allow: /`, 'i').test(robots)) {
    fail(`robots.txt does not explicitly allow ${agent}`);
  }
  if (new RegExp(`User-agent: ${agent}\\s*\\n\\s*Disallow: /\\s*$`, 'im').test(robots)) {
    fail(`robots.txt blocks ${agent}`);
  }
}
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt does not point at the sitemap');
// A Disallow is not a canonicalisation tool. Blocking a URL also stops Google
// ever seeing the 404 or the canonical that would actually resolve a duplicate,
// so a Disallow added "to fix duplicates" makes the duplicate permanent.
for (const m of robots.matchAll(/^\s*Disallow:[ 	]*(\S+)[ 	]*$/gm)) {
  if (m[1] === '/') fail('robots.txt contains a site-wide Disallow');
  else fail(`robots.txt disallows ${m[1]} — canonicalisation must not be done with robots.txt`);
}

/* ---------------------------------------------------------------- reporting */

const htmlCount = files.filter((f) => f.endsWith('.html')).length;
console.log(`out/ files: ${files.length}   html pages: ${htmlCount}   rsc payloads: ${payloads.length}`);
const textDocs = files.filter((f) => f.endsWith('.txt') && !payloadSet.has(f));
console.log(`text documents: ${textDocs.join(', ') || 'none'}`);
console.log(`404 handler: ${fileSet.has('404.html') ? 'out/404.html' : 'MISSING'}   /404/ directory: ${files.some((f) => f.startsWith('404/')) ? 'present' : 'absent'}`);

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems.slice(0, 25)) console.log(`  ✗ ${p}`);
  if (problems.length > 25) console.log(`  … and ${problems.length - 25} more`);
  process.exit(1);
}
console.log('\nurl surface audit clean');

/* --------------------------------------------------- optional live probing */

if (!LIVE) {
  console.log('\n(run with --live to probe production; offline checks only above)');
  process.exit(0);
}

const PROBES = [
  ['http://reigncreativellc.com/', 'should 301 to https — needs "Enforce HTTPS" in GitHub Pages settings'],
  [`${SITE}/`, '200'],
  [`${SITE}/index.html`, '200 duplicate of /, consolidated by the canonical inside it'],
  [`${SITE}/index.txt`, '404 once the normaliser has shipped'],
  [`${SITE}/blog/index.txt`, '404 once the normaliser has shipped'],
  [`${SITE}/blog`, '301 to /blog/'],
  [`${SITE}/blog/`, '200'],
  [`${SITE}/BLOG/`, '404 — GitHub Pages paths are case-sensitive'],
  [`${SITE}/404/`, '404 once the normaliser has shipped'],
  [`${SITE}/404.html`, '200 — unavoidable; carries noindex'],
  [`${SITE}/_headers`, '404 once public/_headers is removed'],
  [`${SITE}/${LEGACY_ALIAS}`, '200 with a canonical to the replacement app page'],
  [`${SITE}/this-path-does-not-exist-${Date.now()}/`, '404'],
];

console.log('\nlive production probe');
for (const [url, expectation] of PROBES) {
  let line;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const location = res.headers.get('location') ?? '';
    line = `${res.status}${location ? ` -> ${location}` : ''}  ${res.headers.get('content-type') ?? ''}`;
  } catch (err) {
    line = `request failed: ${err.message}`;
  }
  console.log(`  ${url}\n    observed: ${line}\n    expected: ${expectation}`);
}
