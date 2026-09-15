import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { companyInfo } from '@/data/apps';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(companyInfo.siteUrl),
  title: {
    default: 'Reign Creative LLC — Premium Mobile Apps for Android',
    template: '%s | Reign Creative LLC',
  },
  description:
    'Reign Creative LLC is an independent app studio building memorable mobile games, learning experiences, fitness trackers, and lifestyle apps for Android.',
  keywords: [
    'Reign Creative LLC',
    'mobile apps',
    'Android apps',
    'mobile games',
    'app studio',
    'Google Play developer',
  ],
  authors: [{ name: 'Reign Creative LLC' }],
  creator: 'Reign Creative LLC',
  publisher: 'Reign Creative LLC',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${companyInfo.siteUrl}/blog/rss.xml` },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // This is the homepage's own og:url, and it matches the homepage canonical
    // exactly. Next.js replaces the whole `openGraph` object when a page
    // declares one, so this value is also inherited by any page that declares
    // none — and such a page then announces og:url of the homepage while its
    // `<link rel="canonical">` says something else. The legacy
    // /apps/82-0-pro-basketball-draft/ alias shipped exactly that contradiction.
    // Every page that sets a canonical must therefore set its own og:url;
    // scripts/audit-output.mjs fails the build when the two disagree.
    url: `${companyInfo.siteUrl}/`,
    siteName: 'Reign Creative LLC',
    title: 'Reign Creative LLC — Premium Mobile Apps for Android',
    description:
      'An independent app studio building memorable mobile games, learning experiences, fitness trackers, and lifestyle apps for Android.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reign Creative LLC — Premium Mobile Apps for Android',
    description:
      'An independent app studio building memorable mobile games, learning experiences, fitness trackers, and lifestyle apps for Android.',
  },
  robots: {
    index: true,
    follow: true,
  },
  referrer: 'strict-origin-when-cross-origin',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${companyInfo.siteUrl}/#organization`,
  name: companyInfo.name,
  // The studio publishes on Google Play as "Reign Collective Apps" while the
  // legal entity is "Reign Creative LLC". Both names are real and both are
  // visible to a reader — the Play name on every app page and store listing —
  // so stating the link here is describing the entity, not decorating it. Two
  // unlinked names for one publisher is exactly the ambiguity that stops a
  // search or answer engine consolidating them.
  alternateName: companyInfo.developerName,
  // Trailing slash so this is byte-identical to the homepage canonical. The two
  // forms resolve to the same resource, but every URL we publish about ourselves
  // should be spelled one way.
  url: `${companyInfo.siteUrl}/`,
  logo: `${companyInfo.siteUrl}/favicon.svg`,
  email: companyInfo.supportEmail,
  description: companyInfo.description,
  foundingDate: companyInfo.founded,
  sameAs: [companyInfo.developerPageUrl],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: companyInfo.supportEmail,
    url: `${companyInfo.siteUrl}/support/`,
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${companyInfo.siteUrl}/#website`,
  name: companyInfo.name,
  url: `${companyInfo.siteUrl}/`,
  inLanguage: 'en-US',
  publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
  // No `potentialAction`/SearchAction: the site has no search endpoint, and a
  // sitelinks-searchbox action pointing at a URL that does not exist would be
  // structured data describing something the site cannot do.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Enables animation styles only when JS runs; content stays visible without JS */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        {/* Security headers via meta tags (supplement with HTTP headers at hosting level) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://*.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' mailto:;"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
        />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <GoogleAnalytics />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
