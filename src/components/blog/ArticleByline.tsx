import { Fragment } from 'react';
import Link from 'next/link';
import { companyInfo, type AppInfo } from '@/data/apps';
import { authorPath, type AuthorInfo } from '@/data/authors';
import { formatPostDate } from './format';

/**
 * The byline, the dates and the ownership line at the top of every article.
 *
 * Three rules, each checked after export by scripts/audit-authorship.mjs:
 *   - the name here is the registry name, the same string BlogPosting.author
 *     carries, and it links to the author's profile with rel="author";
 *   - "Published" is `publishedAt`, and "Updated" appears only when
 *     `updatedAt` differs — a date changes when the content does, not on a
 *     schedule;
 *   - the ownership line is on the article itself. The editorial policy
 *     promises that disclosure, and before this component existed only the
 *     comparison articles actually carried it.
 */
export default function ArticleByline({
  author,
  publishedAt,
  updatedAt,
  readingMinutes,
  apps,
}: {
  author: AuthorInfo;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  apps: AppInfo[];
}) {
  const [primaryApp] = apps;
  // Our apps are named outright, so the sentence cannot be read as covering a
  // competitor a comparison article mentions. Beyond three, the rest are counted.
  const named = apps.length <= 3 ? apps : [primaryApp];
  const unnamed = apps.length - named.length;

  return (
    <div className="mt-8">
      <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-400" data-byline="">
        <span>
          By{' '}
          <Link
            href={authorPath(author)}
            rel="author"
            className="font-medium text-ink-600 underline-offset-2 transition-colors hover:text-crimson-600 hover:underline"
          >
            {author.name}
          </Link>
        </span>
        <span aria-hidden="true">·</span>
        <span>
          Published <time dateTime={publishedAt}>{formatPostDate(publishedAt)}</time>
        </span>
        {updatedAt !== publishedAt && (
          <>
            <span aria-hidden="true">·</span>
            <span>
              Updated <time dateTime={updatedAt}>{formatPostDate(updatedAt)}</time>
            </span>
          </>
        )}
        <span aria-hidden="true">·</span>
        <span>{readingMinutes} min read</span>
      </p>
      {primaryApp && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500">
          {companyInfo.name} makes{' '}
          {named.map((app, i) => (
            <Fragment key={app.slug}>
              {i > 0 && (i === named.length - 1 && unnamed === 0 ? ' and ' : ', ')}
              <Link href={`/apps/${app.slug}/`} className="link-accent">
                {app.name}
              </Link>
            </Fragment>
          ))}
          {unnamed > 0
            ? ` and the ${unnamed} other ${companyInfo.name} apps this article links to, so we have a commercial interest in them.`
            : `, which this article links to, so we have a commercial interest in ${apps.length === 1 ? 'it' : 'them'}.`}{' '}
          <Link href="/editorial-policy/" className="link-accent">
            How we write and check articles
          </Link>
          .
        </p>
      )}
    </div>
  );
}
