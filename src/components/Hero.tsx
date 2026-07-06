import Link from 'next/link';
import { companyInfo } from '@/data/apps';
import GooglePlayIcon from './GooglePlayIcon';

interface CollageTile {
  src: string;
  alt: string;
  size: number;
  className: string;
  animation: string;
}

const collageTiles: CollageTile[] = [
  {
    src: '/icons/zombie-survival-last-survivor-sm.jpg',
    alt: 'Zombie Survival: Last Survivor app icon',
    size: 92,
    className: 'left-[6%] top-[4%] -rotate-6 rounded-[1.4rem]',
    animation: 'animate-float-mid',
  },
  {
    src: '/icons/keto-diet-tracker-sm.jpg',
    alt: 'Keto Diet Tracker: Low Carb app icon',
    size: 68,
    className: 'left-[47%] top-0 -rotate-[8deg] rounded-2xl',
    animation: 'animate-float-fast',
  },
  {
    src: '/icons/world-history-timeline-sim.jpg',
    alt: 'World History Timeline Sim app icon',
    size: 108,
    className: 'right-[3%] top-[10%] rotate-6 rounded-[1.6rem]',
    animation: 'animate-float-fast',
  },
  {
    src: '/icons/pro-basketball-my-career-sim-sm.jpg',
    alt: 'Pro Basketball My Career Sim app icon',
    size: 76,
    className: '-left-2 top-[46%] -rotate-12 rounded-2xl',
    animation: 'animate-float-mid',
  },
  {
    src: '/icons/protein-diet-tracker-sm.jpg',
    alt: 'Protein Diet Tracker app icon',
    size: 84,
    className: 'bottom-[14%] left-[9%] rotate-3 rounded-[1.3rem]',
    animation: 'animate-float-fast',
  },
  {
    src: '/icons/82-0-pro-basketball-draft-sm.jpg',
    alt: '82-0 Pro Basketball Draft app icon',
    size: 66,
    className: 'bottom-[2%] left-[38%] rotate-12 rounded-2xl',
    animation: 'animate-float-slow',
  },
  {
    src: '/icons/space-shooter-classic-arcade.jpg',
    alt: 'Space Shooter: Classic Arcade app icon',
    size: 100,
    className: 'bottom-[8%] right-[8%] -rotate-3 rounded-[1.5rem]',
    animation: 'animate-float-slow',
  },
];

const mobileStrip = [
  { src: '/icons/anime-coloring-book-sm.jpg', alt: 'Anime Coloring Book: Paint Art app icon', rotate: '-rotate-6' },
  { src: '/icons/zombie-survival-last-survivor-sm.jpg', alt: 'Zombie Survival: Last Survivor app icon', rotate: 'rotate-3' },
  { src: '/icons/world-history-timeline-sim-sm.jpg', alt: 'World History Timeline Sim app icon', rotate: '-rotate-3' },
  { src: '/icons/protein-diet-tracker-sm.jpg', alt: 'Protein Diet Tracker app icon', rotate: 'rotate-6' },
  { src: '/icons/space-shooter-classic-arcade-sm.jpg', alt: 'Space Shooter: Classic Arcade app icon', rotate: '-rotate-6' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44">
      {/* Animated gold/red light streaks */}
      <div className="hero-streaks" aria-hidden="true" />

      {/* Subtle dot grid, faded at edges */}
      <div
        aria-hidden="true"
        className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />

      {/* Floating geometric accents */}
      <div aria-hidden="true" className="accent-dot animate-pulse-soft left-[12%] top-[22%] h-2 w-2 bg-gold-400" />
      <div
        aria-hidden="true"
        className="accent-dot animate-pulse-soft left-[7%] top-[58%] h-2.5 w-2.5 rotate-45 !rounded-none bg-crimson-500/60"
        style={{ animationDelay: '1.2s' }}
      />
      <div
        aria-hidden="true"
        className="accent-dot animate-pulse-soft right-[10%] top-[18%] h-1.5 w-1.5 bg-gold-500"
        style={{ animationDelay: '2s' }}
      />

      <div className="container-wide relative mx-auto grid items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr,0.95fr] lg:gap-8 lg:px-10">
        {/* Copy */}
        <div className="hero-stagger relative z-10 max-w-2xl">
          <p className="eyebrow">Reign Creative LLC · Independent App Studio</p>

          <h1 className="display-title mt-6 text-balance text-[2.6rem] leading-[1.06] sm:text-6xl xl:text-[4.3rem]">
            Premium Apps. Built to Be{' '}
            <em className="gold-text gold-text-animated not-italic">Played</em>,{' '}
            <em className="gold-text gold-text-animated not-italic">Learned From</em>, and{' '}
            <em className="gold-text gold-text-animated not-italic">Loved</em>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-500">
            Reign Creative LLC builds memorable mobile games, learning experiences, productivity
            tools, and lifestyle apps for Android.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/apps/" className="btn-primary">
              Explore Our Apps
            </Link>
            <a
              href={companyInfo.developerPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <GooglePlayIcon className="h-4 w-4" />
              View on Google Play
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <p className="mt-8 flex items-center gap-2.5 text-sm text-ink-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Live on Google Play — games, learning, fitness &amp; lifestyle
          </p>
        </div>

        {/* Desktop icon collage */}
        <div className="relative hidden h-[540px] select-none lg:block" aria-label="App icons from the Reign Creative catalog" role="img">
          {/* Glows */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/25 blur-[100px]" />
          <div aria-hidden="true" className="absolute bottom-6 right-4 h-44 w-44 rounded-full bg-crimson-400/15 blur-[80px]" />

          {/* Rotating gold rings */}
          <div
            aria-hidden="true"
            className="animate-spin-slower absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-400/50"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[19.5rem] w-[19.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-200"
          />

          {/* Center flagship tile */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/anime-coloring-book.jpg"
            alt="Anime Coloring Book: Paint Art app icon"
            width={176}
            height={176}
            fetchPriority="high"
            decoding="async"
            className="animate-float-slow absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rotate-3 rounded-[2rem] shadow-icon-tile ring-1 ring-ink-950/10"
          />

          {collageTiles.map((tile) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={tile.src}
              src={tile.src}
              alt={tile.alt}
              width={tile.size}
              height={tile.size}
              loading="lazy"
              decoding="async"
              style={{ width: tile.size, height: tile.size }}
              className={`${tile.animation} absolute shadow-icon-tile ring-1 ring-ink-950/10 ${tile.className}`}
            />
          ))}
        </div>

        {/* Mobile icon strip */}
        <div className="flex items-center justify-center gap-3 lg:hidden" aria-label="App icons from the Reign Creative catalog" role="img">
          {mobileStrip.map((tile, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={tile.src}
              src={tile.src}
              alt={tile.alt}
              width={56}
              height={56}
              loading={i < 3 ? 'eager' : 'lazy'}
              decoding="async"
              className={`h-14 w-14 rounded-xl shadow-icon-tile ring-1 ring-ink-950/10 ${tile.rotate}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
