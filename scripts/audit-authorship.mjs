// Authorship and date audit of the exported site.
//
// For every published article it checks, in the HTML a crawler receives:
//   - the visible byline names an author and links /authors/<id>/ with rel=author;
//   - BlogPosting.author carries the same name, the same profile URL, and the
//     right @type — visible and structured authorship must be identical;
//   - the profile page exists and its H1 and ProfilePage entity use that name;
//   - "Published" shows publishedAt, and "Updated" appears only when updatedAt
//     differs, showing updatedAt; both equal the JSON-LD dates;
//   - no date is in the future (Los Angeles);
//   - the "approved by a person" sentence appears exactly when the article
//     carries editorialApproved: true.
//
// With git available it also compares content/blog against a ref (HEAD by
// default, i.e. your uncommitted changes):
//   - a publication date on an article that was already public must not change;
//   - updatedAt may only move when visible content changed — the body (ignoring
//     link markup), the FAQs, takeaways, sources, title or description — or a
//     correction was recorded. A date bump with no content change fails.
// Pass --against <ref> to compare with another commit, --no-git to skip.
//
// Run after `npm run build`:  node scripts/audit-authorship.mjs

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { OUT_DIR, ROOT, SITE, parseArticle, readArticles } from './lib/content.mjs';
import { isPublic, laDay } from './lib/publishing.mjs';

if (!existsSync(OUT_DIR)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

const args = process.argv.slice(2);
const againstIndex = args.indexOf('--against');
const against = againstIndex >= 0 ? args[againstIndex + 1] : 'HEAD';
const useGit = !args.includes('--no-git');

const problems = [];
const notes = [];
const fail = (message) => problems.push(message);

const decode = (text) =>
  text
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, '&');
const textOf = (html) => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
    JSON.parse(m[1].replace(/\\u003c/g, '<'))
  );
}

const today = laDay();
const articles = readArticles();
const published = articles.filter((a) => isPublic(a.data));
const authorPages = new Map();
let checked = 0;

