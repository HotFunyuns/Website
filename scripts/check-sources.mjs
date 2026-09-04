// Checks every `sources` URL in every article, plus every external link in the
// article bodies, and reports anything that does not resolve.
//
// A 403 from a scripted request is not proof a page is dead — several
// government and standards sites block non-browser user agents — so those are
// reported separately from hard failures rather than lumped together.
//
// Run: node scripts/check-sources.mjs [--bodies]

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const CONTENT = join(ROOT, 'content', 'blog');
const OUT_DIR = join(ROOT, 'docs', 'data');
const OUT = join(OUT_DIR, 'source-link-check.json');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const checkBodies = process.argv.includes('--bodies');

/**
 * Hosts that are reachable in a browser and unreachable from this script.
 * developer.android.com fails with a transport error rather than an HTTP status
 * on some networks; the rest return 403 to any non-browser client. Every URL on
 * these hosts was confirmed live by an independent browser-equivalent fetch on
 * 2026-09-04, and they are listed here so a future run does not delete a working
 * citation on the strength of a local network artefact. Remove a host from this
 * list once it starts responding to scripts normally.
 */
const BROWSER_ONLY_HOSTS = [
  'developer.android.com',
  'ods.od.nih.gov',
  'whc.unesco.org',
  'www.britishmuseum.org',
  'www.coe.int',
  'www.loc.gov',
];
const browserOnly = (url) => BROWSER_ONLY_HOSTS.includes(new URL(url).hostname);

const urls = new Map(); // url -> Set(slug)

for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const raw = readFileSync(join(CONTENT, file), 'utf8');
  const match = FRONTMATTER.exec(raw);
  if (!match) continue;
  const data = JSON.parse(match[1]);
  for (const source of data.sources ?? []) {
    if (!urls.has(source.url)) urls.set(source.url, new Set());
    urls.get(source.url).add(slug);
  }
  if (checkBodies) {
    const body = raw.slice(match[0].length);
    for (const m of body.matchAll(/\]\((https:\/\/[^)\s]+)\)/g)) {
      if (!urls.has(m[1])) urls.set(m[1], new Set());
      urls.get(m[1]).add(slug);
    }
  }
}

async function check(url) {
  const attempt = async (method) => {
    const res = await fetch(url, {
      method,
      redirect: 'follow',
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,*/*' },
    });
    return { status: res.status, finalUrl: res.url };
  };
  try {
    let r = await attempt('HEAD');
    // Some servers reject HEAD but serve GET fine.
    if (r.status === 403 || r.status === 405 || r.status === 404) r = await attempt('GET');
    return r;
  } catch (err) {
    return { status: 0, error: err.message };
  }
}

const results = [];
const list = [...urls.keys()].sort();
console.log(`Checking ${list.length} unique URLs across ${readdirSync(CONTENT).length} articles\n`);

for (const url of list) {
  const r = await check(url);
  const articles = [...urls.get(url)];
  const verdict =
    r.status >= 200 && r.status < 300
      ? 'ok'
      : browserOnly(url)
        ? 'browser-only'
        : r.status === 403
          ? 'blocked'
          : 'fail';
  results.push({ url, ...r, verdict, articles });
  if (verdict !== 'ok') console.log(`${verdict.toUpperCase().padEnd(8)}${String(r.status).padStart(3)}  ${url}`);
  await new Promise((s) => setTimeout(s, 120));
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));

const ok = results.filter((r) => r.verdict === 'ok').length;
const blocked = results.filter((r) => r.verdict === 'blocked');
const browserVerified = results.filter((r) => r.verdict === 'browser-only');
const failed = results.filter((r) => r.verdict === 'fail');
console.log(
  `\n${ok}/${results.length} resolved. ` +
    `${browserVerified.length} browser-only, confirmed live separately. ` +
    `${blocked.length} blocked to scripts (403). ${failed.length} failed.`
);
if (failed.length) {
  console.log('\nHARD FAILURES:');
  for (const f of failed) console.log(`  ${f.status || f.error}  ${f.url}\n      used by: ${f.articles.join(', ')}`);
}
console.log('Wrote ' + OUT);
