'use client';

import Link from 'next/link';
import { useCallback, useRef } from 'react';
import type { AppInfo } from '@/data/apps';
import GooglePlayIcon from './GooglePlayIcon';

interface AppCardProps {
  app: AppInfo;
  eager?: boolean;
}

export default function AppCard({ app, eager = false }: AppCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { clientX, clientY } = e;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - rect.left}px`);
      el.style.setProperty('--my', `${clientY - rect.top}px`);
    });
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card-premium-hover spotlight-card group flex h-full flex-col p-6 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={app.iconSmall}
          alt={`${app.name} app icon`}
          width={64}
          height={64}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-16 w-16 rounded-[1.1rem] shadow-icon-tile ring-1 ring-ink-950/10 transition-transform duration-300 ease-out-expo group-hover:scale-[1.07]"
        />
        <span className="pill">{app.category}</span>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-ink-950">
        <Link
          href={`/apps/${app.slug}/`}
          className="transition-colors hover:text-crimson-600"
        >
          {app.name}
        </Link>
      </h3>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-500">{app.cardDescription}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={app.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-sm"
        >
          <GooglePlayIcon className="h-3.5 w-3.5" />
          View on Google Play
          <span className="sr-only"> — {app.name} (opens in a new tab)</span>
        </a>
        <Link
          href={`/apps/${app.slug}/`}
          className="link-accent text-sm"
          aria-label={`Learn more about ${app.name}`}
        >
          Learn more{' '}
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
