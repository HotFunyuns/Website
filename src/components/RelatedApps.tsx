import Link from 'next/link';
import type { AppInfo } from '@/data/apps';

/**
 * Other apps from the catalog, as a compact list: icon, name, category and a
 * one-line tagline. It used to render full catalog cards, whose descriptions
 * were repeated word for word on every app page that showed the same three
 * neighbours — the largest block of text two app pages had in common. The
 * tagline is shorter, and getRelatedApps rotates through the category so
 * neighbouring pages show different apps.
 */
export default function RelatedApps({ apps }: { apps: AppInfo[] }) {
  if (apps.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <p className="eyebrow">Keep exploring</p>
      <h2 id="related-heading" className="display-title mt-4 text-3xl sm:text-4xl">
        More from Reign Creative
      </h2>
      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <li key={app.slug}>
            <Link
              href={`/apps/${app.slug}/`}
              className="card-premium-hover group flex h-full items-center gap-4 p-5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.iconSmall}
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 shrink-0 rounded-xl shadow-icon-tile ring-1 ring-ink-950/10"
              />
              <span>
                <span className="block font-display text-base font-semibold text-ink-950 transition-colors group-hover:text-crimson-600">
                  {app.name}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-ink-500">{app.category}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
