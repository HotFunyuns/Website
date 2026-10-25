// Regression checks for the Search Console "not indexed" reasons fixed in
// October 2026. Each check maps to a reason in the Pages report, so a future
// change that reintroduces one fails here before Google notices.
//
//   node scripts/audit-search-console-regressions.mjs           local: out/ and the catalog
//   node scripts/audit-search-console-regressions.mjs --live    also probe production
//   options: --site <origin>   another origin for --live (default production)
//
// Local (needs `npm run build`):
//   L1  favicon.ico exists and is a real ICO file           (404: /favicon.ico)
//   L2  every sitemap URL is https apex, slash-terminated, has no query string,
//       maps to an emitted page that is not noindex and canonicalises to itself
//                                                          (duplicate / alternate canonical)
//   L3  no RSC sidecar out/**/index.txt ships              (uncanonicalisable 200 duplicates)
//   L4  the 404 page is noindex                             (soft 404s)
//   L5  no two catalog apps share a package ID              (duplicate app pages)
// Live:
//   R1  /favicon.ico answers 200 with an image type
//   R2  http://, http://www. and https://www. reach the https apex in one 301  (Page with redirect)
//   R3  an http:// deep link redirects to its https twin                       (Alternate page)
//   R4  the AppAgg referral URL answers 200 with the homepage canonical, and
//       robots.txt does not block it (Google must see the canonical)
//   R5  an unknown path answers 404, not a soft 200
//   R6  <page>/index.txt answers 404
//   R7  robots.txt names the sitemap
//
// Exit 0 when every check passes, 1 otherwise.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const APEX = 'https://reigncreativellc.com';
const args = process.argv.slice(2);
const live = args.includes('--live');
const siteArg = args.indexOf('--site');
const SITE = (siteArg >= 0 ? args[siteArg + 1] : APEX).replace(/\/$/, '');

const results = [];
const check = (id, ok, detail) => results.push({ id, ok: Boolean(ok), detail });

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const canonicalOf = (html) => /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(html)?.[1] ?? null;
const isNoindex = (html) => /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);

// ---------------------------------------------------------------- local
if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

{
  const ico = join(OUT, 'favicon.ico');
  const bytes = existsSync(ico) ? readFileSync(ico) : null;
  check('L1 favicon.ico', bytes && bytes.length > 0 && bytes[0] === 0 && bytes[1] === 0 && bytes[2] === 1 && bytes[3] === 0,
    bytes ? `${bytes.length} bytes` : 'missing');
}

{
  const sitemap = existsSync(join(OUT, 'sitemap.xml')) ? readFileSync(join(OUT, 'sitemap.xml'), 'utf8') : '';
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const problems = [];
  for (const url of urls) {
    if (!url.startsWith(`${APEX}/`)) { problems.push(`${url}: not on the https apex`); continue; }
    const path = url.slice(APEX.length);
    if (path.includes('?') || path.includes('#')) { problems.push(`${url}: query or fragment`); continue; }
    if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) { problems.push(`${url}: no trailing slash`); continue; }
    const file = path.endsWith('/') ? join(OUT, ...path.split('/').filter(Boolean), 'index.html') : join(OUT, ...path.split('/').filter(Boolean));
    if (!existsSync(file)) { problems.push(`${url}: no emitted page`); continue; }
    if (!file.endsWith('.html')) continue;
    const html = readFileSync(file, 'utf8');
    if (isNoindex(html)) problems.push(`${url}: listed in the sitemap but noindex`);
    const canonical = canonicalOf(html);
    if (canonical !== url) problems.push(`${url}: canonical is ${canonical}`);
  }
  check('L2 sitemap URLs are canonical, indexable pages', urls.length > 0 && problems.length === 0,
    `${urls.length} URLs${problems.length ? `; ${problems.length} problem(s): ${problems.slice(0, 5).join(' | ')}` : ''}`);
}

{
  const sidecars = walk(OUT).filter((f) => f.endsWith(`${sep}index.txt`) || relative(OUT, f) === 'index.txt');
  check('L3 no RSC index.txt sidecars', sidecars.length === 0, `${sidecars.length} found`);
}

{
  const page = join(OUT, '404.html');
  check('L4 404 page is noindex', existsSync(page) && isNoindex(readFileSync(page, 'utf8')), existsSync(page) ? '' : 'missing');
}

