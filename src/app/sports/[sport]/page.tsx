import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqSection from '@/components/FaqSection';
import GoldDivider from '@/components/GoldDivider';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import BlogCard from '@/components/blog/BlogCard';
import SportAppCard from '@/components/sports/SportAppCard';
import ToolCard from '@/components/tools/ToolCard';
import { companyInfo } from '@/data/apps';
import { fillAppNames, getSport, getSportApps, getSportExtraApps, sportPath, type SportInfo } from '@/data/sports';
import { toolsForSport } from '@/tools/registry';
import { getPostBySlug } from '@/lib/blog';
import { activeSports, getSportPosts, groupGuides, hubPostList } from '@/lib/sports';

export const dynamicParams = false;

/** Only sports with published guides get a hub, so no empty page ships. */
export function generateStaticParams() {
  return activeSports().map((sport) => ({ sport: sport.id }));
}

export function generateMetadata({ params }: { params: { sport: string } }): Metadata {
  const sport = getSport(params.sport);
  if (!sport) return {};
  const canonical = sportPath(sport);
  return {
    title: { absolute: sport.metaTitle },
    description: sport.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${sport.metaTitle} | ${companyInfo.name}`,
      description: sport.metaDescription,
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'website',
      images: [
        {
          url: `${companyInfo.siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${sport.label} guides from ${companyInfo.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${sport.metaTitle} | ${companyInfo.name}`,
      description: sport.metaDescription,
    },
  };
}

function relatedSports(sport: SportInfo) {
  const active = new Set(activeSports().map((s) => s.id));
  return sport.relatedSports.map((id) => getSport(id)!).filter((s) => active.has(s.id));
}

export default function SportHubPage({ params }: { params: { sport: string } }) {
  const sport = getSport(params.sport);
  if (!sport) notFound();

  const { own, general, related } = getSportPosts(sport);
  if (own.length + general.length === 0) notFound();

  const cornerstone = getPostBySlug(sport.cornerstone)!;
  const groups = groupGuides(own.filter((post) => post.slug !== cornerstone.slug));
  const sportTools = toolsForSport(sport.id);
  const listed = hubPostList(sport);
  const apps = getSportApps(sport);
  const appCards = [
    apps.draft && { app: apps.draft, role: 'Draft & GM game' },
    apps.career && { app: apps.career, role: 'Career sim' },
    ...getSportExtraApps(sport),
  ].filter((card): card is NonNullable<typeof card> => Boolean(card));
  const fill = (text: string) => fillAppNames(text, sport);
  const faqs = sport.faqs.map((faq) => ({ question: fill(faq.question), answer: fill(faq.answer) }));
  const url = `${companyInfo.siteUrl}${sportPath(sport)}`;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#page`,
    name: sport.heading,
    description: sport.metaDescription,
    url,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
    publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: listed.length,
      itemListElement: listed.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${companyInfo.siteUrl}/blog/${post.slug}/`,
        name: post.title,
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

  const cardGrid = 'mt-6 grid list-none gap-6 p-0 sm:grid-cols-2';

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
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Sports', href: '/sports/' },
              { label: sport.shortLabel },
            ]}
          />
          <div className="hero-stagger mt-10 max-w-3xl">
            <p className="eyebrow">
              Sport hub · {listed.length} {listed.length === 1 ? 'guide' : 'guides'}
              {sportTools.length > 0 && ` · ${sportTools.length} ${sportTools.length === 1 ? 'calculator' : 'calculators'}`}
            </p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">{sport.heading}</h1>
            {sport.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-6 text-lg leading-relaxed text-ink-500">
                {fill(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding !pt-4" aria-label={`${sport.label} guides, apps and calculators`}>
        <div className="container-wide mx-auto">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),19rem] lg:gap-14">
            <div className="min-w-0">
              <h2 className="display-title text-2xl">
                Our {sport.noun} {appCards.length === 1 ? 'app' : 'apps'}
              </h2>
              <ul className={cardGrid}>
                {appCards.map(({ app, role }) => (
                  <li key={app.slug} className="h-full">
                    <SportAppCard app={app} role={role} referrerSlug={`sport-${sport.id}`} />
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-ink-600">{fill(sport.appsRelation)}</p>

              <h2 className="display-title mt-14 text-2xl">Where to start</h2>
              <ul className="mt-6 grid list-none gap-4 p-0">
                {sport.orientation.map((step) => (
                  <li key={step.title} className="rounded-2xl border border-ink-200 bg-cream-100 p-5 sm:p-6">
                    <h3 className="font-display text-base font-semibold text-ink-950">{fill(step.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{fill(step.body)}</p>
                  </li>
                ))}
              </ul>

              <h2 className="display-title mt-14 text-2xl">Start here</h2>
              <div className="mt-6">
                <BlogCard post={cornerstone} headingLevel="h3" />
              </div>

              {groups.map((group) => (
                <section key={group.id} aria-labelledby={`group-${group.id}`} className="mt-14">
                  <h2 id={`group-${group.id}`} className="display-title text-2xl">
                    {group.title}
                  </h2>
                  <ul className={cardGrid}>
                    {group.posts.map((post, i) => (
                      <li key={post.slug} className="h-full">
                        <Reveal delay={Math.min(i, 6) * 60} className="h-full">
                          <BlogCard post={post} headingLevel="h3" />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              {general.length > 0 && (
                <section aria-labelledby="group-general" className="mt-14">
                  <h2 id="group-general" className="display-title text-2xl">
                    Guides for any sport
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    These use our {sport.noun} {appCards.length === 1 ? 'app' : 'apps'} as the example, but the ideas
                    apply to every sport. More are collected on the{' '}
                    <Link href="/sports/" className="link-accent">
                      sports index
                    </Link>
                    .
                  </p>
                  <ul className={cardGrid}>
                    {general.map((post) => (
                      <li key={post.slug} className="h-full">
                        <BlogCard post={post} headingLevel="h3" />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {related.length > 0 && (
                <section aria-labelledby="group-related" className="mt-14">
                  <h2 id="group-related" className="display-title text-2xl">
                    Also relevant
                  </h2>
                  <ul className={cardGrid}>
                    {related.map((post) => (
                      <li key={post.slug} className="h-full">
                        <BlogCard post={post} headingLevel="h3" />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {sportTools.length > 0 && (
                <section aria-labelledby="group-tools" className="mt-14">
                  <h2 id="group-tools" className="display-title text-2xl">
                    Calculators
                  </h2>
                  <ul className={cardGrid}>
                    {sportTools.map((tool) => (
                      <li key={tool.id} className="h-full">
                        <ToolCard tool={tool} label={tool.sport === 'multi-sport' ? 'Any sport' : undefined} />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="mt-16">
                <FaqSection faqs={faqs} title={`${sport.label}: common questions`} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="Related sports">
                <h2 className="eyebrow">Related sports</h2>
                <ul className="mt-5 flex list-none flex-col gap-2 p-0">
                  {relatedSports(sport).map((sibling) => (
                    <li key={sibling.id}>
                      <Link
                        href={sportPath(sibling)}
                        className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-600 transition-all duration-300 hover:border-gold-400 hover:text-ink-950"
                      >
                        {sibling.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 rounded-2xl border border-ink-200 bg-cream-100 p-5 text-xs leading-relaxed text-ink-500">
                <p>
                  {companyInfo.name} makes the apps on this page, so we have a commercial interest in them. They are
                  not affiliated with, or endorsed by, any league, team, players’ association or athlete.
                </p>
                <p className="mt-3">
                  App details come from each app’s Google Play listing. This hub’s copy was written with AI assistance
                  and has not been reviewed by a person.{' '}
                  <Link href="/editorial-policy/" className="link-accent">
                    Editorial policy
                  </Link>
                </p>
              </div>
            </aside>
          </div>

          <GoldDivider className="mt-20" />

          <nav aria-label="All sports" className="mt-12">
            <h2 className="eyebrow">All sports</h2>
            <ul className="mt-5 flex list-none flex-wrap gap-3 p-0">
              {activeSports()
                .filter((s) => s.id !== sport.id)
                .map((sibling) => (
                  <li key={sibling.id}>
                    <Link
                      href={sportPath(sibling)}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-ink-950"
                    >
                      {sibling.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/sports/" className="btn-outline">
              Sports index
            </Link>
            <Link href="/tools/" className="btn-outline">
              Sports calculators
            </Link>
            <Link href="/apps/category/sports-gm/" className="btn-outline">
              All sports apps
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
