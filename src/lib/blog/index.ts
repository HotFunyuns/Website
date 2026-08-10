import 'server-only';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { apps, categories, getAppBySlug, type CategoryId } from '@/data/apps';
import { countWords, extractToc, readingMinutes } from './markdown';
import {
  DEMAND_TIERS,
  DISCLAIMER_KINDS,
  POST_STATUSES,
  SEARCH_INTENTS,
  isPublicPost,
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
  need('author');
  need('primaryKeyword');

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

/** Explicit picks first, then same-category fallbacks, so a cluster never dead-ends. */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const explicit = post.relatedArticles
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p));

  const sameCategory = posts.filter(
    (p) => p.slug !== post.slug && p.category === post.category && !explicit.includes(p)
  );
  const rest = posts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category && !explicit.includes(p)
  );

  return [...explicit, ...sameCategory, ...rest].slice(0, count);
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

/** Adjacent published posts for prev/next navigation. */
export function getPostNeighbours(post: BlogPost) {
  const index = posts.findIndex((p) => p.slug === post.slug);
  return {
    previous: index > 0 ? posts[index - 1] : undefined,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}
