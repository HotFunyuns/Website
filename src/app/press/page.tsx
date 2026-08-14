import type { Metadata } from 'next';
import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';
import GooglePlayIcon from '@/components/GooglePlayIcon';
import PageHeader from '@/components/PageHeader';
import PlayStoreLink from '@/components/PlayStoreLink';
import Reveal from '@/components/Reveal';
import { activeCategories, appCount, apps, companyInfo, getAppsByCategory } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Press Kit — Company Facts, Apps and Logos',
  description: `Press and media resources for ${companyInfo.name}: verified company details, the app catalogue with Google Play links, approved icons and image usage terms.`,
  alternates: { canonical: '/press/' },
  openGraph: {
    title: `Press Kit | ${companyInfo.name}`,
    description: `Verified company details, the full app catalogue with Google Play links, approved icons, and image usage terms.`,
    url: `${companyInfo.siteUrl}/press/`,
    type: 'website',
    images: [
      {
        url: `${companyInfo.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `Press kit — ${companyInfo.name}`,
      },
    ],
  },
};

const h2 = 'display-title text-2xl sm:text-3xl';
const h3 = 'font-display text-lg font-semibold text-ink-950';

// Newest verification stamp across the catalogue. Every monetisation fact on
// this page is copied from a live Play listing on that date, so publishing it
// lets a journalist judge how current the table is instead of assuming.
const lastVerified = apps.map((app) => app.lastVerified).reduce((a, b) => (a > b ? a : b));

const verifiedDate = new Date(`${lastVerified}T00:00:00Z`).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const facts: { term: string; value: React.ReactNode }[] = [
  { term: 'Legal name', value: companyInfo.name },
  { term: 'Founded', value: companyInfo.founded },
  { term: 'Google Play developer', value: companyInfo.developerName },
  {
    term: 'Developer page',
    value: (
      <PlayStoreLink
        href={companyInfo.developerPageUrl}
        buttonLocation="hero"
        className="break-all text-crimson-600 underline-offset-2 hover:underline"
      >
        {companyInfo.developerPageUrl}
        <span className="sr-only"> (opens in a new tab)</span>
      </PlayStoreLink>
    ),
  },
  {
    term: 'Website',
    value: (
      <Link href="/" className="text-crimson-600 underline-offset-2 hover:underline">
        {companyInfo.domain}
      </Link>
    ),
  },
  {
    term: 'Press and support contact',
    value: (
      <a
        href={`mailto:${companyInfo.supportEmail}`}
        className="break-all text-crimson-600 underline-offset-2 hover:underline"
      >
        {companyInfo.supportEmail}
      </a>
    ),
  },
  { term: 'Apps published', value: `${appCount} on Google Play` },
  { term: 'Platform', value: 'Android' },
  { term: 'Play listing details verified', value: verifiedDate },
];

const shortBoilerplate = companyInfo.description;

const categoryList = activeCategories.map((category) => category.shortLabel);
const categoryPhrase = `${categoryList.slice(0, -1).join(', ')} and ${categoryList[categoryList.length - 1]}`;

const longBoilerplate = `${companyInfo.name} is an independent Android app studio founded in ${companyInfo.founded}, publishing on Google Play as ${companyInfo.developerName}. Its ${appCount}-app catalogue spans ${categoryPhrase}. Every app is free to download. The studio also writes in-house guides to the apps it builds at ${companyInfo.domain}/blog/.`;

export default function PressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Press Kit"
        title={
          <>
            Press and media <span className="gold-text">resources</span>
          </>
        }
        description={`Everything on this page is drawn from our own records and from our live Google Play listings. If you need something that is not here, email us and we will answer rather than guess.`}
      />

      <section className="bg-white pb-20">
        <div className="container-narrow mx-auto px-5 sm:px-8">
          {/* Company facts */}
          <Reveal>
            <h2 className={h2}>Company facts</h2>
            <GoldDivider className="mt-5" />
            <dl className="mt-8 divide-y divide-ink-100 border-y border-ink-100">
              {facts.map((fact) => (
                <div key={fact.term} className="grid gap-1 py-4 sm:grid-cols-[15rem,1fr] sm:gap-6">
                  <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-500">
                    {fact.term}
                  </dt>
                  <dd className="text-ink-950">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Boilerplate */}
          <Reveal>
            <h2 className={`${h2} mt-20`}>Boilerplate</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6 text-ink-500">
              Copy either version as-is. Both are accurate as written, and we would rather you
              reused them than paraphrased into something we would have to correct later.
            </p>

            <h3 className={`${h3} mt-8`}>Short</h3>
            <blockquote className="mt-3 border-l-2 border-gold-500 bg-ink-50/60 py-4 pl-5 pr-4 text-ink-950">
              {shortBoilerplate}
            </blockquote>

            <h3 className={`${h3} mt-8`}>Extended</h3>
            <blockquote className="mt-3 border-l-2 border-gold-500 bg-ink-50/60 py-4 pl-5 pr-4 text-ink-950">
              {longBoilerplate}
            </blockquote>
          </Reveal>

          {/* Honest limits */}
          <Reveal>
            <h2 className={`${h2} mt-20`}>What we are not claiming</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6 text-ink-500">
              Press kits tend to be where numbers go to get flattering. So that you do not have to
              work out which figures here are load-bearing:
            </p>
            <ul className="mt-6 space-y-4 text-ink-500">
              <li className="border-l-2 border-ink-200 pl-5">
                <strong className="text-ink-950">We publish no download or user counts.</strong> Any
                install figure you need should come from the Google Play listing itself, which is
                the only source either of us can check.
              </li>
              <li className="border-l-2 border-ink-200 pl-5">
                <strong className="text-ink-950">We have no awards or press coverage to list.</strong>{' '}
                An empty section is more useful to you than a padded one.
              </li>
              <li className="border-l-2 border-ink-200 pl-5">
                <strong className="text-ink-950">We do not publish user ratings here.</strong>{' '}
                Ratings move, and a number frozen into a web page is wrong shortly afterwards. The
                current rating is on each Play listing.
              </li>
              <li className="border-l-2 border-ink-200 pl-5">
                <strong className="text-ink-950">
                  &ldquo;Content rating&rdquo; below is Google Play&apos;s, not ours.
                </strong>{' '}
                It describes suitability by age and says nothing about quality.
              </li>
            </ul>
          </Reveal>

          {/* App catalogue */}
          <Reveal>
            <h2 className={`${h2} mt-20`}>App catalogue</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6 text-ink-500">
              All {appCount} apps, grouped by category. The monetisation columns were copied from
              each live Play listing on {verifiedDate}.
            </p>
          </Reveal>

          {activeCategories.map((category) => (
            <Reveal key={category.id}>
              <h3 className={`${h3} mt-12`}>
                <Link
                  href={`/apps/category/${category.id}/`}
                  className="transition-colors hover:text-crimson-600"
                >
                  {category.label}
                </Link>
              </h3>
              <ul className="mt-5 space-y-4">
                {getAppsByCategory(category.id).map((app) => (
                  <li
                    key={app.slug}
                    className="flex flex-wrap items-start gap-x-5 gap-y-4 rounded-2xl border border-ink-100 p-5 sm:flex-nowrap"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={app.iconSmall}
                      alt={`${app.name} app icon`}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-14 shrink-0 rounded-[1rem] shadow-icon-tile ring-1 ring-ink-950/10"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/apps/${app.slug}/`}
                        className="font-display font-semibold text-ink-950 transition-colors hover:text-crimson-600"
                      >
                        {app.name}
                      </Link>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{app.tagline}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.1em] text-ink-400">
                        {app.free ? 'Free' : 'Paid'} · {app.containsAds ? 'Contains ads' : 'No ads'}{' '}
                        · {app.inAppPurchases ? 'In-app purchases' : 'No in-app purchases'} · Rated{' '}
                        {app.contentRating}
                      </p>
                      <p className="mt-1 break-all text-xs text-ink-400">{app.packageId}</p>
                    </div>
                    <PlayStoreLink
                      href={app.playStoreUrl}
                      buttonLocation="app_card"
                      appName={app.name}
                      className="btn-outline btn-sm shrink-0"
                    >
                      <GooglePlayIcon className="h-3.5 w-3.5" />
                      Play listing
                      <span className="sr-only"> for {app.name} (opens in a new tab)</span>
                    </PlayStoreLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Image use */}
          <Reveal>
            <h2 className={`${h2} mt-20`}>Icons and image use</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6 text-ink-500">
              Each app icon above links to the approved file — right-click and save, or fetch it
              from <code className="text-ink-950">{companyInfo.domain}</code> directly. These are
              the same icons used on the Play listings.
            </p>
            <h3 className={`${h3} mt-8`}>You may</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-500">
              <li>
                Use our app icons and the {companyInfo.name} name in articles, reviews, roundups and
                store listings that refer to us or our apps.
              </li>
              <li>Scale an icon proportionally to fit your layout.</li>
              <li>Screenshot our apps and this website for editorial use.</li>
            </ul>
            <h3 className={`${h3} mt-8`}>Please do not</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-500">
              <li>Stretch, recolour, rotate or add effects to an icon, or crop it into a new shape.</li>
              <li>
                Combine our name or icons with your own branding in a way that implies partnership,
                sponsorship or endorsement, which we have not given.
              </li>
              <li>Use our assets to promote a product that is not ours.</li>
            </ul>
            <p className="mt-6 text-sm text-ink-500">
              Google Play and the Google Play logo are trademarks of Google LLC, used here under
              Google&apos;s brand guidelines. We are not affiliated with Google.
            </p>
          </Reveal>

          {/* Contact */}
          <Reveal>
            <h2 className={`${h2} mt-20`}>Getting in touch</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6 text-ink-500">
              Email{' '}
              <a
                href={`mailto:${companyInfo.supportEmail}`}
                className="text-crimson-600 underline-offset-2 hover:underline"
              >
                {companyInfo.supportEmail}
              </a>{' '}
              for interviews, fact-checking, review access or anything this page does not cover. If
              you are checking a claim against a deadline, say so in the subject line.
            </p>
            <p className="mt-4 text-ink-500">
              How we research, source and correct what we publish is set out in our{' '}
              <Link
                href="/editorial-policy/"
                className="text-crimson-600 underline-offset-2 hover:underline"
              >
                editorial policy
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
