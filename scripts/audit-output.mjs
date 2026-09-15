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
const notes = [];
const fail = (m) => problems.push(m);
/** Recorded and printed, but not a build failure — see the sections that use it. */
const note = (m) => notes.push(m);

const files = walk(OUT);
const html = files.filter((f) => f.endsWith('.html'));
const rel = (f) => f.slice(OUT.length + 1).split('\\').join('/');
const routeOf = (f) => `/${rel(f).replace(/index\.html$/, '')}`;

const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

/* ------------------------------------------------------ per-page metadata */

// Lengths are measured on decoded text. `&amp;` is one character to a reader and
// to Google; counting the five bytes it occupies in the source reports a
// 63-character title as 67 and sends you editing a title that was never long.
const decode = (t) =>
  t
    .replace(/&#x27;|&apos;|&#39;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&');

// Hard limits vs. reported outliers. The hard limits are the points past which
// something is certainly wrong — a title no result can show, a description
// longer than the content spec allows. The softer bounds are printed as
// outliers so the trend is visible without failing a build over a title that is
// two characters long for one SERP layout.
const TITLE_FAIL = 70;
const TITLE_WARN = 60;
const DESC_FAIL_MAX = 160;
const DESC_FAIL_MIN = 60;
const DESC_WARN_MIN = 70;

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const titleOutliers = [];
const descOutliers = [];
let jsonLdBlocks = 0;
let noindexPages = 0;

for (const file of html) {
  const route = routeOf(file);
  const doc = readFileSync(file, 'utf8');
  const indexable = sitemapUrls.has(`${SITE}${route}`);

  const title = /<title>([\s\S]*?)<\/title>/.exec(doc)?.[1]?.trim();
  const desc = /<meta name="description" content="([^"]*)"/.exec(doc)?.[1];
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(doc)?.[1];
  const h1s = [...doc.matchAll(/<h1[\s>]/g)].length;
  const og = /<meta property="og:title"/.test(doc);
  const ogUrl = /<meta property="og:url" content="([^"]*)"/.exec(doc)?.[1];
  const ogDesc = /<meta property="og:description"/.test(doc);
  const ogImage = /<meta property="og:image" content="([^"]*)"/.exec(doc)?.[1];
  const twCard = /<meta name="twitter:card" content="([^"]*)"/.exec(doc)?.[1];
  const twTitle = /<meta name="twitter:title"/.test(doc);
  const twDesc = /<meta name="twitter:description"/.test(doc);
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(doc);
  jsonLdBlocks += [...doc.matchAll(/<script type="application\/ld\+json"/g)].length;
  if (noindex) noindexPages++;

  // Checked on every page, indexable or not. A page that names two different
  // URLs for itself is the exact ambiguity behind "Duplicate without
  // user-selected canonical", and a retired alias or an error page can carry it
  // just as easily as an article. Next.js makes this easy to get wrong: a page
  // that declares no `openGraph` inherits the root layout's, homepage og:url
  // included, while still setting its own canonical.
  if (canonical && ogUrl && canonical !== ogUrl) {
    fail(`${route}: canonical (${canonical}) and og:url (${ogUrl}) disagree`);
  }

  // Absolute URLs pointing at ourselves must use one spelling of this site.
  for (const m of doc.matchAll(/(?:href|content|src)="(https?:\/\/[^"]*reigncreativellc\.com[^"]*)"/g)) {
    if (m[1].startsWith('http://')) fail(`${route}: insecure self-link ${m[1]}`);
    if (/^https:\/\/www\./.test(m[1])) fail(`${route}: www host in ${m[1]}`);
  }

  if (!indexable) continue; // 404 and retired pages are checked separately

  if (!title) fail(`${route}: no <title>`);
  if (!desc) fail(`${route}: no meta description`);
  if (!canonical) fail(`${route}: no canonical`);
  if (canonical && canonical !== `${SITE}${route}`) {
    fail(`${route}: canonical points elsewhere (${canonical})`);
  }
  if (h1s !== 1) fail(`${route}: ${h1s} <h1> elements (expected 1)`);
  if (!og) fail(`${route}: no og:title`);
  if (!ogDesc) fail(`${route}: no og:description`);
  if (!ogUrl) fail(`${route}: no og:url`);
  if (!ogImage) fail(`${route}: no og:image`);
  if (ogImage && !ogImage.startsWith(`${SITE}/`)) fail(`${route}: og:image is not on this site (${ogImage})`);
  if (!twCard) fail(`${route}: no twitter:card`);
  if (twCard && !['summary', 'summary_large_image'].includes(twCard)) {
    fail(`${route}: twitter:card is "${twCard}"`);
  }
  if (!twTitle) fail(`${route}: no twitter:title`);
  if (!twDesc) fail(`${route}: no twitter:description`);
  if (noindex) fail(`${route}: noindex but present in sitemap`);

  if (title) {
    const n = decode(title).length;
    if (n > TITLE_FAIL) fail(`${route}: <title> is ${n} chars — no result will show it`);
    else if (n > TITLE_WARN) titleOutliers.push(`${n}  ${route}`);
    if (titles.has(title)) fail(`duplicate <title> "${title}" on ${route} and ${titles.get(title)}`);
    titles.set(title, route);
  }
  if (desc) {
    const n = decode(desc).length;
    if (n > DESC_FAIL_MAX) fail(`${route}: meta description is ${n} chars (max ${DESC_FAIL_MAX})`);
    else if (n < DESC_FAIL_MIN) fail(`${route}: meta description is only ${n} chars`);
    else if (n < DESC_WARN_MIN) descOutliers.push(`${n}  ${route}`);
    if (descriptions.has(desc)) fail(`duplicate meta description on ${route} and ${descriptions.get(desc)}`);
    descriptions.set(desc, route);
  }
  if (canonical) {
    if (canonicals.has(canonical)) fail(`duplicate canonical ${canonical}`);
    canonicals.set(canonical, route);
  }
}

