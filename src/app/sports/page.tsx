import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import BlogCard from '@/components/blog/BlogCard';
import { apps, companyInfo } from '@/data/apps';
import { getSportApps, getSportExtraApps, getSportForApp, sportPath, sportsIndexCopy } from '@/data/sports';
import { toolPath, tools, toolsForSport } from '@/tools/registry';
import { activeSports, getCrossSportPosts, hubPostList } from '@/lib/sports';

const canonical = '/sports/';

export const metadata: Metadata = {
  title: { absolute: sportsIndexCopy.metaTitle },
  description: sportsIndexCopy.metaDescription,
  alternates: { canonical },
  openGraph: {
    title: `${sportsIndexCopy.metaTitle} | ${companyInfo.name}`,
    description: sportsIndexCopy.metaDescription,
    url: `${companyInfo.siteUrl}${canonical}`,
    type: 'website',
    images: [
      {
        url: `${companyInfo.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `Sports guides and calculators from ${companyInfo.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${sportsIndexCopy.metaTitle} | ${companyInfo.name}`,
    description: sportsIndexCopy.metaDescription,
  },
};

export default function SportsIndexPage() {
  const hubs = activeSports();
  const crossSport = getCrossSportPosts();
  const url = `${companyInfo.siteUrl}${canonical}`;
  // Sports apps whose sport has no hub yet (motorsport, for example). Read from
  // the catalog, so an app appears here the day it is catalogued.
  const otherSportApps = apps.filter((app) => app.categoryId === 'sports-gm' && !getSportForApp(app.slug));

  // Computed from the data rather than written into the copy, so the answer
  // changes the day a sport gains or loses an app.
  const both = hubs.filter((sport) => sport.apps.draft && sport.apps.career).map((sport) => sport.noun);
  const listJoin = (items: string[]) =>
    items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
  const faqs = [
    ...sportsIndexCopy.faqs,
    {
      question: 'Which sports have both a draft game and a career sim?',
      answer: `${listJoin(both).replace(/^./, (c) => c.toUpperCase())}. The other hubs have one app each; every hub says which, and what it covers.`,
    },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#page`,
    name: sportsIndexCopy.heading,
    description: sportsIndexCopy.metaDescription,
    url,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
    publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: hubs.length,
      itemListElement: hubs.map((sport, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${companyInfo.siteUrl}${sportPath(sport)}`,
        name: sport.heading,
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />

      <section className="relative overflow-hidden bg-white pb-12 pt-32 sm:pt-40">
        <div className="hero-streaks opacity-60" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_30%_20%,black,transparent)]"
        />
        <div className="container-wide relative mx-auto px-5 sm:px-8 lg:px-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sports' }]} />
          <div className="hero-stagger mt-10 max-w-3xl">
            <p className="eyebrow">
              Sports · {hubs.length} hubs · {tools.length} calculators
            </p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
              {sportsIndexCopy.heading}
            </h1>
            {sportsIndexCopy.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-6 text-lg leading-relaxed text-ink-500">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding !pt-4">
        <div className="container-wide mx-auto">
          <h2 id="choose-sport-heading" className="display-title text-2xl sm:text-3xl">
            Choose a sport
          </h2>
          <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((sport, i) => {
              const apps = getSportApps(sport);
              const guides = hubPostList(sport).length;
              const calculators = toolsForSport(sport.id).length;
              return (
                <li key={sport.id} className="h-full">
                  <Reveal delay={Math.min(i, 8) * 50} className="h-full">
                    <article className="card-premium-hover group flex h-full flex-col p-6">
                      <h3 className="font-display text-xl font-semibold text-ink-950">
                        <Link href={sportPath(sport)} className="transition-colors hover:text-crimson-600">
                          {sport.label}
                        </Link>
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{sport.blurb}</p>
                      <p className="mt-4 text-xs leading-relaxed text-ink-400">
                        {guides} {guides === 1 ? 'guide' : 'guides'}
                        {calculators > 0 && ` · ${calculators} ${calculators === 1 ? 'calculator' : 'calculators'}`}
                        {' · '}
                        {[apps.draft?.name, apps.career?.name, ...getSportExtraApps(sport).map((extra) => extra.app.name)]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr),minmax(0,1.1fr)] lg:gap-14">
            <div>
              <h2 className="display-title text-2xl sm:text-3xl">Draft games and career sims</h2>
              {sportsIndexCopy.formats.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-5 leading-relaxed text-ink-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="overflow-x-auto rounded-2xl border border-ink-200">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="caption-top px-4 pb-2 pt-4 text-left text-sm font-medium text-ink-700">
                  Our apps by sport and by kind of game
                </caption>
                <thead>
                  <tr className="border-b border-ink-300 bg-cream-100 text-xs uppercase tracking-[0.08em] text-ink-500">
                    <th scope="col" className="px-4 py-2.5 font-semibold">
                      Sport
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">
                      Draft &amp; GM game
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">
                      Career sim
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hubs.map((sport) => {
                    const apps = getSportApps(sport);
                    return (
                      <tr key={sport.id} className="border-b border-ink-200 last:border-0">
                        <th scope="row" className="px-4 py-2.5 font-medium text-ink-800">
                          <Link href={sportPath(sport)} className="link-accent">
                            {sport.shortLabel}
                          </Link>
                        </th>
                        <td className="px-4 py-2.5 text-ink-700">
                          {apps.draft ? (
                            <Link href={`/apps/${apps.draft.slug}/`} className="link-accent">
                              {apps.draft.name}
                            </Link>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-ink-700">
                          {apps.career ? (
                            <Link href={`/apps/${apps.career.slug}/`} className="link-accent">
                              {apps.career.name}
                            </Link>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {otherSportApps.length > 0 && (
            <section aria-labelledby="other-sports-heading" className="mt-16">
              <h2 id="other-sports-heading" className="display-title text-2xl">
                Other sports
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-ink-600">
                We also make games for sports that do not have a hub here yet:
              </p>
              <ul className="mt-4 ml-5 list-disc space-y-2 text-ink-600">
                {otherSportApps.map((app) => (
                  <li key={app.slug}>
                    <Link href={`/apps/${app.slug}/`} className="link-accent">
                      {app.name}
                    </Link>{' '}
                    — {app.tagline}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {crossSport.length > 0 && (
            <section aria-labelledby="cross-sport-heading" className="mt-20">
              <h2 id="cross-sport-heading" className="display-title text-2xl sm:text-3xl">
                Guides for every sport
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink-600">
                Salary caps, draft formats, free agency, career modes and how simulators turn ratings into results
                work the same way whichever sport you follow. Each of these uses one of our apps as its example.
              </p>
              <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {crossSport.map((post) => (
                  <li key={post.slug} className="h-full">
                    <BlogCard post={post} headingLevel="h3" />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="calculators-heading" className="mt-20">
            <h2 id="calculators-heading" className="display-title text-2xl sm:text-3xl">
              Calculators
            </h2>
            {/* Names only. The descriptions live on /tools/, the calculators'
                own index; repeating all of them here made /tools/ a near-total
                subset of this page (Search Console grouped the two as
                duplicates in October 2026). */}
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-600">
              Work out the statistics the guides explain. Every calculator cites where its formula comes from, and{' '}
              <Link href="/tools/" className="link-accent">
                the calculators index
              </Link>{' '}
              describes what each one measures and helps you pick the right one.
            </p>
            <ul className="mt-8 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <Link href={toolPath(tool)} className="link-accent text-sm">
                    {tool.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-20 max-w-4xl">
            <FaqSection faqs={faqs} title="Questions about this section" />
          </div>

          <p className="mt-12 max-w-3xl text-xs leading-relaxed text-ink-400">
            {companyInfo.name} makes the apps named here, so we have a commercial interest in them. App details come from
            each app’s Google Play listing; the copy in this section was written with AI assistance and has not been
            reviewed by a person. See the{' '}
            <Link href="/editorial-policy/" className="link-accent">
              editorial policy
            </Link>
            .
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/apps/category/sports-gm/" className="btn-outline">
              All sports apps
            </Link>
            <Link href="/blog/category/sports-gm/" className="btn-outline">
              Every sports article
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
