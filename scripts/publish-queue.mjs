// The publishing queue, for articles a named person has approved and scheduled
// for a later day. Every scheduled article is released on or after its
// `publishAt` — all of them in the same run when several are due, because an
// article that has passed every check is not held back to fit a schedule.
//
// Finished articles that need no particular date — including every article
// published with the "AI-assisted" label — skip the queue and are published
// with scripts/publish-batch.mjs. See docs/publishing-workflow.md.
//
//   node scripts/publish-queue.mjs status               what is queued, and what would happen now
//   node scripts/publish-queue.mjs check                decide without writing (the hourly job's first step)
//   node scripts/publish-queue.mjs release              release every due article, then run the linking pass
//   node scripts/publish-queue.mjs report               write docs/publishing-queue-report.md
//
// Options for check/release:
//   --slug <slug>            manual override: release this scheduled, approved article now, ignoring publishAt
//   --ignore-release-hour    release before 09:00 Los Angeles
//   --expect <a,b,…>         release only if the plan still picks exactly these slugs (used by CI)
//   --dry-run                show what would change without writing
//   --ci                     also write the decision to $GITHUB_OUTPUT
//
// Guarantees, and where each one lives:
//   - Nothing is released without a person's approval and review record
//                                                           → planRelease, the loader, validate-content
//   - Reruns are no-ops: a released article is no longer scheduled
//   - The date is the real release day, never earlier       → publishedAt = today (Los Angeles), always
//   - Old publication dates never change                    → only the released articles' dates are written
//   - An article that cannot be linked or validated is not written; the others still go out
//   - A failed build deploys nothing                         → the workflow builds before it commits
//
// Only node built-ins are imported, so `check` runs before `npm ci`.

import { appendFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ROOT,
  deleteFrontmatterKey,
  loadSiteData,
  parseArticle,
  readArticles,
  setFrontmatterValue,
  writeArticle,
} from './lib/content.mjs';
import { applyActions, planPostPublication } from './lib/linking.mjs';
import {
  APPROVAL_GATE_AFTER,
  RELEASE_HOUR,
  TIME_ZONE,
  blockedReason,
  isQueueEra,
  planRelease,
  projectQueue,
  zonedNow,
} from './lib/publishing.mjs';
import { validateCandidate } from './lib/release-checks.mjs';

const [command = 'status', ...rest] = process.argv.slice(2);
const flag = (name) => rest.includes(name);
const option = (name) => {
  const i = rest.indexOf(name);
  return i >= 0 ? rest[i + 1] : undefined;
};
const options = {
  slug: option('--slug') || undefined,
  ignoreReleaseHour: flag('--ignore-release-hour'),
};
const dryRun = flag('--dry-run');
const ci = flag('--ci');

function output(values) {
  if (!ci || !process.env.GITHUB_OUTPUT) return;
  appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(values).map(([k, v]) => `${k}=${v}\n`).join(''));
}

/** The article as it will be after release, in memory only. */
function released(candidate, day) {
  let raw = candidate.raw;
  raw = setFrontmatterValue(raw, 'status', 'published');
  raw = setFrontmatterValue(raw, 'publishedAt', day);
  raw = setFrontmatterValue(raw, 'updatedAt', day);
  raw = deleteFrontmatterKey(raw, 'noindex');
  return parseArticle(candidate.file, raw);
}

/* -------------------------------------------------------------- commands */

function describeNow(now = new Date()) {
  const { day, hour, minute } = zonedNow(now);
  return `${day} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${TIME_ZONE}`;
}

const describePlan = (plan) =>
  plan.action === 'release' ? `release ${plan.slugs.join(', ')}` : `${plan.action} — ${plan.reason}`;

