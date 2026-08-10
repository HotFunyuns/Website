import { activeCategories, apps, companyInfo } from '@/data/apps';
import { posts } from '@/lib/blog';

export const dynamic = 'force-static';

/**
 * A plain-text index for assistants that read the site. It is generated from the
 * same `posts` collection the routes and sitemap use, so it can never advertise
 * a draft, and from `apps`, so it cannot drift from the catalog.
 */
export function GET() {
  const site = companyInfo.siteUrl;

  const lines = [
    `# ${companyInfo.name}`,
    '',
    `> ${companyInfo.description}`,
    '',
    'An independent Android app studio. Every app below is published on Google',
    'Play. Articles are written in-house and are not medically, linguistically or',
    'professionally reviewed unless a named reviewer is credited on the article.',
    '',
    '## Apps',
    '',
    ...apps.map((app) => `- [${app.name}](${site}/apps/${app.slug}/): ${app.tagline}`),
    '',
    '## Categories',
    '',
    ...activeCategories.map(
      (category) => `- [${category.label}](${site}/apps/category/${category.id}/)`
    ),
    '',
    '## Articles',
    '',
    ...posts.map((post) => `- [${post.title}](${site}/blog/${post.slug}/): ${post.description}`),
    '',
    '## Policies',
    '',
    `- [Editorial policy](${site}/editorial-policy/): how we source facts, what we will not publish, and our ownership disclosure`,
    `- [Privacy policy](${site}/privacy/)`,
    `- [Terms of service](${site}/terms/)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
