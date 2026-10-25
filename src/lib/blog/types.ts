import type { CategoryId } from '@/data/apps';

/**
 * Only `published` posts are ever routed, linked, listed, syndicated or given
 * structured data. Everything else exists in the repository for review and is
 * invisible to the public build — see scripts/validate-content.mjs, which fails
 * the build if any non-published slug reaches `out/`.
 *
 *   draft      being written; never public
 *   review     finished, waiting for its editorial review — by a person, or the
 *              logged AI editorial review for an "automated" article
 *   scheduled  approved by a named person and queued for release on or after
 *              `publishAt`; still never public until the release step flips it
 *              to `published` — see docs/publishing-workflow.md
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
 * The last day articles were released without saying how they were checked.
 * Every article published after it must carry `editorialReview`; the 525
 * published on or before it predate the labels and are deliberately not
 * back-filled, because nobody approved them individually and labelling them
 * would claim a check nobody recorded.
 */
export const APPROVAL_GATE_AFTER = '2026-09-22';

/**
 * The first day an article could go out with a review label. From the gate
 * until this day the release system demanded a person's approval and nothing
 * was published; the editorial policy states that, and the loader keeps it
 * true by rejecting any article dated in between.
 */
export const REVIEW_LABELS_INTRODUCED = '2026-10-02';

/**
 * How many of the newest articles the RSS feed lists. A feed announces recent
 * articles; the sitemap is the complete index. Must equal FEED_ITEM_LIMIT in
 * scripts/lib/publishing.mjs (a test enforces it).
 */
export const RSS_ITEM_LIMIT = 50;

/**
 * How an article published after APPROVAL_GATE_AFTER was checked before it
 * went live — stated at the top of the article and in its author box:
 *
 *   person     a named person at Reign Creative LLC read the complete article
 *              and approved it. Requires `editorialApproved: true` and the
 *              review record: `reviewerName`, `reviewDate`, `sourcesChecked`
 *              (URLs of the article's own sources that they opened) and
 *              `reviewNotes`. Only a person writes these, never a script.
 *   automated  published after the automated checks and a logged AI editorial
 *              review only. No person has read it, and the article says so.
 *   organization  covered by a company review attestation
 *              (src/data/review-attestations.ts): the owner's written statement
 *              that people at the company reviewed a defined set of articles.
 *              Requires `reviewAttestation`; names no individual and records no
 *              per-article detail that was not given.
 *
 * There is no daily limit: a finished article is published once it passes every
 * check, not held back to fit a release schedule.
 */
export type EditorialReview = 'person' | 'automated' | 'organization';

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
export type DisclaimerKind = 'none' | 'health' | 'wellness' | 'language' | 'comparison' | 'partnership' | 'finance';

/**
 * What kind of page an article is. Absent means an ordinary guide written for
 * the people who use, or might use, the app in its category.
 *
 *   partnership  a business-development overview of one app, for publishers,
 *                licensees, partners and potential acquirers. Exactly one per
 *                app at most; it carries the "partnership" disclaimer (the
 *                nonbinding notice), lives in the /partnerships/ hub rather than
 *                the consumer category listings, and its call to action is a
 *                business inquiry rather than an install.
 */
export type ArticleKind = 'partnership';

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
   * How the article was checked before publication. Required on every article
   * published after APPROVAL_GATE_AFTER and on every scheduled one; absent on
   * the legacy articles. See EditorialReview.
   */
  editorialReview?: EditorialReview;
  /**
   * `true` states that a named person read the complete article and approved
   * it for publication. Valid only with `editorialReview: "person"` and the
   * review record below. It is an editorial check by the company that makes
   * the apps, not independent or expert review.
   */
  editorialApproved?: boolean;
  /** The person who read and approved the article. Never filled by a script. */
  reviewerName?: string;
  /** The Los Angeles day they approved it. */
  reviewDate?: string;
  /** URLs, each one of this article's `sources`, that the reviewer opened. */
  sourcesChecked?: string[];
  /** What the reviewer checked or changed. */
  reviewNotes?: string;
  /** For `organization`: the id of the attestation in src/data/review-attestations.ts. */
  reviewAttestation?: string;
  /**
   * For `scheduled` articles: the earliest Los Angeles day it may be released.
   * A plan, not a publication date — the release step stamps `publishedAt`
   * with the day it actually goes out, which may be later.
   */
  publishAt?: string;
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
  /** See ArticleKind. Absent on ordinary guides. */
  kind?: ArticleKind;
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
export const DISCLAIMER_KINDS: DisclaimerKind[] = ['none', 'health', 'wellness', 'language', 'comparison', 'partnership', 'finance'];
export const ARTICLE_KINDS: ArticleKind[] = ['partnership'];

/** Cards per page on the blog index and on each category listing. */
export const LISTING_PAGE_SIZE = 24;
export const EDITORIAL_REVIEWS: EditorialReview[] = ['person', 'automated', 'organization'];
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
