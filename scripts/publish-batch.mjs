// Publishes finished articles as soon as they pass every check — the route for
// any article that does not need a particular release day, and the only route
// for an article published with the "AI-assisted" label.
//
//   node scripts/publish-batch.mjs <slug> [<slug> …]      publish these
//   node scripts/publish-batch.mjs --all-ready            every "review" article that carries a review label
//   node scripts/publish-batch.mjs --hash <slug> […]      print the content hash an editorial review log entry records
//   options: --log <path>  (default docs/data/editorial-review-log-2026-10.json)
//            --dry-run     decide and report, write nothing
//            --no-link-check  skip the in-memory linking plan (not recommended)
//            --json
//
// An article is published only when every one of these holds:
//
//   1. It is finished and waiting ("review") — never a draft still being
//      written, a scheduled article (the queue's) or a published one.
//   2. It says how it was checked, and the check really happened:
//        "automated"  the editorial review log has an entry for it with verdict
//                     "pass", performed by the AI editorial review, dated no
//                     later than today, listing its checks, and recording the
//                     content hash of the text that was reviewed — so an article
//                     edited after its review is refused until it is reviewed
//                     again;
//        "person"     the article carries the complete review record a person
//                     filled in (scripts/lib/publishing.mjs reviewProblems).
//      Nothing here, or anywhere in this repository, writes a review record or a
//      log verdict. The log is written by whoever performed the review.
//   3. It passes the same validation as a queue release (scripts/lib/release-checks.mjs),
//      including preflight-articles.mjs --only, with the other articles in this
//      batch counted as public — but any article that links one that fails is
//      itself held back, so nothing published can link an unpublished page.
//   4. It does not duplicate a title, meta title or description of a published
//      article or of another article in the batch.
//   5. The batch linking pass (post-publication-links.mjs --batch) can give it at
//      least one inbound link, and it links its app page.
//
// Publishing sets status "published", publishedAt = updatedAt = today in
// America/Los_Angeles, and removes noindex. No other article and no other field
// is touched. Articles that fail stay exactly as they were, and are listed with
// the reasons. Run the linking pass straight afterwards:
//
//   node scripts/post-publication-links.mjs --batch --today
//
// Exit code 0 when everything requested was published (or would be, with
// --dry-run); 1 when anything was held back — the rest are still published.

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ROOT,
  deleteFrontmatterKey,
  loadSiteData,
  parseArticle,
  readArticles,
  rel,
  setFrontmatterValue,
  writeArticle,
} from './lib/content.mjs';
import { planBatchLinks } from './lib/linking.mjs';
import { isIsoDay, isPublic, laDay, reviewProblems } from './lib/publishing.mjs';
import { batchCollisions, validateCandidate } from './lib/release-checks.mjs';

export const DEFAULT_REVIEW_LOG = join('docs', 'data', 'editorial-review-log-2026-10.json');
export const REVIEW_LOG_SCHEMA = 'reign-editorial-review-log/1';
/** The only value `performedBy` may hold. A person's review lives in the article's own frontmatter. */
export const AI_REVIEW = 'ai-editorial-review';

/**
 * The hash of everything a reader sees that the review covered: the headline,
 * meta title, description, FAQs, takeaways, sources and the body. Card lists,
 * status and dates are excluded — the linking pass and the release change them.
 */
export function reviewedContentHash(article) {
  const d = article.data;
  const visible = {
    title: d.title,
    metaTitle: d.metaTitle,
    description: d.description,
    faqs: d.faqs ?? [],
    takeaways: d.takeaways ?? [],
    sources: d.sources ?? [],
    body: article.body.replace(/\r\n/g, '\n').trim(),
  };
  return `sha256:${createHash('sha256').update(JSON.stringify(visible)).digest('hex')}`;
}

/** The latest log entry for each slug, and the problems with the log itself. */
export function readReviewLog(file) {
  if (!existsSync(file)) return { entries: new Map(), problems: [`review log ${file} does not exist`] };
  let log;
  try {
    log = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    return { entries: new Map(), problems: [`review log ${file} is not valid JSON — ${error.message}`] };
  }
  const problems = [];
  if (log.schema !== REVIEW_LOG_SCHEMA) problems.push(`review log schema is ${JSON.stringify(log.schema)}, expected "${REVIEW_LOG_SCHEMA}"`);
  if (!Array.isArray(log.entries)) return { entries: new Map(), problems: [...problems, 'review log has no "entries" array'] };
  const entries = new Map();
  for (const entry of log.entries) {
    if (typeof entry?.slug !== 'string') continue;
    const prior = entries.get(entry.slug);
    if (!prior || String(entry.reviewedAt ?? '') >= String(prior.reviewedAt ?? '')) entries.set(entry.slug, entry);
  }
  return { entries, problems };
}

