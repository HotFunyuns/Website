// Canonical-URL regression test for the exported `out/` directory.
//
// GitHub Pages serves this site as plain files. It cannot send a redirect, a
// `rel=canonical` HTTP header or an `X-Robots-Tag`, so the `<link
// rel="canonical">` inside each page is the *only* canonicalisation signal the
// site has. This script asserts that signal is intact on every emitted page.
//
// Checks
//   1. exactly one <link rel="canonical"> per page
//   2. it is absolute, https, and on reigncreativellc.com
//   3. it self-references — it equals the page's own output path
//   4. it resolves to something that actually exists in out/
//   5. no unexpected noindex
//   6. canonical, og:url and the JSON-LD page URL agree, trailing slash included
//   7. no first-party URL anywhere in canonical / OG / JSON-LD points at
//      github.io, vercel.app, localhost or http://
//
// Run: node scripts/audit-canonicals.mjs

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');
const SITE = 'https://reigncreativellc.com';

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

// Pages that deliberately break a rule above. Each entry names the rule it is
// exempt from and why, so an unexplained exemption cannot be added quietly.
const EXEMPT = new Map([
  [
    '/404.html',
    'GitHub Pages not-found handler. Carries noindex and deliberately no canonical: ' +
      'it answers for every unknown path, so a self-canonical would be a lie and a ' +
      'canonical to / would claim the homepage. See src/app/not-found.tsx.',
  ],
  [
    '/apps/82-0-pro-basketball-draft/',
    'Retired URL for a renamed app. Canonicals to the replacement page on purpose — ' +
      'GitHub Pages cannot serve the 301 this should be. See docs/url-normalization-audit.md.',
  ],
]);

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
const routeOf = (f) => `/${rel(f).replace(/index\.html$/, '')}`;

const problems = [];
const fail = (m) => problems.push(m);

const files = walk(OUT);
const html = files.filter((f) => f.endsWith('.html'));
const outPaths = new Set(files.map(rel));

