/**
 * The privacy policies this site publishes.
 *
 * The company-wide policy at /privacy/ is THE privacy policy for the apps
 * published on Google Play as Reign Collective Apps: it names the Google Play
 * developer (Reign Collective Apps) and the business (Reign Creative LLC) and
 * describes, app by app where they differ, the data practices of the portfolio.
 * Use https://reigncreativellc.com/privacy/ for every app whose practices it
 * covers.
 *
 * An app gets its own page at /privacy/<slug>/ only when a specific Google Play
 * requirement calls for one or the owner asks for it — never by default. The
 * one that exists, Baseball Pro Career League, was written after Google Play
 * rejected that app with "Invalid Privacy Policy: app or developer details
 * don't match"; it stays live while that app's Play Console field points at it.
 * App pages are not listed on /privacy/ or elsewhere in the site's navigation;
 * the sitemap lists them, and scripts/audit-privacy.mjs checks them.
 *
 * Dates are calendar days (YYYY-MM-DD). Change the date whenever a policy's
 * wording changes.
 */

export interface AppPrivacyPolicy {
  /** URL segment under /privacy/. Never change it once a Play listing links it. */
  slug: string;
  /** The app's name exactly as it appears on Google Play. */
  appName: string;
  /** Android package name of the Google Play listing. */
  packageId: string;
  /** Last change to this policy's wording. */
  updated: string;
  /**
   * The third-party services the app's release build ships, named as the policy
   * names them. scripts/audit-privacy.mjs fails if the page does not disclose
   * each one, and `--app <repo>` checks this list against the app's own
   * package.json.
   */
  sdks: readonly string[];
}

/** Last change to the company-wide policy at /privacy/. */
export const generalPrivacyPolicyUpdated = '2026-11-12';

export const appPrivacyPolicies: readonly AppPrivacyPolicy[] = [
  {
    slug: 'baseball-pro-career-league',
    appName: 'Baseball Pro Career League',
    packageId: 'com.reigncreative.baseballprocareerleague',
    updated: '2026-11-11',
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
