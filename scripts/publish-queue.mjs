// The publishing queue: at most one editorially approved article per Los
// Angeles day, released on or after its `publishAt`, never by accident.
//
//   node scripts/publish-queue.mjs status               what is queued, and what would happen now
//   node scripts/publish-queue.mjs check                decide without writing (the hourly job's first step)
//   node scripts/publish-queue.mjs release              release the next due article, then run the linking pass
//   node scripts/publish-queue.mjs report               write docs/publishing-queue-report.md
//
// Options for check/release:
//   --slug <slug>            manual override: release this scheduled, approved article now, ignoring publishAt
//   --allow-second-today     explicit override of the one-per-day limit (recorded on the article)
//   --ignore-release-hour    release before 09:00 Los Angeles
//   --expect <slug>          release only if the plan still picks this slug (used by CI)
//   --dry-run                show what would change without writing
//   --ci                     also write the decision to $GITHUB_OUTPUT
//
// Guarantees, and where each one lives:
//   - Nothing is released without `editorialApproved: true`  → planRelease, the loader, validate-content
//   - One per day, reruns are no-ops                         → planRelease reads today's releases first
//   - The date is the real release day, never earlier       → publishedAt = today (Los Angeles), always
//   - Old publication dates never change                    → only the released article's dates are written
//   - A release that cannot be linked or validated writes nothing → everything is checked in memory first
//   - A failed build deploys nothing                         → the workflow builds before it commits
//
// Only node built-ins are imported, so `check` runs before `npm ci`.

import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import {
  ROOT,
  deleteFrontmatterKey,
  extractLinks,
  loadSiteData,
  parseArticle,
  readArticles,
  setFrontmatterValue,
  writeArticle,
} from './lib/content.mjs';
import { applyActions, planPostPublication } from './lib/linking.mjs';
import {
  APPROVAL_GATE_AFTER,
  DAILY_LIMIT,
  RELEASE_HOUR,
  TIME_ZONE,
  blockedReason,
  isPublic,
  isQueueEra,
  planRelease,
  projectQueue,
  zonedNow,
} from './lib/publishing.mjs';

const [command = 'status', ...rest] = process.argv.slice(2);
const flag = (name) => rest.includes(name);
const option = (name) => {
  const i = rest.indexOf(name);
  return i >= 0 ? rest[i + 1] : undefined;
};
const options = {
  slug: option('--slug') || undefined,
  allowSecondToday: flag('--allow-second-today'),
  ignoreReleaseHour: flag('--ignore-release-hour'),
};
const dryRun = flag('--dry-run');
const ci = flag('--ci');

function output(values) {
  if (!ci || !process.env.GITHUB_OUTPUT) return;
  appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(values).map(([k, v]) => `${k}=${v}\n`).join(''));
}

/* ------------------------------------------------------------ validation */

/**
 * Everything that must be true of an article before it may go public, checked
 * without the site's TypeScript so it can run anywhere. The full production
 * build re-checks all of it afterwards; this exists so a bad article fails
 * before anything is written, with a message that names the problem.
 */
