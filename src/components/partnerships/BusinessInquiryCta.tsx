import Link from 'next/link';
import type { AppInfo } from '@/data/apps';
import { companyInfo } from '@/data/apps';
import type { InquiryLocation } from '@/lib/analytics';
import BusinessInquiryLink from './BusinessInquiryLink';

/**
 * The call to action on a partnership overview: an email to the company's
 * published address with the app named in the subject. There is no form behind
 * it and no data collected by the site.
 */
export default function BusinessInquiryCta({
  app,
  buttonLocation,
  compact = false,
}: {
  app: AppInfo;
  buttonLocation: InquiryLocation;
  compact?: boolean;
}) {
  return (
    <aside
      className={compact ? 'card-premium flex flex-col gap-4 p-6' : 'card-premium my-10 p-6 sm:p-8'}
      aria-label={`Discuss ${app.name} with ${companyInfo.name}`}
    >
      <h2 className="font-display text-xl font-semibold text-ink-950">Discuss {app.name}</h2>
      <p className="text-sm leading-relaxed text-ink-500">
        Email {companyInfo.name} with “{app.name}” in the subject. Say who you are and what you have in
        mind; please keep confidential or financial details for later in the conversation.
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <BusinessInquiryLink
          appSlug={app.slug}
          appName={app.name}
          buttonLocation={buttonLocation}
          className="btn-primary btn-sm"
        >
          Email about {app.name}
        </BusinessInquiryLink>
        <Link href="/partnerships/" className="link-accent text-sm">
          All partnership opportunities →
        </Link>
      </div>
      <p className="text-xs text-ink-400">
        Or write to{' '}
        <a href={`mailto:${companyInfo.supportEmail}`} className="link-accent break-all">
          {companyInfo.supportEmail}
        </a>
        .
      </p>
    </aside>
  );
}
