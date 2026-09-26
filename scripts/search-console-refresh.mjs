// Search Console refresh-opportunity report.
//
// Reads Performance exports from Google Search Console — CSV files, because this
// repository has no Search Console credentials and should not need any — joins
// them to the site's own articles and link graph, and writes:
//
//   search-console-refresh-report.md   what data was used, site-level change, caveats
//   refresh-queue.md                   the pages worth updating, and what to change
//
// Where the files go: this repository is public, so reports built from real
// data are written to search-console/reports/ (gitignored) unless you pass
// --publish-to-docs. Without any export the script writes the no-data versions
// straight to docs/, since they contain no performance figures.
//
//   node scripts/search-console-refresh.mjs [--dir search-console] [--publish-to-docs] [--out <dir>]
//
// Expected layout (see docs/search-console-refresh-report.md for the export steps):
//   search-console/28d/Pages.csv  Queries.csv  [Devices.csv  Countries.csv]   "Last 28 days", compare to previous period
//   search-console/90d/Pages.csv  Queries.csv                                "Last 3 months", compare to previous period
//   search-console/page-queries.csv    optional: page + query rows (API, Looker Studio or a Sheets add-on)
//   search-console/indexing/*.csv      optional: Pages report exports, one per "Why pages aren't indexed" reason
//
// Nothing here guesses. Without an export there are no positions, and no page
// is described as ranking anywhere.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { relevanceTokens } from '../src/lib/blog/relevance.mjs';
import { FIRST_PARTY_GUIDE, ROOT, loadSiteData, readArticles } from './lib/content.mjs';
import { isPublic, laDay } from './lib/publishing.mjs';
import {
  ctrByPositionBucket,
  readIndexingTable,
  readPageQueryTable,
  readPerformanceTable,
  relativeChange,
} from './lib/search-console.mjs';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const config = JSON.parse(readFileSync(option('--config', join(ROOT, 'scripts', 'search-console-refresh.config.json')), 'utf8'));
// Relative paths are taken from the repository root; absolute ones are used as given.
const inputDir = resolve(ROOT, option('--dir', 'search-console'));
const today = laDay();

/* ------------------------------------------------------------------ inputs */

const tryRead = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const table = (window, name) => {
  const text = tryRead(join(inputDir, window, `${name}.csv`)) ?? (window === '28d' ? tryRead(join(inputDir, `${name}.csv`)) : null);
  return text ? { ...readPerformanceTable(text), file: `${window}/${name}.csv` } : null;
};

const pages28 = table('28d', 'Pages');
const pages90 = table('90d', 'Pages');
const queries28 = table('28d', 'Queries');
const queries90 = table('90d', 'Queries');
const devices = table('28d', 'Devices');
const countries = table('28d', 'Countries');
const pageQueriesText = tryRead(join(inputDir, 'page-queries.csv'));
const pageQueries = pageQueriesText ? readPageQueryTable(pageQueriesText) : null;
const indexingDir = join(inputDir, 'indexing');
const indexing = existsSync(indexingDir)
  ? readdirSync(indexingDir)
      .filter((f) => f.endsWith('.csv'))
      .flatMap((f) => readIndexingTable(readFileSync(join(indexingDir, f), 'utf8'), f.replace(/\.csv$/, '')))
  : [];

const hasData = Boolean(pages28 || pages90);
const outDir = hasData
  ? args.includes('--publish-to-docs')
    ? join(ROOT, 'docs')
    : resolve(ROOT, option('--out', join('search-console', 'reports')))
  : join(ROOT, 'docs');

/* -------------------------------------------------------------- site data */

