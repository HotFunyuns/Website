// Parses every JSON-LD block in the exported site and checks it against the
// shape Schema.org and Google's structured-data documentation require, plus the
// house rule that we never mark up something a visitor cannot see.
//
// This is a syntax and completeness check, not a substitute for Google's Rich
// Results Test — which needs a live URL and is run separately after deploy.
//
// Run: node scripts/validate-structured-data.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { laDay } from './lib/publishing.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');
const CONTENT = join(ROOT, 'content', 'blog');
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
    else if (full.endsWith('.html')) found.push(full);
  }
  return found;
}

const problems = [];
const counts = {};
const fail = (m) => problems.push(m);

/**
 * Fields we will not publish, because we have no verified source for them.
 *
 * Every one of these asserts popularity, quality or endorsement — a star
 * rating, a review count, an install total, an award. We hold no audited figure
 * for any of them, and a number nobody can check is a fabrication whether or
 * not it is plausible. The check walks object keys rather than searching the
 * serialised JSON, so an article that happens to discuss the word "review" in
 * prose is not mistaken for markup that claims one.
 */
const FORBIDDEN_FIELDS = new Set([
  'aggregateRating',
  'ratingValue',
  'ratingCount',
  'bestRating',
  'worstRating',
  'review',
  'reviews',
  'reviewCount',
  'reviewRating',
  'award',
  'awards',
  'interactionStatistic',
  'userInteractionCount',
  'contentRating',
  'downloadCount',
  'installCount',
]);

/** Types whose whole purpose is to assert a rating or endorsement. */
const FORBIDDEN_TYPES = new Set(['AggregateRating', 'Rating', 'Review', 'EndorsementRating']);

/**
 * Every @type this site is allowed to emit, nested types included. An
 * allowlist rather than a "looks like a schema.org type" heuristic: a typo such
 * as `BlogPost` or `SoftwareApp` is silently ignored by consumers, which is
 * exactly how markup rots without anyone noticing.
 */
const ALLOWED_TYPES = new Set([
  'AboutPage',
  'Answer',
  'Blog',
  'BlogPosting',
  'BreadcrumbList',
  'CollectionPage',
  'ContactPoint',
  'CreativeWork',
  'FAQPage',
  'ItemList',
  'ListItem',
  'Offer',
  'Organization',
  'Person',
  'ProfilePage',
  'Question',
  'SoftwareApplication',
  'WebPage',
  'WebSite',
]);

/**
 * Required fields for a block that *is* the page's markup for itself.
 *
 * Kept separate from REQUIRED_NESTED because a nested node is a reference to
 * another thing, not a full description of it: the article summaries inside
 * Blog.blogPost legitimately carry a headline and a URL and nothing else, and
 * demanding an author on each would be demanding markup Google does not want.
 */
const REQUIRED = {
  Organization: ['name', 'url'],
  WebSite: ['name', 'url'],
  Blog: ['name', 'url'],
  SoftwareApplication: ['name', 'applicationCategory', 'operatingSystem', 'url'],
  BlogPosting: ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage'],
  BreadcrumbList: ['itemListElement'],
  FAQPage: ['mainEntity'],
  CollectionPage: ['name', 'url'],
  ProfilePage: ['url', 'mainEntity'],
  AboutPage: ['url', 'mainEntity'],
};

/** Fields a nested node cannot be meaningful without. */
const REQUIRED_NESTED = {
  ListItem: ['position'],
  Question: ['name', 'acceptedAnswer'],
  Answer: ['text'],
  Offer: ['price', 'priceCurrency'],
  BlogPosting: ['headline', 'url'],
  ItemList: ['itemListElement'],
};

/**
 * The schema each kind of page must carry. Missing markup is invisible: nothing
 * errors, the rich result simply never appears. Stating the expectation per page
 * type turns "we forgot BreadcrumbList on the new template" into a build
 * failure rather than a slow decline in Search Console.
 */
const EXPECTED_BY_PAGE_TYPE = {
  home: ['Organization', 'WebSite'],
  article: ['Organization', 'WebSite', 'BlogPosting', 'BreadcrumbList'],
  app: ['Organization', 'WebSite', 'SoftwareApplication', 'BreadcrumbList'],
  'app-category': ['Organization', 'WebSite', 'CollectionPage', 'BreadcrumbList'],
  'blog-category': ['Organization', 'WebSite', 'CollectionPage', 'BreadcrumbList'],
  'blog-hub': ['Organization', 'WebSite', 'CollectionPage', 'BreadcrumbList'],
  'blog-index': ['Organization', 'WebSite', 'Blog'],
  'apps-index': ['Organization', 'WebSite', 'CollectionPage'],
  author: ['Organization', 'WebSite', 'ProfilePage', 'BreadcrumbList'],
  about: ['Organization', 'WebSite', 'AboutPage'],
  static: ['Organization', 'WebSite'],
  error: ['Organization', 'WebSite'],
};

