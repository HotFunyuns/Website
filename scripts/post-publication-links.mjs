// The post-publication internal-linking pass. Run it after an article goes
// public — the release command runs it automatically — and it:
//
//   1. checks the new article's own links: its app page, its category or hub,
//      its hub's cornerstone, and at least two related public articles;
//   2. picks the most relevant older articles and makes two to five of them
//      link back — contextually where the article's own target phrase already
//      appears in their prose, as a "Keep reading" card otherwise;
//   3. with --verify, reads the fresh build in out/ and confirms the article is
//      linked from another article, from its app page or hub, carries the
//      tracked Play link and the author byline, and sits within three clicks of
//      the homepage.
//
// It never links to anything unpublished, never adds a link that exists, never
// rewrites a sentence, and never touches `updatedAt` — adding a link is not a
// content revision. See scripts/lib/linking.mjs for the rules.
//
//   node scripts/post-publication-links.mjs <slug> [<slug> …]
//   node scripts/post-publication-links.mjs --today        every article released today (Los Angeles)
//   options: --dry-run  --no-contextual  --any-age  --verify  --json
//
// Exit code 1 when a blocking check fails (the article is not public, links an
// unpublished page, or cannot be given a single inbound link).

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { OUT_DIR, loadSiteData, parseArticle, readArticles, setFrontmatterValue, writeArticle } from './lib/content.mjs';
import { applyActions, planPostPublication } from './lib/linking.mjs';
import { isQueueEra, laDay } from './lib/publishing.mjs';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const dryRun = flag('--dry-run');
const verify = flag('--verify');
const asJson = flag('--json');
const options = { contextual: !flag('--no-contextual'), anyAge: flag('--any-age') };

let articles = readArticles();
const site = loadSiteData();

let slugs = args.filter((a) => !a.startsWith('--'));
if (flag('--today')) {
  const today = laDay();
  slugs = [...slugs, ...articles.filter((a) => isQueueEra(a.data) && a.data.publishedAt === today).map((a) => a.slug)];
}
slugs = [...new Set(slugs)];
if (slugs.length === 0) {
  console.error('usage: node scripts/post-publication-links.mjs <slug> [<slug> …] [--today] [--dry-run] [--no-contextual] [--any-age] [--verify]');
  process.exit(2);
}

const BLOCKING = new Set(['no-private-links', 'older-inbound', 'app-page']);
const results = [];
let blocked = false;

for (const slug of slugs) {
  const plan = planPostPublication(articles, slug, site, options);
  if (plan.fatal) {
    results.push({ slug, fatal: plan.fatal });
    blocked = true;
    continue;
  }

  let written = [];
  if (!dryRun && plan.actions.length > 0) {
    const edited = applyActions(articles, plan.actions, { setFrontmatterValue, parseArticle });
    for (const { original, article } of edited.values()) {
      writeArticle(original, article.raw);
      written.push(article.slug);
    }
    // Re-read so the next slug in this run plans against what is now on disk.
    articles = readArticles();
  }

  const failed = plan.checks.filter((c) => !c.ok);
  if (failed.some((c) => BLOCKING.has(c.id))) blocked = true;
  results.push({ slug, checks: plan.checks, actions: plan.actions, shortlist: plan.shortlist, written });
}

/* ------------------------------------------------------ rendered verification */

function verifyRendered(slug) {
  const problems = [];
  const page = join(OUT_DIR, 'blog', slug, 'index.html');
  if (!existsSync(page)) return [`out/blog/${slug}/index.html is missing — run npm run build first`];
  const html = readFileSync(page, 'utf8');
  const article = articles.find((a) => a.slug === slug);
  const app = site.apps.find((a) => a.slug === article.data.relatedApps[0]);

  if (!new RegExp(`href="https://play\\.google\\.com/store/apps/details\\?id=${app.packageId.replace(/\./g, '\\.')}`).test(html)) {
    problems.push(`no tracked Google Play link for ${app.packageId}`);
  }
  if (!/<a[^>]*href="\/authors\/[a-z0-9-]+\/"[^>]*rel="author"|<a[^>]*rel="author"[^>]*href="\/authors\//.test(html)) {
    problems.push('no author byline link');
  }

  const needle = `href="/blog/${slug}/"`;
  const fromArticles = articles.filter((a) => {
    if (a.slug === slug) return false;
    const other = join(OUT_DIR, 'blog', a.slug, 'index.html');
    if (!existsSync(other)) return false;
    const doc = readFileSync(other, 'utf8');
    // Only the prose and the "Keep reading" grid count as editorial links.
    const prose = [...doc.matchAll(/<div class="prose[^"]*"[^>]*>([\s\S]*?)<\/div>/g)].map((m) => m[1]).join('');
    const start = doc.indexOf('related-articles-heading');
    const related = start >= 0 ? doc.slice(start, doc.indexOf('</section>', start)) : '';
    return prose.includes(needle) || related.includes(needle);
  });
  if (fromArticles.length === 0) problems.push('no other article links to it in prose or "Keep reading"');

  const hubPages = (article.data.hubs ?? []).map((h) => join(OUT_DIR, 'blog', 'topics', h, 'index.html'));
  const listed = [join(OUT_DIR, 'apps', app.slug, 'index.html'), ...hubPages].some(
    (p) => existsSync(p) && readFileSync(p, 'utf8').includes(needle)
  );
  if (!listed) problems.push(`neither /apps/${app.slug}/ nor its hub page links it`);

  // Homepage → /blog/ → article is two clicks; confirm both hops exist.
  const home = readFileSync(join(OUT_DIR, 'index.html'), 'utf8');
  const blogIndex = readFileSync(join(OUT_DIR, 'blog', 'index.html'), 'utf8');
  if (!home.includes('href="/blog/"') || !blogIndex.includes(needle)) {
    problems.push('not reachable within three clicks of the homepage via /blog/');
  }
  return problems;
}

if (verify) {
  for (const result of results) {
    if (result.fatal) continue;
    result.rendered = verifyRendered(result.slug);
    if (result.rendered.length) blocked = true;
  }
}

/* ------------------------------------------------------------------ report */

if (asJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const result of results) {
    console.log(`\n${result.slug}`);
    if (result.fatal) {
      console.log(`  ✗ ${result.fatal}`);
      continue;
    }
    for (const c of result.checks) console.log(`  ${c.ok ? '✓' : '✗'} ${c.detail}${c.ok || !c.fix ? '' : ` — ${c.fix}`}`);
    if (result.shortlist.length) {
      console.log('  most relevant older articles:');
      for (const s of result.shortlist) console.log(`    ${s.score.toFixed(1)}  ${s.slug}${s.linked ? '  (already links)' : ''}`);
    }
    for (const a of result.actions) {
      const what =
        a.type === 'contextual'
          ? `prose link "${a.text}" in ${a.source} → ${a.target}`
          : `card in ${a.source} → ${a.target} (${a.reason})`;
      console.log(`  ${dryRun ? 'would add' : 'added'}: ${what}`);
    }
    if (result.actions.length === 0) console.log('  nothing to add — every link already exists');
    if (result.rendered) {
      if (result.rendered.length === 0) console.log('  ✓ rendered output verified');
      for (const p of result.rendered) console.log(`  ✗ rendered: ${p}`);
    }
  }
  console.log(dryRun ? '\n[dry run] no files written' : '');
}

process.exit(blocked ? 1 : 0);
