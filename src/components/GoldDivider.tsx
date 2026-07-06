export default function GoldDivider({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`gold-divider ${className}`} />;
}
