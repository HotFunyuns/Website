// World Rugby Rankings points exchange (src/lib/tools/rugby-rankings.mjs).
//
// Sources, opened 2026-10-02:
//   - https://www.world.rugby/rankings/explanation (dated 14 November 2014):
//     the worked example — home side 76.92, visitors 76.36; under the home
//     weighting then in force the home side counted as 79.92, a gap of 3.56,
//     giving 0.64 / 0.36 / 1.36; a 13-point home win exchanged 0.64 and left the
//     visitors on 75.72.
//   - https://www.world.rugby/news/1044762/new-world-rugby-rankings-criteria
//     (18 June 2026): home weighting removed from 1 July 2026.
//   - https://www.world.rugby/news/1045589/england-and-scotland-trade-places-in-world-rugby-mens-rankings
//     (13 July 2026) gives one side's rating as 84.06, and
//     https://www.world.rugby/news/1045740/italy-drop-out-of-top-10-in-world-rugby-mens-rankings
//     (20 July 2026) reports that the other side, now on 85.68, gained 0.93 by
//     beating it by 7 (31-24). So the winner went in on 84.75.
//   - https://www.world.rugby/news/1045307/thrilling-weekend-of-rugby-has-big-impact-on-world-rugby-mens-rankings
//     (6 July 2026): a 24-point win "was not rewarded due to the 10.03 points
//     differential between the teams".
// Teams are deliberately not named here or on the page.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFixed } from '../../src/lib/tools/format.mjs';
import {
  BIG_WIN_MULTIPLIER,
  OUTCOMES,
  WORLD_CUP_MULTIPLIER,
  allOutcomes,
  coreRatingChange,
  pointsExchange,
  validateRatings,
} from '../../src/lib/tools/rugby-rankings.mjs';

test('World Rugby’s worked example: a gap of 3.56 gives 0.64, 0.36 and 1.36', () => {
  // The example predates 1 July 2026, so it adds 3 to the home side's 76.92.
  const home = 76.92 + 3;
  const away = 76.36;
  assert.equal(formatFixed(home - away, 2), '3.56');
  assert.equal(formatFixed(coreRatingChange(home, away, 'win'), 2), '0.64');
  assert.equal(formatFixed(-coreRatingChange(home, away, 'draw'), 2), '0.36');
  assert.equal(formatFixed(coreRatingChange(away, home, 'win'), 2), '1.36');
  // The 13-point home win: 0.64 exchanged; the visitors drop to 75.72.
  const result = pointsExchange({ ratingA: home, ratingB: away, outcome: 'a' });
  assert.equal(formatFixed(result.exchanged, 2), '0.64');
  assert.equal(formatFixed(away + result.changeB, 2), '75.72');
  // (The page puts the home side on 77.57; 76.92 + 0.644 is 77.564. World
  // Rugby works from unrounded ratings, so a two-decimal input can be 0.01 out.)
});

test('the same ratings under the current method (the page compares them)', () => {
  assert.equal(formatFixed(76.92 - 76.36, 2), '0.56');
  assert.equal(formatFixed(coreRatingChange(76.92, 76.36, 'win'), 2), '0.94');
  assert.equal(formatFixed(-coreRatingChange(76.92, 76.36, 'draw'), 2), '0.06');
  assert.equal(formatFixed(coreRatingChange(76.36, 76.92, 'win'), 2), '1.06');
});

test('a win by more than 15 multiplies the core change by 1.5, a World Cup match by 2', () => {
  assert.equal(BIG_WIN_MULTIPLIER, 1.5);
  assert.equal(WORLD_CUP_MULTIPLIER, 2);
  const home = 76.92 + 3;
  const big = pointsExchange({ ratingA: home, ratingB: 76.36, outcome: 'a-big' });
  // The page writes "0.64 x 1.5 = 0.96", multiplying the rounded figure; the
  // unrounded core change gives 0.966.
  assert.equal(formatFixed(0.64 * 1.5, 2), '0.96');
  assert.equal(formatFixed(big.exchanged, 3), '0.966');
  const cup = pointsExchange({ ratingA: home, ratingB: 76.36, outcome: 'a-big', worldCup: true });
  assert.ok(Math.abs(cup.exchanged - 2 * big.exchanged) < 1e-12);
});

