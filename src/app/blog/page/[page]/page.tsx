import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import BlogCard from '@/components/blog/BlogCard';
import Pagination, { listingPath } from '@/components/blog/Pagination';
import { companyInfo } from '@/data/apps';
import { LISTING_PAGE_SIZE, blogCategories, guidePosts, pageCount, pageOf } from '@/lib/blog';

export const dynamicParams = false;

/** Pages 2…N of the full article list. Page 1 is /blog/ itself. */
export function generateStaticParams() {
  const pages = pageCount(guidePosts);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

function resolve(raw: string) {
  const page = Number(raw);
  if (!Number.isInteger(page) || page < 2 || page > pageCount(guidePosts)) return null;
  return page;
}

export function generateMetadata({ params }: { params: { page: string } }): Metadata {
  const page = resolve(params.page);
  if (!page) return {};
  const pages = pageCount(guidePosts);
  const from = (page - 1) * LISTING_PAGE_SIZE + 1;
  const to = Math.min(page * LISTING_PAGE_SIZE, guidePosts.length);
  const canonical = listingPath('/blog/', page);
  const title = `All Articles — Page ${page}`;
  const description = `Page ${page} of ${pages} of every guide published by ${companyInfo.name}: articles ${from}–${to} of ${guidePosts.length}, newest first.`;
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
          alt: `${companyInfo.name} blog`,
        },
      ],
    },
  };
}

export default function BlogPagedPage({ params }: { params: { page: string } }) {
  const page = resolve(params.page);
  if (!page) notFound();
  const pages = pageCount(guidePosts);
  const items = pageOf(guidePosts, page);
  const from = (page - 1) * LISTING_PAGE_SIZE + 1;
  const to = from + items.length - 1;
  const categories = blogCategories();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `All Articles — Page ${page}`,
    url: `${companyInfo.siteUrl}${listingPath('/blog/', page)}`,
    isPartOf: { '@id': `${companyInfo.siteUrl}/blog/#blog` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((post, i) => ({
        '@type': 'ListItem',
        position: from + i,
        url: `${companyInfo.siteUrl}/blog/${post.slug}/`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden bg-white pb-10 pt-32 sm:pt-40">
        <div className="hero-streaks opacity-60" aria-hidden="true" />
        <div className="container-wide relative mx-auto px-5 sm:px-8 lg:px-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog/' },
              { label: `Page ${page}` },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow">
              Page {page} of {pages}
            </p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
              All articles, page {page}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
              Articles {from}–{to} of {guidePosts.length}, newest first. To read by subject instead, start from a
              category or a topic hub on{' '}
              <Link href="/blog/" className="link-accent">
                the blog’s front page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding !pt-4" aria-label={`Articles ${from} to ${to}`}>
        <div className="container-wide mx-auto">
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <li key={post.slug} className="h-full">
                <BlogCard post={post} headingLevel="h2" />
              </li>
            ))}
          </ul>
          <Pagination basePath="/blog/" page={page} pages={pages} label="All articles, more pages" />
          <nav aria-label="Article categories" className="mt-14">
            <h2 className="eyebrow">Browse by category</h2>
            <ul className="mt-4 flex list-none flex-wrap gap-3 p-0">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/blog/category/${category.id}/`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-950"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
