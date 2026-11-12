import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PlayStoreLink from '@/components/PlayStoreLink';
import Reveal from '@/components/Reveal';
import { companyInfo } from '@/data/apps';
import { appPrivacyPolicyPath, formatPolicyDate, getAppPrivacyPolicy } from '@/data/privacy';

/*
 * Baseball Pro Career League's own privacy policy.
 *
 * Written on 2026-11-11 from an audit of the app's own repository and release
 * configuration: package.json, app.config.ts,
 * app.identity.json, firebase.json and the services that call each SDK
 * (analyticsService, remoteConfigService, consentService, adService, the
 * billing services, notificationService, feedbackService). Every statement
 * about what the app collects comes from that audit or from Google's own
 * data-disclosure pages for the SDKs it ships. If the app adds, removes or
 * reconfigures an SDK, this page and the Play Console Data safety form must
 * change with it — and `updated` in src/data/privacy.ts with them.
 */

const policy = getAppPrivacyPolicy('baseball-pro-career-league');
const path = appPrivacyPolicyPath(policy);
const app = policy.appName;
const pageTitle = `${app} — Privacy Policy`;
const description = `How ${app}, published on Google Play by ${companyInfo.developerName} (${companyInfo.name}), handles game data, ads, analytics and purchases.`;

export const metadata: Metadata = {
  // The exact page title, without the site-wide " | Reign Creative LLC" suffix.
  title: { absolute: pageTitle },
  description,
  alternates: { canonical: path },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: companyInfo.name,
    title: pageTitle,
    description,
    url: `${companyInfo.siteUrl}${path}`,
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
    title: pageTitle,
    description,
  },
};

const h2Classes = 'mb-3 scroll-mt-28 font-display text-xl font-semibold text-ink-950';
const h3Classes = 'mb-2 mt-5 text-base font-semibold text-ink-800';
const strong = 'font-semibold text-ink-800';

const sections = [
  { id: 'introduction', title: 'Introduction and Developer Identification' },
  { id: 'information-collected', title: 'Information Collected by the Application' },
  { id: 'on-device-storage', title: 'Game Progress and On-Device Storage' },
  { id: 'automatic-collection', title: 'Automatically Collected Information' },
  { id: 'advertising', title: 'Advertising and Google AdMob' },
  { id: 'firebase', title: 'Firebase Analytics and Remote Config' },
  { id: 'purchases', title: 'Google Play Billing and In-App Purchases' },
  { id: 'third-parties', title: 'Third-Party Services and Data Sharing' },
  { id: 'use-of-information', title: 'How Collected Information Is Used' },
  { id: 'security', title: 'Data Storage and Security' },
  { id: 'retention-deletion', title: 'Data Retention and Deletion' },
  { id: 'children', title: 'Children’s Privacy and Applicable Age Requirements' },
  { id: 'rights', title: 'User Privacy Rights' },
  { id: 'changes', title: 'Changes to This Privacy Policy' },
  { id: 'contact', title: 'Contact Information' },
] as const;

type SectionId = (typeof sections)[number]['id'];

