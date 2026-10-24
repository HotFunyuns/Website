// Publication rules for the scripts side: what counts as public, how an article
// must say it was checked, what the queue may release, and when.
//
// src/lib/blog/types.ts and src/lib/blog/index.ts implement the same rules for
// the site. The two are deliberately separate — scripts/validate-content.mjs
// uses this one to check what the site actually exported, so a bug in the
// site's filter cannot also silence the check that is supposed to catch it —
// and the build fails if they ever disagree about which articles are public.
//
// Every function here is pure: it takes the articles and the current instant as
// arguments. That is what lets scripts/tests/publishing.test.mjs pin down
// daylight-saving edges and reruns without waiting for a real day to pass.

/** All dates are calendar days in this zone. See src/lib/blog/types.ts. */
export const TIME_ZONE = 'America/Los_Angeles';

/**
 * The last day articles went out without saying how they were checked. Every
 * article published after it must carry `editorialReview` (see reviewProblems).
 * Must equal APPROVAL_GATE_AFTER in src/lib/blog/types.ts (a test enforces it).
 */
export const APPROVAL_GATE_AFTER = '2026-09-22';

/**
 * The first day an article could be published with a review label. Between the
 * gate and this day the release system required a person's approval and no
 * article was published — the editorial policy says so, and the build keeps it
 * true. Must equal REVIEW_LABELS_INTRODUCED in src/lib/blog/types.ts.
 */
export const REVIEW_LABELS_INTRODUCED = '2026-10-02';

/**
 * How an article published after the gate was checked before it went live:
 *
 *   person     a named person read the complete article and approved it. Needs
 *              `editorialApproved: true` and the review record below.
 *   automated  published after the automated checks and a logged AI editorial
 *              review only. No person has read it, and the article says so.
 */
export const REVIEW_KINDS = ['person', 'automated', 'organization'];

/** The review record a person fills in. Nothing in this repository writes it. */
export const REVIEW_RECORD_FIELDS = ['reviewerName', 'reviewDate', 'sourcesChecked', 'reviewNotes'];

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

/**
 * The RSS feed announces recent articles; the sitemap is the complete index.
 * Must equal RSS_ITEM_LIMIT in src/lib/blog/types.ts (a test enforces it).
 */
export const FEED_ITEM_LIMIT = 50;

/**
 * The articles the feed must list: the newest FEED_ITEM_LIMIT public ones, in
 * the site's own order (newest `publishedAt` first, then slug).
 */
export function feedSlugs(articles, now = new Date()) {
  return articles
    .filter((a) => isPublic(a.data, now))
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.slug.localeCompare(b.slug))
    .slice(0, FEED_ITEM_LIMIT)
    .map((a) => a.slug);
}

/** Published after the gate, i.e. required to say how it was checked. */
export function isQueueEra(data) {
  return data.status === 'published' && data.publishedAt > APPROVAL_GATE_AFTER;
}

/**
 * Everything wrong with how an article says it was checked; [] when the
 * contract holds. The rules, in the order they are reported:
 *
 *   - `editorialReview`, when present, is "person" or "automated";
 *   - a published article dated after the gate, and every scheduled one, must
 *     carry it — and none may be dated between the gate and the day labels
 *     were introduced, a period in which nothing was published;
 *   - `editorialApproved: true` is a person's approval, so it exists only with
 *     "person", and "person" needs it plus the full review record: a reviewer's
 *     name, a review date that is not in the future, the URLs of the sources
 *     they checked (each one of the article's own `sources`), and notes;
 *   - "automated" — and an article with no label — carries none of that record;
 *   - only an article a person approved can be scheduled.
 */
export function reviewProblems(data, now = new Date()) {
  const problems = [];
  const review = data.editorialReview;
  const today = laDay(now);

  if (review !== undefined && !REVIEW_KINDS.includes(review)) {
    problems.push(`"editorialReview" must be "person", "automated" or "organization", not ${JSON.stringify(review)}`);
  }
  const postGate = data.status === 'published' && isIsoDay(data.publishedAt) && data.publishedAt > APPROVAL_GATE_AFTER;
  if ((postGate || data.status === 'scheduled') && review === undefined) {
    problems.push(
      'must say how it was checked: "editorialReview": "person" (a named person approved it) or "automated" (automated checks and an AI editorial review only)'
    );
  }
  if (postGate && data.publishedAt < REVIEW_LABELS_INTRODUCED) {
    problems.push(
      `published ${data.publishedAt}, between ${APPROVAL_GATE_AFTER} and ${REVIEW_LABELS_INTRODUCED}, when nothing was published — the editorial policy says so`
    );
  }

  if (review === 'person') {
    if (data.editorialApproved !== true) problems.push('"editorialReview": "person" needs "editorialApproved": true');
    if (typeof data.reviewerName !== 'string' || !data.reviewerName.trim()) {
      problems.push('"editorialReview": "person" needs "reviewerName" — the person who read and approved it');
    }
    if (!isIsoDay(data.reviewDate)) problems.push('"editorialReview": "person" needs "reviewDate" (YYYY-MM-DD)');
    else if (data.reviewDate > today) problems.push(`"reviewDate" ${data.reviewDate} is in the future`);
    const sourceUrls = new Set((Array.isArray(data.sources) ? data.sources : []).map((source) => source?.url));
    if (!Array.isArray(data.sourcesChecked) || data.sourcesChecked.length === 0) {
      problems.push('"editorialReview": "person" needs "sourcesChecked" — the URLs of the sources the reviewer opened');
    } else {
      for (const url of data.sourcesChecked) {
        if (typeof url !== 'string' || !sourceUrls.has(url)) {
          problems.push(`"sourcesChecked" lists ${JSON.stringify(url)}, which is not the url of one of this article's sources`);
        }
      }
    }
    if (typeof data.reviewNotes !== 'string' || !data.reviewNotes.trim()) {
      problems.push('"editorialReview": "person" needs "reviewNotes" — what the reviewer checked or changed');
    }
  } else {
    if (data.editorialApproved === true) {
      problems.push(
        `"editorialApproved": true is a person's approval — it needs "editorialReview": "person" and the review record (${REVIEW_RECORD_FIELDS.join(', ')})`
      );
    }
    for (const field of REVIEW_RECORD_FIELDS) {
      if (data[field] !== undefined) {
        problems.push(`"${field}" belongs to a person's review record and is only valid with "editorialReview": "person"`);
      }
    }
  }

  // A company attestation (src/data/review-attestations.ts) covers articles
  // already published; it is never a route to publication, so a new article
  // cannot be released under it.
  if (review === 'organization') {
    if (typeof data.reviewAttestation !== 'string' || !data.reviewAttestation.trim()) {
      problems.push('"editorialReview": "organization" needs "reviewAttestation" naming a company attestation');
    }
    if (data.status !== 'published') {
      problems.push('"editorialReview": "organization" covers published articles only; a new article needs "automated" or "person"');
    }
  } else if (data.reviewAttestation !== undefined) {
    problems.push('"reviewAttestation" is only valid with "editorialReview": "organization"');
  }

  if (data.status === 'scheduled' && review !== 'person') {
    problems.push(
      'only an article a person has approved ("editorialReview": "person") can be scheduled — an automated-label article is published directly with scripts/publish-batch.mjs'
    );
  }
  return problems;
}

