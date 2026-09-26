import { companyInfo } from './apps';

/**
 * Everyone who may appear in a byline. An article's `author` field must be an id
 * from this list, so a byline cannot be invented in a Markdown file.
 *
 * Today there is one author, and it is the company. That is deliberate and it is
 * accurate: articles are drafted with AI tools and published under the name of
 * the organization that is accountable for them. No individual has been approved
 * for public use, and attaching a person's name to work they did not write, or a
 * credential nobody holds, would be exactly the fabrication the editorial policy
 * rules out.
 *
 * Adding a named person later needs three things, and the build enforces the
 * first:
 *   1. an `approval` record — who approved it, on what date, and what they
 *      approved — written by the owner, not inferred;
 *   2. a truthful `relationship` (an owner who writes about their own apps is
 *      not an independent reviewer, and the bio must not imply otherwise);
 *   3. `sameAs` links only to profiles that exist, are active, and belong to
 *      that person. An empty list is better than a placeholder.
 * See docs/authorship-audit.md § "Adding a named author".
 */
export interface AuthorProfileLink {
  label: string;
  url: string;
}

export interface AuthorApproval {
  /** ISO date the owner approved publishing this identity. */
  approvedOn: string;
  /** Who approved it, as they asked to be named. */
  approvedBy: string;
  /** What was approved: the name, the bio, the profile links. */
  scope: string;
}

export interface AuthorInfo {
  /** URL slug (`/authors/<id>/`) and the value an article's `author` field holds. */
  id: string;
  /** The exact byline. Visible authorship and `BlogPosting.author.name` both read this. */
  name: string;
  kind: 'organization' | 'person';
  /** The author's actual relationship to Reign Creative LLC, in plain words. */
  relationship: string;
  /** One or two sentences, shown on the profile and in each article's author box. */
  shortBio: string;
  /** Verified, active profiles that genuinely belong to this author. */
  sameAs: AuthorProfileLink[];
  /** Required for a person. Never set on the author's behalf. */
  approval?: AuthorApproval;
}

export const authors: AuthorInfo[] = [
  {
    id: 'reign-creative-llc',
    name: companyInfo.name,
    kind: 'organization',
    relationship: `The independent app studio that builds the apps covered on this site and publishes every article here. On Google Play it publishes as ${companyInfo.developerName}.`,
    shortBio: `${companyInfo.name} makes the Android apps these articles link to, so it has a commercial interest in them. Articles are drafted with AI assistance, checked against the sources listed on each page and against the live Google Play listings, and published under the company's name.`,
    sameAs: [
      {
        label: `Google Play developer page (${companyInfo.developerName})`,
        url: companyInfo.developerPageUrl,
      },
    ],
  },
];

export const DEFAULT_AUTHOR_ID = 'reign-creative-llc';

export function getAuthor(id: string): AuthorInfo | undefined {
  return authors.find((author) => author.id === id);
}

export function authorPath(author: Pick<AuthorInfo, 'id'>): string {
  return `/authors/${author.id}/`;
}

// A person without a recorded approval is a byline nobody agreed to. This runs
// at module load, so it fails the build rather than a review.
for (const author of authors) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(author.id)) {
    throw new Error(`src/data/authors.ts — author id "${author.id}" must be a lowercase kebab-case slug`);
  }
  if (author.kind === 'person') {
    const approval = author.approval;
    if (!approval?.approvedBy?.trim() || !approval.scope?.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(approval.approvedOn ?? '')) {
      throw new Error(
        `src/data/authors.ts — "${author.name}" is a person with no recorded owner approval; see docs/authorship-audit.md`
      );
    }
  }
  for (const profile of author.sameAs) {
    if (!/^https:\/\//.test(profile.url)) {
      throw new Error(`src/data/authors.ts — ${author.name}: profile link "${profile.label}" must be https`);
    }
  }
}
