import 'server-only';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { apps, categories, getAppBySlug, type CategoryId } from '@/data/apps';
import { getAuthor, type AuthorInfo } from '@/data/authors';
import { getReviewAttestation } from '@/data/review-attestations';
import { hubIds, hubs as allHubs, type HubInfo } from '@/data/hubs';
import { countWords, extractToc, readingMinutes } from './markdown';
import { relevanceProfile, relevanceScore, type RelevanceProfile } from './relevance.mjs';
import {
  APPROVAL_GATE_AFTER,
  ARTICLE_KINDS,
  DEMAND_TIERS,
  LISTING_PAGE_SIZE,
  DISCLAIMER_KINDS,
  EDITORIAL_REVIEWS,
  POST_STATUSES,
  REVIEW_LABELS_INTRODUCED,
  SEARCH_INTENTS,
  isPublicPost,
  publicationDay,
  type BlogPost,
  type PostFrontmatter,
} from './types';

export * from './types';

const CONTENT_DIR = join(process.cwd(), 'content', 'blog');
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

const categoryIds = new Set(categories.map((c) => c.id));
const appSlugs = new Set(apps.map((a) => a.slug));

function fail(slug: string, message: string): never {
  throw new Error(`content/blog/${slug}.md — ${message}`);
}

function parse(slug: string, raw: string): BlogPost {
  const match = FRONTMATTER.exec(raw);
  if (!match) fail(slug, 'missing the JSON frontmatter block delimited by ---');

  let data: PostFrontmatter;
  try {
    data = JSON.parse(match[1]) as PostFrontmatter;
  } catch (error) {
    fail(slug, `frontmatter is not valid JSON: ${(error as Error).message}`);
  }

  const body = raw.slice(match[0].length).trim();
  const need = (field: keyof PostFrontmatter) => {
    const value = data[field];
    if (typeof value !== 'string' || !value.trim()) fail(slug, `"${field}" must be a non-empty string`);
    return value as string;
  };
  const needList = (field: keyof PostFrontmatter) => {
    const value = data[field];
    if (!Array.isArray(value)) fail(slug, `"${field}" must be an array`);
    return value;
  };
  const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

  need('title');
  need('metaTitle');
  need('description');
  need('primaryKeyword');

  if (!getAuthor(need('author'))) {
    fail(slug, `"author" ${JSON.stringify(data.author)} is not an author id in src/data/authors.ts`);
  }

  if (!POST_STATUSES.includes(data.status)) {
    fail(slug, `"status" must be one of ${POST_STATUSES.join(', ')}`);
  }
  if (!SEARCH_INTENTS.includes(data.intent)) {
    fail(slug, `"intent" must be one of ${SEARCH_INTENTS.join(', ')}`);
  }
  if (!DISCLAIMER_KINDS.includes(data.disclaimer)) {
    fail(slug, `"disclaimer" must be one of ${DISCLAIMER_KINDS.join(', ')}`);
  }
  if (!categoryIds.has(data.category as CategoryId)) {
    fail(slug, `"category" ${JSON.stringify(data.category)} is not a known app category`);
  }
  for (const field of ['publishedAt', 'updatedAt'] as const) {
    if (!isDate(need(field))) fail(slug, `"${field}" must be an ISO date (YYYY-MM-DD)`);
  }
  if (data.researchDate !== undefined && !isDate(data.researchDate)) {
    fail(slug, '"researchDate" must be an ISO date (YYYY-MM-DD)');
  }
  if (data.updatedAt < data.publishedAt) fail(slug, '"updatedAt" is earlier than "publishedAt"');

  /* ------------------------------------- how it was checked, and the queue */

  if (data.editorialApproved !== undefined && typeof data.editorialApproved !== 'boolean') {
    fail(slug, '"editorialApproved" must be true or false when present');
  }
  if (data.publishAt !== undefined && !isDate(data.publishAt)) {
    fail(slug, '"publishAt" must be an ISO date (YYYY-MM-DD)');
  }
  if (data.status === 'published' && data.publishedAt > publicationDay()) {
    // `publishedAt` records the day an article went live. A future one is a
    // pre-dated claim that bypasses the review label and the release step.
    fail(
      slug,
      `published with a future publishedAt (${data.publishedAt}) — publish it on the day it goes live; a person-approved article can be scheduled with "publishAt"`
    );
  }
  if (data.status === 'scheduled' && !data.publishAt) {
    fail(slug, 'a scheduled article needs "publishAt", the earliest day it may be released');
  }

  // The label at the top of every article published after the gate is a public
  // statement about who checked it. scripts/lib/publishing.mjs (reviewProblems)
  // enforces the same contract for the scripts and after export.
  const review = data.editorialReview;
  const postGate = data.status === 'published' && data.publishedAt > APPROVAL_GATE_AFTER;
  if (review !== undefined && !EDITORIAL_REVIEWS.includes(review)) {
    fail(slug, `"editorialReview" must be one of ${EDITORIAL_REVIEWS.join(', ')}`);
  }
  if ((postGate || data.status === 'scheduled') && review === undefined) {
    fail(
      slug,
      'must say how it was checked: "editorialReview": "person" (a named person approved it) or "automated" (automated checks and an AI editorial review only)'
    );
  }
  if (postGate && data.publishedAt < REVIEW_LABELS_INTRODUCED) {
    fail(
      slug,
      `published ${data.publishedAt}, between ${APPROVAL_GATE_AFTER} and ${REVIEW_LABELS_INTRODUCED} — the editorial policy says nothing was published then`
    );
  }
  const record = ['reviewerName', 'reviewDate', 'sourcesChecked', 'reviewNotes'] as const;
  if (review === 'person') {
    if (data.editorialApproved !== true) fail(slug, '"editorialReview": "person" needs "editorialApproved": true');
    if (typeof data.reviewerName !== 'string' || !data.reviewerName.trim()) {
      fail(slug, '"editorialReview": "person" needs "reviewerName" — the person who read and approved it');
    }
    if (typeof data.reviewDate !== 'string' || !isDate(data.reviewDate)) {
      fail(slug, '"editorialReview": "person" needs "reviewDate" (YYYY-MM-DD)');
    }
    if (data.reviewDate > publicationDay()) fail(slug, `"reviewDate" ${data.reviewDate} is in the future`);
    if (!Array.isArray(data.sourcesChecked) || data.sourcesChecked.length === 0) {
      fail(slug, '"editorialReview": "person" needs "sourcesChecked" — the URLs of the sources the reviewer opened');
    }
    const sourceUrls = new Set((Array.isArray(data.sources) ? data.sources : []).map((source) => source?.url));
    for (const url of data.sourcesChecked) {
      if (!sourceUrls.has(url)) fail(slug, `"sourcesChecked" lists ${JSON.stringify(url)}, which is not one of this article's sources`);
    }
    if (typeof data.reviewNotes !== 'string' || !data.reviewNotes.trim()) {
      fail(slug, '"editorialReview": "person" needs "reviewNotes" — what the reviewer checked or changed');
    }
  } else {
    if (data.editorialApproved === true) {
      fail(slug, '"editorialApproved": true is a person\'s approval — it needs "editorialReview": "person" and the review record');
    }
    for (const field of record) {
      if (data[field] !== undefined) fail(slug, `"${field}" is only valid with "editorialReview": "person"`);
    }
  }
  if (review === 'organization') {
    // The label rests on a company attestation, so the article must name one
    // that exists and fall inside its scope — and carries none of a person's
    // per-article record, because none was given.
    const attestation = getReviewAttestation(data.reviewAttestation);
    if (!attestation) {
      fail(slug, `"editorialReview": "organization" needs "reviewAttestation" naming an entry in src/data/review-attestations.ts`);
    }
    if (data.publishedAt > attestation.publishedOnOrBefore) {
      fail(slug, `published ${data.publishedAt}, after the attestation "${attestation.id}" covers (${attestation.publishedOnOrBefore})`);
    }
  } else if (data.reviewAttestation !== undefined) {
    fail(slug, '"reviewAttestation" is only valid with "editorialReview": "organization"');
  }
  if (data.status === 'scheduled' && review !== 'person') {
    // Queuing an article is a person approving it for a given day; an article
    // with the automated label is published as soon as it passes, not queued.
    fail(slug, 'only an article a person approved ("editorialReview": "person") can be scheduled');
  }
  if (data.corrections !== undefined) {
    if (!Array.isArray(data.corrections)) fail(slug, '"corrections" must be an array when present');
    for (const correction of data.corrections) {
      if (!isDate(correction?.date ?? '') || !correction?.note?.trim()) {
        fail(slug, 'each correction needs an ISO "date" and a "note"');
      }
      // A correction is a content change, so the modified date must reflect it.
      if (correction.date > data.updatedAt) {
        fail(slug, `correction dated ${correction.date} is later than "updatedAt" ${data.updatedAt}`);
      }
      if (correction.date < data.publishedAt) {
        fail(slug, `correction dated ${correction.date} predates publication`);
      }
    }
  }

  for (const appSlug of needList('relatedApps') as string[]) {
    if (!appSlugs.has(appSlug)) fail(slug, `relatedApps references unknown app "${appSlug}"`);
  }
  if (data.relatedApps.length === 0) fail(slug, 'every article must link to at least one app');

  for (const field of ['secondaryKeywords', 'tags', 'takeaways', 'relatedArticles'] as const) {
    needList(field);
  }
  for (const field of ['longTailKeywords', 'comparisonKeywords', 'aiSearchQuestions'] as const) {
    if (data[field] !== undefined && !Array.isArray(data[field])) {
      fail(slug, `"${field}" must be an array when present`);
    }
  }
  if (data.demandTier !== undefined && !DEMAND_TIERS.includes(data.demandTier)) {
    fail(slug, `"demandTier" must be one of ${DEMAND_TIERS.join(', ')}`);
  }
  if (data.hubs !== undefined) {
    if (!Array.isArray(data.hubs)) fail(slug, '"hubs" must be an array when present');
    for (const hub of data.hubs) {
      if (!hubIds.has(hub)) fail(slug, `hubs references unknown hub "${hub}"`);
    }
  }
  if (data.kind !== undefined && !ARTICLE_KINDS.includes(data.kind)) {
    fail(slug, `"kind" must be one of ${ARTICLE_KINDS.join(', ')} when present`);
  }
  // A partnership overview and its nonbinding notice travel together: the notice
  // is what stops the page reading as an offer, a valuation or a solicitation.
  if ((data.kind === 'partnership') !== (data.disclaimer === 'partnership')) {
    fail(slug, 'a "partnership" article needs "disclaimer": "partnership", and only a partnership article may use it');
  }
  if (data.disclaimer === 'comparison' && !data.researchDate) {
    fail(slug, 'comparison articles must record a "researchDate"');
  }
  for (const faq of needList('faqs') as BlogPost['faqs']) {
    if (!faq?.question?.trim() || !faq?.answer?.trim()) fail(slug, 'each FAQ needs a question and an answer');
  }
  for (const source of needList('sources') as BlogPost['sources']) {
    if (!source?.title || !source?.publisher || !source?.accessed) {
      fail(slug, 'each source needs a title, publisher and accessed date');
    }
    if (!/^https:\/\//.test(source.url ?? '')) fail(slug, `source "${source.title}" needs an https URL`);
    if (!isDate(source.accessed)) fail(slug, `source "${source.title}" needs an ISO accessed date`);
  }

  if (data.metaTitle.length > 60) fail(slug, `metaTitle is ${data.metaTitle.length} chars (max 60)`);
  if (data.description.length > 160) fail(slug, `description is ${data.description.length} chars (max 160)`);
  if (data.description.length < 70) fail(slug, `description is only ${data.description.length} chars (min 70)`);
  if (!body) fail(slug, 'body is empty');

  const wordCount = countWords(body);

  return {
    ...data,
    slug,
    body,
    wordCount,
    readingMinutes: readingMinutes(wordCount),
    toc: extractToc(body),
  };
}

function loadAll(): BlogPost[] {
  let files: string[];
  try {
    files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    if (!SLUG_PATTERN.test(slug)) fail(slug, 'filename must be a lowercase kebab-case slug');
    return parse(slug, readFileSync(join(CONTENT_DIR, file), 'utf8'));
  });

  const bySlug = new Set<string>();
  for (const post of posts) {
    if (bySlug.has(post.slug)) fail(post.slug, 'duplicate slug');
    bySlug.add(post.slug);
  }

  // Cross-reference check runs after every file is parsed so articles can point
  // at each other in any order.
  for (const post of posts) {
    for (const ref of post.relatedArticles) {
      if (!bySlug.has(ref)) fail(post.slug, `relatedArticles references unknown article "${ref}"`);
      if (ref === post.slug) fail(post.slug, 'relatedArticles must not include the article itself');
    }
  }

  // One business-development overview per app. A second would be the
  // name-swapped duplicate the partnership pages exist to avoid.
  const partnershipByApp = new Map<string, string>();
  for (const post of posts) {
    if (post.kind !== 'partnership') continue;
    const app = post.relatedApps[0];
    const owner = partnershipByApp.get(app);
    if (owner) fail(post.slug, `is a second partnership article for "${app}" (first: "${owner}")`);
    partnershipByApp.set(app, post.slug);
  }

  // Two articles chasing one primary keyword compete with each other in the
  // same result set, so the collision is rejected at build time rather than
  // discovered months later in Search Console.
  const claimedKeywords = new Map<string, string>();
  for (const post of posts) {
    const key = post.primaryKeyword.trim().toLowerCase();
    const owner = claimedKeywords.get(key);
    if (owner) {
      fail(post.slug, `primaryKeyword "${post.primaryKeyword}" is already targeted by "${owner}"`);
    }
    claimedKeywords.set(key, post.slug);
  }

  return posts;
}

