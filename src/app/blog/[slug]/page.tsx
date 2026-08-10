import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqSection from '@/components/FaqSection';
import GoldDivider from '@/components/GoldDivider';
import JsonLd from '@/components/JsonLd';
import ArticleAppCta from '@/components/blog/ArticleAppCta';
import ArticleDisclaimer from '@/components/blog/ArticleDisclaimer';
import ArticleSources from '@/components/blog/ArticleSources';
import ArticleToc from '@/components/blog/ArticleToc';
import BlogCard from '@/components/blog/BlogCard';
import { formatPostDate } from '@/components/blog/format';
import { companyInfo, getCategory } from '@/data/apps';
import {
  getPostApps,
  getPostBySlug,
  getPostNeighbours,
  getRelatedPosts,
  posts,
} from '@/lib/blog';
import { renderMarkdown } from '@/lib/blog/markdown';

export const dynamicParams = false;

/** Only published posts get a route, so drafts cannot be reached by URL guessing. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const canonical = `/blog/${post.slug}/`;
  return {
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical },
    ...(post.noindex ? { robots: { index: false, follow: false } } : {}),
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.metaTitle} | ${companyInfo.name}`,
      description: post.description,
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [
        {
          url: `${companyInfo.siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.metaTitle} | ${companyInfo.name}`,
      description: post.description,
    },
  };
}

/**
 * Drops a CTA at the heading nearest the article's midpoint. Splitting the
 * rendered HTML keeps the Markdown source free of layout concerns, and the
 * boundary is always a top-level section break rather than mid-paragraph.
 */
function splitAtMiddleHeading(html: string): [string, string] {
  const offsets: number[] = [];
  const pattern = /<h2[\s>]/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) offsets.push(match.index);
  if (offsets.length < 4) return [html, ''];
  const boundary = offsets[Math.floor(offsets.length / 2)];
  return [html.slice(0, boundary), html.slice(boundary)];
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const relatedApps = getPostApps(post);
  const relatedPosts = getRelatedPosts(post);
  const { previous, next } = getPostNeighbours(post);
  const primaryApp = relatedApps[0];

  const html = await renderMarkdown(post.body);
  const [firstHalf, secondHalf] = splitAtMiddleHeading(html);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${companyInfo.siteUrl}/blog/${post.slug}/`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${companyInfo.siteUrl}/blog/${post.slug}/` },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    wordCount: post.wordCount,
    inLanguage: 'en-US',
    // Named to match the visible byline exactly, and pointed at the policy that
    // states who writes these and what has not been expert-reviewed.
    author: {
      '@type': 'Organization',
      name: post.author,
      url: `${companyInfo.siteUrl}/editorial-policy/`,
    },
    publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
    image: `${companyInfo.siteUrl}/opengraph-image.png`,
    ...(post.sources.length > 0
      ? { citation: post.sources.map((source) => ({ '@type': 'CreativeWork', name: source.title, url: source.url })) }
      : {}),
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <section className="relative overflow-hidden bg-white pb-10 pt-32 sm:pt-40">
        <div className="hero-streaks opacity-50" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_40%_10%,black,transparent)]"
        />
        <div className="container-narrow relative mx-auto px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog/' },
              ...(category
                ? [{ label: category.shortLabel, href: `/blog/category/${category.id}/` }]
                : []),
              { label: post.title },
            ]}
          />

          <h1 className="display-title mt-10 text-balance text-4xl leading-[1.12] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-500">{post.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-400">
            <span className="font-medium text-ink-600">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
            {post.updatedAt !== post.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="container-wide mx-auto px-5 pb-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),19rem] lg:gap-14">
          <article className="min-w-0">
            <ArticleDisclaimer kind={post.disclaimer} researchDate={post.researchDate} />

            {post.takeaways.length > 0 && (
              <section
                aria-labelledby="takeaways-heading"
                className="rounded-2xl border border-ink-200 bg-cream-100 p-6 sm:p-7"
              >
                <h2 id="takeaways-heading" className="font-display text-base font-semibold text-ink-950">
                  Key takeaways
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {post.takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div
              className="prose prose-lg mt-10 prose-headings:font-display prose-headings:font-semibold prose-h2:mt-12 prose-h2:text-3xl prose-h3:text-xl prose-a:font-medium prose-a:underline-offset-2 prose-table:text-sm"
              dangerouslySetInnerHTML={{ __html: firstHalf }}
            />

            {primaryApp && secondHalf && (
              <ArticleAppCta
                app={primaryApp}
                articleSlug={post.slug}
                buttonLocation="article_middle"
              />
            )}

            {secondHalf && (
              <div
                className="prose prose-lg prose-headings:font-display prose-headings:font-semibold prose-h2:mt-12 prose-h2:text-3xl prose-h3:text-xl prose-a:font-medium prose-a:underline-offset-2 prose-table:text-sm"
                dangerouslySetInnerHTML={{ __html: secondHalf }}
              />
            )}

            {post.faqs.length > 0 && (
              <section className="mt-14" aria-label={`${post.title} frequently asked questions`}>
                <FaqSection faqs={post.faqs} title="Frequently asked questions" />
              </section>
            )}

            <ArticleSources sources={post.sources} />

            {primaryApp && (
              <ArticleAppCta
                app={primaryApp}
                articleSlug={post.slug}
                buttonLocation="article_bottom"
                heading={`Get ${primaryApp.name} free`}
              />
            )}

            {relatedApps.length > 1 && (
              <section aria-labelledby="mentioned-apps-heading" className="mt-12">
                <h2 id="mentioned-apps-heading" className="display-title text-2xl">
                  Apps mentioned in this article
                </h2>
                <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2">
                  {relatedApps.slice(1).map((app) => (
                    <li key={app.slug}>
                      <Link
                        href={`/apps/${app.slug}/`}
                        className="card-premium-hover group flex items-center gap-4 p-5"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={app.iconSmall}
                          alt=""
                          aria-hidden="true"
                          width={48}
                          height={48}
                          loading="lazy"
                          decoding="async"
                          className="h-12 w-12 shrink-0 rounded-xl shadow-icon-tile ring-1 ring-ink-950/10"
                        />
                        <span>
                          <span className="block font-display text-base font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                            {app.name}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-ink-500">
                            {app.tagline}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(previous || next) && (
              <nav aria-label="More articles" className="mt-14 grid gap-4 border-t border-ink-200 pt-8 sm:grid-cols-2">
                {previous ? (
                  <Link href={`/blog/${previous.slug}/`} className="card-premium-hover group p-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                      Newer
                    </span>
                    <span className="mt-2 block font-display text-base font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link href={`/blog/${next.slug}/`} className="card-premium-hover group p-5 sm:text-right">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                      Older
                    </span>
                    <span className="mt-2 block font-display text-base font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                      {next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </article>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <ArticleToc entries={post.toc} />

            {primaryApp && (
              <div className="mt-6">
                <ArticleAppCta
                  app={primaryApp}
                  articleSlug={post.slug}
                  buttonLocation="article_top"
                  compact
                />
              </div>
            )}

            {category && (
              <p className="mt-6 text-sm text-ink-500">
                More in{' '}
                <Link href={`/blog/category/${category.id}/`} className="link-accent">
                  {category.label}
                </Link>
              </p>
            )}
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-articles-heading" className="mt-8">
            <GoldDivider className="mb-14" />
            <h2 id="related-articles-heading" className="display-title text-2xl sm:text-3xl">
              Keep reading
            </h2>
            <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <li key={related.slug} className="h-full">
                  <BlogCard post={related} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
