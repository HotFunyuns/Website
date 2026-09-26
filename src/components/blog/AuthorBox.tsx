import Link from 'next/link';
import { authorPath, type AuthorInfo } from '@/data/authors';

/**
 * "About the author", placed after the sources so a reader who got that far can
 * see who is accountable for the article and how it was made.
 *
 * The approval sentence renders only for articles that carry
 * `editorialApproved: true`. Articles published before that flag existed make
 * no claim either way — the editorial policy explains what was and was not
 * checked for them — because printing an approval nobody gave would be the one
 * thing worse than printing nothing.
 */
export default function AuthorBox({
  author,
  editorialApproved,
}: {
  author: AuthorInfo;
  editorialApproved: boolean;
}) {
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
      {editorialApproved && (
        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          A person at {author.kind === 'organization' ? author.name : 'Reign Creative LLC'} read this
          article in full and approved it before it was published.
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
