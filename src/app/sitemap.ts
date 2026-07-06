import type { MetadataRoute } from 'next';
import { apps, companyInfo } from '@/data/apps';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = companyInfo.siteUrl;
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/apps/`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/support/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/app-support/`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy/`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms/`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const appPages: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${baseUrl}/apps/${app.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...appPages];
}
