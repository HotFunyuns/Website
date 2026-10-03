// Hockey points, points percentage, pace and magic numbers
// (src/lib/tools/hockey-standings.mjs).
//
// Sources, opened 2026-10-02:
//   - NHL Official Rules 2026-2027, Rule 78.1: two points for any win, one for
//     a loss in overtime or a shootout.
//   - Hockey-Reference glossary: PTS% is points divided by maximum possible points.
//   - NHL Stats API season records and the 2026-27 club schedules: 84 games in
//     2026-27, 82 in every full season from 1995-96 to 2025-26.
// The magic numbers are derived arithmetic, so they are checked here against
// a brute-force walk through every way the remaining games could go.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFixed, formatRate } from '../../src/lib/tools/format.mjs';
import {
  POINTS_FOR_OVERTIME_LOSS,
  POINTS_FOR_WIN,
  SEASON_GAMES_2026_27,
  SEASON_GAMES_PREVIOUS,
  magicNumbers,
  pointsNeeded,
  recordStats,
  standingsPoints,
  validateRecord,
  validateSeason,
} from '../../src/lib/tools/hockey-standings.mjs';

test('the points rule and season lengths are as the NHL publishes them', () => {
  assert.equal(POINTS_FOR_WIN, 2);
  assert.equal(POINTS_FOR_OVERTIME_LOSS, 1);
  assert.equal(SEASON_GAMES_2026_27, 84);
  assert.equal(SEASON_GAMES_PREVIOUS, 82);
  assert.equal(standingsPoints({ wins: 50, losses: 25, overtimeLosses: 7 }), 107);
});

test('points percentage is points over maximum possible points', () => {
  const s = recordStats({ wins: 50, losses: 25, overtimeLosses: 7 }, 82);
  assert.equal(s.gamesPlayed, 82);
  assert.equal(s.points, 107);
  assert.equal(formatRate(s.pointsPct), '.652'); // 107 / 164
  assert.equal(s.gamesRemaining, 0);
  assert.equal(s.maxPoints, 107);
});

test('the page’s illustrative record: 50-20-6 after 76 of 84 games', () => {
  const record = { wins: 50, losses: 20, overtimeLosses: 6 };
  const s = recordStats(record, 84);
  assert.equal(s.points, 106);
  assert.equal(s.gamesPlayed, 76);
  assert.equal(formatRate(s.pointsPct), '.697'); // 106 / 152, as the FAQ says
  assert.equal(formatFixed(s.pace84, 1), '117.2');
  assert.equal(formatFixed(s.pace82, 1), '114.4');
  assert.equal(s.gamesRemaining, 8);
  assert.equal(s.maxPoints, 122);
  const target = pointsNeeded(record, 84, 116);
  assert.equal(target.needed, 10);
  assert.equal(target.available, 16);
  assert.equal(formatRate(target.pctOfRemaining ?? 0), '.625');
});

test('mid-season pace over 84 and 82 games', () => {
  // 20 wins, 10 regulation losses, 4 overtime or shootout losses — not a real team.
  const record = { wins: 20, losses: 10, overtimeLosses: 4 };
  const s = recordStats(record, 84);
  assert.equal(s.points, 44);
  assert.equal(s.gamesPlayed, 34);
  assert.equal(formatRate(s.pointsPct), '.647'); // 44 / 68
  assert.equal(formatFixed(s.pace84, 1), '108.7');
  assert.equal(formatFixed(s.pace82, 1), '106.1');
  assert.equal(s.pace, s.pace84);
  assert.equal(s.gamesRemaining, 50);
  assert.equal(s.maxPoints, 144);
  const target = pointsNeeded(record, 84, 96);
  assert.equal(target.needed, 52);
  assert.equal(target.available, 100);
  assert.equal(formatRate(target.pctOfRemaining ?? 0), '.520');
  assert.equal(target.possible, true);
});

test('points needed: reached, impossible, and no games left', () => {
  assert.equal(pointsNeeded({ wins: 40, losses: 0, overtimeLosses: 0 }, 82, 80).reached, true);
  const tooMany = pointsNeeded({ wins: 10, losses: 60, overtimeLosses: 0 }, 82, 100);
  assert.equal(tooMany.needed, 80);
  assert.equal(tooMany.possible, false);
  assert.equal(pointsNeeded({ wins: 41, losses: 41, overtimeLosses: 0 }, 82, 100).pctOfRemaining, null);
});