const articles = readArticles().filter((a) => isPublic(a.data));
const bySlug = new Map(articles.map((a) => [a.slug, a]));
const { apps, hubs } = loadSiteData();
const appVerified = new Map(apps.map((a) => [a.slug, a.lastVerified]));
const cornerstones = new Set(hubs.map((h) => h.cornerstone));
const graphPath = join(ROOT, 'docs', 'data', 'link-graph.json');
const graph = existsSync(graphPath) ? JSON.parse(readFileSync(graphPath, 'utf8')) : null;
const graphByUrl = new Map((graph?.pages ?? []).map((p) => [p.url, p]));
// Results of `npm run audit:sources`. Only definitive answers count as dead: a
// 404 or 410 means the page is gone. Transport errors and 5xx are often the
// checker's network, not the source, and are left to a person with a browser.
const sourceCheckPath = join(ROOT, 'docs', 'data', 'source-link-check.json');
const sourceCheck = existsSync(sourceCheckPath) ? JSON.parse(readFileSync(sourceCheckPath, 'utf8')) : null;
const deadSources = new Map(
  (sourceCheck?.results ?? []).filter((r) => r.status === 404 || r.status === 410).map((r) => [r.url, r.status])
);

const daysBetween = (a, b) => Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86_400_000);
const headingsOf = (body) => [...body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => m[1]);

/** Signals that need no Search Console data: stale facts, thin sourcing, weak links, overlap. */
function siteSignals(article) {
  const d = article.data;
  const signals = [];
  const verified = appVerified.get(d.relatedApps[0]);
  if (verified && daysBetween(verified, today) > config.staleAppDays) {
    signals.push({ kind: 'outdated-app-facts', detail: `app details last verified ${verified} (${daysBetween(verified, today)} days ago)` });
  }
  if (d.disclaimer === 'comparison' && d.researchDate && daysBetween(d.researchDate, today) > config.staleComparisonDays) {
    signals.push({ kind: 'stale-comparison', detail: `competitor details researched ${d.researchDate}` });
  }
  const oldSources = (d.sources ?? []).filter((s) => daysBetween(s.accessed, today) > config.staleSourceDays);
  if (oldSources.length) signals.push({ kind: 'old-sources', detail: `${oldSources.length} source(s) last accessed over ${config.staleSourceDays} days ago` });
  for (const source of d.sources ?? []) {
    if (deadSources.has(source.url)) {
      signals.push({
        kind: 'dead-source',
        detail: `source "${source.title}" returned HTTP ${deadSources.get(source.url)} in the check of ${sourceCheck.checkedAt.slice(0, 10)} (${source.url})`,
      });
    }
  }
  if ((d.sources ?? []).length < 2 && !FIRST_PARTY_GUIDE.test(article.slug)) {
    signals.push({ kind: 'thin-sourcing', detail: `${(d.sources ?? []).length} source(s)` });
  }
  const node = graphByUrl.get(`/blog/${article.slug}/`);
  if (node && node.inbound.editorial <= config.lowEditorialInbound) {
    signals.push({ kind: 'few-internal-links', detail: `${node.inbound.editorial} editorial inbound link(s)` });
  }
  return signals;
}

/** Pairs of articles whose primary keywords overlap enough to compete, before any data says so. */
function keywordOverlaps() {
  const list = articles.map((a) => ({ slug: a.slug, tokens: new Set(relevanceTokens(a.data.primaryKeyword)), app: a.data.relatedApps[0] }));
  const pairs = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i];
      const b = list[j];
      if (a.tokens.size < 2 || b.tokens.size < 2) continue;
      let shared = 0;
      for (const t of a.tokens) if (b.tokens.has(t)) shared++;
      const jaccard = shared / (a.tokens.size + b.tokens.size - shared);
      if (jaccard >= config.overlapJaccard) pairs.push({ a: a.slug, b: b.slug, jaccard });
    }
  }
  return pairs.sort((x, y) => y.jaccard - x.jaccard);
}

/* -------------------------------------------------------------- analysis */

const pct = (v) => (v === null || v === undefined ? '—' : `${(v * 100).toFixed(1)}%`);
const num = (v) => (v === null || v === undefined ? '—' : Math.round(v).toLocaleString('en-US'));
const pos = (v) => (v === null || v === undefined ? '—' : v.toFixed(1));
const delta = (v) => (v === null ? 'n/a (base too small)' : `${v >= 0 ? '+' : ''}${(v * 100).toFixed(0)}%`);

