// Tennis win probability calculator, against Newton & Keller, "Probability of
// Winning at Tennis I. Theory and Data", Studies in Applied Mathematics 114
// (2005):
//   - equation (5), the chance of holding serve, and the theoretical hold
//     probabilities in column G of their Tables 1 and 2
//   - their proof that the chance of winning a tie-break, a set or a match does
//     not depend on who serves first
//   - their equations (51) and (52), match from set probability
//   - Tables 3 and 4, match-win probabilities on a 0.1 grid
//
// About Tables 3 and 4: 124 of the 162 interior values match our exact
// calculation to four decimal places; the other 38 differ by at most 0.0028,
// all where one or both players win few points on serve (most sets reach a
// tie-break). An independent point-by-point simulation written separately for
// this check (2,000,000 matches at p_A = 0.2, p_B = 0.1) gave 0.8569 ± 0.0005
// for best of three, against 0.8566 here and 0.8539 in Table 4, so the gap is
// in the published tables rather than in the model. The page says the
// calculator agrees with the tables to within 0.003.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  holdProbability,
  matchProbabilities,
  setOutcomes,
  tiebreakProbability,
  validateTennis,
} from '../../src/lib/tools/tennis.mjs';

const close = (actual, expected, tolerance = 1e-12) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

// Rows are p_B = 0.1 … 0.9; columns p_A = 0.1 … 0.9.
const TABLE_3_BEST_OF_5 = [
  [0.5, 0.906, 0.9956, 1, 1, 1, 1, 1, 1],
  [0.094, 0.5, 0.9136, 0.9981, 1, 1, 1, 1, 1],
  [0.0045, 0.0864, 0.5, 0.938, 0.9993, 1, 1, 1, 1],
  [0, 0.0019, 0.0621, 0.5, 0.9513, 0.9995, 1, 1, 1],
  [0, 0, 0.0007, 0.0487, 0.5, 0.9513, 0.9993, 1, 1],
  [0, 0, 0, 0.0005, 0.0487, 0.5, 0.938, 0.9981, 1],
  [0, 0, 0, 0, 0.0007, 0.0621, 0.5, 0.9136, 0.9956],
  [0, 0, 0, 0, 0, 0.0019, 0.0864, 0.5, 0.906],
  [0, 0, 0, 0, 0, 0, 0.0045, 0.094, 0.5],
];
const TABLE_4_BEST_OF_3 = [
  [0.5, 0.8539, 0.982, 0.9995, 1, 1, 1, 1, 1],
  [0.1461, 0.5, 0.8624, 0.9898, 0.9999, 1, 1, 1, 1],
  [0.018, 0.1376, 0.5, 0.8909, 0.9947, 1, 1, 1, 1],
  [0.0005, 0.0103, 0.1091, 0.5, 0.9079, 0.9961, 1, 1, 1],
  [0, 0.0001, 0.0053, 0.0922, 0.5, 0.9079, 0.9947, 0.9999, 1],
  [0, 0, 0, 0.0039, 0.0922, 0.5, 0.8909, 0.9898, 0.9995],
  [0, 0, 0, 0, 0.0053, 0.1091, 0.5, 0.8624, 0.982],
  [0, 0, 0, 0, 0.0001, 0.0103, 0.1376, 0.5, 0.8539],
  [0, 0, 0, 0, 0, 0.0005, 0.018, 0.1461, 0.5],
];

test('holding serve: equation (5), and the paper’s theoretical column', () => {
  const p = 0.6;
  const q = 0.4;
  close(holdProbability(p), p ** 4 * (1 + 4 * q + 10 * q ** 2) + (20 * (p * q) ** 3 * p ** 2) / (1 - 2 * p * q));
  assert.equal(holdProbability(0.5), 0.5);
  assert.equal(holdProbability(0.6).toFixed(4), '0.7357');
  // Column E (points won on serve) → column G (theoretical hold), Tables 1–2.
  for (const [e, g] of [
    [0.59, '0.71'],
    [0.61, '0.76'],
    [0.63, '0.79'],
    [0.64, '0.81'],
    [0.66, '0.85'],
    [0.67, '0.86'],
    [0.68, '0.88'],
    [0.69, '0.89'],
    [0.7, '0.90'],
    [0.71, '0.91'],
    [0.73, '0.93'],
  ]) {
    assert.equal(holdProbability(e).toFixed(2), g, `p = ${e}`);
  }
});

test('No-Ad: first to four points', () => {
  const p = 0.6;
  const q = 0.4;
  close(holdProbability(p, true), p ** 4 * (1 + 4 * q + 10 * q ** 2 + 20 * q ** 3));
  assert.equal(holdProbability(0.5, true), 0.5);
  // A deciding point at deuce helps the receiver: holds are lower.
  assert.ok(holdProbability(0.65, true) < holdProbability(0.65));
});

