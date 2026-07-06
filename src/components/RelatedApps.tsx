import type { AppInfo } from '@/data/apps';
import AppCard from './AppCard';
import Reveal from './Reveal';

export default function RelatedApps({ apps }: { apps: AppInfo[] }) {
  if (apps.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <Reveal>
        <p className="eyebrow">Keep exploring</p>
        <h2 id="related-heading" className="display-title mt-4 text-3xl sm:text-4xl">
          More from Reign Creative
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app, i) => (
          <Reveal key={app.slug} delay={i * 80} className="h-full">
            <AppCard app={app} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
