'use client';

import { useId, useMemo, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import BlogCard from './BlogCard';

interface Filter {
  id: string;
  label: string;
  count: number;
}

export default function BlogExplorer({ posts, filters }: { posts: BlogPost[]; filters: Filter[] }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const searchId = useId();

  const options: Filter[] = [{ id: 'all', label: 'All Articles', count: posts.length }, ...filters];

  const visible = useMemo(() => {
    const byCategory = filter === 'all' ? posts : posts.filter((p) => p.category === filter);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter((post) =>
      `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase().includes(q)
    );
  }, [filter, query, posts]);

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <div className="mb-6">
          <label htmlFor={searchId} className="sr-only">
            Search articles by title or topic
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
              placeholder="Search articles…"
              className="w-full rounded-full border border-ink-300 bg-white py-2.5 pl-11 pr-4 text-sm text-ink-950 transition-colors placeholder:text-ink-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
            />
          </div>
        </div>

        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2.5">
          {options.map((option) => {
            const active = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-out-expo ${
                  active
                    ? 'border-ink-950 bg-ink-950 text-white shadow-card'
                    : 'border-ink-300 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-gold-400 hover:text-ink-950'
                }`}
              >
                {option.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                    active ? 'bg-gold-400 text-ink-950' : 'bg-ink-100 text-ink-500'
                  }`}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 text-sm text-ink-400">
          {visible.length > 0
            ? `Showing ${visible.length} ${visible.length === 1 ? 'article' : 'articles'}`
            : 'No articles match that search'}
        </p>

        {visible.length > 0 ? (
          <motion.ul layout className="mt-9 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((post) => (
                <motion.li
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <BlogCard post={post} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="card-premium mt-9 px-8 py-14 text-center sm:px-14">
            <h3 className="font-display text-2xl font-semibold text-ink-950">
              Nothing matched “{query.trim()}”
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
              Try a different word, or browse every article we have published so far.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilter('all');
                }}
                className="btn-primary btn-sm"
              >
                Show all articles
              </button>
              <Link href="/apps/" className="btn-outline btn-sm">
                Browse the apps
              </Link>
            </div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