// Does a site URL correspond to something out/ actually ships?
function resolves(url) {
  let pathname;
  try {
    pathname = new URL(url).pathname;
  } catch {
    return false;
  }
  const clean = pathname.replace(/^\//, '');
  if (clean === '') return outPaths.has('index.html');
  if (clean.endsWith('/')) return outPaths.has(`${clean}index.html`);
  return outPaths.has(clean);
}

const FORBIDDEN = [
  [/https?:\/\/[a-z0-9-]+\.github\.io/i, 'a github.io host'],
  [/https?:\/\/[a-z0-9-]+\.vercel\.app/i, 'a vercel.app host'],
  [/https?:\/\/localhost(?::\d+)?/i, 'localhost'],
  [/http:\/\/reigncreativellc\.com/i, 'http:// (not https) on the production host'],
];

// `aomediacodec.github.io` is a real, cited external source, so the github.io
// rule only fires on a URL that is trying to be one of *our* pages.
const looksFirstParty = (url) =>
  /reigncreativellc/i.test(url) || /localhost/i.test(url) || /\.vercel\.app/i.test(url);

let checked = 0;
let exempted = 0;
let withCanonical = 0;
const canonicals = new Set();

for (const file of html) {
  const route = routeOf(file);
  const label = basename(file) === 'index.html' ? route : `/${rel(file)}`;
  const doc = readFileSync(file, 'utf8');

  const exemptReason = EXEMPT.get(label);
  const canonicalTags = [...doc.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
  const ogUrl = /<meta property="og:url" content="([^"]*)"/.exec(doc)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(doc);

  /* ------------------------------------------------ JSON-LD first-party URLs */

  const ldUrls = [];
  let ldPageUrl;
  for (const block of doc.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch (err) {
      fail(`${label}: JSON-LD block is not valid JSON — ${err.message}`);
      continue;
    }
    const visit = (node) => {
      if (Array.isArray(node)) return node.forEach(visit);
      if (!node || typeof node !== 'object') return;
      for (const [key, value] of Object.entries(node)) {
        if (typeof value === 'string' && /^https?:\/\//.test(value)) ldUrls.push([key, value]);
        else visit(value);
      }
    };
    visit(data);

    // The entity that describes *this page* rather than the site as a whole.
    const type = Array.isArray(data?.['@type']) ? data['@type'][0] : data?.['@type'];
    if (type && !['Organization', 'WebSite', 'BreadcrumbList', 'FAQPage'].includes(type)) {
      ldPageUrl = data.url ?? data.mainEntityOfPage?.['@id'] ?? ldPageUrl;
    }
  }

  const everyUrl = [...canonicalTags, ogUrl, ...ldUrls.map(([, u]) => u)].filter(Boolean);
  for (const url of everyUrl) {
    for (const [pattern, description] of FORBIDDEN) {
      if (pattern.test(url) && looksFirstParty(url)) fail(`${label}: URL uses ${description} — ${url}`);
    }
  }

  if (exemptReason) {
    exempted++;
    // Even an exempt page must not point anywhere that does not exist.
    for (const url of canonicalTags) {
      if (!resolves(url)) fail(`${label}: canonical points at a route not present in out/ — ${url}`);
    }
    continue;
  }

  checked++;

  /* --------------------------------------------------------- canonical rules */

  if (canonicalTags.length !== 1) {
    fail(`${label}: expected exactly one <link rel="canonical">, found ${canonicalTags.length}`);
    continue;
  }
  const canonical = canonicalTags[0];
  withCanonical++;
  canonicals.add(canonical);

  if (!canonical.startsWith(`${SITE}/`) && canonical !== SITE) {
    fail(`${label}: canonical is not an absolute URL on ${SITE} — ${canonical}`);
    continue;
  }

  const expected = `${SITE}${route}`;
  if (canonical !== expected) fail(`${label}: canonical does not self-reference — expected ${expected}, got ${canonical}`);
  if (!resolves(canonical)) fail(`${label}: canonical points at a route not present in out/ — ${canonical}`);
  if (noindex) fail(`${label}: unexpected noindex on an indexable page`);

  /* ------------------------------------------ cross-signal trailing-slash agreement */

  if (!ogUrl) fail(`${label}: no og:url`);
  else if (ogUrl !== canonical) fail(`${label}: og:url disagrees with canonical — og:url=${ogUrl} canonical=${canonical}`);

  if (ldPageUrl && ldPageUrl !== canonical) {
    fail(`${label}: JSON-LD page URL disagrees with canonical — jsonld=${ldPageUrl} canonical=${canonical}`);
  }

  /* --------------------------------- every first-party JSON-LD URL must be real */

  for (const [key, url] of ldUrls) {
    if (!url.startsWith(SITE)) continue;
    // The site-level entities legitimately use the bare origin and #fragment ids.
    if (url === SITE || url === `${SITE}/` || url.includes('#')) continue;
    if (!/\.[a-z0-9]{2,5}$/i.test(url) && !url.endsWith('/')) {
      fail(`${label}: JSON-LD ${key} is a page URL without a trailing slash — ${url}`);
    }
    if (!resolves(url)) fail(`${label}: JSON-LD ${key} points at something not present in out/ — ${url}`);
  }
}

/* ---------------------------------------------------------------- reporting */

console.log(`html pages: ${html.length}   fully checked: ${checked}   documented exemptions: ${exempted}`);
console.log(`distinct canonicals: ${canonicals.size}`);
for (const [route, reason] of EXEMPT) console.log(`  exempt ${route} — ${reason.split('.')[0]}.`);

if (canonicals.size !== withCanonical) {
  fail(
    `${withCanonical} pages carry a canonical but only ${canonicals.size} are distinct — ` +
      'two pages claim the same canonical'
  );
}

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems.slice(0, 40)) console.log(`  ✗ ${p}`);
  if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
  process.exit(1);
}
console.log('\ncanonical audit clean');
