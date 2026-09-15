import Link from 'next/link';
import { companyInfo, getAppBySlug } from '@/data/apps';
import GooglePlayIcon from './GooglePlayIcon';
import PlayStoreLink from './PlayStoreLink';

/**
 * The eight apps shown in the hero.
 *
 * Every slug here was re-verified against its live, signed-out Google Play
 * listing on 2026-09-15 (scripts/verify-play-listings.mjs -> play-verification.json).
 * `npm run audit:catalog` re-checks each catalog row against that file and fails
 * on any drift; it is NOT currently part of `npm run build`, so treat it as a
 * check to run, not a guarantee the build enforces.
 *
 * An unknown slug below throws at module scope, which does fail the build.
 *
 * Ordered so no two adjacent tiles on the ring come from the same category.
 * The order IS the layout: index N sits at N x 45 degrees, starting at the top.
 */
const HERO_APP_SLUGS = [
  'soccer-career-sim-xi', //            0deg   Football Career Soccer XI Sim
  'regal-video-player', //             45deg   Regal Video Player
  'tennis-career-sim', //              90deg   Tennis Career Simulator 2026
  'jellyfish-arena-survivor-io', //   135deg   Jellyfish Arena Survivor io
  'pro-basketball-draft-gm-mode', //  180deg   Pro Basketball GM Franchise
  'tcg-card-grading-scanner', //      225deg   TCG Card Grading Scanner Value
  'hockey-career-sim', //             270deg   Hockey Career Sim 2026
  'space-galaxy-attack-hardcore', //  315deg   Space Galaxy Attack Hardcore
] as const;

/** Small, fixed tilts. Deterministic per slot — no randomness, so the build is stable. */
const TILT = [-6, 5, -4, 6, -5, 4, -6, 5];
/** Drift periods, offset so the ring never pulses in unison. */
const DRIFT = [7.4, 6.6, 8.2, 7, 6.8, 8, 7.6, 6.4];

const heroApps = HERO_APP_SLUGS.map((slug, i) => {
  const app = getAppBySlug(slug);
  // A missing slug is a build-time failure on purpose: better a red build than a
  // hero quietly rendering a broken image for an app that no longer exists.
  if (!app) throw new Error(`Hero references unknown app slug "${slug}"`);

  // Unit vector for slot i of 8, starting at 12 o'clock and going clockwise.
  const angle = (i / HERO_APP_SLUGS.length) * 2 * Math.PI - Math.PI / 2;
  return {
    slug: app.slug,
    name: app.name,
    src: app.iconSmall,
    ux: Math.cos(angle).toFixed(4),
    uy: Math.sin(angle).toFixed(4),
    tilt: TILT[i],
    duration: DRIFT[i],
    delay: (i * 0.45).toFixed(2),
  };
});

/**
 * Hero motion, kept in one place because tailwind.config.ts is owned elsewhere
 * this wave and a decorative loop does not justify shipping framer-motion to
 * every visitor: this is ~40 lines of compositor-only CSS with no JS, no
 * hydration and no client component boundary.
 *
 * Geometry note — why the tiles provably cannot collide:
 *   Eight tiles sit on a circle of radius R at 45deg intervals. For any adjacent
 *   pair, max(|dx|, |dy|) = R * sin(45deg) = 0.7071R. A tile of side S tilted by
 *   up to 6deg has an axis-aligned bounding box of S * (cos6 + sin6) = 1.099S,
 *   and the drift moves each tile at most 6px vertically (12px worst-case
 *   relative). Non-overlap therefore needs 0.7071R - 12 > 1.099S:
 *     lg  (R=155, S=76): 109.6 - 12 = 97.6  >  83.5   -> 14.1px clear
 *     xl  (R=186, S=88): 131.5 - 12 = 119.5 > 96.7    -> 22.8px clear
 *   The cluster's own half-extent is R + 1.099S/2, i.e. 196.8px at lg and
 *   234.4px at xl, against a grid column of 433px / 555px and a 540px-tall box —
 *   so it also cannot reach the copy column or the section edges.
 */
const HERO_CSS = `
.hero-orbit { --orbit-r: 155px; --orbit-tile: 76px; }
@media (min-width: 1280px) { .hero-orbit { --orbit-r: 186px; --orbit-tile: 88px; } }

.hero-orbit-slot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% + var(--ox)), calc(-50% + var(--oy)));
}
.hero-orbit-link {
  display: block;
  width: var(--orbit-tile);
  height: var(--orbit-tile);
  border-radius: 1.35rem;
  animation: hero-orbit-drift var(--dur) ease-in-out var(--delay) infinite;
  will-change: transform;
}
.hero-orbit-tile {
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(var(--tilt));
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-orbit-link:hover .hero-orbit-tile,
.hero-orbit-link:focus-visible .hero-orbit-tile { transform: rotate(0deg) scale(1.06); }
@keyframes hero-orbit-drift {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -6px, 0); }
}

.hero-orbit-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 9999px;
  transform: translate(-50%, -50%);
}
.hero-orbit-ring--outer {
  width: calc(var(--orbit-r) * 2);
  height: calc(var(--orbit-r) * 2);
  animation: hero-orbit-spin 38s linear infinite;
  will-change: transform;
}
.hero-orbit-ring--inner {
  width: calc(var(--orbit-r) * 1.3);
  height: calc(var(--orbit-r) * 1.3);
}
@keyframes hero-orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Backgrounded tab: stop paying for decoration nobody is looking at. */
#hero[data-motion='paused'] .hero-motion { animation-play-state: paused; }
#hero[data-motion='paused'] .hero-streaks::before,
#hero[data-motion='paused'] .hero-streaks::after { animation-play-state: paused; }

/* Reduced motion: stated here as well as globally, so the guarantee lives with
   the markup it applies to rather than in a stylesheet this file cannot see. */
@media (prefers-reduced-motion: reduce) {
  .hero-orbit-link { animation: none !important; transform: none !important; }
  .hero-orbit-ring--outer { animation: none !important; transform: translate(-50%, -50%) !important; }
  .hero-orbit-tile { transition: none !important; }
}
`;

