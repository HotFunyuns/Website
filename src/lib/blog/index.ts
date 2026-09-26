import 'server-only';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { apps, categories, getAppBySlug, type CategoryId } from '@/data/apps';
import { getAuthor, type AuthorInfo } from '@/data/authors';
import { hubIds, hubs as allHubs, type HubInfo } from '@/data/hubs';
import { countWords, extractToc, readingMinutes } from './markdown';
import { relevanceProfile, relevanceScore, type RelevanceProfile } from './relevance.mjs';
import {
  APPROVAL_GATE_AFTER,
  DAILY_RELEASE_LIMIT,
  DEMAND_TIERS,
  DISCLAIMER_KINDS,
  POST_STATUSES,
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

  /* ------------------------------------------------ the publishing queue */

  for (const field of ['editorialApproved', 'sameDayOverride'] as const) {
    if (data[field] !== undefined && typeof data[field] !== 'boolean') {
      fail(slug, `"${field}" must be true or false when present`);
    }
  }
  if (data.publishAt !== undefined && !isDate(data.publishAt)) {
    fail(slug, '"publishAt" must be an ISO date (YYYY-MM-DD)');
  }
  if (data.status === 'scheduled') {
    // Queuing an article is approving it for release, so an unapproved one has
    // no business in the queue — it stays in `review` until a person signs off.
    if (data.editorialApproved !== true) {
      fail(slug, 'a scheduled article must carry "editorialApproved": true — keep it in "review" until it is approved');
    }
    if (!data.publishAt) fail(slug, 'a scheduled article needs "publishAt", the earliest day it may be released');
  }
  if (data.status === 'published') {
    // `publishedAt` records the day an article went live. A future one is a
    // pre-dated claim that bypasses the queue's approval and daily limit.
    if (data.publishedAt > publicationDay()) {
      fail(
        slug,
        `published with a future publishedAt (${data.publishedAt}) — use "status": "scheduled" with "publishAt"; the release step stamps the real date`
      );
    }
    if (data.publishedAt > APPROVAL_GATE_AFTER && data.editorialApproved !== true) {
      fail(slug, `published after ${APPROVAL_GATE_AFTER} without "editorialApproved": true`);
    }
  }
  if (data.sameDayOverride && !(data.status === 'published' && data.publishedAt > APPROVAL_GATE_AFTER)) {
    fail(slug, '"sameDayOverride" is only meaningful on an article released through the queue');
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

  // One approved article per Los Angeles day. The release step enforces this
  // before it writes anything; checking it again here means a workflow that
  // misfires, a rerun, or a hand edit cannot quietly ship two. A deliberate
  // second release carries `sameDayOverride`, written by the release command.
  const releasesByDay = new Map<string, string[]>();
  for (const post of posts) {
    if (post.status !== 'published' || post.publishedAt <= APPROVAL_GATE_AFTER || post.sameDayOverride) continue;
    releasesByDay.set(post.publishedAt, [...(releasesByDay.get(post.publishedAt) ?? []), post.slug]);
  }
  releasesByDay.forEach((slugs, day) => {
    if (slugs.length > DAILY_RELEASE_LIMIT) {
      fail(
        slugs[1],
        `${slugs.length} articles released on ${day} (${slugs.join(', ')}); the limit is ${DAILY_RELEASE_LIMIT} — use npm run queue:release -- --allow-second-today for a deliberate override`
      );
    }
  });

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

export function getPostsByCategory(categoryId: CategoryId): BlogPost[] {
  return posts.filter((post) => post.category === categoryId);
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

  const fallback = posts
    .filter((p) => !taken.has(p.slug))
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
  const index = posts.findIndex((p) => p.slug === post.slug);
  return {
    previous: index > 0 ? posts[index - 1] : undefined,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}
