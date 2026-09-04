// Moves reviewed drafts to published. Step 8 of docs/content-review-process.md,
// applied mechanically so the fields can never be set inconsistently.
//
// It refuses to run unless scripts/preflight-articles.mjs is clean, because
// publishing is the one action that cannot be undone quietly — a URL that has
// been crawled stays in an index long after the file changes.
//
// Run: node scripts/publish-drafts.mjs --date YYYY-MM-DD [--only slug,slug] [--dry]

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const CONTENT = join(ROOT, 'content', 'blog');
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const dry = args.includes('--dry');
const date = arg('--date');
const only = arg('--only')?.split(',').map((s) => s.trim()).filter(Boolean);

if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? '')) {
  console.error('usage: node scripts/publish-drafts.mjs --date YYYY-MM-DD [--only slug,slug] [--dry]');
  process.exit(1);
}

try {
  execFileSync(process.execPath, [join(HERE, 'preflight-articles.mjs')], { stdio: 'pipe' });
} catch (err) {
  console.error('pre-flight is not clean — fix it before publishing:\n');
  console.error(err.stdout?.toString() ?? err.message);
  process.exit(1);
}

const published = [];

for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  if (only && !only.includes(slug)) continue;
  const path = join(CONTENT, file);
  const raw = readFileSync(path, 'utf8');
  const m = FRONTMATTER.exec(raw);
  if (!m) continue;
  const data = JSON.parse(m[1]);
  if (data.status === 'published') continue;

  data.status = 'published';
  data.publishedAt = date;
  data.updatedAt = date;
  delete data.noindex;

  if (!dry) {
    writeFileSync(path, `---\n${JSON.stringify(data, null, 2)}\n---\n${raw.slice(m[0].length)}`, 'utf8');
  }
  published.push(slug);
}

console.log(`${dry ? '[dry run] ' : ''}published ${published.length} article(s) on ${date}:`);
for (const slug of published) console.log(`  ${slug}`);
