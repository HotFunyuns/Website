// Release rules: the Los Angeles calendar, the review contract, the queue with
// no daily limit, and the rerun guarantee. Every case passes an explicit
// instant, so daylight saving and midnight edges are tested on any day the
// suite runs.
//
// The review records below are test fixtures that exist only in memory. They
// describe no real review, and nothing in the repository writes one.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../lib/content.mjs';
import {
  APPROVAL_GATE_AFTER,
  FEED_ITEM_LIMIT,
  RELEASE_HOUR,
  REVIEW_LABELS_INTRODUCED,
  REVIEW_RECORD_FIELDS,
  addDays,
  blockedReason,
  feedSlugs,
  isPublic,
  laDay,
  planRelease,
  projectQueue,
  reviewProblems,
  zonedNow,
} from '../lib/publishing.mjs';

const SOURCE = 'https://example.org/a-primary-source';
/** A fixture of a person's completed review record. Never real data. */
const PERSON = {
  editorialReview: 'person',
  editorialApproved: true,
  reviewerName: 'Fixture Reviewer',
  reviewDate: '2026-08-30',
  sourcesChecked: [SOURCE],
  reviewNotes: 'Fixture: read in full; source opened.',
  sources: [{ title: 'A source', publisher: 'Example', url: SOURCE, accessed: '2026-08-30' }],
};

const article = (slug, data) => ({ slug, data: { status: 'published', publishedAt: '2026-08-09', ...data } });
const scheduled = (slug, publishAt, extra = {}) =>
  article(slug, { status: 'scheduled', ...PERSON, publishAt, publishedAt: publishAt, ...extra });

/* ------------------------------------------------------------- calendar */

test('the day is the Los Angeles day, not the UTC day', () => {
  // 21:40 PDT on the 25th is already the 26th in UTC.
  assert.deepEqual(zonedNow(new Date('2026-09-26T04:40:00Z')), { day: '2026-09-25', hour: 21, minute: 40 });
  assert.equal(laDay(new Date('2026-09-26T06:59:00Z')), '2026-09-25');
  assert.equal(laDay(new Date('2026-09-26T07:00:00Z')), '2026-09-26');
});

test('midnight is hour 0, never 24', () => {
  assert.equal(zonedNow(new Date('2026-09-26T07:00:00Z')).hour, 0);
  assert.equal(zonedNow(new Date('2026-12-31T08:00:00Z')).hour, 0);
});

test('daylight saving start: 02:00 PST jumps to 03:00 PDT on 2026-03-08', () => {
  assert.deepEqual(zonedNow(new Date('2026-03-08T09:59:00Z')), { day: '2026-03-08', hour: 1, minute: 59 });
  assert.deepEqual(zonedNow(new Date('2026-03-08T10:00:00Z')), { day: '2026-03-08', hour: 3, minute: 0 });
});

test('daylight saving end: 01:00–02:00 happens twice on 2026-11-01, still one day', () => {
  assert.deepEqual(zonedNow(new Date('2026-11-01T08:30:00Z')), { day: '2026-11-01', hour: 1, minute: 30 });
  assert.deepEqual(zonedNow(new Date('2026-11-01T09:30:00Z')), { day: '2026-11-01', hour: 1, minute: 30 });
  assert.equal(laDay(new Date('2026-11-02T07:59:00Z')), '2026-11-01');
  assert.equal(laDay(new Date('2026-11-02T08:00:00Z')), '2026-11-02');
});

test('the release hour follows local time across the DST change', () => {
  // 09:00 PDT is 16:00 UTC in September; 09:00 PST is 17:00 UTC in November.
  const due = [scheduled('a', '2026-09-01')];
  assert.equal(planRelease(due, new Date('2026-09-28T15:59:00Z')).action, 'noop');
  assert.equal(planRelease(due, new Date('2026-09-28T16:00:00Z')).action, 'release');
  assert.equal(planRelease(due, new Date('2026-11-02T16:30:00Z')).action, 'noop');
  assert.equal(planRelease(due, new Date('2026-11-02T17:00:00Z')).action, 'release');
});

test('addDays is calendar arithmetic', () => {
  assert.equal(addDays('2026-09-30', 1), '2026-10-01');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(addDays('2026-11-01', 1), '2026-11-02');
});

/* ---------------------------------------------------------- public rule */

