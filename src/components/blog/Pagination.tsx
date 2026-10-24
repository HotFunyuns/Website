import Link from 'next/link';

/** The URL of page `n` of a listing whose first page lives at `basePath`. */
export function listingPath(basePath: string, n: number): string {
  return n <= 1 ? basePath : `${basePath}page/${n}/`;
}

/**
 * Numbered pagination as plain links, rendered on the server, so every page of
 * a listing is reachable by a crawler without running script. Each page is a
 * real URL with its own self-referencing canonical.
 */
export default function Pagination({
  basePath,
  page,
  pages,
  label,
}: {
  basePath: string;
  page: number;
  pages: number;
  label: string;
}) {
  if (pages <= 1) return null;
  const numbers = Array.from({ length: pages }, (_, i) => i + 1);
  const linkClass =
    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ink-200 bg-white px-3 text-sm font-medium text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-950';

  return (
    <nav aria-label={label} className="mt-12">
      <ul className="flex list-none flex-wrap items-center justify-center gap-2 p-0">
        {page > 1 && (
          <li>
            <Link href={listingPath(basePath, page - 1)} className={linkClass} rel="prev">
              ← Newer
            </Link>
          </li>
        )}
        {numbers.map((n) => (
          <li key={n}>
            {n === page ? (
              <span
                aria-current="page"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-ink-950 px-3 text-sm font-semibold text-white"
              >
                {n}
              </span>
            ) : (
              <Link href={listingPath(basePath, n)} className={linkClass} aria-label={`Page ${n}`}>
                {n}
              </Link>
            )}
          </li>
        ))}
        {page < pages && (
          <li>
            <Link href={listingPath(basePath, page + 1)} className={linkClass} rel="next">
              Older →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