{
  const dir = join(ROOT, 'src', 'data', 'apps', 'catalog');
  const seen = new Map();
  const dupes = [];
  for (const name of readdirSync(dir)) {
    const src = readFileSync(join(dir, name), 'utf8');
    for (const m of src.matchAll(/play\.google\.com\/store\/apps\/details\?id=([A-Za-z0-9._]+)/g)) {
      const pkg = m[1];
      const where = `${name}`;
      if (seen.has(pkg) && seen.get(pkg) !== where) dupes.push(pkg);
      seen.set(pkg, where);
    }
  }
  check('L5 catalog package IDs unique across files', dupes.length === 0, `${seen.size} packages${dupes.length ? `; duplicates: ${dupes.join(', ')}` : ''}`);
}

// ---------------------------------------------------------------- live
async function get(url, redirect = 'manual') {
  const response = await fetch(url, { redirect, headers: { 'User-Agent': 'ReignCreativeRegressionCheck/1.0' } });
  const body = redirect === 'manual' && response.status >= 300 && response.status < 400 ? '' : await response.text();
  return { status: response.status, location: response.headers.get('location'), type: response.headers.get('content-type') ?? '', body };
}

if (live) {
  try {
    const r = await fetch(`${SITE}/favicon.ico`, { headers: { 'User-Agent': 'ReignCreativeRegressionCheck/1.0' } });
    check('R1 /favicon.ico live', r.status === 200 && /image\//.test(r.headers.get('content-type') ?? ''), `${r.status} ${r.headers.get('content-type')}`);
  } catch (e) { check('R1 /favicon.ico live', false, e.message); }

  if (SITE === APEX) {
    for (const origin of ['http://reigncreativellc.com/', 'http://www.reigncreativellc.com/', 'https://www.reigncreativellc.com/']) {
      try {
        const r = await get(origin);
        check(`R2 ${origin} → apex`, r.status === 301 && r.location === `${APEX}/`, `${r.status} → ${r.location}`);
      } catch (e) { check(`R2 ${origin} → apex`, false, e.message); }
    }
    try {
      const deep = 'http://reigncreativellc.com/apps/pro-basketball-draft-gm-mode/';
      const r = await get(deep);
      check('R3 http deep link → https twin', r.status === 301 && r.location === `${APEX}/apps/pro-basketball-draft-gm-mode/`, `${r.status} → ${r.location}`);
    } catch (e) { check('R3 http deep link → https twin', false, e.message); }
  }

  try {
    const r = await get(`${SITE}/?from=AppAgg.com&utm_campaign=AppAgg.com&utm_medium=referral&utm_source=AppAgg.com`, 'follow');
    const canonical = canonicalOf(r.body);
    const robots = await get(`${SITE}/robots.txt`, 'follow');
    const blocksQuery = /^\s*Disallow:\s*\/\*?\?/im.test(robots.body) || /^\s*Disallow:\s*\/\?from/im.test(robots.body);
    check('R4 AppAgg referral URL canonicalises to the homepage', r.status === 200 && canonical === `${APEX}/` && !blocksQuery,
      `${r.status}, canonical ${canonical}${blocksQuery ? ', robots.txt blocks query URLs' : ''}`);
  } catch (e) { check('R4 AppAgg referral URL', false, e.message); }

  try {
    const r = await get(`${SITE}/this-page-does-not-exist-${Date.now()}/`, 'follow');
    check('R5 unknown path is a real 404', r.status === 404, `${r.status}`);
  } catch (e) { check('R5 unknown path', false, e.message); }

  try {
    const r = await get(`${SITE}/blog/index.txt`, 'follow');
    const r2 = await get(`${SITE}/index.txt`, 'follow');
    check('R6 index.txt sidecars answer 404', r.status === 404 && r2.status === 404, `/blog/index.txt ${r.status}, /index.txt ${r2.status}`);
  } catch (e) { check('R6 index.txt', false, e.message); }

  try {
    const robots = await get(`${SITE}/robots.txt`, 'follow');
    check('R7 robots.txt names the sitemap', robots.status === 200 && /Sitemap:\s*https:\/\/reigncreativellc\.com\/sitemap\.xml/i.test(robots.body), `${robots.status}`);
  } catch (e) { check('R7 robots.txt', false, e.message); }
}

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? 'ok  ' : 'FAIL'}  ${r.id}${r.detail ? `  (${r.detail})` : ''}`);
}
console.log(failed ? `\n${failed} regression check(s) failed` : `\nall ${results.length} regression checks passed`);
process.exit(failed ? 1 : 0);