/** Every article on disk, including unpublished ones. Never expose directly. */
export const allPosts: BlogPost[] = loadAll();

const byNewest = (a: BlogPost, b: BlogPost) =>
  b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug);

/** The only collection any route, sitemap, feed or link should ever read. */
export const posts: BlogPost[] = allPosts.filter((post) => isPublicPost(post)).sort(byNewest);

export const unpublishedPosts: BlogPost[] = allPosts.filter((post) => !isPublicPost(post));

export const postCount = posts.length;

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * Published articles in a category, newest first. Partnership overviews are
 * left out: a category listing is a reading list for the people who use those
 * apps, and the overviews have their own hub at /partnerships/.
 */
export function getPostsByCategory(categoryId: CategoryId): BlogPost[] {
  return posts.filter((post) => post.category === categoryId && post.kind !== 'partnership');
}

/** Ordinary guides — every published article except partnership overviews. */
export const guidePosts: BlogPost[] = posts.filter((post) => post.kind !== 'partnership');

/** Published partnership overviews, by app name order of their primary app. */
export function getPartnershipPosts(): BlogPost[] {
  return posts.filter((post) => post.kind === 'partnership');
}

/** The published partnership overview for an app, if there is one. */
export function getPartnershipPostForApp(appSlug: string): BlogPost | undefined {
  return posts.find((post) => post.kind === 'partnership' && post.relatedApps[0] === appSlug);
}

