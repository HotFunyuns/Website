// Internal-link graph and audit for the exported site.
//
// Reads what a crawler receives — every page in out/ — and classifies each link
// by where it sits on the page, because "linked from 600 pages" means nothing
// when 598 of them are the footer:
//
//   body      the prose of an article (links written into the Markdown)
//   related   an article's "Keep reading" grid
//   global    the header and footer, present on every page
//   crumb     breadcrumbs
//   listing   everything else: blog index, category and hub listings, app-page
//             guide grids, the author page, CTAs, prev/next, sidebars
//
// "Editorial" inbound = links from another article's body or related grid. That
// is the measure the orphan and thin-linking sections use for articles; the
// listing pages link every article, so counting them would hide every gap.
//
// Writes, from the current build:
//   docs/internal-linking-report.md      the audit, for people
//   docs/data/link-graph.json            one record per page, for tools
//   docs/data/link-graph-edges.csv       every editorial edge, with anchor text
//
// Diagnostic only — it never fails. The hard gates live in
// scripts/validate-content.mjs. Run after `npm run build`:
//   node scripts/link-report.mjs

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MIN_LINK_RELEVANCE, relevanceProfile, relevanceScore } from '../src/lib/blog/relevance.mjs';
import { OUT_DIR, ROOT, SITE, bodyTargets, extractLinks, blogSlugOf, loadSiteData, readArticles } from './lib/content.mjs';
import { isPublic } from './lib/publishing.mjs';

const DOCS = join(ROOT, 'docs');
const DATA = join(DOCS, 'data');
/** A body anchor reused this often for one target reads as templated. */
const REPEATED_ANCHOR = 10;
/** Listing pages with less standing copy than this are "thin context". */
const THIN_CONTEXT_WORDS = 60;
/** The article template renders this many "Keep reading" cards. */
const RENDERED_RELATED = 6;

if (!existsSync(OUT_DIR)) {
  console.error('link-report: out/ not found — run `npm run build` first.');
  process.exit(1);
}
mkdirSync(DATA, { recursive: true });

/* ------------------------------------------------------------------ inputs */

const articles = readArticles();
const site = loadSiteData();
const publicArticles = articles.filter((a) => isPublic(a.data));
const privateSlugs = new Set(articles.filter((a) => !isPublic(a.data)).map((a) => a.slug));
const bySlug = new Map(publicArticles.map((a) => [a.slug, a]));
const hubById = new Map(site.hubs.map((h) => [h.id, h]));

const sitemap = readFileSync(join(OUT_DIR, 'sitemap.xml'), 'utf8');
const indexable = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].slice(SITE.length)));

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}
const files = walk(OUT_DIR);
const exported = new Set(files.map((f) => f.slice(OUT_DIR.length + 1).split('\\').join('/')));
const routeOf = (file) => `/${file.slice(OUT_DIR.length + 1).split('\\').join('/').replace(/index\.html$/, '')}`;

function pageType(route) {
  if (route === '/') return 'home';
  if (route === '/404.html') return 'error';
  if (route === '/blog/') return 'blog-index';
  if (route === '/apps/') return 'apps-index';
  if (route.startsWith('/blog/category/')) return 'blog-category';
  if (route.startsWith('/blog/topics/')) return 'topic-hub';
  if (route.startsWith('/apps/category/')) return 'app-category';
  if (route.startsWith('/authors/')) return 'author';
  if (route.startsWith('/blog/')) return 'article';
  if (route.startsWith('/apps/')) return 'app';
  return 'static';
}

