// Batch publication and the batch linking pass.
//
// Part one plans links on a small synthetic corpus held in memory. Part two
// rehearses `scripts/publish-batch.mjs` and `post-publication-links.mjs --batch`
// as child processes against a temporary copy of the real articles
// (REIGN_CONTENT_DIR); the copy is deleted afterwards and the real content/blog
// is never touched. The editorial review log used there is a fixture written to
// the temporary directory; it records no real review.
//
// Run: npm test

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { CONTENT_DIR, ROOT, bodyTargets, parseArticle, setFrontmatterValue } from '../lib/content.mjs';
import { BATCH_PER_SOURCE_CAP, MAX_RELATED, applyActions, planBatchLinks } from '../lib/linking.mjs';
import { APPROVAL_GATE_AFTER, laDay } from '../lib/publishing.mjs';
import {
  AI_REVIEW,
  REVIEW_LOG_SCHEMA,
  logEntryProblems,
  readReviewLog,
  reviewedContentHash,
} from '../publish-batch.mjs';

/* ------------------------------------------------- synthetic batch linking */

const NOW = new Date('2026-10-05T18:00:00Z'); // 2026-10-05 in Los Angeles
const site = {
  apps: [
    { slug: 'tower-app', name: 'Tower App', packageId: 'com.example.tower', categoryId: 'action-arcade' },
    { slug: 'math-app', name: 'Math App', packageId: 'com.example.math', categoryId: 'education-brain' },
    { slug: 'solo-app', name: 'Solo App', packageId: 'com.example.solo', categoryId: 'video-utility' },
  ],
  hubs: [],
};

function make(slug, fields = {}, body = '') {
  const data = {
    title: fields.title ?? `Title for ${slug.replace(/-/g, ' ')}`,
    metaTitle: 'x',
    description: 'x',
    status: 'published',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    author: 'reign-creative-llc',
    category: 'action-arcade',
    tags: ['tower defense', 'strategy'],
    primaryKeyword: `${slug} keyword`,
    secondaryKeywords: [],
    relatedApps: ['tower-app'],
    relatedArticles: [],
    ...fields,
  };
  const text = body || `Intro linking the [app](/apps/${data.relatedApps[0]}/) and the [category](/blog/category/${data.category}/).\n`;
  return parseArticle(`/virtual/${slug}.md`, `---\n${JSON.stringify(data, null, 2)}\n---\n${text}`);
}

const fresh = (slug, extra = {}) =>
  make(slug, { publishedAt: '2026-10-05', updatedAt: '2026-10-05', editorialReview: 'automated', ...extra });

function corpus({ olderRelated = [] } = {}) {
  return [
    make('older-a', { relatedArticles: olderRelated }),
    make('older-b', { relatedArticles: olderRelated }),
    make('older-c', { relatedArticles: olderRelated }),
    make('unrelated', { category: 'education-brain', relatedApps: ['math-app'], tags: ['arithmetic'] }),
    fresh('new-1', { relatedArticles: ['older-a', 'older-b'] }),
    fresh('new-2', { relatedArticles: ['older-a', 'older-c'] }),
    fresh('new-3', { relatedArticles: ['older-b', 'older-c'] }),
    fresh('new-4', { relatedArticles: ['older-a', 'older-b'] }),
  ];
}
const NEW = ['new-1', 'new-2', 'new-3', 'new-4'];

function apply(articles, actions) {
  const edited = applyActions(articles, actions, { setFrontmatterValue, parseArticle });
  return articles.map((a) => edited.get(a.slug)?.article ?? a);
}
const linksTo = (articles, source, target) => {
  const a = articles.find((x) => x.slug === source);
  return a.data.relatedArticles.includes(target) || bodyTargets(a).has(target);
};

test('every new article gets an older source before any gets a second, within the per-source cap', () => {
  const articles = corpus();
  const plan = planBatchLinks(articles, NEW, site, { now: NOW });
  const after = apply(articles, plan.actions);
  for (const slug of NEW) {
    const older = ['older-a', 'older-b', 'older-c'].filter((o) => linksTo(after, o, slug));
    assert.ok(older.length >= 1, `${slug} has no older source`);
    assert.ok(plan.results.get(slug).checks.every((c) => c.ok), JSON.stringify(plan.results.get(slug).checks.filter((c) => !c.ok)));
  }
  for (const source of ['older-a', 'older-b', 'older-c']) {
    const a = after.find((x) => x.slug === source);
    assert.ok(a.data.relatedArticles.filter((s) => NEW.includes(s)).length <= BATCH_PER_SOURCE_CAP, `${source} flooded`);
    assert.ok(a.data.relatedArticles.length <= MAX_RELATED);
  }
  // Three older articles × two cards each = six slots for eight wanted links:
  // round one gives all four new articles one; round two shares out the rest.
  assert.equal(plan.summary.linkedFromOlder, 4);
  assert.equal(plan.summary.cardsFromOlder, 6);
  assert.ok(!plan.actions.some((a) => a.source === 'unrelated' || a.target === 'unrelated'), 'irrelevant articles are never linked');
});

