import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqSection from '@/components/FaqSection';
import RelatedApps from '@/components/RelatedApps';
import GooglePlayButton from '@/components/GooglePlayButton';
import GoldDivider from '@/components/GoldDivider';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import BlogCard from '@/components/blog/BlogCard';
import { apps, companyInfo, getAppBySlug, getRelatedApps, getCategory } from '@/data/apps';
import { getPostsByApp } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const app = getAppBySlug(params.slug);
  if (!app) return {};

  const canonical = `/apps/${app.slug}/`;
  return {
    title: app.metaTitle,
    description: app.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${app.metaTitle} | ${companyInfo.name}`,
      description: app.metaDescription,
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'website',
      images: [
        {
          url: `${companyInfo.siteUrl}${app.icon}`,
          width: 512,
          height: 512,
          alt: `${app.name} app icon`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${app.metaTitle} | ${companyInfo.name}`,
      description: app.metaDescription,
      images: [`${companyInfo.siteUrl}${app.icon}`],
    },
  };
}

export default function AppPage({ params }: { params: { slug: string } }) {
  const app = getAppBySlug(params.slug);
  if (!app) notFound();

  const related = getRelatedApps(app);
  const category = getCategory(app.categoryId);
  const categoryPath = `/apps/category/${app.categoryId}/`;
  const guides = getPostsByApp(app.slug).slice(0, 3);

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    description: app.metaDescription,
    url: `${companyInfo.siteUrl}/apps/${app.slug}/`,
    installUrl: app.playStoreUrl,
    operatingSystem: 'Android',
    applicationCategory: app.schemaCategory,
    image: `${companyInfo.siteUrl}${app.icon}`,
    // Only free apps get an Offer. A price we have not verified is worse than
    // no price at all, and the visible "Price" row reads from the same field.
    ...(app.free
      ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
      : {}),
    publisher: {
      '@id': `${companyInfo.siteUrl}/#organization`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: app.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pb-16 pt-32 sm:pt-40">
        <div className="hero-streaks opacity-60" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,black,transparent)]"
        />

        <div className="container-wide relative mx-auto px-5 sm:px-8 lg:px-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Apps', href: '/apps/' },
              ...(category ? [{ label: category.shortLabel, href: categoryPath }] : []),
              { label: app.name },
            ]}
          />

          <div className="hero-stagger mt-12 flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-14">
            <div className="relative shrink-0">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-full bg-gold-300/30 blur-3xl"
              />
              <div
                aria-hidden="true"
                className={`absolute -inset-2.5 rounded-[2.6rem] bg-gradient-to-br ${app.accent} opacity-25`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.icon}
                alt={`${app.name} app icon`}
                width={168}
                height={168}
                fetchPriority="high"
                decoding="async"
                className="animate-float-slow relative h-36 w-36 rounded-[2rem] shadow-icon-tile ring-1 ring-ink-950/10 md:h-[168px] md:w-[168px]"
              />
            </div>

            <div className="max-w-2xl">
              <Link href={categoryPath} className="pill transition-colors hover:border-gold-400 hover:text-ink-950">
                {app.category}
              </Link>
              <h1 className="display-title mt-4 text-balance text-4xl leading-[1.08] sm:text-5xl">
                {app.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-500">{app.tagline}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <GooglePlayButton
                  href={app.playStoreUrl}
                  buttonLocation="hero"
                  appName={app.name}
                  label="Get it on Google Play"
                />
                <Link href="/apps/" className="link-accent text-sm">
                  ← Back to all apps
                </Link>
              </div>

              <p className="mt-6 flex items-center gap-2.5 text-sm text-ink-400">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                Free to download · Published by {companyInfo.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding !pt-10" aria-labelledby="about-app-heading">
        <div className="container-wide mx-auto grid gap-14 lg:grid-cols-[1.5fr,1fr]">
          <Reveal>
            <p className="eyebrow">About this app</p>
            <h2 id="about-app-heading" className="display-title mt-4 text-3xl sm:text-4xl">
              What to expect
            </h2>
            <div className="mt-7 space-y-5">
              {app.longDescription.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-ink-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="card-premium h-fit p-7 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink-950">At a glance</h3>
              <dl className="mt-5 space-y-4">
                {[
                  {
                    term: 'Category',
                    detail: category ? (
                      <Link href={categoryPath} className="link-accent">
                        {app.category}
                      </Link>
                    ) : (
                      app.category
                    ),
                  },
                  { term: 'Platform', detail: 'Android' },
                  { term: 'Price', detail: app.free ? 'Free to download' : 'Paid' },
                  { term: 'Content rating', detail: app.contentRating },
                  { term: 'Contains ads', detail: app.containsAds ? 'Yes' : 'No' },
                  { term: 'In-app purchases', detail: app.inAppPurchases ? 'Yes' : 'No' },
                  { term: 'Developer', detail: companyInfo.name },
                ].map((row, i, rows) => (
                  <div
                    key={row.term}
                    className={`flex items-center justify-between gap-4 ${
                      i < rows.length - 1 ? 'border-b border-ink-100 pb-4' : ''
                    }`}
                  >
                    <dt className="text-sm text-ink-500">{row.term}</dt>
                    <dd className="text-right text-sm font-semibold text-ink-950">{row.detail}</dd>
                  </div>
                ))}
              </dl>
              <GooglePlayButton
                href={app.playStoreUrl}
                buttonLocation="article_middle"
                appName={app.name}
                label="View on Google Play"
                variant="outline"
                small
                className="mt-7 w-full"
              />
              <p className="mt-4 text-xs leading-relaxed text-ink-400">
                Store details checked against the live Google Play listing on{' '}
                <time dateTime={app.lastVerified}>
                  {new Date(`${app.lastVerified}T00:00:00Z`).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}
                </time>
                . Google Play is the source of truth.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-cream-100" aria-labelledby="features-heading">
        <div className="container-wide mx-auto">
          <Reveal>
            <p className="eyebrow">Key features</p>
            <h2 id="features-heading" className="display-title mt-4 text-3xl sm:text-4xl">
              Why you&apos;ll keep coming back
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 70} className="h-full">
                <div className="card-premium-hover h-full p-7">
                  <span className="font-display text-sm font-semibold tracking-widest text-gold-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    aria-hidden="true"
                    className="mt-3 h-px w-10 bg-gradient-to-r from-gold-500 to-transparent"
                  />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" aria-label={`${app.name} frequently asked questions`}>
        <div className="container-narrow mx-auto">
          <FaqSection faqs={app.faqs} title={`${app.name} — FAQs`} />
          <p className="mt-8 text-sm text-ink-500">
            Have a different question?{' '}
            <Link href="/support/" className="link-accent">
              Contact our support team
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Guides */}
      {guides.length > 0 && (
        <section className="section-padding !pt-0" aria-labelledby="app-guides-heading">
          <div className="container-wide mx-auto">
            <GoldDivider className="mb-16" />
            <h2 id="app-guides-heading" className="display-title text-2xl sm:text-3xl">
              Guides for {app.name}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-500">
              Written by the team that builds the app.
            </p>
            <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((post, i) => (
                <li key={post.slug} className="h-full">
                  <Reveal delay={i * 60} className="h-full">
                    <BlogCard post={post} headingLevel="h3" />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="bg-ink-panel relative overflow-hidden" aria-labelledby="get-app-heading">
        <div
          aria-hidden="true"
          className="bg-dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_50%_80%_at_50%_50%,black,transparent)]"
        />
        <div className="container-narrow relative mx-auto px-5 py-20 text-center sm:px-8 md:py-24">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app.iconSmall}
              alt=""
              aria-hidden="true"
              width={72}
              height={72}
              loading="lazy"
              decoding="async"
              className="mx-auto h-[72px] w-[72px] rounded-2xl shadow-icon-tile ring-1 ring-white/20"
            />
            <h2
              id="get-app-heading"
              className="display-title mt-7 text-balance text-3xl !text-white sm:text-4xl"
            >
              Ready to try {app.name}?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-300">
              {app.tagline} Free on Google Play.
            </p>
            <div className="mt-8 flex justify-center">
              <GooglePlayButton
                href={app.playStoreUrl}
                buttonLocation="article_bottom"
                appName={app.name}
                label="Get it on Google Play"
                variant="gold"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding" aria-label="Related apps">
        <div className="container-wide mx-auto">
          <RelatedApps apps={related} />
          <GoldDivider className="mt-20" />
          <Reveal className="mt-10 text-center">
            <Link href="/apps/" className="btn-outline">
              Browse the full catalog
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