const decode = (text) =>
  text
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, '&');
const textOf = (html) =>
  decode(html.replace(/<span class="sr-only">[\s\S]*?<\/span>/g, ' ').replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

/** [start, end) offsets of the page regions that classify a link. */
function regions(html) {
  const spans = [];
  const add = (name, start, end) => start >= 0 && end > start && spans.push({ name, start, end });
  for (const m of html.matchAll(/<div class="prose[^"]*"[^>]*>/g)) {
    add('body', m.index, html.indexOf('</div>', m.index));
  }
  const related = html.indexOf('aria-labelledby="related-articles-heading"');
  if (related >= 0) add('related', related, html.indexOf('</section>', related));
  const crumb = html.indexOf('aria-label="Breadcrumb"');
  if (crumb >= 0) add('crumb', crumb, html.indexOf('</nav>', crumb));
  const header = html.search(/<header[\s>]/);
  if (header >= 0) add('global', header, html.indexOf('</header>', header));
  const footer = html.search(/<footer[\s>]/);
  if (footer >= 0) add('global', footer, html.indexOf('</footer>', footer));
  return spans;
}

/** Classifies an href: an internal route, a redirecting form, or external. */
function classify(href) {
  let url = decode(href);
  if (/^https?:\/\/(?:www\.)?reigncreativellc\.com/i.test(url)) {
    const redirecting = /^http:|^https:\/\/www\./i.test(url);
    url = url.replace(/^https?:\/\/(?:www\.)?reigncreativellc\.com/i, '') || '/';
    return { internal: true, path: url.split(/[?#]/)[0], redirecting, absolute: true };
  }
  if (!url.startsWith('/') || url.startsWith('//')) return { internal: false };
  return { internal: true, path: url.split(/[?#]/)[0], redirecting: false, absolute: false };
}

const fileExists = (path) => {
  const clean = path.replace(/^\//, '');
  if (clean === '') return exported.has('index.html');
  if (clean.endsWith('/')) return exported.has(`${clean}index.html`);
  return exported.has(clean) || exported.has(`${clean}/index.html`);
};

/* -------------------------------------------------------------- the graph */

const pages = new Map();
const edges = [];

for (const file of files.filter((f) => f.endsWith('.html'))) {
  const route = routeOf(file);
  const html = readFileSync(file, 'utf8');
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1] ?? null;
  const spans = regions(html);
  const page = {
    url: route,
    type: pageType(route),
    indexable: indexable.has(route),
    canonical,
    outbound: [],
    broken: [],
    redirecting: [],
    words: textOf(html.replace(/<script[\s\S]*?<\/script>/g, '')).split(' ').length,
    html,
  };
  pages.set(route, page);

  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const attrs = m[1];
    const href = /\bhref="([^"]*)"/.exec(attrs)?.[1];
    if (!href) continue;
    const c = classify(href);
    if (!c.internal || c.path.startsWith('/_next/')) continue;
    const region = spans.find((s) => m.index >= s.start && m.index < s.end)?.name ?? 'listing';
    let anchor = textOf(m[2]);
    if (!anchor || /^read\s*→?$/i.test(anchor)) anchor = decode(/aria-label="([^"]*)"/.exec(attrs)?.[1] ?? anchor);

    const needsSlash = !/\.[a-z0-9]+$/i.test(c.path) && !c.path.endsWith('/');
    const nonCanonicalForm =
      c.redirecting || needsSlash || /[A-Z]/.test(c.path) || c.path.endsWith('/index.html');
    const edge = { from: route, to: c.path, region, anchor };
    page.outbound.push(edge);
    if (nonCanonicalForm) page.redirecting.push({ href: decode(href), reason: c.redirecting ? 'http or www host' : needsSlash ? 'missing trailing slash' : 'non-canonical spelling' });
    if (!fileExists(c.path)) page.broken.push(decode(href));
  }
}

// Aliases: exported pages whose canonical names another page. Linking one is a
// link through a redirect (GitHub Pages cannot 301, so the alias itself answers).
const aliases = new Map(
  [...pages.values()]
    .filter((p) => p.canonical && p.canonical !== `${SITE}${p.url}` && p.type !== 'error')
    .map((p) => [p.url, p.canonical])
);

for (const page of pages.values()) {
  for (const edge of page.outbound) {
    if (aliases.has(edge.to)) page.redirecting.push({ href: edge.to, reason: `retired alias of ${aliases.get(edge.to)}` });
    if (edge.to !== page.url && pages.has(edge.to)) edges.push(edge);
  }
}

/* ------------------------------------------------------------ measurements */

const inbound = new Map([...pages.keys()].map((url) => [url, []]));
for (const edge of edges) inbound.get(edge.to).push(edge);

const depth = new Map([['/', 0]]);
let frontier = ['/'];
while (frontier.length) {
  const next = [];
  for (const url of frontier) {
    for (const edge of pages.get(url)?.outbound ?? []) {
      if (pages.has(edge.to) && !depth.has(edge.to)) {
        depth.set(edge.to, depth.get(url) + 1);
        next.push(edge.to);
      }
    }
  }
  frontier = next;
}

const isEditorial = (edge) => pageType(edge.from) === 'article' && (edge.region === 'body' || edge.region === 'related');
const distinct = (list) => new Set(list.map((e) => e.from)).size;
const articleSlugOf = (url) => (pageType(url) === 'article' ? url.replace(/^\/blog\//, '').replace(/\/$/, '') : null);

const profiles = new Map(publicArticles.map((a) => [a.slug, relevanceProfile({ slug: a.slug, ...a.data })]));
const persistedInbound = new Map(publicArticles.map((a) => [a.slug, new Set()]));
for (const a of publicArticles) {
  for (const t of new Set([...bodyTargets(a), ...(a.data.relatedArticles ?? [])])) {
    if (persistedInbound.has(t) && t !== a.slug) persistedInbound.get(t).add(a.slug);
  }
}

function suggestionsFor(article) {
  const existing = persistedInbound.get(article.slug) ?? new Set();
  return publicArticles
    .filter((other) => other.slug !== article.slug && !existing.has(other.slug))
    .map((other) => ({ slug: other.slug, score: relevanceScore(profiles.get(article.slug), profiles.get(other.slug)), older: other.data.publishedAt < article.data.publishedAt }))
    .filter((c) => c.score >= MIN_LINK_RELEVANCE)
    .sort((a, b) => Number(b.older) - Number(a.older) || b.score - a.score || a.slug.localeCompare(b.slug))
    .slice(0, 5);
}

const records = [];
for (const page of pages.values()) {
  if (!page.indexable && page.type !== 'error' && !aliases.has(page.url)) continue;
  const inc = inbound.get(page.url);
  const slug = articleSlugOf(page.url);
  const article = slug ? bySlug.get(slug) : null;
  const editorial = inc.filter(isEditorial);
  const bodyAnchors = new Map();
  for (const e of editorial.filter((x) => x.region === 'body')) bodyAnchors.set(e.anchor, (bodyAnchors.get(e.anchor) ?? 0) + 1);

  const record = {
    url: page.url,
    type: page.type,
    indexable: page.indexable,
    depth: depth.get(page.url) ?? null,
    inbound: {
      pages: distinct(inc),
      editorial: distinct(editorial),
      body: distinct(inc.filter((e) => isEditorial(e) && e.region === 'body')),
      related: distinct(inc.filter((e) => isEditorial(e) && e.region === 'related')),
      listing: distinct(inc.filter((e) => !isEditorial(e) && e.region !== 'global')),
      global: distinct(inc.filter((e) => e.region === 'global')),
    },
    outbound: {
      targets: new Set(page.outbound.filter((e) => e.to !== page.url).map((e) => e.to)).size,
      body: new Set(page.outbound.filter((e) => e.region === 'body').map((e) => e.to)).size,
      related: new Set(page.outbound.filter((e) => e.region === 'related').map((e) => e.to)).size,
    },
    anchors: [...bodyAnchors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([text, count]) => ({ text, count })),
    orphan: distinct(inc) === 0 && page.url !== '/',
    broken: page.broken,
    redirecting: page.redirecting,
  };

  if (article) {
    const hubs = (article.data.hubs ?? []).filter((id) => hubById.has(id));
    const older = editorial.filter((e) => {
      const from = bySlug.get(articleSlugOf(e.from));
      return from && from.data.publishedAt < article.data.publishedAt;
    });
    Object.assign(record, {
      app: article.data.relatedApps[0],
      category: article.data.category,
      hubs,
      cornerstones: hubs.map((id) => hubById.get(id).cornerstone).filter((c) => c !== article.slug),
      publishedAt: article.data.publishedAt,
      editorialOrphan: distinct(editorial) === 0,
      olderInbound: distinct(older),
      linksOwnAppInBody: extractLinks(article.body).some((l) => l.href === `/apps/${article.data.relatedApps[0]}/`),
      relatedDeclared: (article.data.relatedArticles ?? []).length,
      unpublishedRefs: [
        ...[...bodyTargets(article)].filter((s) => privateSlugs.has(s) || !bySlug.has(s)),
        ...(article.data.relatedArticles ?? []).filter((s) => privateSlugs.has(s) || !bySlug.has(s)),
      ],
      shouldLinkHere: suggestionsFor(article),
    });
  }
  records.push(record);
}
records.sort((a, b) => a.url.localeCompare(b.url));

/* --------------------------------------------------------------- findings */

const indexed = records.filter((r) => r.indexable);
const articleRecords = indexed.filter((r) => r.type === 'article');
const broken = records.filter((r) => r.broken.length);
const redirecting = records.filter((r) => r.redirecting.length);
const unpublishedRefs = articleRecords.filter((r) => r.unpublishedRefs.length);
const orphans = indexed.filter((r) => r.orphan);
const editorialOrphans = articleRecords.filter((r) => r.editorialOrphan);
const singleInbound = indexed.filter((r) => r.inbound.pages === 1);
const singleEditorial = articleRecords.filter((r) => r.inbound.editorial === 1);
const IMPORTANT = new Set(['home', 'blog-index', 'apps-index', 'app', 'app-category', 'blog-category', 'topic-hub', 'author', 'article', 'static']);
const deep = indexed.filter((r) => IMPORTANT.has(r.type) && (r.depth === null || r.depth > 3));
const noAppLink = articleRecords.filter((r) => !r.linksOwnAppInBody);
const cornerstoneGaps = articleRecords.flatMap((r) => {
  const article = bySlug.get(articleSlugOf(r.url));
  const linked = new Set([...bodyTargets(article), ...(article.data.relatedArticles ?? [])]);
  return r.cornerstones.filter((c) => !linked.has(c)).map((c) => ({ url: r.url, cornerstone: c }));
});
const overRendered = articleRecords.filter((r) => r.relatedDeclared > RENDERED_RELATED);

// Body anchors: the same words sending readers to the same page, over and over.
const anchorTotals = new Map();
const anchorTargets = new Map();
for (const edge of edges.filter((e) => isEditorial(e) && e.region === 'body')) {
  const key = `${edge.anchor.toLowerCase()}\u0000${edge.to}`;
  anchorTotals.set(key, (anchorTotals.get(key) ?? 0) + 1);
  const text = edge.anchor.toLowerCase();
  if (!anchorTargets.has(text)) anchorTargets.set(text, new Set());
  anchorTargets.get(text).add(edge.to);
}
const repeated = [...anchorTotals.entries()]
  .filter(([, n]) => n >= REPEATED_ANCHOR)
  .map(([key, n]) => ({ anchor: key.split('\u0000')[0], to: key.split('\u0000')[1], n }))
  .sort((a, b) => b.n - a.n);
const GENERIC = /^(?:click here|here|read more|this article|this guide|this post|link|learn more|more)$/i;
const generic = [...anchorTargets.keys()].filter((text) => GENERIC.test(text));

// App pages: which of the app's own guides does its page link?
const appCoverage = site.apps.map((app) => {
  const own = publicArticles.filter((a) => a.data.relatedApps[0] === app.slug);
  const page = pages.get(`/apps/${app.slug}/`);
  const linked = new Set((page?.outbound ?? []).map((e) => e.to));
  const covered = own.filter((a) => linked.has(`/blog/${a.slug}/`)).length;
  const hubs = site.hubs.filter((h) => h.appSlug === app.slug && linked.has(`/blog/topics/${h.id}/`)).length;
  return { app: app.slug, articles: own.length, linkedFromAppPage: covered, hubsLinked: hubs };
});
const appsWithoutArticles = appCoverage.filter((c) => c.articles === 0);
const appsPartial = appCoverage.filter((c) => c.articles > 0 && c.linkedFromAppPage < c.articles && c.hubsLinked === 0);

// Standing copy on listing pages: page words minus the text of the cards,
// header, footer and navigation it carries.
function standingWords(page) {
  const html = page.html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<header[\s\S]*?<\/header>/g, '')
    .replace(/<footer[\s\S]*?<\/footer>/g, '')
    .replace(/<nav[\s\S]*?<\/nav>/g, '')
    .replace(/<article[\s\S]*?<\/article>/g, '')
    .replace(/<a\b[\s\S]*?<\/a>/g, '');
  return textOf(html).split(' ').filter(Boolean).length;
}
const contextRows = indexed
  .filter((r) => ['blog-category', 'app-category', 'topic-hub'].includes(r.type))
  .map((r) => ({ url: r.url, type: r.type, words: standingWords(pages.get(r.url)) }));
const thinContext = contextRows.filter((r) => r.words < THIN_CONTEXT_WORDS);

// Release cohorts: which articles have no rendered editorial link from an older one.
const cohorts = new Map();
for (const r of articleRecords) {
  if (!cohorts.has(r.publishedAt)) cohorts.set(r.publishedAt, { total: 0, noOlder: [] });
  const c = cohorts.get(r.publishedAt);
  c.total++;
  if (r.olderInbound === 0) c.noOlder.push(r.url);
}
const cohortRows = [...cohorts.entries()].sort((a, b) => b[0].localeCompare(a[0]));
const firstCohort = cohortRows.length ? cohortRows[cohortRows.length - 1][0] : null;

/* ------------------------------------------------------------------ outputs */

const graph = {
  description:
    'Internal-link graph of the exported site. inbound.editorial counts other articles linking in prose or "Keep reading"; listing and global links are counted separately. Generated by scripts/link-report.mjs.',
  site: SITE,
  summary: {
    pages: pages.size,
    indexable: indexed.length,
    articles: articleRecords.length,
    editorialEdges: edges.filter(isEditorial).length,
    brokenLinks: broken.reduce((n, r) => n + r.broken.length, 0),
    redirectingLinks: redirecting.reduce((n, r) => n + r.redirecting.length, 0),
    orphans: orphans.length,
    articlesWithoutEditorialInbound: editorialOrphans.length,
    articlesWithOneEditorialInbound: singleEditorial.length,
    deeperThanThree: deep.length,
    maxDepth: Math.max(...indexed.map((r) => r.depth ?? 0)),
  },
  pages: records.map(({ html, ...rest }) => rest),
};
writeFileSync(join(DATA, 'link-graph.json'), `${JSON.stringify(graph, null, 1)}\n`, 'utf8');

const csvCell = (value) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
const editorialEdges = edges
  .filter(isEditorial)
  .sort((a, b) => a.from.localeCompare(b.from) || a.region.localeCompare(b.region) || a.to.localeCompare(b.to));
writeFileSync(
  join(DATA, 'link-graph-edges.csv'),
  ['source,target,region,anchor', ...editorialEdges.map((e) => [e.from, e.to, e.region, e.anchor].map(csvCell).join(','))].join('\n') + '\n',
  'utf8'
);

const lines = [];
const out = (...text) => lines.push(...text);
const list = (items, render, limit = 60) => {
  if (items.length === 0) return out('None.', '');
  for (const item of items.slice(0, limit)) out(render(item));
  if (items.length > limit) out(`- … and ${items.length - limit} more (see \`docs/data/link-graph.json\`)`);
  out('');
};

out(
  '# Internal linking report',
  '',
  '_Generated by `node scripts/link-report.mjs` from the exported `out/` directory. Do not edit by hand._',
  '_Machine-readable: `docs/data/link-graph.json` (one record per page) and `docs/data/link-graph-edges.csv` (every editorial link with its anchor)._',
  '',
  '## How to read this',
  '',
  'Links are classified by where they sit on the rendered page. **Editorial** links are the ones another',
  "article chose: its prose (`body`) and its \"Keep reading\" grid (`related`). **Listing** links come from",
  'pages that list articles — the blog index, category and hub pages, app pages, the author page — and',
  '**global** links are the header and footer. The blog index links every article, so any count that',
  'includes listing links shows no gaps at all; the orphan and thin-linking findings below therefore',
  'count editorial links for articles. Click depth is the shortest path from the homepage over every link.',
  '',
  '## Summary',
  '',
  '| Measure | Count |',
  '| --- | --- |',
  `| Exported HTML pages | ${pages.size} |`,
  `| Indexable pages (in the sitemap) | ${indexed.length} |`,
  `| Articles | ${articleRecords.length} |`,
  `| Editorial links (article prose + "Keep reading") | ${graph.summary.editorialEdges} |`,
  `| Broken internal links | ${graph.summary.brokenLinks} |`,
  `| Links through a redirect or non-canonical form | ${graph.summary.redirectingLinks} |`,
  `| Articles linking unpublished or missing articles | ${unpublishedRefs.length} |`,
  `| Orphan pages (no inbound link at all) | ${orphans.length} |`,
  `| Articles with no editorial inbound link | ${editorialOrphans.length} |`,
  `| Articles with exactly one editorial inbound link | ${singleEditorial.length} |`,
  `| Pages with exactly one inbound link of any kind | ${singleInbound.length} |`,
  `| Important pages more than three clicks from the homepage | ${deep.length} (deepest: ${graph.summary.maxDepth}) |`,
  `| Body anchors repeated ${REPEATED_ANCHOR}+ times for one target | ${repeated.length} |`,
  `| Articles whose prose does not link their own app page | ${noAppLink.length} |`,
  `| Apps with no article | ${appsWithoutArticles.length} |`,
  `| Category and hub pages under ${THIN_CONTEXT_WORDS} words of standing copy | ${thinContext.length} |`,
  `| Hub articles that do not link their hub's cornerstone | ${cornerstoneGaps.length} |`,
  ''
);

out('## Broken internal links', '');
list(broken, (r) => `- \`${r.url}\` → ${r.broken.map((b) => `\`${b}\``).join(', ')}`);

out('## Links through redirects', '', 'Hrefs that would be answered by a redirect or a retired alias rather than the canonical page.', '');
list(redirecting, (r) => `- \`${r.url}\` → ${r.redirecting.map((x) => `\`${x.href}\` (${x.reason})`).join(', ')}`);

out('## Links to unpublished or missing pages', '', 'Source-level: body links and `relatedArticles` naming an article that is not public. The build fails if any reaches the HTML.', '');
list(unpublishedRefs, (r) => `- \`${r.url}\` → ${r.unpublishedRefs.join(', ')}`);