test('when no older article has room, a new article is linked from the same batch', () => {
  const full = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6'];
  const articles = [...corpus({ olderRelated: full }), ...full.map((s) => make(s, { category: 'education-brain', relatedApps: ['math-app'], tags: ['arithmetic'] }))];
  const plan = planBatchLinks(articles, NEW, site, { now: NOW });
  assert.ok(!plan.actions.some((a) => a.source.startsWith('older-')), 'a full older article cannot take a card');
  const after = apply(articles, plan.actions);
  for (const slug of NEW) {
    const inbound = after.filter((a) => a.slug !== slug && linksTo(after, a.slug, slug));
    assert.ok(inbound.length >= 1, `${slug} has no inbound link`);
    assert.ok(plan.results.get(slug).checks.find((c) => c.id === 'batch-inbound').ok);
  }
  assert.equal(plan.summary.linkedFromOlder, 0);
  assert.equal(plan.summary.unlinked, 0);
});

test('the batch plan is idempotent: a second run over the same batch adds nothing', () => {
  let articles = corpus();
  const plan = planBatchLinks(articles, NEW, site, { now: NOW });
  articles = apply(articles, plan.actions);
  const again = planBatchLinks(articles, NEW, site, { now: NOW });
  assert.deepEqual(again.actions, []);
  assert.equal(applyActions(articles, plan.actions, { setFrontmatterValue, parseArticle }).size, 0);
});

test('an article nothing relevant can link is reported, not linked to filler', () => {
  const articles = [...corpus(), fresh('orphan', { relatedApps: ['solo-app'], category: 'video-utility', tags: ['solo'], relatedArticles: [] })];
  const plan = planBatchLinks(articles, ['orphan'], site, { now: NOW });
  const check = plan.results.get('orphan').checks.find((c) => c.id === 'batch-inbound');
  assert.equal(check.ok, false);
  assert.equal(plan.summary.unlinked, 1);
});

test('an article that is not public is refused', () => {
  const articles = [...corpus(), fresh('draft-one', { status: 'review' })];
  const plan = planBatchLinks(articles, ['draft-one'], site, { now: NOW });
  assert.match(plan.results.get('draft-one').fatal, /not public/);
});

/* ------------------------------------------------- the review log contract */

test('the content hash covers what a reader sees, not cards, status or dates', () => {
  const a = make('hashed', { faqs: [{ question: 'q?', answer: 'a.' }] }, 'Body text.\n');
  const moved = parseArticle(a.file, setFrontmatterValue(setFrontmatterValue(a.raw, 'status', 'review'), 'relatedArticles', ['older-a']));
  assert.equal(reviewedContentHash(moved), reviewedContentHash(a));
  const crlf = parseArticle(a.file, a.raw.replace(/\n/g, '\r\n'));
  assert.equal(reviewedContentHash(crlf), reviewedContentHash(a), 'line endings are not content');
  const edited = parseArticle(a.file, a.raw.replace('Body text.', 'Body text, changed.'));
  assert.notEqual(reviewedContentHash(edited), reviewedContentHash(a));
  const faq = parseArticle(a.file, setFrontmatterValue(a.raw, 'faqs', [{ question: 'q?', answer: 'different.' }]));
  assert.notEqual(reviewedContentHash(faq), reviewedContentHash(a));
});

test('a log entry authorises publication only when it is a passing AI review of this exact text', () => {
  const a = make('logged');
  const good = { slug: 'logged', verdict: 'pass', performedBy: AI_REVIEW, reviewedAt: '2026-10-05', checks: ['sources'], notes: 'ok', contentHash: reviewedContentHash(a) };
  assert.deepEqual(logEntryProblems(good, a, NOW), []);
  assert.match(logEntryProblems(undefined, a, NOW)[0], /not been reviewed/);
  assert.match(logEntryProblems({ ...good, verdict: 'revise' }, a, NOW).join(' '), /not "pass"/);
  assert.match(logEntryProblems({ ...good, performedBy: 'Jane Doe' }, a, NOW).join(' '), /AI editorial review only/);
  assert.match(logEntryProblems({ ...good, reviewedAt: '2026-10-06' }, a, NOW).join(' '), /future/);
  assert.match(logEntryProblems({ ...good, checks: [] }, a, NOW).join(' '), /no checks/);
  assert.match(logEntryProblems({ ...good, contentHash: undefined }, a, NOW).join(' '), /no contentHash/);
  const changed = parseArticle(a.file, a.raw.replace('Intro linking', 'Intro, edited, linking'));
  assert.match(logEntryProblems(good, changed, NOW).join(' '), /changed after its editorial review/);
});

