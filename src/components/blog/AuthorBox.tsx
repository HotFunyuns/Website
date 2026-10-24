import Link from 'next/link';
import { authorPath, type AuthorInfo } from '@/data/authors';
import { getReviewAttestation } from '@/data/review-attestations';
import type { EditorialReview } from '@/lib/blog/types';
import { formatPostDate } from './format';

/**
 * "About the author", placed after the sources so a reader who got that far can
 * see who is accountable for the article and how it was made.
 *
 * The last paragraph depends on how the article was checked:
 *   person     names the person who read it in full and approved it, and when;
 *   automated  says plainly that no person read it before it was published;
 *   legacy     (no `editorialReview`) makes no claim either way — the editorial
 *              policy explains what was and was not checked for those articles.
 * Printing an approval nobody gave would be the one thing worse than printing
 * nothing. scripts/audit-authorship.mjs fails the build if this paragraph and
 * the frontmatter disagree.
 */
export default function AuthorBox({
  author,
  review,
  reviewerName,
  reviewDate,
  reviewAttestation,
  publishedAt,
}: {
  author: AuthorInfo;
  review?: EditorialReview;
  reviewerName?: string;
  reviewDate?: string;
  reviewAttestation?: string;
  publishedAt: string;
}) {
  const attestation = review === 'organization' ? getReviewAttestation(reviewAttestation) : undefined;
  const company = author.kind === 'organization' ? author.name : 'Reign Creative LLC';
  return (
    <section
      aria-labelledby="about-author-heading"
      className="mt-14 rounded-2xl border border-ink-200 bg-cream-100 p-6 sm:p-7"
    >
      <h2 id="about-author-heading" className="font-display text-base font-semibold text-ink-950">
        About the author
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">
        <Link href={authorPath(author)} rel="author" className="link-accent font-medium">
          {author.name}
        </Link>{' '}
        — {author.relationship}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">
        We use AI tools to help research, draft and edit our articles. Each article lists the sources
        its factual claims rely on, and details about our apps come from their live Google Play
        listings. No article on this site has been reviewed by an independent expert unless the
        reviewer is named on it.
      </p>
      {review === 'person' && reviewerName && reviewDate && (
        <p className="mt-3 text-sm leading-relaxed text-ink-600" data-review-statement="person">
          {reviewerName} at {company} read this article in full and approved it on{' '}
          <time dateTime={reviewDate}>{formatPostDate(reviewDate)}</time>
          {reviewDate <= publishedAt ? ', before it was published.' : ', after it was first published.'}
        </p>
      )}
      {attestation && (
        <p className="mt-3 text-sm leading-relaxed text-ink-600" data-review-statement="organization">
          {company} confirmed on <time dateTime={attestation.attestedOn}>{formatPostDate(attestation.attestedOn)}</time>{' '}
          that its published articles, this one included, were reviewed by people at the company. That is an
          editorial check by the company that makes the apps, not independent or expert review.
        </p>
      )}
      {review === 'automated' && (
        <p className="mt-3 text-sm leading-relaxed text-ink-600" data-review-statement="automated">
          No person at {company} has read this article in full. It was published after automated
          checks and an AI editorial review, which are described in our editorial policy and are not
          the same as a person reading every sentence.
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-ink-600">
        Spotted an error?{' '}
        <Link href="/support/" className="link-accent">
          Tell us
        </Link>{' '}
        — how corrections are handled is set out in our{' '}
        <Link href="/editorial-policy/#corrections" className="link-accent">
          editorial policy
        </Link>
        .
      </p>
    </section>
  );
}