out('## Orphan pages', '', 'No inbound link from any page.', '');
list(orphans, (r) => `- \`${r.url}\` (${r.type})`);

out('## Articles with no editorial inbound link', '', 'No other article links them in prose or "Keep reading". Suggested sources are the most relevant public articles, older first.', '');
list(editorialOrphans, (r) => `- \`${r.url}\` — could be linked from ${r.shouldLinkHere.map((s) => `\`${s.slug}\``).join(', ') || 'no candidate above the relevance threshold'}`);

out('## Articles with exactly one editorial inbound link', '');
list(singleEditorial, (r) => `- \`${r.url}\` — could also be linked from ${r.shouldLinkHere.slice(0, 3).map((s) => `\`${s.slug}\``).join(', ') || 'no candidate above the relevance threshold'}`);

out('## Pages with exactly one inbound link of any kind', '');
list(singleInbound, (r) => `- \`${r.url}\` (${r.type})`);

out('## Important pages more than three clicks from the homepage', '');
list(deep, (r) => `- \`${r.url}\` — depth ${r.depth ?? 'unreachable'}`);

out(
  '## Anchor text',
  '',
  `### Body anchors used ${REPEATED_ANCHOR} or more times for the same target`,
  '',
  'Identical anchor text from many articles to one page. Not an error — these are mostly the target\'s own title — but new links should vary the wording where the prose allows. Existing prose is not rewritten just to vary an anchor.',
  ''
);
list(repeated, (r) => `- "${r.anchor}" → \`${r.to}\` × ${r.n}`, 40);
out('### Generic anchors', '');
list(generic, (text) => `- "${text}"`);

