import Link from 'next/link';
import type { EditorialReview } from '@/lib/blog/types';
import { formatPostDate } from './format';

/**
 * How the article was checked before it went live, stated under the byline —
 * the statement the editorial policy says every article published from
 * 2 October 2026 makes. Legacy articles carry no `editorialReview` and render
 * nothing here; the editorial policy explains what was and was not checked for
 * them.
 *
 * scripts/audit-authorship.mjs reads `data-review-notice` and fails the build if
 * the notice and the frontmatter disagree, if a reviewer's name or date differs
 * from the record, or if an automated article uses words that imply a person's
 * review. Keep the automated wording free of "approved", "verified by" and
 * "fact-checked": none of those happened.
 */
export default function ArticleReviewNotice({
  review,
  reviewerName,
  reviewDate,
}: {
  review?: EditorialReview;
  reviewerName?: string;
  reviewDate?: string;
}) {
  if (review === 'automated') {
    return (
      <p
        data-review-notice="automated"
        className="mt-5 max-w-2xl rounded-xl border border-ink-200 bg-cream-50 px-4 py-3 text-sm leading-relaxed text-ink-600"
      >
        <strong className="font-semibold text-ink-950">AI-assisted article.</strong> Drafted with AI
        tools from the sources cited below and checked by automated tests and an AI editorial review.
        No person has reviewed it yet.{' '}
        <Link href="/editorial-policy/#ai" className="link-accent">
          How we write and check articles
        </Link>
        .
      </p>
    );
  }

  if (review === 'person' && reviewerName && reviewDate) {
    return (
      <p
        data-review-notice="person"
        className="mt-5 max-w-2xl rounded-xl border border-ink-200 bg-cream-50 px-4 py-3 text-sm leading-relaxed text-ink-600"
      >
        <strong className="font-semibold text-ink-950">
          Reviewed by <span data-reviewer="">{reviewerName}</span>
        </strong>{' '}
        on <time dateTime={reviewDate}>{formatPostDate(reviewDate)}</time>, who read the complete
        article and approved it for publication.{' '}
        <Link href="/editorial-policy/#ai" className="link-accent">
          How articles are reviewed
        </Link>
        .
      </p>
    );
  }

  return null;
}
