// Per-36, usage, Game Score and AST/TO (src/lib/tools/basketball-player.mjs).
//
// Reference values are figures Basketball-Reference prints, opened 2026-10-02:
//   - https://www.basketball-reference.com/teams/PHO/2005.html — the season its
//     four-factors article uses. Team totals: MP 19780, FGA 7018, FTA 2080,
//     TOV 1125. The first three rows of the player tables print USG% 19.0, 21.3
//     and 28.3, and per-36 figures such as 15.6 and 25.9 points.
//   - https://www.basketball-reference.com/players/s/stoudam01/gamelog/2005 —
//     the season's first game lines print GmSc 24.2, 22.7, 23.9 and 6.0.
// Players are deliberately not named here or on the page.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFixed, formatPercent } from '../../src/lib/tools/format.mjs';
import {
  PER_MINUTES,
  gameScore,
  parseMinutes,
  per36,
  playerRates,
  usageRate,
  validatePlayerLine,
  validateTeamTotals,
} from '../../src/lib/tools/basketball-player.mjs';

const TEAM_2005 = { minutes: 19780, fieldGoalAttempts: 7018, freeThrowAttempts: 2080, turnovers: 1125 };

/** Fills the fields a test does not care about with zeros. */
const line = (fields) => ({
  minutes: 36,
  points: 0,
  fieldGoals: 0,
  fieldGoalAttempts: 0,
  freeThrows: 0,
  freeThrowAttempts: 0,
  offensiveRebounds: 0,
  defensiveRebounds: 0,
  assists: 0,
  steals: 0,
  blocks: 0,
  turnovers: 0,
  personalFouls: 0,
  ...fields,
});

test('minutes parse as clock time or decimals', () => {
  assert.equal(parseMinutes('28:42'), 28.7);
  assert.equal(parseMinutes('34:30'), 34.5);
  assert.equal(parseMinutes('34.5'), 34.5);
  assert.equal(parseMinutes('3,240'), 3240);
  assert.ok(Number.isNaN(parseMinutes('34:75')));
  assert.ok(Number.isNaN(parseMinutes('')));
  assert.ok(Number.isNaN(parseMinutes('-5')));
});

test('per-36 is the statistic divided by minutes, times 36 (Basketball-Reference)', () => {
  assert.equal(PER_MINUTES, 36);
  // Season rows from the 2004-05 team page: printed per-36 values.
  assert.equal(formatFixed(per36(1400, 3240), 1), '15.6'); // points
  assert.equal(formatFixed(per36(291, 3240), 1), '3.2'); // assists
  assert.equal(formatFixed(per36(422, 3240), 1), '4.7'); // total rebounds
  assert.equal(formatFixed(per36(2080, 2889), 1), '25.9'); // points
  assert.equal(formatFixed(per36(795, 2889), 1), '9.9'); // free-throw attempts
});

test('usage percentage reproduces Basketball-Reference’s printed USG%', () => {
  const rows = [
    { minutes: 3240, fieldGoalAttempts: 1179, freeThrowAttempts: 180, turnovers: 148, printed: '19.0' },
    { minutes: 3146, fieldGoalAttempts: 1289, freeThrowAttempts: 275, turnovers: 125, printed: '21.3' },
    { minutes: 2889, fieldGoalAttempts: 1336, freeThrowAttempts: 795, turnovers: 189, printed: '28.3' },
  ];
  for (const row of rows) {
    const usage = usageRate(line(row), TEAM_2005);
    assert.equal(formatFixed(usage * 100, 1), row.printed);
  }
});

test('Game Score reproduces Basketball-Reference’s printed GmSc', () => {
  const games = [
    { points: 23, fieldGoals: 9, fieldGoalAttempts: 13, freeThrows: 5, freeThrowAttempts: 6, offensiveRebounds: 4, defensiveRebounds: 4, assists: 1, steals: 1, blocks: 2, turnovers: 0, personalFouls: 0, printed: '24.2' },
    { points: 29, fieldGoals: 9, fieldGoalAttempts: 19, freeThrows: 11, freeThrowAttempts: 13, offensiveRebounds: 5, defensiveRebounds: 5, assists: 2, steals: 1, blocks: 2, turnovers: 3, personalFouls: 4, printed: '22.7' },
    { points: 26, fieldGoals: 8, fieldGoalAttempts: 15, freeThrows: 10, freeThrowAttempts: 11, offensiveRebounds: 3, defensiveRebounds: 12, assists: 0, steals: 1, blocks: 1, turnovers: 1, personalFouls: 2, printed: '23.9' },
    { points: 20, fieldGoals: 7, fieldGoalAttempts: 19, freeThrows: 6, freeThrowAttempts: 9, offensiveRebounds: 2, defensiveRebounds: 2, assists: 1, steals: 1, blocks: 2, turnovers: 5, personalFouls: 6, printed: '6.0' },
  ];
  for (const { printed, ...fields } of games) {
    const g = line(fields);
    assert.deepEqual(validatePlayerLine(g), []);
    assert.equal(formatFixed(gameScore(g), 1), printed);
  }
});