function SectionHeading({ id }: { id: SectionId }) {
  const index = sections.findIndex((section) => section.id === id);
  return (
    <h2 id={id} className={h2Classes}>
      {index + 1}. {sections[index].title}
    </h2>
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

function SupportEmail() {
  return (
    <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all" rel="noopener noreferrer">
      {companyInfo.supportEmail}
    </a>
  );
}

/** Where each kind of information goes. Section 2 renders this list. */
const dataCategories: {
  category: string;
  examples: string;
  handledBy: string;
  purpose: string;
  choice: string;
}[] = [
  {
    category: 'Game data you create',
    examples:
      'The player, save and preset names you type, careers, seasons and leagues, results, statistics, settings, unlocked items and your coin balance.',
    handledBy: 'Stored only on your device. Not collected by us and not shared.',
    purpose: 'Running the game and keeping your progress.',
    choice: 'Delete it at any time in Settings → Data (Section 3).',
  },
  {
    category: 'App activity and gameplay events',
    examples:
      'Screens viewed, game modes played, match settings and results, tutorial, practice and challenge progress, and taps on in-app links.',
    handledBy: 'Google Analytics for Firebase (Google).',
    purpose: 'Understanding how the game is played, fixing problems and improving the game.',
    choice: 'On by default. Turn it off in Settings → Privacy → “Opt out of analytics”.',
  },
  {
    category: 'Device and app information',
    examples:
      'Device model, Android version, app version and build, language, country or region, time zone, and app and ad performance diagnostics.',
    handledBy: 'Google Analytics for Firebase, Firebase Remote Config and Google AdMob (Google).',
    purpose: 'Analytics, delivering configuration, serving ads and preventing fraud.',
    choice: 'Analytics stops with the analytics opt-out; ad requests stop with Pro.',
  },
  {
    category: 'Device and other identifiers',
    examples:
      'Firebase app-instance ID, Firebase installation ID, the Android advertising ID and the app set ID. Never your IMEI, serial number or phone number.',
    handledBy: 'Google Analytics for Firebase, Firebase Remote Config and Google AdMob (Google).',
    purpose: 'Counting installs and sessions, delivering configuration, advertising and fraud prevention.',
    choice: 'Reset or delete the advertising ID in Android settings (Section 5).',
  },
  {
    category: 'Approximate location',
    examples:
      'A general area (such as country, region or city) estimated from your IP address. The app does not use GPS and does not request location permission.',
    handledBy: 'Google AdMob and Google Analytics for Firebase (Google).',
    purpose: 'Advertising, regional analytics, consent requirements and fraud prevention.',
    choice: 'Not separately configurable in the app.',
  },
  {
    category: 'Ad interactions',
    examples: 'Ad requests, impressions, taps and video views, and whether a rewarded ad was completed.',
    handledBy: 'Google AdMob (Google); the app’s own ad events also go to Google Analytics for Firebase.',
    purpose: 'Showing and measuring ads, paying rewards for rewarded ads, limiting ad frequency and preventing fraud.',
    choice: 'Pro removes ads entirely. You can also opt out of personalised ads.',
  },
  {
    category: 'Purchase information',
    examples:
      'The product bought, the purchase status, and the Google Play order number and purchase token. Never your card number or billing address.',
    handledBy: 'Google Play Billing (Google). Purchase events also go to Google Analytics for Firebase.',
    purpose: 'Delivering, restoring and verifying purchases; analytics on the purchase flow.',
    choice: 'Needed to deliver what you buy. Purchase analytics stops with the analytics opt-out.',
  },
  {
    category: 'Support messages',
    examples: 'Your email address, your message and the app and Android version details included in the draft.',
    handledBy: 'Sent by you, from your email app, to our support mailbox.',
    purpose: 'Answering your request.',
    choice: 'Only sent if you choose to send an email.',
  },
];

export default function BaseballProCareerLeaguePrivacyPage() {
  const updated = formatPolicyDate(policy.updated);

  return (
    <>
      <PageHeader
        eyebrow="Privacy Policy"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy', href: '/privacy/' },
          { label: app },
        ]}
        title={
          <>
            {app} — <em className="gold-text not-italic">Privacy Policy</em>
          </>
        }
        description={`How ${app}, a baseball game published on Google Play by ${companyInfo.developerName}, collects, uses and protects information.`}
      />

      <section className="section-padding !pt-8">
        <div className="container-narrow mx-auto">
          <Reveal>
            <div className="card-premium p-6 sm:p-12">
              <p className="mb-6 text-sm font-medium text-ink-400">
                Last updated: {updated} · Applies to the Android app distributed through Google Play
              </p>

              {/* Identification first: the Play policy requires the app or the listed
                  developer to be named, and reviewers look for both. */}
              <div className="rounded-xl border border-ink-100 bg-cream-50 p-5 sm:p-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  {[
                    { term: 'App', value: app },
                    { term: 'Google Play developer name', value: companyInfo.developerName },
                    { term: 'Business', value: companyInfo.name },
                    {
                      term: 'Android package name',
                      value: <span className="break-all">{policy.packageId}</span>,
                    },
                    { term: 'Privacy contact', value: <SupportEmail /> },
                    {
                      term: 'Website',
                      value: (
                        <Link href="/" className="link-accent">
                          {companyInfo.domain}
                        </Link>
                      ),
                    },
                  ].map((fact) => (
                    <div key={fact.term} className="grid gap-1">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{fact.term}</dt>
                      <dd className="text-sm font-medium text-ink-950">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 leading-relaxed text-ink-600">
                <h2 className={h2Classes}>At a Glance</h2>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    No account is needed. There is no sign-up or sign-in, and the app never asks for your
                    real name, email address or phone number.
                  </li>
                  <li>Your saves, player names and settings are stored on your device, not on our servers.</li>
                  <li>
                    The app does collect some information automatically through Google services built into
                    it: Google Analytics for Firebase (app usage — on by default, and you can turn it off),
                    Firebase Remote Config (app settings) and, in the free version, Google AdMob (ads).
                  </li>
                  <li>Pro removes ads: with Pro the app does not request any ads.</li>
                  <li>Purchases are processed by Google Play. We never see your payment card details.</li>
                  <li>We do not sell your personal information for money.</li>
                </ul>

                <nav aria-label="Privacy policy sections" className="mt-8 rounded-xl border border-ink-100 p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Contents</p>
                  <ol className="ml-5 list-decimal space-y-1.5 text-sm">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} className="link-accent">
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>

              <div className="mt-10 space-y-10 leading-relaxed text-ink-600">
                {/* 1 */}
                <div>
                  <SectionHeading id="introduction" />
                  <p>
                    This Privacy Policy explains how the mobile game {app} (the &ldquo;App&rdquo;) collects,
                    uses, shares and protects information. It applies to the Android version of the App
                    distributed through Google Play.
                  </p>
                  <p className="mt-2">
                    The App is published on Google Play under the developer name{' '}
                    <strong className={strong}>{companyInfo.developerName}</strong>. {companyInfo.developerName}{' '}
                    is the name under which <strong className={strong}>{companyInfo.name}</strong> publishes its
                    apps on Google Play. {companyInfo.name} operates {companyInfo.domain} and is responsible for
                    this policy. In this policy, &ldquo;we,&rdquo; &ldquo;us&rdquo; and &ldquo;our&rdquo; mean{' '}
                    {companyInfo.name}.
                  </p>
                  <p className="mt-2">
                    {app} is a single-player baseball game: you create a player, play games and manage a
                    career, a season or a league. It has no online multiplayer, chat or messaging features, and it
                    does not have user accounts — you never need to sign up or sign in to play or to make a
                    purchase.
                  </p>
                  <p className="mt-2">
                    Our{' '}
                    <Link href="/privacy/" className="link-accent">
                      general Privacy Policy
                    </Link>{' '}
                    covers our website and our other apps. If anything in it differs from this policy for the
                    App, this policy applies.
                  </p>
                </div>

                {/* 2 */}
                <div>
                  <SectionHeading id="information-collected" />
                  <p>
                    Having no account system does not mean the App collects nothing. The App keeps your game on
                    your device, and the Google services built into it collect some information automatically.
                    The list below shows each kind of information, who handles it and what you can do about it;
                    Sections 3 to 7 give the details.
                  </p>

                  <ul className="mt-5 space-y-4">
                    {dataCategories.map((item) => (
                      <li key={item.category} className="rounded-xl border border-ink-100 p-4 sm:p-5">
                        <p className="font-semibold text-ink-950">{item.category}</p>
                        <dl className="mt-2 grid gap-2 text-sm">
                          <div>
                            <dt className="inline font-semibold text-ink-800">Examples: </dt>
                            <dd className="inline">{item.examples}</dd>
                          </div>
                          <div>
                            <dt className="inline font-semibold text-ink-800">Handled by: </dt>
                            <dd className="inline">{item.handledBy}</dd>
                          </div>
                          <div>
                            <dt className="inline font-semibold text-ink-800">Why: </dt>
                            <dd className="inline">{item.purpose}</dd>
                          </div>
                          <div>
                            <dt className="inline font-semibold text-ink-800">Your choice: </dt>
                            <dd className="inline">{item.choice}</dd>
                          </div>
                        </dl>
                      </li>
                    ))}
                  </ul>

                  <h3 className={h3Classes}>What the App does not ask for</h3>
                  <p>
                    The App does not ask for your real name, email address, phone number, postal address,
                    contacts, photos, files or precise location, and it does not use your camera or microphone.
                    The name you give your player is stored only on your device (Section 3). The App&apos;s Android
                    configuration blocks the location, camera, microphone and photo permissions.
                  </p>

                  <h3 className={h3Classes}>Permissions the App uses</h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>
                      <strong className={strong}>Notifications</strong> — only to deliver the reminders you choose.
                      Android asks for your permission first, and the reminders are scheduled on your device (and
                      set again after the device restarts).
                    </li>
                    <li>
                      <strong className={strong}>Advertising ID</strong> — read by Google AdMob and, depending on
                      your ad-consent choices, by Google Analytics for Firebase.
                    </li>
                    <li>
                      <strong className={strong}>Google Play billing</strong> — to make purchases through Google
                      Play.
                    </li>
                    <li>
                      <strong className={strong}>Vibration, audio settings and internet access</strong> — for
                      haptic feedback and the game&apos;s sound, and so the Google services above can work.
                    </li>
                  </ul>

                  <h3 className={h3Classes}>Information you choose to send us</h3>
                  <p>
                    If you use Contact Support or send feedback from the App, it opens a draft email in your own
                    email app. The draft already contains the App&apos;s name, version and build number and your
                    device&apos;s Android version, and you can edit it before sending. When you send it, we receive
                    your email address, your message and anything you attach. The App never adds your saves, logs
                    or device identifiers to the email.
                  </p>
                </div>

                {/* 3 */}
                <div>
                  <SectionHeading id="on-device-storage" />
                  <p>
                    Everything that makes up your game is stored in the App&apos;s private storage on your device,
                    which Android keeps separate from other apps. This includes your career, season, league and
                    team saves; game results, statistics and history; the player, save and preset names you type; your
                    settings (controls, display, audio, language and theme); unlocked themes, cosmetics and your
                    coin balance; practice, challenge, mission and check-in records; a record of which rewarded-ad
                    rewards were already paid; your reminder schedule; your purchase entitlements and a local
                    record of purchases in progress; and your privacy and consent choices.
                  </p>
                  <p className="mt-2">
                    The App does not upload your saves to us. There is no cloud save, and we do not run a server
                    that stores game data. The names and text you type stay on your device and are never included
                    in analytics.
                  </p>
                  <p className="mt-2">
                    <strong className={strong}>Android device backup.</strong> If Android backup is turned on for
                    your Google account, Android may include the App&apos;s data in your device backup. That backup
                    is created and stored by Google under your Google account settings, and it may be restored if
                    you reinstall the App or set up a new device. We cannot access these backups. You can manage
                    them in your device&apos;s backup settings or your Google account.
                  </p>
                  <h3 className={h3Classes}>Deleting your game data</h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>
                      In the App, open <strong className={strong}>Settings → Data</strong> to delete a single save
                      (<strong className={strong}>Delete</strong>), return settings to their defaults (
                      <strong className={strong}>Reset settings</strong>) or delete every save, setting, coin and
                      unlocked item on the device (<strong className={strong}>Erase everything</strong>).
                    </li>
                    <li>
                      In Android settings, clear the App&apos;s storage, or uninstall the App, to remove all of its
                      data from your device.
                    </li>
                    <li>
                      Erasing data does not cancel a subscription or remove a purchase: purchases belong to your
                      Google Play account and can be brought back with <strong className={strong}>Restore Purchases</strong>{' '}
                      in the App&apos;s store screen.
                    </li>
                  </ul>
                </div>

                {/* 4 */}
                <div>
                  <SectionHeading id="automatic-collection" />
                  <p>
                    When you use the App, the Google services built into it (described in Sections 5 to 7)
                    automatically collect certain information from your device:
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-2">
                    <li>
                      <strong className={strong}>Device and app information</strong>, such as device model,
                      Android version, app version and build number, language, country or region, time zone, and
                      performance and diagnostic information (for example, app launch time and how the ad software
                      is performing).
                    </li>
                    <li>
                      <strong className={strong}>Identifiers</strong>: a Firebase app-instance ID (Google Analytics
                      for Firebase), a Firebase installation ID (Firebase Remote Config), the Android advertising ID
                      and the app set ID (Google AdMob). The advertising ID is also read by Google Analytics for
                      Firebase when your ad-consent choices allow it. The App does not collect non-resettable
                      hardware identifiers such as your IMEI or serial number.
                    </li>
                    <li>
                      <strong className={strong}>IP address and approximate location.</strong> Your device&apos;s IP
                      address reaches Google when these services connect, and Google uses it to estimate a general
                      location such as country, region or city. Google Analytics derives this from a masked IP
                      address. The App itself never uses GPS or asks for location permission.
                    </li>
                    <li>
                      <strong className={strong}>Usage information</strong>: the screens you visit, sessions, the
                      gameplay events listed in Section 6, ad interactions (Section 5) and purchase events
                      (Section 7).
                    </li>
                  </ul>
                  <p className="mt-2">
                    The App also reads your device&apos;s language and time zone to show the game in your language
                    and to schedule reminders at the right local time. That happens on your device and is not sent
                    to us.
                  </p>
                </div>

                {/* 5 */}
                <div>
                  <SectionHeading id="advertising" />
                  <p>
                    The free version of the App shows ads served by Google AdMob through the Google Mobile Ads
                    SDK: full-screen ads at natural breaks in play (for example before or after a game, or once
                    per game at the seventh-inning stretch), optional rewarded ads that you choose to watch in
                    exchange for an in-game reward, and native ads inside some menus.
                  </p>

                  <h3 className={h3Classes}>What AdMob collects</h3>
                  <p>
                    According to Google, the Google Mobile Ads SDK automatically collects your device&apos;s IP
                    address (which may be used to estimate its general location); product interactions such as app
                    launches, taps and video views; diagnostic information such as app launch time, hang rate and
                    energy usage; and device and account identifiers — the Android advertising ID, the app set ID
                    and, if applicable, other identifiers related to signed-in accounts on the device. Google
                    encrypts this data in transit. It is used to show ads, measure their performance, limit how
                    often you see them and prevent fraud and abuse.
                  </p>

                  <h3 className={h3Classes}>Consent and personalised ads</h3>
                  <ul className="ml-4 list-disc space-y-2">
                    <li>
                      Before requesting ads, the App uses Google&apos;s User Messaging Platform to check whether
                      consent is required where you are. Where it is — for example in the European Economic Area,
                      the United Kingdom and Switzerland — Google&apos;s consent message is shown, and ads are
                      requested only as your choices allow. Your choices are stored on your device.
                    </li>
                    <li>
                      Where privacy laws give you the right to opt out (including in certain U.S. states), open{' '}
                      <strong className={strong}>Settings → Privacy → Ad privacy options</strong>. The button
                      appears whenever Google&apos;s consent tools require it, and you can change your choices there
                      at any time.
                    </li>
                    <li>
                      <strong className={strong}>Settings → Privacy → Opt out of personalised ads</strong> makes
                      the App request only non-personalised ads. You will still see ads, but they are not targeted
                      using your advertising ID or interests. Google may still use data from non-personalised ads
                      for frequency capping, aggregated reporting and fraud prevention.
                    </li>
                    <li>
                      You can reset or delete your advertising ID at any time in Android settings (on most devices
                      under Settings → Privacy → Ads, or Settings → Google → Ads).
                    </li>
                  </ul>

                  <h3 className={h3Classes}>Pro and ad content</h3>
                  <p>
                    With Pro (any subscription or the lifetime purchase), the App requests no ads and, once your
                    Pro status is known, does not ask for ad consent. Ad requests are not tagged as directed to
                    children, and ad content is limited to material rated T (Teen) or lower.
                  </p>
                  <p className="mt-2">
                    Google&apos;s use of this information is described in the{' '}
                    <ExternalLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink> and
                    in{' '}
                    <ExternalLink href="https://policies.google.com/technologies/partner-sites">
                      How Google uses information from sites or apps that use its services
                    </ExternalLink>
                    .
                  </p>
                </div>

                {/* 6 */}
                <div>
                  <SectionHeading id="firebase" />
                  <h3 className={h3Classes}>Google Analytics for Firebase</h3>
                  <p>
                    The App uses Google Analytics for Firebase to understand how the game is played, find and
                    fix problems, balance gameplay and measure how ads and purchases perform. It is{' '}
                    <strong className={strong}>on by default</strong>, and you can turn it off at any time in{' '}
                    <strong className={strong}>Settings → Privacy → Opt out of analytics</strong>. Turning it off
                    stops collection immediately, and events the App has not yet passed to Analytics are
                    discarded. Your choice does not affect gameplay, saves or purchases.
                  </p>
                  <p className="mt-2">
                    According to Google, the Analytics SDK automatically collects an app-instance ID; the Android
                    advertising ID; coarse location derived from a masked IP address; in-app purchase and
                    subscription events, including the product ID, product name and price; and screen views and
                    sessions. It also records basic device information such as device model, Android version, app
                    version and language.
                  </p>
                  <p className="mt-2">The App adds its own events, which describe:</p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>game modes started and finished, match settings and results, and simulations you choose;</li>
                    <li>
                      saves created and opened, and the type of player you create (such as his position and
                      batting and throwing hand) — never his name;
                    </li>
                    <li>tutorial, practice, challenge and competition progress, and career milestones;</li>
                    <li>player development actions such as skills, attribute upgrades and training;</li>
                    <li>storyline, interview and sponsor choices, recorded by internal ID;</li>
                    <li>
                      display and control preferences (such as theme, control layout and graphics quality) and
                      whether Pro is active;
                    </li>
                    <li>
                      ad placements shown, skipped or unavailable, and the steps of a purchase (the product ID and
                      whether the purchase started, completed, failed, was cancelled or was restored);
                    </li>
                    <li>reminder, review-request, promotion, share and link interactions;</li>
                    <li>technical events such as start-up time, the ad-consent status and save-loading errors.</li>
                  </ul>
                  <p className="mt-2">
                    These events never include the names or text you type, the contents of your saves, your email
                    address, or purchase tokens or receipts. The App does not set a user ID. It passes your choices
                    to Google&apos;s consent mode: analytics storage follows your analytics setting, and the
                    advertising-related signals follow your ad-consent answer and your personalised-ads setting.
                  </p>

                  <h3 className={h3Classes}>Firebase Remote Config</h3>
                  <p>
                    Firebase Remote Config lets us change some of the App&apos;s settings without releasing an
                    update — for example ad timing and frequency limits, switching a feature or an ad format off,
                    when the review request may appear, and maintenance, update or in-app notices. It cannot grant,
                    remove or change your purchases. The App checks for new settings when it starts and when you
                    return to it, at most every 12 hours, and otherwise uses the settings it saved last time.
                  </p>
                  <p className="mt-2">
                    To download settings, Google says the Remote Config SDK collects a Firebase installation ID,
                    your country code, language code and time zone, your Android and platform version, the
                    App&apos;s Firebase app ID and package name, and the SDK version, together with Analytics user
                    properties and the first-open time used for targeting settings. Remote Config is used whether
                    or not you opt out of analytics, because the App needs its settings, but it does not send your
                    gameplay events.
                  </p>
                  <p className="mt-2">
                    Google processes this Firebase information on our behalf. See{' '}
                    <ExternalLink href="https://firebase.google.com/support/privacy">
                      Privacy and Security in Firebase
                    </ExternalLink>
                    .
                  </p>
                </div>

                {/* 7 */}
                <div>
                  <SectionHeading id="purchases" />
                  <p>
                    The App offers optional purchases: Pro, as a weekly, monthly or yearly subscription (the yearly
                    plan may include a free-trial offer) or a one-time lifetime purchase, and one-time items such as
                    coin packs, extra save slots, skill packages and equipment styles.
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-2">
                    <li>
                      Purchases are processed by Google Play Billing using your Google account. Google handles
                      your payment details; we never receive your card number or billing address.
                    </li>
                    <li>
                      Google Play gives the App the product you bought, its purchase status, the order number and a
                      purchase token. The App checks these on your device and stores what it needs — your active
                      entitlements and a short record of purchases in progress — in its private storage, so it can
                      deliver, restore and never double-grant a purchase. We do not run a purchase server, and the
                      App does not use RevenueCat or any other third-party purchase service.
                    </li>
                    <li>
                      Purchase events (the product ID and the outcome) are sent to Google Analytics for Firebase
                      unless you opt out of analytics, and Google Analytics also records in-app purchase events
                      itself (Section 6).
                    </li>
                    <li>
                      Restore earlier purchases with <strong className={strong}>Restore Purchases</strong> in the
                      App&apos;s store screen. Manage or cancel a subscription in Google Play (Profile → Payments
                      &amp; subscriptions → Subscriptions). See{' '}
                      <ExternalLink href="https://support.google.com/googleplay/answer/7018481">
                        Cancel, pause or change a subscription on Google Play
                      </ExternalLink>
                      .
                    </li>
                  </ul>
                </div>

                {/* 8 */}
                <div>
                  <SectionHeading id="third-parties" />
                  <p>The App uses these third-party services, all provided by Google LLC:</p>
                  <ul className="ml-4 mt-2 list-disc space-y-2">
                    <li>
                      <strong className={strong}>Google AdMob</strong> (Google Mobile Ads SDK) and{' '}
                      <strong className={strong}>Google&apos;s User Messaging Platform</strong> — ads and ad
                      consent (Section 5).
                    </li>
                    <li>
                      <strong className={strong}>Google Analytics for Firebase</strong> — app analytics (Section 6).
                    </li>
                    <li>
                      <strong className={strong}>Firebase Remote Config</strong> and Firebase Installations —
                      remote app settings (Section 6).
                    </li>
                    <li>
                      <strong className={strong}>Google Play Billing</strong> and the Google Play Store — purchases,
                      subscriptions, store pages and reviews (Section 7).
                    </li>
                  </ul>
                  <p className="mt-2">
                    When you email us, your message is handled by our email provider (Google Gmail). The App opens
                    links to our website and to Google Play in your browser or the Play Store app; those pages have
                    their own privacy practices.
                  </p>
                  <h3 className={h3Classes}>How information is shared</h3>
                  <ul className="ml-4 list-disc space-y-2">
                    <li>
                      We do not sell your personal information for money, and we do not share your saves, the names
                      you type or your support emails with advertisers.
                    </li>
                    <li>
                      Information collected by the Google services above is sent to Google, which uses it to provide
                      those services to us. For advertising, Google may also use it as described in its own
                      policies — for example, to personalise ads where you have allowed it.
                    </li>
                    <li>
                      Some U.S. state privacy laws treat the use of advertising identifiers for targeted advertising
                      as a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. To opt out, use{' '}
                      <strong className={strong}>Opt out of personalised ads</strong> and, where shown,{' '}
                      <strong className={strong}>Ad privacy options</strong> in Settings → Privacy.
                    </li>
                    <li>
                      We may share aggregated statistics that do not identify anyone, such as the number of people
                      who play a game mode.
                    </li>
                    <li>
                      We may disclose information if the law requires it, to respond to valid legal requests, to
                      protect the rights, safety or property of our users, ourselves or others, or as part of a
                      merger, acquisition or sale of the App, in which case this policy continues to apply to that
                      information.
                    </li>
                  </ul>
                </div>

                {/* 9 */}
                <div>
                  <SectionHeading id="use-of-information" />
                  <ul className="ml-4 list-disc space-y-2">
                    <li>To run the game and keep your progress on your device.</li>
                    <li>
                      To show ads in the free version, measure them, limit how often they appear, deliver the
                      rewards of rewarded ads and prevent ad fraud.
                    </li>
                    <li>To process, deliver, verify and restore purchases.</li>
                    <li>
                      To understand how the game is played, find and fix bugs, balance gameplay and decide what to
                      improve.
                    </li>
                    <li>To change app settings remotely with Firebase Remote Config.</li>
                    <li>
                      To deliver the reminders you have turned on. Reminders are scheduled on your device; the App
                      uses no push server and no notification token.
                    </li>
                    <li>To answer support requests.</li>
                    <li>To comply with the law, enforce our terms and keep the App and its users secure.</li>
                  </ul>
                  <p className="mt-2">
                    We do not use this information to make automated decisions that have legal or similarly
                    significant effects on you.
                  </p>
                  <p className="mt-2">
                    Where the GDPR or the UK GDPR applies, we rely on your consent for personalised advertising and
                    for storing advertising information on your device (requested through Google&apos;s consent
                    message); on our legitimate interests to measure and improve the App, keep it secure and show
                    non-personalised ads; and on the need to perform our contract with you when you buy something.
                    You can withdraw your consent or object at any time with the controls in Section 13.
                  </p>
                </div>

                {/* 10 */}
                <div>
                  <SectionHeading id="security" />
                  <ul className="ml-4 list-disc space-y-2">
                    <li>
                      Game data stays in the App&apos;s private storage, which Android isolates from other apps and
                      which your device&apos;s screen lock and encryption help protect. We recommend using a screen
                      lock.
                    </li>
                    <li>
                      Google states that its Mobile Ads and Analytics SDKs encrypt the data they collect in transit
                      using Transport Layer Security (TLS).
                    </li>
                    <li>
                      Information collected by Google is stored on Google&apos;s servers and protected by
                      Google&apos;s security practices. It may be processed in the United States and other countries
                      where Google operates.
                    </li>
                    <li>Support emails are kept in our support mailbox and used only to handle your request.</li>
                  </ul>
                  <p className="mt-2">
                    No method of storage or transmission is completely secure, and we cannot guarantee absolute
                    security.
                  </p>
                </div>

                {/* 11 */}
                <div>
                  <SectionHeading id="retention-deletion" />
                  <h3 className={h3Classes}>How long information is kept</h3>
                  <ul className="ml-4 list-disc space-y-2">
                    <li>
                      <strong className={strong}>Game data on your device:</strong> until you delete it in the App,
                      clear the App&apos;s storage or uninstall the App. Copies in an Android device backup follow
                      your Google account&apos;s backup settings.
                    </li>
                    <li>
                      <strong className={strong}>Google Analytics for Firebase:</strong> user-level and event-level
                      data is deleted automatically at the end of the retention period set in our Google Analytics
                      settings (Google offers 2 or 14 months for standard properties). Aggregated reports that do
                      not identify anyone may be kept longer.
                    </li>
                    <li>
                      <strong className={strong}>Firebase installation IDs (Remote Config):</strong> kept by Firebase
                      until they are deleted. Google states that after deletion the data is removed from its live and
                      backup systems within 180 days.
                    </li>
                    <li>
                      <strong className={strong}>Advertising data:</strong> kept by Google according to its own
                      policies; see{' '}
                      <ExternalLink href="https://policies.google.com/technologies/retention">
                        How Google retains data it collects
                      </ExternalLink>
                      .
                    </li>
                    <li>
                      <strong className={strong}>Purchases:</strong> Google Play keeps transaction records under its
                      own policies. The entitlements and purchase record on your device stay until you erase them,
                      and purchases can be restored from Google Play afterwards.
                    </li>
                    <li>
                      <strong className={strong}>Support emails:</strong> up to 24 months after our last exchange,
                      unless we must keep them longer for legal, security or dispute-resolution reasons.
                    </li>
                  </ul>

                  <h3 className={h3Classes}>How to delete information</h3>
                  <ul className="ml-4 list-disc space-y-2">
                    <li>
                      <strong className={strong}>On your device:</strong> Settings → Data → Delete (one save) or
                      Erase everything; or clear the App&apos;s storage, or uninstall the App.
                    </li>
                    <li>
                      <strong className={strong}>Stop collection:</strong> opt out of analytics, opt out of
                      personalised ads, reset or delete your advertising ID, get Pro (no ads are requested), or
                      uninstall the App.
                    </li>
                    <li>
                      <strong className={strong}>Ask us:</strong> email <SupportEmail /> with the subject
                      &ldquo;Privacy request – {app}&rdquo;. We will respond within a reasonable time and within the
                      time required by applicable law. We delete support emails and any other information we hold
                      about you on request, unless the law requires us to keep it.
                    </li>
                  </ul>
                  <p className="mt-2">
                    Because the App has no accounts, we usually cannot match an email request to the analytics or
                    advertising records of a particular device. Where we cannot identify those records, they are
                    deleted automatically at the end of the retention periods above.
                  </p>
                </div>

                {/* 12 */}
                <div>
                  <SectionHeading id="children" />
                  <p>
                    {app} is a general-audience sports game intended for players aged 13 and older. It is not
                    directed to children under 13, and we do not knowingly collect personal information from
                    children under 13. Ad requests from the App are not tagged as directed to children, and ad
                    content is limited to material rated T (Teen) or lower.
                  </p>
                  <p className="mt-2">
                    If the law where you live sets a higher minimum age for agreeing to the processing of personal
                    data — 16 in some countries of the European Economic Area, for example — ask a parent or
                    guardian before you agree to personalised advertising.
                  </p>
                  <p className="mt-2">
                    If you believe a child under 13 has given us personal information, for example by emailing
                    support, contact us at <SupportEmail /> and we will delete it.
                  </p>
                </div>

                {/* 13 */}
                <div>
                  <SectionHeading id="rights" />
                  <h3 className={h3Classes}>Controls in the App (no account needed)</h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Settings → Privacy → Opt out of analytics</li>
                    <li>Settings → Privacy → Opt out of personalised ads</li>
                    <li>Settings → Privacy → Ad privacy options (shown when Google&apos;s consent tools require it)</li>
                    <li>Settings → Notifications — choose which reminders you get, or turn them off</li>
                    <li>Settings → Data — delete saves or erase everything</li>
                  </ul>
                  <h3 className={h3Classes}>Controls on your device</h3>
                  <p>
                    Reset or delete your advertising ID, change the App&apos;s notification permission, clear its
                    storage or uninstall it in Android settings.
                  </p>
                  <h3 className={h3Classes}>Your legal rights</h3>
                  <p>
                    Depending on where you live — for example in the European Economic Area, the United Kingdom,
                    Switzerland, California and other U.S. states — you may have the right to access, correct or
                    delete your personal information; to restrict or object to its processing; to receive a copy
                    of it; to withdraw consent; to opt out of targeted advertising or the &ldquo;sale&rdquo; or
                    &ldquo;sharing&rdquo; of personal information; and not to be treated differently for using these
                    rights. You may also complain to your local data protection authority.
                  </p>
                  <p className="mt-2">
                    To make a request, email <SupportEmail />. We may ask for information to verify the request (for
                    example, the email address you used to contact us), and we will answer within the time the law
                    requires.
                  </p>
                </div>

                {/* 14 */}
                <div>
                  <SectionHeading id="changes" />
                  <p>
                    We may update this Privacy Policy when the App or the law changes. We will post the new version
                    on this page and change the &ldquo;Last updated&rdquo; date at the top. Where the law requires
                    it, we will give you additional notice or ask for your consent.
                  </p>
                </div>

                {/* 15 */}
                <div>
                  <SectionHeading id="contact" />
                  <p>Questions or requests about this policy or your information:</p>
                  <div className="mt-4 rounded-xl border border-ink-100 bg-cream-50 p-5">
                    <p className="font-semibold text-ink-950">{companyInfo.name}</p>
                    <p className="mt-1">
                      Publisher of {app} on Google Play as {companyInfo.developerName}
                    </p>
                    <p className="mt-1">
                      Email: <SupportEmail />
                    </p>
                    <p className="mt-1">
                      Website:{' '}
                      <Link href="/" className="link-accent">
                        {companyInfo.domain}
                      </Link>
                    </p>
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
                      In the App: Settings → Privacy → Contact Support, or our{' '}
                      <Link href="/support/" className="link-accent">
                        support page
                      </Link>
                      .
                    </p>
                  </div>
                  <p className="mt-4 text-sm">
                    Related:{' '}
                    <Link href="/privacy/" className="link-accent">
                      Reign Creative LLC Privacy Policy
                    </Link>{' '}
                    ·{' '}
                    <Link href="/terms/" className="link-accent">
                      Terms of Service
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
