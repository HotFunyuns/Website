import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import AnimatedSection from '@/components/AnimatedSection';
import { companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help with Reign Creative LLC apps. Contact us for support, bug reports, feature requests, or business inquiries.',
};

const supportTopics = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    title: 'App Support',
    description: 'Having trouble with one of our apps? Let us know and we will help resolve it.',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152-6.135c-.117-1.16-.913-2.08-1.99-2.42A18.645 18.645 0 0012 5.25a18.645 18.645 0 00-5.064.345c-1.078.34-1.874 1.26-1.99 2.42a23.912 23.912 0 01-1.153 6.135A23.93 23.93 0 0112 12.75z" />
      </svg>
    ),
    title: 'Bug Reports',
    description: 'Found a bug? Report it and we will prioritize a fix in our next update.',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: 'Feature Requests',
    description: 'Have an idea for improvement? We value user feedback and consider every suggestion.',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    title: 'Business Inquiries',
    description: 'Interested in working with us or have a business question? Get in touch.',
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="Support & Contact"
        description="We are here to help. Reach out for app support, bug reports, feature requests, or business inquiries."
      />

      {/* Support Topics */}
      <section className="section-padding pb-8">
        <div className="container-narrow mx-auto">
          <div className="grid gap-4 sm:grid-cols-2">
            {supportTopics.map((topic, i) => (
              <AnimatedSection key={topic.title} delay={i * 0.08}>
                <div className="glass-card-hover flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{topic.title}</h3>
                    <p className="mt-1 text-sm text-surface-200/60">{topic.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding pt-8">
        <div className="container-narrow mx-auto">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <h2 className="mb-6 text-2xl font-bold text-white">Send Us a Message</h2>
                <ContactForm />
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.15}>
                <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>
                <div className="glass-card space-y-6 p-6 sm:p-8">
                  <div>
                    <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-200/40">
                      Email
                    </h3>
                    <a
                      href={`mailto:${companyInfo.supportEmail}`}
                      className="text-brand-400 transition-colors hover:text-brand-300"
                      rel="noopener noreferrer"
                    >
                      {companyInfo.supportEmail}
                    </a>
                  </div>
                  <div>
                    <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-200/40">
                      Website
                    </h3>
                    <span className="text-surface-200/80">{companyInfo.domain}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-200/40">
                      Company
                    </h3>
                    <span className="text-surface-200/80">{companyInfo.name}</span>
                  </div>
                  <div className="border-t border-white/5 pt-6">
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-200/40">
                      Response Time
                    </h3>
                    <p className="text-sm text-surface-200/60">
                      We aim to respond to all inquiries within 24–48 hours during business days.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