/** Problems with one article's log entry; [] when it authorises publication. */
export function logEntryProblems(entry, article, now = new Date()) {
  if (!entry) return ['no entry in the editorial review log — it has not been reviewed'];
  const problems = [];
  if (entry.verdict !== 'pass') problems.push(`editorial review verdict is ${JSON.stringify(entry.verdict)}, not "pass"`);
  if (entry.performedBy !== AI_REVIEW) {
    problems.push(`log entry performedBy is ${JSON.stringify(entry.performedBy)} — the log records the AI editorial review only; a person's review goes in the article's own review record`);
  }
  if (!isIsoDay(entry.reviewedAt)) problems.push('log entry has no ISO "reviewedAt" date');
  else if (entry.reviewedAt > laDay(now)) problems.push(`log entry is dated in the future (${entry.reviewedAt})`);
  if (!Array.isArray(entry.checks) || entry.checks.length === 0) problems.push('log entry lists no checks');
  if (typeof entry.notes !== 'string' || !entry.notes.trim()) problems.push('log entry has no notes');
  const hash = reviewedContentHash(article);
  if (entry.contentHash !== hash) {
    problems.push(
      entry.contentHash
        ? 'the article changed after its editorial review (content hash differs) — review it again'
        : 'log entry records no contentHash, so it cannot show which text was reviewed'
    );
  }
  return problems;
}

/** The article as it will be once published, in memory only. */
export function publishedForm(article, day) {
  let raw = article.raw;
  raw = setFrontmatterValue(raw, 'status', 'published');
  raw = setFrontmatterValue(raw, 'publishedAt', day);
  raw = setFrontmatterValue(raw, 'updatedAt', day);
  raw = deleteFrontmatterKey(raw, 'noindex');
  return parseArticle(article.file, raw);
}

/**
 * Decides which candidates may be published. Pure apart from running
 * preflight-articles.mjs (skipped with options.preflight = false).
 *
 * @returns {{ publish: string[], held: Map<string, string[]> }}
 */
export function planBatch(articles, slugs, site, options = {}) {
  const { now = new Date(), log = new Map(), preflight = true, linkCheck = true } = options;
  const day = laDay(now);
  const held = new Map();
  const hold = (slug, reasons) => held.set(slug, [...(held.get(slug) ?? []), ...reasons]);
  const bySlug = new Map(articles.map((a) => [a.slug, a]));

  // Standalone checks: status, the review label and its evidence, preflight.
  const futures = new Map();
  for (const slug of [...new Set(slugs)]) {
    const article = bySlug.get(slug);
    if (!article) {
      hold(slug, [`no article "${slug}" in content/blog`]);
      continue;
    }
    const d = article.data;
    if (d.status !== 'review') {
      const why = {
        draft: ' — a draft is still being written; set "review" when it is finished',
        scheduled: ' — scheduled articles go out through the queue on their publishAt',
        published: '',
      };
      hold(slug, [`status is "${d.status}" — only finished articles ("review") are published here${why[d.status] ?? ''}`]);
      continue;
    }
    const future = publishedForm(article, day);
    const reasons = [];
    if (d.editorialReview === 'automated') reasons.push(...logEntryProblems(log.get(slug), article, now));
    else if (d.editorialReview !== 'person') reasons.push('carries no review label ("editorialReview": "automated" or "person")');
    reasons.push(...reviewProblems(future.data, now));
    if (reasons.length === 0 && preflight) {
      reasons.push(
        ...validateCandidate(article, future.data, articles, site, { now, preflight: true, willBePublic: new Set(slugs) }).filter((p) =>
          p.startsWith('pre-flight failed')
        )
      );
    }
    if (reasons.length) hold(slug, reasons);
    else futures.set(slug, future);
  }

  // Everything that depends on which other articles go out with it, repeated
  // until nothing more is held back: holding one article can strand another
  // that links to it.
  for (let pass = 0; pass < 50; pass++) {
    const set = new Set(futures.keys());
    const corpus = articles.map((a) => futures.get(a.slug) ?? a);
    const before = set.size;

    for (const slug of [...set]) {
      const reasons = validateCandidate(bySlug.get(slug), futures.get(slug).data, articles, site, {
        now,
        preflight: false,
        willBePublic: new Set([...set].filter((s) => s !== slug)),
      });
      if (reasons.length) {
        hold(slug, reasons);
        futures.delete(slug);
      }
    }
    if (futures.size !== before) continue;

    const collisions = batchCollisions(
      [...futures.values()].map((a) => ({ slug: a.slug, data: a.data })),
      articles.filter((a) => isPublic(a.data, now))
    );
    for (const [slug, reasons] of collisions) {
      if (reasons.length) {
        hold(slug, reasons);
        futures.delete(slug);
      }
    }
    if (futures.size !== before) continue;

    if (linkCheck && futures.size > 0) {
      const plan = planBatchLinks(corpus, [...futures.keys()], site, { now });
      for (const [slug, result] of plan.results) {
        const blocking = result.fatal
          ? [result.fatal]
          : result.checks.filter((c) => !c.ok && ['no-private-links', 'app-page', 'batch-inbound'].includes(c.id)).map((c) => `${c.detail} — ${c.fix}`);
        if (blocking.length) {
          hold(slug, blocking);
          futures.delete(slug);
        }
      }
    }
    if (futures.size === before) break;
  }

  return { publish: [...futures.keys()].sort(), held, futures };
}