test('serving first makes no difference (Newton & Keller’s theorem)', () => {
  for (const [pA, pB] of [
    [0.65, 0.6],
    [0.2, 0.1],
    [0.55, 0.7],
  ]) {
    close(tiebreakProbability(pA, pB, { aServesFirst: true }), tiebreakProbability(pA, pB, { aServesFirst: false }), 1e-12);
    close(
      tiebreakProbability(pA, pB, { target: 10, aServesFirst: true }),
      tiebreakProbability(pA, pB, { target: 10, aServesFirst: false }),
      1e-12
    );
    const holdA = holdProbability(pA);
    const holdB = holdProbability(pB);
    for (const type of ['tiebreak', 'advantage']) {
      const a = setOutcomes({ pA, pB, holdA, holdB, type, aServesFirst: true });
      const b = setOutcomes({ pA, pB, holdA, holdB, type, aServesFirst: false });
      close(a.winSame + a.winSwap, b.winSame + b.winSwap, 1e-12);
      close(a.winSame + a.winSwap + a.loseSame + a.loseSwap, 1, 1e-12);
    }
    for (const finalSet of ['tiebreak', 'advantage', 'match-tiebreak']) {
      for (const bestOf of [3, 5]) {
        close(
          matchProbabilities({ pA, pB, bestOf, finalSet, aServesFirst: true }).matchA,
          matchProbabilities({ pA, pB, bestOf, finalSet, aServesFirst: false }).matchA,
          1e-12
        );
      }
    }
  }
});

test('match from set: equations (51) and (52)', () => {
  const r3 = matchProbabilities({ pA: 0.64, pB: 0.62, bestOf: 3, finalSet: 'tiebreak' });
  const r5 = matchProbabilities({ pA: 0.64, pB: 0.62, bestOf: 5, finalSet: 'tiebreak' });
  const s = r3.setA;
  close(r3.matchA, s ** 2 + 2 * s ** 2 * (1 - s), 1e-12);
  close(r5.matchA, s ** 3 + 3 * s ** 3 * (1 - s) + 6 * s ** 3 * (1 - s) ** 2, 1e-12);
  // Set scores add up to one.
  close(
    r5.scores.reduce((sum, row) => sum + row.p, 0),
    1,
    1e-12
  );
  assert.deepEqual(
    r3.scores.map((row) => row.score),
    ['2–1', '2–0', '1–2', '0–2']
  );
});

test('Tables 3 and 4: within 0.003 everywhere, exact to four places in 124 of 162', () => {
  let exact = 0;
  let worst = 0;
  for (const [bestOf, table] of [
    [5, TABLE_3_BEST_OF_5],
    [3, TABLE_4_BEST_OF_3],
  ]) {
    table.forEach((row, b) => {
      row.forEach((published, a) => {
        const pA = (a + 1) / 10;
        const pB = (b + 1) / 10;
        const ours = matchProbabilities({ pA, pB, bestOf, finalSet: 'tiebreak' }).matchA;
        worst = Math.max(worst, Math.abs(ours - published));
        if (ours.toFixed(4) === published.toFixed(4)) exact += 1;
      });
    });
  }
  assert.equal(exact, 124);
  assert.ok(worst < 0.003, `largest difference ${worst}`);
  // Two of the cells that match exactly, near the middle of the grid.
  assert.equal(matchProbabilities({ pA: 0.6, pB: 0.5, bestOf: 5, finalSet: 'tiebreak' }).matchA.toFixed(4), '0.9513');
  assert.equal(matchProbabilities({ pA: 0.6, pB: 0.4, bestOf: 3, finalSet: 'tiebreak' }).matchA.toFixed(4), '0.9961');
});

test('the worked example: 62% against 60% on serve, best of five', () => {
  const r = matchProbabilities({ pA: 0.62, pB: 0.6, bestOf: 5, finalSet: 'tiebreak' });
  assert.equal((r.holdA * 100).toFixed(1), '77.6');
  assert.equal((r.holdB * 100).toFixed(1), '73.6');
  assert.equal((r.tiebreakA * 100).toFixed(1), '53.3');
  assert.equal((r.setA * 100).toFixed(1), '56.8');
  assert.equal((r.matchA * 100).toFixed(1), '62.6');
  const r3 = matchProbabilities({ pA: 0.62, pB: 0.6, bestOf: 3, finalSet: 'tiebreak' });
  assert.equal((r3.matchA * 100).toFixed(1), '60.1');
});

test('final-set formats and No-Ad change the answer as expected', () => {
  const base = { pA: 0.65, pB: 0.6, bestOf: 3 };
  const tb = matchProbabilities({ ...base, finalSet: 'tiebreak' }).matchA;
  const adv = matchProbabilities({ ...base, finalSet: 'advantage' }).matchA;
  const mtb = matchProbabilities({ ...base, finalSet: 'match-tiebreak' }).matchA;
  // The longer the decider, the more the better server's edge counts.
  assert.ok(adv > tb && tb > mtb);
  // Page prose: the same ordering for the worked example's players.
  const worked = ['advantage', 'tiebreak', 'match-tiebreak'].map(
    (finalSet) => matchProbabilities({ pA: 0.62, pB: 0.6, bestOf: 3, finalSet }).matchA
  );
  assert.ok(worked[0] > worked[1] && worked[1] > worked[2]);
  // Equal players are always even.
  for (const finalSet of ['tiebreak', 'advantage', 'match-tiebreak']) {
    close(matchProbabilities({ pA: 0.6, pB: 0.6, bestOf: 5, finalSet, noAd: true }).matchA, 0.5, 1e-12);
  }
});

test('validation', () => {
  assert.deepEqual(validateTennis({ pAPercent: 62, pBPercent: 60 }), []);
  assert.ok(validateTennis({ pAPercent: 0, pBPercent: 60 }).length > 0);
  assert.ok(validateTennis({ pAPercent: 62, pBPercent: 100 }).length > 0);
  assert.ok(validateTennis({ pAPercent: Number.NaN, pBPercent: 60 }).length > 0);
});
