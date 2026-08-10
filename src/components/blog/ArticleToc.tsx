import type { TocEntry } from '@/lib/blog/types';

export default function ArticleToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null;

  return (
    <nav aria-labelledby="toc-heading" className="card-premium p-6 sm:p-7">
      <h2 id="toc-heading" className="font-display text-base font-semibold text-ink-950">
        On this page
      </h2>
      <ol className="mt-4 space-y-2.5">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.depth === 3 ? 'pl-4' : ''}>
            <a
              href={`#${entry.id}`}
              className="text-sm leading-snug text-ink-500 transition-colors hover:text-crimson-600"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
