import { activeCategories, apps, companyInfo } from '@/data/apps';
import { DEFAULT_AUTHOR_ID, authorPath } from '@/data/authors';
import { activeHubs, postCount } from '@/lib/blog';

export const dynamic = 'force-static';

/**
 * A small plain-text index for assistants that read the site: who the company
 * is, what it makes, and where the complete lists live.
 *
 * It deliberately does not list every article. It used to — 525 lines copied
 * from the RSS feed, 155 KB — which made it a second, less useful copy of the
 * feed and the sitemap rather than an index. The feed and the sitemap are the
 * complete, machine-readable lists, and they are named below. Nothing here is
 * an instruction to anyone; scripts/validate-sitemap-rss.mjs fails the build if
 * that changes, if an advertised URL is not in the sitemap, or if an app is
 * missing.
 *
 * Treat this file as optional. It is not a ranking signal and it replaces none
 * of the crawlable HTML, structured data, sitemap or internal links.
 */
export function GET() {
  const site = companyInfo.siteUrl;

  const lines = [
    `# ${companyInfo.name}`,
    '',
    `> ${companyInfo.description}`,
    '',
    `${companyInfo.name} publishes its Android apps on Google Play under the developer`,
    `name ${companyInfo.developerName}. Both names refer to the same company, and`,
    `${site}/ is its official website.`,
    '',
    `Articles are published under the organizational byline ${companyInfo.name}.`,
    'They are drafted with the help of AI tools and are not medically,',
    'linguistically or professionally reviewed unless a named reviewer is credited',
    'on the article. The editorial policy explains what is checked, and how.',
    '',
    '## About the company',
    '',
    `- [About ${companyInfo.name}](${site}/about/): who the company is, what it makes, and how to reach it`,
    `- [Author profile](${site}${authorPath({ id: DEFAULT_AUTHOR_ID })}): the byline on every article and how the articles are made`,
    `- [Editorial policy](${site}/editorial-policy/): sourcing, AI use, dates, corrections and ownership disclosure`,
    `- [Press kit](${site}/press/): verified company facts and the app catalogue`,
    `- [Google Play developer page](${companyInfo.developerPageUrl}): every published app`,
    '',
    '## Apps',
    '',
    ...apps.map((app) => `- [${app.name}](${site}/apps/${app.slug}/): ${app.tagline}`),
    '',
    '## App categories',
    '',
    ...activeCategories.map(
      (category) => `- [${category.label}](${site}/apps/category/${category.id}/): ${category.blurb}`
    ),
    '',
    '## Topic hubs',
    '',
    'Each hub collects every article on one subject and names the one to read first.',
    '',
    ...activeHubs().map(
      (hub) => `- [${hub.label}](${site}/blog/topics/${hub.id}/) (${hub.count}): ${hub.blurb}`
    ),
    '',
    '## Articles',
    '',
    `There are ${postCount} published articles, all listed on the [blog](${site}/blog/).`,
    `The RSS feed at ${site}/blog/rss.xml carries each title and summary, and the`,
    `sitemap at ${site}/sitemap.xml lists every public URL.`,
    '',
    '## Policies',
    '',
    `- [Privacy policy](${site}/privacy/)`,
    `- [Terms of service](${site}/terms/)`,
    `- [Support](${site}/support/)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