function pathOf(url) {
  try {
    const parsed = new URL(url);
    const variant = parsed.protocol === 'http:' ? 'http' : /^www\./.test(parsed.host) ? 'www' : parsed.search ? 'query string' : null;
    let path = parsed.pathname;
    if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) path += '/';
    return { path, variant, onSite: /(^|\.)reigncreativellc\.com$/.test(parsed.host) };
  } catch {
    return { path: null, variant: null, onSite: false };
  }
}

function analyse() {
  const primary = pages28 ?? pages90;
  const medians = ctrByPositionBucket(primary.rows, config.minImpressions28);
  // Canonical rows only: an http://, www. or query-string row shares the path
  // and would otherwise overwrite the real page's 90-day numbers.
  const long = new Map(
    (pages90?.rows ?? [])
      .map((r) => ({ r, url: pathOf(r.key) }))
      .filter(({ url }) => url.onSite && url.path && !url.variant)
      .map(({ r, url }) => [url.path, r])
  );
  const variants = [];
  const insufficient = [];
  const candidates = [];

  // Queries attributed to pages, when a page+query export exists.
  const queriesByPath = new Map();
  const pagesByQuery = new Map();
  for (const row of pageQueries ?? []) {
    const { path } = pathOf(row.page);
    if (!path) continue;
    if (!queriesByPath.has(path)) queriesByPath.set(path, []);
    queriesByPath.get(path).push(row);
    if (!pagesByQuery.has(row.query)) pagesByQuery.set(row.query, []);
    pagesByQuery.get(row.query).push({ path, ...row });
  }

  for (const row of primary.rows) {
    const { path, variant, onSite } = pathOf(row.key);
    if (!onSite || !path) continue;
    if (variant) {
      variants.push({ url: row.key, variant, impressions: row.current.impressions });
      continue;
    }
    const slug = /^\/blog\/([a-z0-9-]+)\/$/.exec(path)?.[1];
    const article = slug ? bySlug.get(slug) : null;
    const cur = row.current;
    const prev = row.previous;
    const longRow = long.get(path);
    if ((cur.impressions ?? 0) < config.minImpressions28) {
      insufficient.push({ path, impressions: cur.impressions });
      continue;
    }

    const [lo, hi] = config.positionBand;
    const inBand = cur.position !== null && cur.position >= lo && cur.position <= hi;
    const nearBand = !inBand && cur.position !== null && cur.position >= lo - config.nearBandMargin && cur.position <= hi + config.nearBandMargin;
    const longInBand = longRow?.current.position != null && longRow.current.position >= lo - 3 && longRow.current.position <= hi + 3;
    const clickChange = prev ? relativeChange(cur.clicks, prev.clicks, config.minPreviousClicksForDecline) : null;
    const ctrChange = prev ? relativeChange(cur.ctr, prev.ctr, 0.0001) : null;
    const decliningClicks = clickChange !== null && clickChange <= -config.clickDropRelative;
    const decliningCtr = ctrChange !== null && ctrChange <= -config.ctrDropRelative && (prev?.impressions ?? 0) >= config.minImpressions28;
    const bucket = cur.position !== null ? Math.min(30, Math.max(1, Math.round(cur.position))) : null;
    const typicalCtr = bucket !== null ? medians.get(bucket) : undefined;
    const ctrGap = typicalCtr !== undefined && cur.ctr !== null && cur.ctr < typicalCtr * config.ctrGapRatio;

    if (!inBand && !nearBand && !decliningClicks && !decliningCtr) continue;

    const signals = article ? siteSignals(article) : [];
    const attributed = queriesByPath.get(path) ?? null;
    let queries = attributed
      ? [...attributed].sort((a, b) => b.impressions - a.impressions).slice(0, 8).map((q) => ({ ...q, attributed: true }))
      : [];
    if (!attributed && article && queries28) {
      const own = new Set(relevanceTokens([article.data.title, article.data.primaryKeyword, ...article.data.secondaryKeywords].join(' ')));
      queries = queries28.rows
        .filter((q) => (q.current.impressions ?? 0) >= config.minQueryImpressions)
        .filter((q) => relevanceTokens(q.key).filter((t) => own.has(t)).length >= 2)
        .sort((a, b) => (b.current.impressions ?? 0) - (a.current.impressions ?? 0))
        .slice(0, 8)
        .map((q) => ({ query: q.key, clicks: q.current.clicks, impressions: q.current.impressions, ctr: q.current.ctr, position: q.current.position, attributed: false }));
    }

    const answered = article
      ? new Set(relevanceTokens([article.data.title, ...headingsOf(article.body), ...article.data.faqs.map((f) => f.question)].join(' ')))
      : new Set();
    const missing = queries
      .filter((q) => q.impressions >= config.minQueryImpressions)
      .filter((q) => relevanceTokens(q.query).some((t) => !answered.has(t)))
      .map((q) => q.query);

    const cannibal = [];
    for (const q of queries.filter((x) => x.attributed)) {
      for (const other of (pagesByQuery.get(q.query) ?? []).filter((o) => o.path !== path)) {
        if (other.impressions >= q.impressions * 0.3) cannibal.push({ query: q.query, path: other.path, impressions: other.impressions, clicks: other.clicks });
      }
    }
    const stronger = cannibal.filter((c) => c.clicks > (cur.clicks ?? 0));

    let score = Math.log10((cur.impressions ?? 0) + 1);
    if (inBand) score += 2;
    else if (nearBand) score += 1;
    if (longInBand) score += 0.5;
    if (decliningClicks) score += 1.5;
    if (decliningCtr) score += 1;
    if (ctrGap) score += 1;
    if (article && config.importantApps.includes(article.data.relatedApps[0])) score += 0.5;
    if (slug && cornerstones.has(slug)) score += 0.5;
    score += Math.min(1.5, signals.length * 0.5);

    const recommendations = [];
    if (ctrGap) recommendations.push(`CTR ${pct(cur.ctr)} is below the site's own median of ${pct(typicalCtr)} at position ~${bucket}: rewrite the title and description so they state what the page answers${queries[0] ? ` — starting with "${queries[0].query}"` : ''}.`);
    if (missing.length) recommendations.push(`Answer ${missing.slice(0, 3).map((q) => `"${q}"`).join(', ')} under a heading or in the FAQ — the words are not in any heading or FAQ question now.`);
    if (decliningClicks) recommendations.push(`Clicks fell ${delta(clickChange)} against the previous period. Compare the two periods' queries in Search Console before editing: a lost query, a new competitor or a SERP feature changes the fix.`);
    for (const s of signals) {
      if (s.kind === 'outdated-app-facts') recommendations.push(`Re-verify the app details against the live Google Play listing (${s.detail}).`);
      if (s.kind === 'stale-comparison') recommendations.push(`Re-check every competitor claim; ${s.detail}.`);
      if (s.kind === 'old-sources') recommendations.push(`Re-open the sources: ${s.detail}.`);
      if (s.kind === 'thin-sourcing') recommendations.push(`Add primary sources for the factual claims (${s.detail}).`);
      if (s.kind === 'dead-source') recommendations.push(`Replace or drop a dead citation — ${s.detail}. Re-check the claim it supports before citing anything new.`);
      if (s.kind === 'few-internal-links') recommendations.push(`Link it from related articles (${s.detail}).`);
    }
    if (recommendations.length === 0) recommendations.push('Position is in range and nothing on the page stands out: read the page against its top queries before changing anything, and leave it alone if it already answers them.');

    candidates.push({
      path,
      slug,
      article,
      cur,
      prev,
      long: longRow ?? null,
      clickChange,
      ctrChange,
      inBand,
      nearBand,
      longInBand,
      queries,
      missing,
      signals,
      cannibal,
      consolidate: stronger.length > 0,
      stronger,
      recommendations,
      score,
      links: (graphByUrl.get(path)?.shouldLinkHere ?? []).map((s) => s.slug),
    });
  }
  candidates.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
  return { candidates, insufficient, variants, medians };
}

