import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';

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