function status() {
  const articles = readArticles();
  const now = new Date();
  const plan = planRelease(articles, now, options);
  const byStatus = (s) => articles.filter((a) => a.data.status === s);
  const queued = projectQueue(articles, now);

  console.log(`now: ${describeNow(now)} — the hourly job releases every due article from ${String(RELEASE_HOUR).padStart(2, '0')}:00`);
  console.log(`published ${byStatus('published').length}, scheduled ${byStatus('scheduled').length}, review ${byStatus('review').length}, draft ${byStatus('draft').length}`);
  for (const q of queued) console.log(`  queued  ${q.projected}  ${q.slug}  (publishAt ${q.publishAt})`);
  for (const a of byStatus('scheduled').filter((x) => blockedReason(x.data))) {
    console.log(`  blocked ${a.slug}: ${blockedReason(a.data)}`);
  }
  for (const a of byStatus('review')) {
    const label = a.data.editorialReview === 'person' && a.data.editorialApproved === true
      ? ' (approved by a person — publish or schedule it)'
      : a.data.editorialReview === 'automated'
        ? ' (automated label — published with scripts/publish-batch.mjs)'
        : ' (no review label yet)';
    console.log(`  review  ${a.slug}${label}`);
  }
  console.log(`\nnow: ${plan.action === 'release' ? `would release ${plan.slugs.join(', ')}` : `${plan.action} — ${plan.reason}`}`);
}

function check() {
  const articles = readArticles();
  const plan = planRelease(articles, new Date(), options);
  console.log(`${describeNow()}: ${describePlan(plan)}`);
  output({
    eligible: plan.action === 'release',
    slugs: (plan.slugs ?? []).join(','),
    reason: (plan.reason ?? '').replace(/\n/g, ' '),
  });
  if (plan.action === 'error') process.exit(1);
}

