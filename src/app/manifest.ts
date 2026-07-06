import type { MetadataRoute } from 'next';
import { companyInfo } from '@/data/apps';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: companyInfo.name,
    short_name: 'Reign Creative',
    description: companyInfo.description,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
