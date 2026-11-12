/**
 * The privacy policies this site publishes: the general policy at /privacy/ and
 * app-specific policies at /privacy/<slug>/.
 *
 * Google Play rejects a privacy policy whose app or developer details do not
 * match the store listing ("Invalid Privacy Policy: app or developer details
 * don't match"). The general policy covers the website and every app, but it
 * cannot describe each app's SDKs exactly, so an app whose listing needs that
 * precision gets its own page here, written from an audit of that app's code
 * and release configuration. Each page names the app as it appears on Google
 * Play, the Google Play developer name (Reign Collective Apps) and the business
 * (Reign Creative LLC).
 *
 * This list feeds the index on /privacy/, the policy links on /app-support/,
 * the sitemap and scripts/audit-privacy.mjs, so adding an app here without its
 * page (or the reverse) fails the build.
 *
 * Dates are calendar days (YYYY-MM-DD). Change `updated` whenever a policy's
 * wording changes, and keep the app's in-app link pointed at its own page.
 */

export interface AppPrivacyPolicy {
  /** URL segment under /privacy/. Never change it once the Play listing links it. */
  slug: string;
  /** The app's name exactly as it appears on Google Play. */
  appName: string;
  /** Android package name of the Google Play listing. */
  packageId: string;
  /** Last change to this policy's wording. */
  updated: string;
  /** One-line description shown in the index on /privacy/. */
  summary: string;
  /**
   * The third-party services the app's release build ships, named as the policy
   * names them. scripts/audit-privacy.mjs fails if the page does not disclose
   * each one, and `--app <repo>` checks this list against the app's own
   * package.json.
   */
  sdks: readonly string[];
}

/** Last change to the general policy at /privacy/. */
export const generalPrivacyPolicyUpdated = '2026-11-11';

export const appPrivacyPolicies: readonly AppPrivacyPolicy[] = [
  {
    slug: 'baseball-pro-career-league',
    appName: 'Baseball Pro Career League',
    packageId: 'com.reigncreative.baseballprocareerleague',
    updated: '2026-11-11',
    summary:
      'Baseball career and league game: saves stay on the device; uses Google AdMob, Google Analytics for Firebase, Firebase Remote Config and Google Play Billing.',
    // Audited 2026-11-11 from the app's package.json, app.config.ts and services.
    sdks: ['Google AdMob', 'Google Analytics for Firebase', 'Firebase Remote Config', 'Google Play Billing'],
  },
];

export const appPrivacyPolicyPath = (policy: Pick<AppPrivacyPolicy, 'slug'>): string =>
  `/privacy/${policy.slug}/`;

export function getAppPrivacyPolicy(slug: string): AppPrivacyPolicy {
  const policy = appPrivacyPolicies.find((entry) => entry.slug === slug);
  if (!policy) throw new Error(`No app privacy policy registered for "${slug}" in src/data/privacy.ts`);
  return policy;
}

/** "November 11, 2026" for a YYYY-MM-DD day, independent of the build machine's time zone. */
export function formatPolicyDate(day: string): string {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
