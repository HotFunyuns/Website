import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { apps, companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Developer Information',
  description:
    'Official developer and app support information for Reign Creative LLC. Company details, app portfolio, and support resources.',
};

export default function AppSupportPage() {
  return (
    <>
      <PageHeader
        title="Developer Information"
        description="Official company and app support details for Reign Creative LLC."
      />

      <section className="section-padding">
        <div className="container-narrow mx-auto space-y-8">
          {/* Company Details */}
          <AnimatedSection>
            <div className="glass-card p-8 sm:p-10">
              <h2 className="mb-6 text-2xl font-bold text-white">Company Information</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-200/40">
                    Company Name
                  </h3>
                  <p className="text-lg font-medium text-white">{companyInfo.name}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-200/40">
                    Official Website
                  </h3>
                  <p className="text-lg font-medium text-white">{companyInfo.domain}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-200/40">
                    Support Email
                  </h3>
                  <a
                    href={`mailto:${companyInfo.supportEmail}`}
                    className="text-lg font-medium text-brand-400 transition-colors hover:text-brand-300"
                    rel="noopener noreferrer"
                  >
                    {companyInfo.supportEmail}
                  </a>
                </div>
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-200/40">
                    Type
                  </h3>
                  <p className="text-lg font-medium text-white">
                    Mobile App Development Company
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Support Statement */}
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-8 sm:p-10">
              <h2 className="mb-4 text-2xl font-bold text-white">User Support</h2>
              <div className="space-y-3 text-surface-200/70 leading-relaxed">
                <p>
                  {companyInfo.name} is committed to providing responsive support for all of our
                  published applications. Users can contact us for assistance with app functionality,
                  bug reports, feature requests, account issues, or any other concerns.
                </p>
                <p>
                  All support inquiries can be directed to{' '}
                  <a
                    href={`mailto:${companyInfo.supportEmail}`}
                    className="text-brand-400 hover:text-brand-300"
                    rel="noopener noreferrer"
                  >
                    {companyInfo.supportEmail}
                  </a>
                  . We aim to respond within 24–48 hours during business days.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Apps List */}
          <AnimatedSection delay={0.15}>
            <div className="glass-card p-8 sm:p-10">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Applications & Products
              </h2>
              <div className="space-y-3">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${app.gradient} text-sm`}
                      >
                        {app.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{app.name}</p>
                        <p className="text-xs text-surface-200/40">{app.category}</p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        app.status === 'Published'
                          ? 'border-green-400/30 bg-green-400/10 text-green-300'
                          : app.status === 'In Development'
                          ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                          : 'border-blue-400/30 bg-blue-400/10 text-blue-300'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Policies */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card p-8 sm:p-10">
              <h2 className="mb-4 text-2xl font-bold text-white">Policies & Legal</h2>
              <p className="mb-6 text-surface-200/70">
                Our policies are publicly available and apply to all users of our applications and
                website. We encourage all users to review them.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/privacy/" className="btn-secondary px-6 py-2.5 text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms/" className="btn-secondary px-6 py-2.5 text-sm">
                  Terms of Service
                </Link>
                <Link href="/support/" className="btn-secondary px-6 py-2.5 text-sm">
                  Contact Support
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