/* ---------------------------------------------------------------- writing */

function exportSteps() {
  return [
    '## How to export the data',
    '',
    'All of this is in the Search Console web interface; no API key or credentials are needed.',
    '',
    '1. Open Search Console → property **`https://reigncreativellc.com/`** (a Domain property works too) → **Performance → Search results**.',
    '2. Set **Search type: Web**. Click the date filter → **Compare** tab → **Compare last 28 days to previous period** → Apply.',
    '3. Turn on all four metric cards: **Total clicks, Total impressions, Average CTR, Average position**.',
    '4. Click **Export → Download CSV**. Unzip it into `search-console/28d/` in this repository, so that `search-console/28d/Pages.csv` and `search-console/28d/Queries.csv` exist. Keep `Devices.csv` and `Countries.csv` if they are there.',
    '5. Repeat with **Compare last 3 months to previous period**, unzipping into `search-console/90d/`.',
    '6. Optional, but it makes the report much sharper: export page-level queries. The Performance report cannot export page and query together, so use Looker Studio (Search Console connector, "URL Impression" table with *Landing Page* and *Query* dimensions) or the Search Console API, and save the result as `search-console/page-queries.csv` with columns `page, query, clicks, impressions, ctr, position`.',
    '7. Optional: **Indexing → Pages**. For each reason under *Why pages aren\'t indexed*, open it and **Export → Download CSV**; save each file into `search-console/indexing/`, named after the reason (for example `Crawled - currently not indexed.csv`).',
    '8. Run `npm run report:search-console`. Reports built from real data go to `search-console/reports/` (gitignored). Add `-- --publish-to-docs` to write them to `docs/` instead — this repository is public, so that publishes the numbers.',
    '',
    '`search-console/` is in `.gitignore`: raw exports never get committed by accident.',
    '',
  ];
}