function pageTypeOf(route) {
  if (route === '/') return 'home';
  if (route.startsWith('/404')) return 'error';
  if (route === '/blog/') return 'blog-index';
  if (route === '/apps/') return 'apps-index';
  if (route === '/about/') return 'about';
  if (route.startsWith('/authors/')) return 'author';
  if (route.startsWith('/blog/category/')) return 'blog-category';
  // Must precede the generic /blog/ branch below, or a topic hub is mistaken
  // for an article and required to carry a BlogPosting it does not emit.
  if (route.startsWith('/blog/topics/')) return 'blog-hub';
  if (route.startsWith('/apps/category/')) return 'app-category';
  if (route.startsWith('/blog/')) return 'article';
  if (route.startsWith('/apps/')) return 'app';
  return 'static';
}

/** slug -> { publishedAt, updatedAt, title } read straight from the source of truth. */
const frontmatter = new Map();
if (existsSync(CONTENT)) {
  for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
    const raw = readFileSync(join(CONTENT, file), 'utf8');
    const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    if (!block) continue;
    try {
      frontmatter.set(file.replace(/\.md$/, ''), JSON.parse(block[1]));
    } catch {
      /* the content validator owns reporting malformed frontmatter */
    }
  }
}

/** Every route the export publishes, so breadcrumb targets can be resolved. */
const exportedRoutes = new Set(
  walk(OUT).map((f) => `/${f.slice(OUT.length + 1).split('\\').join('/').replace(/index\.html$/, '')}`)
);

/** Every @id defined anywhere, and every reference to one, resolved after the walk. */
const definedIdsAcrossSite = new Set();
const idReferences = [];

/** Signature -> routes, to prove the site-wide entity is stated identically everywhere. */
const entitySignatures = { Organization: new Map(), WebSite: new Map() };
// Publication dates are Los Angeles calendar days; see scripts/lib/publishing.mjs.
const TODAY = laDay();

/** Walks every node of a JSON-LD tree, yielding each object that carries an @type. */
function* nodes(value) {
  if (Array.isArray(value)) {
    for (const item of value) yield* nodes(item);
    return;
  }
  if (value && typeof value === 'object') {
    yield value;
    for (const child of Object.values(value)) yield* nodes(child);
  }
}