function release() {
  let articles = readArticles();
  const site = loadSiteData();
  const now = new Date();
  const plan = planRelease(articles, now, options);

  if (plan.action !== 'release') {
    console.log(`${describeNow(now)}: ${plan.action} — ${plan.reason}`);
    output({ released: false, slugs: '', failed: '' });
    process.exit(plan.action === 'error' ? 1 : 0);
  }
  const expected = option('--expect');
  if (expected !== undefined && expected !== plan.slugs.join(',')) {
    console.error(`plan changed between check and release: expected ${expected}, now ${plan.slugs.join(',')} — refusing`);
    output({ released: false, slugs: '', failed: '' });
    process.exit(1);
  }

  const done = [];
  const failed = [];
  // One at a time, re-reading after each, so every article is validated and
  // linked against the corpus as it really is — including articles released
  // earlier in the same run.
  for (const slug of plan.slugs) {
    const candidate = articles.find((a) => a.slug === slug);
    const next = released(candidate, plan.day);
    const problems = validateCandidate(candidate, next.data, articles, site, { now });
    if (problems.length) {
      console.error(`cannot release ${slug}:\n${problems.map((p) => `  ✗ ${p}`).join('\n')}`);
      failed.push(slug);
      continue;
    }

    // Plan the linking pass against the corpus as it will be, before writing
    // anything: an article that cannot be linked into the site is not released.
    const future = articles.map((a) => (a.slug === candidate.slug ? next : a));
    const links = planPostPublication(future, candidate.slug, site, { now });
    const blocking = links.checks.filter((c) => !c.ok && ['no-private-links', 'older-inbound', 'app-page'].includes(c.id));
    if (links.fatal || blocking.length) {
      console.error(`cannot release ${slug}: ${links.fatal ?? blocking.map((c) => `${c.detail} — ${c.fix}`).join('; ')}`);
      failed.push(slug);
      continue;
    }

    console.log(`${describeNow(now)}: releasing ${slug} with publishedAt ${plan.day}${plan.manual ? ' (manual)' : ''}`);
    for (const c of links.checks) console.log(`  ${c.ok ? '✓' : '!'} ${c.detail}`);
    for (const a of links.actions) {
      console.log(`  + ${a.type === 'contextual' ? `prose link "${a.text}"` : 'card'} in ${a.source} → ${a.target}`);
    }
    done.push(slug);
    if (dryRun) continue;

    writeArticle(candidate, next.raw);
    articles = readArticles();
    const edited = applyActions(articles, links.actions, { setFrontmatterValue, parseArticle });
    for (const { original, article } of edited.values()) writeArticle(original, article.raw);
    articles = readArticles();
    const changed = [slug, ...[...edited.keys()].filter((s) => s !== slug)];
    console.log(`  wrote ${changed.length} file(s): ${changed.map((s) => `content/blog/${s}.md`).join(', ')}`);
  }

  if (dryRun) {
    console.log(`[dry run] nothing written — would release ${done.join(', ') || 'nothing'}`);
    output({ released: false, slugs: done.join(','), failed: failed.join(',') });
    process.exit(failed.length && !done.length ? 1 : 0);
  }
  if (done.length) console.log('next: npm run build, then commit and push — see docs/publishing-workflow.md');
  if (failed.length) console.error(`not released: ${failed.join(', ')} — fix the ✗ lines above; the next run retries`);
  output({ released: done.length > 0, slugs: done.join(','), failed: failed.join(',') });
  // Articles that passed are written even when another one failed: one bad
  // article must not hold back the rest. The job still reports the failure.
  process.exit(failed.length && !done.length ? 1 : 0);
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
  const label = (a) => (a.data.editorialReview === 'person' ? `reviewed by ${a.data.reviewerName} (${a.data.reviewDate})` : a.data.editorialReview === 'automated' ? 'AI-assisted, not reviewed by a person' : '—');

  const lines = [
    '# Publishing queue report',
    '',
    `_Generated by \`npm run queue:report\` on ${day} (${TIME_ZONE}). Do not edit by hand; the workflow is described in [publishing-workflow.md](./publishing-workflow.md)._`,
    '',
    '## Rules in force',
    '',
    `- Dates are calendar days in **${TIME_ZONE}**.`,
    '- There is **no daily limit**. A finished article is published as soon as it passes every check — directly with `scripts/publish-batch.mjs`, or, when a person has approved it for a particular day, through this queue.',
    `- The hourly job releases from **${String(RELEASE_HOUR).padStart(2, '0')}:00** onward, every due article in one run.`,
    '- Only `status: "scheduled"` articles with `editorialReview: "person"`, `editorialApproved: true`, the complete review record and a `publishAt` on or before today are eligible.',
    '- `publishedAt` is stamped with the real release day. It is never set earlier, and no other article\'s dates are changed.',
    `- Every article published after ${APPROVAL_GATE_AFTER} must say how it was checked (\`editorialReview\`); the build fails otherwise.`,
    '',
    '## Counts',
    '',
    '| Status | Articles | Approved by a person | AI-assisted label |',
    '| --- | --- | --- | --- |',
    ...['draft', 'review', 'scheduled', 'published'].map((s) => {
      const list = byStatus(s);
      return `| ${s} | ${list.length} | ${list.filter((a) => a.data.editorialReview === 'person').length} | ${list.filter((a) => a.data.editorialReview === 'automated').length} |`;
    }),
    '',
    `The ${legacy.length} articles published on or before ${APPROVAL_GATE_AFTER} predate the review labels. They carry none, because nobody approved them individually, and they are not unpublished for having been released in bulk — weak or overlapping pages are handled through the refresh queue instead.`,
    '',
    '## Queue',
    '',
    queued.length === 0
      ? 'The queue is empty. Nothing is scheduled, so the hourly job does nothing.'
      : ['| Projected release | Article | publishAt |', '| --- | --- | --- |', ...queued.map((q) => `| ${q.projected} | \`${q.slug}\` | ${q.publishAt} |`)].join('\n'),
    '',
    'Projected dates assume no failures. An edit, a manual release or a failed build moves them.',
    '',
    '## Blocked',
    '',
    blocked.length === 0
      ? 'Nothing is blocked.'
      : blocked.map((a) => `- \`${a.slug}\` — ${blockedReason(a.data)}`).join('\n'),
    '',
    '## Not yet published',
    '',
    byStatus('review').length + byStatus('draft').length === 0
      ? 'No drafts or articles in review.'
      : [
          ...byStatus('review').map((a) => `- review: \`${a.slug}\` — ${a.data.editorialReview === 'person' ? 'approved by a person; publish or schedule it' : a.data.editorialReview === 'automated' ? 'automated label; published by scripts/publish-batch.mjs once its editorial review passes' : 'no review label yet'}`),
          ...byStatus('draft').map((a) => `- draft: \`${a.slug}\``),
        ].join('\n'),
    '',
    `## Published after ${APPROVAL_GATE_AFTER}`,
    '',
    recent.length === 0
      ? 'None yet.'
      : ['| Published | Article | How it was checked |', '| --- | --- | --- |', ...recent.map((a) => `| ${a.data.publishedAt} | \`${a.slug}\` | ${label(a)} |`)].join('\n'),
    '',
    '## What happens next',
    '',
    plan.action === 'release' ? `The next eligible run would release ${plan.slugs.map((s) => `\`${s}\``).join(', ')}.` : `The next run would do nothing: ${plan.reason}.`,
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
