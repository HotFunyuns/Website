import type { Metadata } from 'next';
import Link from 'next/link';
import GooglePlayButton from '@/components/GooglePlayButton';
import { companyInfo, getAppBySlug } from '@/data/apps';

const NEW_SLUG = 'pro-basketball-draft-gm-mode';
const NEW_PATH = `/apps/${NEW_SLUG}/`;
// Read from the catalog so this page follows any future Play rename instead of
// advertising a name the store no longer uses.
const CURRENT_NAME = getAppBySlug(NEW_SLUG)?.name ?? 'Basketball Draft GM Franchise';

export const metadata: Metadata = {
  title: CURRENT_NAME,
  description: `This app is now ${CURRENT_NAME}. Visit the current app page for details and the free Google Play download.`,
  alternates: { canonical: `${companyInfo.siteUrl}${NEW_PATH}` },
  // Deliberately no `noindex`. GitHub Pages cannot serve a 301, so the instant
  // meta refresh below plus this canonical are the redirect. Adding noindex on
  // top would stop that pair being processed and strand whatever the old URL
  // has earned instead of passing it to the renamed app.
};

export default function LegacyBasketballDraftPage() {
  const app = getAppBySlug(NEW_SLUG);

  return (
    <>
      {/* Instant client redirect for browsers; the visible content below is the no-JS fallback. */}
      <meta httpEquiv="refresh" content={`0; url=${NEW_PATH}`} />

      <section className="relative overflow-hidden bg-white pb-24 pt-32 sm:pt-40">
        <div className="hero-streaks opacity-60" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,black,transparent)]"
        />

        <div className="container-narrow relative mx-auto px-5 text-center sm:px-8">
          {app && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.icon}
                alt={`${app.name} app icon`}
                width={96}
                height={96}
                fetchPriority="high"
                decoding="async"
                className="mx-auto h-24 w-24 rounded-[1.6rem] shadow-icon-tile ring-1 ring-ink-950/10"
              />
            </>
          )}

          <p className="eyebrow justify-center mt-8">App renamed</p>
          <h1 className="display-title mt-4 text-balance text-4xl leading-[1.1] sm:text-5xl">
            This app is now <em className="gold-text not-italic">{CURRENT_NAME}</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
            We&apos;ve renamed this app. You&apos;re being redirected to the current page — if it
            doesn&apos;t happen automatically, use the button below.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={NEW_PATH} className="btn-primary">
              Go to {CURRENT_NAME}
            </Link>
            {app && (
              <GooglePlayButton
                href={app.playStoreUrl}
                buttonLocation="hero"
                appName={app.name}
                label="Get it on Google Play"
                variant="outline"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
