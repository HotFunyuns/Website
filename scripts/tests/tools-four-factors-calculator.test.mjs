// Four factors, possessions, pace and ratings (src/lib/tools/basketball-team.mjs).
//
// Reference values, opened 2026-10-02:
//   - https://www.basketball-reference.com/about/factors.html works each factor
//     through for one 2004-05 team season: eFG .534 / .478, TOV% .124 / .120,
//     ORB% .275, DRB% .683, FT/FGA .222 / .176.
//   - https://www.basketball-reference.com/teams/PHO/2005.html — the same
//     season's team and opponent totals (team minutes 19,780; points 9,054 and
//     8,470) and its printed ORtg 114.5, DRtg 107.1 and Pace 95.9, which the
//     glossary's possession formula reproduces.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFixed, formatRate } from '../../src/lib/tools/format.mjs';
import {
  FOUR_FACTOR_WEIGHTS,
  factorEdges,
  fourFactors,
  pointsFrom,
  possessions,
  teamEfficiency,
  validateGame,
} from '../../src/lib/tools/basketball-team.mjs';

const TEAM = {
  fieldGoals: 3351,
  fieldGoalAttempts: 7018,
  threePointers: 796,
  freeThrows: 1556,
  freeThrowAttempts: 2080,
  offensiveRebounds: 967,
  defensiveRebounds: 2652,
  turnovers: 1125,
};
const OPPONENT = {
  fieldGoals: 3328,
  fieldGoalAttempts: 7485,
  threePointers: 494,
  freeThrows: 1320,
  freeThrowAttempts: 1775,
  offensiveRebounds: 1233,
  defensiveRebounds: 2550,
  turnovers: 1131,
};
const SEASON = { team: TEAM, opponent: OPPONENT, teamMinutes: 19780 };

test('the four factors reproduce Basketball-Reference’s worked example', () => {
  assert.deepEqual(validateGame(SEASON), []);
  const offence = fourFactors(TEAM, OPPONENT);
  const defence = fourFactors(OPPONENT, TEAM);
  assert.equal(formatRate(offence.effectiveFieldGoalPct), '.534');
  assert.equal(formatRate(defence.effectiveFieldGoalPct), '.478');
  assert.equal(formatRate(offence.turnoverPct), '.124');
  assert.equal(formatRate(defence.turnoverPct), '.120');
  assert.equal(formatRate(offence.offensiveReboundPct), '.275');
  assert.equal(formatRate(offence.freeThrowRate), '.222');
  assert.equal(formatRate(defence.freeThrowRate), '.176');
  const e = teamEfficiency(SEASON);
  assert.equal(formatRate(e.defensiveReboundPct), '.683');
  // The opponent's ORB% and the team's DRB% are two sides of the same misses.
  assert.ok(Math.abs(e.opponent.offensiveReboundPct + e.defensiveReboundPct - 1) < 1e-12);
});

test('Oliver’s weights are as Basketball-Reference reports them', () => {
  assert.deepEqual(
    FOUR_FACTOR_WEIGHTS.map((f) => [f.id, f.weight]),
    [
      ['shooting', 0.4],
      ['turnovers', 0.25],
      ['rebounding', 0.2],
      ['freeThrows', 0.15],
    ]
  );
  assert.ok(Math.abs(FOUR_FACTOR_WEIGHTS.reduce((sum, f) => sum + f.weight, 0) - 1) < 1e-12);
});

test('points follow from the line and match the season totals', () => {
  assert.equal(pointsFrom(TEAM), 9054);
  assert.equal(pointsFrom(OPPONENT), 8470);
});

test('possessions, pace and ratings reproduce Basketball-Reference’s printed figures', () => {
  const e = teamEfficiency(SEASON);
  assert.equal(formatFixed(e.possessions, 2), '7905.25');
  assert.equal(formatFixed(e.offensiveRating, 1), '114.5');
  assert.equal(formatFixed(e.defensiveRating, 1), '107.1');
  assert.equal(formatFixed(e.pace, 1), '95.9');
  assert.equal(formatFixed(e.netRating, 1), '7.4');
  // The blended estimate is the average of the two one-sided estimates.
  assert.ok(Math.abs((e.teamPossessionEstimate + e.opponentPossessionEstimate) / 2 - e.possessions) < 1e-9);
  assert.equal(possessions(TEAM, OPPONENT), possessions(OPPONENT, TEAM));
});

test('pace can be expressed per 40 minutes, as Basketball-Reference does for the WNBA', () => {
  const per48 = teamEfficiency(SEASON).pace;
  const per40 = teamEfficiency({ ...SEASON, paceBasis: 40 }).pace;
  assert.ok(Math.abs(per40 - (per48 * 40) / 48) < 1e-9);
  assert.ok(validateGame({ ...SEASON, paceBasis: 36 }).some((e) => e.includes('48 or per 40')));
});

test('edges: higher eFG%, ORB% and FT/FGA are better, lower TOV% is better', () => {
  const e = teamEfficiency(SEASON);
  assert.deepEqual(factorEdges(e.team, e.opponent), {
    shooting: 'team',
    turnovers: 'opponent',
    rebounding: 'opponent',
    freeThrows: 'team',
  });
  assert.deepEqual(factorEdges(e.team, e.team), {
    shooting: 'even',
    turnovers: 'even',
    rebounding: 'even',
    freeThrows: 'even',
  });
});

test('validation catches impossible lines', () => {
  const bad = (team) => validateGame({ ...SEASON, team: { ...TEAM, ...team } });
  assert.ok(bad({ threePointers: 3352 }).some((e) => e.includes('three-pointers')));
  assert.ok(bad({ fieldGoals: 7019 }).some((e) => e.includes('field goals made')));
  assert.ok(bad({ fieldGoalAttempts: 0, fieldGoals: 0, threePointers: 0 }).some((e) => e.includes('more than zero')));
  assert.ok(bad({ freeThrows: 2081 }).some((e) => e.includes('free throws')));
  assert.ok(bad({ turnovers: -1 }).some((e) => e.includes('at least 0')));
  assert.ok(validateGame({ ...SEASON, teamMinutes: 0 }).some((e) => e.includes('Team minutes')));
  assert.ok(
    validateGame({
      ...SEASON,
      team: { ...TEAM, offensiveRebounds: 0 },
      opponent: { ...OPPONENT, defensiveRebounds: 0 },
    }).some((e) => e.includes('cannot both be zero'))
  );
});
