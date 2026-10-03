import Link from 'next/link';
import { toolPath, type ToolMeta } from '@/tools/registry';

/** A calculator in a listing: its name, what it does, and where it lives. */
export default function ToolCard({
  tool,
  label,
  headingLevel = 'h3',
}: {
  tool: ToolMeta;
  label?: string;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <article className="card-premium-hover group flex h-full flex-col p-6">
      {label && <p className="pill self-start">{label}</p>}
      <Heading className={`${label ? 'mt-3' : ''} font-display text-lg font-semibold leading-snug text-ink-950`}>
        <Link href={toolPath(tool)} className="transition-colors hover:text-crimson-600">
          {tool.title}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{tool.summary}</p>
      <Link
        href={toolPath(tool)}
        className="link-accent mt-4 text-sm"
        aria-label={`Open the ${tool.shortTitle.toLowerCase()} calculator`}
      >
        Open the calculator{' '}
        <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </article>
  );
}