out('## Articles that do not link their own app page in the body', '', 'Every article page also carries the app CTA with the tracked Google Play link; this checks the prose.', '');
list(noAppLink, (r) => `- \`${r.url}\` (${r.app})`);

out('## App pages and their supporting articles', '', '`linked` counts the app\'s own articles (those naming it as the primary app) that its page links directly; apps with topic hubs link the hubs, which list every article.', '');
out('| App | Articles | Linked from app page | Hubs linked |', '| --- | --- | --- | --- |');
for (const c of appCoverage) out(`| \`/apps/${c.app}/\` | ${c.articles} | ${c.linkedFromAppPage} | ${c.hubsLinked} |`);
out('');
if (appsWithoutArticles.length) out(`Apps with no article at all: ${appsWithoutArticles.map((c) => `\`${c.app}\``).join(', ')}.`, '');
if (appsPartial.length) out(`App pages that link only some of their articles and no hub: ${appsPartial.map((c) => `\`${c.app}\``).join(', ')}.`, '');

out('## Category and hub pages: standing context', '', `Words of copy written for the page itself, excluding cards, navigation, header and footer. Under ${THIN_CONTEXT_WORDS} is flagged.`, '');
out('| Page | Type | Words |', '| --- | --- | --- |');
for (const r of contextRows) out(`| \`${r.url}\` | ${r.type} | ${r.words}${r.words < THIN_CONTEXT_WORDS ? ' ⚠' : ''} |`);
out('');

