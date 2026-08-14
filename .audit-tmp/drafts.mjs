import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'content/blog';
const rows = [];
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.md'))) {
  const raw = readFileSync(join(DIR, f), 'utf8');
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!m) {
    console.log('NO FRONTMATTER', f);
    continue;
  }
  const fm = JSON.parse(m[1]);
  const body = m[2];
  rows.push({
    slug: f.replace(/\.md$/, ''),
    status: fm.status,
    title: fm.title,
    metaTitle: fm.metaTitle,
    category: fm.category,
    intent: fm.intent,
    primaryKeyword: fm.primaryKeyword,
    secondaryKeywords: fm.secondaryKeywords ?? [],
    relatedApps: fm.relatedApps ?? [],
    relatedArticles: fm.relatedArticles ?? [],
    sources: (fm.sources ?? []).map((s) => ({ p: s.publisher, u: s.url, a: s.accessed })),
    faqs: (fm.faqs ?? []).length,
    disclaimer: fm.disclaimer,
    demandTier: fm.demandTier,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    words: body.split(/\s+/).filter(Boolean).length,
    body,
  });
}
writeFileSync('.audit-tmp/all-posts.json', JSON.stringify(rows, null, 1));
const drafts = rows.filter((r) => r.status !== 'published');
const pub = rows.filter((r) => r.status === 'published');
console.log(`total ${rows.length} | published ${pub.length} | non-published ${drafts.length}`);
const byStatus = {};
drafts.forEach((d) => (byStatus[d.status] = (byStatus[d.status] ?? 0) + 1));
console.log('non-published by status:', JSON.stringify(byStatus));
const byCat = {};
drafts.forEach((d) => (byCat[d.category] = (byCat[d.category] ?? 0) + 1));
console.log('drafts by category:', JSON.stringify(byCat, null, 1));
