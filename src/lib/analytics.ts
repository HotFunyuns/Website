export const GA_MEASUREMENT_ID = 'G-JK8FPQB5L2';

/**
 * The site is a static export, so the same bundle could be served from localhost,
 * a fork's github.io subdomain, or a preview host. Gating on the live hostname is
 * the only reliable way to keep those out of the production property.
 */
const PRODUCTION_HOSTNAMES = ['reigncreativellc.com', 'www.reigncreativellc.com'];

export type ButtonLocation =
  | 'header'
  | 'hero'
  | 'app_card'
  | 'article_top'
  | 'article_middle'
  | 'article_bottom'
  | 'related_apps'
  | 'footer';

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

const ARTICLE_SLUG_PATTERN = /^\/(?:apps|blog)\/([^/]+)\/?$/;

let bootstrapped = false;
let lastPageViewPath: string | null = null;

export function isAnalyticsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return PRODUCTION_HOSTNAMES.includes(window.location.hostname);
}

function resolveGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  if (!window.dataLayer) window.dataLayer = [];
  if (typeof window.gtag !== 'function') {
    // Mirrors the official gtag.js snippet: queued commands are replayed in order
    // once the library loads, so events sent before then are never lost.
    window.gtag = function gtag() {
      if (!window.dataLayer) window.dataLayer = [];
      window.dataLayer.push(arguments);
    };
  }
  return window.gtag;
}

function send(...args: unknown[]): void {
  if (!isAnalyticsEnabled()) return;
  try {
    const gtag = resolveGtag();
    if (gtag) gtag(...args);
  } catch {
    // Analytics must never break the page.
  }
}

/** Queues the `js` and `config` commands exactly once, before any event. */
export function bootstrapAnalytics(): void {
  if (bootstrapped || !isAnalyticsEnabled()) return;
  bootstrapped = true;
  send('js', new Date());
  // Page views are sent manually so client-side navigations report the correct
  // title and so filter-only history changes do not count as new pages.
  send('config', GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  send('event', name, params);
}

export function trackPageView(): void {
  if (!isAnalyticsEnabled()) return;
  const { origin, pathname, search } = window.location;
  const pagePath = `${pathname}${search}`;
  if (pagePath === lastPageViewPath) return;
  lastPageViewPath = pagePath;
  trackEvent('page_view', {
    page_path: pagePath,
    page_location: `${origin}${pagePath}`,
    page_title: document.title,
  });
}

export interface PlayStoreClickOptions {
  buttonLocation: ButtonLocation;
  linkUrl: string;
  appName?: string;
  linkText?: string;
}

export function trackPlayStoreClick({
  buttonLocation,
  linkUrl,
  appName,
  linkText,
}: PlayStoreClickOptions): void {
  if (!isAnalyticsEnabled()) return;
  const { pathname, search } = window.location;
  const articleSlug = ARTICLE_SLUG_PATTERN.exec(pathname)?.[1];
  trackEvent('play_store_click', {
    button_location: buttonLocation,
    link_url: linkUrl,
    page_path: `${pathname}${search}`,
    ...(appName ? { app_name: appName } : {}),
    ...(articleSlug ? { article_slug: articleSlug } : {}),
    ...(linkText ? { link_text: linkText } : {}),
  });
}