test('the page’s illustrative magic numbers', () => {
  // 76 games played each in an 84-game season: 106 points against 92.
  const you = { wins: 50, losses: 20, overtimeLosses: 6 };
  const them = { wins: 44, losses: 28, overtimeLosses: 4 };
  const loseTie = magicNumbers({ you, them, seasonGames: 84, tiebreak: 'them' });
  assert.equal(loseTie.you.points, 106);
  assert.equal(loseTie.them.points, 92);
  assert.equal(loseTie.them.maxPoints, 108);
  assert.equal(loseTie.clinch, 3);
  assert.equal(loseTie.elimination, 30);
  const winTie = magicNumbers({ you, them, seasonGames: 84, tiebreak: 'you' });
  assert.equal(winTie.clinch, 2);
  assert.equal(winTie.elimination, 31);
  assert.equal(winTie.clinched, false);
  assert.equal(winTie.eliminated, false);
});

/** Every final points total a team can reach from `points` with `games` left. */
function finals(points, games) {
  const out = [];
  for (let w = 0; w <= games; w += 1) {
    for (let otl = 0; otl + w <= games; otl += 1) out.push({ final: points + 2 * w + otl, gained: 2 * w + otl });
  }
  return out;
}

test('magic numbers match a brute-force check of every outcome', () => {
  const cases = [
    { you: { wins: 5, losses: 2, overtimeLosses: 1 }, them: { wins: 4, losses: 3, overtimeLosses: 1 } },
    { you: { wins: 3, losses: 4, overtimeLosses: 1 }, them: { wins: 6, losses: 1, overtimeLosses: 1 } },
    { you: { wins: 4, losses: 4, overtimeLosses: 0 }, them: { wins: 4, losses: 2, overtimeLosses: 2 } },
    { you: { wins: 7, losses: 0, overtimeLosses: 0 }, them: { wins: 2, losses: 5, overtimeLosses: 1 } },
  ];
  const seasonGames = 10;
  for (const { you, them } of cases) {
    for (const tiebreak of /** @type {const} */ (['you', 'them'])) {
      const m = magicNumbers({ you, them, seasonGames, tiebreak });
      const youAhead = (a, b) => a > b || (a === b && tiebreak === 'you');
      for (const a of finals(m.you.points, m.you.gamesRemaining)) {
        for (const b of finals(m.them.points, m.them.gamesRemaining)) {
          const theyDropped = m.them.maxPoints - b.final;
          const youDropped = m.you.maxPoints - a.final;
          // Reaching the clinch number is exactly what finishing ahead takes.
          assert.equal(a.gained + theyDropped >= m.clinch, youAhead(a.final, b.final));
          // And the elimination number is exactly what finishing behind takes.
          assert.equal(b.gained + youDropped >= m.elimination, !youAhead(a.final, b.final));
        }
      }
    }
  }
});

test('clinched and eliminated flags', () => {
  const done = magicNumbers({
    you: { wins: 8, losses: 0, overtimeLosses: 0 },
    them: { wins: 0, losses: 8, overtimeLosses: 0 },
    seasonGames: 10,
    tiebreak: 'them',
  });
  assert.equal(done.clinched, true); // 16 against a maximum of 4
  assert.equal(done.eliminated, false);
  const gone = magicNumbers({
    you: { wins: 0, losses: 8, overtimeLosses: 0 },
    them: { wins: 8, losses: 0, overtimeLosses: 0 },
    seasonGames: 10,
    tiebreak: 'you',
  });
  assert.equal(gone.eliminated, true);
  assert.equal(gone.clinched, false);
});

test('validation catches impossible records', () => {
  assert.ok(validateRecord({ wins: 0, losses: 0, overtimeLosses: 0 }, 84, 'Your team').some((e) => e.includes('at least one game')));
  assert.ok(validateRecord({ wins: 50, losses: 30, overtimeLosses: 5 }, 84, 'Your team').some((e) => e.includes('85 games played')));
  assert.ok(validateRecord({ wins: 1.5, losses: 0, overtimeLosses: 0 }, 84, 'Your team').some((e) => e.includes('whole number')));
  assert.ok(validateRecord({ wins: -1, losses: 0, overtimeLosses: 0 }, 84, 'Your team').some((e) => e.includes('at least 0')));
  assert.deepEqual(validateSeason(84), []);
  assert.ok(validateSeason(0).length > 0);
});
