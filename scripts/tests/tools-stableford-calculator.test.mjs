// Stableford calculator. Reference values come from the sources the page
// cites:
//   - Rules of Golf, Rule 21.1b (R&A): the points table, and Diagram 21.1b, a
//     scratch card of 76 on a par-70 course scored at 14 + 16 = 30 points
//   - Rules of Handicapping, Appendix E: stroke-index allocation, the repeat
//     above 18, 9-hole play and plus handicaps; Rule 3.1: net double bogey is
//     the lowest score that earns zero Stableford points
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  allocateStrokes,
  parseHoleRow,
  scoreCard,
  stablefordPoints,
  validateCard,
} from '../../src/lib/tools/stableford.mjs';

// The R&A's Diagram 21.1b card.
const PARS = [4, 3, 4, 4, 3, 5, 4, 4, 5, 3, 4, 4, 3, 5, 3, 5, 3, 4];
const SCORES = [3, 3, 5, 4, 4, 7, 5, 4, 5, 3, 4, 6, 3, 4, 3, 4, 5, 4];
const POINTS = [3, 2, 1, 2, 1, 0, 1, 2, 2, 2, 2, 0, 2, 3, 2, 3, 0, 2];
// The page's illustrative stroke index: odd numbers on the front nine, even on
// the back, laid out as Appendix E recommends.
const STROKE_INDEX = [7, 15, 3, 11, 1, 13, 9, 5, 17, 16, 8, 4, 14, 2, 18, 10, 12, 6];

test('Rule 21.1b’s points table', () => {
  assert.deepEqual(
    [3, 4, 5, 6, 7, 8, 1, 2].map((score) => stablefordPoints(4, score)),
    [3, 2, 1, 0, 0, 0, 5, 4]
  );
  assert.equal(stablefordPoints(5, 1), 6); // four under: a condor
  assert.equal(stablefordPoints(4, null), 0); // no score returned
});

test('the R&A’s Diagram 21.1b card: 14 out, 16 in, 30 points', () => {
  const card = scoreCard({ pars: PARS, strokeIndexes: STROKE_INDEX, scores: SCORES, playingHandicap: 0 });
  assert.deepEqual(
    card.rows.map((row) => row.points),
    POINTS
  );
  assert.equal(card.rows.slice(0, 9).reduce((sum, row) => sum + row.points, 0), 14);
  assert.equal(card.rows.slice(9).reduce((sum, row) => sum + row.points, 0), 16);
  assert.equal(card.points, 30);
  assert.equal(card.par, 70);
  assert.equal(card.gross, 76);
  assert.equal(card.netParPoints, 36);
});

test('Appendix E: strokes in stroke-index order, repeating above 18', () => {
  const si = [...Array(18).keys()].map((i) => i + 1);
  assert.deepEqual(allocateStrokes(si, 0), new Array(18).fill(0));
  assert.deepEqual(allocateStrokes(si, 5), si.map((s) => (s <= 5 ? 1 : 0)));
  assert.deepEqual(allocateStrokes(si, 18), new Array(18).fill(1));
  // 20: one everywhere, and SI 1 and 2 again as "19" and "20".
  assert.deepEqual(allocateStrokes(si, 20), si.map((s) => (s <= 2 ? 2 : 1)));
  // 55 ("stroke index 1 repeating as … 55"): three everywhere, four on SI 1.
  assert.deepEqual(allocateStrokes(si, 55), si.map((s) => (s === 1 ? 4 : 3)));
  for (const ph of [0, 7, 18, 23, 36, 54, 72]) {
    assert.equal(allocateStrokes(STROKE_INDEX, ph).reduce((a, b) => a + b, 0), ph);
  }
});

test('plus handicaps give strokes back from the highest stroke index', () => {
  const si = [...Array(18).keys()].map((i) => i + 1);
  assert.deepEqual(allocateStrokes(si, -2), si.map((s) => (s >= 17 ? -1 : 0)));
  assert.equal(allocateStrokes(STROKE_INDEX, -3).reduce((a, b) => a + b, 0), -3);
  // Nine holes with 18-hole indexes 2, 4, …, 18: +1 gives back on SI 18.
  const back = [16, 8, 4, 14, 2, 18, 10, 12, 6];
  assert.deepEqual(allocateStrokes(back, -1), back.map((s) => (s === 18 ? -1 : 0)));
});

