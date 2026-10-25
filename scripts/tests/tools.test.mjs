// The calculators' formulas. Reference values come from the sources each tool
// page cites, so a regression here means a published page would be wrong:
//   - NFL Record & Fact Book: the 2011 passer-rating example rates 122.5
//   - NCAA Football Statisticians' Manual: its sample compiles to 161.71
//   - Official Baseball Rules 9.21(e): 9 1/3 innings and 3 earned runs = 2.89 ERA
//   - MLB.com glossary: 1-for-5 with a double is an ISO of .200; 2-for-5 with a
//     home run and a strikeout is a BABIP of .333
//   - Basketball-Reference glossary: 4-for-10 with two threes = 50% eFG
//   - USGA Rules of Handicapping 5.1a, 5.2a, 5.2b, 6.1a, 6.2a and Appendix C
//   - Ryder (2004): 4 goals for, 3 against = .640 by James's formula
//   - Fantasy Postseason draft help: the snake, 3RR and straight orders
// Several tests also pin claims the tool pages make in prose.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatFixed,
  formatPercent,
  formatRate,
  parseNumber,
  roundHalfUp,
} from '../../src/lib/tools/format.mjs';
import {
  PASSER_RATING_COMPONENT_CAP,
  PASSER_RATING_MAX,
  ncaaPassingEfficiency,
  passerRating,
  validatePasserLine,
} from '../../src/lib/tools/football.mjs';
import {
  battingStats,
  fipConstantFromLeague,
  formatInnings,
  parseInnings,
  pitchingStats,
  validateBattingLine,
  validateLeagueTotals,
  validatePitchingLine,
} from '../../src/lib/tools/baseball.mjs';
import { shootingEfficiency, validateShootingLine } from '../../src/lib/tools/basketball.mjs';
import { goalieStats, validateGoalieLine } from '../../src/lib/tools/hockey.mjs';
import {
  DIFFERENTIALS_TABLE,
  HANDICAP_ALLOWANCES,
  courseHandicap,
  formatHandicap,
  handicapIndex,
  parseDifferentials,
  playingHandicap,
  scoreDifferential,
  tableRowFor,
  validateAllowance,
  validateCourseInput,
  validateDifferentials,
  validateRound,
} from '../../src/lib/tools/golf.mjs';
import {
  PYTHAGOREAN_PRESETS,
  pythagoreanExpectation,
  validatePythagorean,
} from '../../src/lib/tools/pythagorean.mjs';
import {
  buildBoard,
  cryptoRandomInt,
  fisherYates,
  isForwardRound,
  parseTeamNames,
  pickFor,
  picksForSlot,
  seededRandomInt,
  snakeDraftPicks,
  snakePick,
  snakeWaits,
  validateDraft,
  validateSnake,
} from '../../src/lib/tools/draft.mjs';

