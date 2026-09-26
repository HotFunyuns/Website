// Parsing Search Console exports. Every figure below is synthetic test input
// that exists only in this file; none describes the real site.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ctrByPositionBucket,
  parseCsv,
  parseMetric,
  readIndexingTable,
  readPageQueryTable,
  readPerformanceTable,
  relativeChange,
} from '../lib/search-console.mjs';

test('CSV: BOM, quoted commas, doubled quotes and CRLF', () => {
  const rows = parseCsv('﻿Top queries,Clicks\r\n"a, ""quoted"" query",3\r\nplain,4\r\n');
  assert.deepEqual(rows, [
    ['Top queries', 'Clicks'],
    ['a, "quoted" query', '3'],
    ['plain', '4'],
  ]);
});

test('metrics: percentages, thousands separators and blanks', () => {
  assert.equal(parseMetric('ctr', '3.5%'), 0.035);
  assert.equal(parseMetric('clicks', '1,234'), 1234);
  assert.equal(parseMetric('position', '12.25'), 12.25);
  assert.equal(parseMetric('impressions', ''), null);
});

test('a single-period Pages export', () => {
  const t = readPerformanceTable('Top pages,Clicks,Impressions,CTR,Position\nhttps://reigncreativellc.com/blog/a/,5,200,2.5%,11.2\n');
  assert.equal(t.key, 'Top pages');
  assert.equal(t.periods.length, 1);
  assert.deepEqual(t.rows[0].current, { clicks: 5, impressions: 200, ctr: 0.025, position: 11.2 });
  assert.equal(t.rows[0].previous, null);
});

test('a compare-mode export labelled "Last / Previous"', () => {
  const csv = [
    'Top pages,Last 28 days Clicks,Previous 28 days Clicks,Last 28 days Impressions,Previous 28 days Impressions,Last 28 days CTR,Previous 28 days CTR,Last 28 days Position,Previous 28 days Position',
    'https://reigncreativellc.com/blog/a/,6,10,300,280,2%,3.57%,12.1,9.8',
  ].join('\n');
  const t = readPerformanceTable(csv);
  assert.deepEqual(
    t.periods.map((p) => [p.label, p.role]),
    [
      ['Last 28 days', 'current'],
      ['Previous 28 days', 'previous'],
    ]
  );
  assert.equal(t.rows[0].current.clicks, 6);
  assert.equal(t.rows[0].previous.clicks, 10);
  assert.equal(t.rows[0].previous.position, 9.8);
});

test('a compare-mode export labelled with date ranges picks the later range as current', () => {
  const csv = [
    'Top queries,8/1/26 - 8/28/26 Clicks,8/29/26 - 9/25/26 Clicks,8/1/26 - 8/28/26 Impressions,8/29/26 - 9/25/26 Impressions',
    'some query,4,9,100,150',
  ].join('\n');
  const t = readPerformanceTable(csv);
  assert.equal(t.periods[0].label, '8/29/26 - 9/25/26');
  assert.equal(t.rows[0].current.clicks, 9);
  assert.equal(t.rows[0].previous.clicks, 4);
});

test('an unrecognisable file is rejected rather than half-read', () => {
  assert.throws(() => readPerformanceTable('Just,Some,Columns\n1,2,3\n'), /no Clicks/);
});

test('page + query rows and indexing exports', () => {
  const pq = readPageQueryTable('Landing Page,Query,Url Clicks,Impressions,Site CTR,Average Position\nhttps://x/blog/a/,q one,2,40,5%,8\n');
  assert.deepEqual(pq[0], { page: 'https://x/blog/a/', query: 'q one', clicks: 2, impressions: 40, ctr: 0.05, position: 8 });
  const idx = readIndexingTable('URL,Last crawled\nhttps://x/blog/b/,Sep 20, 2026\n', 'Crawled - currently not indexed');
  assert.equal(idx[0].reason, 'Crawled - currently not indexed');
});

test('relative change refuses a base too small to mean anything', () => {
  assert.equal(relativeChange(5, 10), -0.5);
  assert.equal(relativeChange(5, 2, 10), null);
  assert.equal(relativeChange(null, 10), null);
});

test('the CTR yardstick is the site\'s own median per position, and needs three pages to exist', () => {
  const row = (ctr, position, impressions = 500) => ({ current: { ctr, position, impressions } });
  const medians = ctrByPositionBucket([row(0.01, 10.2), row(0.03, 9.8), row(0.02, 10.4), row(0.5, 3), row(0.02, 10, 5)], 100);
  assert.equal(medians.get(10), 0.02);
  assert.equal(medians.has(3), false, 'one page is not a median');
});
