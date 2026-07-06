'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { apps, filterCategories, type FilterId } from '@/data/apps';
import AppCard from './AppCard';

const validIds = filterCategories.map((c) => c.id);

export default function AppsExplorer() {
  const [filter, setFilter] = useState<FilterId>('all');

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

  const visibleApps = useMemo(
    () => (filter === 'all' ? apps : apps.filter((app) => app.filter === filter)),
    [filter]
  );

  const activeCategory = filterCategories.find((c) => c.id === filter);

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <div role="group" aria-label="Filter apps by category" className="flex flex-wrap gap-2.5">
          {filterCategories.map((cat) => {
            const count =
              cat.id === 'all' ? apps.length : apps.filter((a) => a.filter === cat.id).length;
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
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 text-sm text-ink-400">
          {visibleApps.length > 0
            ? `Showing ${visibleApps.length} ${visibleApps.length === 1 ? 'app' : 'apps'}`
            : 'No apps in this category yet'}
          {activeCategory && activeCategory.id !== 'all' ? ` — ${activeCategory.blurb}` : ''}
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
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
              </svg>
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-ink-950">
              Productivity tools are in development
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
              Our first productivity releases are being built right now. In the meantime, the rest
              of the catalog is one tap away.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={() => selectFilter('all')} className="btn-primary btn-sm">
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
