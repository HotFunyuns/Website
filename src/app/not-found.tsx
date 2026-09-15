import type { Metadata } from 'next';
import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';

// Without this the 404 inherits the root layout's title, description and
// `canonical: '/'`, so it reports itself as being the homepage.
//
// `canonical: null` is deliberate and must stay. On GitHub Pages this component
// is built to `out/404.html`, which the host serves — with a genuine 404 status
// — for every unknown path. One file answers for infinitely many URLs, so a
// self-canonical would be false and a canonical to `/` would claim the
// homepage. `noindex` is the correct signal for it, and is what keeps the page
// out of the index without asserting a URL identity it does not have.
//
// The export also writes `out/404/index.html`, an identical copy that Pages
// serves at HTTP 200 — a soft 404 duplicate with no canonical.
// `scripts/postbuild-normalize-urls.mjs` deletes that directory after the
// build; `out/404.html` itself is kept, because it is the handler.
export const metadata: Metadata = {
  title: { absolute: 'Page Not Found — Reign Creative LLC' },
  description: 'This page does not exist or has moved.',
  alternates: { canonical: null },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      <div className="hero-streaks opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="relative z-10 px-5 text-center">
        <p className="gold-text font-display text-8xl font-semibold sm:text-9xl" aria-hidden="true">
          404
        </p>
        <GoldDivider className="my-8" />
        <h1 className="display-title text-2xl sm:text-3xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/apps/" className="btn-outline">
            Browse Our Apps
          </Link>
        </div>
      </div>
    </section>
  );
}
