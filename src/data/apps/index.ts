import { sportsGmApps } from './catalog/sports-gm';
import { actionArcadeApps } from './catalog/action-arcade';
import { animeCreativeApps } from './catalog/anime-creative';
import { languageLearningApps } from './catalog/language-learning';
import { educationBrainApps } from './catalog/education-brain';
import { healthNutritionApps } from './catalog/health-nutrition';
import { videoUtilityApps } from './catalog/video-utility';
import { categories, type AppInfo, type CategoryId, type CategoryInfo } from './types';

export * from './types';

/**
 * Ordered so the homepage and catalog lead with variety rather than seven
 * sports titles in a row.
 */
export const apps: AppInfo[] = [
  ...healthNutritionApps,
  ...sportsGmApps,
  ...languageLearningApps,
  ...actionArcadeApps,
  ...educationBrainApps,
  ...animeCreativeApps,
  ...videoUtilityApps,
];

export const appCount = apps.length;

export function getAppBySlug(slug: string): AppInfo | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getAppByPackage(packageId: string): AppInfo | undefined {
  return apps.find((app) => app.packageId === packageId);
}

export function getAppsByCategory(categoryId: CategoryId): AppInfo[] {
  return apps.filter((app) => app.categoryId === categoryId);
}

export function getCategory(categoryId: CategoryId): CategoryInfo | undefined {
  return categories.find((c) => c.id === categoryId);
}

export function countByCategory(categoryId: CategoryId): number {
  return getAppsByCategory(categoryId).length;
}

/**
 * Same-category apps first, then the rest, so cross-promotion stays relevant.
 * Within the category the list starts at the app that follows this one, so
 * each page recommends a different set — with 24 sports apps, "the first three
 * in the category" put the same three apps on every sports page.
 */
export function getRelatedApps(app: AppInfo, count = 3): AppInfo[] {
  const peers = apps.filter((a) => a.categoryId === app.categoryId);
  const at = peers.findIndex((a) => a.slug === app.slug);
  const sameCategory = [...peers.slice(at + 1), ...peers.slice(0, Math.max(at, 0))].filter(
    (a) => a.slug !== app.slug
  );
  const others = apps.filter((a) => a.categoryId !== app.categoryId);
  return [...sameCategory, ...others].slice(0, count);
}

export const featuredApps = apps.filter((app) => app.featured);

/** Categories that actually contain at least one published app. */
export const activeCategories: CategoryInfo[] = categories.filter(
  (c) => countByCategory(c.id) > 0
);