test('the latest entry for a slug wins, and a log with the wrong schema is refused', () => {
  const dir = mkdtempSync(join(tmpdir(), 'reign-log-'));
  try {
    const file = join(dir, 'log.json');
    writeFileSync(file, JSON.stringify({ schema: REVIEW_LOG_SCHEMA, entries: [
      { slug: 'a', verdict: 'revise', reviewedAt: '2026-10-01' },
      { slug: 'a', verdict: 'pass', reviewedAt: '2026-10-02' },
    ] }));
    const { entries, problems } = readReviewLog(file);
    assert.deepEqual(problems, []);
    assert.equal(entries.get('a').verdict, 'pass');
    writeFileSync(file, JSON.stringify({ schema: 'something-else', entries: [] }));
    assert.match(readReviewLog(file).problems.join(' '), /schema/);
    assert.match(readReviewLog(join(dir, 'missing.json')).problems.join(' '), /does not exist/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

/* ------------------------------------------- rehearsal on a copy of the site */

const BATCH = join(ROOT, 'scripts', 'publish-batch.mjs');
const LINKS = join(ROOT, 'scripts', 'post-publication-links.mjs');
let dir;
let logFile;
/** [passes, passes, verdict "revise", passed but edited afterwards] */
let picks;
const realBefore = new Map();

const node = (script, args) =>
  spawnSync(process.execPath, [script, ...args], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, REIGN_CONTENT_DIR: dir } });
const read = (slug) => parseArticle(join(dir, `${slug}.md`), readFileSync(join(dir, `${slug}.md`), 'utf8'));
function edit(slug, changes) {
  let raw = readFileSync(join(dir, `${slug}.md`), 'utf8');
  for (const [key, value] of Object.entries(changes)) raw = setFrontmatterValue(raw, key, value, { after: 'status' });
  writeFileSync(join(dir, `${slug}.md`), raw);
}
const snapshot = () => readdirSync(dir).map((f) => `${f}:${readFileSync(join(dir, f), 'utf8')}`).join('\n');

before(() => {
  dir = mkdtempSync(join(tmpdir(), 'reign-batch-'));
  cpSync(CONTENT_DIR, dir, { recursive: true });

  // Independent of the real state, exactly as the queue rehearsal does it.
  for (const name of readdirSync(dir)) {
    const slug = name.replace(/\.md$/, '');
    const { data } = read(slug);
    if (data.status !== 'published') edit(slug, { status: 'draft', editorialApproved: false });
    else if (data.publishedAt > APPROVAL_GATE_AFTER) edit(slug, { publishedAt: APPROVAL_GATE_AFTER, updatedAt: APPROVAL_GATE_AFTER });
  }

  // Four published articles that link their own app page and none of each
  // other, so holding one back cannot strand another.
  const preferred = ['shonen-vs-seinen', 'what-does-td-mean-in-games', 'glycemic-index-and-load', 'how-draft-lotteries-work'];
  const all = readdirSync(dir).map((name) => name.replace(/\.md$/, ''));
  const eligible = [...preferred.filter((s) => all.includes(s)), ...all.filter((s) => !preferred.includes(s))].filter((slug) => {
    const a = read(slug);
    return a.data.status === 'published' && a.body.includes(`](/apps/${a.data.relatedApps[0]}/)`) && (a.data.sources ?? []).length > 0;
  });
  picks = [];
  for (const slug of eligible) {
    const a = read(slug);
    const touches = (other) => {
      const b = read(other);
      return a.data.relatedArticles.includes(other) || bodyTargets(a).has(other) || b.data.relatedArticles.includes(slug) || bodyTargets(b).has(slug);
    };
    if (picks.some(touches)) continue;
    picks.push(slug);
    if (picks.length === 4) break;
  }
  for (const slug of picks) realBefore.set(slug, readFileSync(join(CONTENT_DIR, `${slug}.md`), 'utf8'));

  // Strip the first pick's existing inbound cards, so the linking pass has
  // something to do for it.
  for (const name of readdirSync(dir)) {
    const slug = name.replace(/\.md$/, '');
    const related = read(slug).data.relatedArticles ?? [];
    if (related.includes(picks[0])) edit(slug, { relatedArticles: related.filter((s) => s !== picks[0]) });
  }

  // Turn the picks into finished, unpublished articles with the automated label.
  for (const slug of picks) {
    edit(slug, { status: 'review', editorialReview: 'automated', publishedAt: '2026-01-01', updatedAt: '2026-01-01', noindex: true });
  }

  const entry = (slug, verdict) => ({
    slug,
    verdict,
    performedBy: AI_REVIEW,
    reviewedAt: laDay(),
    checks: ['fixture'],
    notes: 'Fixture for the batch rehearsal; no real review.',
    contentHash: reviewedContentHash(read(slug)),
  });
  logFile = join(dir, '..', `review-log-${process.pid}.json`);
  writeFileSync(
    logFile,
    JSON.stringify({ schema: REVIEW_LOG_SCHEMA, entries: [entry(picks[0], 'pass'), entry(picks[1], 'pass'), entry(picks[2], 'revise'), entry(picks[3], 'pass')] })
  );
  // The fourth is edited after its review, so its logged hash no longer matches.
  writeFileSync(join(dir, `${picks[3]}.md`), readFileSync(join(dir, `${picks[3]}.md`), 'utf8').replace(/\n$/, '\n\nA sentence added after the review.\n'));
});

after(() => {
  rmSync(dir, { recursive: true, force: true });
  rmSync(logFile, { force: true });
});

test('--dry-run decides and reports, and writes nothing', () => {
  const before = snapshot();
  const result = node(BATCH, [...picks, '--log', logFile, '--dry-run']);
  assert.equal(result.status, 1, 'something is held back, so the exit code says so');
  assert.match(result.stdout, new RegExp(`would publish ${picks[0]}`));
  assert.equal(snapshot(), before);
});

test('publishes exactly the articles with a passing review of their current text, dated today', () => {
  const result = node(BATCH, [...picks, '--log', logFile]);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  for (const slug of [picks[0], picks[1]]) {
    const { data } = read(slug);
    assert.equal(data.status, 'published', slug);
    assert.equal(data.publishedAt, laDay(), `${slug}: the real day, never the placeholder`);
    assert.equal(data.updatedAt, laDay());
    assert.equal(data.noindex, undefined);
    assert.equal(data.editorialReview, 'automated');
    assert.equal(data.editorialApproved, undefined, 'nothing claims a person approved it');
  }
  assert.equal(read(picks[2]).data.status, 'review');
  assert.equal(read(picks[2]).data.noindex, true);
  assert.match(result.stdout, /not "pass"/);
  assert.equal(read(picks[3]).data.status, 'review');
  assert.match(result.stdout, /changed after its editorial review/);
});

test('the batch linking pass links every new article and a rerun changes nothing', () => {
  const slugs = readdirSync(dir).map((name) => name.replace(/\.md$/, ''));
  const cardsBefore = new Map(slugs.map((slug) => [slug, JSON.stringify(read(slug).data.relatedArticles)]));
  const datesBefore = new Map(slugs.map((slug) => [slug, `${read(slug).data.publishedAt}/${read(slug).data.updatedAt}`]));
  const bodiesBefore = new Map(slugs.map((slug) => [slug, read(slug).body]));
  const result = node(LINKS, ['--batch', '--today']);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /batch: 2 article\(s\)/);
  const inbound = (slug) =>
    slugs.filter((other) => other !== slug && (read(other).data.relatedArticles.includes(slug) || read(other).body.includes(`](/blog/${slug}/)`))).length;
  assert.ok(inbound(picks[0]) >= 1, 'the stripped article is linked again');
  const changed = slugs.filter((slug) => JSON.stringify(read(slug).data.relatedArticles) !== cardsBefore.get(slug));
  assert.ok(changed.length >= 1, 'the pass added at least one card');
  for (const slug of changed) {
    assert.ok(read(slug).data.relatedArticles.length <= MAX_RELATED, `${slug} now has more than ${MAX_RELATED} cards`);
    assert.equal(`${read(slug).data.publishedAt}/${read(slug).data.updatedAt}`, datesBefore.get(slug), `${slug}: a link is not a revision`);
    assert.equal(read(slug).body, bodiesBefore.get(slug), `${slug}: the batch pass adds cards, never prose`);
  }
  const before = snapshot();
  const again = node(LINKS, ['--batch', '--today']);
  assert.equal(again.status, 0, again.stdout + again.stderr);
  assert.equal(snapshot(), before);
});

test('an article already published, or one without a label, is never published again by the batch', () => {
  const before = snapshot();
  const result = node(BATCH, [picks[0], '--log', logFile]);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /status is "published"/);
  assert.equal(snapshot(), before);
});

test('the real content directory was never touched', () => {
  for (const slug of picks) assert.equal(readFileSync(join(CONTENT_DIR, `${slug}.md`), 'utf8'), realBefore.get(slug), slug);
});
