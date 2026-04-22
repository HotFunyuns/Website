import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AppCard from '@/components/AppCard';
import AnimatedSection from '@/components/AnimatedSection';
import { apps, companyInfo } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Apps',
  description:
    'Explore the full portfolio of mobile apps and digital products built by Reign Creative LLC.',
};

export default function AppsPage() {
  const categories = Array.from(new Set(apps.map((a) => a.category))).sort();

  return (
    <>
      <PageHeader
        title="Our Apps"
        description="A growing portfolio of mobile applications designed with care and built to last."
      />

      {/* Stats */}
      <section className="section-padding pb-8">
        <div className="container-wide mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: 'Total Apps', value: apps.length.toString() },
                { label: 'Categories', value: categories.length.toString() },
                {
                  label: 'Published',
                  value: apps.filter((a) => a.status === 'Published').length.toString(),
                },
                {
                  label: 'In Development',
                  value: apps.filter((a) => a.status === 'In Development').length.toString(),
                },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-5 text-center">
                  <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-surface-200/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* App Grid */}
      <section className="section-padding pt-8">
        <div className="container-wide mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface-900/30">
        <div className="container-narrow mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">More Apps on the Way</h2>
            <p className="mx-auto mt-4 max-w-xl text-surface-200/60">
              We are actively developing new applications. Have a question about any of our apps,
              or want to report an issue? We are here to help.
            </p>
            <div className="mt-8">
              <a
                href={`mailto:${companyInfo.supportEmail}`}
                className="btn-primary px-8 py-3"
                rel="noopener noreferrer"
              >
                Contact Support
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
