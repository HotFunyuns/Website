// The Search Console importer end to end, on synthetic exports in a temporary
// folder. Every number here is invented test input; none describes the site.
//
// Run: npm test

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ROOT } from '../lib/content.mjs';

const SITE = 'https://reigncreativellc.com';
const PAGE = '/blog/mental-math-training-guide/';
const HEADER =
  'Top pages,Last 28 days Clicks,Previous 28 days Clicks,Last 28 days Impressions,Previous 28 days Impressions,Last 28 days CTR,Previous 28 days CTR,Last 28 days Position,Previous 28 days Position';
let dir;
let queue;
let report;

before(() => {
  dir = mkdtempSync(join(tmpdir(), 'reign-gsc-'));
  mkdirSync(join(dir, '28d'));
  mkdirSync(join(dir, '90d'));
  // The canonical row comes first and the http:// duplicate last — the order a
  // clicks-sorted export produces — so a path-keyed lookup would let the
  // duplicate win.
  writeFileSync(
    join(dir, '28d', 'Pages.csv'),
    [HEADER, `${SITE}${PAGE},12,20,900,850,1.3%,2.4%,11.5,10.9`, `http://reigncreativellc.com${PAGE},0,0,40,30,0%,0%,48,50`].join('\n')
  );
  writeFileSync(
    join(dir, '90d', 'Pages.csv'),
    [HEADER.replace(/28 days/g, '3 months'), `${SITE}${PAGE},40,55,2600,2400,1.5%,2.3%,11.2,10.4`, `http://reigncreativellc.com${PAGE},0,0,90,70,0%,0%,48,49`].join('\n')
  );
  const result = spawnSync(process.execPath, [join(ROOT, 'scripts', 'search-console-refresh.mjs'), '--dir', dir, '--out', join(dir, 'out')], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  queue = readFileSync(join(dir, 'out', 'refresh-queue.md'), 'utf8');
  report = readFileSync(join(dir, 'out', 'search-console-refresh-report.md'), 'utf8');
});

after(() => rmSync(dir, { recursive: true, force: true }));

test('a page in the 8–20 band with enough impressions is queued with its metrics', () => {
  assert.ok(queue.includes(`\`${PAGE}\``), queue);
  assert.match(queue, /\*\*28 days:\*\* 12 clicks, 900 impressions, CTR 1\.3%, average position 11\.5/);
  assert.match(queue, /clicks -40%/);
});

test('the 90-day line uses the canonical row, not the http:// duplicate', () => {
  assert.match(queue, /\*\*90 days:\*\* 40 clicks, 2,600 impressions, CTR 1\.5%, position 11\.2/);
  assert.doesNotMatch(queue, /\*\*90 days:\*\* 0 clicks/);
});

test('the http:// duplicate is reported as a URL variant, not queued as a page', () => {
  assert.match(report, /http:\/\/reigncreativellc\.com\/blog\/mental-math-training-guide\/ \(http\)/);
  assert.equal(queue.split(`### `).filter((block) => block.includes(PAGE)).length, 1);
});

test('reports built from real-looking data never land in docs/ without the flag', () => {
  const docs = readFileSync(join(ROOT, 'docs', 'refresh-queue.md'), 'utf8');
  assert.ok(!docs.includes('**28 days:** 12 clicks'));
});
