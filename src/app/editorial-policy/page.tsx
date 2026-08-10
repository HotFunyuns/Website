import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Editorial Policy — How We Research and Write',
  description:
    'How Reign Creative LLC researches, sources, reviews and corrects the articles on this site, including our disclosure and competitor comparison rules.',
  alternates: { canonical: '/editorial-policy/' },
  openGraph: {
    title: `Editorial Policy | ${companyInfo.name}`,
    description:
      'How Reign Creative LLC researches, sources, reviews and corrects the articles on this site.',
    url: `${companyInfo.siteUrl}/editorial-policy/`,
    type: 'website',
  },
};

const h2 = 'font-display text-xl font-semibold text-ink-950';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${companyInfo.siteUrl}/editorial-policy/#page`,
  name: 'Editorial Policy',
  url: `${companyInfo.siteUrl}/editorial-policy/`,
  description:
    'How Reign Creative LLC researches, sources, reviews and corrects the articles on this site.',
  isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
  publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd data={schema} />

      <PageHeader
        eyebrow="Editorial"
        title={
          <>
            Editorial <em className="gold-text not-italic">policy</em>
          </>
        }
        description="We publish articles about our own apps, so you deserve to know exactly what that means for what you read here."
      />

      <section className="section-padding !pt-8">
        <div className="container-narrow mx-auto">
          <Reveal>
            <div className="card-premium p-8 sm:p-12">
              <div className="space-y-10 leading-relaxed text-ink-600">
                <div>
                  <h2 className={h2}>Who writes this</h2>
                  <p className="mt-3">
                    Every article on this site is written and edited by the {companyInfo.name} team
                    — the same people who build the apps. We do not use guest posts, sponsored
                    placements, or paid link insertions, and we do not accept payment to feature
                    another company&apos;s product.
                  </p>
                  <p className="mt-3">
                    We do not claim that our articles are reviewed by doctors, dietitians,
                    licensed teachers, professional linguists, or native speakers unless a named
                    reviewer with those credentials is credited on the article itself. If you do not
                    see a named reviewer, no such review took place.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Ownership disclosure</h2>
                  <p className="mt-3">
                    {companyInfo.name} publishes the Android apps discussed on this site under the
                    Google Play developer name {companyInfo.developerName}. When an article
                    recommends or explains one of our apps, we have a direct commercial interest in
                    you installing it. We disclose that relationship on the article itself rather
                    than burying it here.
                  </p>
                  <p className="mt-3">
                    Our apps are free to download. Some contain ads or optional in-app purchases;
                    each app page lists which, copied from the live Google Play listing rather than
                    written from memory.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>How we source facts</h2>
                  <ul className="ml-4 mt-3 list-disc space-y-2">
                    <li>
                      Facts about our own apps come from the app and its live Google Play listing.
                      Store details — price, content rating, ads, in-app purchases — are read from
                      the listing and stamped with the date they were checked.
                    </li>
                    <li>
                      Health and nutrition articles cite primary public-health and government
                      sources such as the National Institutes of Health, USDA FoodData Central, the
                      FDA, and the CDC.
                    </li>
                    <li>
                      History articles distinguish between what is documented and what is
                      historians&apos; interpretation, and say which is which.
                    </li>
                    <li>
                      Language articles present standard forms of a language and flag where regional
                      usage differs. Where a translation matters, we say what register it belongs to
                      rather than presenting one option as the only correct one.
                    </li>
                    <li>
                      Sources are listed at the bottom of any article that relies on them, with the
                      publisher and the date we accessed them.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className={h2}>What we will not publish</h2>
                  <ul className="ml-4 mt-3 list-disc space-y-2">
                    <li>
                      Invented statistics. We do not publish search volumes, download totals,
                      ratings, user counts, or revenue figures we cannot point to a public source
                      for.
                    </li>
                    <li>
                      Fabricated reviews or testimonials, or star ratings presented as aggregate
                      user scores when they are not.
                    </li>
                    <li>
                      Medical advice. Our health articles are general information. They do not
                      diagnose, treat, or prescribe, and they do not promise weight-loss results.
                    </li>
                    <li>
                      Guaranteed outcomes. Our sports games simulate results from assumptions we
                      describe; they do not predict real games, and nothing here should be used for
                      betting.
                    </li>
                    <li>
                      Claims about a competitor we have not verified against that
                      competitor&apos;s own current published material.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className={h2}>Comparison articles</h2>
                  <p className="mt-3">
                    Some articles compare our apps to other apps in the same category. Those
                    comparisons follow fixed rules:
                  </p>
                  <ul className="ml-4 mt-3 list-disc space-y-2">
                    <li>
                      Every claim about another product is checked against that company&apos;s own
                      website, store listing, or documentation, and the date we checked is printed
                      on the article.
                    </li>
                    <li>
                      Pricing, features, and platform support change frequently. We tell you to
                      confirm current details with the vendor rather than trusting a date-stamped
                      snapshot.
                    </li>
                    <li>
                      We do not use competitor logos, screenshots, app icons, or brand styling. All
                      third-party names and trademarks belong to their respective owners, and their
                      use here is nominative — for identification only. No affiliation, sponsorship,
                      partnership, or endorsement is claimed or implied in either direction.
                    </li>
                    <li>
                      We describe differences, not defects. If a competitor is the better choice for
                      a reader&apos;s situation, the article says so. A comparison that is only
                      useful when you pick us is an advertisement, not a comparison.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className={h2}>Dates, updates and corrections</h2>
                  <p className="mt-3">
                    Articles show a publication date and, where it differs, the date of the last
                    substantive update. We do not refresh dates to look current; a date changes only
                    when the content behind it changed.
                  </p>
                  <p className="mt-3">
                    If you find something inaccurate, tell us and we will fix it. Corrections that
                    change the meaning of an article are noted in the article. Email{' '}
                    <a
                      href={`mailto:${companyInfo.supportEmail}`}
                      className="link-accent"
                      rel="noopener noreferrer"
                    >
                      {companyInfo.supportEmail}
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h2 className={h2}>AI and automation</h2>
                  <p className="mt-3">
                    We use software tools in drafting and editing. Every article is reviewed by a
                    person before publication, and the factual claims and sources in it are checked
                    against the references listed on the page. We do not publish machine-generated
                    text that no one has read.
                  </p>
                </div>

                <div className="rounded-xl border border-ink-100 bg-cream-50 p-5">
                  <p className="font-semibold text-ink-950">Related</p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>
                      <Link href="/privacy/" className="link-accent">
                        Privacy Policy
                      </Link>{' '}
                      — what our apps and this site collect
                    </li>
                    <li>
                      <Link href="/terms/" className="link-accent">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/" className="link-accent">
                        Support
                      </Link>{' '}
                      — report an error or suggest a topic
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
