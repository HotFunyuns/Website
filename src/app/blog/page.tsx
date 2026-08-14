import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import GoldDivider from '@/components/GoldDivider';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import BlogCard from '@/components/blog/BlogCard';
import BlogExplorer from '@/components/blog/BlogExplorer';
import { companyInfo } from '@/data/apps';
import { blogCategories, featuredPosts, posts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Android App Guides',
  description:
    'Guides to the Android apps we build: sports GM and career sims, beginner language courses, nutrition trackers, arcade games, and learning tools.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: `Blog — Android App Guides | ${companyInfo.name}`,
    description:
      'Guides to the Android apps we build: sports sims, language courses, nutrition trackers, arcade games and learning tools.',
    url: `${companyInfo.siteUrl}/blog/`,
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

export default function BlogIndexPage() {
  const categories = blogCategories();
  const featured = featuredPosts.slice(0, 3);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const rest = posts.filter((p) => !featuredSlugs.has(p.slug));

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${companyInfo.siteUrl}/blog/#blog`,
    name: `${companyInfo.name} Blog`,
    url: `${companyInfo.siteUrl}/blog/`,
    description:
      'Guides to the Android apps built by Reign Creative LLC, covering sports simulation, language learning, nutrition tracking and arcade games.',
    inLanguage: 'en-US',
    publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${companyInfo.siteUrl}/blog/${post.slug}/`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />

      <PageHeader
        eyebrow="The Blog"
        title={
          <>
            App guides &amp; <em className="gold-text not-italic">deep dives</em>
          </>
        }
        description="How our Android apps work, who they are for, and what to expect before you install — written by the team that builds them."
      />

      <section className="section-padding !pt-6" aria-label="Articles">
        <div className="container-wide mx-auto">
          {posts.length === 0 ? (
            <div className="card-premium px-8 py-16 text-center sm:px-14">
              <h2 className="display-title text-2xl sm:text-3xl">Articles are on the way</h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-500">
                We are writing guides for every app in the catalog. In the meantime, browse the apps
                themselves — each one has a full detail page.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/apps/" className="btn-primary btn-sm">
                  Browse the apps
                </Link>
                <Link href="/support/" className="btn-outline btn-sm">
                  Suggest a topic
                </Link>
              </div>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <section aria-labelledby="featured-articles-heading" className="mb-16">
                  <h2 id="featured-articles-heading" className="eyebrow">
                    Featured
                  </h2>
                  <ul className="mt-6 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((post, i) => (
                      <li key={post.slug} className="h-full">
                        <Reveal delay={i * 80} className="h-full">
                          <BlogCard post={post} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                  <GoldDivider className="mt-16" />
                </section>
              )}

              <nav aria-label="Article categories" className="mb-10">
                <h2 className="eyebrow">Browse by category</h2>
                <ul className="mt-4 flex list-none flex-wrap gap-3 p-0">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/blog/category/${category.id}/`}
                        className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-ink-950"
                      >
                        {category.label}
                        <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink-500">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <BlogExplorer
                posts={rest}
                filters={categories
                  .map((category) => ({
                    id: category.id,
                    label: category.shortLabel,
                    count: rest.filter((p) => p.category === category.id).length,
                  }))
                  .filter((f) => f.count > 0)}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