function writeNoData() {
  const overlaps = keywordOverlaps();
  const signalRows = articles.map((a) => ({ a, s: siteSignals(a) })).filter((x) => x.s.length);
  const report = [
    '# Search Console refresh report',
    '',
    `_Generated by \`npm run report:search-console\` on ${today}. Do not edit by hand._`,
    '',
    '## Status: no Search Console data available',
    '',
    'No Search Console export was found in `search-console/`, and this repository has no Search Console credentials or API access. **No ranking data was used anywhere in this report, and no page is described as ranking in any position.** Pages reported as "positions 8–20" can only come from a real export.',
    '',
    'Everything needed to act on an export is in place: `scripts/search-console-refresh.mjs` reads the files, joins them to the articles and the internal-link graph, and writes the queue. The thresholds live in `scripts/search-console-refresh.config.json`.',
    '',
    ...exportSteps(),
    '## What the report will contain',
    '',
    '- Data used: files, periods and row counts; site-wide clicks, impressions and CTR against the previous period.',
    `- Pages with at least ${config.minImpressions28} impressions in 28 days whose average position is ${config.positionBand[0]}–${config.positionBand[1]} (or within ${config.nearBandMargin} of it), or whose clicks or CTR fell by ${config.clickDropRelative * 100}% or more against the previous period.`,
    '- For each: its intent and primary keyword, its top queries, clicks, impressions, CTR and position for both windows, the change, missing subtopics, internal-link opportunities, outdated facts, source gaps, cannibalisation risk, a measurement window, and whether consolidation beats updating.',
    '- URL variants that received impressions (`http://`, `www.`, query strings) — relevant here because Enforce HTTPS is still off.',
    '- Indexing status by reason, when the Pages-report exports are provided.',
    '',
    '## How to read an average position',
    '',
    'Average position is impression-weighted across every query, device and country the page appeared for. A page at "12" might be 4th for one small query and 30th for a large one. Low-impression pages swing from week to week on noise alone. The report therefore requires a minimum number of impressions, checks the 90-day window as well as the 28-day one, and treats its ranking as a place to start reading — not an instruction to rewrite every page between 8 and 20.',
    '',
  ];
  const queue = [
    '# Refresh queue',
    '',
    `_Generated by \`npm run report:search-console\` on ${today}. Do not edit by hand._`,
    '',
    '## Performance-based queue: empty',
    '',
    'There is no Search Console export yet, so there is no performance-based queue. No page was refreshed on the strength of a guessed ranking. See [search-console-refresh-report.md](./search-console-refresh-report.md) for the export steps.',
    '',
    '## Site-side signals (no Search Console data involved)',
    '',
    'These come from the repository alone: stale app facts, stale comparison research, old or dead sources (from the last `npm run audit:sources`), thin sourcing and weak internal linking. They are maintenance flags, not ranking evidence.',
    '',
    signalRows.length === 0
      ? `None. App details were verified within ${config.staleAppDays} days, no comparison research is older than ${config.staleComparisonDays} days, no source is older than ${config.staleSourceDays} days, no cited source returned 404 or 410 in the last source check, every article outside the first-party guides cites at least two sources, and every article has at least ${config.lowEditorialInbound + 1} editorial inbound links.`
      : signalRows.map(({ a, s }) => `- \`/blog/${a.slug}/\` — ${s.map((x) => x.detail).join('; ')}`).join('\n'),
    '',
    '## Primary keywords that overlap (watch for cannibalisation)',
    '',
    `Pairs whose primary keywords share at least ${Math.round(config.overlapJaccard * 100)}% of their content words. Overlap in wording is not proof of competition; a page-query export shows whether both pages actually appear for the same searches. Nothing here should be merged on this list alone.`,
    '',
    overlaps.length === 0 ? 'None.' : overlaps.slice(0, 40).map((p) => `- \`${p.a}\` ↔ \`${p.b}\` (${Math.round(p.jaccard * 100)}%)`).join('\n'),
    '',
  ];
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'search-console-refresh-report.md'), report.join('\n'), 'utf8');
  writeFileSync(join(outDir, 'refresh-queue.md'), queue.join('\n'), 'utf8');
  console.log(`no Search Console export in ${inputDir} — wrote the no-data report and queue to docs/`);
}