function validateCandidate(candidate, articles, site) {
  const problems = [];
  const d = candidate.data;
  const publicSlugs = new Set(articles.filter((a) => isPublic(a.data)).map((a) => a.slug));
  const appSlugs = new Set(site.apps.map((a) => a.slug));
  const categoryIds = new Set(site.apps.map((a) => a.categoryId));
  const hubIds = new Set(site.hubs.map((h) => h.id));
  const authors = readFileSync(join(ROOT, 'src', 'data', 'authors.ts'), 'utf8');

  for (const field of ['title', 'metaTitle', 'description', 'primaryKeyword']) {
    if (typeof d[field] !== 'string' || !d[field].trim()) problems.push(`"${field}" is missing`);
  }
  if (d.metaTitle?.length > 60) problems.push(`metaTitle is ${d.metaTitle.length} chars (max 60)`);
  if (d.description?.length > 160 || d.description?.length < 70) problems.push(`description is ${d.description?.length} chars (70–160)`);
  if (!/^[a-z0-9-]+$/.test(d.author ?? '') || !authors.includes(`id: '${d.author}'`)) {
    problems.push(`author "${d.author}" is not in src/data/authors.ts`);
  }
  if (!categoryIds.has(d.category)) problems.push(`category "${d.category}" is unknown`);
  if (!Array.isArray(d.relatedApps) || d.relatedApps.length === 0) problems.push('relatedApps is empty');
  for (const app of d.relatedApps ?? []) if (!appSlugs.has(app)) problems.push(`relatedApps names unknown app "${app}"`);
  for (const hub of d.hubs ?? []) if (!hubIds.has(hub)) problems.push(`hubs names unknown hub "${hub}"`);
  for (const slug of d.relatedArticles ?? []) {
    if (!publicSlugs.has(slug)) problems.push(`relatedArticles names "${slug}", which is not public`);
  }
  const key = d.primaryKeyword?.trim().toLowerCase();
  const clash = articles.find((a) => a.slug !== candidate.slug && a.data.primaryKeyword?.trim().toLowerCase() === key);
  if (clash) problems.push(`primaryKeyword is already targeted by "${clash.slug}"`);
  for (const source of d.sources ?? []) {
    if (!/^https:\/\//.test(source.url ?? '')) problems.push(`source "${source.title}" needs an https URL`);
  }

  for (const link of extractLinks(candidate.body)) {
    // Checked without any #fragment or ?query: `/blog/x/#section` is a link to
    // /blog/x/, and must be judged as one.
    const href = link.href.startsWith('/') ? link.href.replace(/[?#].*$/, '') : link.href;
    let m;
    if ((m = /^\/blog\/([a-z0-9-]+)\/$/.exec(href))) {
      if (!publicSlugs.has(m[1])) problems.push(`body links /blog/${m[1]}/, which is not public`);
    } else if ((m = /^\/apps\/category\/([a-z-]+)\/$/.exec(href)) || (m = /^\/blog\/category\/([a-z-]+)\/$/.exec(href))) {
      if (!categoryIds.has(m[1])) problems.push(`body links unknown category ${href}`);
    } else if ((m = /^\/blog\/topics\/([a-z-]+)\/$/.exec(href))) {
      if (!hubIds.has(m[1])) problems.push(`body links unknown hub ${href}`);
    } else if ((m = /^\/apps\/([a-z0-9-]+)\/$/.exec(href))) {
      if (!appSlugs.has(m[1])) problems.push(`body links unknown app ${href}`);
    } else if (href.startsWith('/') && !href.endsWith('/') && !/\.[a-z]+$/.test(href)) {
      problems.push(`body link ${href} has no trailing slash`);
    }
  }

  // The claim-safety rules (medical promises, invented statistics, ranking
  // guarantees…) live in preflight-articles.mjs; run them for this article.
  try {
    execFileSync(process.execPath, [join(ROOT, 'scripts', 'preflight-articles.mjs'), '--only', candidate.slug], {
      stdio: 'pipe',
      cwd: ROOT,
    });
  } catch (error) {
    const text = error.stdout?.toString() ?? error.message;
    problems.push(`pre-flight failed:\n${text.split('\n').filter((l) => l.includes('✗')).join('\n')}`);
  }
  return problems;
}

/** The article as it will be after release, in memory only. */
function released(candidate, day, sameDayOverride) {
  let raw = candidate.raw;
  raw = setFrontmatterValue(raw, 'status', 'published');
  raw = setFrontmatterValue(raw, 'publishedAt', day);
  raw = setFrontmatterValue(raw, 'updatedAt', day);
  raw = deleteFrontmatterKey(raw, 'noindex');
  if (sameDayOverride) raw = setFrontmatterValue(raw, 'sameDayOverride', true, { after: 'editorialApproved' });
  return parseArticle(candidate.file, raw);
}

/* -------------------------------------------------------------- commands */

function describeNow(now = new Date()) {
  const { day, hour, minute } = zonedNow(now);
  return `${day} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${TIME_ZONE}`;
}

function status() {
  const articles = readArticles();
  const now = new Date();
  const plan = planRelease(articles, now, options);
  const byStatus = (s) => articles.filter((a) => a.data.status === s);
  const queued = projectQueue(articles, now);

  console.log(`now: ${describeNow(now)} — releases from ${String(RELEASE_HOUR).padStart(2, '0')}:00, at most ${DAILY_LIMIT} per day`);
  console.log(`published ${byStatus('published').length}, scheduled ${byStatus('scheduled').length}, review ${byStatus('review').length}, draft ${byStatus('draft').length}`);
  for (const q of queued) console.log(`  queued  ${q.projected}  ${q.slug}  (publishAt ${q.publishAt})`);
  for (const a of byStatus('scheduled').filter((x) => blockedReason(x.data))) {
    console.log(`  blocked ${a.slug}: ${blockedReason(a.data)}`);
  }
  for (const a of byStatus('review')) {
    console.log(`  review  ${a.slug}${a.data.editorialApproved === true ? ' (approved — schedule it)' : ' (awaiting approval)'}`);
  }
  console.log(`\nnow: ${plan.action === 'release' ? `would release ${plan.slug}` : `${plan.action} — ${plan.reason}`}`);
}

function check() {
  const articles = readArticles();
  const plan = planRelease(articles, new Date(), options);
  console.log(`${describeNow()}: ${plan.action === 'release' ? `release ${plan.slug}${plan.sameDayOverride ? ' (second today — override)' : ''}` : `${plan.action} — ${plan.reason}`}`);
  output({ eligible: plan.action === 'release', slug: plan.slug ?? '', reason: (plan.reason ?? '').replace(/\n/g, ' ') });
  if (plan.action === 'error') process.exit(1);
}

function release() {
  let articles = readArticles();
  const site = loadSiteData();
  const now = new Date();
  const plan = planRelease(articles, now, options);

  if (plan.action !== 'release') {
    console.log(`${describeNow(now)}: ${plan.action} — ${plan.reason}`);
    output({ released: false, slug: '' });
    process.exit(plan.action === 'error' ? 1 : 0);
  }
  const expected = option('--expect');
  if (expected && expected !== plan.slug) {
    console.error(`plan changed between check and release: expected ${expected}, now ${plan.slug} — refusing`);
    process.exit(1);
  }

  const candidate = articles.find((a) => a.slug === plan.slug);
  const problems = validateCandidate(candidate, articles, site);
  if (problems.length) {
    console.error(`cannot release ${plan.slug}:\n${problems.map((p) => `  ✗ ${p}`).join('\n')}`);
    output({ released: false, slug: plan.slug });
    process.exit(1);
  }

  // Plan the linking pass against the corpus as it will be, before writing
  // anything: an article that cannot be linked into the site is not released.
  const next = released(candidate, plan.day, plan.sameDayOverride);
  const future = articles.map((a) => (a.slug === candidate.slug ? next : a));
  const links = planPostPublication(future, candidate.slug, site, { now });
  const blocking = links.checks.filter((c) => !c.ok && ['no-private-links', 'older-inbound', 'app-page'].includes(c.id));
  if (links.fatal || blocking.length) {
    console.error(`cannot release ${plan.slug}: ${links.fatal ?? blocking.map((c) => `${c.detail} — ${c.fix}`).join('; ')}`);
    output({ released: false, slug: plan.slug });
    process.exit(1);
  }

  console.log(`${describeNow(now)}: releasing ${plan.slug} with publishedAt ${plan.day}${plan.manual ? ' (manual)' : ''}${plan.sameDayOverride ? ' — second release today, override recorded' : ''}`);
  for (const c of links.checks) console.log(`  ${c.ok ? '✓' : '!'} ${c.detail}`);
  for (const a of links.actions) {
    console.log(`  + ${a.type === 'contextual' ? `prose link "${a.text}"` : 'card'} in ${a.source} → ${a.target}`);
  }

  if (dryRun) {
    console.log('[dry run] nothing written');
    output({ released: false, slug: plan.slug });
    return;
  }

  writeArticle(candidate, next.raw);
  articles = readArticles();
  const edited = applyActions(articles, links.actions, { setFrontmatterValue, parseArticle });
  for (const { original, article } of edited.values()) writeArticle(original, article.raw);

  const changed = [candidate.slug, ...[...edited.keys()].filter((s) => s !== candidate.slug)];
  console.log(`wrote ${changed.length} file(s): ${changed.map((s) => `content/blog/${s}.md`).join(', ')}`);
  console.log('next: npm run build, then commit and push — see docs/publishing-workflow.md');
  output({ released: true, slug: plan.slug });
}

function report() {
  const articles = readArticles();
  const now = new Date();
  const { day } = zonedNow(now);
  const byStatus = (s) => articles.filter((a) => a.data.status === s);
  const queued = projectQueue(articles, now);
  const plan = planRelease(articles, now, {});
  const recent = articles
    .filter((a) => isQueueEra(a.data))
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.slug.localeCompare(b.slug));
  const blocked = byStatus('scheduled').filter((a) => blockedReason(a.data));
  const legacy = articles.filter((a) => a.data.status === 'published' && a.data.publishedAt <= APPROVAL_GATE_AFTER);

  const lines = [
    '# Publishing queue report',
    '',
    `_Generated by \`npm run queue:report\` on ${day} (${TIME_ZONE}). Do not edit by hand; the workflow is described in [publishing-workflow.md](./publishing-workflow.md)._`,
    '',
    '## Rules in force',
    '',
    `- Dates are calendar days in **${TIME_ZONE}**.`,
    `- The hourly job releases from **${String(RELEASE_HOUR).padStart(2, '0')}:00** onward, at most **${DAILY_LIMIT}** article per day.`,
    '- Only `status: "scheduled"` articles with `editorialApproved: true` and a `publishAt` on or before today are eligible, earliest `publishAt` first, then by slug.',
    '- `publishedAt` is stamped with the real release day. It is never set earlier, and no other article\'s dates are changed.',
    `- Every article published after ${APPROVAL_GATE_AFTER} must carry \`editorialApproved: true\`; the build fails otherwise.`,
    '',
    '## Counts',
    '',
    '| Status | Articles | Editorially approved |',
    '| --- | --- | --- |',
    ...['draft', 'review', 'scheduled', 'published'].map((s) => {
      const list = byStatus(s);
      return `| ${s} | ${list.length} | ${list.filter((a) => a.data.editorialApproved === true).length} |`;
    }),
    '',
    `The ${legacy.length} articles published on or before ${APPROVAL_GATE_AFTER} predate the approval flag. They are not marked approved, because nobody approved them individually, and they are not unpublished for having been released in bulk — weak or overlapping pages are handled through the refresh queue instead.`,
    '',
    '## Queue',
    '',
    queued.length === 0
      ? 'The queue is empty. Nothing is scheduled, so the hourly job does nothing.'
      : ['| Projected release | Article | publishAt |', '| --- | --- | --- |', ...queued.map((q) => `| ${q.projected} | \`${q.slug}\` | ${q.publishAt} |`)].join('\n'),
    '',
    'Projected dates assume one release per day and no failures. An approval, an edit, a manual release or a failed build moves them.',
    '',
    '## Blocked',
    '',
    blocked.length === 0
      ? 'Nothing is blocked.'
      : blocked.map((a) => `- \`${a.slug}\` — ${blockedReason(a.data)}`).join('\n'),
    '',
    '## Awaiting review or approval',
    '',
    byStatus('review').length + byStatus('draft').length === 0
      ? 'No drafts or articles in review.'
      : [
          ...byStatus('review').map((a) => `- review: \`${a.slug}\`${a.data.editorialApproved === true ? ' — approved; set status "scheduled" and a publishAt' : ' — awaiting a person\'s approval'}`),
          ...byStatus('draft').map((a) => `- draft: \`${a.slug}\``),
        ].join('\n'),
    '',
    '## Released through the queue',
    '',
    recent.length === 0
      ? 'None yet.'
      : ['| Published | Article | Override |', '| --- | --- | --- |', ...recent.map((a) => `| ${a.data.publishedAt} | \`${a.slug}\` | ${a.data.sameDayOverride ? 'second release that day' : ''} |`)].join('\n'),
    '',
    '## What happens next',
    '',
    plan.action === 'release' ? `The next eligible run would release \`${plan.slug}\`.` : `The next run would do nothing: ${plan.reason}.`,
    '',
  ];
  writeFileSync(join(ROOT, 'docs', 'publishing-queue-report.md'), lines.join('\n'), 'utf8');
  console.log('docs/publishing-queue-report.md');
}

const commands = { status, check, release, report };
if (!commands[command]) {
  console.error(`unknown command "${command}" — use status, check, release or report`);
  process.exit(2);
}
commands[command]();
