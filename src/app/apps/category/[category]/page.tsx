import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppCard from '@/components/AppCard';
import GooglePlayButton from '@/components/GooglePlayButton';
import GoldDivider from '@/components/GoldDivider';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import {
  activeCategories,
  companyInfo,
  getAppsByCategory,
  getCategory,
  type CategoryId,
} from '@/data/apps';

export const dynamicParams = false;

export function generateStaticParams() {
  return activeCategories.map((category) => ({ category: category.id }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category as CategoryId);
  if (!category) return {};

  const canonical = `/apps/category/${category.id}/`;
  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${category.metaTitle} | ${companyInfo.name}`,
      description: category.metaDescription,
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'website',
      images: [
        {
          url: `${companyInfo.siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${category.label} from ${companyInfo.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.metaTitle} | ${companyInfo.name}`,
      description: category.metaDescription,
    },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category as CategoryId);
  if (!category) notFound();

  const categoryApps = getAppsByCategory(category.id);
  const siblings = activeCategories.filter((c) => c.id !== category.id);

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.label,
    url: `${companyInfo.siteUrl}/apps/category/${category.id}/`,
    description: category.metaDescription,
    isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categoryApps.length,
      itemListElement: categoryApps.map((app, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${companyInfo.siteUrl}/apps/${app.slug}/`,
        name: app.name,
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
              { label: 'Apps', href: '/apps/' },
              { label: category.shortLabel },
            ]}
          />

          <div className="hero-stagger mt-10 max-w-3xl">
            <p className="eyebrow">
              {categoryApps.length} {categoryApps.length === 1 ? 'app' : 'apps'} on Google Play
            </p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
              {category.label}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">{category.blurb}</p>
          </div>
        </div>
      </section>

      <section className="section-padding !pt-4" aria-labelledby="category-apps-heading">
        <div className="container-wide mx-auto">
          <h2 id="category-apps-heading" className="sr-only">
            {category.label} from {companyInfo.name}
          </h2>
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {categoryApps.map((app, i) => (
              <li key={app.slug} className="h-full">
                <Reveal delay={i * 70} className="h-full">
                  <AppCard app={app} eager={i < 3} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-cream-100 !py-16" aria-labelledby="category-intro-heading">
        <div className="container-narrow mx-auto">
          <Reveal>
            <p className="eyebrow">About this category</p>
            <h2 id="category-intro-heading" className="display-title mt-4 text-3xl sm:text-4xl">
              Why we build {category.shortLabel.toLowerCase()} apps
            </h2>
            <div className="mt-7 space-y-5">
              {category.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-ink-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="other-categories-heading">
        <div className="container-wide mx-auto">
          <Reveal>
            <p className="eyebrow">Keep browsing</p>
            <h2 id="other-categories-heading" className="display-title mt-4 text-3xl sm:text-4xl">
              Other categories
            </h2>
          </Reveal>

          <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling, i) => (
              <li key={sibling.id}>
                <Reveal delay={i * 60}>
                  <Link
                    href={`/apps/category/${sibling.id}/`}
                    className="card-premium-hover group flex h-full items-center justify-between gap-4 p-6"
                  >
                    <span>
                      <span className="font-display text-lg font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                        {sibling.label}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-500">
                        {sibling.blurb}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-400 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-50 group-hover:text-gold-700"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <GoldDivider className="mt-20" />

          <Reveal className="mt-12 text-center">
            <h2 className="display-title text-2xl sm:text-3xl">Browse the whole catalog</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
              Every {companyInfo.name} app is free to download on Google Play, published under{' '}
              {companyInfo.developerName}.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link href="/apps/" className="btn-primary">
                All apps
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
