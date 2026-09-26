// End-to-end rehearsal of `npm run queue:release`, run as a child process
// against a temporary copy of the real articles (REIGN_CONTENT_DIR). No new
// article is written: existing ones are re-labelled as queued inside the copy,
// and the copy is deleted afterwards. The real content/blog is never touched.
//
// Run: npm test

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { CONTENT_DIR, ROOT, parseArticle, setFrontmatterValue } from '../lib/content.mjs';
import { APPROVAL_GATE_AFTER, laDay } from '../lib/publishing.mjs';

const QUEUE = join(ROOT, 'scripts', 'publish-queue.mjs');
let dir;
/** [first due, second due, unapproved] — chosen in before(), from the copy. */
let picks;
/** The real files behind the picks, as they were before the suite ran. */
const realBefore = new Map();

function run(args, extraEnv = {}) {
  return spawnSync(process.execPath, [QUEUE, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, REIGN_CONTENT_DIR: dir, ...extraEnv },
  });
}
const read = (slug) => parseArticle(join(dir, `${slug}.md`), readFileSync(join(dir, `${slug}.md`), 'utf8'));
function edit(slug, changes) {
  let raw = readFileSync(join(dir, `${slug}.md`), 'utf8');
  for (const [key, value] of Object.entries(changes)) raw = setFrontmatterValue(raw, key, value, { after: 'status' });
  writeFileSync(join(dir, `${slug}.md`), raw);
}
const snapshot = () => readdirSync(dir).map((f) => `${f}:${readFileSync(join(dir, f), 'utf8').length}:${readFileSync(join(dir, f), 'utf8')}`).join('\n');
const inboundTo = (slug) =>
  readdirSync(dir).filter((f) => {
    if (f === `${slug}.md`) return false;
    const a = parseArticle(join(dir, f), readFileSync(join(dir, f), 'utf8'));
    return a.data.relatedArticles.includes(slug) || a.body.includes(`](/blog/${slug}/)`);
  }).length;

before(() => {
  dir = mkdtempSync(join(tmpdir(), 'reign-release-'));
  cpSync(CONTENT_DIR, dir, { recursive: true });
  const today = laDay();

  // Make the copy independent of the real queue. This suite also runs inside
  // the release workflow, right after a real article has been released with
  // today's date — and whenever a real scheduled article happens to be due. In
  // the copy, nothing is queued and nothing was released today, whatever the
  // real content says.
  for (const name of readdirSync(dir)) {
    const slug = name.replace(/\.md$/, '');
    const { data } = read(slug);
    if (data.status !== 'published') edit(slug, { status: 'draft', editorialApproved: false });
    else if (data.publishedAt > APPROVAL_GATE_AFTER) {
      edit(slug, { publishedAt: APPROVAL_GATE_AFTER, updatedAt: APPROVAL_GATE_AFTER });
    }
  }

  // Prefer articles known to pass every check; fall back to the first published
  // slugs, so renaming one of these never blocks a release.
  const preferred = ['shonen-vs-seinen', 'what-does-td-mean-in-games', 'glycemic-index-and-load'];
  const available = readdirSync(dir)
    .map((name) => name.replace(/\.md$/, ''))
    .filter((slug) => read(slug).data.status === 'published');
  picks = [...preferred.filter((slug) => available.includes(slug)), ...available.filter((slug) => !preferred.includes(slug))].slice(0, 3);
  const [first, second] = [picks[0], picks[1]].sort();
  picks = [first, second, picks[2]];
  for (const slug of picks) realBefore.set(slug, readFileSync(join(CONTENT_DIR, `${slug}.md`), 'utf8'));

  // Queue two articles, due today. publishedAt on a scheduled article is only
  // a plan; the release must overwrite it with the real day.
  edit(second, { status: 'scheduled', editorialApproved: true, publishAt: today, publishedAt: '2026-01-01' });
  edit(first, { status: 'scheduled', editorialApproved: true, publishAt: today });
  // And one that nobody approved.
  edit(picks[2], { status: 'review', editorialApproved: false });
});

after(() => rmSync(dir, { recursive: true, force: true }));

test('check decides without writing, and reports to GITHUB_OUTPUT', () => {
  const out = join(dir, '..', `gh-output-${process.pid}`);
  writeFileSync(out, '');
  const before = snapshot();
  const result = run(['check', '--ignore-release-hour', '--ci'], { GITHUB_OUTPUT: out });
  assert.equal(result.status, 0, result.stderr);
  assert.ok(readFileSync(out, 'utf8').includes(`eligible=true\nslug=${picks[0]}\n`), readFileSync(out, 'utf8'));
  assert.equal(snapshot(), before);
  rmSync(out, { force: true });
});

test('release publishes the first due article with today as its date and links it in', () => {
  const result = run(['release', '--ignore-release-hour', '--expect', picks[0]]);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const released = read(picks[0]).data;
  assert.equal(released.status, 'published');
  assert.equal(released.publishedAt, laDay());
  assert.equal(released.updatedAt, laDay());
  assert.equal(released.editorialApproved, true);
  assert.equal(released.publishAt, laDay(), 'the plan is kept as a record');
  assert.equal(released.noindex, undefined);
  assert.equal(released.sameDayOverride, undefined);
  assert.ok(inboundTo(picks[0]) >= 2, 'older articles link back after the pass');
});

test('a rerun the same day changes nothing', () => {
  const before = snapshot();
  const result = run(['release', '--ignore-release-hour']);
  assert.equal(result.status, 0);
  assert.ok(result.stdout.includes(`already released today: ${picks[0]}`), result.stdout);
  assert.equal(snapshot(), before);
});

test('--expect refuses when the plan no longer matches', () => {
  const before = snapshot();
  const result = run(['release', '--ignore-release-hour', '--allow-second-today', '--expect', 'something-else']);
  assert.equal(result.status, 1);
  assert.equal(snapshot(), before);
});

test('a second article today needs the override, and the override is recorded', () => {
  const result = run(['release', '--ignore-release-hour', '--allow-second-today']);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const second = read(picks[1]).data;
  assert.equal(second.publishedAt, laDay(), 'the planned 2026-01-01 was not used — never backdated');
  assert.equal(second.sameDayOverride, true);
});

test('an unapproved article cannot be released, even by hand', () => {
  const before = snapshot();
  const result = run(['release', '--slug', picks[2], '--allow-second-today']);
  assert.equal(result.status, 1);
  assert.match(result.stderr + result.stdout, /not editorially approved/);
  assert.equal(snapshot(), before);
});

test('an approved article that is not scheduled cannot be released by hand either', () => {
  edit(picks[2], { editorialApproved: true });
  const before = snapshot();
  const result = run(['release', '--slug', picks[2], '--allow-second-today']);
  assert.equal(result.status, 1);
  assert.match(result.stderr + result.stdout, /set "status": "scheduled"/);
  assert.equal(snapshot(), before);
});

test('with nothing due, release is a safe no-op', () => {
  const before = snapshot();
  const result = run(['release', '--ignore-release-hour', '--allow-second-today']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /no scheduled, approved article is due/);
  assert.equal(snapshot(), before);
});

test('the real content directory was never touched', () => {
  for (const slug of picks) {
    assert.equal(readFileSync(join(CONTENT_DIR, `${slug}.md`), 'utf8'), realBefore.get(slug), slug);
  }
});
