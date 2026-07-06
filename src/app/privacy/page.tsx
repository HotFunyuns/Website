import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Privacy Policy — Reign Creative LLC',
  description:
    'Privacy Policy for Reign Creative LLC and its mobile applications. Learn how we collect, use, and protect your information.',
  alternates: { canonical: '/privacy/' },
  openGraph: {
    title: 'Privacy Policy — Reign Creative LLC',
    description:
      'Privacy Policy for Reign Creative LLC and its mobile applications. Learn how we collect, use, and protect your information.',
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
};

const h2Classes = 'mb-3 font-display text-xl font-semibold text-ink-950';
const h3Classes = 'mb-2 mt-4 text-base font-semibold text-ink-800';

export default function PrivacyPage() {
  const lastUpdated = 'June 2, 2026';

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={
          <>
            Privacy <em className="gold-text not-italic">Policy</em>
          </>
        }
        description="Your privacy matters to us. This policy explains how we handle your information."
      />

      <section className="section-padding !pt-8">
        <div className="container-narrow mx-auto">
          <Reveal>
            <div className="card-premium p-8 sm:p-12">
              <p className="mb-8 text-sm font-medium text-ink-400">Last Updated: {lastUpdated}</p>

              <div className="space-y-10 leading-relaxed text-ink-600">
                <div>
                  <h2 className={h2Classes}>1. Introduction</h2>
                  <p>
                    {companyInfo.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to
                    protecting your privacy. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our mobile applications
                    and visit our website at {companyInfo.domain} (collectively, the
                    &ldquo;Services&rdquo;).
                  </p>
                  <p className="mt-2">
                    By using our Services, you agree to the collection and use of information in
                    accordance with this policy. If you do not agree, please do not use our
                    Services.
                  </p>
                </div>

                <div>
                  <h2 className={h2Classes}>2. Information We Collect</h2>
                  <h3 className={h3Classes}>Information You Provide</h3>
                  <p>
                    When you contact us for support or send us a message, you may provide personal
                    information such as your name and email address. We only use this information to
                    respond to your inquiry.
                  </p>
                  <h3 className={h3Classes}>On-Device App Data (Local Only)</h3>
                  <p>
                    Diet and keto tracking entries, macro logs, weight and progress data,
                    reminders, streaks, preferences, and settings are stored locally on your
                    device. This data is not transmitted to or stored on our servers, and we do
                    not provide cloud sync or server-side accounts for this information. It remains
                    on your device until you delete entries, clear the app&apos;s storage, or
                    uninstall the app.
                  </p>
                  <h3 className={h3Classes}>Automatically Collected Information</h3>
                  <p>
                    Our applications may collect certain information automatically, including device
                    type, operating system version, app version, diagnostics, and general usage
                    analytics. This data is used to improve app performance and user experience.
                  </p>
                  <h3 className={h3Classes}>Advertising Identifier (Ad ID)</h3>
                  <p>
                    Apps that display advertisements through Google AdMob may use your device&apos;s
                    advertising identifier. This identifier may be used for showing ads, ad
                    personalization where enabled, frequency capping, fraud prevention, and
                    measuring ad performance. You can reset or limit your advertising identifier in
                    your device settings.
                  </p>
                  <h3 className={h3Classes}>Third-Party Services</h3>
                  <p>
                    Some of our apps use third-party services such as Google AdMob for
                    advertisements, Google Play Services, and Google Play Billing for in-app
                    purchases where an app offers them. These services may collect information such
                    as device identifiers, usage data, advertising identifiers, and purchase
                    information.
                  </p>
                  <p className="mt-2">
                    These third-party services operate under their own privacy policies, and we
                    encourage you to review them:
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>
                      Google Privacy Policy:{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        className="link-accent"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://policies.google.com/privacy
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className={h2Classes}>3. How We Use Your Information</h2>
                  <ul className="ml-4 list-disc space-y-2">
                    <li>To provide, maintain, and improve our Services</li>
                    <li>To respond to your support requests and inquiries</li>
                    <li>To monitor usage patterns and improve app performance</li>
                    <li>To detect and prevent technical issues or abuse</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className={h2Classes}>4. Data Storage &amp; Security</h2>
                  <p>
                    We take the security of your data seriously. We implement industry-standard
                    security measures to protect your information from unauthorized access,
                    alteration, disclosure, or destruction. However, no method of electronic
                    transmission or storage is 100% secure, and we cannot guarantee absolute
                    security.
                  </p>
                </div>

                <div>
                  <h2 className={h2Classes}>5. Data Retention</h2>
                  <p>
                    We retain personal information only for as long as necessary to provide our
                    Services, comply with legal obligations, resolve disputes, prevent abuse, and
                    enforce our agreements.
                  </p>
                  <p className="mt-2">
                    <strong className="font-semibold text-ink-800">Local app data:</strong>{' '}
                    Diet tracking entries, keto progress, macro logs, preferences, reminders,
                    streaks, and settings are stored locally on the user&apos;s device unless a
                    feature clearly states that cloud storage is being used. Local app data remains
                    on the device until the user deletes entries, clears app storage, or uninstalls
                    the app.
                  </p>
                  <p className="mt-2">
                    <strong className="font-semibold text-ink-800">Support data:</strong>{' '}
                    If a user contacts us for support, we may retain the user&apos;s name, email
                    address, message content, and related support records for up to 24 months after
                    the last interaction, unless a longer period is required for legal, security, or
                    dispute-resolution purposes.
                  </p>
                  <p className="mt-2">
                    <strong className="font-semibold text-ink-800">
                      Purchase/subscription data:
                    </strong>{' '}
                    If the app uses Google Play Billing or another purchase provider, purchase status
                    and transaction-related information may be retained for as long as necessary to
                    provide access to purchased features, comply with tax/accounting/legal
                    obligations, prevent fraud, and resolve billing disputes.
                  </p>
                  <p className="mt-2">
                    <strong className="font-semibold text-ink-800">
                      Advertising and analytics data:
                    </strong>{' '}
                    Advertising identifiers, device information, diagnostics, app version, usage
                    data, and analytics data may be collected and retained by third-party providers
                    such as Google AdMob, Google Play Services, Google Play Billing, and RevenueCat
                    if used. These providers retain data according to their own privacy policies.
                  </p>
                  <p className="mt-2">
                    <strong className="font-semibold text-ink-800">
                      Legal/security records:
                    </strong>{' '}
                    We may retain limited information for longer where necessary to comply with legal
                    obligations, enforce our terms, prevent fraud or abuse, maintain security, or
                    resolve disputes.
                  </p>
                  <p className="mt-2">
                    When information is no longer needed, we delete it, anonymize it, or securely
                    retain it only as required by law.
                  </p>
                  <p className="mt-2">
                    Users may contact us at{' '}
                    <a
                      href="mailto:ReignCreativeSupport@gmail.com"
                      className="link-accent"
                      rel="noopener noreferrer"
                    >
                      ReignCreativeSupport@gmail.com
                    </a>{' '}
                    to request access, correction, or deletion of personal information associated
                    with their use of our Services.
                  </p>
                </div>

                <div>
                  <h2 className={h2Classes}>6. Data Sharing</h2>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We
                    may share anonymized, aggregate data for analytics purposes. We may disclose
                    your information if required by law or to protect our rights, safety, or
                    property.
                  </p>
                  <p className="mt-2">
                    We may share limited data with trusted third-party partners such as Google
                    AdMob for advertising and Google Play Billing for payment processing where an
                    app offers in-app purchases.
                  </p>
                </div>

                <div>
                  <h2 className={h2Classes}>7. Data Deletion Requests</h2>
                  <p>
                    Our apps do not require you to create an account, and we do not maintain online
                    user profiles for them. Because your tracking data is stored locally, you remain
                    in control of it at all times.
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-2">
                    <li>
                      You can delete your local app data at any time by deleting individual entries,
                      clearing the app&apos;s storage in your device settings, or uninstalling the
                      app.
                    </li>
                    <li>
                      To request deletion of any personal information we may hold (such as support
                      correspondence), email{' '}
                      <a
                        href="mailto:ReignCreativeSupport@gmail.com"
                        className="link-accent"
                        rel="noopener noreferrer"
                      >
                        ReignCreativeSupport@gmail.com
                      </a>{' '}
                      and we will respond within a reasonable timeframe.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className={h2Classes}>8. Health &amp; Wellness Disclaimer</h2>
                  <p>
                    Our health and wellness applications, including Keto Tracker, are provided for
                    general wellness and educational purposes only. They are not medical advice,
                    diagnosis, or treatment, and they are not a substitute for professional medical
                    guidance.
                  </p>
                  <p className="mt-2">
                    You should consult a qualified healthcare professional before starting a keto
                    diet, fasting, or any major dietary change, or before relying on the app for any
                    medical condition. This is especially important if you have or have had
                    diabetes, are pregnant, have a history of an eating disorder, have kidney
                    disease, take medication, or have any other health condition. Use of the app is
                    at your own discretion and risk.
                  </p>
                </div>

                <div>
                  <h2 className={h2Classes}>9. Children&apos;s Privacy</h2>
                  <p>
                    Our Services are not directed to children under 13. We do not knowingly collect
                    personal information from children under 13. If you believe we have collected
                    information from a child under 13, please contact us immediately and we will
                    take steps to remove that information.
                  </p>
                </div>

                <div>
                  <h2 className={h2Classes}>10. Your Rights</h2>
                  <p>
                    Depending on your jurisdiction, you may have the right to access, correct,
                    delete, or restrict the processing of your personal information. To exercise
                    any of these rights, please contact us using the information below.
                  </p>
                </div>

                <div>
                  <h2 className={h2Classes}>11. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify users of
                    any material changes by posting the new policy on this page and updating the
                    &ldquo;Last Updated&rdquo; date. We encourage you to review this policy periodically.
                  </p>
                </div>

                <div>
                  <h2 className={h2Classes}>12. Contact Us</h2>
                  <p>
                    If you have questions or concerns about this Privacy Policy, please contact us
                    at:
                  </p>
                  <div className="mt-4 rounded-xl border border-ink-100 bg-cream-50 p-5">
                    <p className="font-semibold text-ink-950">{companyInfo.name}</p>
                    <p className="mt-1">
                      Email:{' '}
                      <a
                        href={`mailto:${companyInfo.supportEmail}`}
                        className="link-accent"
                        rel="noopener noreferrer"
                      >
                        {companyInfo.supportEmail}
                      </a>
                    </p>
                    <p className="mt-1">Website: {companyInfo.domain}</p>
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
