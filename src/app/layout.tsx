import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reigncreativellc.com'),
  title: {
    default: 'Reign Creative LLC — Mobile Apps & Digital Products',
    template: '%s | Reign Creative LLC',
  },
  description:
    'Reign Creative LLC designs and develops polished mobile applications and digital products focused on quality, usability, and experiences that matter.',
  keywords: [
    'Reign Creative LLC',
    'mobile apps',
    'app development',
    'Android apps',
    'digital products',
    'mobile applications',
  ],
  authors: [{ name: 'Reign Creative LLC' }],
  creator: 'Reign Creative LLC',
  publisher: 'Reign Creative LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reigncreativellc.com',
    siteName: 'Reign Creative LLC',
    title: 'Reign Creative LLC — Mobile Apps & Digital Products',
    description:
      'We design and develop polished mobile applications and digital products focused on quality, usability, and experiences that matter.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reign Creative LLC — Mobile Apps & Digital Products',
    description:
      'We design and develop polished mobile applications and digital products focused on quality, usability, and experiences that matter.',
  },
  robots: {
    index: true,
    follow: true,
  },
  referrer: 'strict-origin-when-cross-origin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Security headers via meta tags (supplement with HTTP headers at hosting level) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' mailto:;"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