const close = (actual, expected, tolerance = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

/* ----------------------------------------------------------------- format */

test('roundHalfUp rounds .5 toward +Infinity and absorbs float error', () => {
  assert.equal(roundHalfUp(2.35, 1), 2.4);
  assert.equal(roundHalfUp(-2.35, 1), -2.3);
  assert.equal(roundHalfUp(16.95, 1), 17); // stored as 16.9499999…
  assert.equal(roundHalfUp(1.005, 2), 1.01);
  assert.equal(roundHalfUp(18.5, 0), 19);
  assert.equal(roundHalfUp(-2.5, 0), -2);
  assert.equal(roundHalfUp(-0.04, 1), 0);
  assert.ok(!Object.is(roundHalfUp(-0.04, 1), -0));
});

test('number parsing accepts separators and rejects junk', () => {
  assert.equal(parseNumber('4,643'), 4643);
  assert.equal(parseNumber(' 12.5 '), 12.5);
  assert.equal(parseNumber('−3'), -3);
  assert.ok(Number.isNaN(parseNumber('')));
  assert.ok(Number.isNaN(parseNumber('12a')));
  assert.ok(Number.isNaN(parseNumber('1.2.3')));
});

test('rates print baseball-style', () => {
  assert.equal(formatRate(0.3), '.300');
  assert.equal(formatRate(1.0237), '1.024');
  assert.equal(formatRate(0.9155), '.916');
  assert.equal(formatPercent(0.63776), '63.8%');
  assert.equal(formatFixed(2.885, 2), '2.89');
});

/* ------------------------------------------------------------- passer rating */

test('passer rating reproduces the NFL Record & Fact Book example (122.5)', () => {
  const line = { attempts: 502, completions: 343, yards: 4643, touchdowns: 45, interceptions: 6 };
  assert.deepEqual(validatePasserLine(line), []);
  const result = passerRating(line);
  // The Fact Book prints each component to three places.
  assert.equal(formatFixed(result.components.completion, 3), '1.916');
  assert.equal(formatFixed(result.components.yards, 3), '1.562');
  assert.equal(formatFixed(result.components.touchdowns, 3), '1.793');
  assert.equal(formatFixed(result.components.interceptions, 3), '2.076');
  assert.equal(formatFixed(result.rating, 1), '122.5');
});

test('passer rating floors and caps every component', () => {
  const perfect = passerRating({ attempts: 20, completions: 20, yards: 300, touchdowns: 5, interceptions: 0 });
  for (const value of Object.values(perfect.components)) assert.equal(value, PASSER_RATING_COMPONENT_CAP);
  close(perfect.rating, PASSER_RATING_MAX);
  assert.equal(formatFixed(PASSER_RATING_MAX, 1), '158.3');

  const floor = passerRating({ attempts: 10, completions: 2, yards: 20, touchdowns: 0, interceptions: 2 });
  for (const value of Object.values(floor.components)) assert.equal(value, 0);
  assert.equal(floor.rating, 0);
});

test('a passer rating of 66.7 is the formula’s average standard (1.000 per component)', () => {
  // 50% completions, 7 yards per attempt, 5% touchdowns, 5.5% interceptions → 1.000 each.
  const r = passerRating({ attempts: 200, completions: 100, yards: 1400, touchdowns: 10, interceptions: 11 });
  for (const value of Object.values(r.components)) close(value, 1);
  assert.equal(formatFixed(r.rating, 1), '66.7');
});

test('NCAA passing efficiency reproduces the statisticians’ manual sample (161.71)', () => {
  const line = { attempts: 166, completions: 98, yards: 1567, touchdowns: 16, interceptions: 7 };
  const r = ncaaPassingEfficiency(line);
  assert.equal(r.factors.completion, 59.04);
  assert.equal(r.factors.yards, 79.3);
  assert.equal(r.factors.touchdowns, 31.81);
  assert.equal(r.factors.interceptions, 8.44);
  assert.equal(formatFixed(r.rating, 2), '161.71');
});

test('passer rating rejects impossible lines', () => {
  assert.ok(validatePasserLine({ attempts: 0, completions: 0, yards: 0, touchdowns: 0, interceptions: 0 }).length > 0);
  assert.ok(
    validatePasserLine({ attempts: 10, completions: 11, yards: 50, touchdowns: 0, interceptions: 0 }).some((e) =>
      e.includes('Completions cannot')
    )
  );
  assert.ok(validatePasserLine({ attempts: 10, completions: 3, yards: 50, touchdowns: 4, interceptions: 0 }).length > 0);
  assert.ok(validatePasserLine({ attempts: 10, completions: 8, yards: 50, touchdowns: 1, interceptions: 3 }).length > 0);
  assert.ok(validatePasserLine({ attempts: 10.5, completions: 8, yards: 50, touchdowns: 1, interceptions: 0 }).length > 0);
  // Negative passing yards are possible and allowed.
  assert.deepEqual(validatePasserLine({ attempts: 3, completions: 1, yards: -4, touchdowns: 0, interceptions: 0 }), []);
});

/* ------------------------------------------------------------------ batting */

const SEASON_LINE = {
  atBats: 600,
  hits: 180,
  doubles: 35,
  triples: 3,
  homeRuns: 30,
  walks: 70,
  hitByPitch: 5,
  sacrificeFlies: 5,
  strikeouts: 110,
};

test('batting stats follow Official Baseball Rule 9.21', () => {
  assert.deepEqual(validateBattingLine(SEASON_LINE), []);
  const s = battingStats(SEASON_LINE);
  assert.equal(s.singles, 112);
  assert.equal(s.totalBases, 311);
  assert.equal(formatRate(s.avg), '.300');
  assert.equal(formatRate(s.obp), '.375'); // 255 / 680
  assert.equal(formatRate(s.slg), '.518');
  assert.equal(formatRate(s.ops), '.893');
  assert.equal(formatRate(s.iso), '.218');
  assert.equal(s.ballsInPlay, 465); // 600 − 110 − 30 + 5
  assert.equal(formatRate(s.babip), '.323'); // 150 / 465
});

test('isolated power and BABIP match the MLB glossary examples', () => {
  const base = { walks: 0, hitByPitch: 0, sacrificeFlies: 0, triples: 0, homeRuns: 0 };
  // 1-for-5 with a double, and 2-for-5 with a single and a double: both .200.
  assert.equal(formatRate(battingStats({ ...base, atBats: 5, hits: 1, doubles: 1 }).iso), '.200');
  assert.equal(formatRate(battingStats({ ...base, atBats: 5, hits: 2, doubles: 1 }).iso), '.200');
  // 2-for-5 with a home run and a strikeout: 1-for-3 on balls in play.
  const babip = battingStats({ ...base, atBats: 5, hits: 2, doubles: 0, homeRuns: 1, strikeouts: 1 });
  assert.equal(formatRate(babip.babip), '.333');
});

test('BABIP is omitted without strikeouts or with no ball in play', () => {
  const base = { walks: 0, hitByPitch: 0, sacrificeFlies: 0, doubles: 0, triples: 0 };
  assert.equal(battingStats({ ...base, atBats: 4, hits: 1, homeRuns: 0 }).babip, null);
  assert.equal(battingStats({ ...base, atBats: 2, hits: 1, homeRuns: 1, strikeouts: 1 }).babip, null);
});

test('a sacrifice fly lowers OBP but not AVG', () => {
  const base = { atBats: 3, hits: 1, doubles: 0, triples: 0, homeRuns: 0, walks: 0, hitByPitch: 0 };
  const without = battingStats({ ...base, sacrificeFlies: 0 });
  const withFly = battingStats({ ...base, sacrificeFlies: 1 });
  assert.equal(without.avg, withFly.avg);
  assert.ok(withFly.obp < without.obp);
  assert.equal(formatRate(withFly.obp), '.250');
});

test('batting validation catches impossible lines', () => {
  const ok = { atBats: 4, hits: 2, doubles: 1, triples: 0, homeRuns: 0, walks: 0, hitByPitch: 0, sacrificeFlies: 0 };
  assert.deepEqual(validateBattingLine(ok), []);
  assert.ok(validateBattingLine({ ...ok, atBats: 0 }).length > 0);
  assert.ok(validateBattingLine({ ...ok, hits: 5 }).length > 0);
  assert.ok(validateBattingLine({ ...ok, doubles: 2, homeRuns: 1 }).length > 0);
  assert.ok(validateBattingLine({ ...ok, strikeouts: 3 }).length > 0); // 2 hits + 3 K > 4 AB
});

/* ----------------------------------------------------------------- pitching */

test('innings notation counts outs', () => {
  assert.equal(parseInnings('6'), 18);
  assert.equal(parseInnings('6.1'), 19);
  assert.equal(parseInnings('6.2'), 20);
  assert.equal(parseInnings('180.2'), 542);
  assert.ok(Number.isNaN(parseInnings('6.3')));
  assert.ok(Number.isNaN(parseInnings('6.15')));
  assert.ok(Number.isNaN(parseInnings('-1')));
  assert.equal(formatInnings(28), '9.1');
});

test('ERA reproduces the Official Baseball Rules example (2.89)', () => {
  const line = { outs: parseInnings('9.1'), earnedRuns: 3, hits: 0, walks: 0, strikeouts: 0 };
  assert.deepEqual(validatePitchingLine(line), []);
  assert.equal(formatFixed(pitchingStats(line).era, 2), '2.89');
});

test('ERA can be scaled to a shorter game without changing the MLB figure', () => {
  const line = { outs: parseInnings('21'), earnedRuns: 7, hits: 0, walks: 0, strikeouts: 0, gameInnings: 7 };
  assert.deepEqual(validatePitchingLine(line), []);
  const s = pitchingStats(line);
  assert.equal(formatFixed(s.era, 2), '3.00'); // 9 × 7 / 21
  assert.equal(formatFixed(s.eraPerGame, 2), '2.33'); // 7 × 7 / 21
  assert.ok(validatePitchingLine({ ...line, gameInnings: 0 }).length > 0);
});

test('WHIP, K/9, BB/9, HR/9, K/BB and FIP', () => {
  const line = {
    outs: parseInnings('180.2'),
    earnedRuns: 62,
    hits: 160,
    walks: 50,
    strikeouts: 190,
    homeRuns: 20,
    hitByPitch: 6,
    fipConstant: 3.1,
  };
  assert.deepEqual(validatePitchingLine(line), []);
  const s = pitchingStats(line);
  close(s.innings, 542 / 3);
  close(s.whip, 210 / (542 / 3));
  close(s.k9, (9 * 190) / (542 / 3));
  close(s.bb9, (9 * 50) / (542 / 3));
  close(s.hr9, (9 * 20) / (542 / 3));
  close(s.strikeoutsPerWalk, 3.8);
  close(s.fip, (13 * 20 + 3 * 56 - 2 * 190) / (542 / 3) + 3.1);

  const noFip = pitchingStats({ ...line, fipConstant: null });
  assert.equal(noFip.fip, null);
  assert.equal(pitchingStats({ ...line, walks: 0 }).strikeoutsPerWalk, null);
  assert.equal(pitchingStats({ ...line, homeRuns: null, fipConstant: null }).hr9, null);
});

test('pitching validation requires FIP inputs only when a constant is given', () => {
  const base = { outs: 18, earnedRuns: 2, hits: 5, walks: 1, strikeouts: 7 };
  assert.deepEqual(validatePitchingLine(base), []);
  assert.ok(validatePitchingLine({ ...base, fipConstant: 3.1 }).length > 0);
  assert.deepEqual(validatePitchingLine({ ...base, fipConstant: 3.1, homeRuns: 1, hitByPitch: 0 }), []);
  assert.ok(validatePitchingLine({ ...base, outs: Number.NaN }).length > 0);
  assert.ok(validatePitchingLine({ ...base, outs: 0 }).length > 0);
});

test('the FIP constant from league totals makes league FIP equal league ERA', () => {
  const league = { leagueEra: 4.0, homeRuns: 5000, walks: 15000, hitByPitch: 1800, strikeouts: 40000, outs: 43000 * 3 };
  assert.deepEqual(validateLeagueTotals(league), []);
  const constant = fipConstantFromLeague(league);
  close(constant, 4 - (13 * 5000 + 3 * 16800 - 2 * 40000) / 43000);
  // Applying it to the league's own line returns the league ERA.
  const leagueFip = pitchingStats({
    outs: league.outs,
    earnedRuns: 0,
    hits: 0,
    walks: league.walks,
    strikeouts: league.strikeouts,
    homeRuns: league.homeRuns,
    hitByPitch: league.hitByPitch,
    fipConstant: constant,
  }).fip;
  close(leagueFip, 4.0);
  assert.ok(validateLeagueTotals({ ...league, outs: Number.NaN }).length > 0);
});

/* --------------------------------------------------------------- basketball */

test('eFG% matches the Basketball-Reference example', () => {
  const a = shootingEfficiency({ fieldGoals: 4, fieldGoalAttempts: 10, threePointers: 2, freeThrows: 0, freeThrowAttempts: 0 });
  const b = shootingEfficiency({ fieldGoals: 5, fieldGoalAttempts: 10, threePointers: 0, freeThrows: 0, freeThrowAttempts: 0 });
  assert.equal(a.points, 10);
  assert.equal(b.points, 10);
  close(a.effectiveFieldGoalPct, 0.5);
  close(b.effectiveFieldGoalPct, 0.5);
});

test('TS% uses 0.44 free-throw attempts and can exceed 100% in tiny samples', () => {
  const s = shootingEfficiency({
    fieldGoals: 10,
    fieldGoalAttempts: 20,
    threePointers: 4,
    threePointAttempts: 9,
    freeThrows: 6,
    freeThrowAttempts: 8,
  });
  assert.equal(s.points, 30);
  close(s.trueShootingAttempts, 23.52);
  assert.equal(formatPercent(s.trueShootingPct), '63.8%');
  assert.equal(formatPercent(s.effectiveFieldGoalPct), '60.0%');
  assert.equal(formatPercent(s.threePointPct), '44.4%');
  assert.equal(formatPercent(s.freeThrowPct), '75.0%');

  const hot = shootingEfficiency({ fieldGoals: 1, fieldGoalAttempts: 1, threePointers: 1, freeThrows: 0, freeThrowAttempts: 0 });
  close(hot.trueShootingPct, 1.5);
  assert.equal(hot.freeThrowPct, null);
  assert.equal(hot.threePointPct, null);
});

test('shooting validation', () => {
  const ok = { fieldGoals: 5, fieldGoalAttempts: 10, threePointers: 2, freeThrows: 3, freeThrowAttempts: 4 };
  assert.deepEqual(validateShootingLine(ok), []);
  assert.ok(validateShootingLine({ ...ok, fieldGoalAttempts: 0, fieldGoals: 0, threePointers: 0 }).length > 0);
  assert.ok(validateShootingLine({ ...ok, threePointers: 6 }).length > 0);
  assert.ok(validateShootingLine({ ...ok, freeThrows: 5 }).length > 0);
  assert.ok(validateShootingLine({ ...ok, threePointAttempts: 1 }).length > 0); // 2 made of 1 attempted
  assert.ok(validateShootingLine({ ...ok, threePointAttempts: 11 }).length > 0); // more threes than FGA
});

/* ------------------------------------------------------------------- hockey */

test('save percentage and GAA', () => {
  const s = goalieStats({ shotsAgainst: 1800, goalsAgainst: 150, minutes: 3600, seconds: 0 });
  assert.equal(s.saves, 1650);
  assert.equal(formatRate(s.savePct), '.917');
  assert.equal(formatFixed(s.goalsAgainstAverage, 2), '2.50');
  assert.equal(formatFixed(s.shotsAgainstPerGame, 1), '30.0');

  const partial = goalieStats({ shotsAgainst: 30, goalsAgainst: 2, minutes: 58, seconds: 30 });
  close(partial.minutesPlayed, 58.5);
  close(partial.goalsAgainstAverage, 120 / 58.5);

  // The same rate expressed per a shorter game.
  const short = goalieStats({ shotsAgainst: 1800, goalsAgainst: 150, minutes: 3600, seconds: 0, gameLength: 45 });
  assert.equal(formatFixed(short.goalsAgainstAverage, 2), '1.88');
});

test('the busy-and-quiet-defence example on the goalie page', () => {
  // 92% saved behind 40 and 25 shots per 60 minutes: 3.2 and 2.0 goals.
  close(goalieStats({ shotsAgainst: 40, goalsAgainst: 3.2, minutes: 60, seconds: 0 }).goalsAgainstAverage, 3.2);
  close(goalieStats({ shotsAgainst: 25, goalsAgainst: 2, minutes: 60, seconds: 0 }).savePct, 0.92);
});

test('goalie validation', () => {
  assert.deepEqual(validateGoalieLine({ shotsAgainst: 30, goalsAgainst: 2, minutes: 60, seconds: 0 }), []);
  assert.ok(validateGoalieLine({ shotsAgainst: 3, goalsAgainst: 4, minutes: 60, seconds: 0 }).length > 0);
  assert.ok(validateGoalieLine({ shotsAgainst: 3, goalsAgainst: 1, minutes: 0, seconds: 0 }).length > 0);
  assert.ok(validateGoalieLine({ shotsAgainst: 3, goalsAgainst: 1, minutes: 10, seconds: 60 }).length > 0);
  assert.ok(validateGoalieLine({ shotsAgainst: 3, goalsAgainst: 1, minutes: 10, seconds: 0, gameLength: 5 }).length > 0);
});

/* --------------------------------------------------------------------- golf */

test('course and playing handicap reproduce Rule 6.2a/1’s double-rounding example', () => {
  // Course Rating 71.0, Slope 125, par 71, four-ball stroke play at 85%.
  const tees = { slopeRating: 125, courseRating: 71.0, par: 71 };
  const a = courseHandicap({ ...tees, handicapIndex: 8.6 });
  const b = courseHandicap({ ...tees, handicapIndex: 10.3 });
  close(a.exact, 9.5133, 1e-4);
  close(b.exact, 11.3938, 1e-4);
  // Rounding the course handicap first gives both players 9 — the problem the rule describes.
  assert.equal(playingHandicap({ courseHandicapExact: a.rounded, percent: 85 }).rounded, 9);
  assert.equal(playingHandicap({ courseHandicapExact: b.rounded, percent: 85 }).rounded, 9);
  // Applying the allowance to the unrounded value gives 8 and 10, the rule's published answer.
  assert.equal(playingHandicap({ courseHandicapExact: a.exact, percent: 85 }).rounded, 8);
  assert.equal(playingHandicap({ courseHandicapExact: b.exact, percent: 85 }).rounded, 10);
});

test('score differential follows Rule 5.1a, including .5 rounding up', () => {
  const r = scoreDifferential({ adjustedGrossScore: 92, courseRating: 71.5, slopeRating: 128, pcc: 0 });
  close(r.exact, (113 / 128) * 20.5);
  assert.equal(r.rounded, 18.1);
  // (113 / 100) × 15 = 16.95 exactly in decimal: rounds up to 17.0.
  assert.equal(scoreDifferential({ adjustedGrossScore: 87, courseRating: 72, slopeRating: 100, pcc: 0 }).rounded, 17);
  // A PCC of +1 is subtracted from the score.
  assert.equal(scoreDifferential({ adjustedGrossScore: 85, courseRating: 72, slopeRating: 113, pcc: 1 }).rounded, 12);
  // Better than the Course Rating gives a negative differential.
  assert.equal(scoreDifferential({ adjustedGrossScore: 70, courseRating: 72.3, slopeRating: 113, pcc: 0 }).rounded, -2.3);
});

test('round validation', () => {
  const ok = { adjustedGrossScore: 92, courseRating: 71.5, slopeRating: 128, pcc: 0 };
  assert.deepEqual(validateRound(ok), []);
  assert.ok(validateRound({ ...ok, slopeRating: 160 }).length > 0);
  assert.ok(validateRound({ ...ok, pcc: 4 }).length > 0);
  assert.ok(validateRound({ ...ok, pcc: 0.5 }).length > 0);
  assert.ok(validateRound({ ...ok, adjustedGrossScore: 91.5 }).length > 0);
});

test('the Rule 5.2a table is complete and contiguous from 3 to 20', () => {
  for (let n = 3; n <= 20; n++) assert.ok(tableRowFor(n), `no row for ${n}`);
  assert.equal(tableRowFor(2), undefined);
  assert.equal(DIFFERENTIALS_TABLE[0].adjustment, -2);
  assert.deepEqual(tableRowFor(6), { from: 6, to: 6, use: 2, adjustment: -1 });
  assert.equal(tableRowFor(25).use, 8);
});

test('Handicap Index for fewer than 20, exactly 20 and more than 20 differentials', () => {
  // 3 differentials: lowest 1, minus 2.0.
  assert.equal(handicapIndex([20.1, 18.4, 22.0]).index, 16.4);
  // 6: average of lowest 2, minus 1.0 → (15.0 + 16.0) / 2 − 1 = 14.5.
  assert.equal(handicapIndex([15, 16, 17, 18, 19, 20]).index, 14.5);
  // The page's worked example: five differentials, lowest one, no adjustment.
  assert.equal(handicapIndex([18.1, 20.4, 16.9, 22.0, 19.3]).index, 16.9);
  // 20: average of the lowest 8.
  const twenty = Array.from({ length: 20 }, (_, i) => 10 + i); // 10..29
  const r = handicapIndex(twenty);
  assert.equal(r.used.length, 8);
  assert.equal(r.index, 13.5); // (10+…+17)/8
  // 22 entered: only the most recent 20 count (the two oldest drop off).
  const r22 = handicapIndex([1, 2, ...twenty]);
  assert.equal(r22.ignored, 2);
  assert.equal(r22.index, 13.5);
  // Capped at 54.0.
  assert.equal(handicapIndex([60, 61, 62]).index, 54);
  assert.equal(handicapIndex([60, 61, 62]).capped, true);
});

test('differential list parsing and validation', () => {
  assert.deepEqual(parseDifferentials('18.1, 20.4\n16.9 22.0;19.3'), [18.1, 20.4, 16.9, 22, 19.3]);
  assert.ok(validateDifferentials([18.1, 20.4]).length > 0);
  assert.ok(validateDifferentials(parseDifferentials('18.1, x, 20')).length > 0);
  assert.deepEqual(validateDifferentials([18.1, 20.4, 16.9]), []);
});

test('course handicap follows Rule 6.1a', () => {
  const r = courseHandicap({ handicapIndex: 16.9, slopeRating: 128, courseRating: 71.5, par: 72 });
  close(r.exact, 16.9 * (128 / 113) - 0.5);
  assert.equal(r.rounded, 19);
  // A plus handicap stays a plus handicap.
  const plus = courseHandicap({ handicapIndex: -1.2, slopeRating: 113, courseRating: 72, par: 72 });
  assert.equal(plus.rounded, -1);
  assert.equal(formatHandicap(plus.rounded, 0), '+1');
  assert.equal(formatHandicap(16.94, 1), '16.9');
  assert.deepEqual(validateCourseInput({ handicapIndex: 16.9, slopeRating: 128, courseRating: 71.5, par: 72 }), []);
  assert.ok(validateCourseInput({ handicapIndex: 60, slopeRating: 128, courseRating: 71.5, par: 72 }).length > 0);
});

test('playing handicap applies the allowance to the unrounded course handicap (Rule 6.2a)', () => {
  const ch = courseHandicap({ handicapIndex: 16.9, slopeRating: 128, courseRating: 71.5, par: 72 });
  const stroke = playingHandicap({ courseHandicapExact: ch.exact, percent: 95 });
  close(stroke.exact, ch.exact * 0.95);
  assert.equal(stroke.rounded, 18); // 17.71 → 18
  // Applying 95% to the rounded 19 would also give 18 here; with 18.4 it differs:
  assert.equal(playingHandicap({ courseHandicapExact: 18.4, percent: 95 }).rounded, 17); // 17.48
  assert.equal(playingHandicap({ courseHandicapExact: 18, percent: 95 }).rounded, 17); // 17.1
  assert.equal(playingHandicap({ courseHandicapExact: 10.5, percent: 100 }).rounded, 11);
  // Appendix C's recommended allowances for single-player formats.
  assert.deepEqual(
    Object.fromEntries(HANDICAP_ALLOWANCES.map((a) => [a.id, a.percent])),
    {
      'stroke-individual': 95,
      'stableford-individual': 95,
      'par-bogey-individual': 95,
      'maximum-score-individual': 95,
      'stroke-four-ball': 85,
      'stableford-four-ball': 85,
      'match-individual': 100,
      'match-four-ball': 90,
    }
  );
  assert.deepEqual(validateAllowance(95), []);
  assert.ok(validateAllowance(0).length > 0);
  assert.ok(validateAllowance(120).length > 0);
});

/* -------------------------------------------------------------- pythagorean */

test('Pythagorean expectation and its presets', () => {
  for (const preset of PYTHAGOREAN_PRESETS) {
    close(pythagoreanExpectation({ pointsFor: 700, pointsAgainst: 700, exponent: preset.exponent, games: 162 }).winPct, 0.5);
  }
  const james = pythagoreanExpectation({ pointsFor: 800, pointsAgainst: 700, exponent: 2, games: 162 });
  close(james.winPct, 640000 / (640000 + 490000));
  close(james.expectedWins + james.expectedLosses, 162);
  // Ryder (2004): 4 goals for and 3 against gives .640 with James's exponent.
  const hockey = PYTHAGOREAN_PRESETS.find((p) => p.id === 'hockey-ryder');
  assert.equal(formatRate(pythagoreanExpectation({ pointsFor: 4, pointsAgainst: 3, exponent: hockey.exponent, games: 1 }).winPct), '.640');
  // Large basketball totals with exponent 14 do not overflow.
  const hoops = pythagoreanExpectation({ pointsFor: 9184, pointsAgainst: 8856, exponent: 14, games: 82 });
  assert.ok(hoops.winPct > 0.5 && hoops.winPct < 1);
  assert.equal(pythagoreanExpectation({ pointsFor: 0, pointsAgainst: 5, exponent: 2, games: 10 }).winPct, 0);
});

test('the Pythagorean page’s prose claims hold', () => {
  // "the 100-run margin is worth about ten wins above an even 81–81 record with either exponent"
  for (const exponent of [2, 1.83]) {
    const extra = pythagoreanExpectation({ pointsFor: 800, pointsAgainst: 700, exponent, games: 162 }).expectedWins - 81;
    assert.ok(extra > 9.5 && extra < 11, `exponent ${exponent}: ${extra}`);
  }
  // "outscores its opponents by less than 4% yet projects to win well over half"
  assert.ok(112 / 108 - 1 < 0.04);
  assert.ok(pythagoreanExpectation({ pointsFor: 9184, pointsAgainst: 8856, exponent: 14, games: 82 }).winPct > 0.6);
});

test('actual record and rest-of-season projection', () => {
  const r = pythagoreanExpectation({ pointsFor: 400, pointsAgainst: 350, exponent: 2, games: 80, actualWins: 50, gamesRemaining: 82 });
  close(r.winsAboveExpected, 50 - r.expectedWins);
  close(r.projectedFinalWins, 50 + r.winPct * 82);
  assert.equal(r.projectedFinalGames, 162);
  const bare = pythagoreanExpectation({ pointsFor: 400, pointsAgainst: 350, exponent: 2, games: 80 });
  assert.equal(bare.winsAboveExpected, null);
  assert.equal(bare.projectedFinalWins, null);
});

test('Pythagorean validation', () => {
  assert.deepEqual(validatePythagorean({ pointsFor: 800, pointsAgainst: 700, exponent: 1.83, games: 162 }), []);
  assert.ok(validatePythagorean({ pointsFor: 0, pointsAgainst: 0, exponent: 2, games: 162 }).length > 0);
  assert.ok(validatePythagorean({ pointsFor: 800, pointsAgainst: 700, exponent: 0, games: 162 }).length > 0);
  assert.ok(validatePythagorean({ pointsFor: 800, pointsAgainst: 700, exponent: 2, games: 0 }).length > 0);
  assert.ok(validatePythagorean({ pointsFor: 800, pointsAgainst: 700, exponent: 2, games: 10, actualWins: 11 }).length > 0);
});

/* -------------------------------------------------------------- draft order */

test('snake draft order reverses every round', () => {
  assert.deepEqual(
    [1, 2, 3, 4].map((round) => snakePick({ teams: 12, slot: 5, round }).overall),
    [5, 20, 29, 44]
  );
  // The last slot picks back to back at the turn (ESPN: 1-10, 10-1, …).
  assert.deepEqual(
    [1, 2].map((round) => snakePick({ teams: 10, slot: 10, round }).overall),
    [10, 11]
  );
  assert.deepEqual(
    snakeDraftPicks({ teams: 12, slot: 5, rounds: 4 }).map((p) => p.waitBefore),
    [4, 14, 8, 14]
  );
  assert.deepEqual(snakeWaits(12, 5), { afterOddRound: 14, afterEvenRound: 8 });
  for (let slot = 1; slot <= 12; slot++) {
    const { afterOddRound, afterEvenRound } = snakeWaits(12, slot);
    assert.equal(afterOddRound + afterEvenRound, 2 * (12 - 1));
  }
});

test('third-round reversal and straight orders match the published definitions', () => {
  // Fantasy Postseason's 3RR example: rounds 1–5 run forward, reverse, reverse, forward, reverse.
  assert.deepEqual(
    [1, 2, 3, 4, 5].map((round) => isForwardRound('third-round-reversal', round)),
    [true, false, false, true, false]
  );
  // Slot 1 in a 12-team 3RR league picks 1, 24 and 36; slot 12 picks 12, 13 and 25.
  assert.deepEqual(picksForSlot({ type: 'third-round-reversal', teams: 12, slot: 1, rounds: 3 }).map((p) => p.overall), [1, 24, 36]);
  assert.deepEqual(picksForSlot({ type: 'third-round-reversal', teams: 12, slot: 12, rounds: 3 }).map((p) => p.overall), [12, 13, 25]);
  // Straight: the same order every round.
  assert.deepEqual([1, 2, 3].map((round) => pickFor({ type: 'straight', teams: 12, slot: 5, round }).overall), [5, 17, 29]);
});

test('every pick is made exactly once in every order type', () => {
  const teams = 10;
  const rounds = 15;
  for (const type of ['snake', 'third-round-reversal', 'straight']) {
    const all = [];
    for (let slot = 1; slot <= teams; slot++) {
      all.push(...picksForSlot({ type, teams, slot, rounds }).map((p) => p.overall));
    }
    all.sort((a, b) => a - b);
    assert.deepEqual(all, Array.from({ length: teams * rounds }, (_, i) => i + 1), type);
  }
});

test('the board lists teams in pick order', () => {
  const board = buildBoard({ order: ['A', 'B', 'C'], type: 'snake', rounds: 3 });
  assert.deepEqual(board.map((r) => r.picks.map((p) => p.team).join('')), ['ABC', 'CBA', 'ABC']);
  assert.deepEqual(board[1].picks.map((p) => p.overall), [4, 5, 6]);
  const rr = buildBoard({ order: ['A', 'B', 'C'], type: 'third-round-reversal', rounds: 4 });
  assert.deepEqual(rr.map((r) => r.picks.map((p) => p.team).join('')), ['ABC', 'CBA', 'CBA', 'ABC']);
});

test('Fisher–Yates keeps every team and is uniform', () => {
  const teams = ['A', 'B', 'C'];
  const random = seededRandomInt('uniformity check');
  const counts = new Map();
  const trials = 60000;
  for (let i = 0; i < trials; i++) {
    const order = fisherYates(teams, random);
    assert.deepEqual([...order].sort(), teams);
    const key = order.join('');
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  assert.equal(counts.size, 6);
  for (const n of counts.values()) assert.ok(Math.abs(n - trials / 6) < trials * 0.02, `count ${n}`);
});

test('seeded draws are reproducible; crypto draws use rejection sampling', () => {
  const names = Array.from({ length: 12 }, (_, i) => `Team ${i + 1}`);
  assert.deepEqual(fisherYates(names, seededRandomInt('league 2026')), fisherYates(names, seededRandomInt('league 2026')));
  assert.notDeepEqual(fisherYates(names, seededRandomInt('league 2026')), fisherYates(names, seededRandomInt('league 2027')));

  // A fake source that first returns a value in the biased tail, then a usable one.
  const values = [0xffffffff, 7];
  const fake = (buffer) => {
    buffer[0] = values.shift();
    return buffer;
  };
  assert.equal(cryptoRandomInt(fake)(10), 7);
  if (globalThis.crypto?.getRandomValues) {
    const real = cryptoRandomInt((b) => globalThis.crypto.getRandomValues(b));
    for (let i = 0; i < 1000; i++) {
      const v = real(12);
      assert.ok(Number.isInteger(v) && v >= 0 && v < 12);
    }
  }
});

test('team names and draft validation', () => {
  assert.deepEqual(parseTeamNames('  Hawks \n\nOwls\r\nFoxes  '), ['Hawks', 'Owls', 'Foxes']);
  assert.deepEqual(validateDraft({ names: ['A', 'B'], rounds: 15 }), []);
  assert.ok(validateDraft({ names: ['A'], rounds: 15 }).length > 0);
  assert.ok(validateDraft({ names: ['A', 'a'], rounds: 15 }).length > 0);
  assert.ok(validateDraft({ names: ['A', 'B'], rounds: 0 }).length > 0);
  assert.deepEqual(validateSnake({ teams: 12, slot: 5, rounds: 15 }), []);
  assert.ok(validateSnake({ teams: 12, slot: 13, rounds: 15 }).length > 0);
});
