import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoldDivider from '@/components/GoldDivider';
import JsonLd from '@/components/JsonLd';
import BlogCard from '@/components/blog/BlogCard';
import Pagination, { listingPath } from '@/components/blog/Pagination';
import { apps, companyInfo, countByCategory, type CategoryInfo } from '@/data/apps';
import {
  LISTING_PAGE_SIZE,
  activeHubs,
  blogCategories,
  getPostsByCategory,
  mostReferencedInCategory,
  pageCount,
  pageOf,
} from '@/lib/blog';

/**
 * A category's reading list. Page 1 carries the standing introduction, the topic
 * hubs, the most-referenced guides and the per-app index; later pages carry only
 * their slice of the list. Splitting it is what keeps a category page from being
 * a near-total subset of the blog index (and from growing without limit): each
 * page lists LISTING_PAGE_SIZE articles and links the rest with plain,
 * crawlable pagination.
 */
export function categoryListingMetadata(category: CategoryInfo, page: number): Metadata {
  const posts = getPostsByCategory(category.id);
  const pages = pageCount(posts);
  const basePath = `/blog/category/${category.id}/`;
  const canonical = listingPath(basePath, page);
  const from = (page - 1) * LISTING_PAGE_SIZE + 1;
  const to = Math.min(page * LISTING_PAGE_SIZE, posts.length);
  const title = page === 1 ? `${category.label} Articles` : `${category.label} Articles — Page ${page}`;
  const description =
    page === 1
      ? `In-house guides to ${category.label} from ${companyInfo.name}. ${category.blurb}`
      : `Page ${page} of ${pages} of the ${category.shortLabel} reading list from ${companyInfo.name}: articles ${from}–${to} of ${posts.length}, newest first.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${companyInfo.name}`,
      description,
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'website',
      images: [
        {
          url: `${companyInfo.siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${category.label} articles from ${companyInfo.name}`,
        },
      ],
    },
  };
}

