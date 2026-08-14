import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AppsExplorer from '@/components/AppsExplorer';
import GooglePlayButton from '@/components/GooglePlayButton';
import Reveal from '@/components/Reveal';
import GoldDivider from '@/components/GoldDivider';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import { apps, activeCategories, appCount, companyInfo, countByCategory } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Android Apps — Games, Education & Fitness',
  description:
    'Browse every Reign Creative LLC app on Google Play: arcade and sports games, anime coloring, world history, plus protein and keto diet trackers for Android.',
  alternates: { canonical: '/apps/' },
  openGraph: {
    title: 'Android Apps — Games, Education & Fitness | Reign Creative LLC',
    description:
      'Browse every Reign Creative LLC app on Google Play: games, education, and health & fitness apps for Android.',
    url: `${companyInfo.siteUrl}/apps/`,
    images: [
      {
        url: `${companyInfo.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Reign Creative LLC — Premium Mobile Apps for Android',
      },
    ],
  },
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Reign Creative LLC Apps',
  url: `${companyInfo.siteUrl}/apps/`,
  description:
    'The complete catalog of Reign Creative LLC mobile apps for Android, available on Google Play.',
  isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
  about: apps.map((app) => ({
    '@type': 'SoftwareApplication',
    name: app.name,
    operatingSystem: 'Android',
    applicationCategory: app.schemaCategory,
    url: `${companyInfo.siteUrl}/apps/${app.slug}/`,
  })),
};

export default function AppsPage() {
  return (
    <>
      <JsonLd data={collectionSchema} />

      <PageHeader
        eyebrow="The Catalog"
        title={
          <>
            Our <em className="gold-text not-italic">Apps</em>
          </>
        }
        description={`All ${appCount} apps we've published for Android — games, learning experiences, language courses, and health tools. Every one is free to download on Google Play.`}
      />

      <section className="section-padding !pt-6" aria-label="App catalog">
        <div className="container-wide mx-auto">
          <nav aria-label="App categories" className="mb-10">
            <h2 className="eyebrow">Browse by category</h2>
            <ul className="mt-4 flex list-none flex-wrap gap-3 p-0">
              {activeCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/apps/category/${category.id}/`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-ink-950"
                  >
                    {category.label}
                    <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink-500">
                      {countByCategory(category.id)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <AppsExplorer />

          <GoldDivider className="mt-20" />

          <Reveal className="mt-14 text-center">
            <h2 className="display-title text-2xl sm:text-3xl">
              Prefer to browse on Google Play?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
              Our full developer catalog — including future releases — lives on our official
              Google Play page.
            </p>
            <div className="mt-7 flex justify-center">
              <GooglePlayButton
                href={companyInfo.developerPageUrl}
                buttonLocation="article_bottom"
                label="All Apps on Google Play"
                variant="gold"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