for (const file of walk(OUT)) {
  const route = `/${file.slice(OUT.length + 1).split('\\').join('/').replace(/index\.html$/, '')}`;
  const doc = readFileSync(file, 'utf8');
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(doc)?.[1];
  const pageType = pageTypeOf(route);
  const topLevelTypes = [];
  const definedIds = new Set();
  const referencedIds = new Set();

  // Compare against what a reader actually sees: strip scripts and tags, then
  // decode the entities the renderer emitted, so a curly apostrophe in a
  // question still matches the same apostrophe in the rendered answer.
  const decode = (t) =>
    t
      .replace(/&#x27;|&apos;|&#39;/g, "'")
      .replace(/&quot;|&#34;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;|&#160;/g, ' ')
      .replace(/&#x2019;/g, '’')
      .replace(/\s+/g, ' ');
  const visibleText = decode(doc.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' '));

  // Every URL the page links in its visible body or Sources list. A citation in
  // the schema is only legitimate if the reader can see and follow it too.
  const visibleHrefs = new Set([...doc.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => decode(m[1])));

  for (const m of doc.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(m[1].replace(/\\u003c/g, '<'));
    } catch (error) {
      fail(`${route}: unparseable JSON-LD — ${error.message}`);
      continue;
    }

    const type = data['@type'];
    counts[type] = (counts[type] ?? 0) + 1;
    topLevelTypes.push(type);

    if (data['@context'] !== 'https://schema.org' && !data['@id']) {
      fail(`${route}: ${type} declares @context "${data['@context']}" (expected https://schema.org)`);
    }

    // Walk the whole tree. Nested nodes carry as much weight as the root — a
    // forbidden rating hidden three levels down is still a published claim.
    for (const node of nodes(data)) {
      const nodeType = node['@type'];
      if (nodeType !== undefined) {
        if (typeof nodeType !== 'string' || !ALLOWED_TYPES.has(nodeType)) {
          fail(`${route}: unknown or unapproved @type ${JSON.stringify(nodeType)}`);
        }
        if (FORBIDDEN_TYPES.has(nodeType)) {
          fail(`${route}: ${type} contains a ${nodeType} node — we publish no ratings or reviews`);
        }
        const required = node === data ? REQUIRED[nodeType] : REQUIRED_NESTED[nodeType];
        for (const field of required ?? []) {
          if (node[field] === undefined) {
            fail(`${route}: ${node === data ? '' : 'nested '}${nodeType} missing required "${field}"`);
          }
        }
      }
      for (const key of Object.keys(node)) {
        if (FORBIDDEN_FIELDS.has(key)) {
          fail(`${route}: ${type} contains forbidden field "${key}" — no verified source exists for it`);
        }
      }
      // Reference vs. definition: `{"@id": x}` alone points at a node defined
      // elsewhere. A pointer at a node nothing defines is a dangling edge.
      if (node['@id']) {
        if (Object.keys(node).length === 1) referencedIds.add(node['@id']);
        else definedIds.add(node['@id']);
      }
    }

    const serialised = JSON.stringify(data);

    // Our own URLs must be absolute, https, on this host and trailing-slashed,
    // because that is how the sitemap, the feed and every canonical spell them.
    for (const quoted of serialised.match(/"https?:\/\/[^"]*reigncreativellc\.com[^"]*"/g) ?? []) {
      const url = quoted.slice(1, -1);
      if (!url.startsWith(`${SITE}/`) && url !== SITE) {
        fail(`${route}: ${type} states ${url}, which is not an https non-www URL on this site`);
      } else if (!/#[a-z]+$/.test(url) && !/\.(png|svg|jpg|webp|xml|txt)$/.test(url) && !url.endsWith('/')) {
        fail(`${route}: ${type} states ${url} without a trailing slash`);
      }
    }

    // Everything the block says about "this page" must be the canonical URL.
    // A `url`, an `@id` or a `mainEntityOfPage` that disagrees with the
    // canonical is a second answer to "which URL is this?".
    if (canonical) {
      const PAGE_TYPES = ['BlogPosting', 'SoftwareApplication', 'CollectionPage', 'WebPage', 'Blog', 'FAQPage', 'ProfilePage', 'AboutPage'];
      if (PAGE_TYPES.includes(type) && typeof data.url === 'string' && data.url !== canonical) {
        fail(`${route}: ${type}.url is ${data.url} but the canonical is ${canonical}`);
      }
      const mainEntity = data.mainEntityOfPage?.['@id'] ?? data.mainEntityOfPage;
      if (typeof mainEntity === 'string' && mainEntity !== canonical) {
        fail(`${route}: ${type}.mainEntityOfPage is ${mainEntity} but the canonical is ${canonical}`);
      }
      if (PAGE_TYPES.includes(type) && typeof data['@id'] === 'string') {
        const base = data['@id'].split('#')[0];
        if (base && base !== canonical) {
          fail(`${route}: ${type} @id ${data['@id']} is not anchored on the canonical ${canonical}`);
        }
      }
    }

    // A citation must be a source the reader can see and click. This is the
    // structured-data half of the rule that we never mark up something that is
    // not on the page.
    if (type === 'BlogPosting') {
      for (const citation of data.citation ?? []) {
        if (!visibleHrefs.has(citation.url)) {
          fail(`${route}: cites ${citation.url} in schema but does not link it on the page`);
        }
      }
      if (data.dateModified && data.datePublished && data.dateModified < data.datePublished) {
        fail(`${route}: dateModified precedes datePublished`);
      }
      // The author must resolve to a profile this export publishes, so the
      // byline's promise — "this is who wrote it, and here is who they are" —
      // is something a crawler can follow.
      const authorUrl = data.author?.url;
      if (typeof authorUrl !== 'string' || !authorUrl.startsWith(`${SITE}/authors/`)) {
        fail(`${route}: BlogPosting.author.url ${authorUrl} is not an author profile on this site`);
      } else if (!exportedRoutes.has(authorUrl.slice(SITE.length))) {
        fail(`${route}: BlogPosting.author.url ${authorUrl} has no page in out/`);
      }
      if (data.datePublished > TODAY) {
        fail(`${route}: datePublished ${data.datePublished} is in the future`);
      }

      // The dates in the markup must be the dates recorded in the article's
      // frontmatter — not close to them, the same. A "last updated" a crawler
      // can see but the file cannot justify is an unverifiable freshness claim.
      const slug = route.replace(/^\/blog\//, '').replace(/\/$/, '');
      const source = frontmatter.get(slug);
      if (!source) {
        fail(`${route}: BlogPosting has no matching content/blog/${slug}.md`);
      } else {
        if (data.datePublished !== source.publishedAt) {
          fail(`${route}: datePublished ${data.datePublished} but frontmatter says ${source.publishedAt}`);
        }
        if (data.dateModified !== source.updatedAt) {
          fail(`${route}: dateModified ${data.dateModified} but frontmatter says ${source.updatedAt}`);
        }
        if (data.headline !== source.title) {
          fail(`${route}: BlogPosting headline does not match the article title`);
        }
      }
    }

    if (type === 'SoftwareApplication') {
      if (data.installUrl && !data.installUrl.startsWith('https://play.google.com/store/apps/')) {
        fail(`${route}: SoftwareApplication installUrl is not a Google Play listing`);
      }
      if (data.offers && data.offers.price !== '0') {
        fail(`${route}: SoftwareApplication declares a price we have not verified`);
      }
    }

    // The house rule: structured data describes what is on the page.
    if (type === 'FAQPage') {
      for (const q of data.mainEntity ?? []) {
        const needle = decode(q.name).slice(0, 30);
        if (!visibleText.includes(needle)) {
          fail(`${route}: FAQ question not visible on the page — "${decode(q.name).slice(0, 60)}"`);
        }
      }
    }
    if (type === 'BreadcrumbList') {
      const items = data.itemListElement ?? [];
      if (items.length < 2) fail(`${route}: BreadcrumbList with ${items.length} item(s)`);
      items.forEach((item, index) => {
        if (!item.name) fail(`${route}: BreadcrumbList item without a name`);
        if (item.position !== index + 1) {
          fail(`${route}: BreadcrumbList item ${index + 1} has position ${item.position}`);
        }
        if (item.item !== undefined) {
          // A crumb must lead somewhere this export actually publishes, spelled
          // the way that page spells itself.
          if (typeof item.item !== 'string' || !item.item.startsWith(`${SITE}/`)) {
            fail(`${route}: BreadcrumbList item points off-site (${item.item})`);
          } else if (!exportedRoutes.has(item.item.slice(SITE.length))) {
            fail(`${route}: BreadcrumbList item ${item.item} has no page in out/`);
          }
        }
        // The last crumb is the current page. Either it carries no URL, or the
        // URL it carries is this page's canonical — never a third address.
        if (index === items.length - 1 && item.item && canonical && item.item !== canonical) {
          fail(`${route}: last breadcrumb points at ${item.item}, not the canonical`);
        }
      });
    }

    if (type === 'Organization' || type === 'WebSite') {
      const signature = JSON.stringify(data);
      if (!entitySignatures[type].has(signature)) entitySignatures[type].set(signature, []);
      entitySignatures[type].get(signature).push(route);
    }
  }

  /* ------------------------------------------ per-page completeness checks */

  // A page whose canonical is some other URL is a retired alias kept alive to
  // pass its history on. It is not the app page, so it must not carry the app
  // page's markup — the canonical target owns that.
  const isAlias = Boolean(canonical) && canonical !== `${SITE}${route}`;
  for (const expected of isAlias ? ['Organization', 'WebSite'] : EXPECTED_BY_PAGE_TYPE[pageType] ?? []) {
    if (!topLevelTypes.includes(expected)) {
      fail(`${route}: a ${isAlias ? 'redirect-alias' : pageType} page carries no ${expected} block`);
    }
  }
  for (const type of new Set(topLevelTypes)) {
    const n = topLevelTypes.filter((t) => t === type).length;
    // Two of the same page-level type is a contradiction, not extra coverage:
    // consumers pick one and there is no rule saying which.
    if (n > 1 && ['BlogPosting', 'SoftwareApplication', 'FAQPage', 'BreadcrumbList', 'CollectionPage'].includes(type)) {
      fail(`${route}: ${n} ${type} blocks on one page`);
    }
  }
  for (const id of definedIds) definedIdsAcrossSite.add(id);
  for (const id of referencedIds) idReferences.push([route, id]);
}

// A `{"@id": …}` pointer is allowed to name a node another page defines — that
// is how every page's `publisher` reaches the one Organization node. What is
// never allowed is a pointer at an id nothing on the site defines at all.
for (const [route, id] of idReferences) {
  if (!definedIdsAcrossSite.has(id)) {
    fail(`${route}: references @id ${id}, which no page on the site defines`);
  }
}

/* ------------------------------------------------- one entity, stated once */

// Organization and WebSite describe the publisher, not the page, so they must
// be byte-identical on all 230 pages. Two spellings of one entity is how a
// knowledge-panel entity gets split in half.
for (const [type, signatures] of Object.entries(entitySignatures)) {
  if (signatures.size > 1) {
    fail(`${type} is stated ${signatures.size} different ways across the site:`);
    for (const [signature, routes] of signatures) {
      fail(`  ${routes.length} page(s) e.g. ${routes[0]} — ${signature.slice(0, 160)}`);
    }
  }
}

console.log('JSON-LD types found:');
for (const [type, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${type}`);
}

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems.slice(0, 40)) console.log(`  ✗ ${p}`);
  if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
  process.exit(1);
}
console.log('\nstructured data valid');
