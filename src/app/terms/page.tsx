import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Reign Creative LLC and its mobile applications.',
};

export default function TermsPage() {
  const lastUpdated = 'April 22, 2026';

  return (
    <>
      <PageHeader
        title="Terms of Service"
        description="Please read these terms carefully before using our services."
      />

      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <div className="glass-card p-8 sm:p-10">
              <p className="mb-8 text-sm text-surface-200/40">Last Updated: {lastUpdated}</p>

              <div className="prose-invert space-y-8 text-surface-200/70 leading-relaxed">
                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using any mobile application, website, or service provided by{' '}
                    {companyInfo.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you agree to be
                    bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these
                    Terms, do not use our Services.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">2. Use of Services</h2>
                  <p>
                    You agree to use our Services only for lawful purposes and in accordance with
                    these Terms. You agree not to:
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-2">
                    <li>Use the Services in any way that violates applicable laws or regulations</li>
                    <li>Attempt to interfere with or disrupt the Services or servers</li>
                    <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
                    <li>Use the Services to transmit harmful, offensive, or illegal content</li>
                    <li>Attempt to gain unauthorized access to any part of the Services</li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">3. Intellectual Property</h2>
                  <p>
                    All content, features, and functionality of our Services — including but not
                    limited to text, graphics, logos, icons, images, audio, software, and code — are
                    the exclusive property of {companyInfo.name} and are protected by copyright,
                    trademark, and other intellectual property laws.
                  </p>
                  <p className="mt-2">
                    You may not reproduce, distribute, modify, create derivative works of, publicly
                    display, or otherwise use any content from our Services without our prior
                    written consent.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">4. User Accounts</h2>
                  <p>
                    Some of our applications may require or allow you to create an account. You are
                    responsible for maintaining the confidentiality of your account credentials and
                    for all activities that occur under your account. You agree to notify us
                    immediately of any unauthorized use of your account.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">5. In-App Purchases</h2>
                  <p>
                    Some of our applications may offer in-app purchases or subscriptions. All
                    purchases are processed through the applicable app store (e.g., Google Play)
                    and are subject to that platform&apos;s terms and refund policies. We are not
                    responsible for processing payments or issuing refunds for purchases made
                    through third-party platforms.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">6. Disclaimer of Warranties</h2>
                  <p>
                    Our Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of
                    any kind, either express or implied. We do not warrant that the Services will
                    be uninterrupted, error-free, or free of harmful components. You use the
                    Services at your own risk.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">7. Limitation of Liability</h2>
                  <p>
                    To the fullest extent permitted by law, {companyInfo.name} shall not be liable
                    for any indirect, incidental, special, consequential, or punitive damages
                    arising from or related to your use of the Services, regardless of the cause of
                    action or the theory of liability.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">8. Termination</h2>
                  <p>
                    We reserve the right to suspend or terminate your access to our Services at any
                    time, without notice, for conduct that we believe violates these Terms or is
                    harmful to other users, us, or third parties.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">9. Changes to Terms</h2>
                  <p>
                    We may revise these Terms at any time by posting the updated version on this
                    page. Your continued use of the Services after changes are posted constitutes
                    your acceptance of the revised Terms. We encourage you to review these Terms
                    periodically.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">10. Governing Law</h2>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of
                    the United States, without regard to conflict of law principles.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-white">11. Contact Us</h2>
                  <p>
                    If you have questions about these Terms of Service, please contact us at:
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
