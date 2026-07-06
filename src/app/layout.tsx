import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
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
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: companyInfo.siteUrl,
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
  url: companyInfo.siteUrl,
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
  url: companyInfo.siteUrl,
  publisher: { '@id': `${companyInfo.siteUrl}/#organization` },
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
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' mailto:;"
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
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
