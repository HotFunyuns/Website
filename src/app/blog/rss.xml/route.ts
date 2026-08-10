import { companyInfo } from '@/data/apps';
import { posts } from '@/lib/blog';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const site = companyInfo.siteUrl;
  const feedUrl = `${site}/blog/rss.xml`;
  const updated = posts[0]?.updatedAt ?? new Date().toISOString().slice(0, 10);

  // `posts` is already filtered to published, non-future articles, so the feed
  // cannot advertise a URL the site does not build.
  const items = posts
    .map((post) => {
      const url = `${site}/blog/${post.slug}/`;
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <pubDate>${new Date(`${post.publishedAt}T09:00:00Z`).toUTCString()}</pubDate>`,
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
    `    <lastBuildDate>${new Date(`${updated}T09:00:00Z`).toUTCString()}</lastBuildDate>`,
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
