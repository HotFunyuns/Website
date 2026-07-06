import Link from 'next/link';
import { companyInfo } from '@/data/apps';
import JsonLd from './JsonLd';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${companyInfo.siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="text-ink-500 transition-colors hover:text-crimson-600">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink-950">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-gold-500">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
