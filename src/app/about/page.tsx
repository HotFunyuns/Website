import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Reign Creative LLC — a mobile app development studio focused on quality, usability, and building digital products people love.',
};

const values = [
  {
    title: 'Quality Over Quantity',
    description:
      'We would rather ship one exceptional app than ten mediocre ones. Every product we release meets a high standard for design, performance, and reliability.',
    icon: '✦',
  },
  {
    title: 'User-Centered Design',
    description:
      'Our development process starts and ends with the people who use our apps. We prioritize intuitive interfaces, clear navigation, and thoughtful user flows.',
    icon: '◎',
  },
  {
    title: 'Continuous Improvement',
    description:
      'We treat every app as a living product. Regular updates, performance improvements, and responsiveness to user feedback keep our apps relevant and reliable.',
    icon: '↗',
  },
  {
    title: 'Transparency & Trust',
    description:
      'We believe in clear communication — from honest app descriptions to straightforward privacy policies. Our users deserve to know exactly what they are getting.',
    icon: '◇',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Reign Creative"
        description="A mobile app development studio committed to building polished digital products that solve real problems."
      />

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <div className="glass-card p-8 sm:p-10">
                <h2 className="mb-6 text-2xl font-bold text-white">Who We Are</h2>
                <div className="space-y-4 text-surface-200/70 leading-relaxed">
                  <p>
                    Reign Creative LLC is a software development company specializing in mobile
                    applications and digital products. We design, build, and maintain apps across
                    categories including health and fitness, education, productivity, entertainment,
                    and more.
                  </p>
                  <p>
                    Our approach is simple: identify genuine needs, design clean solutions, and
                    deliver polished experiences. We do not chase trends or cut corners — we focus
                    on building products that work well, look great, and stand the test of time.
                  </p>
                  <p>
                    Every app in our portfolio is developed with attention to detail, from the
                    initial concept through design, development, testing, and ongoing support. We
                    take pride in creating software that people actually enjoy using.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface-900/30">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="Our Values"
            title="What Drives Our Work"
            description="The principles that guide every product decision we make."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="glass-card-hover h-full p-6">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-lg text-brand-400">
                    {value.icon}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-white">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-surface-200/60">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <div className="glass-card p-8 sm:p-10">
                <h2 className="mb-6 text-2xl font-bold text-white">What Sets Us Apart</h2>
                <div className="space-y-4 text-surface-200/70 leading-relaxed">
                  <p>
                    We are not a large agency or a faceless corporation. Reign Creative LLC is a
                    focused development studio that cares deeply about the products we ship. Every
                    app gets the same level of dedication — whether it is a utility tool, a health
                    tracker, or a game.
                  </p>
                  <p>
                    Our users can always reach us. We provide direct support for every app we
                    publish, and we genuinely listen to feedback. When someone takes the time to
                    write to us, they get a real response.
                  </p>
                  <p>
                    We build for longevity. Our apps are designed to be maintained and improved over
                    time, not launched and abandoned. When you download one of our products, you are
                    getting something we intend to support for the long run.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
