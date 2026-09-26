// Publication rules for the scripts side: what counts as public, what the queue
// may release, and when.
//
// src/lib/blog/types.ts implements the same public/private rule for the site.
// The two are deliberately separate — scripts/validate-content.mjs uses this one
// to check what the site actually exported, so a bug in the site's filter
// cannot also silence the check that is supposed to catch it — and the build
// fails if they ever disagree about which articles are public.
//
// Every function here is pure: it takes the articles and the current instant as
// arguments. That is what lets scripts/tests/publishing.test.mjs pin down
// daylight-saving edges and reruns without waiting for a real day to pass.

/** All dates are calendar days in this zone. See src/lib/blog/types.ts. */
export const TIME_ZONE = 'America/Los_Angeles';

/**
 * The last day articles went out without the editorial-approval gate. Articles
 * published after it must carry `editorialApproved: true`. Must equal
 * APPROVAL_GATE_AFTER in src/lib/blog/types.ts (a test enforces it).
 */
export const APPROVAL_GATE_AFTER = '2026-09-22';

/** At most this many articles released per Los Angeles day, unless overridden. */
export const DAILY_LIMIT = 1;

/**
 * The scheduled job checks every hour; it releases only from this hour
 * onward (America/Los_Angeles). 09:00 puts a release early in the working day
 * in Pacific time, when someone is around to notice a failed deploy.
 */
export const RELEASE_HOUR = 9;

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Calendar day, hour and minute in Los Angeles for an instant. */
export function zonedNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const part = (type) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    day: `${part('year')}-${part('month')}-${part('day')}`,
    hour: Number(part('hour')),
    minute: Number(part('minute')),
  };
}

/** The Los Angeles calendar day (YYYY-MM-DD) containing `now`. */
export function laDay(now = new Date()) {
  return zonedNow(now).day;
}

export function isIsoDay(value) {
  return typeof value === 'string' && ISO_DAY.test(value);
}

/** Public: `published`, and dated on or before today in Los Angeles. */
export function isPublic(data, now = new Date()) {
  return data.status === 'published' && isIsoDay(data.publishedAt) && data.publishedAt <= laDay(now);
}

/** Released through the queue era, i.e. subject to the approval gate. */
export function isQueueEra(data) {
  return data.status === 'published' && data.publishedAt > APPROVAL_GATE_AFTER;
}

/** Articles the queue-era rules count as released on `day`. */
export function releasedOn(articles, day) {
  return articles.filter((a) => isQueueEra(a.data) && a.data.publishedAt === day);
}

/** Why a scheduled article cannot be released, or null if it can. */
export function blockedReason(data) {
  if (data.status !== 'scheduled') return `status is "${data.status}", not "scheduled"`;
  if (data.editorialApproved !== true) return 'not editorially approved';
  if (!isIsoDay(data.publishAt)) return 'no valid "publishAt" date';
  return null;
}

/**
 * Scheduled, approved articles whose `publishAt` has arrived, in release
 * order: earliest `publishAt` first, then slug, so every run on the same input
 * picks the same article.
 */
export function eligibleScheduled(articles, day) {
  return articles
    .filter((a) => blockedReason(a.data) === null && a.data.publishAt <= day)
    .sort((a, b) => a.data.publishAt.localeCompare(b.data.publishAt) || a.slug.localeCompare(b.slug));
}

/**
 * Decides what a release run should do. Pure — nothing is written here.
 *
 * Returns { action: 'release', slug, day, sameDayOverride, manual } or
 * { action: 'noop', reason } or { action: 'error', reason }.
 *
 * The rerun guarantee lives here: a second run on the same Los Angeles day sees
 * the article the first run released (its `publishedAt` is today) and stops,
 * whether the first run happened an hour ago or a minute ago.
 */
export function planRelease(articles, now = new Date(), options = {}) {
  const { slug, allowSecondToday = false, ignoreReleaseHour = false } = options;
  const { day, hour } = zonedNow(now);
  const already = releasedOn(articles, day);
  const overLimit = already.length >= DAILY_LIMIT;

  if (slug) {
    const target = articles.find((a) => a.slug === slug);
    if (!target) return { action: 'error', reason: `no article "${slug}" in content/blog` };
    if (target.data.status === 'published') {
      return { action: 'error', reason: `"${slug}" is already published (${target.data.publishedAt})` };
    }
    if (target.data.editorialApproved !== true) {
      return {
        action: 'error',
        reason: `"${slug}" is not editorially approved — set "editorialApproved": true only after a person has read it in full`,
      };
    }
    // Scheduling is the deliberate "this may go out" step. A manual release
    // skips the wait for publishAt, not that step — so setting an article back
    // to draft or review cancels it for the owner's hand as well as the job's.
    if (target.data.status !== 'scheduled') {
      return {
        action: 'error',
        reason: `"${slug}" is "${target.data.status}" — set "status": "scheduled" (with a publishAt) before releasing it, even by hand`,
      };
    }
    if (overLimit && !allowSecondToday) {
      return {
        action: 'error',
        reason: `already released today (${already.map((a) => a.slug).join(', ')}); pass --allow-second-today to override deliberately`,
      };
    }
    return { action: 'release', slug, day, sameDayOverride: overLimit, manual: true };
  }

  if (!ignoreReleaseHour && hour < RELEASE_HOUR) {
    return { action: 'noop', reason: `before release time (${String(hour).padStart(2, '0')}:00 < ${RELEASE_HOUR}:00 ${TIME_ZONE})` };
  }
  if (overLimit && !allowSecondToday) {
    return { action: 'noop', reason: `already released today: ${already.map((a) => a.slug).join(', ')}` };
  }
  const next = eligibleScheduled(articles, day)[0];
  if (!next) return { action: 'noop', reason: 'no scheduled, approved article is due' };
  return { action: 'release', slug: next.slug, day, sameDayOverride: overLimit, manual: false };
}

/**
 * The day each scheduled article would go out if nothing else changes: one per
 * day in `eligibleScheduled` order, never before its `publishAt`, never on a day
 * that already has a release. A projection, not a promise — an approval, an
 * edit or a failed build moves it.
 */
export function projectQueue(articles, now = new Date()) {
  const today = laDay(now);
  const taken = new Map();
  for (const a of articles) {
    if (isQueueEra(a.data)) taken.set(a.data.publishedAt, (taken.get(a.data.publishedAt) ?? 0) + 1);
  }
  const queue = articles
    .filter((a) => blockedReason(a.data) === null)
    .sort((a, b) => a.data.publishAt.localeCompare(b.data.publishAt) || a.slug.localeCompare(b.slug));

  const projection = [];
  // Today stays available until something is released today, whatever the
  // hour: before RELEASE_HOUR the job is still coming, after it the next hourly
  // run picks the article up.
  let cursor = today;
  for (const article of queue) {
    let day = article.data.publishAt > cursor ? article.data.publishAt : cursor;
    while ((taken.get(day) ?? 0) >= DAILY_LIMIT) day = addDays(day, 1);
    taken.set(day, (taken.get(day) ?? 0) + 1);
    projection.push({ slug: article.slug, publishAt: article.data.publishAt, projected: day });
    cursor = day;
  }
  return projection;
}

/** Adds whole calendar days to an ISO day. Calendar arithmetic, no time zone. */
export function addDays(day, n) {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + n);
  return date.toISOString().slice(0, 10);
}