function writeWithData() {
  const { candidates, insufficient, variants, medians } = analyse();
  const primary = pages28 ?? pages90;
  const sum = (rows, period, metric) => rows.reduce((n, r) => n + (r[period]?.[metric] ?? 0), 0);
  const totals = (t) => {
    if (!t) return null;
    const clicks = sum(t.rows, 'current', 'clicks');
    const impressions = sum(t.rows, 'current', 'impressions');
    const pClicks = t.periods.length > 1 ? sum(t.rows, 'previous', 'clicks') : null;
    const pImpr = t.periods.length > 1 ? sum(t.rows, 'previous', 'impressions') : null;
    return { clicks, impressions, ctr: impressions ? clicks / impressions : null, pClicks, pImpr, pCtr: pImpr ? pClicks / pImpr : null, periods: t.periods };
  };
  const t28 = totals(pages28);
  const t90 = totals(pages90);
  const byReason = new Map();
  for (const row of indexing) byReason.set(row.reason, (byReason.get(row.reason) ?? 0) + 1);

  const windowRow = (label, t) =>
    t
      ? `| ${label} | ${t.periods.map((p) => p.label).join(' vs ')} | ${num(t.clicks)} | ${t.pClicks === null ? '—' : delta(relativeChange(t.clicks, t.pClicks))} | ${num(t.impressions)} | ${t.pImpr === null ? '—' : delta(relativeChange(t.impressions, t.pImpr))} | ${pct(t.ctr)} | ${t.pCtr === null ? '—' : pct(t.pCtr)} |`
      : `| ${label} | not provided | | | | | | |`;

  const report = [
    '# Search Console refresh report',
    '',
    `_Generated by \`npm run report:search-console\` on ${today} from exports in \`${relative(ROOT, inputDir).split('\\').join('/')}\`. Do not edit by hand._`,
    '',
    '## Data used',
    '',
    '| File | Rows | Periods |',
    '| --- | --- | --- |',
    ...[pages28, queries28, pages90, queries90, devices, countries]
      .filter(Boolean)
      .map((t) => `| \`${t.file}\` | ${t.rows.length} | ${t.periods.map((p) => `${p.label} (${p.role})`).join(', ')} |`),
    ...(pageQueries ? [`| \`page-queries.csv\` | ${pageQueries.length} | as exported |`] : []),
    ...(indexing.length ? [`| \`indexing/*.csv\` | ${indexing.length} | as exported |`] : []),
    '',
    '## Site-level change',
    '',
    'Sums of the page table. Search Console counts a click once per page, so page-table totals can differ slightly from the report headline.',
    '',
    '| Window | Periods | Clicks | Change | Impressions | Change | CTR | Previous CTR |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
    windowRow('28 days', t28),
    windowRow('90 days', t90),
    '',
    '## Method',
    '',
    `- A page qualifies with at least ${config.minImpressions28} impressions in the 28-day window and an average position of ${config.positionBand[0]}–${config.positionBand[1]}, within ${config.nearBandMargin} of that band, or a fall of ${config.clickDropRelative * 100}%+ in clicks (from at least ${config.minPreviousClicksForDecline}) or in CTR.`,
    '- The 90-day window is a confirmation: a page whose 90-day position is also near the band is less likely to be a one-month blip.',
    `- "Low CTR" compares a page with the site's **own** median CTR for pages at the same rounded position (${medians.size} position bucket(s) had enough pages to compute one). Industry CTR curves are not used.`,
    '- Ordering uses a transparent score: impressions (log scale), band position, 90-day confirmation, decline, CTR gap, app importance, hub cornerstones, and on-site maintenance signals. It orders the reading list; it is not a forecast.',
    '',
    '## Caveats',
    '',
    '- Average position is impression-weighted across all queries, devices and countries. Check a page\'s queries — and its device and country split — before concluding it "ranks 12th".',
    `- ${insufficient.length} page(s) had fewer than ${config.minImpressions28} impressions and were not assessed: their numbers are mostly noise.`,
    '- A change in clicks can come from seasonality, a search-feature change or a competing page. Compare periods before editing.',
    '',
    '## URL variants that received impressions',
    '',
    variants.length === 0
      ? 'None.'
      : [
          'These are not the canonical URLs. `http://` variants exist because GitHub Pages "Enforce HTTPS" is off — an owner setting.',
          '',
          ...variants.map((v) => `- ${v.url} (${v.variant}) — ${num(v.impressions)} impressions`),
        ].join('\n'),
    '',
    '## Indexing status',
    '',
    byReason.size === 0
      ? 'No Pages-report export was provided.'
      : ['| Reason | URLs |', '| --- | --- |', ...[...byReason.entries()].sort((a, b) => b[1] - a[1]).map(([r, n]) => `| ${r} | ${n} |`)].join('\n'),
    '',
    ...exportSteps(),
  ];

  const block = (c, i) => {
    const d = c.article?.data;
    const lines = [
      `### ${i + 1}. \`${c.path}\``,
      '',
      `- **Current primary intent:** ${d ? `${d.intent} — "${d.primaryKeyword}"` : 'not an article'}`,
      `- **28 days:** ${num(c.cur.clicks)} clicks, ${num(c.cur.impressions)} impressions, CTR ${pct(c.cur.ctr)}, average position ${pos(c.cur.position)}`,
      `- **Change vs previous 28 days:** clicks ${c.prev ? delta(c.clickChange) : 'no comparison exported'}, CTR ${c.prev ? delta(c.ctrChange) : '—'}, position ${c.prev ? `${pos(c.prev.position)} → ${pos(c.cur.position)}` : '—'}`,
      `- **90 days:** ${c.long ? `${num(c.long.current.clicks)} clicks, ${num(c.long.current.impressions)} impressions, CTR ${pct(c.long.current.ctr)}, position ${pos(c.long.current.position)}${c.long.previous ? ` (previous: ${num(c.long.previous.clicks)} clicks, position ${pos(c.long.previous.position)})` : ''}` : 'not provided'}`,
      `- **Important queries${c.queries.some((q) => !q.attributed) ? ' (inferred from the site-wide query table — not attributed to this page)' : ''}:** ${c.queries.length ? c.queries.map((q) => `"${q.query}" (${num(q.impressions)} impr., pos ${pos(q.position)})`).join('; ') : 'none available — export page-level queries'}`,
      `- **Recommended update:** ${c.recommendations.join(' ')}`,
      `- **Missing subtopics:** ${c.missing.length ? c.missing.map((q) => `"${q}"`).join(', ') : 'none detected'}`,
      `- **Internal-link opportunities:** ${c.links.length ? c.links.map((s) => `\`/blog/${s}/\``).join(', ') : 'none suggested'}`,
      `- **Outdated facts:** ${c.signals.filter((s) => ['outdated-app-facts', 'stale-comparison'].includes(s.kind)).map((s) => s.detail).join('; ') || 'none detected'}`,
      `- **Source improvements:** ${c.signals.filter((s) => ['thin-sourcing', 'old-sources', 'dead-source'].includes(s.kind)).map((s) => s.detail).join('; ') || (d ? `${d.sources.length} source(s); none flagged` : '—')}`,
      `- **Cannibalisation risk:** ${c.cannibal.length ? c.cannibal.map((x) => `"${x.query}" also shows \`${x.path}\` (${num(x.impressions)} impr.)`).join('; ') : pageQueries ? 'none in the page-query export' : 'unknown without a page-query export'}`,
      `- **Measurement window:** compare the ${config.measurementWindowDays} days after the change with the ${config.measurementWindowDays} days before it, same weekdays, once Search Console shows the page recrawled.`,
      `- **Update or consolidate:** ${c.consolidate ? `consider consolidating — ${c.stronger.map((x) => `\`${x.path}\``).join(', ')} earns more clicks on the same queries; compare both pages before choosing` : 'update in place'}`,
      '',
    ];
    return lines.join('\n');
  };

  const queue = [
    '# Refresh queue',
    '',
    `_Generated by \`npm run report:search-console\` on ${today}. Do not edit by hand. Method and caveats: [search-console-refresh-report.md](./search-console-refresh-report.md)._`,
    '',
    `${candidates.length} page(s) qualified; the top ${Math.min(candidates.length, config.maxQueue)} are listed. Read each page against its queries before changing it — a page that already answers them well is left alone, and \`updatedAt\` moves only after a substantive change.`,
    '',
    ...candidates.slice(0, config.maxQueue).map(block),
    '## Consider consolidating',
    '',
    candidates.filter((c) => c.consolidate).length === 0
      ? 'No page loses a shared query to a stronger page of ours in this data.'
      : candidates.filter((c) => c.consolidate).map((c) => `- \`${c.path}\` vs ${c.stronger.map((x) => `\`${x.path}\``).join(', ')}`).join('\n'),
    '',
  ];

  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'search-console-refresh-report.md'), report.join('\n'), 'utf8');
  writeFileSync(join(outDir, 'refresh-queue.md'), queue.join('\n'), 'utf8');
  console.log(`${candidates.length} candidate(s) from ${primary.rows.length} page rows → ${relative(ROOT, outDir).split('\\').join('/')}/`);
  if (!args.includes('--publish-to-docs')) console.log('(reports stay in a gitignored folder; pass --publish-to-docs to write them to docs/)');
}

if (hasData) writeWithData();
else writeNoData();

