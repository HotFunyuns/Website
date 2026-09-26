import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import GoldDivider from '@/components/GoldDivider';
import GooglePlayButton from '@/components/GooglePlayButton';
import JsonLd from '@/components/JsonLd';
import PlayStoreLink from '@/components/PlayStoreLink';
import { formatPostDate } from '@/components/blog/format';
import { activeCategories, appCount, apps, companyInfo, countByCategory } from '@/data/apps';
import { DEFAULT_AUTHOR_ID, authorPath, getAuthor } from '@/data/authors';
import { APPROVAL_GATE_AFTER, activeHubs, postCount } from '@/lib/blog';

const description =
  'Reign Creative LLC is an independent Android app studio, publishing on Google Play as Reign Collective Apps: what we make, how we check facts, how to reach us.';

export const metadata: Metadata = {
  // Absolute because the template suffix would name the company twice.
  title: { absolute: 'About Reign Creative LLC — Independent App Studio' },
  description,
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About Reign Creative LLC — Independent App Studio',
    description,
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

const h2 = 'display-title text-3xl sm:text-4xl';

// The newest Play-listing check across the catalog. Stated so a reader can see
// how current the app facts are rather than assume.
const lastVerified = apps.map((app) => app.lastVerified).reduce((a, b) => (a > b ? a : b));

export default function AboutPage() {
  const author = getAuthor(DEFAULT_AUTHOR_ID);
  const hubCount = activeHubs().length;
  const gateDate = formatPostDate(APPROVAL_GATE_AFTER);

  // AboutPage names the Organization node the root layout defines as its main
  // entity, rather than describing the company a second time.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${companyInfo.siteUrl}/about/#page`,
    url: `${companyInfo.siteUrl}/about/`,
    name: 'About Reign Creative LLC',
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
    mainEntity: { '@id': `${companyInfo.siteUrl}/#organization` },
  };

  const facts: { term: string; value: React.ReactNode }[] = [
    { term: 'Legal name', value: companyInfo.name },
    { term: 'Google Play developer name', value: companyInfo.developerName },
    {
      term: 'Official website',
      value: (
        <Link href="/" className="link-accent">
          {companyInfo.domain}
        </Link>
      ),
    },
    {
      term: 'Google Play developer page',
      value: (
        <PlayStoreLink href={companyInfo.developerPageUrl} buttonLocation="hero" className="link-accent">
          {companyInfo.developerName} on Google Play
          <span className="sr-only"> (opens in a new tab)</span>
        </PlayStoreLink>
      ),
    },
    { term: 'Founded', value: companyInfo.founded },
    { term: 'Apps on Google Play', value: `${appCount}, all for Android` },
    {
      term: 'Support',
      value: (
        <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all">
          {companyInfo.supportEmail}
        </a>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />

      <PageHeader
        eyebrow="The Studio"
        title={
          <>
            About <em className="gold-text not-italic">Reign Creative LLC</em>
          </>
        }
        description={`An independent studio that builds Android apps — games, learning apps, language courses and trackers — and publishes them on Google Play as ${companyInfo.developerName}.`}
      />

      {/* Who we are */}
      <section className="section-padding !pt-8" aria-labelledby="who-heading">
        <div className="container-wide mx-auto grid gap-14 lg:grid-cols-[1.5fr,1fr]">
          <Reveal>
            <h2 id="who-heading" className={h2}>
              Who we are
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-600 sm:text-lg">
              <p>
                {companyInfo.name} is an independent app studio founded in {companyInfo.founded}. We
                design, build and publish our own catalog of Android apps, from{' '}
                <Link href="/apps/category/action-arcade/" className="link-accent">
                  arcade games
                </Link>{' '}
                and{' '}
                <Link href="/apps/category/sports-gm/" className="link-accent">
                  sports simulations
                </Link>{' '}
                to{' '}
                <Link href="/apps/category/education-brain/" className="link-accent">
                  history and mental-math apps
                </Link>
                ,{' '}
                <Link href="/apps/category/language-learning/" className="link-accent">
                  language courses
                </Link>{' '}
                and{' '}
                <Link href="/apps/category/health-nutrition/" className="link-accent">
                  nutrition trackers
                </Link>
                .
              </p>
              <p>
                <strong className="text-ink-950">Two names, one company.</strong> {companyInfo.name}{' '}
                is our legal name. On Google Play our apps are published under the developer name{' '}
                <strong className="text-ink-950">{companyInfo.developerName}</strong>. They are the
                same company, and {companyInfo.domain} is its official website. Every one of our
                Google Play listings links here, if only for the privacy policy.
              </p>
              <p>
                Every app is free to download. Some show ads or offer optional in-app purchases; each
                app page says which, copied from the live Google Play listing rather than written from
                memory.
              </p>
              <p>
                Being independent shapes how we work. There&apos;s no committee deciding what ships,
                and when you{' '}
                <Link href="/support/" className="link-accent">
                  email support
                </Link>
                , the people who made the app are the ones reading it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="card-premium h-fit p-7 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink-950">Company facts</h3>
              <dl className="mt-5 space-y-4">
                {facts.map((fact, i) => (
                  <div
                    key={fact.term}
                    className={`grid gap-1 ${i < facts.length - 1 ? 'border-b border-ink-100 pb-4' : ''}`}
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{fact.term}</dt>
                    <dd className="text-sm font-medium text-ink-950">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we make */}
      <section className="section-padding !pt-0" aria-labelledby="make-heading">
        <div className="container-wide mx-auto">
          <Reveal>
            <h2 id="make-heading" className={h2}>
              What we make
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
              {appCount} apps on Google Play, in {activeCategories.length} categories. Each category
              page lists its apps; each app page has the store details and the guides we have written
              for it.
            </p>
          </Reveal>
          <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {activeCategories.map((category, i) => (
              <li key={category.id} className="h-full">
                <Reveal delay={i * 60} className="h-full">
                  <Link
                    href={`/apps/category/${category.id}/`}
                    className="card-premium-hover group flex h-full flex-col p-6"
                  >
                    <span className="font-display text-lg font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                      {category.label}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{category.blurb}</span>
                    <span className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-gold-600">
                      {countByCategory(category.id)} {countByCategory(category.id) === 1 ? 'app' : 'apps'}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-8">
            <Link href="/apps/" className="link-accent text-sm">
              Browse the full app catalog →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Principles timeline */}
      <section className="section-padding bg-cream-100" aria-labelledby="principles-heading">
        <div className="container-narrow mx-auto">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How we build apps</p>
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

      {/* Articles, facts, AI, corrections, comparisons */}
      <section className="section-padding" aria-labelledby="articles-heading">
        <div className="container-narrow mx-auto space-y-14 text-base leading-relaxed text-ink-600">
          <Reveal>
            <h2 id="articles-heading" className={h2}>
              Our articles and how they relate to our apps
            </h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6">
              We publish guides and explainers on the subjects our apps deal with — world history,
              mental arithmetic, language learning, nutrition tracking, sports management and more.
              There are {postCount} of them on the{' '}
              <Link href="/blog/" className="link-accent">
                blog
              </Link>
              , organised into {hubCount} topic hubs and {activeCategories.length} categories.
            </p>
            <p className="mt-4">
              The articles link to our apps, and we make those apps, so we have a commercial interest
              in you installing them. Every article says so near the top. They are published under the
              byline {author?.name ?? companyInfo.name};{' '}
              {author ? (
                <Link href={authorPath(author)} className="link-accent">
                  the author page
                </Link>
              ) : (
                'the author page'
              )}{' '}
              explains who that is and how the articles are made.
            </p>
          </Reveal>

          <Reveal>
            <h2 className={h2}>How we check facts</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6">
              Store details on this site — price, content rating, ads and in-app purchases — are copied
              from each app&apos;s live Google Play listing, and each app page shows the date it was
              last checked. The most recent check across the catalog was{' '}
              <time dateTime={lastVerified}>{formatPostDate(lastVerified)}</time>. Google Play is the
              source of truth when the two disagree.
            </p>
            <p className="mt-4">
              Articles list the sources their factual claims rely on, with the date each was accessed.
              History articles separate what is documented from what historians interpret. Health
              articles cite public-health and government sources and are general information, not
              medical advice. Language articles note where usage varies and say when no native speaker
              has reviewed them.
            </p>
          </Reveal>

          <Reveal>
            <h2 className={h2}>How AI is used</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6">
              We use AI tools to help research, draft and edit our articles. Automated checks run
              before anything is published, and every article published after {gateDate} is read in
              full and approved by a person before release. Articles published before then passed the
              automated checks, but not every one was read in full by a person. No article has been
              reviewed by an independent expert unless the reviewer is named on it. The{' '}
              <Link href="/editorial-policy/#ai" className="link-accent">
                editorial policy
              </Link>{' '}
              has the details.
            </p>
          </Reveal>

          <Reveal>
            <h2 className={h2}>Corrections</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6">
              If something on this site is wrong, email{' '}
              <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all">
                {companyInfo.supportEmail}
              </a>
              . Confirmed errors are fixed, and a correction that changes what an article says is
              listed on that article with its date. How that works is set out under{' '}
              <Link href="/editorial-policy/#corrections" className="link-accent">
                corrections
              </Link>{' '}
              in the editorial policy.
            </p>
          </Reveal>

          <Reveal>
            <h2 className={h2}>Comparisons with other apps</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6">
              When an article compares one of our apps with another company&apos;s, it says that we
              publish ours, checks every claim about the other product against that company&apos;s
              own current material, prints the date of that research, and says so when the other app
              is the better fit. We do not use other companies&apos; logos or screenshots.
            </p>
          </Reveal>

          <Reveal>
            <h2 className={h2}>Contact and support</h2>
            <GoldDivider className="mt-5" />
            <ul className="ml-5 mt-6 list-disc space-y-2">
              <li>
                <Link href="/support/" className="link-accent">
                  Support
                </Link>{' '}
                — help with an app, bug reports, and reporting an error on this site
              </li>
              <li>
                <Link href="/app-support/" className="link-accent">
                  Developer information
                </Link>{' '}
                — company and store details for app-store review
              </li>
              <li>
                <Link href="/press/" className="link-accent">
                  Press kit
                </Link>{' '}
                — company facts, approved icons and boilerplate
              </li>
              <li>
                <Link href="/editorial-policy/" className="link-accent">
                  Editorial policy
                </Link>{' '}
                — how articles are researched, checked and corrected
              </li>
              <li>
                <Link href="/privacy/" className="link-accent">
                  Privacy policy
                </Link>{' '}
                — what our apps and this site collect
              </li>
            </ul>
          </Reveal>
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
              {appCount} published apps across games, learning, languages, and fitness — all free on
              Google Play.
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
