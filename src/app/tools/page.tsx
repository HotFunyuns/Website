import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ToolCard from '@/components/tools/ToolCard';
import { companyInfo } from '@/data/apps';
import { sportPath, sports } from '@/data/sports';
import { toolPath, tools, toolsIndexCopy } from '@/tools/registry';

const canonical = '/tools/';

export const metadata: Metadata = {
  title: { absolute: toolsIndexCopy.metaTitle },
  description: toolsIndexCopy.metaDescription,
  alternates: { canonical },
  openGraph: {
    title: `${toolsIndexCopy.metaTitle} | ${companyInfo.name}`,
    description: toolsIndexCopy.metaDescription,
    url: `${companyInfo.siteUrl}${canonical}`,
    type: 'website',
    images: [
      {
        url: `${companyInfo.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `Sports calculators from ${companyInfo.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolsIndexCopy.metaTitle} | ${companyInfo.name}`,
    description: toolsIndexCopy.metaDescription,
  },
};

/** Groups in sport order, with the cross-sport calculators last. */
function groups() {
  const bySport = sports
    .map((sport) => ({
      id: sport.id,
      title: sport.label,
      hub: sportPath(sport),
      tools: tools.filter((tool) => tool.sport === sport.id),
    }))
    .filter((group) => group.tools.length > 0);
  const multi = tools.filter((tool) => tool.sport === 'multi-sport');
  return multi.length > 0
    ? [...bySport, { id: 'multi-sport', title: 'Any sport', hub: '/sports/', tools: multi }]
    : bySport;
}

export default function ToolsIndexPage() {
  const url = `${companyInfo.siteUrl}${canonical}`;
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#page`,
    name: toolsIndexCopy.heading,
    description: toolsIndexCopy.metaDescription,
    url,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
    publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${companyInfo.siteUrl}${toolPath(tool)}`,
        name: tool.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />

      <section className="relative overflow-hidden bg-white pb-12 pt-32 sm:pt-40">
        <div className="hero-streaks opacity-60" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_30%_20%,black,transparent)]"
        />
        <div className="container-wide relative mx-auto px-5 sm:px-8 lg:px-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tools' }]} />
          <div className="hero-stagger mt-10 max-w-3xl">
            <p className="eyebrow">Tools · {tools.length} calculators</p>
            <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
              {toolsIndexCopy.heading}
            </h1>
            {toolsIndexCopy.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-6 text-lg leading-relaxed text-ink-500">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding !pt-4">
        <div className="container-wide mx-auto">
          <section aria-labelledby="questions-heading" className="mb-16">
            <h2 id="questions-heading" className="display-title text-2xl sm:text-3xl">
              Which calculator do you need?
            </h2>
            <p className="mt-3 max-w-2xl text-ink-500">
              Start from the question you are trying to answer. Each calculator shows its formula and a worked example,
              so you can check the answer by hand.
            </p>
            <div className="table-scroll mt-6" role="region" aria-label="Questions and the calculator that answers each" tabIndex={0}>
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-ink-500">
                    <th scope="col" className="py-2 pr-4 font-semibold">If you want to know…</th>
                    <th scope="col" className="py-2 font-semibold">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {toolsIndexCopy.questions.map(({ question, tool: id }) => {
                    const tool = tools.find((t) => t.id === id);
                    if (!tool) return null;
                    return (
                      <tr key={id} className="border-b border-ink-100 align-top">
                        <td className="py-2.5 pr-4 text-ink-700">{question}</td>
                        <td className="py-2.5">
                          <Link href={toolPath(tool)} className="link-accent">
                            {tool.shortTitle}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {groups().map((group) => (
            <section key={group.id} aria-labelledby={`tools-${group.id}`} className="mb-16">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2 id={`tools-${group.id}`} className="display-title text-2xl sm:text-3xl">
                  {group.title}
                </h2>
                <Link href={group.hub} className="link-accent text-sm">
                  {group.id === 'multi-sport' ? 'All sport hubs →' : `${group.title} hub →`}
                </Link>
              </div>
              <ul className="mt-6 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {group.tools.map((tool) => (
                  <li key={tool.id} className="h-full">
                    <ToolCard tool={tool} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section aria-labelledby="method-heading" className="card-premium p-6 sm:p-10">
            <h2 id="method-heading" className="display-title text-2xl sm:text-3xl">
              How these calculators are built
            </h2>
            <ul className="mt-6 ml-5 list-disc space-y-3 leading-relaxed text-ink-600">
              {toolsIndexCopy.method.map((point) => (
                <li key={point.slice(0, 40)}>{point}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink-500">
              Mistakes can be reported through the{' '}
              <Link href="/support/" className="link-accent">
                support page
              </Link>
              ; how corrections are handled is set out in the{' '}
              <Link href="/editorial-policy/" className="link-accent">
                editorial policy
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
