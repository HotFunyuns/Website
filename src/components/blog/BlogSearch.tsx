'use client';

import Link from 'next/link';
import { useId, useMemo, useRef, useState } from 'react';

interface Entry {
  s: string;
  t: string;
  d: string;
  k: string;
}

const MAX_RESULTS = 30;

/**
 * Search across every article. The list below it is server-rendered and
 * paginated; this box loads a small title-and-description index the first time
 * it is used, so the page does not ship the whole catalogue up front.
 */
export default function BlogSearch() {
  const inputId = useId();
  const statusId = useId();
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const loading = useRef(false);

  const load = () => {
    if (entries || loading.current) return;
    loading.current = true;
    fetch('/blog/search-index.json')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: Entry[]) => setEntries(data))
      .catch(() => setFailed(true))
      .finally(() => {
        loading.current = false;
      });
  };

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!entries || words.length === 0) return [];
    return entries
      .filter((entry) => {
        const text = `${entry.t} ${entry.d} ${entry.k}`.toLowerCase();
        return words.every((word) => text.includes(word));
      })
      .slice(0, MAX_RESULTS);
  }, [entries, query]);

  const active = query.trim().length > 0;

  return (
    <div className="mb-10">
      <label htmlFor={inputId} className="eyebrow block">
        Search every article
      </label>
      <div className="relative mt-3 max-w-md">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          id={inputId}
          type="search"
          value={query}
          onFocus={load}
          onChange={(event) => {
            load();
            setQuery(event.target.value);
          }}
          placeholder="Search by title or topic…"
          aria-describedby={statusId}
          className="w-full rounded-full border border-ink-300 bg-white py-2.5 pl-11 pr-4 text-sm text-ink-950 transition-colors placeholder:text-ink-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
        />
      </div>
      <p id={statusId} aria-live="polite" className="mt-2 text-xs text-ink-500">
        {!active
          ? ''
          : failed
            ? 'Search is unavailable right now; browse the categories and topic hubs below instead.'
            : !entries
              ? 'Loading…'
              : results.length === 0
                ? 'No articles match that search.'
                : `${results.length}${results.length === MAX_RESULTS ? '+' : ''} matching article${results.length === 1 ? '' : 's'}`}
      </p>
      {active && results.length > 0 && (
        <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
          {results.map((entry) => (
            <li key={entry.s}>
              <Link href={`/blog/${entry.s}/`} className="card-premium-hover block h-full p-4">
                <span className="block text-sm font-semibold text-ink-950">{entry.t}</span>
                <span className="mt-1 block text-xs leading-relaxed text-ink-500">{entry.d}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