/* ------------------------------------------------------------ pagination */

/** How many listing pages a list of articles fills. Never fewer than one. */
export function pageCount(items: readonly unknown[], size = LISTING_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(items.length / size));
}

/** One page (1-based) of a list. */
export function pageOf<T>(items: readonly T[], page: number, size = LISTING_PAGE_SIZE): T[] {
  return items.slice((page - 1) * size, page * size);
}

export function blogCategories() {
  return categories
    .map((category) => ({ ...category, count: getPostsByCategory(category.id).length }))
    .filter((category) => category.count > 0);
}

export const featuredPosts: BlogPost[] = posts.filter((post) => post.featured);

const profiles = new Map<string, RelevanceProfile>(posts.map((post) => [post.slug, relevanceProfile(post)]));

/** How related two published articles are — see src/lib/blog/relevance.mjs. */
export function postRelevance(a: BlogPost, b: BlogPost): number {
  const pa = profiles.get(a.slug) ?? relevanceProfile(a);
  const pb = profiles.get(b.slug) ?? relevanceProfile(b);
  return relevanceScore(pa, pb);
}

/**
 * Explicit picks first, then the most relevant published articles, so a cluster
 * never dead-ends and never pads with an unrelated one.
 *
 * The fallback used to be "the newest articles in the same category", which in a
 * 224-article category meant every article with a free slot recommended the
 * same alphabetically-first handful from the latest release — a history piece
 * on a mental-math cornerstone. Relevance comes from the article's own metadata,
 * so the picks are stable: they change when the corpus gains a closer match,
 * not because something newer exists. Ties go to the newer article, then slug.
 * Unpublished articles cannot appear here: every candidate comes from `posts`.
 */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const explicit = post.relatedArticles
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p));
  const taken = new Set([post.slug, ...explicit.map((p) => p.slug)]);

  // Guides recommend guides and partnership overviews recommend each other:
  // a reader of a rules explainer is not looking for an acquisition page.
  const sameKind = (p: BlogPost) => (p.kind === 'partnership') === (post.kind === 'partnership');
  const fallback = posts
    .filter((p) => !taken.has(p.slug) && sameKind(p))
    .map((p) => ({ post: p, score: postRelevance(post, p) }))
    .filter((candidate) => candidate.score >= 1)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.publishedAt.localeCompare(a.post.publishedAt) ||
        a.post.slug.localeCompare(b.post.slug)
    )
    .map((candidate) => candidate.post);

  return [...explicit, ...fallback].slice(0, count);
}

