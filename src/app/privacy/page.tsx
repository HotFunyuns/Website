import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Reign Creative LLC and its mobile applications. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  const lastUpdated = 'April 29, 2026';

  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="Your privacy matters to us. This policy explains how we handle your information."
      />

      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <div className="glass-card p-8 sm:p-10">
              <p className="mb-8 text-sm text-surface-200/40">Last Updated: {lastUpdated}</p>

              <div className="prose-invert space-y-8 text-surface-200/70 leading-relaxed">
                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">1. Introduction</h2>
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
                  <h2 className="mb-3 text-xl font-semibold text-white">
                    2. Information We Collect
                  </h2>
                  <h3 className="mb-2 mt-4 text-base font-semibold text-surface-200/90">
                    Information You Provide
                  </h3>
                  <p>
                    When you contact us for support or send us a message, you may provide personal
                    information such as your name and email address. We only use this information to
                    respond to your inquiry.
                  </p>
                  <h3 className="mb-2 mt-4 text-base font-semibold text-surface-200/90">
                    Automatically Collected Information
                  </h3>
                  <p>
                    Our applications may collect certain information automatically, including device
                    type, operating system version, app version, and general usage analytics. This
                    data is collected in aggregate and is used to improve app performance and user
                    experience.
                  </p>
                  <p className="mt-2">
                    This may include device identifiers and advertising identifiers used for
                    analytics, app functionality, and ad personalization.
                  </p>
                  <h3 className="mb-2 mt-4 text-base font-semibold text-surface-200/90">
                    Third-Party Services
                  </h3>
                  <p>
                    Some of our apps use third-party services such as Google AdMob for
                    advertisements, Google Play Services, Google Play Billing for in-app purchases,
                    and RevenueCat for managing purchases and subscriptions. These services may
                    collect information such as device identifiers, usage data, advertising
                    identifiers, and purchase information.
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
                        className="text-brand-400 hover:text-brand-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://policies.google.com/privacy
                      </a>
                    </li>
                    <li>
                      RevenueCat Privacy Policy:{' '}
                      <a
                        href="https://www.revenuecat.com/privacy"
                        className="text-brand-400 hover:text-brand-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://www.revenuecat.com/privacy
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">
                    3. How We Use Your Information
                  </h2>
                  <ul className="ml-4 list-disc space-y-2">
                    <li>To provide, maintain, and improve our Services</li>
                    <li>To respond to your support requests and inquiries</li>
                    <li>To monitor usage patterns and improve app performance</li>
                    <li>To detect and prevent technical issues or abuse</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">4. Data Storage & Security</h2>
                  <p>
                    We take the security of your data seriously. We implement industry-standard
                    security measures to protect your information from unauthorized access,
                    alteration, disclosure, or destruction. However, no method of electronic
                    transmission or storage is 100% secure, and we cannot guarantee absolute
                    security.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">5. Data Sharing</h2>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We
                    may share anonymized, aggregate data for analytics purposes. We may disclose
                    your information if required by law or to protect our rights, safety, or
                    property.
                  </p>
                  <p className="mt-2">
                    We may share limited data with trusted third-party partners such as Google
                    AdMob for advertising, Google Play Billing for payment processing, and
                    RevenueCat for purchase verification and subscription management.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">6. Children&apos;s Privacy</h2>
                  <p>
                    Our Services are not directed to children under 13. We do not knowingly collect
                    personal information from children under 13. If you believe we have collected
                    information from a child under 13, please contact us immediately and we will
                    take steps to remove that information.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">7. Your Rights</h2>
                  <p>
                    Depending on your jurisdiction, you may have the right to access, correct,
                    delete, or restrict the processing of your personal information. To exercise
                    any of these rights, please contact us using the information below.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">
                    8. Changes to This Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify users of
                    any material changes by posting the new policy on this page and updating the
                    &ldquo;Last Updated&rdquo; date. We encourage you to review this policy periodically.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">9. Contact Us</h2>
                  <p>
                    If you have questions or concerns about this Privacy Policy, please contact us
                    at:
                  </p>
                  <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="font-medium text-white">{companyInfo.name}</p>
                    <p className="mt-1">
                      Email:{' '}
                      <a
                        href={`mailto:${companyInfo.supportEmail}`}
                        className="text-brand-400 hover:text-brand-300"
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
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
