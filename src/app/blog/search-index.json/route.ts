import { guidePosts } from '@/lib/blog';

export const dynamic = 'force-static';

/**
 * The data behind the search box on /blog/. It is fetched only when someone
 * starts a search, so the index page no longer carries every article's card in
 * its HTML and script payload. Titles, descriptions and tags only — never bodies.
 */
export function GET() {
  const items = guidePosts.map((post) => ({
    s: post.slug,
    t: post.title,
    d: post.description,
    k: post.tags.join(' '),
  }));
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
