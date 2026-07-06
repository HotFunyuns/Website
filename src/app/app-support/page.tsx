import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { apps, companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Developer Information — Reign Creative LLC',
  description:
    'Official developer and app support information for Reign Creative LLC. Company details, app portfolio, and support resources.',
  alternates: { canonical: '/app-support/' },
  openGraph: {
    title: 'Developer Information — Reign Creative LLC',
    description:
      'Official developer and app support information for Reign Creative LLC. Company details, app portfolio, and support resources.',
    url: `${companyInfo.siteUrl}/app-support/`,
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

export default function AppSupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Official Details"
        title={
          <>
            Developer <em className="gold-text not-italic">Information</em>
          </>
        }
        description="Official company and app support details for Reign Creative LLC."
      />

      <section className="section-padding !pt-8">
        <div className="container-narrow mx-auto space-y-8">
          {/* Company Details */}
          <Reveal>
            <div className="card-premium p-8 sm:p-10">
              <h2 className="mb-7 font-display text-2xl font-semibold text-ink-950">
                Company Information
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                    Company Name
                  </h3>
                  <p className="font-medium text-ink-950">{companyInfo.name}</p>
                </div>
                <div>
                  <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                    Official Website
                  </h3>
                  <p className="font-medium text-ink-950">{companyInfo.domain}</p>
                </div>
                <div>
                  <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                    Support Email
                  </h3>
                  <a
                    href={`mailto:${companyInfo.supportEmail}`}
                    className="link-accent break-all font-medium"
                    rel="noopener noreferrer"
                  >
                    {companyInfo.supportEmail}
                  </a>
                </div>
                <div>
                  <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                    Google Play Developer
                  </h3>
                  <a
                    href={companyInfo.developerPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent font-medium"
                  >
                    {companyInfo.developerName}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Support Statement */}
          <Reveal delay={100}>
            <div className="card-premium p-8 sm:p-10">
              <h2 className="mb-4 font-display text-2xl font-semibold text-ink-950">
                User Support
              </h2>
              <div className="space-y-3 leading-relaxed text-ink-600">
                <p>
                  {companyInfo.name} is committed to providing responsive support for all of our
                  published applications. Users can contact us for assistance with app
                  functionality, bug reports, feature requests, account issues, or any other
                  concerns.
                </p>
                <p>
                  All support inquiries can be directed to{' '}
                  <a
                    href={`mailto:${companyInfo.supportEmail}`}
                    className="link-accent"
                    rel="noopener noreferrer"
                  >
                    {companyInfo.supportEmail}
                  </a>
                  . We aim to respond within 24–48 hours during business days.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Apps List */}
          <Reveal delay={150}>
            <div className="card-premium p-8 sm:p-10">
              <h2 className="mb-7 font-display text-2xl font-semibold text-ink-950">
                Applications &amp; Products
              </h2>
              <ul className="space-y-3">
                {apps.map((app) => (
                  <li
                    key={app.slug}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-100 bg-cream-50 px-4 py-3 transition-colors hover:border-gold-300"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.iconSmall}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="h-10 w-10 shrink-0 rounded-lg shadow-icon-tile ring-1 ring-ink-950/10"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/apps/${app.slug}/`}
                          className="block truncate text-sm font-semibold text-ink-950 transition-colors hover:text-crimson-600"
                        >
                          {app.name}
                        </Link>
                        <p className="text-xs text-ink-400">{app.category}</p>
                      </div>
                    </div>
                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill transition-colors hover:border-gold-500"
                    >
                      Google Play
                      <span className="sr-only"> — {app.name} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Policies */}
          <Reveal delay={200}>
            <div className="card-premium p-8 sm:p-10">
              <h2 className="mb-4 font-display text-2xl font-semibold text-ink-950">
                Policies &amp; Legal
              </h2>
              <p className="mb-7 leading-relaxed text-ink-600">
                Our policies are publicly available and apply to all users of our applications and
                website. We encourage all users to review them.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/privacy/" className="btn-outline btn-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms/" className="btn-outline btn-sm">
                  Terms of Service
                </Link>
                <Link href="/support/" className="btn-outline btn-sm">
                  Contact Support
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
