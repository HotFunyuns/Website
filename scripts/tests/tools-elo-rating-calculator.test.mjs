// Elo rating calculator. Reference values come from the sources the page
// cites:
//   - Glickman & Jones (Chance, 1999): ratings 1500 and 1700 — the 1500
//     player's expected score is "about 0.24"
//   - FIDE Rating Regulations (from 1 March 2024): table 8.1.2, rules 8.3.1–8.3.4
//   - FIFA, "Revision of the FIFA / Coca-Cola World Ranking": 1300 beats 1500 in
//     a continental qualifier (I = 25) and gains 17 points; the loser drops to 1483
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFixed } from '../../src/lib/tools/format.mjs';
import {
  FIDE_K,
  FIDE_TABLE,
  FIFA_IMPORTANCE,
  FIFA_RESULTS,
  eloUpdate,
  expectedScore,
  fideExpectedHundredths,
  fideUpdate,
  fifaUpdate,
  roundHalfAwayFromZero,
  validateElo,
  validateFide,
  validateFifa,
} from '../../src/lib/tools/elo.mjs';

const close = (actual, expected, tolerance = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

/* -------------------------------------------------------------- Elo (400) */

test('Elo’s formula reproduces Glickman & Jones’s example (about 0.24)', () => {
  const e = expectedScore(1500, 1700);
  assert.equal(formatFixed(e, 2), '0.24');
  close(e, 1 / (1 + Math.sqrt(10)));
  close(expectedScore(1700, 1500), 1 - e);
  assert.equal(expectedScore(1600, 1600), 0.5);
});

test('Elo’s update moves both ratings by the same amount', () => {
  const r = eloUpdate({ ratingA: 1500, ratingB: 1700, scoreA: 1, k: 20 });
  close(r.changeA, 20 * (1 - r.expectedA));
  close(r.changeA + r.changeB, 0);
  close(r.newA + r.newB, 3200);
  assert.equal(formatFixed(r.changeA, 1), '15.2');
  // A draw between equals changes nothing.
  assert.equal(eloUpdate({ ratingA: 1800, ratingB: 1800, scoreA: 0.5, k: 32 }).changeA, 0);
});

test('page prose: a 200-point gap is .760 by the formula and .76 in FIDE’s table', () => {
  assert.equal(formatFixed(expectedScore(1700, 1500), 3), '0.760');
  assert.equal(fideExpectedHundredths(1700, 1500), 76);
  // At 600, FIFA’s scale, the same gap is worth less.
  assert.equal(formatFixed(expectedScore(1700, 1500, 600), 3), '0.683');
});

/* ------------------------------------------------------------------- FIDE */

test('FIDE table 8.1.2 covers every difference exactly once', () => {
  assert.equal(FIDE_TABLE.length, 51);
  let previous = -1;
  for (const [max, high] of FIDE_TABLE) {
    assert.ok(max > previous);
    assert.ok(high >= 50 && high <= 100);
    previous = max;
  }
  // Rows straight from the regulations.
  const row = (d) => FIDE_TABLE.find(([max]) => d <= max)[1];
  assert.equal(row(0), 50);
  assert.equal(row(3), 50);
  assert.equal(row(4), 51);
  assert.equal(row(91), 62);
  assert.equal(row(92), 63);
  assert.equal(row(344), 88);
  assert.equal(row(345), 89);
  assert.equal(row(411), 92);
  assert.equal(row(620), 99);
  assert.equal(row(735), 99);
  assert.equal(row(736), 100);
});

test('FIDE 8.3.1: a difference over 400 counts as 400 below 2650', () => {
  assert.equal(fideExpectedHundredths(2000, 2500), 8); // capped: L at 400
  assert.equal(fideExpectedHundredths(2500, 2000), 92); // capped: H at 400
  assert.equal(fideExpectedHundredths(2700, 2200), 96); // 2650+: actual 500
  assert.equal(fideExpectedHundredths(2700, 1900), 100); // 2650+: actual 800
  assert.equal(fideExpectedHundredths(2300, 2300), 50);
});

test('FIDE rating change: (score − P_D) × K, rounded half away from zero', () => {
  // 2100 (K 20) draws with 2300 (K 10): D = 200 → .24 and .76.
  const draw = fideUpdate({ ratingA: 2100, ratingB: 2300, scoreA: 0.5, kA: 20, kB: 10 });
  assert.equal(draw.expectedA, 0.24);
  assert.equal(draw.expectedB, 0.76);
  close(draw.exactChangeA, 5.2);
  close(draw.exactChangeB, -2.6);
  assert.equal(draw.changeA, 5);
  assert.equal(draw.changeB, -3);
  assert.equal(draw.newA, 2105);
  assert.equal(draw.newB, 2297);
  // Exactly .5 goes away from zero on both sides (8.3.4).
  const half = fideUpdate({ ratingA: 2400, ratingB: 2209, scoreA: 1, kA: 10, kB: 10 });
  assert.equal(half.exactChangeA, 2.5);
  assert.equal(half.changeA, 3);
  assert.equal(half.changeB, -3);
  // Each side uses its own side of 8.3.1.
  const gap = fideUpdate({ ratingA: 2200, ratingB: 2700, scoreA: 0.5, kA: 20, kB: 10 });
  assert.equal(gap.changeA, 8); // (0.5 − 0.08) × 20 = 8.4
  assert.equal(gap.changeB, -5); // (0.5 − 0.96) × 10 = −4.6
});

test('FIDE K-factors are 40, 20 and 10', () => {
  assert.deepEqual(
    FIDE_K.map((option) => option.k),
    [40, 20, 10]
  );
  assert.equal(roundHalfAwayFromZero(2.5), 3);
  assert.equal(roundHalfAwayFromZero(-2.5), -3);
  assert.equal(roundHalfAwayFromZero(-2.4), -2);
  assert.ok(!Object.is(roundHalfAwayFromZero(-0.4), -0));
});

/* ------------------------------------------------------------------- FIFA */

test('FIFA SUM reproduces FIFA’s own example (+17, 1317 and 1483)', () => {
  const qualifier = FIFA_IMPORTANCE.find((option) => option.id === 'qualifier');
  assert.equal(qualifier.value, 25);
  const r = fifaUpdate({ pointsA: 1300, pointsB: 1500, wA: 1, wB: 0, importance: 25, knockout: false });
  assert.equal(Math.round(r.changeA), 17);
  assert.equal(Math.round(r.newA), 1317);
  assert.equal(Math.round(r.newB), 1483);
  close(r.changeA + r.changeB, 0);
  close(r.expectedA, 1 / (10 ** (200 / 600) + 1));
});

test('FIFA: shoot-outs score 0.75 and 0.5; knockout losers keep their points', () => {
  const shootout = FIFA_RESULTS.find((result) => result.id === 'a-shootout');
  assert.equal(shootout.wA, 0.75);
  assert.equal(shootout.wB, 0.5);
  // Level teams: the shoot-out winner gains a quarter of I, the loser nothing.
  const level = fifaUpdate({ pointsA: 1500, pointsB: 1500, wA: 0.75, wB: 0.5, importance: 60, knockout: false });
  close(level.changeA, 15);
  close(level.changeB, 0);
  // In a knockout round, a negative change becomes zero.
  const upset = fifaUpdate({ pointsA: 1600, pointsB: 1400, wA: 0, wB: 1, importance: 60, knockout: true });
  assert.equal(upset.changeA, 0);
  assert.ok(upset.changeB > 0);
  const notKnockout = fifaUpdate({ pointsA: 1600, pointsB: 1400, wA: 0, wB: 1, importance: 60, knockout: false });
  assert.ok(notKnockout.changeA < 0);
});

test('FIFA importance values are the nine FIFA lists', () => {
  assert.deepEqual(
    FIFA_IMPORTANCE.map((option) => option.value),
    [5, 10, 15, 25, 25, 35, 40, 50, 60]
  );
});

/* ------------------------------------------------------------- validation */

test('validation', () => {
  assert.deepEqual(validateElo({ ratingA: 1500, ratingB: 1700, k: 20 }), []);
  assert.ok(validateElo({ ratingA: Number.NaN, ratingB: 1700, k: 20 }).length > 0);
  assert.ok(validateElo({ ratingA: 1500, ratingB: 1700, k: 0 }).length > 0);
  assert.ok(validateElo({ ratingA: -1, ratingB: 1700, k: 20 }).length > 0);
  assert.deepEqual(validateFide({ ratingA: 2100, ratingB: 2300, kA: 20, kB: 10 }), []);
  assert.ok(validateFide({ ratingA: 1399, ratingB: 2300, kA: 20, kB: 10 }).length > 0);
  assert.ok(validateFide({ ratingA: 2100.5, ratingB: 2300, kA: 20, kB: 10 }).length > 0);
  assert.ok(validateFide({ ratingA: 2100, ratingB: 2300, kA: 32, kB: 10 }).length > 0);
  assert.deepEqual(validateFifa({ pointsA: 1300, pointsB: 1500 }), []);
  assert.ok(validateFifa({ pointsA: 1300, pointsB: Number.NaN }).length > 0);
});
