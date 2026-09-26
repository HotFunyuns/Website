import type { PostCorrection } from '@/lib/blog/types';
import { formatPostDate } from './format';

/**
 * A visible record of corrections that changed what the article says. The
 * editorial policy promises readers this; the loader requires every correction
 * date to fall between publication and `updatedAt`, so the "Updated" date in the
 * byline always accounts for it.
 */
export default function ArticleCorrections({ corrections }: { corrections: PostCorrection[] }) {
  if (corrections.length === 0) return null;
  const ordered = [...corrections].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <aside
      aria-labelledby="corrections-heading"
      className="my-8 rounded-2xl border border-crimson-200 bg-white p-6 sm:p-7"
    >
      <h2 id="corrections-heading" className="font-display text-base font-semibold text-ink-950">
        {ordered.length === 1 ? 'Correction' : 'Corrections'}
      </h2>
      <ul className="mt-3 space-y-2.5">
        {ordered.map((correction) => (
          <li key={`${correction.date}-${correction.note.slice(0, 24)}`} className="text-sm leading-relaxed text-ink-600">
            <time dateTime={correction.date} className="font-medium text-ink-950">
              {formatPostDate(correction.date)}
            </time>
            {' — '}
            {correction.note}
          </li>
        ))}
      </ul>
    </aside>
  );
}
