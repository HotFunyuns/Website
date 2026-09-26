import type { CategoryId } from '@/data/apps';

/**
 * Only `published` posts are ever routed, linked, listed, syndicated or given
 * structured data. Everything else exists in the repository for review and is
 * invisible to the public build — see scripts/validate-content.mjs, which fails
 * the build if any non-published slug reaches `out/`.
 *
 *   draft      being written; never public
 *   review     finished, waiting for a person to read and approve it
 *   scheduled  approved (`editorialApproved: true`) and queued for release on or
 *              after `publishAt`; still never public until the release step
 *              flips it to `published` — see docs/publishing-workflow.md
 *   published  public from `publishedAt`, the day it actually went live
 */
export type PostStatus = 'draft' | 'review' | 'scheduled' | 'published';

/**
 * Every publication date on this site is a calendar day in this zone. The
 * business runs on Pacific time, and a UTC day would flip to "tomorrow" at
 * 16:00 or 17:00 local — releasing a queued article a day early.
 */
export const PUBLICATION_TIME_ZONE = 'America/Los_Angeles';

/**
 * The last day articles were released without the editorial-approval gate.
 * Every article published after it must carry `editorialApproved: true`; the
 * 525 published on or before it predate the flag and are deliberately not
 * back-filled, because nobody approved them individually and setting the flag
 * would claim they had been.
 */
export const APPROVAL_GATE_AFTER = '2026-09-22';

/** New articles released per Los Angeles calendar day, unless overridden. */
export const DAILY_RELEASE_LIMIT = 1;

/** The Los Angeles calendar day (YYYY-MM-DD) containing `now`. */
export function publicationDay(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: PUBLICATION_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

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

/**
 * A correction that changed what an article says. Rendered on the article, so a
 * reader who relied on the earlier version can see what changed and when.
 */
export interface PostCorrection {
  date: string;
  note: string;
}

export interface PostFrontmatter {
  title: string;
  metaTitle: string;
  description: string;
  status: PostStatus;
  /** The Los Angeles day the article actually went live. Never backdated. */
  publishedAt: string;
  /** The last substantive content change. Link-only edits do not move it. */
  updatedAt: string;
  /** An id from src/data/authors.ts — the byline is resolved from the registry. */
  author: string;
  /**
   * `true` states that a person read the complete article and approved it for
   * publication. Required before an article can be `scheduled`, and on every
   * article published after APPROVAL_GATE_AFTER. It is an editorial check by
   * the company that makes the apps, not independent or expert review.
   */
  editorialApproved?: boolean;
  /**
   * For `scheduled` articles: the earliest Los Angeles day it may be released.
   * A plan, not a publication date — the release step stamps `publishedAt`
   * with the day it actually goes out, which may be later.
   */
  publishAt?: string;
  /**
   * Set only by `npm run queue:release -- --allow-second-today`. Records that
   * the owner deliberately released more than DAILY_RELEASE_LIMIT articles on
   * one day, so the build can tell an override from a rerun that misfired.
   */
  sameDayOverride?: boolean;
  corrections?: PostCorrection[];
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
  /**
   * Topic hubs this article belongs to. A category answers "which app is this
   * about?"; a hub answers "which subject is this about?". Optional, because
   * the 275 articles written before hubs existed are served well enough by
   * their category — but every article in a hub's subject area should declare
   * it, or the hub page cannot find it and the article is orphaned from its
   * cluster.
   */
  hubs?: string[];
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

/**
 * Public means `published` and dated on or before today in Los Angeles. The
 * comparison is between calendar days, not instants: `publishedAt` is a day, and
 * reading it as UTC midnight made an article dated tomorrow (Pacific) public from
 * 16:00 or 17:00 today.
 */
export function isPublicPost(post: Pick<BlogPost, 'status' | 'publishedAt'>, now = new Date()) {
  if (post.status !== 'published') return false;
  return post.publishedAt <= publicationDay(now);
}
