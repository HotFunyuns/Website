import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import GoldDivider from '@/components/GoldDivider';
import GooglePlayButton from '@/components/GooglePlayButton';
import { companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'About Reign Creative LLC — Independent App Studio',
  description:
    'Reign Creative LLC is an independent mobile app studio building games, educational tools, fitness trackers, and lifestyle experiences for Android.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About Reign Creative LLC — Independent App Studio',
    description:
      'An independent mobile app studio building games, educational tools, fitness trackers, and lifestyle experiences for Android.',
    url: `${companyInfo.siteUrl}/about/`,
    images: [
      {
        url: `${companyInfo.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Reign Creative LLC — Premium Mobile Apps for Android',
      },
    ],
  },
};

const principles = [
  {
    title: 'Fun',
    body: 'If an app isn’t enjoyable to open, nothing else matters. Whether it’s a zombie horde or a protein goal, we design for the moment-to-moment experience first — the tap that feels good, the session that ends with "one more".',
  },
  {
    title: 'Useful',
    body: 'Every app has to earn its place on your home screen. Our trackers solve real daily problems, our learning apps reward curiosity, and our games respect your time. No filler features, no bloat.',
  },
  {
    title: 'Polished',
    body: 'Independent doesn’t mean rough. We sweat the details — smooth performance, considered interfaces, and interactions that feel deliberate. Quality is the difference between an app you try and an app you keep.',
  },
  {
    title: 'Built to improve over time',
    body: 'Shipping is the start, not the finish. We keep refining every app in the catalog — tuning gameplay, improving tools, and acting on the feedback players and users send us.',
  },
];

const focusAreas = [
  { label: 'Games', detail: 'Arcade action, sports sims & creative play' },
  { label: 'Education', detail: 'Learning that feels like exploration' },
  { label: 'Fitness & Lifestyle', detail: 'Trackers built on daily consistency' },
  { label: 'Productivity', detail: 'Practical tools, in development' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Studio"
        title={
          <>
            About <em className="gold-text not-italic">Reign Creative LLC</em>
          </>
        }
        description="An independent mobile app studio building games, educational tools, fitness trackers, and lifestyle experiences for Android."
      />

      {/* Story */}
      <section className="section-padding !pt-8" aria-labelledby="story-heading">
        <div className="container-wide mx-auto grid gap-14 lg:grid-cols-[1.5fr,1fr]">
          <Reveal>
            <h2 id="story-heading" className="sr-only">
              Our story
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-ink-600 sm:text-lg">
              <p>
                Reign Creative LLC is an independent app studio founded in {companyInfo.founded}.
                We design, build, and publish our own catalog of Android apps — from fast arcade
                games and sports simulations to history explorers and focused diet trackers.
              </p>
              <p>
                Being independent shapes how we work. There&apos;s no committee deciding what ships:
                every app starts as something we genuinely want to exist, gets built with care, and
                keeps improving after launch. When you email support, the people who made the app
                are the ones reading it.
              </p>
              <p>
                Our catalog is deliberately varied — play, learning, and progress — but everything
                we release is held to the same standard: it should be fun to open, useful in your
                real day, and polished enough to love.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="card-premium h-fit p-7 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink-950">What we build</h3>
              <ul className="mt-5 space-y-4">
                {focusAreas.map((area) => (
                  <li key={area.label} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-gradient-to-br from-gold-400 to-gold-600"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-ink-950">{area.label}</span>
                      <span className="block text-sm text-ink-500">{area.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-ink-100 pt-6">
                <p className="text-sm text-ink-500">
                  Publishing on Google Play as{' '}
                  <span className="font-semibold text-ink-950">{companyInfo.developerName}</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles timeline */}
      <section className="section-padding bg-cream-100" aria-labelledby="principles-heading">
        <div className="container-narrow mx-auto">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 id="principles-heading" className="display-title mt-4 text-3xl sm:text-4xl">
              Four principles behind every release
            </h2>
          </Reveal>

          <div className="relative mt-14">
            {/* Timeline line */}
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-[15px] top-2 w-px bg-gradient-to-b from-gold-400 via-gold-300 to-transparent sm:left-[19px]"
            />

            <ol className="space-y-10">
              {principles.map((principle, i) => (
                <li key={principle.title}>
                  <Reveal delay={i * 100} className="relative pl-14 sm:pl-16">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold-400 bg-white shadow-card sm:h-10 sm:w-10"
                    >
                      <span className="h-2 w-2 rounded-full bg-crimson-500" />
                    </span>
                    <div className="card-premium-hover p-7">
                      <span className="font-display text-sm font-semibold tracking-widest text-gold-600">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-ink-950">
                        {principle.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-500 sm:text-base">
                        {principle.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" aria-labelledby="about-cta-heading">
        <div className="hero-streaks opacity-60" aria-hidden="true" />
        <div className="container-narrow relative mx-auto text-center">
          <Reveal>
            <GoldDivider className="mb-12" />
            <h2 id="about-cta-heading" className="display-title text-balance text-3xl sm:text-4xl">
              See what we&apos;ve built so far
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
              Eight published apps across games, education, and fitness — all free on Google Play.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/apps/" className="btn-primary">
                Explore Our Apps
              </Link>
              <GooglePlayButton
                href={companyInfo.developerPageUrl}
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