/**
 * Twelve lines, no framework, runs before hydration and never blocks it.
 * Sets one attribute; every pause rule above hangs off it.
 */
const HERO_MOTION_JS = `(function(){var h=document.getElementById('hero');if(!h)return;
function s(){h.setAttribute('data-motion',document.visibilityState==='hidden'?'paused':'running');}
document.addEventListener('visibilitychange',s,{passive:true});s();})();`;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      {/* Animated gold/red light streaks */}
      <div className="hero-streaks" aria-hidden="true" />

      {/* Subtle dot grid, faded at edges */}
      <div
        aria-hidden="true"
        className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />

      {/* Floating geometric accents */}
      <div aria-hidden="true" className="accent-dot animate-pulse-soft hero-motion left-[12%] top-[22%] h-2 w-2 bg-gold-400" />
      <div
        aria-hidden="true"
        className="accent-dot animate-pulse-soft hero-motion left-[7%] top-[58%] h-2.5 w-2.5 rotate-45 !rounded-none bg-crimson-500/60"
        style={{ animationDelay: '1.2s' }}
      />
      <div
        aria-hidden="true"
        className="accent-dot animate-pulse-soft hero-motion right-[10%] top-[18%] h-1.5 w-1.5 bg-gold-500"
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
            <PlayStoreLink
              href={companyInfo.developerPageUrl}
              buttonLocation="hero"
              className="btn-outline"
            >
              <GooglePlayIcon className="h-4 w-4" />
              View on Google Play
              <span className="sr-only"> (opens in a new tab)</span>
            </PlayStoreLink>
          </div>

          <p className="mt-8 flex items-center gap-2.5 text-sm text-ink-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Live on Google Play — games, learning, fitness &amp; lifestyle
          </p>
        </div>

        {/*
          Desktop orbit. This lives in its own grid column (lg and up only), so the
          absolutely positioned tiles are contained by a box that shares no space
          with the headline or the buttons — collision with the copy is structurally
          impossible rather than tuned away.
        */}
        <div className="hero-orbit relative hidden h-[540px] select-none lg:block">
          {/* Glows */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/25 blur-[100px]" />
          <div aria-hidden="true" className="absolute bottom-6 right-4 h-44 w-44 rounded-full bg-crimson-400/15 blur-[80px]" />

          {/* Orbit guides. The dashed ring runs exactly through the tile centres. */}
          <div aria-hidden="true" className="hero-orbit-ring hero-orbit-ring--outer hero-motion border border-dashed border-gold-400/50" />
          <div aria-hidden="true" className="hero-orbit-ring hero-orbit-ring--inner border border-gold-200" />

          <ul
            aria-label="Featured apps from the Reign Creative catalog"
            className="absolute inset-0 m-0 list-none p-0"
          >
            {heroApps.map((app) => (
              <li
                key={app.slug}
                className="hero-orbit-slot"
                style={
                  {
                    '--ox': `calc(var(--orbit-r) * ${app.ux})`,
                    '--oy': `calc(var(--orbit-r) * ${app.uy})`,
                  } as React.CSSProperties
                }
              >
                <Link
                  href={`/apps/${app.slug}/`}
                  aria-label={`${app.name} — view app details`}
                  className="hero-orbit-link hero-motion rounded-[1.35rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-crimson-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                  style={
                    {
                      '--dur': `${app.duration}s`,
                      '--delay': `${app.delay}s`,
                    } as React.CSSProperties
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.src}
                    alt=""
                    width={88}
                    height={88}
                    loading="eager"
                    decoding="async"
                    fetchPriority="low"
                    style={{ '--tilt': `${app.tilt}deg` } as React.CSSProperties}
                    className="hero-orbit-tile rounded-[1.35rem] shadow-icon-tile ring-1 ring-ink-950/10"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*
          Below lg the same eight apps become a wrapping flex row in its own grid
          row underneath the copy. Normal flow + flex-wrap means tiles cannot
          overlap each other or the CTAs at any width: at 280px four fit per row
          (4 x 44 + 3 x 10 = 206px inside a 240px content box) and it re-flows
          upward from there, reaching a single row by 640px.
        */}
        <ul
          aria-label="Featured apps from the Reign Creative catalog"
          className="m-0 flex list-none flex-wrap items-center justify-center gap-2.5 p-0 sm:gap-3 lg:hidden"
        >
          {heroApps.map((app, i) => (
            <li key={app.slug}>
              <Link
                href={`/apps/${app.slug}/`}
                aria-label={`${app.name} — view app details`}
                className="block rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-crimson-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.src}
                  alt=""
                  width={56}
                  height={56}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority="low"
                  style={{ transform: `rotate(${app.tilt / 2}deg)` }}
                  className="h-11 w-11 rounded-xl shadow-icon-tile ring-1 ring-ink-950/10 sm:h-14 sm:w-14"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <script dangerouslySetInnerHTML={{ __html: HERO_MOTION_JS }} />
    </section>
  );
}
