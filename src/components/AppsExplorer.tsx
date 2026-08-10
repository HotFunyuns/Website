'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { apps, activeCategories, type FilterId } from '@/data/apps';
import AppCard from './AppCard';

const filterOptions: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Apps' },
  ...activeCategories.map((c) => ({ id: c.id as FilterId, label: c.shortLabel })),
];

const validIds = filterOptions.map((c) => c.id);

const countFor = (id: FilterId) =>
  id === 'all' ? apps.length : apps.filter((a) => a.categoryId === id).length;

export default function AppsExplorer() {
  const [filter, setFilter] = useState<FilterId>('all');
  const [query, setQuery] = useState('');
  const searchId = useId();

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && validIds.includes(hash as FilterId)) {
      setFilter(hash as FilterId);
    }
  }, []);

  const selectFilter = (id: FilterId) => {
    setFilter(id);
    const { pathname, search } = window.location;
    history.replaceState(null, '', id === 'all' ? pathname + search : `#${id}`);
  };

  const visibleApps = useMemo(() => {
    const byCategory = filter === 'all' ? apps : apps.filter((app) => app.categoryId === filter);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter((app) =>
      `${app.name} ${app.category} ${app.tagline} ${app.cardDescription}`.toLowerCase().includes(q)
    );
  }, [filter, query]);

  const activeCategory = activeCategories.find((c) => c.id === filter);
  const searching = query.trim().length > 0;

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <div className="mb-6">
          <label htmlFor={searchId} className="sr-only">
            Search apps by name or category
          </label>
          <div className="relative max-w-md">
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
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps…"
              className="w-full rounded-full border border-ink-300 bg-white py-2.5 pl-11 pr-4 text-sm text-ink-950 transition-colors placeholder:text-ink-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
            />
          </div>
        </div>

        <div role="group" aria-label="Filter apps by category" className="flex flex-wrap gap-2.5">
          {filterOptions.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectFilter(cat.id)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-out-expo ${
                  active
                    ? 'border-ink-950 bg-ink-950 text-white shadow-card'
                    : 'border-ink-300 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-gold-400 hover:text-ink-950'
                }`}
              >
                {cat.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                    active ? 'bg-gold-400 text-ink-950' : 'bg-ink-100 text-ink-500'
                  }`}
                >
                  {countFor(cat.id)}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 text-sm text-ink-400">
          {visibleApps.length > 0
            ? `Showing ${visibleApps.length} ${visibleApps.length === 1 ? 'app' : 'apps'}`
            : 'No apps match that search'}
          {activeCategory && !searching ? ` — ${activeCategory.blurb}` : ''}
        </p>

        {visibleApps.length > 0 ? (
          <motion.ul layout className="mt-9 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleApps.map((app) => (
                <motion.li
                  key={app.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <AppCard app={app} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="card-premium mt-9 px-8 py-14 text-center sm:px-14">
            <span
              aria-hidden="true"
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-300 bg-gold-50"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-ink-950">
              Nothing matched “{query.trim()}”
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
              Try a different word, or browse the full catalog — there are {apps.length} apps across{' '}
              {activeCategories.length} categories.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  selectFilter('all');
                }}
                className="btn-primary btn-sm"
              >
                Show all apps
              </button>
              <Link href="/support/" className="btn-outline btn-sm">
                Suggest an app idea
              </Link>
            </div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