out(
  '## Release cohorts: links from older articles',
  '',
  'For each publication date, how many of its articles are linked (prose or "Keep reading", as rendered) from at least one article published earlier. New articles link outward to older ones; this shows whether anything older links back.',
  '',
  '| Published | Articles | With a link from an older article | Without |',
  '| --- | --- | --- | --- |'
);
for (const [day, c] of cohortRows) {
  out(`| ${day} | ${c.total} | ${c.total - c.noOlder.length} | ${day === firstCohort ? '— (first release)' : c.noOlder.length} |`);
}
out('');

out("## Hub articles that do not link their hub's cornerstone", '');
list(cornerstoneGaps, (g) => `- \`${g.url}\` → \`/blog/${g.cornerstone}/\``);

out('## `relatedArticles` beyond the six the template renders', '');
list(overRendered, (r) => `- \`${r.url}\` declares ${r.relatedDeclared}`);

out('## Every indexable page', '', '| Page | Type | App | Category / hubs | Inbound (all) | Inbound (editorial) | Outbound | Depth |', '| --- | --- | --- | --- | --- | --- | --- | --- |');
for (const r of indexed) {
  const cluster = r.type === 'article' ? [r.category, ...(r.hubs ?? [])].join(', ') : '';
  out(`| \`${r.url}\` | ${r.type} | ${r.app ?? ''} | ${cluster} | ${r.inbound.pages} | ${r.type === 'article' ? r.inbound.editorial : ''} | ${r.outbound.targets} | ${r.depth ?? '—'} |`);
}
out('');

writeFileSync(join(DOCS, 'internal-linking-report.md'), lines.join('\n'), 'utf8');

console.log(
  `link report: ${pages.size} pages, ${graph.summary.brokenLinks} broken, ${orphans.length} orphans, ` +
    `${editorialOrphans.length} articles without editorial inbound, ${singleEditorial.length} with one, ` +
    `max depth ${graph.summary.maxDepth}`
);
console.log('  docs/internal-linking-report.md');
console.log('  docs/data/link-graph.json');
console.log('  docs/data/link-graph-edges.csv');
