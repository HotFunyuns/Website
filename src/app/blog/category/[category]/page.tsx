import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoldDivider from '@/components/GoldDivider';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import BlogCard from '@/components/blog/BlogCard';
import { companyInfo, countByCategory, getCategory, type CategoryId } from '@/data/apps';
import { blogCategories, getPostsByCategory } from '@/lib/blog';

export const dynamicParams = false;

/** Only categories that actually hold a published article get a page, so the
 *  site never ships an empty listing for crawlers to index. */
export function generateStaticParams() {
  return blogCategories().map((category) => ({ category: category.id }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category as CategoryId);
  if (!category) return {};

  const canonical = `/blog/category/${category.id}/`;
  const title = `${category.label} Articles`;
  const description = `Guides and deep dives on ${category.label.toLowerCase()} from ${companyInfo.name}, the studio behind the apps.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${companyInfo.name}`,
      description,
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'website',
    },
  };
}

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category as CategoryId);
  if (!category) notFound();

  const categoryPosts = getPostsByCategory(category.id);
  if (categoryPosts.length === 0) notFound();

  const siblings = blogCategories().filter((c) => c.id !== category.id);
  const appsInCategory = countByCategory(category.id);

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.label} Articles`,
    url: `${companyInfo.siteUrl}/blog/category/${category.id}/`,
    isPartOf: { '@id': `${companyInfo.siteUrl}/blog/#blog` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categoryPosts.length,
      itemListElement: categoryPosts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
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
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog/' },
              { label: category.shortLabel },
            ]}
          />

          <div className="hero-stagger mt-10 max-w-3xl">
            <p className="eyebrow">
              {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'}
            </p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
              {category.label}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">{category.blurb}</p>
            {appsInCategory > 0 && (
              <p className="mt-4 text-sm text-ink-500">
                Covering{' '}
                <Link href={`/apps/category/${category.id}/`} className="link-accent">
                  {appsInCategory} {appsInCategory === 1 ? 'app' : 'apps'} in this category
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding !pt-4" aria-label={`${category.label} articles`}>
        <div className="container-wide mx-auto">
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {categoryPosts.map((post, i) => (
              <li key={post.slug} className="h-full">
                <Reveal delay={i * 60} className="h-full">
                  <BlogCard post={post} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
          </ul>

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
