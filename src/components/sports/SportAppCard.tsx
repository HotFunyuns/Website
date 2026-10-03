import Link from 'next/link';
import GooglePlayButton from '@/components/GooglePlayButton';
import type { AppInfo } from '@/data/apps';
import { playUrlWithReferrer } from '@/lib/play';

/**
 * One of a sport's apps, labelled by the role it plays — the draft/GM game or
 * the career sim. Everything shown about the app comes from its catalog entry,
 * and the Google Play link goes through PlayStoreLink (via GooglePlayButton),
 * so a click is tracked exactly once and carries the page as its referrer.
 */
export default function SportAppCard({
  app,
  role,
  referrerSlug,
}: {
  app: AppInfo;
  role: string;
  referrerSlug: string;
}) {
  return (
    <article className="card-premium flex h-full flex-col p-6">
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={app.iconSmall}
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
          className="h-16 w-16 shrink-0 rounded-2xl shadow-icon-tile ring-1 ring-ink-950/10"
        />
        <div className="min-w-0">
          <p className="pill">{role}</p>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-950">
            <Link href={`/apps/${app.slug}/`} className="transition-colors hover:text-crimson-600">
              {app.name}
            </Link>
          </h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">{app.cardDescription}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <GooglePlayButton
          href={playUrlWithReferrer(app, referrerSlug)}
          buttonLocation="app_card"
          appName={app.name}
          label="Get it free on Google Play"
          small
        />
        <Link href={`/apps/${app.slug}/`} className="link-accent text-sm" aria-label={`Full details for ${app.name}`}>
          Full app details →
        </Link>
      </div>
    </article>
  );
}
