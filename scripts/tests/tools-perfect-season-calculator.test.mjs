// Perfect season calculator. The binomial formula is NIST's (e-Handbook of
// Statistical Methods, 1.3.6.6.18); season lengths come from the rulebooks and
// schedules cited in src/lib/tools/perfect-season.mjs. Several tests pin
// numbers the tool page states in prose.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SEASON_PRESETS,
  binomialPmf,
  formatChance,
  formatOneIn,
  lossesAtMost,
  seasonOdds,
  validateSeason,
  winChanceForPerfect,
} from '../../src/lib/tools/perfect-season.mjs';

const close = (actual, expected, tolerance = 1e-12) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

test('binomialPmf is NIST’s P(x; p, n) = C(n, x) p^x (1 − p)^(n − x)', () => {
  close(binomialPmf(10, 3, 0.5), 120 / 1024);
  close(binomialPmf(4, 2, 0.3), 6 * 0.09 * 0.49);
  close(binomialPmf(5, 0, 0.2), 0.8 ** 5);
  assert.equal(binomialPmf(5, 6, 0.2), 0);
  assert.equal(binomialPmf(5, -1, 0.2), 0);
  assert.equal(binomialPmf(5, 0, 0), 1);
  assert.equal(binomialPmf(5, 5, 1), 1);
  assert.equal(binomialPmf(5, 4, 1), 0);
});

test('the distribution sums to one and has NIST’s mean, np', () => {
  for (const [n, p] of [
    [162, 0.3],
    [82, 0.62],
    [1000, 0.5],
  ]) {
    let total = 0;
    let mean = 0;
    for (let x = 0; x <= n; x++) {
      const pmf = binomialPmf(n, x, p);
      total += pmf;
      mean += x * pmf;
    }
    close(total, 1, 1e-9);
    close(mean, n * p, 1e-7);
  }
});

test('a perfect season is w^n; an unbeaten one is (w + d)^n', () => {
  const r = seasonOdds({ games: 38, winPercent: 70, drawPercent: 20 });
  close(r.perfect, 0.7 ** 38);
  close(r.unbeaten, 0.9 ** 38);
  close(r.loss, 0.1);
  close(r.expectedWins + r.expectedDraws + r.expectedLosses, 38, 1e-9);
  // Without draws the two are the same number.
  const noDraws = seasonOdds({ games: 17, winPercent: 80 });
  assert.equal(noDraws.perfect, noDraws.unbeaten);
  close(noDraws.perfect, 0.8 ** 17);
});

test('at most one or two losses follow the binomial tail', () => {
  const r = seasonOdds({ games: 20, winPercent: 90 });
  close(r.atMostOneLoss, 0.9 ** 20 + 20 * 0.1 * 0.9 ** 19);
  close(r.atMostTwoLosses, r.atMostOneLoss + 190 * 0.01 * 0.9 ** 18);
  assert.equal(lossesAtMost(5, 0.3, 10), 1);
});

test('the numbers the page states in prose', () => {
  // 90% a game: 20–0 is about one season in eight (12.2%) …
  const twenty = seasonOdds({ games: 20, winPercent: 90 });
  assert.equal(formatChance(twenty.perfect), '12.2%');
  assert.equal(formatOneIn(twenty.perfect), '1 in 8.2');
  // … and 162–0 is about 1 in 25.9 million; at 95% it is about 1 in 4,060.
  assert.equal(formatOneIn(seasonOdds({ games: 162, winPercent: 90 }).perfect), '1 in 25.9 million');
  assert.equal(formatOneIn(seasonOdds({ games: 162, winPercent: 95 }).perfect), '1 in 4,060');
  // The worked example: 70% wins and 20% draws over 38 games.
  const league = seasonOdds({ games: 38, winPercent: 70, drawPercent: 20 });
  assert.equal(formatOneIn(league.perfect), '1 in 770,000');
  assert.equal(formatChance(league.unbeaten), '1.8%');
  assert.equal(formatOneIn(league.unbeaten), '1 in 54.8');
  // A coin-flip team needs 99.6% a game for an even chance of 162–0.
  assert.equal((winChanceForPerfect(162, 0.5) * 100).toFixed(1), '99.6');
  assert.equal((winChanceForPerfect(20, 0.5) * 100).toFixed(1), '96.6');
});

test('season-length presets are the sourced lengths', () => {
  assert.deepEqual(
    SEASON_PRESETS.map((preset) => preset.games),
    [17, 20, 38, 82, 162]
  );
  // 17 regular-season games plus the top seed's three playoff games.
  assert.equal(SEASON_PRESETS.find((p) => p.id === 'football-top-seed').games, 17 + 3);
  // Every one of 20 sides plays the other 19 home and away.
  assert.equal(SEASON_PRESETS.find((p) => p.id === 'league-38').games, 2 * (20 - 1));
});

test('validation rejects impossible seasons', () => {
  assert.deepEqual(validateSeason({ games: 82, winPercent: 60 }), []);
  assert.deepEqual(validateSeason({ games: 38, winPercent: 70, drawPercent: 30 }), []);
  assert.ok(validateSeason({ games: 0, winPercent: 60 }).length > 0);
  assert.ok(validateSeason({ games: 1001, winPercent: 60 }).length > 0);
  assert.ok(validateSeason({ games: 10.5, winPercent: 60 }).length > 0);
  assert.ok(validateSeason({ games: 10, winPercent: Number.NaN }).length > 0);
  assert.ok(validateSeason({ games: 10, winPercent: 101 }).length > 0);
  assert.ok(validateSeason({ games: 10, winPercent: 50, drawPercent: -1 }).length > 0);
  assert.deepEqual(validateSeason({ games: 10, winPercent: 70, drawPercent: 40 }), [
    'The chances of a win and a draw cannot add up to more than 100%.',
  ]);
});

test('edge cases: certain and impossible seasons, very long ones', () => {
  assert.equal(seasonOdds({ games: 5, winPercent: 100 }).perfect, 1);
  assert.equal(seasonOdds({ games: 5, winPercent: 0 }).perfect, 0);
  assert.equal(seasonOdds({ games: 5, winPercent: 0, drawPercent: 100 }).unbeaten, 1);
  const long = seasonOdds({ games: 1000, winPercent: 50 });
  assert.ok(long.perfect > 0 && long.perfect < 1e-300);
  assert.equal(formatOneIn(long.perfect), '1 in 1.07 × 10³⁰¹');
});

test('chances are never rounded away', () => {
  assert.equal(formatChance(0), '0%');
  assert.equal(formatChance(1), '100%');
  assert.equal(formatChance(0.0004), '<0.1%');
  assert.equal(formatChance(0.9996), '>99.9%');
  assert.equal(formatChance(0.12345), '12.3%');
  assert.equal(formatOneIn(0.5), null);
  assert.equal(formatOneIn(0), null);
  assert.equal(formatOneIn(0.4), '1 in 2.5');
  assert.equal(formatOneIn(9.99996e-7), '1 in 1 million');
  assert.equal(formatOneIn(1.0004e-9), '1 in 1 billion');
  assert.equal(formatOneIn(1e-12), '1 in 1 trillion');
  assert.equal(formatOneIn(1.2867e-25), '1 in 7.77 × 10²⁴');
});
