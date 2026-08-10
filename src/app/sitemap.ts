import type { MetadataRoute } from 'next';
import { apps, activeCategories, companyInfo } from '@/data/apps';
import { blogCategories, posts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = companyInfo.siteUrl;
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/apps/`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog/`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/support/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/editorial-policy/`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/app-support/`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy/`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms/`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = activeCategories.map((category) => ({
    url: `${baseUrl}/apps/category/${category.id}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const appPages: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${baseUrl}/apps/${app.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories().map((category) => ({
    url: `${baseUrl}/blog/category/${category.id}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // `posts` excludes drafts, reviews and future-dated articles, so nothing
  // unpublished can reach the sitemap even if it exists on disk.
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.8 : 0.7,
  }));

  return [...staticPages, ...categoryPages, ...appPages, ...blogCategoryPages, ...postPages];
}
