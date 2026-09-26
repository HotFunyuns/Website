// Release rules: the Los Angeles calendar, the approval gate, the daily limit,
// and the rerun guarantee. Every case passes an explicit instant, so daylight
// saving and midnight edges are tested on any day the suite runs.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../lib/content.mjs';
import {
  APPROVAL_GATE_AFTER,
  DAILY_LIMIT,
  RELEASE_HOUR,
  addDays,
  isPublic,
  laDay,
  planRelease,
  projectQueue,
  zonedNow,
} from '../lib/publishing.mjs';

const article = (slug, data) => ({ slug, data: { status: 'published', publishedAt: '2026-08-09', ...data } });
const scheduled = (slug, publishAt, extra = {}) =>
  article(slug, { status: 'scheduled', editorialApproved: true, publishAt, publishedAt: publishAt, ...extra });

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

/* ------------------------------------------------------- release planning */

const AFTER_HOURS = new Date('2026-10-05T18:00:00Z'); // 11:00 PDT on 2026-10-05

test('releases the earliest due, approved, scheduled article', () => {
  const plan = planRelease(
    [scheduled('b-second', '2026-10-03'), scheduled('a-first', '2026-10-01'), scheduled('c-later', '2026-10-09')],
    AFTER_HOURS
  );
  assert.equal(plan.action, 'release');
  assert.equal(plan.slug, 'a-first');
  assert.equal(plan.day, '2026-10-05');
  assert.equal(plan.sameDayOverride, false);
});

test('ties on publishAt are broken by slug, so every run picks the same article', () => {
  const plan = planRelease([scheduled('zebra', '2026-10-01'), scheduled('apple', '2026-10-01')], AFTER_HOURS);
  assert.equal(plan.slug, 'apple');
});

test('a file existing is not enough: unapproved, draft and review articles are never released', () => {
  const plan = planRelease(
    [
      scheduled('unapproved', '2026-10-01', { editorialApproved: false }),
      article('draft', { status: 'draft', editorialApproved: true, publishAt: '2026-10-01' }),
      article('review', { status: 'review', editorialApproved: true, publishAt: '2026-10-01' }),
    ],
    AFTER_HOURS
  );
  assert.equal(plan.action, 'noop');
});

test('nothing is released before its publishAt', () => {
  assert.equal(planRelease([scheduled('future', '2026-10-06')], AFTER_HOURS).action, 'noop');
});

test('nothing is released before the release hour', () => {
  const plan = planRelease([scheduled('due', '2026-10-01')], new Date('2026-10-05T15:00:00Z'));
  assert.equal(plan.action, 'noop');
  assert.match(plan.reason, /before release time/);
});

test('a rerun on the same day does nothing — the first release is visible to it', () => {
  const afterFirstRun = [
    article('released', { publishedAt: '2026-10-05', editorialApproved: true, publishAt: '2026-10-01' }),
    scheduled('next', '2026-10-01'),
  ];
  const plan = planRelease(afterFirstRun, AFTER_HOURS);
  assert.equal(plan.action, 'noop');
  assert.match(plan.reason, /already released today: released/);
});

test('the next day, the queue moves on', () => {
  const plan = planRelease(
    [article('released', { publishedAt: '2026-10-05', editorialApproved: true }), scheduled('next', '2026-10-01')],
    new Date('2026-10-06T18:00:00Z')
  );
  assert.equal(plan.slug, 'next');
  assert.equal(plan.day, '2026-10-06');
});

test('articles from before the approval gate do not count against the daily limit', () => {
  const legacy = article('legacy', { publishedAt: APPROVAL_GATE_AFTER });
  assert.equal(planRelease([legacy, scheduled('due', '2026-09-20')], new Date('2026-09-22T18:00:00Z')).action, 'release');
});

test('a second release in one day needs the explicit override, and records it', () => {
  const state = [article('released', { publishedAt: '2026-10-05', editorialApproved: true }), scheduled('next', '2026-10-01')];
  const plan = planRelease(state, AFTER_HOURS, { allowSecondToday: true });
  assert.equal(plan.action, 'release');
  assert.equal(plan.sameDayOverride, true);
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
  assert.equal(ok.day, '2026-10-05');

  const unapproved = planRelease([article('x', { status: 'review' })], early, { slug: 'x' });
  assert.equal(unapproved.action, 'error');
  assert.match(unapproved.reason, /not editorially approved/);
});

test('a manual release refuses an approved article that is not scheduled', () => {
  for (const status of ['draft', 'review']) {
    const plan = planRelease([article('x', { status, editorialApproved: true })], AFTER_HOURS, { slug: 'x' });
    assert.equal(plan.action, 'error', status);
    assert.match(plan.reason, /set "status": "scheduled"/);
  }
});

test('a manual release refuses a published article and an unknown slug', () => {
  assert.equal(planRelease([article('done', {})], AFTER_HOURS, { slug: 'done' }).action, 'error');
  assert.equal(planRelease([], AFTER_HOURS, { slug: 'missing' }).action, 'error');
});

test('a manual release still respects the daily limit unless overridden', () => {
  const state = [article('released', { publishedAt: '2026-10-05', editorialApproved: true }), scheduled('next', '2026-10-01')];
  assert.equal(planRelease(state, AFTER_HOURS, { slug: 'next' }).action, 'error');
  assert.equal(planRelease(state, AFTER_HOURS, { slug: 'next', allowSecondToday: true }).sameDayOverride, true);
});

/* ------------------------------------------------------------ projection */

test('the projection releases one per day, never before publishAt, skipping taken days', () => {
  const projection = projectQueue(
    [
      article('today', { publishedAt: '2026-10-05', editorialApproved: true }),
      scheduled('b', '2026-10-01'),
      scheduled('a', '2026-10-01'),
      scheduled('c', '2026-10-20'),
    ],
    AFTER_HOURS
  );
  assert.deepEqual(
    projection.map((p) => [p.slug, p.projected]),
    [
      ['a', '2026-10-06'],
      ['b', '2026-10-07'],
      ['c', '2026-10-20'],
    ]
  );
});

/* ------------------------------------------------ the two implementations */

test('the scripts and the site agree on the gate date and the daily limit', () => {
  const types = readFileSync(join(ROOT, 'src', 'lib', 'blog', 'types.ts'), 'utf8');
  assert.match(types, new RegExp(`APPROVAL_GATE_AFTER = '${APPROVAL_GATE_AFTER}'`));
  assert.match(types, new RegExp(`DAILY_RELEASE_LIMIT = ${DAILY_LIMIT};`));
  assert.match(types, /PUBLICATION_TIME_ZONE = 'America\/Los_Angeles'/);
  assert.ok(RELEASE_HOUR >= 0 && RELEASE_HOUR < 24);
});
