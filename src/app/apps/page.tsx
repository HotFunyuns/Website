import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AppsExplorer from '@/components/AppsExplorer';
import GooglePlayButton from '@/components/GooglePlayButton';
import Reveal from '@/components/Reveal';
import GoldDivider from '@/components/GoldDivider';
import JsonLd from '@/components/JsonLd';
import { apps, companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Our Apps — Games, Education & Fitness for Android',
  description:
    'Browse every Reign Creative LLC app on Google Play: arcade and sports games, anime coloring, world history, plus protein and keto diet trackers for Android.',
  alternates: { canonical: '/apps/' },
  openGraph: {
    title: 'Our Apps — Games, Education & Fitness for Android | Reign Creative LLC',
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
        description="Every app we've published for Android — games, learning experiences, and health & fitness tools. All free to download on Google Play."
      />

      <section className="section-padding !pt-6" aria-label="App catalog">
        <div className="container-wide mx-auto">
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
