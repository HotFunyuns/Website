import type { AppScreenshot } from '@/data/apps';

/**
 * Listing screenshots for an app page. Self-hosted, lazy-loaded and sized up
 * front, so the row never shifts the layout while images arrive. On a phone it
 * scrolls sideways inside its own region (keyboard-focusable, labelled) rather
 * than widening the page.
 */
export default function AppScreenshots({ appName, shots }: { appName: string; shots: AppScreenshot[] }) {
  if (shots.length === 0) return null;
  return (
    <section className="section-padding !pt-0" aria-labelledby="screenshots-heading">
      <div className="container-wide mx-auto">
        <h2 id="screenshots-heading" className="display-title text-2xl sm:text-3xl">
          {appName} on Google Play
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500">
          Images from the app’s own store listing, which describe it in the developer’s words.
        </p>
        <div
          className="table-scroll mt-8"
          role="region"
          aria-label={`${appName} screenshots`}
          tabIndex={0}
        >
          <ul className="flex list-none gap-5 p-0 pb-2">
            {shots.map((shot) => (
              <li key={shot.src} className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-[200px] rounded-2xl shadow-icon-tile ring-1 ring-ink-950/10 sm:w-[240px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
