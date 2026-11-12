import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PlayStoreLink from '@/components/PlayStoreLink';
import Reveal from '@/components/Reveal';
import { companyInfo } from '@/data/apps';
import {
  appPrivacyPolicies,
  appPrivacyPolicyPath,
  formatPolicyDate,
  generalPrivacyPolicyUpdated,
  getAppPrivacyPolicy,
} from '@/data/privacy';

const description =
  'Privacy policy for Reign Creative LLC’s website and Android apps, published on Google Play as Reign Collective Apps: what we collect, why, and your choices.';

export const metadata: Metadata = {
  // Brand comes from the root layout's '%s | Reign Creative LLC' template.
  title: 'Privacy Policy',
  description,
  alternates: { canonical: '/privacy/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: companyInfo.name,
    title: 'Privacy Policy — Reign Creative LLC',
    description,
    url: `${companyInfo.siteUrl}/privacy/`,
    images: [
      {
        url: `${companyInfo.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Reign Creative LLC — Premium Mobile Apps for Android',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Reign Creative LLC',
    description,
  },
};

const h2Classes = 'mb-3 scroll-mt-28 font-display text-xl font-semibold text-ink-950';
const h3Classes = 'mb-2 mt-4 text-base font-semibold text-ink-800';
const strong = 'font-semibold text-ink-800';

function SupportEmail() {
  return (
    <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all" rel="noopener noreferrer">
      {companyInfo.supportEmail}
    </a>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="link-accent break-words" target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function PrivacyPage() {
  const lastUpdated = formatPolicyDate(generalPrivacyPolicyUpdated);
  const baseball = getAppPrivacyPolicy('baseball-pro-career-league');

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={
          <>
            Privacy <em className="gold-text not-italic">Policy</em>
          </>
        }
        description={`How ${companyInfo.name} handles information across its website and the Android apps it publishes on Google Play as ${companyInfo.developerName}.`}
      />

      <section className="section-padding !pt-8">
        <div className="container-narrow mx-auto">
          <Reveal>
            <div className="card-premium p-6 sm:p-12">
              <p className="mb-6 text-sm font-medium text-ink-400">Last Updated: {lastUpdated}</p>

              <div className="rounded-xl border border-ink-100 bg-cream-50 p-5 sm:p-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  {[
                    { term: 'Business', value: companyInfo.name },
                    { term: 'Google Play developer name', value: companyInfo.developerName },
                    {
                      term: 'Website',
                      value: (
                        <Link href="/" className="link-accent">
                          {companyInfo.domain}
                        </Link>
                      ),
                    },
                    { term: 'Privacy contact', value: <SupportEmail /> },
                  ].map((fact) => (
                    <div key={fact.term} className="grid gap-1">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{fact.term}</dt>
                      <dd className="text-sm font-medium text-ink-950">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 space-y-10 leading-relaxed text-ink-600">
                <div>
                  <h2 id="introduction" className={h2Classes}>
                    1. Who We Are and What This Policy Covers
                  </h2>
                  <p>
                    {companyInfo.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is an independent
                    studio that makes mobile applications for Android, including games, learning and language
                    apps, health and nutrition trackers, and utilities. Our apps are published on Google Play under
                    the developer name <strong className={strong}>{companyInfo.developerName}</strong>, and we
                    operate the website at {companyInfo.domain}. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard information when you use our mobile applications or visit our website
                    (collectively, the &ldquo;Services&rdquo;).
                  </p>
                  <p className="mt-2">
                    <strong className={strong}>Data collection varies by app.</strong> Each app collects only what
                    its features and the third-party software development kits (SDKs) built into it need, so not
                    every section below applies to every app. For example, an app without ads does not use Google
                    AdMob, and the health-tracking disclosures apply only to our health and nutrition apps. Where an
                    app has its own app-specific privacy policy (Section 2), that policy describes the app in
                    detail and applies together with this one; if the two differ for that app, the app-specific
                    policy controls.
                  </p>
                  <p className="mt-2">
                    By using our Services, you agree to the collection and use of information in accordance with
                    this policy. If you do not agree, please do not use our Services.
                  </p>
                </div>

                <div>
                  <h2 id="app-policies" className={h2Classes}>
                    2. App-Specific Privacy Policies
                  </h2>
                  <p>
                    These apps have a dedicated privacy policy that names the app as it appears on Google Play and
                    describes exactly what it collects:
                  </p>
                  <ul className="mt-3 space-y-3">
                    {appPrivacyPolicies.map((entry) => (
                      <li key={entry.slug} className="rounded-xl border border-ink-100 p-4 sm:p-5">
                        <Link href={appPrivacyPolicyPath(entry)} className="link-accent font-semibold">
                          {entry.appName} — Privacy Policy
                        </Link>
                        <p className="mt-1 text-sm">
                          Published on Google Play by {companyInfo.developerName} · Android package{' '}
                          <span className="break-all">{entry.packageId}</span> · Updated{' '}
                          {formatPolicyDate(entry.updated)}
                        </p>
                        <p className="mt-1 text-sm">{entry.summary}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3">Every other app is covered by this policy.</p>
                </div>

                <div>
                  <h2 id="baseball-pro-career-league" className={h2Classes}>
                    3. {baseball.appName}
                  </h2>
                  <p>
                    {baseball.appName} is a baseball career and league game published on Google Play by{' '}
                    {companyInfo.developerName} (Android package{' '}
                    <span className="break-all">{baseball.packageId}</span>). In summary:
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>No account is required, and your saves and settings stay on your device.</li>
                    <li>
                      Google Analytics for Firebase measures app usage. It is on by default and can be turned off
                      in the app (Settings → Privacy → Opt out of analytics).
                    </li>
                    <li>Firebase Remote Config delivers app settings.</li>
                    <li>The free version shows ads through Google AdMob; Pro removes ads.</li>
                    <li>Optional purchases are processed by Google Play Billing.</li>
                  </ul>
                  <p className="mt-2">
                    The full details are in the{' '}
                    <Link href={appPrivacyPolicyPath(baseball)} className="link-accent">
                      {baseball.appName} Privacy Policy
                    </Link>
                    .
                  </p>
                </div>

                <div>
                  <h2 id="information-we-collect" className={h2Classes}>
                    4. Information We Collect
                  </h2>

                  <h3 className={h3Classes}>Information You Provide</h3>
                  <p>
                    When you contact us for support or send us a message, you may provide personal information
                    such as your name and email address. We only use this information to respond to your inquiry.
                  </p>

                  <h3 className={h3Classes}>Data Stored on Your Device</h3>
                  <p>
                    Our apps keep what you create — progress, saves, entries, preferences, settings, reminders and
                    streaks — in the app&apos;s private storage on your device. Our apps do not send this data to
                    our servers, and we do not provide cloud sync or server-side accounts for it, unless a feature
                    clearly states that cloud storage is being used. It remains on your device until you delete it,
                    clear the app&apos;s storage, or uninstall the app. If Android backup is turned on for your
                    Google account, Android may include app data in your device backup, which Google stores under
                    your account settings; we cannot access those backups.
                  </p>

                  <h3 className={h3Classes}>Health and Nutrition Apps</h3>
                  <p>
                    This applies only to our health, nutrition and wellness apps, such as our keto diet and protein
                    tracking apps. Diet and keto tracking entries, macro logs, weight and progress data, reminders,
                    streaks, preferences, and settings are stored locally on your device. This data is not
                    transmitted to or stored on our servers, and we do not provide cloud sync or server-side
                    accounts for this information. It remains on your device until you delete entries, clear the
                    app&apos;s storage, or uninstall the app. Section 11 contains the health and wellness
                    disclaimer for these apps.
                  </p>

                  <h3 className={h3Classes}>Mobile App Analytics (Google Analytics for Firebase)</h3>
                  <p>
                    Some of our apps, including {baseball.appName}, use Google Analytics for Firebase to understand
                    how the app is used and to find and fix problems. Where an app includes it, the SDK collects an
                    app-instance identifier, app interactions such as screens viewed and in-app events, app version,
                    device model, operating system version and language, a coarse location derived from a masked IP
                    address, in-app purchase events, and, depending on your consent choices, the advertising ID.
                    Apps that include an analytics switch let you turn analytics off in their settings.
                  </p>
                  <p className="mt-2">
                    Mobile app analytics is separate from website analytics. It is collected by the Firebase SDK
                    inside an app and describes activity in that app only; it does not use website cookies, and our
                    website analytics (below) does not collect anything from inside our apps.
                  </p>

                  <h3 className={h3Classes}>Remote Configuration (Firebase Remote Config)</h3>
                  <p>
                    Some apps, including {baseball.appName}, use Firebase Remote Config to receive settings — for
                    example, feature switches or ad-frequency limits — without an app update. To do this, the SDK
                    sends Google a Firebase installation ID and technical information such as the app version,
                    operating system version, language, country and time zone.
                  </p>

                  <h3 className={h3Classes}>Automatically Collected Information</h3>
                  <p>
                    Depending on the app and the SDKs it includes, our applications may collect certain information
                    automatically, including device type, operating system version, app version, diagnostics, and
                    general usage analytics. This data is used to improve app performance and user experience.
                  </p>

                  <h3 className={h3Classes}>Advertising Identifier (Ad ID)</h3>
                  <p>
                    Apps that display advertisements through Google AdMob may use your device&apos;s advertising
                    identifier. This identifier may be used for showing ads, ad personalization where enabled,
                    frequency capping, fraud prevention, and measuring ad performance. Google&apos;s ad SDK also
                    collects your IP address (which may be used to estimate your general location), interactions
                    with ads, and diagnostic information. Where the law requires consent, apps that use Google&apos;s
                    consent tools show Google&apos;s consent message before personalized ads are requested. You can
                    reset or limit your advertising identifier in your device settings.
                  </p>

                  <h3 className={h3Classes}>In-App Purchases and Subscriptions</h3>
                  <p>
                    Apps that offer in-app purchases or subscriptions use Google Play Billing. Google processes the
                    payment, and we never receive your full payment card details. The app receives purchase
                    information — such as the product, its status and a purchase token or order reference — to
                    deliver and restore what you bought. Some of our apps also use RevenueCat, a
                    subscription-management service, to validate purchases and track subscription status; in those
                    apps RevenueCat receives purchase details and an app-specific customer identifier.{' '}
                    {baseball.appName} does not use RevenueCat.
                  </p>

                  <h3 className={h3Classes}>Website Analytics (Google Analytics 4)</h3>
                  <p>
                    Our website at {companyInfo.domain} uses Google Analytics 4, a web analytics service provided by
                    Google, together with first-party analytics cookies (for example,{' '}
                    <code className="text-ink-800">_ga</code>). It records general usage information such as the
                    pages you view and how long you stay, the website or search engine that referred you, how far
                    down a page you scroll, clicks on outbound links and file downloads, clicks on our Google Play
                    links, an approximate location (typically country, region, or city) that Google derives from
                    your IP address, and basic device information such as browser, operating system, screen size,
                    and language. Website analytics applies only to {companyInfo.domain}; it is separate from the
                    analytics inside our apps.
                  </p>
                  <p className="mt-2">
                    We use this information only in aggregate, to understand which apps and pages visitors find
                    useful, to find navigation and performance problems, and to decide what to build next. We do
                    not use website analytics to identify you personally. We do not send your name, email address,
                    support message content, or anything else you type into a form on this site to Google
                    Analytics, and we do not combine analytics data with support correspondence.
                  </p>
                  <p className="mt-2">
                    Google processes this analytics data under its own privacy terms and as our service provider.
                    Google Analytics 4 uses your IP address to derive an approximate location but does not log or
                    store IP addresses. You can opt out at any time by installing the Google Analytics Opt-out
                    Browser Add-on, by blocking analytics cookies in your browser, or by using a browser or
                    extension that blocks tracking scripts. The website works normally either way.
                  </p>

                  <h3 className={h3Classes}>Third-Party Services</h3>
                  <p>
                    Depending on the app, our apps use third-party services such as Google AdMob for
                    advertisements, Google Analytics for Firebase and Firebase Remote Config, Google Play Services,
                    and Google Play Billing for in-app purchases where an app offers them, and some apps use
                    RevenueCat for subscriptions. These services may collect information such as device
                    identifiers, usage data, advertising identifiers, and purchase information. Our website uses
                    Google Analytics 4, as described above.
                  </p>
                  <p className="mt-2">
                    These third-party services operate under their own privacy policies, and we encourage you to
                    review them:
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>
                      Google Privacy Policy:{' '}
                      <ExternalLink href="https://policies.google.com/privacy">
                        https://policies.google.com/privacy
                      </ExternalLink>
                    </li>
                    <li>
                      How Google uses data from sites and apps that use its services:{' '}
                      <ExternalLink href="https://policies.google.com/technologies/partner-sites">
                        https://policies.google.com/technologies/partner-sites
                      </ExternalLink>
                    </li>
                    <li>
                      Privacy and Security in Firebase:{' '}
                      <ExternalLink href="https://firebase.google.com/support/privacy">
                        https://firebase.google.com/support/privacy
                      </ExternalLink>
                    </li>
                    <li>
                      Google Analytics Opt-out Browser Add-on:{' '}
                      <ExternalLink href="https://tools.google.com/dlpage/gaoptout">
                        https://tools.google.com/dlpage/gaoptout
                      </ExternalLink>
                    </li>
                    <li>
                      RevenueCat Privacy Policy (apps that use RevenueCat):{' '}
                      <ExternalLink href="https://www.revenuecat.com/privacy">
                        https://www.revenuecat.com/privacy
                      </ExternalLink>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 id="how-we-use" className={h2Classes}>
                    5. How We Use Your Information
                  </h2>
                  <ul className="ml-4 list-disc space-y-2">
                    <li>To provide, maintain, and improve our Services</li>
                    <li>To respond to your support requests and inquiries</li>
                    <li>To monitor usage patterns and improve app performance</li>
                    <li>To show and measure ads in apps that include them</li>
                    <li>To process, deliver, and restore in-app purchases</li>
                    <li>To change app settings remotely in apps that use Remote Config</li>
                    <li>To detect and prevent technical issues, fraud, or abuse</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 id="security" className={h2Classes}>
                    6. Data Storage &amp; Security
                  </h2>
                  <p>
                    We take the security of your data seriously. We implement industry-standard security measures
                    to protect your information from unauthorized access, alteration, disclosure, or destruction.
                    Data that stays on your device is kept in the app&apos;s private storage, which Android
                    isolates from other apps. Google states that its advertising and analytics SDKs encrypt the data
                    they collect in transit. However, no method of electronic transmission or storage is 100%
                    secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 id="retention" className={h2Classes}>
                    7. Data Retention
                  </h2>
                  <p>
                    We retain personal information only for as long as necessary to provide our Services, comply
                    with legal obligations, resolve disputes, prevent abuse, and enforce our agreements.
                  </p>
                  <p className="mt-2">
                    <strong className={strong}>Local app data:</strong> Progress, saves, entries, preferences,
                    reminders, streaks, and settings — including diet tracking entries, keto progress and macro
                    logs in our health and nutrition apps — are stored locally on the user&apos;s device unless a
                    feature clearly states that cloud storage is being used. Local app data remains on the device
                    until the user deletes entries, clears app storage, or uninstalls the app.
                  </p>
                  <p className="mt-2">
                    <strong className={strong}>Support data:</strong> If a user contacts us for support, we may
                    retain the user&apos;s name, email address, message content, and related support records for up
                    to 24 months after the last interaction, unless a longer period is required for legal, security,
                    or dispute-resolution purposes.
                  </p>
                  <p className="mt-2">
                    <strong className={strong}>Purchase/subscription data:</strong> If the app uses Google Play
                    Billing or another purchase provider, purchase status and transaction-related information may be
                    retained for as long as necessary to provide access to purchased features, comply with
                    tax/accounting/legal obligations, prevent fraud, and resolve billing disputes.
                  </p>
                  <p className="mt-2">
                    <strong className={strong}>Advertising and analytics data:</strong> Advertising identifiers,
                    device information, diagnostics, app version, usage data, and analytics data may be collected
                    and retained by third-party providers such as Google AdMob, Google Analytics for Firebase,
                    Firebase Remote Config, Google Play Services, Google Play Billing, and RevenueCat if used. These
                    providers retain data according to their own privacy policies. For apps that use Google
                    Analytics for Firebase, user-level and event-level data is deleted automatically at the end of
                    the retention period set in that app&apos;s Google Analytics settings (Google offers 2 or 14
                    months for standard properties). Firebase keeps the installation IDs used by Remote Config until
                    they are deleted, and Google states that deleted data is removed from its systems within 180
                    days.
                  </p>
                  <p className="mt-2">
                    <strong className={strong}>Website analytics data:</strong> Google Analytics data collected from{' '}
                    {companyInfo.domain} is held by Google and retained according to the retention period configured
                    in our Google Analytics property and Google&apos;s own policies. Aggregate reports may be retained
                    indefinitely because they do not identify individual visitors.
                  </p>
                  <p className="mt-2">
                    <strong className={strong}>Legal/security records:</strong> We may retain limited information for
                    longer where necessary to comply with legal obligations, enforce our terms, prevent fraud or
                    abuse, maintain security, or resolve disputes.
                  </p>
                  <p className="mt-2">
                    When information is no longer needed, we delete it, anonymize it, or securely retain it only as
                    required by law.
                  </p>
                  <p className="mt-2">
                    Users may contact us at <SupportEmail /> to request access, correction, or deletion of personal
                    information associated with their use of our Services.
                  </p>
                </div>

                <div>
                  <h2 id="sharing" className={h2Classes}>
                    8. Data Sharing
                  </h2>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties for money. We may
                    share anonymized, aggregate data for analytics purposes. We may disclose your information if
                    required by law or to protect our rights, safety, or property.
                  </p>
                  <p className="mt-2">
                    We may share limited data with trusted third-party partners such as Google AdMob for advertising,
                    Google Analytics for Firebase and Firebase Remote Config in apps that use them, Google Play
                    Billing for payment processing where an app offers in-app purchases, RevenueCat in apps that use
                    it for subscriptions, and Google Analytics for website usage measurement. Some U.S. state laws
                    treat the use of advertising identifiers for targeted advertising as a &ldquo;sale&rdquo; or
                    &ldquo;sharing&rdquo; of personal information; where an app shows personalized ads, you can opt
                    out using the app&apos;s privacy settings or Google&apos;s consent options where they are offered.
                  </p>
                </div>

                <div>
                  <h2 id="deletion" className={h2Classes}>
                    9. Data Deletion Requests and Your Choices
                  </h2>
                  <p>
                    Our apps do not require you to create an account, and we do not maintain online user profiles
                    for them. Because your app data is stored locally, you remain in control of it at all times.
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-2">
                    <li>
                      You can delete your local app data at any time by deleting individual entries or saves,
                      clearing the app&apos;s storage in your device settings, or uninstalling the app.
                    </li>
                    <li>
                      Where an app offers them, you can opt out of analytics or personalized ads in its settings,
                      and you can reset or delete your advertising ID in your device settings.
                    </li>
                    <li>
                      To request deletion of any personal information we may hold (such as support
                      correspondence), email <SupportEmail /> and we will respond within a reasonable timeframe.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 id="children" className={h2Classes}>
                    10. Children&apos;s Privacy
                  </h2>
                  <p>
                    Our Services are not directed to children under 13. We do not knowingly collect personal
                    information from children under 13. If you believe we have collected information from a child
                    under 13, please contact us immediately and we will take steps to remove that information.
                  </p>
                </div>

                <div>
                  <h2 id="health-disclaimer" className={h2Classes}>
                    11. Health &amp; Wellness Disclaimer
                  </h2>
                  <p>
                    This section applies to our health and wellness applications, including our keto diet tracker.
                    They are provided for general wellness and educational purposes only. They are not medical
                    advice, diagnosis, or treatment, and they are not a substitute for professional medical
                    guidance. It does not apply to our games, learning, language, or utility apps.
                  </p>
                  <p className="mt-2">
                    You should consult a qualified healthcare professional before starting a keto diet, fasting, or
                    any major dietary change, or before relying on the app for any medical condition. This is
                    especially important if you have or have had diabetes, are pregnant, have a history of an eating
                    disorder, have kidney disease, take medication, or have any other health condition. Use of the
                    app is at your own discretion and risk.
                  </p>
                </div>

                <div>
                  <h2 id="rights" className={h2Classes}>
                    12. Your Rights
                  </h2>
                  <p>
                    Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict
                    the processing of your personal information, to object to processing, to withdraw consent, and
                    to opt out of targeted advertising or the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of
                    personal information. You may also have the right to complain to your local data protection
                    authority. To exercise any of these rights, please contact us using the information below.
                  </p>
                </div>

                <div>
                  <h2 id="changes" className={h2Classes}>
                    13. Changes to This Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify users of any material changes
                    by posting the new policy on this page and updating the &ldquo;Last Updated&rdquo; date. We
                    encourage you to review this policy periodically.
                  </p>
                </div>

                <div>
                  <h2 id="contact" className={h2Classes}>
                    14. Contact Us
                  </h2>
                  <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
                  <div className="mt-4 rounded-xl border border-ink-100 bg-cream-50 p-5">
                    <p className="font-semibold text-ink-950">{companyInfo.name}</p>
                    <p className="mt-1">Google Play developer name: {companyInfo.developerName}</p>
                    <p className="mt-1">
                      Email: <SupportEmail />
                    </p>
                    <p className="mt-1">Website: {companyInfo.domain}</p>
                    <p className="mt-1">
                      Google Play:{' '}
                      <PlayStoreLink
                        href={companyInfo.developerPageUrl}
                        buttonLocation="hero"
                        className="link-accent"
                      >
                        {companyInfo.developerName} developer page
                        <span className="sr-only"> (opens in a new tab)</span>
                      </PlayStoreLink>
                    </p>
                    <p className="mt-1">
                      Or use the form on our{' '}
                      <Link href="/support/" className="link-accent">
                        support page
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