/** The registry entry behind an article's byline. The loader guarantees it exists. */
export function getPostAuthor(post: Pick<BlogPost, 'author' | 'slug'>): AuthorInfo {
  const author = getAuthor(post.author);
  if (!author) throw new Error(`content/blog/${post.slug}.md — unknown author "${post.author}"`);
  return author;
}

/**
 * How many other published articles link to each one, in prose or in their
 * `relatedArticles` — the articles the rest of the site already points readers
 * to. Used to pick a category's "most referenced" guides from evidence in the
 * corpus rather than by hand.
 */
const referenceCounts = (() => {
  const counts = new Map<string, number>(posts.map((post) => [post.slug, 0]));
  for (const post of posts) {
    const targets = new Set(post.relatedArticles);
    const bodyLink = /\]\(\/blog\/([a-z0-9-]+)\/\)/g;
    let match: RegExpExecArray | null;
    while ((match = bodyLink.exec(post.body)) !== null) targets.add(match[1]);
    targets.forEach((slug) => {
      if (slug !== post.slug && counts.has(slug)) counts.set(slug, (counts.get(slug) ?? 0) + 1);
    });
  }
  return counts;
})();

/** The published articles in a category that other articles link to most. */
export function mostReferencedInCategory(categoryId: CategoryId, count = 3): BlogPost[] {
  return getPostsByCategory(categoryId)
    .map((post) => ({ post, refs: referenceCounts.get(post.slug) ?? 0 }))
    .sort((a, b) => b.refs - a.refs || a.post.slug.localeCompare(b.post.slug))
    .slice(0, count)
    .map((entry) => entry.post);
}

