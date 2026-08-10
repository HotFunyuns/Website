'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { trackPlayStoreClick, type ButtonLocation } from '@/lib/analytics';

interface PlayStoreLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  buttonLocation: ButtonLocation;
  appName?: string;
}

function visibleText(anchor: HTMLAnchorElement): string {
  const clone = anchor.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('.sr-only').forEach((node) => node.remove());
  return (clone.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 100);
}

export default function PlayStoreLink({
  href,
  buttonLocation,
  appName,
  onClick,
  children,
  ...rest
}: PlayStoreLinkProps) {
  // Never preventDefault here — the browser handles the click as usual and the
  // event is queued before the new tab opens.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackPlayStoreClick({
      buttonLocation,
      linkUrl: href,
      appName,
      linkText: visibleText(event.currentTarget),
    });
    onClick?.(event);
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