for (const article of published) {
  const route = `/blog/${article.slug}/`;
  const file = join(OUT_DIR, 'blog', article.slug, 'index.html');
  if (!existsSync(file)) {
    fail(`${route}: not exported`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const { data } = article;
  checked++;

  /* --------------------------------------------------------- the byline */
  const bylineStart = html.indexOf('data-byline');
  if (bylineStart < 0) {
    fail(`${route}: no byline block`);
    continue;
  }
  const byline = html.slice(bylineStart, html.indexOf('</p>', bylineStart));
  const authorLink = /<a\b([^>]*)>([\s\S]*?)<\/a>/.exec(byline);
  const href = authorLink ? /href="([^"]*)"/.exec(authorLink[1])?.[1] : null;
  const rel = authorLink ? /rel="([^"]*)"/.exec(authorLink[1])?.[1] : null;
  const visibleName = authorLink ? textOf(authorLink[2]) : null;

  if (!authorLink) fail(`${route}: byline does not link the author`);
  if (href !== `/authors/${data.author}/`) fail(`${route}: byline links ${href}, expected /authors/${data.author}/`);
  if (rel !== 'author') fail(`${route}: byline author link lacks rel="author"`);

  /* ------------------------------------------------------- the JSON-LD */
  const posting = jsonLd(html).find((block) => block['@type'] === 'BlogPosting');
  if (!posting) {
    fail(`${route}: no BlogPosting`);
    continue;
  }
  const author = posting.author ?? {};
  if (author.name !== visibleName) fail(`${route}: BlogPosting.author.name "${author.name}" ≠ byline "${visibleName}"`);
  if (author.url !== `${SITE}${href}`) fail(`${route}: BlogPosting.author.url ${author.url} ≠ ${SITE}${href}`);
  if (!['Organization', 'Person'].includes(author['@type'])) fail(`${route}: BlogPosting.author @type is ${author['@type']}`);

  /* ------------------------------------------------ the profile it names */
  if (href && !authorPages.has(href)) {
    const profileFile = join(OUT_DIR, href.replace(/^\//, ''), 'index.html');
    if (!existsSync(profileFile)) {
      authorPages.set(href, null);
    } else {
      const profile = readFileSync(profileFile, 'utf8');
      const h1 = textOf(/<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(profile)?.[1] ?? '');
      const page = jsonLd(profile).find((block) => block['@type'] === 'ProfilePage');
      authorPages.set(href, { h1, entityName: page?.mainEntity?.name, entityType: page?.mainEntity?.['@type'] });
    }
  }
  const profile = href ? authorPages.get(href) : null;
  if (href && !profile) fail(`${route}: author profile ${href} was not exported`);
  if (profile) {
    if (profile.h1 !== visibleName) fail(`${route}: profile H1 "${profile.h1}" ≠ byline "${visibleName}"`);
    if (profile.entityName !== visibleName) fail(`${route}: ProfilePage entity "${profile.entityName}" ≠ byline "${visibleName}"`);
    if (profile.entityType !== author['@type']) fail(`${route}: profile entity is ${profile.entityType}, article says ${author['@type']}`);
  }

  /* ------------------------------------------------------------ dates */
  const times = [...byline.matchAll(/(Published|Updated)\s*<!-- -->\s*<time dateTime="([^"]*)"|(Published|Updated)\s*<time dateTime="([^"]*)"/g)].map(
    (m) => ({ label: m[1] ?? m[3], value: m[2] ?? m[4] })
  );
  const shownPublished = times.find((t) => t.label === 'Published')?.value;
  const shownUpdated = times.find((t) => t.label === 'Updated')?.value;
  if (shownPublished !== data.publishedAt) fail(`${route}: shows Published ${shownPublished}, frontmatter ${data.publishedAt}`);
  if (posting.datePublished !== data.publishedAt) fail(`${route}: datePublished ${posting.datePublished} ≠ ${data.publishedAt}`);
  if (posting.dateModified !== data.updatedAt) fail(`${route}: dateModified ${posting.dateModified} ≠ ${data.updatedAt}`);
  if (data.updatedAt === data.publishedAt && shownUpdated) fail(`${route}: shows "Updated" although nothing was revised`);
  if (data.updatedAt !== data.publishedAt && shownUpdated !== data.updatedAt) {
    fail(`${route}: updatedAt ${data.updatedAt} is not shown as the Updated date (shows ${shownUpdated ?? 'none'})`);
  }
  if (data.publishedAt > today || data.updatedAt > today) fail(`${route}: dated in the future (${data.publishedAt} / ${data.updatedAt})`);

  /* -------------------------------------------------- approval sentence */
  const approvalShown = /read this\s+(?:<!-- -->\s*)?article in full and approved it/.test(html);
  if (approvalShown && data.editorialApproved !== true) fail(`${route}: claims human approval without editorialApproved: true`);
  if (!approvalShown && data.editorialApproved === true) fail(`${route}: approved but the approval is not shown`);
}

// No page anywhere may point rel=author at a profile that does not exist.
for (const [href, profile] of authorPages) if (!profile) fail(`author profile ${href} is linked but missing`);

/* ----------------------------------------------- dates against git history */

function git(...argv) {
  return execFileSync('git', argv, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}

let gitChecked = 0;
if (useGit) {
  let changed = [];
  try {
    git('rev-parse', '--verify', against);
    changed = git('diff', '--name-only', against, '--', 'content/blog').split('\n').filter((f) => f.endsWith('.md'));
  } catch {
    notes.push(`git comparison skipped — "${against}" is not available (a shallow checkout has no history)`);
  }
  const stripLinks = (body) => body.replace(/\r\n/g, '\n').replace(/\[([^\]\n]+)\]\([^)\s]+\)/g, '$1').trim();
  for (const path of changed) {
    const current = articles.find((a) => `content/blog/${a.slug}.md` === path);
    if (!current) continue;
    let previous;
    try {
      previous = parseArticle(path, git('show', `${against}:${path}`));
    } catch {
      continue; // new file: nothing to compare against
    }
    gitChecked++;
    const was = previous.data;
    const now = current.data;
    if (was.status === 'published' && was.publishedAt <= today && now.publishedAt !== was.publishedAt) {
      // One legitimate case: a release commit whose deploy only succeeded a day
      // or two later is corrected *forward* to the day it really went live
      // (docs/publishing-workflow.md, "Recover from a failed scheduled job").
      // Anything else — backwards, or an older article — is a rewritten date.
      const age = Math.round((Date.parse(`${today}T12:00:00Z`) - Date.parse(`${was.publishedAt}T12:00:00Z`)) / 86_400_000);
      if (now.publishedAt > was.publishedAt && now.publishedAt <= today && age <= 3) {
        notes.push(`${current.slug}: publishedAt corrected forward ${was.publishedAt} → ${now.publishedAt} — valid only if it was not live on ${was.publishedAt}`);
      } else {
        fail(`${current.slug}: publishedAt changed ${was.publishedAt} → ${now.publishedAt} on an article that was already public`);
      }
    }
    if (now.updatedAt !== was.updatedAt) {
      // Visible content lives in the frontmatter too: FAQs, takeaways, sources,
      // the title and the description all render on the page.
      const VISIBLE = ['title', 'description', 'faqs', 'takeaways', 'sources'];
      const textChanged =
        stripLinks(previous.body) !== stripLinks(current.body) ||
        VISIBLE.some((field) => JSON.stringify(was[field]) !== JSON.stringify(now[field]));
      const correctionAdded = (now.corrections ?? []).length > (was.corrections ?? []).length;
      const released = was.status !== 'published' && now.status === 'published';
      if (!textChanged && !correctionAdded && !released) {
        fail(`${current.slug}: updatedAt moved ${was.updatedAt} → ${now.updatedAt} but the text did not change — a link or metadata edit is not a revision`);
      }
      // A release replaces a draft's placeholder dates with the real day, which
      // can be earlier than the placeholder; only a live article's date is held.
      if (now.updatedAt < was.updatedAt && !released) fail(`${current.slug}: updatedAt moved backwards`);
    }
  }
}

/* --------------------------------------------------------------- report */

console.log(`authorship: ${checked} article(s), ${authorPages.size} author profile(s); git: ${gitChecked} changed article(s) compared with ${against}`);
for (const note of notes) console.log(`  ! ${note}`);
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems.slice(0, 40)) console.log(`  ✗ ${p}`);
  if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
  process.exit(1);
}
console.log('authorship and dates consistent');