/* ------------------------------------------------------------------ CLI */

function main() {
  const args = process.argv.slice(2);
  const flag = (name) => args.includes(name);
  const option = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const optionValues = new Set(['--log'].map((name) => option(name)).filter(Boolean));
  const named = args.filter((a) => !a.startsWith('--') && !optionValues.has(a));
  const articles = readArticles();

  if (flag('--hash')) {
    for (const slug of named) {
      const article = articles.find((a) => a.slug === slug);
      if (!article) {
        console.error(`no article "${slug}"`);
        process.exitCode = 1;
        continue;
      }
      console.log(JSON.stringify({ slug, contentHash: reviewedContentHash(article) }));
    }
    return;
  }

  const logPath = option('--log') ?? DEFAULT_REVIEW_LOG;
  const logFile = isAbsolute(logPath) ? logPath : join(ROOT, logPath);
  const slugs = flag('--all-ready')
    ? [...named, ...articles.filter((a) => a.data.status === 'review' && a.data.editorialReview).map((a) => a.slug)]
    : named;
  if (slugs.length === 0) {
    console.error('usage: node scripts/publish-batch.mjs <slug> […] | --all-ready | --hash <slug> […]  [--log <path>] [--dry-run] [--no-link-check] [--json]');
    process.exit(2);
  }

  const needsLog = slugs.some((slug) => articles.find((a) => a.slug === slug)?.data.editorialReview === 'automated');
  const { entries, problems: logProblems } = needsLog ? readReviewLog(logFile) : { entries: new Map(), problems: [] };
  if (logProblems.length) {
    for (const p of logProblems) console.error(`✗ ${p}`);
    console.error('nothing published: an automated-label article needs a valid editorial review log');
    process.exit(1);
  }

  const site = loadSiteData();
  const now = new Date();
  const dryRun = flag('--dry-run');
  const { publish, held, futures } = planBatch(articles, slugs, site, {
    now,
    log: entries,
    linkCheck: !flag('--no-link-check'),
  });

  if (!dryRun) {
    for (const slug of publish) {
      const original = articles.find((a) => a.slug === slug);
      writeArticle(original, futures.get(slug).raw);
    }
  }

  if (flag('--json')) {
    console.log(JSON.stringify({ day: laDay(now), dryRun, published: publish, held: Object.fromEntries(held) }, null, 2));
  } else {
    for (const slug of publish) console.log(`${dryRun ? 'would publish' : 'published'} ${slug} (${rel(futures.get(slug).file)})`);
    for (const [slug, reasons] of held) {
      console.log(`held ${slug}:`);
      for (const reason of reasons) console.log(`  ✗ ${reason}`);
    }
    console.log(
      `\n${dryRun ? '[dry run] ' : ''}${publish.length} ${dryRun ? 'would be ' : ''}published with publishedAt ${laDay(now)}, ${held.size} held back` +
        (publish.length && !dryRun ? '\nnext: node scripts/post-publication-links.mjs --batch --today, then npm run build' : '')
    );
  }
  process.exit(held.size > 0 ? 1 : 0);
}

// Importable by the tests without running the command.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