/** Published articles bylined to an author, newest first. */
export function getPostsByAuthor(authorId: string): BlogPost[] {
  return posts.filter((post) => post.author === authorId);
}

export function getPostApps(post: BlogPost) {
  return post.relatedApps.map((slug) => getAppBySlug(slug)).filter((a) => a !== undefined);
}

/** Published articles that mention an app, cornerstone first. */
export function getPostsByApp(appSlug: string): BlogPost[] {
  return posts
    .filter((post) => post.relatedApps.includes(appSlug))
    .sort((a, b) => {
      const aPrimary = a.relatedApps[0] === appSlug ? 0 : 1;
      const bPrimary = b.relatedApps[0] === appSlug ? 0 : 1;
      return aPrimary - bPrimary || b.publishedAt.localeCompare(a.publishedAt);
    });
}

/** Published articles declaring this hub, cornerstone first, then newest. */
export function getPostsByHub(hubId: string): BlogPost[] {
  const hub = allHubs.find((h) => h.id === hubId);
  return posts
    .filter((post) => post.hubs?.includes(hubId))
    .sort((a, b) => {
      const aCorner = hub && a.slug === hub.cornerstone ? 0 : 1;
      const bCorner = hub && b.slug === hub.cornerstone ? 0 : 1;
      return aCorner - bCorner || b.publishedAt.localeCompare(a.publishedAt);
    });
}

/** Hubs that actually hold a published article, so no empty listing ships. */
export function activeHubs(): (HubInfo & { count: number })[] {
  return allHubs
    .map((hub) => ({ ...hub, count: getPostsByHub(hub.id).length }))
    .filter((hub) => hub.count > 0);
}

/** The hubs an article belongs to, resolved to full hub records. */
export function getPostHubs(post: BlogPost): HubInfo[] {
  return (post.hubs ?? [])
    .map((id) => allHubs.find((hub) => hub.id === id))
    .filter((hub): hub is HubInfo => Boolean(hub));
}

// A hub whose cornerstone is missing or unpublished would render a dead link
// on its most prominent element, so it is caught here rather than in review.
for (const hub of allHubs) {
  if (getPostsByHub(hub.id).length === 0) continue;
  if (!posts.some((post) => post.slug === hub.cornerstone)) {
    throw new Error(
      `src/data/hubs.ts — hub "${hub.id}" names cornerstone "${hub.cornerstone}", which is not a published article`
    );
  }
}

/** Adjacent published posts for prev/next navigation. */
export function getPostNeighbours(post: BlogPost) {
  const chain = posts.filter((p) => (p.kind === 'partnership') === (post.kind === 'partnership'));
  const index = chain.findIndex((p) => p.slug === post.slug);
  return {
    previous: index > 0 ? chain[index - 1] : undefined,
    next: index >= 0 && index < chain.length - 1 ? chain[index + 1] : undefined,
  };
}
