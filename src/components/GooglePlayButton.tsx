import type { ButtonLocation } from '@/lib/analytics';
import GooglePlayIcon from './GooglePlayIcon';
import PlayStoreLink from './PlayStoreLink';

interface GooglePlayButtonProps {
  href: string;
  buttonLocation: ButtonLocation;
  appName?: string;
  label?: string;
  variant?: 'primary' | 'gold' | 'outline';
  small?: boolean;
  className?: string;
}

export default function GooglePlayButton({
  href,
  buttonLocation,
  appName,
  label = 'View on Google Play',
  variant = 'primary',
  small = false,
  className = '',
}: GooglePlayButtonProps) {
  const variantClass =
    variant === 'gold' ? 'btn-gold' : variant === 'outline' ? 'btn-outline' : 'btn-primary';

  return (
    <PlayStoreLink
      href={href}
      buttonLocation={buttonLocation}
      appName={appName}
      className={`${variantClass} ${small ? 'btn-sm' : ''} ${className}`}
    >
      <GooglePlayIcon className={small ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {label}
      <span className="sr-only"> (opens Google Play in a new tab)</span>
    </PlayStoreLink>
  );
}
