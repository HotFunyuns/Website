import type { Metadata } from 'next';
import Link from 'next/link';
import type { ComponentType } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqSection from '@/components/FaqSection';
import GoldDivider from '@/components/GoldDivider';
import JsonLd from '@/components/JsonLd';
import ArticleAppCta from '@/components/blog/ArticleAppCta';
import BlogCard from '@/components/blog/BlogCard';
import { formatPostDate } from '@/components/blog/format';
import ToolCard from '@/components/tools/ToolCard';
import ToolSources from '@/components/tools/ToolSources';
import { companyInfo, getAppBySlug } from '@/data/apps';
import { getSport, sportPath } from '@/data/sports';
import { getPostBySlug } from '@/lib/blog';
import { fillToolApp, getToolById, toolPath, type ToolMeta } from '@/tools/registry';

/**
 * The page every calculator shares. A tool's route
 * (src/app/tools/<sport>/<id>/page.tsx) passes in its data and its two
 * components; everything else — breadcrumbs, dates, the method note, the app
 * call to action, FAQs, sources, related guides, structured data — is here, so
 * every tool page follows the same rules.
 */
export function toolMetadata(tool: ToolMeta): Metadata {
  const canonical = toolPath(tool);
  return {
    // Absolute, like articles: the site-wide suffix would push these titles
    // past the width a result shows. The og/twitter titles carry the brand.
    title: { absolute: tool.metaTitle },
    description: tool.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${tool.metaTitle} | ${companyInfo.name}`,
      description: tool.metaDescription,
      url: `${companyInfo.siteUrl}${canonical}`,
      type: 'website',
      images: [
        {
          url: `${companyInfo.siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.metaTitle} | ${companyInfo.name}`,
      description: tool.metaDescription,
    },
  };
}

export default function ToolPage({
  tool,
  Calculator,
  Explainer,
}: {
  tool: ToolMeta;
  Calculator: ComponentType;
  Explainer: ComponentType;
}) {
  const app = getAppBySlug(tool.primaryApp);
  if (!app) throw new Error(`src/tools/${tool.id}/meta.ts — primaryApp "${tool.primaryApp}" is not in the catalog`);

  // A related article that is missing or unpublished fails the build rather
  // than quietly disappearing from the page — the rule articles follow too.
  const relatedPosts = tool.relatedArticles.map((slug) => {
    const post = getPostBySlug(slug);
    if (!post) throw new Error(`src/tools/${tool.id}/meta.ts — "${slug}" is not a published article`);
    return post;
  });
  const relatedTools = tool.relatedTools.map((id) => getToolById(id)).filter((t): t is ToolMeta => Boolean(t));

  const sport = tool.sport === 'multi-sport' ? undefined : getSport(tool.sport);
  const hub = sport
    ? { href: sportPath(sport), label: `${sport.shortLabel} hub` }
    : { href: '/sports/', label: 'sports hubs' };
  const url = `${companyInfo.siteUrl}${toolPath(tool)}`;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#page`,
    url,
    name: tool.title,
    description: tool.metaDescription,
    inLanguage: 'en-US',
    datePublished: tool.publishedAt,
    dateModified: tool.updatedAt,
    isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
    publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={faqSchema} />

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
              { label: 'Tools', href: '/tools/' },
              { label: tool.title },
            ]}
          />

          <p className="eyebrow mt-10">{sport ? sport.label : 'Any sport'} · Calculator</p>
          <h1 className="display-title mt-5 text-balance text-4xl leading-[1.12] sm:text-5xl">{tool.title}</h1>
          {tool.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-6 text-lg leading-relaxed text-ink-500">
              {paragraph}
            </p>
          ))}

          <p className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-400">
            <span>
              By{' '}
              <Link
                href="/about/"
                className="font-medium text-ink-600 underline-offset-2 hover:text-crimson-600 hover:underline"
              >
                {companyInfo.name}
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Published <time dateTime={tool.publishedAt}>{formatPostDate(tool.publishedAt)}</time>
            </span>
            {tool.updatedAt !== tool.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={tool.updatedAt}>{formatPostDate(tool.updatedAt)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>
              More in the{' '}
              <Link href={hub.href} className="link-accent">
                {hub.label}
              </Link>
            </span>
          </p>
        </div>
      </section>

      <div className="container-narrow mx-auto px-5 pb-20 sm:px-8">
        <Calculator />

        <Explainer />

        <aside
          aria-label="How this page was made"
          className="mt-14 rounded-2xl border border-ink-200 bg-cream-100 p-6 text-sm leading-relaxed text-ink-600 sm:p-7"
        >
          <p className="font-display text-base font-semibold text-ink-950">How this page was made</p>
          <p className="mt-2">
            The formulas come from the sources listed below, checked on the date shown beside each one. The calculator
            and the worked examples run on the same code, which is tested against those sources’ own published
            examples. The explanations were drafted with AI assistance and have not been reviewed by a person. Results
            describe past performance; they are not predictions or betting guidance.{' '}
            <Link href="/editorial-policy/" className="link-accent">
              Editorial policy
            </Link>
            {' · '}
            <Link href="/support/" className="link-accent">
              Report a mistake
            </Link>
          </p>
        </aside>

        <p className="mt-12 text-base leading-relaxed text-ink-600">{fillToolApp(tool.appContext, tool)}</p>
        <ArticleAppCta app={app} articleSlug={`tool-${tool.id}`} buttonLocation="related_apps" />
        <p className="-mt-6 text-xs leading-relaxed text-ink-400">
          {companyInfo.name} makes {app.name}, so we have a commercial interest in it. It is not affiliated with, or
          endorsed by, any league, team, players’ association or athlete.
        </p>

        <section className="mt-14" aria-label={`${tool.title} frequently asked questions`}>
          <FaqSection faqs={tool.faqs} title="Frequently asked questions" />
        </section>

        <ToolSources sources={tool.sources} />

        {/* Calculators cite league and governing-body formulas by name; say once
            what that use does and does not mean, as the sports guides do. */}
        <p className="mt-8 text-xs leading-relaxed text-ink-400" data-sports-notice="">
          League, governing-body and team names appear here only to identify the formulas and rules being
          used. {companyInfo.name}&apos;s sports games and calculators are not affiliated with, endorsed by
          or licensed by any league, team, players&apos; association or athlete, and all names and marks
          belong to their owners.
        </p>

        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-guides-heading" className="mt-14">
            <GoldDivider className="mb-12" />
            <h2 id="related-guides-heading" className="display-title text-2xl sm:text-3xl">
              Related guides
            </h2>
            <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2">
              {relatedPosts.map((post) => (
                <li key={post.slug} className="h-full">
                  <BlogCard post={post} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section aria-labelledby="related-tools-heading" className="mt-14">
            <h2 id="related-tools-heading" className="display-title text-2xl sm:text-3xl">
              Other calculators
            </h2>
            <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2">
              {relatedTools.map((related) => (
                <li key={related.id} className="h-full">
                  <ToolCard
                    tool={related}
                    label={related.sport === 'multi-sport' ? 'Any sport' : getSport(related.sport)?.shortLabel}
                  />
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <Link href="/tools/" className="btn-outline">
                All sports calculators
              </Link>
            </p>
          </section>
        )}
      </div>
    </>
  );
}
