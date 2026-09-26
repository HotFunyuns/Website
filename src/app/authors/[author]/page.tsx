import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoldDivider from '@/components/GoldDivider';
import JsonLd from '@/components/JsonLd';
import PlayStoreLink from '@/components/PlayStoreLink';
import BlogCard from '@/components/blog/BlogCard';
import { companyInfo } from '@/data/apps';
import { authorPath, authors, getAuthor, type AuthorInfo } from '@/data/authors';
import { APPROVAL_GATE_AFTER, activeHubs, blogCategories, getPostsByAuthor } from '@/lib/blog';
import { formatPostDate } from '@/components/blog/format';

export const dynamicParams = false;

/** Only authors with a published article get a profile, so no empty page ships. */
export function generateStaticParams() {
  return authors
    .filter((author) => getPostsByAuthor(author.id).length > 0)
    .map((author) => ({ author: author.id }));
}

function describe(author: AuthorInfo) {
  return author.kind === 'organization'
    ? `Who publishes the articles on ${companyInfo.domain}, how they are drafted with AI assistance, checked and corrected, and how the company discloses its apps.`
    : `${author.name}: ${author.relationship}`;
}

export function generateMetadata({ params }: { params: { author: string } }): Metadata {
  const author = getAuthor(params.author);
  if (!author) return {};

  const canonical = authorPath(author);
  const title = `${author.name} — Author Profile and Editorial Process`;
  return {
    // Absolute: the template suffix would print the company name twice.
    title: { absolute: title },
    description: describe(author),
    alternates: { canonical },
    openGraph: {
      title,
      description: describe(author),
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'profile',
      images: [
        {
          url: `${companyInfo.siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${author.name} — author profile`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: describe(author),
    },
  };
}

const h2 = 'display-title text-2xl sm:text-3xl';

export default function AuthorPage({ params }: { params: { author: string } }) {
  const author = getAuthor(params.author);
  if (!author) notFound();

  const authored = getPostsByAuthor(author.id);
  if (authored.length === 0) notFound();

  const recent = authored.slice(0, 6);
  const hubs = activeHubs();
  const categories = blogCategories();
  const url = `${companyInfo.siteUrl}${authorPath(author)}`;
  const gateDate = formatPostDate(APPROVAL_GATE_AFTER);

  // The company byline describes the same entity the root layout declares as
  // `#organization`, so the profile points at that node instead of minting a
  // second description of it. The values repeated here are identical to the
  // layout's, which keeps the merged node consistent.
  const mainEntity =
    author.kind === 'organization'
      ? {
          '@type': 'Organization',
          '@id': `${companyInfo.siteUrl}/#organization`,
          name: author.name,
          url: `${companyInfo.siteUrl}/`,
          sameAs: author.sameAs.map((profile) => profile.url),
        }
      : {
          '@type': 'Person',
          name: author.name,
          url,
          ...(author.sameAs.length ? { sameAs: author.sameAs.map((profile) => profile.url) } : {}),
        };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#page`,
    url,
    name: `${author.name} — author profile`,
    description: describe(author),
    inLanguage: 'en-US',
    isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
    mainEntity,
  };

  const facts: { term: string; value: React.ReactNode }[] = [
    { term: 'Byline', value: author.name },
    {
      term: 'What it is',
      value: author.kind === 'organization' ? 'A company, not an individual' : 'An individual',
    },
    { term: 'Google Play developer name', value: companyInfo.developerName },
    {
      term: 'Official website',
      value: (
        <Link href="/" className="link-accent">
          {companyInfo.domain}
        </Link>
      ),
    },
    {
      term: 'Contact',
      value: (
        <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all">
          {companyInfo.supportEmail}
        </a>
      ),
    },
    {
      term: 'Articles published',
      value: `${authored.length}`,
    },
  ];

  return (
    <>
      <JsonLd data={schema} />

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
              { label: author.name },
            ]}
          />
          <div className="hero-stagger mt-10 max-w-3xl">
            <p className="eyebrow">Author</p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
              {author.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-500">{author.relationship}</p>
          </div>
        </div>
      </section>

      <section className="section-padding !pt-4" aria-label={`About ${author.name} as an author`}>
        <div className="container-narrow mx-auto space-y-16 leading-relaxed text-ink-600">
          <div>
            <dl className="divide-y divide-ink-100 border-y border-ink-100">
              {facts.map((fact) => (
                <div key={fact.term} className="grid gap-1 py-3.5 sm:grid-cols-[15rem,1fr] sm:gap-6">
                  <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-500">{fact.term}</dt>
                  <dd className="text-ink-950">{fact.value}</dd>
                </div>
              ))}
              <div className="grid gap-1 py-3.5 sm:grid-cols-[15rem,1fr] sm:gap-6">
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-500">Profiles</dt>
                <dd className="text-ink-950">
                  <ul className="space-y-1">
                    {author.sameAs.map((profile) => (
                      <li key={profile.url}>
                        {profile.url.startsWith('https://play.google.com/') ? (
                          <PlayStoreLink href={profile.url} buttonLocation="article_top" className="link-accent">
                            {profile.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </PlayStoreLink>
                        ) : (
                          <a href={profile.url} className="link-accent" rel="noopener noreferrer me">
                            {profile.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          {author.kind === 'organization' && (
            <div>
              <h2 className={h2}>Why the byline is a company</h2>
              <GoldDivider className="mt-5" />
              <p className="mt-6">
                Articles on this site are published under the company&apos;s name rather than an
                individual&apos;s. {author.name} is accountable for every one of them: for what it
                says, for correcting it when it is wrong, and for disclosing that we make the apps it
                links to. We will only put a person&apos;s name on an article if that person agreed to
                it and the byline describes their role accurately.
              </p>
            </div>
          )}

          <div>
            <h2 className={h2}>How the articles are made</h2>
            <GoldDivider className="mt-5" />
            <ol className="ml-5 mt-6 list-decimal space-y-4">
              <li>
                <strong className="text-ink-950">Topics</strong> come from the subjects our apps deal
                with — the history the timeline covers, the methods the mental-math games practise, the
                rules our sports simulators model — and from the questions people search for about
                them.
              </li>
              <li>
                <strong className="text-ink-950">Drafting.</strong> We use AI tools to help research,
                draft and edit. Details about our apps come from each app&apos;s catalog record, which
                is copied from its live Google Play listing; everything else comes from published
                sources, listed at the end of the article.
              </li>
              <li>
                <strong className="text-ink-950">Automated checks</strong> run before anything is
                published. Cited sources must resolve; claims about our apps must match the catalog;
                medical promises, invented statistics, ranking guarantees and unreleased app names are
                blocked; and each article is compared with the rest of the site to catch duplicated
                text.
              </li>
              <li>
                <strong className="text-ink-950">A person approves every new article.</strong> Every
                article published after {gateDate} is read in full and approved by a person at{' '}
                {companyInfo.name} before release, and new articles go out no more than one a day.
                Articles published on or before that date passed the automated checks, but not every
                one of them was read in full by a person before it went live.
              </li>
              <li>
                <strong className="text-ink-950">No expert review is implied.</strong> No article is
                reviewed by a doctor, dietitian, teacher, historian, linguist or other independent
                expert unless the reviewer is named on the article. None currently is.
              </li>
            </ol>
          </div>

          <div>
            <h2 className={h2}>Sources, corrections and dates</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6">
              Every article lists its sources at the end, with the date each was accessed. If you find
              an error, email{' '}
              <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all">
                {companyInfo.supportEmail}
              </a>{' '}
              or use the{' '}
              <Link href="/support/" className="link-accent">
                support page
              </Link>
              . Confirmed errors are fixed, and a correction that changes what an article says is
              listed on that article with its date.
            </p>
            <p className="mt-4">
              The published date is the day an article went live and is never moved earlier. The
              &ldquo;Updated&rdquo; date appears only after a real change to the content — not when we
              add a link to an article or re-save the file. The full rules are in the{' '}
              <Link href="/editorial-policy/" className="link-accent">
                editorial policy
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className={h2}>We make the apps we write about</h2>
            <GoldDivider className="mt-5" />
            <p className="mt-6">
              {companyInfo.name} publishes its Android apps on Google Play as{' '}
              {companyInfo.developerName}. When an article recommends or explains one of them, we have
              a direct commercial interest in you installing it, and each article says so near the
              top. Comparisons with other companies&apos; apps follow extra rules, set out in the{' '}
              <Link href="/editorial-policy/#comparisons" className="link-accent">
                editorial policy
              </Link>
              . More about the company is on the{' '}
              <Link href="/about/" className="link-accent">
                About page
              </Link>
              , and the full catalog is on the{' '}
              <Link href="/apps/" className="link-accent">
                apps page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding !pt-0" aria-labelledby="recent-articles-heading">
        <div className="container-wide mx-auto">
          <GoldDivider className="mb-14" />
          <h2 id="recent-articles-heading" className="display-title text-2xl sm:text-3xl">
            Recent articles
          </h2>
          <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <li key={post.slug} className="h-full">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>

          {hubs.length > 0 && (
            <nav aria-label="Topic hubs" className="mt-14">
              <h2 className="eyebrow">Browse by topic</h2>
              <ul className="mt-4 flex list-none flex-wrap gap-3 p-0">
                {hubs.map((hub) => (
                  <li key={hub.id}>
                    <Link
                      href={`/blog/topics/${hub.id}/`}
                      className="inline-flex items-center rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-300 hover:border-gold-400 hover:text-ink-950"
                    >
                      {hub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <nav aria-label="Article categories" className="mt-10">
            <h2 className="eyebrow">Browse by category</h2>
            <ul className="mt-4 flex list-none flex-wrap gap-3 p-0">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/blog/category/${category.id}/`}
                    className="inline-flex items-center rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-300 hover:border-gold-400 hover:text-ink-950"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 text-center">
            <Link href="/blog/" className="btn-outline">
              All {authored.length} articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