/** Why a scheduled article cannot be released, or null if it can. */
export function blockedReason(data, now = new Date()) {
  if (data.status !== 'scheduled') return `status is "${data.status}", not "scheduled"`;
  if (data.editorialApproved !== true) return 'not editorially approved';
  const problems = reviewProblems(data, now);
  if (problems.length) return `review record incomplete: ${problems.join('; ')}`;
  if (!isIsoDay(data.publishAt)) return 'no valid "publishAt" date';
  return null;
}

/**
 * Scheduled, approved articles whose `publishAt` has arrived, in release
 * order: earliest `publishAt` first, then slug, so every run on the same input
 * picks the same articles in the same order.
 */
export function eligibleScheduled(articles, day, now = new Date()) {
  return articles
    .filter((a) => blockedReason(a.data, now) === null && a.data.publishAt <= day)
    .sort((a, b) => a.data.publishAt.localeCompare(b.data.publishAt) || a.slug.localeCompare(b.slug));
}

/**
 * Decides what a release run should do. Pure — nothing is written here.
 *
 * Returns { action: 'release', slugs, day, manual } or
 * { action: 'noop', reason } or { action: 'error', reason }.
 *
 * There is no daily limit. Every scheduled, approved article whose `publishAt`
 * has arrived goes out in the same run: an article that has passed every check
 * is not held back to fit a release schedule. Reruns are still safe, because a
 * released article is no longer `scheduled` — a second run finds nothing due.
 */
export function planRelease(articles, now = new Date(), options = {}) {
  const { slug, ignoreReleaseHour = false } = options;
  const { day, hour } = zonedNow(now);

  if (slug) {
    const target = articles.find((a) => a.slug === slug);
    if (!target) return { action: 'error', reason: `no article "${slug}" in content/blog` };
    if (target.data.status === 'published') {
      return { action: 'error', reason: `"${slug}" is already published (${target.data.publishedAt})` };
    }
    if (target.data.editorialApproved !== true) {
      return {
        action: 'error',
        reason: `"${slug}" is not editorially approved — the queue releases only articles a named person has approved; an automated-label article is published with scripts/publish-batch.mjs`,
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
    const blocked = blockedReason(target.data, now);
    if (blocked) return { action: 'error', reason: `"${slug}": ${blocked}` };
    return { action: 'release', slugs: [slug], day, manual: true };
  }

  if (!ignoreReleaseHour && hour < RELEASE_HOUR) {
    return { action: 'noop', reason: `before release time (${String(hour).padStart(2, '0')}:00 < ${RELEASE_HOUR}:00 ${TIME_ZONE})` };
  }
  const due = eligibleScheduled(articles, day, now);
  if (due.length === 0) return { action: 'noop', reason: 'no scheduled, approved article is due' };
  return { action: 'release', slugs: due.map((a) => a.slug), day, manual: false };
}

/**
 * The day each scheduled, approved article would go out if nothing else
 * changes: today if its `publishAt` has arrived, otherwise its `publishAt`.
 * There is no daily limit, so nothing waits behind anything else. A
 * projection, not a promise — an edit or a failed build moves it.
 */
export function projectQueue(articles, now = new Date()) {
  const today = laDay(now);
  return articles
    .filter((a) => blockedReason(a.data, now) === null)
    .sort((a, b) => a.data.publishAt.localeCompare(b.data.publishAt) || a.slug.localeCompare(b.slug))
    .map((article) => ({
      slug: article.slug,
      publishAt: article.data.publishAt,
      projected: article.data.publishAt > today ? article.data.publishAt : today,
    }));
}

/** Adds whole calendar days to an ISO day. Calendar arithmetic, no time zone. */
export function addDays(day, n) {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + n);
  return date.toISOString().slice(0, 10);
}
