'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { trackBusinessInquiryClick, type InquiryLocation, type InquiryType } from '@/lib/analytics';
import { inquiryMailto } from '@/data/partnerships';

interface BusinessInquiryLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** The app the inquiry is about, or null for the whole portfolio. */
  appSlug: string | null;
  appName: string | null;
  inquiryType?: InquiryType;
  buttonLocation: InquiryLocation;
}

/**
 * A mailto link with a pre-filled subject and prompt. The click is reported once
 * with non-personal fields only, and never prevented: the browser opens the
 * visitor's email app as usual.
 */
export default function BusinessInquiryLink({
  appSlug,
  appName,
  inquiryType = 'other',
  buttonLocation,
  onClick,
  children,
  ...rest
}: BusinessInquiryLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackBusinessInquiryClick({ appSlug: appSlug ?? 'portfolio', inquiryType, buttonLocation });
    onClick?.(event);
  };
  return (
    <a href={inquiryMailto(appName, inquiryType)} onClick={handleClick} data-business-inquiry="" {...rest}>
      {children}
    </a>
  );
}
