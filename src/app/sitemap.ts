import type { MetadataRoute } from 'next';
import { apps, activeCategories, companyInfo, getAppsByCategory } from '@/data/apps';
import { blogCategories, getPostsByCategory, posts } from '@/lib/blog';

export const dynamic = 'force-static';

const toDate = (day: string) => new Date(`${day}T00:00:00Z`);
const newest = (days: string[]) => days.reduce((a, b) => (a > b ? a : b));

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = companyInfo.siteUrl;

  // Every lastModified below is derived from a date we actually record — an
  // app's lastVerified or a post's updatedAt. Stamping build time instead
  // tells crawlers every page changed on every deploy, which teaches them to
  // ignore the field. Pages with no such signal omit it rather than invent one.
  const appsUpdated = newest(apps.map((app) => app.lastVerified));
  const postsUpdated = newest(posts.map((post) => post.updatedAt));
  const siteUpdated = newest([appsUpdated, postsUpdated]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: toDate(siteUpdated),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/apps/`,
      lastModified: toDate(appsUpdated),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: toDate(postsUpdated),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: `${baseUrl}/about/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/support/`, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: `${baseUrl}/press/`,
      lastModified: toDate(appsUpdated),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    { url: `${baseUrl}/editorial-policy/`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/app-support/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy/`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms/`, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = activeCategories.map((category) => ({
    url: `${baseUrl}/apps/category/${category.id}/`,
    lastModified: toDate(newest(getAppsByCategory(category.id).map((app) => app.lastVerified))),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const appPages: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${baseUrl}/apps/${app.slug}/`,
    lastModified: toDate(app.lastVerified),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories().map((category) => ({
    url: `${baseUrl}/blog/category/${category.id}/`,
    lastModified: toDate(newest(getPostsByCategory(category.id).map((post) => post.updatedAt))),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // `posts` excludes drafts, reviews and future-dated articles, so nothing
  // unpublished can reach the sitemap even if it exists on disk.
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: toDate(post.updatedAt),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.8 : 0.7,
  }));

  return [...staticPages, ...categoryPages, ...appPages, ...blogCategoryPages, ...postPages];
}
