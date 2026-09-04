// Post-build technical SEO audit of the exported `out/` directory.
//
// Everything here is measured from the built HTML rather than from source, so
// it reflects what a crawler would actually receive. It complements
// validate-content.mjs (which guards draft containment and link integrity)
// rather than duplicating it.
//
// Run: node scripts/audit-output.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');
const SITE = 'https://reigncreativellc.com';

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

const problems = [];
const fail = (m) => problems.push(m);

const files = walk(OUT);
const html = files.filter((f) => f.endsWith('.html'));
const rel = (f) => f.slice(OUT.length + 1).split('\\').join('/');
const routeOf = (f) => `/${rel(f).replace(/index\.html$/, '')}`;

const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

/* ------------------------------------------------------ per-page metadata */

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
let jsonLdBlocks = 0;

for (const file of html) {
  const route = routeOf(file);
  const doc = readFileSync(file, 'utf8');
  const indexable = sitemapUrls.has(`${SITE}${route}`);

  const title = /<title>([\s\S]*?)<\/title>/.exec(doc)?.[1]?.trim();
  const desc = /<meta name="description" content="([^"]*)"/.exec(doc)?.[1];
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(doc)?.[1];
  const h1s = [...doc.matchAll(/<h1[\s>]/g)].length;
  const og = /<meta property="og:title"/.test(doc);
  const ogImage = /<meta property="og:image"/.test(doc);
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(doc);
  jsonLdBlocks += [...doc.matchAll(/<script type="application\/ld\+json"/g)].length;

  if (!indexable) continue; // 404 and retired pages are checked separately

  if (!title) fail(`${route}: no <title>`);
  if (!desc) fail(`${route}: no meta description`);
  if (!canonical) fail(`${route}: no canonical`);
  if (canonical && canonical !== `${SITE}${route}`) {
    fail(`${route}: canonical points elsewhere (${canonical})`);
  }
  if (h1s !== 1) fail(`${route}: ${h1s} <h1> elements (expected 1)`);
  if (!og) fail(`${route}: no og:title`);
  if (!ogImage) fail(`${route}: no og:image`);
  if (noindex) fail(`${route}: noindex but present in sitemap`);

  if (title) {
    if (titles.has(title)) fail(`duplicate <title> "${title}" on ${route} and ${titles.get(title)}`);
    titles.set(title, route);
  }
  if (desc) {
    if (descriptions.has(desc)) fail(`duplicate meta description on ${route} and ${descriptions.get(desc)}`);
    descriptions.set(desc, route);
  }
  if (canonical) {
    if (canonicals.has(canonical)) fail(`duplicate canonical ${canonical}`);
    canonicals.set(canonical, route);
  }
}

/* -------------------------------------------- navigation-integrity checks */

// Google's spam policies prohibit interfering with the browser Back button.
//
// Two scopes, deliberately separated. Next.js's App Router uses pushState and a
// popstate listener to implement ordinary client-side navigation, and that is
// what makes Back work in a single-page router rather than what breaks it —
// flagging the framework bundle would be a false positive that trains a reader
// to ignore this check. So the History API rules are enforced against our own
// source, where a genuine trap would have to be written, and the rendered HTML
// is checked separately for markup-level redirects.
const FIRST_PARTY_TRAPS = [
  [/history\.pushState/, 'history.pushState — can create back-button traps'],
  [/addEventListener\(\s*['"]popstate/, 'popstate listener — may intercept Back'],
  [/onbeforeunload|addEventListener\(\s*['"]beforeunload/, 'beforeunload handler — can block navigation away'],
  [/location\.href\s*=\s*['"`]\//, 'location.href assignment to an internal path — use a link or replace()'],
];

const HTML_TRAPS = [
  [/<meta http-equiv="refresh"/i, 'meta refresh redirect — can leave the retired URL in history'],
  [/on(?:beforeunload|popstate)=/i, 'inline navigation handler'],
];

function walkSource(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walkSource(full));
    else if (/\.(?:ts|tsx|js|mjs)$/.test(full)) found.push(full);
  }
  return found;
}

for (const file of walkSource(join(ROOT, 'src'))) {
  const doc = readFileSync(file, 'utf8');
  for (const [pattern, label] of FIRST_PARTY_TRAPS) {
    if (pattern.test(doc)) fail(`${file.slice(ROOT.length + 1)}: ${label}`);
  }
}

for (const file of html) {
  const doc = readFileSync(file, 'utf8');
  for (const [pattern, label] of HTML_TRAPS) {
    if (pattern.test(doc)) fail(`${rel(file)}: ${label}`);
  }
}

/* -------------------------------------------------------- images and alt */

let imgs = 0;
let missingAlt = 0;
let missingDims = 0;
for (const file of html) {
  const doc = readFileSync(file, 'utf8');
  for (const m of doc.matchAll(/<img\b[^>]*>/g)) {
    imgs++;
    if (!/\salt="/.test(m[0])) missingAlt++;
    if (!/\swidth="/.test(m[0]) || !/\sheight="/.test(m[0])) missingDims++;
  }
}
if (missingAlt > 0) fail(`${missingAlt} <img> element(s) without an alt attribute`);
if (missingDims > 0) fail(`${missingDims} <img> element(s) without width and height`);

/* ---------------------------------------------------------------- robots */

const robots = readFileSync(join(OUT, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt does not point at the sitemap');
for (const agent of ['OAI-SearchBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'ChatGPT-User']) {
  const block = new RegExp(`User-agent: ${agent}\\s*\\n\\s*Allow: /`, 'i');
  if (!block.test(robots)) fail(`robots.txt does not explicitly allow ${agent}`);
}
if (/Disallow: \/\s*$/m.test(robots)) fail('robots.txt contains a site-wide Disallow');

/* ------------------------------------------------------------- reporting */

console.log(`pages: ${html.length}   indexable (in sitemap): ${sitemapUrls.size}`);
console.log(`unique titles: ${titles.size}   unique descriptions: ${descriptions.size}   canonicals: ${canonicals.size}`);
console.log(`JSON-LD blocks: ${jsonLdBlocks}   images: ${imgs} (all with alt, width and height)`);

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('\noutput audit clean');
