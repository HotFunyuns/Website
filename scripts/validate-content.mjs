/**
 * Post-build gate. Runs against the exported `out/` directory and fails the
 * build if unpublished content leaked, if a published article is missing, or if
 * an internal link points at a page that was never exported.
 *
 * The frontmatter is re-parsed here from source rather than imported from
 * src/lib/blog, so a bug in the site's own filtering cannot also silence the
 * check that is supposed to catch it.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const CONTENT = join(ROOT, 'content', 'blog');

const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);

if (!existsSync(OUT)) {
  console.error('validate-content: out/ not found — run `next build` first.');
  process.exit(1);
}

/* ---------------------------------------------------------------- articles */

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function loadArticles() {
  if (!existsSync(CONTENT)) return [];
  return readdirSync(CONTENT)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = readFileSync(join(CONTENT, file), 'utf8');
      const match = FRONTMATTER.exec(raw);
      if (!match) {
        fail(`content/blog/${file}: missing JSON frontmatter`);
        return null;
      }
      try {
        return { slug, data: JSON.parse(match[1]) };
      } catch (error) {
        fail(`content/blog/${file}: frontmatter is not valid JSON — ${error.message}`);
        return null;
      }
    })
    .filter(Boolean);
}

const today = new Date().toISOString().slice(0, 10);
const articles = loadArticles();
const published = articles.filter((a) => a.data.status === 'published' && a.data.publishedAt <= today);
const unpublished = articles.filter((a) => !published.includes(a));

/* -------------------------------------------------------------- html index */

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

const allFiles = walk(OUT);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));
const relative = (file) => file.slice(OUT.length + 1).split('\\').join('/');
const exported = new Set(allFiles.map(relative));

const sitemap = existsSync(join(OUT, 'sitemap.xml'))
  ? readFileSync(join(OUT, 'sitemap.xml'), 'utf8')
  : '';
const rss = existsSync(join(OUT, 'blog', 'rss.xml'))
  ? readFileSync(join(OUT, 'blog', 'rss.xml'), 'utf8')
  : '';

if (!sitemap) fail('out/sitemap.xml was not generated');

/* ------------------------------------------------------- draft containment */

for (const article of unpublished) {
  const page = `blog/${article.slug}/index.html`;
  if (exported.has(page)) {
    fail(`LEAK: unpublished article "${article.slug}" (status ${article.data.status}) was exported to /${page}`);
  }
  if (sitemap.includes(`/blog/${article.slug}/`)) {
    fail(`LEAK: unpublished article "${article.slug}" appears in sitemap.xml`);
  }
  if (rss.includes(`/blog/${article.slug}/`)) {
    fail(`LEAK: unpublished article "${article.slug}" appears in the RSS feed`);
  }
}

// A draft can also leak by being *linked* from a published page even when its
// own route was never built, which would ship a crawlable 404 and expose the URL.
const draftSlugs = new Set(unpublished.map((a) => a.slug));
if (draftSlugs.size > 0) {
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const slug of draftSlugs) {
      if (html.includes(`/blog/${slug}/`)) {
        fail(`LEAK: /${relative(file)} links to unpublished article "${slug}"`);
      }
    }
  }
}

/* ---------------------------------------------------- published completeness */

for (const article of published) {
  const page = `blog/${article.slug}/index.html`;
  if (!exported.has(page)) fail(`published article "${article.slug}" has no exported page at /${page}`);
  if (sitemap && !sitemap.includes(`/blog/${article.slug}/`)) {
    fail(`published article "${article.slug}" is missing from sitemap.xml`);
  }
  if (rss && !rss.includes(`/blog/${article.slug}/`)) {
    fail(`published article "${article.slug}" is missing from the RSS feed`);
  }
  if (article.data.noindex === true) {
    fail(`published article "${article.slug}" is marked noindex — publish it or clear the flag`);
  }
}

/* -------------------------------------------------------- noindex integrity */

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const path = `/${relative(file).replace(/index\.html$/, '')}`;
  const hasNoindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const inSitemap = sitemap.includes(`<loc>https://reigncreativellc.com${path}</loc>`);
  if (hasNoindex && inSitemap) {
    fail(`${path} is noindex but is listed in sitemap.xml`);
  }
}

/* ----------------------------------------------------------- internal links */

const IGNORED_PREFIXES = ['//', '/#'];
const linkPattern = /(?:href|src)="(\/[^"#?]*)(?:[#?][^"]*)?"/g;
const brokenLinks = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    const target = match[1];
    if (IGNORED_PREFIXES.some((p) => target.startsWith(p))) continue;
    if (target.startsWith('/_next/')) continue;

    const clean = target.replace(/^\//, '');
    const candidates = target.endsWith('/')
      ? [posix.join(clean, 'index.html'), clean.replace(/\/$/, '.html')]
      : [clean, `${clean}/index.html`, `${clean}.html`];

    if (!candidates.some((c) => exported.has(c.replace(/^\/+/, '')))) {
      const key = target;
      if (!brokenLinks.has(key)) brokenLinks.set(key, new Set());
      brokenLinks.get(key).add(relative(file));
    }
  }
}

for (const [target, sources] of brokenLinks) {
  const list = [...sources].slice(0, 5).join(', ');
  fail(`broken internal link ${target} (from ${list}${sources.size > 5 ? `, +${sources.size - 5} more` : ''})`);
}

/* --------------------------------------------------------- orphan detection */

const linkedPaths = new Set();
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    if (!match[1].startsWith('/_next/')) linkedPaths.add(match[1]);
  }
}
for (const article of published) {
  if (!linkedPaths.has(`/blog/${article.slug}/`)) {
    warnings.push(`orphan: /blog/${article.slug}/ is not linked from any exported page`);
  }
}

/* ----------------------------------------------------------------- reporting */

const counts = `${published.length} published, ${unpublished.length} unpublished, ${htmlFiles.length} pages`;

for (const warning of warnings) console.warn(`  warn  ${warning}`);

if (errors.length > 0) {
  console.error(`\nvalidate-content FAILED (${counts})`);
  for (const error of errors) console.error(`  ✗ ${error}`);
  process.exit(1);
}

console.log(`validate-content OK — ${counts}${warnings.length ? `, ${warnings.length} warning(s)` : ''}`);
