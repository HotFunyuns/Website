import Link from 'next/link';
import type { AppInfo } from '@/data/apps';
import type { ButtonLocation } from '@/lib/analytics';
import { playUrlWithReferrer } from '@/lib/play';
import GooglePlayButton from '../GooglePlayButton';

export default function ArticleAppCta({
  app,
  articleSlug,
  buttonLocation,
  heading,
  compact = false,
}: {
  app: AppInfo;
  articleSlug: string;
  buttonLocation: ButtonLocation;
  heading?: string;
  /** Sidebar placement: stays stacked, since the column is narrower than the breakpoint. */
  compact?: boolean;
}) {
  return (
    <aside
      className={
        compact
          ? 'card-premium flex flex-col gap-5 p-6'
          : 'card-premium my-10 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8'
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={app.iconSmall}
        alt=""
        aria-hidden="true"
        width={72}
        height={72}
        loading="lazy"
        decoding="async"
        className="h-[72px] w-[72px] shrink-0 rounded-2xl shadow-icon-tile ring-1 ring-ink-950/10"
      />
      <div className="flex-1">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          {heading ?? `Try ${app.name}`}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{app.cardDescription}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <GooglePlayButton
            href={playUrlWithReferrer(app, articleSlug)}
            buttonLocation={buttonLocation}
            appName={app.name}
            label="Get it free on Google Play"
            small
          />
          <Link href={`/apps/${app.slug}/`} className="link-accent text-sm">
            Full app details →
          </Link>
        </div>
      </div>
    </aside>
  );
}
