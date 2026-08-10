'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  GA_MEASUREMENT_ID,
  bootstrapAnalytics,
  isAnalyticsEnabled,
  trackPageView,
} from '@/lib/analytics';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    bootstrapAnalytics();
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    trackPageView();
  }, [active, pathname]);

  if (!active) return null;

  return (
    <Script
      id="ga4-gtag"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
    />
  );
}
