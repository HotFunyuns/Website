import AnimatedSection from './AnimatedSection';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  description,
  className = '',
  align = 'center',
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <AnimatedSection className={`mb-12 max-w-3xl ${alignClasses} ${className}`}>
      {label && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-brand-400">
          {label}
        </span>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-lg text-surface-200/60">{description}</p>
      )}
    </AnimatedSection>
  );
}