test('an article dated tomorrow in Los Angeles is not public, even when UTC says it is today', () => {
  const now = new Date('2026-09-26T04:40:00Z'); // 2026-09-25 in LA, 2026-09-26 in UTC
  assert.equal(isPublic({ status: 'published', publishedAt: '2026-09-25' }, now), true);
  assert.equal(isPublic({ status: 'published', publishedAt: '2026-09-26' }, now), false);
});

test('only "published" is ever public', () => {
  const now = new Date('2026-10-01T20:00:00Z');
  for (const status of ['draft', 'review', 'scheduled']) {
    assert.equal(isPublic({ status, publishedAt: '2026-01-01' }, now), false, status);
  }
});

/* ------------------------------------------------------ review contract */

const NOW = new Date('2026-10-05T18:00:00Z'); // 11:00 PDT on 2026-10-05
const postGate = (extra) => ({ status: 'published', publishedAt: '2026-10-05', sources: PERSON.sources, ...extra });

test('a legacy article (published on or before the gate) needs no label and claims none', () => {
  assert.deepEqual(reviewProblems({ status: 'published', publishedAt: APPROVAL_GATE_AFTER }, NOW), []);
  assert.ok(reviewProblems({ status: 'published', publishedAt: APPROVAL_GATE_AFTER, editorialApproved: true }, NOW).length > 0,
    'an approval flag without the record is a claim nobody can back');
});

test('an article published after the gate must say how it was checked', () => {
  assert.match(reviewProblems(postGate({}), NOW).join(' '), /must say how it was checked/);
  assert.deepEqual(reviewProblems(postGate({ editorialReview: 'automated' }), NOW), []);
  assert.deepEqual(reviewProblems(postGate({ ...PERSON }), NOW), []);
  assert.match(reviewProblems(postGate({ editorialReview: 'robot' }), NOW).join(' '), /"person" or "automated"/);
});

test('nothing may be dated between the gate and the day labels were introduced', () => {
  const inGap = postGate({ editorialReview: 'automated', publishedAt: '2026-09-28' });
  assert.match(reviewProblems(inGap, NOW).join(' '), /when nothing was published/);
  assert.deepEqual(reviewProblems(postGate({ editorialReview: 'automated', publishedAt: REVIEW_LABELS_INTRODUCED }), NOW), []);
});

test('"person" needs every field of the review record', () => {
  for (const field of ['editorialApproved', ...REVIEW_RECORD_FIELDS]) {
    const { [field]: _removed, ...rest } = PERSON;
    const problems = reviewProblems(postGate(rest), NOW);
    assert.ok(problems.length > 0, `missing ${field} must fail`);
  }
  assert.ok(reviewProblems(postGate({ ...PERSON, reviewerName: '  ' }), NOW).length > 0, 'a blank name is no name');
  assert.ok(reviewProblems(postGate({ ...PERSON, reviewNotes: '' }), NOW).length > 0, 'blank notes are no notes');
  assert.ok(reviewProblems(postGate({ ...PERSON, sourcesChecked: [] }), NOW).length > 0, 'no sources checked');
});

test('the review date is a real day, not in the future', () => {
  assert.match(reviewProblems(postGate({ ...PERSON, reviewDate: '2026-10-06' }), NOW).join(' '), /in the future/);
  assert.match(reviewProblems(postGate({ ...PERSON, reviewDate: 'yesterday' }), NOW).join(' '), /reviewDate/);
});

test('sourcesChecked must name the article\'s own sources', () => {
  const problems = reviewProblems(postGate({ ...PERSON, sourcesChecked: [SOURCE, 'https://example.org/not-cited'] }), NOW);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /not-cited.*not the url of one of this article's sources/);
});

