// Draft lottery simulator. Reference values come from the sources the page
// cites:
//   - MLB.com, "Odds for 2026 MLB Draft Lottery": 15 eligible teams' chances of
//     the No. 1 pick, three ineligible teams, six picks drawn
//   - MLB.com, "MLB Draft lottery unlike any other" (2022): base odds by record;
//     the worst team "could wind up picking as late as seventh"; ineligible
//     clubs pick no earlier than 10th
//   - NBA.com's explainer: the 2026 lottery's published odds, four picks drawn,
//     a team already drawn is redrawn
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seededRandomInt } from '../../src/lib/tools/draft.mjs';
import {
  EXACT_STATE_LIMIT,
  LOTTERY_PRESETS,
  MLB_2026_ODDS,
  MLB_BASE_ODDS,
  drawLottery,
  exactLottery,
  exactStateCount,
  orderAfterDraw,
  parseLotteryTeams,
  simulateLottery,
  summarise,
  validateLottery,
} from '../../src/lib/tools/lottery.mjs';

const close = (actual, expected, tolerance = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

const mlbPreset = () => {
  const preset = LOTTERY_PRESETS.find((p) => p.id === 'mlb-2026');
  const { teams, errors } = parseLotteryTeams(preset.text);
  assert.deepEqual(errors, []);
  return { teams, picksDrawn: preset.picksDrawn, ineligibleFloor: preset.ineligibleFloor };
};

// The 2026 NBA lottery as NBA.com published it, worst record first.
const NBA_2026 = [14.0, 14.0, 14.0, 11.5, 11.5, 9.0, 6.8, 6.7, 4.5, 3.0, 2.0, 1.5, 1.0, 0.5];
const nba2026 = () => ({ teams: NBA_2026.map((odds, i) => ({ name: `Team ${i + 1}`, odds })), picksDrawn: 4 });

test('MLB’s base odds, rescaled over the eligible teams, give every published 2026 figure', () => {
  assert.equal(MLB_BASE_ODDS.length, 18);
  close(
    MLB_BASE_ODDS.reduce((sum, odds) => sum + odds, 0),
    100,
    1e-9
  );
  const eligibleBase = MLB_BASE_ODDS.filter((_, i) => MLB_2026_ODDS[i] !== null);
  const total = eligibleBase.reduce((sum, odds) => sum + odds, 0);
  close(total, 59.5);
  MLB_2026_ODDS.forEach((published, i) => {
    if (published === null) return;
    assert.equal((Math.round((MLB_BASE_ODDS[i] / total) * 10000) / 100).toFixed(2), published.toFixed(2));
  });
  assert.equal(MLB_2026_ODDS.filter((odds) => odds === null).length, 3);
});

test('the 2026 MLB preset: exact chances of every pick', () => {
  const lottery = mlbPreset();
  assert.deepEqual(validateLottery(lottery), []);
  assert.equal(exactStateCount(lottery), 9949);
  const matrix = exactLottery(lottery);
  // Every team picks exactly once and every pick goes to exactly one team.
  for (const row of matrix) close(row.reduce((a, b) => a + b, 0), 1, 1e-12);
  for (let pick = 0; pick < 18; pick++) close(matrix.reduce((a, row) => a + row[pick], 0), 1, 1e-12);
  // The No. 1 pick follows the published odds.
  const total = MLB_2026_ODDS.reduce((sum, odds) => sum + (odds ?? 0), 0);
  MLB_2026_ODDS.forEach((odds, i) => close(matrix[i][0], (odds ?? 0) / total, 1e-12));
  const s = summarise(matrix, 6);
  // Ineligible teams (1, 3 and 6) are placed no earlier than 10th: 10, 11, 12.
  assert.deepEqual([s[0], s[2], s[5]].map((t) => [t.best, t.worst]), [
    [10, 10],
    [11, 11],
    [12, 12],
  ]);
  // The worst eligible team can fall no lower than 7th; the best can fall to 18th.
  assert.deepEqual([s[1].best, s[1].worst], [1, 7]);
  assert.deepEqual([s[17].best, s[17].worst], [1, 18]);
  // Page prose: the worst eligible team has a 96.1% chance of a top-six pick.
  assert.equal((s[1].drawnPick * 100).toFixed(1), '96.1');
  assert.equal((s[17].drawnPick * 100).toFixed(1), '4.1');
});

test('MLB 2022: with every team eligible, the worst team can pick as late as seventh', () => {
  const lottery = {
    teams: MLB_BASE_ODDS.map((odds, i) => ({ name: `Team ${i + 1}`, odds })),
    picksDrawn: 6,
  };
  const s = summarise(exactLottery(lottery), 6);
  assert.equal(s[0].worst, 7);
  assert.equal(s[17].worst, 18);
  close(s[0].first, 0.165, 1e-12);
});

test('the 2026 NBA lottery: 14.0% for No. 1, and the worst team can fall to fifth', () => {
  const s = summarise(exactLottery(nba2026()), 4);
  close(s[0].first, 0.14, 1e-12);
  assert.deepEqual([s[0].best, s[0].worst], [1, 5]);
  // Page prose: 52.1% chance of a top-four pick, so 47.9% of picking fifth.
  assert.equal((s[0].drawnPick * 100).toFixed(1), '52.1');
  assert.equal(((1 - s[0].drawnPick) * 100).toFixed(1), '47.9');
  // The fourteenth team can move up as far as first or stay at fourteenth.
  assert.deepEqual([s[13].best, s[13].worst], [1, 14]);
});

test('a seeded simulation is repeatable and agrees with the exact chances', () => {
  const lottery = mlbPreset();
  const runs = 100_000;
  const a = simulateLottery(lottery, runs, seededRandomInt('worked-example'));
  const b = simulateLottery(lottery, runs, seededRandomInt('worked-example'));
  assert.deepEqual(a, b);
  const exact = exactLottery(lottery);
  for (let team = 0; team < 18; team++) {
    for (let pick = 0; pick < 18; pick++) {
      const p = exact[team][pick];
      const se = Math.sqrt((p * (1 - p)) / runs);
      assert.ok(Math.abs(a[team][pick] - p) <= 5 * se + 1e-9, `team ${team + 1}, pick ${pick + 1}`);
    }
  }
  // Page prose: the worked example's simulated shares for the worst eligible team.
  assert.equal((a[1][0] * 100).toFixed(2), '27.82');
  assert.equal((a[1].slice(0, 6).reduce((x, y) => x + y, 0) * 100).toFixed(1), '96.2');
  // And its single seeded draw.
  assert.deepEqual(
    drawLottery(lottery, seededRandomInt('worked-example')).slice(0, 6).map((team) => team + 1),
    [5, 4, 16, 2, 8, 12]
  );
});

test('one draw is a full order that respects the rules', () => {
  const lottery = mlbPreset();
  const random = seededRandomInt('one-draw');
  for (let r = 0; r < 200; r++) {
    const order = drawLottery(lottery, random);
    assert.deepEqual([...order].sort((x, y) => x - y), [...Array(18).keys()]);
    // Ineligible teams never take a lottery pick, nor any pick before 10th.
    for (const team of [0, 2, 5]) assert.ok(order.indexOf(team) >= 9);
  }
});

test('teams not drawn follow in standings order, ineligible ones from the floor', () => {
  const teams = [
    { name: 'A', odds: 0 },
    { name: 'B', odds: 5 },
    { name: 'C', odds: 3 },
    { name: 'D', odds: 1 },
  ];
  assert.deepEqual(orderAfterDraw({ teams }, [3]), [3, 0, 1, 2]);
  assert.deepEqual(orderAfterDraw({ teams, ineligibleFloor: 3 }, [3]), [3, 1, 0, 2]);
  // If no team may take a pick, the next team in order takes it anyway.
  assert.deepEqual(orderAfterDraw({ teams: [teams[0], { name: 'E', odds: 0 }], ineligibleFloor: 2 }, []), [0, 1]);
});

test('parsing and validation', () => {
  const { teams, errors } = parseLotteryTeams('North, 25\nSouth, 25%\n\nEast, ineligible\nWest, .5');
  assert.deepEqual(errors, []);
  assert.deepEqual(
    teams.map((t) => t.odds),
    [25, 25, 0, 0.5]
  );
  assert.equal(parseLotteryTeams('North 25').errors.length, 1);
  assert.equal(parseLotteryTeams('North, lots').errors.length, 1);
  assert.equal(parseLotteryTeams(', 5').errors.length, 1);
  assert.equal(parseLotteryTeams(`${'x'.repeat(41)}, 5`).errors.length, 1);
  assert.ok(validateLottery({ teams: teams.slice(0, 1), picksDrawn: 1 }).length > 0);
  assert.ok(validateLottery({ teams: [teams[0], { name: 'north', odds: 3 }], picksDrawn: 1 }).some((e) => e.includes('more than once')));
  assert.ok(validateLottery({ teams, picksDrawn: 4 }).some((e) => e.includes('at most 3')));
  assert.ok(validateLottery({ teams: teams.map((t) => ({ ...t, odds: 0 })), picksDrawn: 1 }).some((e) => e.includes('above zero')));
  assert.ok(validateLottery({ teams, picksDrawn: 2, ineligibleFloor: 9 }).length > 0);
  assert.ok(validateLottery({ teams, picksDrawn: 2, runs: 50 }).length > 0);
  assert.deepEqual(validateLottery({ teams, picksDrawn: 2, ineligibleFloor: 3, runs: 10_000 }), []);
});

test('large lotteries fall back to simulation', () => {
  const lottery = { teams: Array.from({ length: 30 }, (_, i) => ({ name: `T${i}`, odds: 30 - i })), picksDrawn: 30 };
  assert.ok(exactStateCount(lottery) > EXACT_STATE_LIMIT);
  assert.equal(exactLottery(lottery), null);
  const small = { teams: lottery.teams.slice(0, 16), picksDrawn: 16 };
  assert.equal(exactStateCount(small), 2 ** 16);
  assert.ok(exactLottery(small) !== null);
});
