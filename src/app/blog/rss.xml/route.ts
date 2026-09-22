import { companyInfo } from '@/data/apps';
import { posts } from '@/lib/blog';

export const dynamic = 'force-static';

/**
 * Escapes text for XML character data.
 *
 * The control-character strip is not decoration. XML 1.0 forbids most C0
 * control characters outright — there is no entity that can carry them — so a
 * stray one pasted into an article title would produce a feed that every
 * conforming reader rejects wholesale, not just for that one item. Dropping
 * them here keeps one bad character from taking the whole feed down.
 */
function escapeXml(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const newest = (days: string[]) => days.reduce((a, b) => (a > b ? a : b));

export function GET() {
  const site = companyInfo.siteUrl;
  const feedUrl = `${site}/blog/rss.xml`;

  // The newest recorded revision date across the whole collection — the same
  // value src/app/sitemap.ts stamps on /blog/. `posts` is ordered by
  // publishedAt, so posts[0].updatedAt is the newest *post's* revision date,
  // which is not the same thing and drifts from the sitemap whenever an older
  // article is revised. Never build time: that would tell readers the feed
  // changed on every deploy.
  const updated = posts.length > 0 ? newest(posts.map((post) => post.updatedAt)) : null;

  // `posts` is already filtered to published, non-future articles, so the feed
  // cannot advertise a URL the site does not build.

  /**
   * Articles carry a date, not a time, so the feed has always stamped them at
   * 09:00 UTC. That is fine for anything published before today — but an
   * article published *today*, in a build that runs before 09:00 UTC, would
   * advertise a publication time that has not happened yet. Readers see a feed
   * item dated in the future, and a validator reasonably reads it as a leaked
   * draft. Clamping to build time keeps the 09:00 convention everywhere it is
   * accurate and tells the truth on release day.
   */
  const buildTime = Date.now();
  const pubDateOf = (day: string) =>
    new Date(Math.min(Date.parse(`${day}T09:00:00Z`), buildTime)).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${site}/blog/${post.slug}/`;
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <pubDate>${pubDateOf(post.publishedAt)}</pubDate>`,
        `      <category>${escapeXml(post.category)}</category>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(`${companyInfo.name} Blog`)}</title>`,
    `    <link>${site}/blog/</link>`,
    `    <description>${escapeXml('Guides to the Android apps built by Reign Creative LLC.')}</description>`,
    '    <language>en-us</language>',
    '    <docs>https://www.rssboard.org/rss-specification</docs>',
    updated ? `    <lastBuildDate>${pubDateOf(updated)}</lastBuildDate>` : '',
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
  ]
    .filter(Boolean)
    .join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
