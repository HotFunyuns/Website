import Link from 'next/link';
import { companyInfo } from '@/data/apps';
import { footerNavLinks } from '@/data/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = footerNavLinks.filter(
    (l) => !l.href.includes('privacy') && !l.href.includes('terms') && !l.href.includes('app-support')
  );
  const legalLinks = footerNavLinks.filter(
    (l) => l.href.includes('privacy') || l.href.includes('terms') || l.href.includes('app-support')
  );

  return (
    <footer className="border-t border-white/5 bg-surface-950">
      <div className="container-wide mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 text-lg font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black shadow-lg shadow-brand-500/20">
                R
              </span>
              Reign Creative
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-surface-200/60">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-200/40">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-200/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-200/40">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-200/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-200/40">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${companyInfo.supportEmail}`}
                  className="text-sm text-surface-200/60 transition-colors hover:text-white"
                  rel="noopener noreferrer"
                >
                  {companyInfo.supportEmail}
                </a>
              </li>
              <li>
                <span className="text-sm text-surface-200/60">
                  {companyInfo.domain}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-surface-200/40">
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy/"
              className="text-xs text-surface-200/40 transition-colors hover:text-surface-200/80"
            >
              Privacy
            </Link>
            <Link
              href="/terms/"
              className="text-xs text-surface-200/40 transition-colors hover:text-surface-200/80"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
