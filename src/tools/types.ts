import type { AppFaq } from '@/data/apps';
import type { SportId } from '@/data/sports';

/** The URL segment a tool lives under: a sport id, or `multi-sport`. */
export type ToolSport = SportId | 'multi-sport';

/**
 * A source a tool's formula comes from. `url` is required and must be https
 * unless `unlinked` explains why it cannot be linked (for example, a document
 * its publisher serves only over unencrypted HTTP) — then it is cited by name.
 */
export interface ToolSource {
  title: string;
  publisher: string;
  url?: string;
  /** Shown instead of a link when the source cannot be linked safely. */
  unlinked?: string;
  accessed: string;
}

/**
 * Everything about a tool except its two components. Lives in
 * `src/tools/<id>/meta.ts`, which must stay free of React so the sitemap,
 * llms.txt and the hubs can read every tool's data without loading UI code.
 */
export interface ToolMeta {
  /** The URL slug. Must equal the tool's folder name. */
  id: string;
  /** The URL segment and the hub the tool belongs to. */
  sport: ToolSport;
  /** Other sport hubs that list the tool. */
  alsoFor: SportId[];
  /** Position within its sport group on listings (lower first). */
  order: number;
  /** The H1. */
  title: string;
  /** Short name for cards and lists. */
  shortTitle: string;
  /** One sentence for cards and llms.txt. */
  summary: string;
  /** ≤ 60 characters; used as the absolute <title>. */
  metaTitle: string;
  /** 70–160 characters. */
  metaDescription: string;
  intro: string[];
  /** The catalog slug of the app the page's call to action points to. */
  primaryApp: string;
  /** Why that app is relevant here. Catalog facts only; `{app}` is replaced by its name. */
  appContext: string;
  /** Published article slugs. A missing or unpublished one fails the build. */
  relatedArticles: string[];
  /** Other tool ids. */
  relatedTools: string[];
  /** 3–6, visible on the page and marked up as FAQPage. */
  faqs: AppFaq[];
  sources: ToolSource[];
  publishedAt: string;
  /** Moves only when the visible content or the calculation changes. */
  updatedAt: string;
}