export default function CategoryListing({ category, page }: { category: CategoryInfo; page: number }) {
  const categoryPosts = getPostsByCategory(category.id);
  const pages = pageCount(categoryPosts);
  const pagePosts = pageOf(categoryPosts, page);
  const basePath = `/blog/category/${category.id}/`;
  const selfPath = listingPath(basePath, page);
  const isFirst = page === 1;

  const siblings = blogCategories().filter((c) => c.id !== category.id);
  const appsInCategory = countByCategory(category.id);
  const coveredApps = apps
    .map((app) => ({ app, count: categoryPosts.filter((post) => post.relatedApps[0] === app.slug).length }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count || a.app.name.localeCompare(b.app.name));
  const categoryHubs = activeHubs().filter((hub) => hub.categoryId === category.id);
  const mostReferenced = mostReferencedInCategory(category.id, 3);
  const from = (page - 1) * LISTING_PAGE_SIZE + 1;
  const to = from + pagePosts.length - 1;

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isFirst ? `${category.label} Articles` : `${category.label} Articles — Page ${page}`,
    url: `${companyInfo.siteUrl}${selfPath}`,
    isPartOf: { '@id': `${companyInfo.siteUrl}/blog/#blog` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: pagePosts.length,
      itemListElement: pagePosts.map((post, i) => ({
        '@type': 'ListItem',
        position: from + i,
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
            items={
              isFirst
                ? [
                    { label: 'Home', href: '/' },
                    { label: 'Blog', href: '/blog/' },
                    { label: category.shortLabel },
                  ]
                : [
                    { label: 'Home', href: '/' },
                    { label: 'Blog', href: '/blog/' },
                    { label: category.shortLabel, href: basePath },
                    { label: `Page ${page}` },
                  ]
            }
          />

          <div className="hero-stagger mt-10 max-w-3xl">
            <p className="eyebrow">
              {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'}
              {!isFirst && ` · page ${page} of ${pages}`}
            </p>
            {/*
              Deliberately NOT `{category.label}` and NOT `category.blurb`: this
              page and /apps/category/<id>/ once rendered the same H1 and blurb,
              which made the reading list a near-total text subset of the app
              list. The two answer different questions, so they say so.
            */}
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
              {isFirst ? `${category.shortLabel} guides` : `${category.shortLabel} guides, page ${page}`}
            </h1>
            {isFirst ? (
              <>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
                  Every article we have published on {category.shortLabel} — how these apps work, the decisions
                  behind them, and where their limits are.
                </p>
                {category.readingIntro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">
                    {paragraph}
                  </p>
                ))}
                {appsInCategory > 0 && (
                  <p className="mt-4 text-sm text-ink-500">
                    Covering{' '}
                    <Link href={`/apps/category/${category.id}/`} className="link-accent">
                      {appsInCategory} {appsInCategory === 1 ? 'app' : 'apps'} in this category
                    </Link>
                    .
                  </p>
                )}
              </>
            ) : (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
                Articles {from}–{to} of {categoryPosts.length}, newest first. The introduction to this reading list,
                its topic hubs and the guides other articles cite most are on{' '}
                <Link href={basePath} className="link-accent">
                  the first page
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding !pt-4" aria-label={`${category.label} articles`}>
        <div className="container-wide mx-auto">
          {isFirst && categoryHubs.length > 0 && (
            <nav aria-labelledby="category-hubs-heading" className="mb-14">
              <h2 id="category-hubs-heading" className="display-title text-2xl">
                Topic hubs
              </h2>
              <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {categoryHubs.map((hub) => (
                  <li key={hub.id}>
                    <Link href={`/blog/topics/${hub.id}/`} className="card-premium-hover group flex h-full flex-col p-5">
                      <span className="font-display text-base font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                        {hub.label}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-ink-500">{hub.blurb}</span>
                      <span className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-gold-600">
                        {hub.count} {hub.count === 1 ? 'article' : 'articles'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {isFirst && mostReferenced.length > 0 && categoryPosts.length > 6 && (
            <section aria-labelledby="most-referenced-heading" className="mb-14">
              <h2 id="most-referenced-heading" className="display-title text-2xl">
                Most-referenced guides
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-ink-500">
                The articles in this category that other articles link to most often.
              </p>
              <ul className="mt-6 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {mostReferenced.map((post) => (
                  <li key={post.slug} className="h-full">
                    <BlogCard post={post} headingLevel="h3" />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {isFirst && coveredApps.length > 0 && (
            <nav aria-labelledby="covered-apps-heading" className="mb-14">
              <h2 id="covered-apps-heading" className="eyebrow">
                Articles by app
              </h2>
              <ul className="mt-4 flex list-none flex-wrap gap-3 p-0">
                {coveredApps.map(({ app, count }) => (
                  <li key={app.slug}>
                    <Link
                      href={`/apps/${app.slug}/`}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-ink-950"
                    >
                      {app.name}
                      <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink-500">
                        {count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <h2 className="eyebrow mb-6">
            {isFirst ? `Newest ${category.shortLabel} articles` : `${category.shortLabel} articles ${from}–${to}`}
          </h2>
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post) => (
              <li key={post.slug} className="h-full">
                <BlogCard post={post} headingLevel="h3" />
              </li>
            ))}
          </ul>

          <Pagination
            basePath={basePath}
            page={page}
            pages={pages}
            label={`${category.shortLabel} articles, more pages`}
          />

          {siblings.length > 0 && (
            <>
              <GoldDivider className="mt-20" />
              <nav aria-label="Other article categories" className="mt-12">
                <h2 className="eyebrow">Other categories</h2>
                <ul className="mt-5 flex list-none flex-wrap gap-3 p-0">
                  {siblings.map((sibling) => (
                    <li key={sibling.id}>
                      <Link
                        href={`/blog/category/${sibling.id}/`}
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
            </>
          )}

          <div className="mt-12 text-center">
            <Link href="/blog/" className="btn-outline">
              All articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
