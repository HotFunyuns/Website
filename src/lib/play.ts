import type { AppInfo } from '@/data/apps';

export const UTM_SOURCE = 'reigncreative_blog';
export const UTM_MEDIUM = 'organic_content';

/**
 * Play passes the `referrer` value through to the Install Referrer API, so it has
 * to arrive as a single percent-encoded query string rather than as sibling
 * parameters. Campaign is the app, content is the article that sent the visitor —
 * never anything that could identify a person.
 */
export function playUrlWithReferrer(app: AppInfo, articleSlug: string): string {
  const referrer = new URLSearchParams({
    utm_source: UTM_SOURCE,
    utm_medium: UTM_MEDIUM,
    utm_campaign: app.slug,
    utm_content: articleSlug,
  }).toString();

  const url = new URL(app.playStoreUrl);
  url.searchParams.set('referrer', referrer);
  return url.toString();
}