test('nine holes: strokes in ascending order of the 18-hole indexes', () => {
  const front = [7, 15, 3, 11, 1, 13, 9, 5, 17];
  // Five strokes go to the five lowest indexes on these holes: 1, 3, 5, 7, 9.
  assert.deepEqual(allocateStrokes(front, 5), front.map((s) => (s <= 9 ? 1 : 0)));
  // Eleven: one everywhere, a second on the two lowest.
  assert.deepEqual(allocateStrokes(front, 11), front.map((s) => (s <= 3 ? 2 : 1)));
  // A committee's 1–9 allocation in the same order gives the same strokes.
  const ranks = [4, 8, 2, 6, 1, 7, 5, 3, 9];
  assert.deepEqual(allocateStrokes(ranks, 5), allocateStrokes(front, 5));
});

test('the worked example: the same card with a Playing Handicap of 12', () => {
  const card = scoreCard({ pars: PARS, strokeIndexes: STROKE_INDEX, scores: SCORES, playingHandicap: 12 });
  assert.equal(card.points, 42);
  assert.equal(card.rows.slice(0, 9).reduce((sum, row) => sum + row.points, 0), 20);
  assert.equal(card.rows.slice(9).reduce((sum, row) => sum + row.points, 0), 22);
  assert.equal(card.net, 64);
  assert.equal(card.holesWithoutPoints, 1);
  // Hole 6: par 5, SI 13 (no stroke), a 7 — net double bogey, zero points.
  assert.equal(card.rows[5].strokes, 0);
  assert.equal(card.rows[5].points, 0);
  // Hole 12: par 4, SI 4 (a stroke), a 6 — net 5, one point.
  assert.equal(card.rows[11].strokes, 1);
  assert.equal(card.rows[11].points, 1);
});

test('Rule 3.1: net double bogey is the lowest score worth zero points', () => {
  const card = scoreCard({ pars: PARS, strokeIndexes: STROKE_INDEX, scores: SCORES, playingHandicap: 12 });
  for (const row of card.rows) {
    const strokes = row.strokes;
    assert.equal(stablefordPoints(row.par, row.netDoubleBogey - strokes), 0);
    assert.equal(stablefordPoints(row.par, row.netDoubleBogey - 1 - strokes), 1);
  }
});

test('no score returned: zero points, and no gross total', () => {
  const scores = [...SCORES];
  scores[5] = null;
  const card = scoreCard({ pars: PARS, strokeIndexes: STROKE_INDEX, scores, playingHandicap: 0 });
  assert.equal(card.rows[5].points, 0);
  assert.equal(card.points, 30);
  assert.equal(card.gross, null);
});

test('parsing and validation', () => {
  assert.deepEqual(parseHoleRow('4 3, 4\t5'), [4, 3, 4, 5]);
  assert.deepEqual(parseHoleRow('4 x NR -', { allowNoScore: true }), [4, null, null, null]);
  assert.ok(Number.isNaN(parseHoleRow('4 x')[1]));
  assert.ok(Number.isNaN(parseHoleRow('4.5')[0]));
  const ok = { holes: 18, pars: PARS, strokeIndexes: STROKE_INDEX, scores: SCORES, playingHandicap: 12 };
  assert.deepEqual(validateCard(ok), []);
  assert.ok(validateCard({ ...ok, pars: PARS.slice(1) }).some((e) => e.includes('found 17')));
  // Hole 18 given hole 2's index (15): two holes share it.
  assert.ok(validateCard({ ...ok, strokeIndexes: [...STROKE_INDEX.slice(0, 17), 15] }).some((e) => e.includes('different')));
  assert.ok(validateCard({ ...ok, strokeIndexes: STROKE_INDEX.map((s) => s + 1) }).length > 0);
  assert.ok(validateCard({ ...ok, pars: PARS.map((p, i) => (i === 0 ? 2 : p)) }).length > 0);
  assert.ok(validateCard({ ...ok, scores: SCORES.map((s, i) => (i === 0 ? 0 : s)) }).length > 0);
  assert.ok(validateCard({ ...ok, playingHandicap: 73 }).length > 0);
  assert.ok(validateCard({ ...ok, playingHandicap: 2.5 }).length > 0);
  assert.deepEqual(
    validateCard({ holes: 9, pars: PARS.slice(0, 9), strokeIndexes: STROKE_INDEX.slice(0, 9), scores: SCORES.slice(0, 9), playingHandicap: -1 }),
    []
  );
});
