import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <Reveal className={`max-w-2xl ${alignClass}`}>
      <p className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 className="display-title mt-4 text-balance text-3xl sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