test('a player using exactly a fifth of the team’s plays over a full game has 20% usage (the page says so)', () => {
  const team = { minutes: 240, fieldGoalAttempts: 80, freeThrowAttempts: 20, turnovers: 15 };
  const player = line({ minutes: 48, fieldGoalAttempts: 16, freeThrowAttempts: 4, turnovers: 3 });
  assert.equal(formatPercent(usageRate(player, team), 1), '20.0%');
});

test('assist-to-turnover ratio is assists over turnovers, and absent with no turnovers', () => {
  assert.equal(formatFixed(playerRates(line({ assists: 291, turnovers: 148 })).assistToTurnover ?? 0, 2), '1.97');
  assert.equal(playerRates(line({ assists: 5, turnovers: 0 })).assistToTurnover, null);
});

test('the page’s illustrative bench line', () => {
  // Not a real player: 24 minutes, 14 points on 5-for-11 and 3-for-4, one
  // three; 1 + 4 rebounds, 3 assists, 1 steal, 2 turnovers, 2 fouls. Team: 240
  // minutes, 88 FGA, 22 FTA, 13 turnovers.
  const bench = line({
    minutes: 24,
    points: 14,
    fieldGoals: 5,
    fieldGoalAttempts: 11,
    freeThrows: 3,
    freeThrowAttempts: 4,
    offensiveRebounds: 1,
    defensiveRebounds: 4,
    assists: 3,
    steals: 1,
    turnovers: 2,
    personalFouls: 2,
  });
  const team = { minutes: 240, fieldGoalAttempts: 88, freeThrowAttempts: 22, turnovers: 13 };
  assert.deepEqual(validatePlayerLine(bench), []);
  assert.deepEqual(validateTeamTotals(team, bench), []);
  const r = playerRates(bench, team);
  assert.equal(formatFixed(r.per36.points, 1), '21.0');
  assert.equal(formatFixed(r.per36.rebounds, 1), '7.5');
  assert.equal(formatFixed(r.per36.assists, 1), '4.5');
  assert.equal(formatFixed(r.gameScore, 1), '10.1');
  assert.equal(formatPercent(r.usage ?? 0, 1), '26.7%');
  assert.equal(formatFixed(r.assistToTurnover ?? 0, 2), '1.50');
  assert.equal(r.projectsBeyondMinutes, true);
});

test('validation catches impossible lines', () => {
  assert.ok(validatePlayerLine(line({ minutes: 0 })).some((e) => e.includes('more than zero')));
  assert.ok(validatePlayerLine(line({ fieldGoals: 5, fieldGoalAttempts: 4, points: 10 })).some((e) => e.includes('Field goals')));
  assert.ok(validatePlayerLine(line({ freeThrows: 3, freeThrowAttempts: 2, points: 3 })).some((e) => e.includes('Free throws')));
  // 9 field goals and 5 free throws make 23 to 32 points.
  assert.ok(validatePlayerLine(line({ fieldGoals: 9, fieldGoalAttempts: 13, freeThrows: 5, freeThrowAttempts: 6, points: 40 })).some((e) => e.includes('between 23 and 32')));
  // Per-game averages are rounded, so the points check is skipped for them.
  assert.deepEqual(validatePlayerLine(line({ fieldGoals: 9.1, fieldGoalAttempts: 18.4, freeThrows: 5.1, freeThrowAttempts: 6.2, points: 23.2 })), []);
  assert.ok(validatePlayerLine(line({ assists: Number.NaN })).some((e) => e.includes('Assists')));
  const p = line({ minutes: 30, fieldGoalAttempts: 20, freeThrowAttempts: 10, turnovers: 4, fieldGoals: 10, points: 20 });
  assert.ok(validateTeamTotals({ minutes: 25, fieldGoalAttempts: 80, freeThrowAttempts: 20, turnovers: 10 }, p).some((e) => e.includes('Team minutes')));
  assert.ok(validateTeamTotals({ minutes: 240, fieldGoalAttempts: 15, freeThrowAttempts: 20, turnovers: 10 }, p).some((e) => e.includes('field-goal')));
  assert.ok(validateTeamTotals({ minutes: 240, fieldGoalAttempts: 0, freeThrowAttempts: 0, turnovers: 0 }, line({})).some((e) => e.includes('at least one')));
});
