// Verifies what production actually serves. GitHub Pages deploys take minutes
// and scale with page count, and there is no `gh` CLI on the owner's machine, so
// the reliable signal is the live site itself.
//
//   node scripts/verify-live.mjs <slug-or-path> […]   check specific pages
//   node scripts/verify-live.mjs --smoke              key pages, feeds and draft containment
//   options: --wait <minutes>   poll until the first target answers 200 (default 0)
//            --site <origin>    another origin, e.g. a preview (default production)
//
// For every page: HTTP 200, a self-referencing canonical, og:url agreeing, and
// parseable JSON-LD. For an article additionally: the byline links the author
// profile with rel=author and matches BlogPosting.author, and the URL is in the
// sitemap and the RSS feed. Everywhere: `<path>/index.txt` must be a real 404,
// and no unpublished article may answer or be listed.

import { readArticles } from './lib/content.mjs';
import { isPublic } from './lib/publishing.mjs';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const SITE = option('--site', 'https://reigncreativellc.com').replace(/\/$/, '');
const waitMinutes = Number(option('--wait', '0'));
const smoke = args.includes('--smoke');
const optionValues = new Set([option('--site'), option('--wait')].filter(Boolean));
let targets = args.filter((a) => !a.startsWith('--') && !optionValues.has(a));

const articles = readArticles();
const unpublished = articles.filter((a) => !isPublic(a.data));
const toPath = (t) => (t.startsWith('/') ? (t.endsWith('/') || /\.[a-z]+$/.test(t) ? t : `${t}/`) : `/blog/${t}/`);

if (smoke) {
  const newest = articles
    .filter((a) => isPublic(a.data))
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.slug.localeCompare(b.slug));
  targets = [
    '/',
    '/about/',
    '/editorial-policy/',
    '/authors/reign-creative-llc/',
    '/apps/',
    '/blog/',
    '/blog/category/education-brain/',
    '/blog/topics/mental-math/',
    '/apps/mental-math-memory-games/',
    newest[0]?.slug,
    'mental-math-training-guide',
    'what-does-td-mean-in-games',
    ...targets,
  ].filter(Boolean);
}
if (targets.length === 0) {
  console.error('usage: node scripts/verify-live.mjs <slug-or-path> […] [--smoke] [--wait <minutes>] [--site <origin>]');
  process.exit(2);
}
const paths = [...new Set(targets.map(toPath))];

const problems = [];
const fail = (m) => problems.push(m);
const get = async (path) => {
  const response = await fetch(`${SITE}${path}`, { redirect: 'manual', headers: { 'cache-control': 'no-cache' } });
  return { status: response.status, type: response.headers.get('content-type') ?? '', text: await response.text() };
};

/* --------------------------------------------------------- wait for deploy */

if (waitMinutes > 0) {
  const deadline = Date.now() + waitMinutes * 60_000;
  const probe = paths[paths.length - 1];
  process.stdout.write(`waiting for ${SITE}${probe} `);
  for (;;) {
    const { status } = await get(probe).catch(() => ({ status: 0 }));
    if (status === 200) break;
    if (Date.now() > deadline) {
      console.log(`\n${probe} still ${status} after ${waitMinutes} min`);
      process.exit(1);
    }
    process.stdout.write('.');
    await new Promise((r) => setTimeout(r, 20_000));
  }
  console.log(' live');
}

/* ------------------------------------------------------------------ feeds */

const sitemap = (await get('/sitemap.xml')).text;
const rss = (await get('/blog/rss.xml')).text;
const llms = (await get('/llms.txt')).text;
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

/* ------------------------------------------------------------------ pages */

for (const path of paths) {
  const page = await get(path);
  if (page.status !== 200) {
    fail(`${path}: HTTP ${page.status}`);
    continue;
  }
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(page.text)?.[1];
  const ogUrl = /<meta property="og:url" content="([^"]*)"/.exec(page.text)?.[1];
  if (canonical !== `https://reigncreativellc.com${path}`) fail(`${path}: canonical is ${canonical}`);
  if (ogUrl && ogUrl !== canonical) fail(`${path}: og:url ${ogUrl} ≠ canonical`);
  let blocks = [];
  try {
    blocks = [...page.text.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
      JSON.parse(m[1].replace(/\\u003c/g, '<'))
    );
  } catch (error) {
    fail(`${path}: unparseable JSON-LD — ${error.message}`);
  }
  if (!sitemapUrls.has(`https://reigncreativellc.com${path}`)) fail(`${path}: not in sitemap.xml`);

  if (/^\/blog\/[a-z0-9-]+\/$/.test(path) && !/^\/blog\/(?:category|topics)\//.test(path)) {
    const byline = /data-byline[\s\S]*?<\/p>/.exec(page.text)?.[0] ?? '';
    const link = /<a\b([^>]*)>([\s\S]*?)<\/a>/.exec(byline);
    const href = link && /href="([^"]*)"/.exec(link[1])?.[1];
    const name = link?.[2].replace(/<[^>]*>/g, '').trim();
    const posting = blocks.find((b) => b['@type'] === 'BlogPosting');
    if (!link || !/rel="author"/.test(link[1])) fail(`${path}: no rel=author byline link`);
    if (posting?.author?.name !== name) fail(`${path}: BlogPosting author "${posting?.author?.name}" ≠ byline "${name}"`);
    if (posting?.author?.url !== `https://reigncreativellc.com${href}`) fail(`${path}: BlogPosting author url ${posting?.author?.url}`);
    if (!rss.includes(`https://reigncreativellc.com${path}`)) fail(`${path}: not in the RSS feed`);
  }

  const sidecar = await get(`${path}index.txt`);
  if (sidecar.status !== 404) fail(`${path}index.txt: HTTP ${sidecar.status} — RSC payload is being served`);
}

/* --------------------------------------------------- nothing unpublished */

for (const article of unpublished) {
  const path = `/blog/${article.slug}/`;
  if ((await get(path)).status !== 404) fail(`LEAK: unpublished ${path} answers`);
  for (const [name, text] of [['sitemap', sitemap], ['RSS', rss], ['llms.txt', llms]]) {
    if (text.includes(path)) fail(`LEAK: unpublished ${path} is listed in ${name}`);
  }
}

console.log(`${SITE}: ${paths.length} page(s) checked, sitemap ${sitemapUrls.size} URLs, RSS ${(rss.match(/<item>/g) ?? []).length} items, ${unpublished.length} unpublished article(s) checked for leaks`);
if (problems.length) {
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('live site verified');
