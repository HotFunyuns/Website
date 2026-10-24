import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import BusinessInquiryForm from '@/components/partnerships/BusinessInquiryForm';
import BusinessInquiryLink from '@/components/partnerships/BusinessInquiryLink';
import PlayStoreLink from '@/components/PlayStoreLink';
import { appCount, apps, companyInfo, getAppBySlug } from '@/data/apps';
import { NONBINDING_NOTICE, PORTFOLIO_GROUPS } from '@/data/partnerships';
import { getPartnershipPostForApp } from '@/lib/blog';

const TITLE = 'Partnerships and Acquisitions';
const DESCRIPTION = `Reign Creative LLC is open to partnerships, licensing, publishing and acquisition discussions across its ${appCount} Android apps. How it works and how to get in touch.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/partnerships/' },
  openGraph: {
    title: `${TITLE} | ${companyInfo.name}`,
    description: DESCRIPTION,
    url: `${companyInfo.siteUrl}/partnerships/`,
    type: 'website',
    images: [
      {
        url: `${companyInfo.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${TITLE} — ${companyInfo.name}`,
      },
    ],
  },
};

const h2 = 'display-title text-2xl sm:text-3xl';

/** What the company is open to discussing, in the words the owner approved. */
const MODELS: { title: string; body: string }[] = [
  {
    title: 'Publishing and distribution',
    body: 'A publisher or distributor takes on marketing, store presence in new regions or bundling, while the app keeps its development home.',
  },
  {
    title: 'Licensing and white-label',
    body: 'Licensing an app or its content, or a branded version for an organisation, where the app’s design makes that technically feasible.',
  },
  {
    title: 'Co-development',
    body: 'Building new content, modes or features with a partner who brings subject knowledge, art, or an audience.',
  },
  {
    title: 'Localization',
    body: 'Adapting an app for a new language or market with a partner who knows it.',
  },
  {
    title: 'Educational and institutional partnerships',
    body: 'Schools, tutoring services, museums and cultural organisations using a learning app with their students or members.',
  },
  {
    title: 'Sponsorship and cross-promotion',
    body: 'Sponsored content or events where they suit the app and its audience, and promotion between complementary apps.',
  },
  {
    title: 'Integrations',
    body: 'Connecting an app with another product, limited to what its existing capabilities support or framed clearly as new work.',
  },
  {
    title: 'Acquisition',
    body: 'The acquisition of an individual app, a group of apps or the portfolio, through diligence, a written agreement and the platforms’ own transfer processes.',
  },
];

const STEPS: { title: string; body: string }[] = [
  {
    title: 'A first email',
    body: 'Tell us who you are, which app or apps you mean and what you have in mind. A first message should not contain confidential, financial or personal information.',
  },
  {
    title: 'A conversation',
    body: 'If there is a fit, we arrange a call to understand the goal on both sides and whether the app can support it.',
  },
  {
    title: 'Confidential detail under an NDA',
    body: 'Information that is not public — technical, commercial or operational — is shared only with qualified parties and, where appropriate, under a non-disclosure agreement.',
  },
  {
    title: 'Diligence and a written agreement',
    body: 'Any partnership, licence or sale depends on due diligence and terms both sides sign. Moving an app between developer accounts follows Google Play’s own transfer process.',
  },
];

export default function PartnershipsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${companyInfo.siteUrl}/partnerships/`,
    about: { '@id': `${companyInfo.siteUrl}/#organization` },
    publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      <section className="relative overflow-hidden bg-white pb-14 pt-32 sm:pt-40">
        <div className="hero-streaks opacity-60" aria-hidden="true" />
        <div className="container-wide relative mx-auto px-5 sm:px-8 lg:px-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Partnerships' }]} />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow">For publishers, partners and acquirers</p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">{TITLE}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
              {companyInfo.name} builds and owns a portfolio of {appCount} Android apps and games, published on
              Google Play as {companyInfo.developerName}. We are open to serious discussions about any of them —
              partnerships, licensing, publishing and distribution, co-development, and the acquisition of a single
              app, several apps or the portfolio.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BusinessInquiryLink appSlug={null} appName={null} buttonLocation="partnerships_hub" className="btn-primary">
                Email about a partnership
              </BusinessInquiryLink>
              <a href="#directory" className="link-accent text-sm">
                Browse the app directory ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding !pt-4" aria-labelledby="models-heading">
        <div className="container-wide mx-auto">
          <h2 id="models-heading" className={h2}>
            What we are open to
          </h2>
          <p className="mt-3 max-w-2xl text-ink-500">
            Every app is different, so the right arrangement depends on what it does and who it is for. Each app’s
            overview, linked in the directory below, explains which of these fit it and why.
          </p>
          <ul className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {MODELS.map((model) => (
              <li key={model.title} className="card-premium h-full p-6">
                <h3 className="font-display text-base font-semibold text-ink-950">{model.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{model.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding !pt-0" aria-labelledby="process-heading">
        <div className="container-wide mx-auto">
          <h2 id="process-heading" className={h2}>
            How a discussion works
          </h2>
          <ol className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="card-premium h-full p-6">
                <span className="font-display text-sm font-semibold tracking-widest text-gold-600">Step {i + 1}</span>
                <h3 className="mt-2 font-display text-base font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-500">
            Google Play moves an app between developer accounts through a transfer request in Play Console. According
            to Google’s help page,{' '}
            <a
              href="https://support.google.com/googleplay/android-developer/answer/6230247"
              className="link-accent"
              rel="noopener noreferrer"
            >
              Transfer apps to a different developer account
            </a>
            , the app’s users, download statistics, ratings and reviews, content ratings and store listing move with
            it, while earnings and payout reports do not. The developer account itself and services outside Google Play
            are not part of a Play transfer; what any agreement covers is decided in that agreement.
          </p>
        </div>
      </section>

      <section id="directory" className="section-padding bg-cream-100" aria-labelledby="directory-heading">
        <div className="container-wide mx-auto">
          <h2 id="directory-heading" className={h2}>
            The portfolio, by kind of app
          </h2>
          <p className="mt-3 max-w-2xl text-ink-500">
            Each app links to its own overview: what it does, who it suits as a partner, and what we would bring to a
            conversation about it.
          </p>
          <div className="mt-10 space-y-12">
            {PORTFOLIO_GROUPS.map((group) => (
              <section key={group.id} aria-labelledby={`group-${group.id}`}>
                <h3 id={`group-${group.id}`} className="font-display text-xl font-semibold text-ink-950">
                  {group.label}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">{group.intro}</p>
                <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {group.apps.map((slug) => {
                    const app = getAppBySlug(slug);
                    if (!app) return null;
                    const post = getPartnershipPostForApp(slug);
                    return (
                      <li key={slug}>
                        <Link
                          href={post ? `/blog/${post.slug}/` : `/apps/${slug}/`}
                          className="card-premium-hover group flex h-full items-center gap-3 p-4"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={app.iconSmall}
                            alt=""
                            aria-hidden="true"
                            width={40}
                            height={40}
                            loading="lazy"
                            decoding="async"
                            className="h-10 w-10 shrink-0 rounded-lg ring-1 ring-ink-950/10"
                          />
                          <span>
                            <span className="block text-sm font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                              {app.name}
                            </span>
                            <span className="block text-xs text-ink-500">
                              {post ? 'Partnership overview' : 'App details'}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="contact-heading">
        <div className="container-narrow mx-auto">
          <h2 id="contact-heading" className={h2}>
            Start a conversation
          </h2>
          <p className="mt-3 text-ink-500">
            The form composes an email to {companyInfo.supportEmail} in your own email app; this site does not receive
            or store what you write. You can also email us directly, or see the apps on{' '}
            <PlayStoreLink href={companyInfo.developerPageUrl} buttonLocation="footer" className="link-accent">
              our Google Play developer page
              <span className="sr-only"> (opens in a new tab)</span>
            </PlayStoreLink>
            .
          </p>
          <div className="mt-8">
            <BusinessInquiryForm apps={apps.map((app) => ({ slug: app.slug, name: app.name }))} />
          </div>
          <aside aria-label="About this page" className="mt-10 rounded-2xl border border-gold-300 bg-gold-50 p-6">
            <h2 className="font-display text-base font-semibold text-ink-950">About this page</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{NONBINDING_NOTICE}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
              More about the company is on the <Link href="/about/" className="link-accent">about page</Link>, and our{' '}
              <Link href="/editorial-policy/" className="link-accent">editorial policy</Link> explains how the overviews
              are written.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
