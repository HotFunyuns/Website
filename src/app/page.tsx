import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import AppCard from '@/components/AppCard';
import Reveal from '@/components/Reveal';
import GoldDivider from '@/components/GoldDivider';
import GooglePlayIcon from '@/components/GooglePlayIcon';
import GooglePlayButton from '@/components/GooglePlayButton';
import BlogCard from '@/components/blog/BlogCard';
import { featuredApps, companyInfo, appCount, activeCategories, countByCategory } from '@/data/apps';
import { featuredPosts, posts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Reign Creative LLC — Premium Mobile Apps for Android',
  description:
    'Reign Creative LLC builds memorable mobile games, learning experiences, fitness trackers, and lifestyle apps for Android — all available on Google Play.',
  alternates: { canonical: '/' },
};

const pillars = [
  {
    title: 'Play',
    body: 'Games built for quick, satisfying sessions — arcade action, sports sims, and creative fun that respect your time.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 12h4m-2-2v4m7-3h.01M18 13h.01" />
        <path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.6l-.7 7A3.5 3.5 0 0 0 5.48 19c.95 0 1.86-.38 2.52-1.06L9.5 16.4h5l1.5 1.54A3.53 3.53 0 0 0 18.52 19a3.5 3.5 0 0 0 3.48-3.4l-.7-7A4 4 0 0 0 17.32 5Z" />
      </svg>
    ),
  },
  {
    title: 'Progress',
    body: 'Focused trackers that make daily consistency easy — because small daily wins compound into real results.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 20h18M7 16v-5m5 5V8m5 8v-3" />
        <path d="m7 8 4-4 3 3 4-4" />
      </svg>
    ),
  },
  {
    title: 'Learn',
    body: 'Learning experiences that feel like exploration, turning curiosity into knowledge you actually keep.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h13" />
        <path d="M9 7h6" />
      </svg>
    ),
  },
  {
    title: 'Polish',
    body: 'Crafted details, smooth performance, and interfaces that feel considered — quality you can feel in every tap.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.5-6.5-1.4 1.4M7.9 16.1l-1.4 1.4m11 0-1.4-1.4M7.9 7.9 6.5 6.5" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
];

const categoryTiles = activeCategories.map((category) => ({
  ...category,
  href: `/apps/category/${category.id}/`,
  count: countByCategory(category.id),
}));

// Editor's picks lead; the newest articles fill any remaining slots.
const latestPosts = [...featuredPosts, ...posts.filter((p) => !p.featured)].slice(0, 3);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Featured Apps */}
      <section className="section-padding relative" aria-labelledby="featured-heading">
        <div className="container-wide mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Featured Apps"
              title={
                <span id="featured-heading">
                  A few favorites from the <em className="gold-text not-italic">catalog</em>
                </span>
              }
              description="Games, learning, and fitness — each app is built to do one thing memorably well."
            />
            <Reveal delay={150}>
              <Link href="/apps/" className="btn-outline btn-sm">
                View all apps
              </Link>
            </Reveal>
          </div>

          <ul className="mt-12 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {featuredApps.map((app, i) => (
              <li key={app.slug} className="h-full">
                <Reveal delay={i * 90} className="h-full">
                  <AppCard app={app} eager={i < 3} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GoldDivider />

      {/* Value proposition */}
      <section className="section-padding bg-cream-100" aria-labelledby="value-heading">
        <div className="container-wide mx-auto">
          <SectionHeading
            eyebrow="Why Reign Creative"
            title={<span id="value-heading">Built for Everyday Play &amp; Progress</span>}
            description="Every app we ship is designed around a simple idea: it should be genuinely fun to open, useful in your real day, and polished enough to love."
            align="center"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90} className="h-full">
                <div className="card-premium-hover h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-300 bg-gold-50 text-gold-700">
                    {pillar.icon}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-950">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding" aria-labelledby="categories-heading">
        <div className="container-wide mx-auto">
          <SectionHeading
            eyebrow="Explore by Category"
            title={<span id="categories-heading">Something for every kind of day</span>}
            description="From five spare minutes in a queue to a focused evening of progress."
          />

          <ul className="mt-12 grid list-none gap-6 p-0 sm:grid-cols-2">
            {categoryTiles.map((tile, i) => (
              <li key={tile.id} className="last:sm:col-span-2">
                <Reveal delay={i * 80}>
                  <Link
                    href={tile.href}
                    className="card-premium-hover group flex h-full items-center justify-between gap-6 p-7"
                  >
                    <span>
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-2xl font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                          {tile.label}
                        </span>
                        <span className="pill">
                          {tile.count} {tile.count === 1 ? 'app' : 'apps'}
                        </span>
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-ink-500">
                        {tile.blurb}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-400 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-50 group-hover:text-gold-700"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest guides */}
      {latestPosts.length > 0 && (
        <section className="section-padding bg-cream-100" aria-labelledby="guides-heading">
          <div className="container-wide mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="From the blog"
                title={
                  <span id="guides-heading">
                    Guides from the people who <em className="gold-text not-italic">build them</em>
                  </span>
                }
                description="How our apps work, who they are for, and what to expect before you install."
              />
              <Reveal delay={150}>
                <Link href="/blog/" className="btn-outline btn-sm">
                  All articles
                </Link>
              </Reveal>
            </div>

            <ul className="mt-12 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, i) => (
                <li key={post.slug} className="h-full">
                  <Reveal delay={i * 90} className="h-full">
                    <BlogCard post={post} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Studio trust + Google Play callout */}
      <section className="section-padding bg-ink-panel relative overflow-hidden" aria-labelledby="studio-heading">
        <div
          aria-hidden="true"
          className="bg-dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_70%_40%,black,transparent)]"
        />
        <div className="container-wide relative mx-auto grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow !text-gold-300">The Studio</p>
            <h2 id="studio-heading" className="display-title mt-4 text-balance text-3xl !text-white sm:text-4xl">
              An independent studio with a simple standard:{' '}
              <em className="gold-text not-italic">ship things worth keeping</em>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300">
              Reign Creative LLC designs, builds, and continually improves every app in our catalog.
              No bloat, no gimmicks — just focused mobile experiences that earn their place on your
              home screen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Fun', 'Useful', 'Polished', 'Always improving'].map((principle) => (
                <span key={principle} className="pill-dark">
                  {principle}
                </span>
              ))}
            </div>
            <Link
              href="/about/"
              className="link-accent mt-8 inline-block !text-gold-300 hover:!text-gold-200"
            >
              More about the studio →
            </Link>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/40 bg-gold-500/10 text-gold-300">
                <GooglePlayIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                Available on Google Play
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">
                Every Reign Creative app is published under our official developer account,{' '}
                <span className="text-gold-200">{companyInfo.developerName}</span>. Install any of
                them free on Google Play.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <GooglePlayButton
                  href={companyInfo.developerPageUrl}
                  buttonLocation="article_middle"
                  label="Visit our Google Play page"
                  variant="gold"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="hero-streaks opacity-70" aria-hidden="true" />
        <div className="container-narrow relative mx-auto text-center">
          <Reveal>
            <p className="eyebrow justify-center">Ready when you are</p>
            <h2 id="cta-heading" className="display-title mt-4 text-balance text-3xl sm:text-5xl">
              Find your next favorite app
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
              {appCount} apps across {activeCategories.length} categories — built to be played,
              learned from, and loved.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/apps/" className="btn-primary">
                Explore Our Apps
              </Link>
              <GooglePlayButton
                href={companyInfo.developerPageUrl}
                buttonLocation="article_bottom"
                label="View on Google Play"
                variant="outline"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
