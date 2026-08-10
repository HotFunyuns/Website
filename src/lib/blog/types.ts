import type { CategoryId } from '@/data/apps';

/**
 * Only `published` posts are ever routed, linked, listed, syndicated or given
 * structured data. Everything else exists in the repository for review and is
 * invisible to the public build — see scripts/validate-content.mjs, which fails
 * the build if any non-published slug reaches `out/`.
 */
export type PostStatus = 'draft' | 'review' | 'scheduled' | 'published';

export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

/** Which standing disclaimer the article template must render above the body. */
export type DisclaimerKind = 'none' | 'health' | 'language' | 'comparison';

export interface PostFaq {
  question: string;
  answer: string;
}

/**
 * A primary source backing a factual claim. `accessed` records when we last read
 * it, so a reader can judge how stale the citation is.
 */
export interface PostSource {
  title: string;
  publisher: string;
  url: string;
  accessed: string;
}

/**
 * A qualitative, unvalidated demand estimate. We do not publish or store search
 * volumes, difficulty scores or CPC, because we have no tool data to support
 * them — these tiers are planning hints that still need Keyword Planner,
 * Semrush or Ahrefs verification before anyone acts on them.
 */
export type DemandTier = 'unverified-high' | 'unverified-medium' | 'unverified-low';

export interface PostFrontmatter {
  title: string;
  metaTitle: string;
  description: string;
  status: PostStatus;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: CategoryId;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: SearchIntent;
  relatedApps: string[];
  relatedArticles: string[];
  faqs: PostFaq[];
  sources: PostSource[];
  takeaways: string[];
  disclaimer: DisclaimerKind;
  featured?: boolean;
  noindex?: boolean;
  researchDate?: string;
  /* Planning metadata. Feeds docs/keyword-map.csv; never rendered to visitors. */
  longTailKeywords?: string[];
  comparisonKeywords?: string[];
  aiSearchQuestions?: string[];
  demandTier?: DemandTier;
}

export interface TocEntry {
  depth: 2 | 3;
  text: string;
  id: string;
}

export interface BlogPost extends PostFrontmatter {
  slug: string;
  body: string;
  readingMinutes: number;
  wordCount: number;
  toc: TocEntry[];
}

export const POST_STATUSES: PostStatus[] = ['draft', 'review', 'scheduled', 'published'];
export const SEARCH_INTENTS: SearchIntent[] = [
  'informational',
  'commercial',
  'transactional',
  'navigational',
];
export const DISCLAIMER_KINDS: DisclaimerKind[] = ['none', 'health', 'language', 'comparison'];
export const DEMAND_TIERS: DemandTier[] = [
  'unverified-high',
  'unverified-medium',
  'unverified-low',
];

export function isPublicPost(post: Pick<BlogPost, 'status' | 'publishedAt'>, now = new Date()) {
  if (post.status !== 'published') return false;
  return new Date(`${post.publishedAt}T00:00:00Z`).getTime() <= now.getTime();
}
