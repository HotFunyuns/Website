import type { PostSource } from '@/lib/blog/types';
import { formatPostDate } from './format';

export default function ArticleSources({ sources }: { sources: PostSource[] }) {
  if (sources.length === 0) return null;

  return (
    <section aria-labelledby="sources-heading" className="mt-14 border-t border-ink-200 pt-10">
      <h2 id="sources-heading" className="display-title text-2xl">
        Sources
      </h2>
      <ol className="mt-6 space-y-4">
        {sources.map((source) => (
          <li key={source.url} className="text-sm leading-relaxed text-ink-500">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent font-medium"
            >
              {source.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className="block text-ink-400">
              {source.publisher} — accessed{' '}
              <time dateTime={source.accessed}>{formatPostDate(source.accessed)}</time>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
