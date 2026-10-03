import { formatPostDate } from '@/components/blog/format';
import type { ToolSource } from '@/tools/types';

/**
 * A tool's sources, with the date each was checked. A source that cannot be
 * linked safely — a document its publisher serves only over unencrypted HTTP —
 * is cited by name with the reason, rather than linked or silently dropped.
 */
export default function ToolSources({ sources }: { sources: ToolSource[] }) {
  if (sources.length === 0) return null;
  return (
    <section aria-labelledby="sources-heading" className="mt-14 border-t border-ink-200 pt-10">
      <h2 id="sources-heading" className="display-title text-2xl">
        Sources
      </h2>
      <ol className="mt-6 space-y-4">
        {sources.map((source) => (
          <li key={`${source.title}-${source.url ?? source.unlinked}`} className="text-sm leading-relaxed text-ink-500">
            {source.url ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="link-accent font-medium">
                {source.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="font-medium text-ink-700">{source.title}</span>
            )}
            <span className="block text-ink-400">
              {source.publisher} — accessed <time dateTime={source.accessed}>{formatPostDate(source.accessed)}</time>
              {source.unlinked && <span className="block">{source.unlinked}</span>}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