test('"automated" carries no approval and no review record', () => {
  assert.match(reviewProblems(postGate({ editorialReview: 'automated', editorialApproved: true }), NOW).join(' '), /person's approval/);
  for (const field of REVIEW_RECORD_FIELDS) {
    const problems = reviewProblems(postGate({ editorialReview: 'automated', [field]: PERSON[field] }), NOW);
    assert.ok(problems.some((p) => p.includes(`"${field}"`)), field);
  }
});

test('only an article a person approved can be scheduled', () => {
  const automated = { status: 'scheduled', editorialReview: 'automated', publishAt: '2026-10-05' };
  assert.match(reviewProblems(automated, NOW).join(' '), /only an article a person has approved/);
  assert.deepEqual(reviewProblems({ status: 'scheduled', publishAt: '2026-10-05', ...PERSON }, NOW), []);
});

/* ------------------------------------------------------- release planning */

const AFTER_HOURS = NOW;

test('releases every due, approved, scheduled article in one run, earliest publishAt first', () => {
  const plan = planRelease(
    [scheduled('b-second', '2026-10-03'), scheduled('a-first', '2026-10-01'), scheduled('c-later', '2026-10-09')],
    AFTER_HOURS
  );
  assert.equal(plan.action, 'release');
  assert.deepEqual(plan.slugs, ['a-first', 'b-second']);
  assert.equal(plan.day, '2026-10-05');
});

test('ties on publishAt are broken by slug, so every run orders them the same way', () => {
  const plan = planRelease([scheduled('zebra', '2026-10-01'), scheduled('apple', '2026-10-01')], AFTER_HOURS);
  assert.deepEqual(plan.slugs, ['apple', 'zebra']);
});

test('a file existing is not enough: unapproved, unrecorded, draft and review articles are never released', () => {
  const plan = planRelease(
    [
      scheduled('unapproved', '2026-10-01', { editorialApproved: false }),
      scheduled('no-record', '2026-10-01', { reviewerName: undefined }),
      article('draft', { status: 'draft', ...PERSON, publishAt: '2026-10-01' }),
      article('review', { status: 'review', ...PERSON, publishAt: '2026-10-01' }),
    ],
    AFTER_HOURS
  );
  assert.equal(plan.action, 'noop');
  assert.match(blockedReason(scheduled('no-record', '2026-10-01', { reviewerName: undefined }).data, AFTER_HOURS), /review record incomplete/);
});

test('nothing is released before its publishAt', () => {
  assert.equal(planRelease([scheduled('future', '2026-10-06')], AFTER_HOURS).action, 'noop');
});

test('nothing is released before the release hour', () => {
  const plan = planRelease([scheduled('due', '2026-10-01')], new Date('2026-10-05T15:00:00Z'));
  assert.equal(plan.action, 'noop');
  assert.match(plan.reason, /before release time/);
});

test('there is no daily limit: an article released earlier today holds nothing back', () => {
  const afterFirstRun = [
    article('released', { publishedAt: '2026-10-05', ...PERSON, publishAt: '2026-10-01' }),
    scheduled('next', '2026-10-01'),
  ];
  const plan = planRelease(afterFirstRun, AFTER_HOURS);
  assert.equal(plan.action, 'release');
  assert.deepEqual(plan.slugs, ['next']);
});

test('a rerun after everything due went out does nothing', () => {
  const plan = planRelease(
    [article('released', { publishedAt: '2026-10-05', ...PERSON }), scheduled('later', '2026-10-09')],
    AFTER_HOURS
  );
  assert.deepEqual(plan, { action: 'noop', reason: 'no scheduled, approved article is due' });
});

test('there is nothing to do when the queue is empty', () => {
  const plan = planRelease([article('old', {})], AFTER_HOURS);
  assert.deepEqual(plan, { action: 'noop', reason: 'no scheduled, approved article is due' });
});

/* ------------------------------------------------------- manual override */

test('a manual release ignores publishAt and the release hour, but never approval', () => {
  const early = new Date('2026-10-05T14:00:00Z'); // 07:00 PDT
  const ok = planRelease([scheduled('later', '2026-12-01')], early, { slug: 'later' });
  assert.equal(ok.action, 'release');
  assert.equal(ok.manual, true);
  assert.deepEqual(ok.slugs, ['later']);
  assert.equal(ok.day, '2026-10-05');

  const unapproved = planRelease([article('x', { status: 'review' })], early, { slug: 'x' });
  assert.equal(unapproved.action, 'error');
  assert.match(unapproved.reason, /not editorially approved/);

  const unrecorded = planRelease([scheduled('y', '2026-10-01', { reviewNotes: undefined })], early, { slug: 'y' });
  assert.equal(unrecorded.action, 'error');
  assert.match(unrecorded.reason, /review record incomplete/);
});

test('a manual release refuses an approved article that is not scheduled', () => {
  for (const status of ['draft', 'review']) {
    const plan = planRelease([article('x', { status, ...PERSON })], AFTER_HOURS, { slug: 'x' });
    assert.equal(plan.action, 'error', status);
    assert.match(plan.reason, /set "status": "scheduled"/);
  }
});

test('a manual release refuses a published article and an unknown slug', () => {
  assert.equal(planRelease([article('done', {})], AFTER_HOURS, { slug: 'done' }).action, 'error');
  assert.equal(planRelease([], AFTER_HOURS, { slug: 'missing' }).action, 'error');
});

test('a manual release is not limited by what already went out today', () => {
  const state = [article('released', { publishedAt: '2026-10-05', ...PERSON }), scheduled('next', '2026-10-01')];
  assert.equal(planRelease(state, AFTER_HOURS, { slug: 'next' }).action, 'release');
});

/* ------------------------------------------------------------ projection */

test('the projection puts every due article on today and future ones on their publishAt', () => {
  const projection = projectQueue(
    [
      article('today', { publishedAt: '2026-10-05', ...PERSON }),
      scheduled('b', '2026-10-01'),
      scheduled('a', '2026-10-01'),
      scheduled('c', '2026-10-20'),
    ],
    AFTER_HOURS
  );
  assert.deepEqual(
    projection.map((p) => [p.slug, p.projected]),
    [
      ['a', '2026-10-05'],
      ['b', '2026-10-05'],
      ['c', '2026-10-20'],
    ]
  );
});

/* ------------------------------------------------ the two implementations */

test('the scripts and the site agree on the gate date, the label date and the time zone', () => {
  const types = readFileSync(join(ROOT, 'src', 'lib', 'blog', 'types.ts'), 'utf8');
  assert.match(types, new RegExp(`APPROVAL_GATE_AFTER = '${APPROVAL_GATE_AFTER}'`));
  assert.match(types, new RegExp(`REVIEW_LABELS_INTRODUCED = '${REVIEW_LABELS_INTRODUCED}'`));
  assert.match(types, /PUBLICATION_TIME_ZONE = 'America\/Los_Angeles'/);
  assert.match(types, /export type EditorialReview = 'person' \| 'automated';/);
  assert.doesNotMatch(types, /DAILY_RELEASE_LIMIT/, 'the daily limit is gone from the site too');
  assert.match(types, new RegExp(`RSS_ITEM_LIMIT = ${FEED_ITEM_LIMIT};`), 'the feed length agrees');
  assert.ok(RELEASE_HOUR >= 0 && RELEASE_HOUR < 24);
});

test('no script in the repository writes a person\'s review record', () => {
  // The record is a statement by a person. A script that set it — even a
  // helpful one — would let the site claim a review nobody did.
  const scripts = ['publish-queue.mjs', 'publish-batch.mjs', 'post-publication-links.mjs', 'lib/release-checks.mjs', 'lib/linking.mjs', 'lib/content.mjs'];
  for (const file of scripts) {
    const text = readFileSync(join(ROOT, 'scripts', file), 'utf8');
    for (const field of ['editorialApproved', ...REVIEW_RECORD_FIELDS]) {
      assert.doesNotMatch(text, new RegExp(`setFrontmatterValue\\([^)]*['"]${field}['"]`), `${file} writes ${field}`);
    }
    assert.doesNotMatch(text, /setFrontmatterValue\([^)]*['"]editorialReview['"]/, `${file} writes editorialReview`);
  }
});

/* ------------------------------------------------------------- the feed */

test('the feed lists the newest FEED_ITEM_LIMIT public articles, newest first, then by slug', () => {
  const now = new Date('2026-10-02T20:00:00Z');
  const many = Array.from({ length: FEED_ITEM_LIMIT + 5 }, (_, i) =>
    article(`old-${String(i).padStart(3, '0')}`, { publishedAt: '2026-08-01' })
  );
  const fresh = [article('b-new', { publishedAt: '2026-10-02' }), article('a-new', { publishedAt: '2026-10-02' })];
  const hidden = [
    article('draft', { status: 'review', publishedAt: '2026-10-02' }),
    article('future', { publishedAt: '2026-10-03' }),
  ];
  const slugs = feedSlugs([...many, ...hidden, ...fresh], now);
  assert.equal(slugs.length, FEED_ITEM_LIMIT);
  assert.deepEqual(slugs.slice(0, 3), ['a-new', 'b-new', 'old-000']);
  assert.ok(!slugs.includes('draft') && !slugs.includes('future'), 'unpublished articles never reach the feed');
  assert.ok(!slugs.includes(`old-${String(FEED_ITEM_LIMIT + 4).padStart(3, '0')}`), 'the oldest fall out of the feed');
});
