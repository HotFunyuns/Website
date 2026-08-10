import Link from 'next/link';
import { getCategory } from '@/data/apps';
import type { BlogPost } from '@/lib/blog/types';
import { formatPostDate } from './format';

export default function BlogCard({ post, headingLevel = 'h3' }: { post: BlogPost; headingLevel?: 'h2' | 'h3' }) {
  const category = getCategory(post.category);
  const Heading = headingLevel;

  return (
    <article className="card-premium-hover group flex h-full flex-col p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        {category && <span className="pill">{category.shortLabel}</span>}
        <span className="text-xs text-ink-400">{post.readingMinutes} min read</span>
      </div>

      <Heading className="mt-4 font-display text-xl font-semibold leading-snug text-ink-950">
        <Link href={`/blog/${post.slug}/`} className="transition-colors hover:text-crimson-600">
          {post.title}
        </Link>
      </Heading>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-500">{post.description}</p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink-100 pt-4">
        <time dateTime={post.publishedAt} className="text-xs text-ink-400">
          {formatPostDate(post.publishedAt)}
        </time>
        <Link
          href={`/blog/${post.slug}/`}
          className="link-accent text-sm"
          aria-label={`Read ${post.title}`}
        >
          Read{' '}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
