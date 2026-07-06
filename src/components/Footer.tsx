import Link from 'next/link';
import { companyInfo } from '@/data/apps';
import BrandMark from './BrandMark';
import GooglePlayIcon from './GooglePlayIcon';

const exploreLinks = [
  { label: 'Apps', href: '/apps/' },
  { label: 'About', href: '/about/' },
  { label: 'Support', href: '/support/' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Developer Info', href: '/app-support/' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-panel relative text-ink-300">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
      />
      <div className="container-wide mx-auto px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr,1fr,1fr,1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Reign Creative LLC — home">
              <BrandMark className="h-10 w-10 ring-1 ring-white/15" />
              <span className="font-display text-xl font-semibold tracking-tight text-white">
                Reign Creative <span className="text-gold-300">LLC</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              An independent mobile app studio crafting games, learning experiences, fitness
              trackers, and lifestyle apps for Android.
            </p>
            <p className="mt-4 font-display text-sm italic text-gold-300/90">
              Built for memorable mobile experiences.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-300 transition-colors hover:text-gold-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              Legal
            </h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-300 transition-colors hover:text-gold-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Google Play */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              Get Our Apps
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-400">
              Every Reign Creative app is published on Google Play.
            </p>
            <a
              href={companyInfo.developerPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-sm mt-5"
            >
              <GooglePlayIcon className="h-3.5 w-3.5" />
              Google Play Developer Page
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-400">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-ink-500">
            Support:{' '}
            <a
              href={`mailto:${companyInfo.supportEmail}`}
              className="text-ink-300 transition-colors hover:text-gold-200"
            >
              {companyInfo.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
