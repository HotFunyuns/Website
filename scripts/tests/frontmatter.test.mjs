// Frontmatter edits change one key's text and nothing else — including in the
// inline-array and CRLF files that a whole-block re-serialisation would reformat.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { deleteFrontmatterKey, extractLinks, parseArticle, setFrontmatterValue, writeArticle } from '../lib/content.mjs';

const MULTILINE = `---
{
  "title": "A title",
  "status": "draft",
  "tags": [
    "one",
    "two"
  ],
  "relatedApps": [
    "app-a"
  ],
  "relatedArticles": [
    "first"
  ],
  "noindex": true
}
---

Body with a [link](/blog/first/) and ![an image](/x.png).
`;

const INLINE = `---
{
  "title": "Inline",
  "tags": ["one", "two"],
  "relatedApps": ["app-a"],
  "relatedArticles": ["first", "second"],
  "last": "value"
}
---
Body.
`;

const diffLines = (a, b) => {
  const x = a.split('\n');
  const y = b.split('\n');
  return y.filter((line, i) => line !== x[i]);
};

test('replacing a multi-line array keeps the multi-line style and touches only that key', () => {
  const next = setFrontmatterValue(MULTILINE, 'relatedArticles', ['first', 'added']);
  assert.deepEqual(parseArticle('a.md', next).data.relatedArticles, ['first', 'added']);
  assert.ok(next.includes('  "relatedArticles": [\n    "first",\n    "added"\n  ],'));
  assert.equal(next.replace(/"relatedArticles": \[[\s\S]*?\]/, ''), MULTILINE.replace(/"relatedArticles": \[[\s\S]*?\]/, ''));
});

test('replacing an inline array keeps it inline', () => {
  const next = setFrontmatterValue(INLINE, 'relatedArticles', ['first', 'second', 'third']);
  assert.ok(next.includes('"relatedArticles": ["first", "second", "third"],'));
  assert.deepEqual(diffLines(INLINE, next), ['  "relatedArticles": ["first", "second", "third"],']);
});

test('scalars are replaced in place', () => {
  const next = setFrontmatterValue(MULTILINE, 'status', 'published');
  assert.deepEqual(diffLines(MULTILINE, next), ['  "status": "published",']);
});

test('a new key is inserted after its anchor, with commas kept valid', () => {
  const next = setFrontmatterValue(MULTILINE, 'editorialApproved', true, { after: 'status' });
  assert.equal(parseArticle('a.md', next).data.editorialApproved, true);
  assert.ok(next.includes('  "status": "draft",\n  "editorialApproved": true,\n  "tags"'));
});

test('a new key after the last key moves the comma correctly', () => {
  const next = setFrontmatterValue(INLINE, 'sameDayOverride', true, { after: 'last' });
  assert.ok(next.includes('  "last": "value",\n  "sameDayOverride": true\n}'));
  assert.equal(parseArticle('a.md', next).data.sameDayOverride, true);
});

test('deleting a key removes its lines, in the middle or at the end', () => {
  const middle = deleteFrontmatterKey(INLINE, 'tags');
  assert.equal(parseArticle('a.md', middle).data.tags, undefined);
  assert.equal(middle.split('\n').length, INLINE.split('\n').length - 1);

  const last = deleteFrontmatterKey(MULTILINE, 'noindex');
  assert.equal(parseArticle('a.md', last).data.noindex, undefined);
  assert.ok(last.includes('  "relatedArticles": [\n    "first"\n  ]\n}'));

  assert.equal(deleteFrontmatterKey(INLINE, 'absent'), INLINE);
});

test('the body is never altered by a frontmatter edit', () => {
  const next = setFrontmatterValue(MULTILINE, 'status', 'published');
  assert.equal(parseArticle('a.md', next).body, parseArticle('a.md', MULTILINE).body);
});

test('CRLF files are written back with CRLF', () => {
  const dir = mkdtempSync(join(tmpdir(), 'reign-fm-'));
  try {
    const file = join(dir, 'crlf.md');
    const crlf = MULTILINE.replace(/\n/g, '\r\n');
    writeFileSync(file, crlf);
    const article = parseArticle(file, crlf);
    writeArticle(article, setFrontmatterValue(article.raw, 'status', 'published'));
    const written = readFileSync(file, 'utf8');
    assert.ok(!/[^\r]\n/.test(written), 'every newline is CRLF');
    assert.equal(parseArticle(file, written).data.status, 'published');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('extractLinks skips images and keeps offsets', () => {
  const body = 'See [one](/blog/one/) and ![img](/i.png) and [two](https://example.com/).';
  const links = extractLinks(body);
  assert.deepEqual(links.map((l) => l.href), ['/blog/one/', 'https://example.com/']);
  assert.equal(body.slice(links[0].index, links[0].index + links[0].length), '[one](/blog/one/)');
});