test('a result after 1 July 2026 matches the method without home weighting', () => {
  const winner = 85.68 - 0.93; // 84.75 before the match
  const loser = 84.06;
  const result = pointsExchange({ ratingA: winner, ratingB: loser, outcome: 'a' });
  assert.equal(formatFixed(result.exchanged, 2), '0.93');
  assert.equal(formatFixed(result.newRatingA, 2), '85.68');
  // With the old +3 for either side as the home team, the figure would not be 0.93.
  assert.equal(formatFixed(coreRatingChange(winner + 3, loser, 'win'), 2), '0.63');
  assert.equal(formatFixed(coreRatingChange(winner, loser + 3, 'win'), 2), '1.23');
});

test('a favourite 10 or more points ahead gains nothing for winning, by any margin', () => {
  const r = pointsExchange({ ratingA: 90.03, ratingB: 80, outcome: 'a-big' });
  assert.equal(r.exchanged, 0);
  assert.equal(r.changeA, 0);
  assert.equal(r.changeB, 0);
  assert.ok(!Object.is(r.changeB, -0));
});

test('the caps: changes run from 0 to 2 for a result, before weightings', () => {
  assert.equal(coreRatingChange(95, 70, 'win'), 0);
  assert.equal(coreRatingChange(70, 95, 'win'), 2);
  assert.equal(coreRatingChange(95, 70, 'draw'), -1);
  assert.equal(coreRatingChange(70, 95, 'draw'), 1);
  assert.equal(coreRatingChange(80, 80, 'win'), 1);
  assert.equal(coreRatingChange(80, 80, 'draw'), 0);
  // The most any one match can move a rating: an upset by more than 15 at a World Cup.
  const most = pointsExchange({ ratingA: 60, ratingB: 90, outcome: 'a-big', worldCup: true });
  assert.equal(most.exchanged, 6);
});

test('every exchange is zero-sum, and the preview covers all five outcomes', () => {
  const rows = allOutcomes({ ratingA: 82.4, ratingB: 79.1, worldCup: false });
  assert.deepEqual(rows.map((r) => r.outcome.id), OUTCOMES.map((o) => o.id));
  for (const r of rows) {
    assert.ok(Math.abs(r.changeA + r.changeB) < 1e-12);
    assert.ok(Math.abs(r.newRatingA + r.newRatingB - (82.4 + 79.1)) < 1e-9);
  }
  // A win can never cost points and a loss can never earn them.
  assert.ok(rows[0].changeA >= 0 && rows[1].changeA >= 0);
  assert.ok(rows[3].changeA <= 0 && rows[4].changeA <= 0);
});

test('the page’s illustrative match: 82.40 against 79.10', () => {
  const [aBig, a, draw, b, bBig] = allOutcomes({ ratingA: 82.4, ratingB: 79.1 });
  assert.equal(formatFixed(a.exchanged, 2), '0.67');
  assert.equal(formatFixed(aBig.exchanged, 3), '1.005');
  assert.equal(formatFixed(draw.exchanged, 2), '0.33');
  assert.equal(formatFixed(b.exchanged, 2), '1.33');
  assert.equal(formatFixed(bBig.exchanged, 3), '1.995');
});

test('ratings must sit between 0 and 100', () => {
  assert.deepEqual(validateRatings({ ratingA: 82.4, ratingB: 79.1 }), []);
  assert.ok(validateRatings({ ratingA: 101, ratingB: 79.1 }).some((e) => e.includes('Team A')));
  assert.ok(validateRatings({ ratingA: 82.4, ratingB: Number.NaN }).some((e) => e.includes('Team B')));
});
