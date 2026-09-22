import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoldDivider from '@/components/GoldDivider';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import ArticleAppCta from '@/components/blog/ArticleAppCta';
import BlogCard from '@/components/blog/BlogCard';
import { companyInfo, getAppBySlug } from '@/data/apps';
import { getHub, hubs } from '@/data/hubs';
import { activeHubs, getPostsByHub } from '@/lib/blog';

export const dynamicParams = false;

/** Only hubs holding a published article get a page, so no empty listing ships. */
export function generateStaticParams() {
  return activeHubs().map((hub) => ({ hub: hub.id }));
}

export function generateMetadata({ params }: { params: { hub: string } }): Metadata {
  const hub = getHub(params.hub);
  if (!hub) return {};

  const canonical = `/blog/topics/${hub.id}/`;
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${hub.metaTitle} | ${companyInfo.name}`,
      description: hub.metaDescription,
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'website',
      images: [
        {
          url: `${companyInfo.siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${hub.label} guides from ${companyInfo.name}`,
        },
      ],
    },
  };
}

export default function BlogHubPage({ params }: { params: { hub: string } }) {
  const hub = getHub(params.hub);
  if (!hub) notFound();

  const hubPosts = getPostsByHub(hub.id);
  if (hubPosts.length === 0) notFound();

  const app = getAppBySlug(hub.appSlug);
  const cornerstone = hubPosts.find((post) => post.slug === hub.cornerstone);
  const rest = hubPosts.filter((post) => post.slug !== hub.cornerstone);
  const related = hub.relatedHubs
    .map((id) => hubs.find((h) => h.id === id))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .map((h) => ({ ...h, count: getPostsByHub(h.id).length }))
    .filter((h) => h.count > 0);

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.label,
    description: hub.metaDescription,
    url: `${companyInfo.siteUrl}/blog/topics/${hub.id}/`,
    isPartOf: { '@id': `${companyInfo.siteUrl}/blog/#blog` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: hubPosts.length,
      itemListElement: hubPosts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${companyInfo.siteUrl}/blog/${post.slug}/`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={listSchema} />

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
              { label: 'Blog', href: '/blog/' },
              { label: hub.shortLabel },
            ]}
          />

          <div className="hero-stagger mt-10 max-w-3xl">
            <p className="eyebrow">
              Topic hub · {hubPosts.length} {hubPosts.length === 1 ? 'article' : 'articles'}
            </p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
              {hub.label}
            </h1>
            {/* Standing editorial copy, written for this hub. A listing page that
                only lists is a thin page; the argument for why the subject is
                worth reading about is the part a card grid cannot carry. */}
            {hub.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-6 text-lg leading-relaxed text-ink-500">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding !pt-4" aria-label={`${hub.label} guides`}>
        <div className="container-wide mx-auto">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),19rem] lg:gap-14">
            <div className="min-w-0">
              <h2 className="display-title text-2xl">Where to start</h2>
              <ul className="mt-6 grid list-none gap-4 p-0">
                {hub.orientation.map((step) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-ink-200 bg-cream-100 p-5 sm:p-6"
                  >
                    <h3 className="font-display text-base font-semibold text-ink-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
                  </li>
                ))}
              </ul>

              {cornerstone && (
                <>
                  <h2 className="display-title mt-14 text-2xl">Start here</h2>
                  <div className="mt-6">
                    <BlogCard post={cornerstone} headingLevel="h3" />
                  </div>
                </>
              )}

              <h2 className="display-title mt-14 text-2xl">
                {cornerstone ? 'Everything else in this hub' : 'Articles in this hub'}
              </h2>
              <ul className="mt-6 grid list-none gap-6 p-0 sm:grid-cols-2">
                {rest.map((post, i) => (
                  <li key={post.slug} className="h-full">
                    <Reveal delay={Math.min(i, 8) * 60} className="h-full">
                      <BlogCard post={post} headingLevel="h3" />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              {app && (
                <ArticleAppCta
                  app={app}
                  articleSlug={`hub-${hub.id}`}
                  buttonLocation="article_top"
                  heading={`The app behind this hub`}
                  compact
                />
              )}

              <nav aria-label="Related topic hubs" className="mt-8">
                <h2 className="eyebrow">Related hubs</h2>
                <ul className="mt-5 flex list-none flex-col gap-2 p-0">
                  {related.map((sibling) => (
                    <li key={sibling.id}>
                      <Link
                        href={`/blog/topics/${sibling.id}/`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-600 transition-all duration-300 hover:border-gold-400 hover:text-ink-950"
                      >
                        {sibling.label}
                        <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink-500">
                          {sibling.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <p className="mt-6 text-xs leading-relaxed text-ink-400">
                {app
                  ? `${app.name} is built by ${companyInfo.name}. These guides are useful on their own; the app is one way to practise what they cover.`
                  : `Published by ${companyInfo.name}.`}
              </p>
            </aside>
          </div>

          <GoldDivider className="mt-20" />

          <nav aria-label="All topic hubs" className="mt-12">
            <h2 className="eyebrow">All topic hubs</h2>
            <ul className="mt-5 flex list-none flex-wrap gap-3 p-0">
              {activeHubs()
                .filter((h) => h.id !== hub.id)
                .map((sibling) => (
                  <li key={sibling.id}>
                    <Link
                      href={`/blog/topics/${sibling.id}/`}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-ink-950"
                    >
                      {sibling.label}
                      <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink-500">
                        {sibling.count}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href={`/blog/category/${hub.categoryId}/`} className="btn-outline">
              {hub.shortLabel} category
            </Link>
            <Link href="/blog/" className="btn-outline">
              All articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