/* ------------------------------------------- non-HTML text of the same page */

// Next's static export writes an RSC flight payload beside every page as
// `index.txt`. GitHub Pages serves those at 200 text/plain; they carry the
// page's own prose and, being plain text, cannot carry a canonical. That is a
// second addressable copy of every page with no canonical on it — reported here
// because this audit is what measures the exported surface, while the fix
// (removing them from the deployed artefact) belongs to the deploy pipeline.
const rscSidecars = files.filter((f) => rel(f) === 'index.txt' || rel(f).endsWith('/index.txt'));
if (rscSidecars.length) {
  note(
    `${rscSidecars.length} RSC sidecar(s) (out/**/index.txt) ship beside the HTML. ` +
      'Each is a 200 text/plain copy of a page that cannot carry a canonical. ' +
      'Not failed here: removing them is a deploy-pipeline change.'
  );
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

console.log(`pages: ${html.length}   indexable (in sitemap): ${sitemapUrls.size}   noindex: ${noindexPages}`);
console.log(`unique titles: ${titles.size}   unique descriptions: ${descriptions.size}   canonicals: ${canonicals.size}`);
console.log(`JSON-LD blocks: ${jsonLdBlocks}   images: ${imgs} (all with alt, width and height)`);

if (titleOutliers.length) {
  console.log(`\n${titleOutliers.length} title(s) over ${TITLE_WARN} chars — likely truncated in results:`);
  for (const line of titleOutliers.sort((a, b) => parseInt(b, 10) - parseInt(a, 10))) console.log(`  · ${line}`);
}
if (descOutliers.length) {
  console.log(`\n${descOutliers.length} description(s) under ${DESC_WARN_MIN} chars:`);
  for (const line of descOutliers.sort((a, b) => parseInt(a, 10) - parseInt(b, 10))) console.log(`  · ${line}`);
}
if (notes.length) {
  console.log('\nNOTED (not failures):');
  for (const n of notes) console.log(`  ! ${n}`);
}

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('\noutput audit clean');
