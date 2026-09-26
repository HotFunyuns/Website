interface BrandMarkProps {
  className?: string;
  /**
   * The SVG gradient's id. The mark renders in both the header and the footer,
   * and an id must be unique in a document, so each placement passes its own.
   */
  gradientId?: string;
}

export default function BrandMark({ className = 'h-9 w-9', gradientId = 'crown-gold' }: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-ink-950 shadow-card ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="3" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#EEDFB4" />
            <stop offset="0.5" stopColor="#C9A13B" />
            <stop offset="1" stopColor="#8F6E23" />
          </linearGradient>
        </defs>
        <path
          d="M3 16.2V7.6l4.6 3.6L12 5l4.4 6.2L21 7.6v8.6H3Z"
          fill={`url(#${gradientId})`}
        />
        <rect x="3" y="17.6" width="18" height="1.9" rx="0.95" fill="#C9A13B" />
        <circle cx="12" cy="13.1" r="1.15" fill="#C8102E" />
      </svg>
    </span>
  );
}
