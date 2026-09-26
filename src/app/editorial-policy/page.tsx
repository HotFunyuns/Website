import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { formatPostDate } from '@/components/blog/format';
import { companyInfo } from '@/data/apps';
import { DEFAULT_AUTHOR_ID, authorPath } from '@/data/authors';
import { APPROVAL_GATE_AFTER, DAILY_RELEASE_LIMIT } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Editorial Policy — How We Research and Write',
  description:
    'How Reign Creative LLC chooses topics, uses AI, checks facts and sources, dates and corrects its articles, and discloses that it makes the apps it writes about.',
  alternates: { canonical: '/editorial-policy/' },
  openGraph: {
    title: `Editorial Policy | ${companyInfo.name}`,
    description:
      'How Reign Creative LLC chooses topics, uses AI, checks facts, dates and corrects its articles, and discloses its apps.',
    url: `${companyInfo.siteUrl}/editorial-policy/`,
    type: 'website',
    images: [
      {
        url: `${companyInfo.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `Editorial policy — ${companyInfo.name}`,
      },
    ],
  },
};

const h2 = 'font-display text-xl font-semibold text-ink-950 scroll-mt-28';
const h3 = 'font-display text-base font-semibold text-ink-950';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${companyInfo.siteUrl}/editorial-policy/#page`,
  name: 'Editorial Policy',
  url: `${companyInfo.siteUrl}/editorial-policy/`,
  description:
    'How Reign Creative LLC chooses topics, uses AI, checks facts and sources, dates and corrects its articles, and discloses that it makes the apps it writes about.',
  isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
  publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
};

const contents = [
  { id: 'who', label: 'Who creates the content' },
  { id: 'ownership', label: 'We make the apps we write about' },
  { id: 'topics', label: 'How topics are chosen' },
  { id: 'keywords', label: 'How keyword research is used' },
  { id: 'ai', label: 'How AI is used' },
  { id: 'app-facts', label: 'How app features are verified' },
  { id: 'sources', label: 'How facts and sources are checked' },
  { id: 'comparisons', label: 'Comparison articles' },
  { id: 'will-not-publish', label: 'What we will not publish' },
  { id: 'dates', label: 'Publication and update dates' },
  { id: 'corrections', label: 'Corrections' },
  { id: 'no-guarantees', label: 'What we do not promise' },
];

export default function EditorialPolicyPage() {
  const gateDate = formatPostDate(APPROVAL_GATE_AFTER);
  const mail = (
    <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all" rel="noopener noreferrer">
      {companyInfo.supportEmail}
    </a>
  );

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
        description="We publish articles about the subjects our own apps deal with, so you deserve to know exactly who writes them, how, and what that means for what you read here."
      />

      <section className="section-padding !pt-8">
        <div className="container-narrow mx-auto">
          <Reveal>
            <div className="card-premium p-8 sm:p-12">
              <nav aria-label="On this page" className="rounded-xl border border-ink-100 bg-cream-50 p-5">
                <p className="font-semibold text-ink-950">On this page</p>
                <ol className="ml-5 mt-2 list-decimal space-y-1 text-sm">
                  {contents.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="link-accent">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="mt-10 space-y-10 leading-relaxed text-ink-600">
                <div>
                  <h2 id="who" className={h2}>
                    Who creates the content
                  </h2>
                  <p className="mt-3">
                    Articles are published under the byline{' '}
                    <Link href={authorPath({ id: DEFAULT_AUTHOR_ID })} className="link-accent">
                      {companyInfo.name}
                    </Link>{' '}
                    — the company, not an individual — and the company is accountable for every one of
                    them. They are produced in-house with the help of AI tools, as described below. We
                    do not publish guest posts, sponsored placements or paid link insertions, and we do
                    not accept payment to feature another company&apos;s product.
                  </p>
                  <p className="mt-3">
                    We do not claim that our articles are reviewed by doctors, dietitians, licensed
                    teachers, historians, professional linguists or native speakers unless a named
                    reviewer with those credentials is credited on the article itself. If you do not
                    see a named reviewer, no such review took place. At present, no article names one.
                  </p>
                </div>

                <div>
                  <h2 id="ownership" className={h2}>
                    We make the apps we write about
                  </h2>
                  <p className="mt-3">
                    {companyInfo.name} publishes the Android apps discussed on this site under the
                    Google Play developer name {companyInfo.developerName}. When an article recommends
                    or explains one of our apps, we have a direct commercial interest in you installing
                    it. Every article says so near the top, beside the byline, rather than leaving it
                    to this page.
                  </p>
                  <p className="mt-3">
                    Our apps are free to download. Some contain ads or optional in-app purchases; each
                    app page lists which, copied from the live Google Play listing rather than written
                    from memory.
                  </p>
                </div>

                <div>
                  <h2 id="topics" className={h2}>
                    How topics are chosen
                  </h2>
                  <p className="mt-3">
                    We write about the subjects our apps deal with: the periods and events our history
                    timeline covers, the methods our mental-math games practise, the rules and
                    decisions our sports simulators model, the languages our courses teach, the
                    nutrition our trackers log, and how our utility apps and games work. Within those
                    subjects we look at the questions people actually ask, and at what our existing
                    articles do not yet answer.
                  </p>
                  <p className="mt-3">
                    An article has to be useful to someone who never installs one of our apps. We do
                    not publish a page whose only job is to target a search phrase, and we would rather
                    improve an existing article than add a second one that covers the same ground.
                  </p>
                </div>

                <div>
                  <h2 id="keywords" className={h2}>
                    How keyword research is used
                  </h2>
                  <p className="mt-3">
                    Keyword research tells us how people phrase their questions. It does not tell us
                    what is true, and it never overrides the sources. As of September 2026 our research
                    has used Google Autocomplete suggestions; we have had no search-volume figures from
                    Search Console, Keyword Planner or commercial tools, so we do not publish or rely on
                    volumes, difficulty scores or traffic forecasts.
                  </p>
                  <p className="mt-3">
                    Each article targets one primary phrase that no other article on the site targets,
                    so two of our own pages do not compete for the same search. The site will not build
                    if two articles claim the same one.
                  </p>
                </div>

                <div>
                  <h2 id="ai" className={h2}>
                    How AI is used
                  </h2>
                  <p className="mt-3">
                    We use AI tools extensively: to find and organise sources, to draft articles, and
                    to edit them. Many of the articles on this site were drafted by AI tools working
                    from our app catalog — which is copied from the live Google Play listings — and
                    from the published sources each article cites.
                  </p>
                  <p className="mt-3">
                    Before an article is published, automated checks run against it. Every cited source
                    must resolve. Statements about our apps are checked against the catalog. Claims we
                    never make — medical promises, invented statistics, download counts, ranking
                    guarantees, unreleased app names — are blocked. And the text is compared with every
                    other article to catch duplication. These checks catch a lot, but they are not the
                    same as a person reading every sentence, and they cannot prove that a source says
                    exactly what an article says it does.
                  </p>
                  <p className="mt-3">
                    <strong className="text-ink-950">
                      Every article published after {gateDate} must be read in full and approved by a
                      person at {companyInfo.name} before it is released
                    </strong>{' '}
                    — the publishing system will not release it otherwise — and those articles say so
                    at the end. Articles published on or before {gateDate} passed the automated checks,
                    but not every one of them was read in full by a person before it went live. If you
                    find a mistake in any article, tell us and we will fix it.
                  </p>
                  <p className="mt-3">
                    That approval is an editorial check by the company that makes the apps. It is not
                    independent review, third-party fact-checking or expert review.
                  </p>
                </div>

                <div>
                  <h2 id="app-facts" className={h2}>
                    How app features are verified
                  </h2>
                  <ul className="ml-4 mt-3 list-disc space-y-2">
                    <li>
                      An article may describe only features that exist in the released app. Each
                      app&apos;s catalog record is written from the app and its live Google Play
                      listing, and anything not in that record is treated as not existing.
                    </li>
                    <li>
                      Store details — price, content rating, ads, in-app purchases — are re-copied from
                      the live listing by a script and stamped with the date they were checked, which
                      each app page shows.
                    </li>
                    <li>
                      Features that exist in an app&apos;s code but are not in the released version are
                      not described, and names that have not been released on Google Play are not used.
                    </li>
                    <li>
                      If a Google Play listing and an article disagree, the listing is right and the
                      article is corrected.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 id="sources" className={h2}>
                    How facts and sources are checked
                  </h2>
                  <p className="mt-3">
                    Sources are listed at the end of any article that relies on them, with the
                    publisher and the date we accessed them. We prefer the primary source to something
                    quoting it. Where a source could not be read in full — a paywalled journal article,
                    for instance — it is cited only for what its published record supports, such as
                    its authors, date and subject, and a claim that cannot be supported is dropped
                    rather than cited to a page nobody opened. Some subjects carry extra rules:
                  </p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <h3 className={h3}>History</h3>
                      <p className="mt-1.5">
                        We separate what is documented from what historians interpret, and say which is
                        which. Contested questions are attributed to the people who argue them rather
                        than settled by us. Atrocity, colonialism, enslavement and genocide are
                        described plainly, from scholarly and archival sources. Quotations are
                        attributed only where a traceable source exists. Our history app&apos;s own data
                        is used to choose topics, never as evidence.
                      </p>
                    </div>
                    <div>
                      <h3 className={h3}>Health and nutrition</h3>
                      <p className="mt-1.5">
                        These articles are general information, not medical advice, and carry a notice
                        saying so. They cite primary public-health and government sources such as the
                        National Institutes of Health, USDA FoodData Central, the FDA and the CDC, keep
                        official reference intakes separate from personal targets, and never diagnose,
                        prescribe or promise weight-loss results.
                      </p>
                    </div>
                    <div>
                      <h3 className={h3}>Languages</h3>
                      <p className="mt-1.5">
                        We present standard forms, give scripts and romanisation correctly, and flag
                        where regional usage differs. Where a translation depends on register, we say
                        so. No language article has been reviewed by a native speaker unless one is
                        named on it.
                      </p>
                    </div>
                    <div>
                      <h3 className={h3}>Brain training and reasoning</h3>
                      <p className="mt-1.5">
                        We do not claim that any app measures IQ, raises intelligence, prevents
                        cognitive decline or treats anything. Where research finds that practice
                        improves the practised task rather than general ability, we say that.
                      </p>
                    </div>
                    <div>
                      <h3 className={h3}>Technical subjects</h3>
                      <p className="mt-1.5">
                        Articles about Android, video formats, codecs and app permissions cite the
                        platform&apos;s or standard&apos;s own documentation where one exists, and
                        describe our apps&apos; behaviour from the apps themselves.
                      </p>
                    </div>
                    <div>
                      <h3 className={h3}>Sports simulation</h3>
                      <p className="mt-1.5">
                        Our sports games use generic players and teams, not real league data, and
                        simulate results from assumptions the articles describe. Nothing here is a
                        prediction, and nothing should be used for betting.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 id="comparisons" className={h2}>
                    Comparison articles
                  </h2>
                  <p className="mt-3">
                    Some articles compare our apps to other apps in the same category. Those
                    comparisons follow fixed rules:
                  </p>
                  <ul className="ml-4 mt-3 list-disc space-y-2">
                    <li>
                      They open with a notice that we publish one of the apps compared, so our view is
                      interested rather than neutral.
                    </li>
                    <li>
                      Every claim about another product is checked against that company&apos;s own
                      website, store listing or documentation, and the date we checked is printed on
                      the article.
                    </li>
                    <li>
                      Pricing, features and platform support change frequently. We tell you to confirm
                      current details with the vendor rather than trusting a dated snapshot.
                    </li>
                    <li>
                      We do not use competitor logos, screenshots, app icons or brand styling. All
                      third-party names and trademarks belong to their respective owners, and their use
                      here is nominative — for identification only. No affiliation, sponsorship,
                      partnership or endorsement is claimed or implied in either direction.
                    </li>
                    <li>
                      We describe differences, not defects. If a competitor is the better choice for a
                      reader&apos;s situation, the article says so. A comparison that is only useful when
                      you pick us is an advertisement, not a comparison.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 id="will-not-publish" className={h2}>
                    What we will not publish
                  </h2>
                  <ul className="ml-4 mt-3 list-disc space-y-2">
                    <li>
                      Invented statistics. We do not publish search volumes, download totals, ratings,
                      user counts or revenue figures we cannot point to a public source for.
                    </li>
                    <li>
                      Fabricated reviews, testimonials, authors, credentials or awards, or star ratings
                      presented as aggregate user scores when they are not.
                    </li>
                    <li>
                      Medical advice. Our health articles are general information. They do not
                      diagnose, treat or prescribe, and they do not promise weight-loss results.
                    </li>
                    <li>
                      Guaranteed outcomes. Our sports games simulate results from assumptions we
                      describe; they do not predict real games.
                    </li>
                    <li>
                      Claims about a competitor we have not verified against that company&apos;s own
                      current published material.
                    </li>
                    <li>
                      Text aimed at search engines or AI systems rather than readers — hidden text,
                      instructions to AI assistants, or claims that an app is favoured by Google or by
                      any AI system.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 id="dates" className={h2}>
                    Publication and update dates
                  </h2>
                  <p className="mt-3">
                    Every article shows the day it was published — the day it actually went live, in
                    Pacific time (America/Los_Angeles). A publication date is never moved earlier, and
                    an old article&apos;s publication date is not changed. New articles are released no
                    more than {DAILY_RELEASE_LIMIT === 1 ? 'one' : DAILY_RELEASE_LIMIT} a day.
                  </p>
                  <p className="mt-3">
                    An &ldquo;Updated&rdquo; date appears only after a substantive change to the
                    content: a correction, new or changed information, a rewritten section, or better
                    sources. Adding a link to another article, fixing formatting or re-saving a file
                    does not change it. We do not refresh dates to look current. The dates shown on the
                    page are the same dates given to search engines in the article&apos;s structured
                    data.
                  </p>
                </div>

                <div>
                  <h2 id="corrections" className={h2}>
                    Corrections
                  </h2>
                  <p className="mt-3">
                    If you find something inaccurate, email {mail} or use the{' '}
                    <Link href="/support/" className="link-accent">
                      support page
                    </Link>
                    . Tell us which page and what you think is wrong; a link to a source helps.
                  </p>
                  <p className="mt-3">
                    We check the claim against its sources. If it is wrong, we fix it. When the fix
                    changes what the article says, a dated correction note is added at the top of the
                    article and its &ldquo;Updated&rdquo; date changes — we do not silently rewrite a
                    claim that someone may have relied on. Fixes that do not change the meaning, such
                    as a typo or a broken link, are made without a note.
                  </p>
                </div>

                <div>
                  <h2 id="no-guarantees" className={h2}>
                    What we do not promise
                  </h2>
                  <p className="mt-3">
                    Nothing on this site promises a search ranking, traffic, an AI citation, a
                    recommendation from any assistant, or an install — for us or for you. Our articles
                    are written to be useful and accurate, and how search engines and AI systems treat
                    them is not in our control.
                  </p>
                </div>

                <div className="rounded-xl border border-ink-100 bg-cream-50 p-5">
                  <p className="font-semibold text-ink-950">Related</p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>
                      <Link href="/about/" className="link-accent">
                        About {companyInfo.name}
                      </Link>{' '}
                      — who we are and what we make
                    </li>
                    <li>
                      <Link href={authorPath({ id: DEFAULT_AUTHOR_ID })} className="link-accent">
                        Author profile
                      </Link>{' '}
                      — the byline on our articles, and how they are made
                    </li>
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
