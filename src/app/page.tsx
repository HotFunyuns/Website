import Link from 'next/link';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import AppCard from '@/components/AppCard';
import AnimatedSection from '@/components/AnimatedSection';
import { apps, companyInfo } from '@/data/apps';

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: 'Mobile-First Design',
    description: 'Every app is crafted for the best possible mobile experience, from day one.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Polished Experiences',
    description: 'We obsess over the details — smooth interactions, clean visuals, and intuitive flows.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Reliable & Supported',
    description: 'Our apps are built to last, with ongoing updates and responsive support.',
  },
];

export default function HomePage() {
  const featuredApps = apps.slice(0, 6);

  return (
    <>
      <Hero />

      {/* What We Do */}
      <section className="section-padding relative">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="What We Do"
            title="Building Digital Products That Stand Out"
            description="We combine thoughtful design with solid engineering to create mobile apps that are a pleasure to use."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <div className="glass-card-hover p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-surface-200/60">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apps */}
      <section className="section-padding relative bg-surface-900/30">
        <div className="container-wide mx-auto">
          <SectionHeading
            label="Our Apps"
            title="Featured Applications"
            description="A selection of the mobile apps and digital products we are building."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredApps.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Link href="/apps/" className="btn-secondary px-8 py-3">
              View All Apps
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="glow-orb left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-brand-500/10 animate-pulse-glow" />
        <div className="container-narrow relative z-10 mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Questions or Feedback?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-surface-200/60">
              We are here to help. Reach out for app support, bug reports, feature requests, or business inquiries.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/support/" className="btn-primary px-8 py-3.5 text-base">
                Contact Support
              </Link>
              <Link href="/privacy/" className="btn-secondary px-8 py-3.5 text-base">
                Privacy Policy
              </Link>
            </div>
            <p className="mt-6 text-sm text-surface-200/40">
              {companyInfo.supportEmail}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
