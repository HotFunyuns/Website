import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="hero-gradient relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="glow-orb left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-brand-500/15 animate-pulse-glow" />
      <div className="relative z-10 px-4 text-center">
        <p className="text-8xl font-black text-white/10">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">Page Not Found</h1>
        <p className="mt-3 text-surface-200/60">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-block px-8 py-3">
          Go Home
        </Link>
      </div>
    </section>
  );
}
