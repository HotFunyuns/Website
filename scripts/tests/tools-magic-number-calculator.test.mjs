// Magic number calculator. Reference values come from the sources the page
// cites:
//   - MLB.com glossary, Magic Number: games remaining + 1 − (losses by second
//     place − losses by first place)
//   - Eisner, "A Truer Measure of 'Games Behind'" (SABR, 1986): his 1985
//     examples — 6 and 6 behind is 6 games; 4 and 1 is 2½; 2 and 3 is 2½;
//     −1 and 2 is ½; −4 and 3 is −½
//   - Official Baseball Rules 9.21(a); NFL Tiebreaking Procedures (a tie is
//     half a win and half a loss)
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatRate } from '../../src/lib/tools/format.mjs';
import {
  formatGamesBehind,
  gamesBehind,
  race,
  validateRace,
  winningPercentage,
} from '../../src/lib/tools/standings.mjs';

/** A leader and a team trailing by `w` in the win column and `l` in the loss column. */
const columns = (w, l) => [
  { wins: 80, losses: 70 },
  { wins: 80 - w, losses: 70 + l },
];

test('games behind reproduces Eisner’s 1985 examples', () => {
  assert.equal(gamesBehind(...columns(6, 6)), 6);
  assert.equal(gamesBehind(...columns(4, 1)), 2.5);
  assert.equal(gamesBehind(...columns(2, 3)), 2.5);
  assert.equal(gamesBehind(...columns(-1, 2)), 0.5);
  // His hypothetical "Trailers": −4 and 3, so −½ game "behind".
  assert.equal(gamesBehind(...columns(-4, 3)), -0.5);
  assert.deepEqual(
    [6, 2.5, 0.5, -0.5, 0, -3].map(formatGamesBehind),
    ['6', '2½', '½', '−½', '0', '−3']
  );
});

test('winning percentage: Rule 9.21(a), and the NFL’s ties', () => {
  assert.equal(winningPercentage({ wins: 92, losses: 60 }), 92 / 152);
  assert.equal(formatRate(winningPercentage({ wins: 92, losses: 60 })), '.605');
  assert.equal(winningPercentage({ wins: 10, losses: 6, ties: 1 }), 10.5 / 17);
  assert.equal(formatRate(winningPercentage({ wins: 10, losses: 6, ties: 1 })), '.618');
  assert.equal(winningPercentage({ wins: 0, losses: 0 }), null);
});

test('the magic number: the glossary formula and its season-length form agree', () => {
  // The worked example: 92–60 leads 88–64 in a 162-game season.
  const r = race({ seasonGames: 162, leader: { wins: 92, losses: 60 }, trailer: { wins: 88, losses: 64 } });
  assert.equal(r.remainingLeader, 10);
  assert.equal(r.magic, 10 + 1 - (64 - 60));
  assert.equal(r.magic, 162 + 1 - 92 - 64);
  assert.equal(r.magic, 7);
  assert.equal(r.gamesBehind, 4);
  assert.equal(r.maxWinsTrailer, 98);
  assert.equal(r.status, 'open');
  // Holding the tiebreaker makes a tie enough: one fewer.
  const tb = race({ seasonGames: 162, leader: { wins: 92, losses: 60 }, trailer: { wins: 88, losses: 64 }, leaderHoldsTiebreaker: true });
  assert.equal(tb.magic, 6);
});

test('each leader win or trailer loss takes one off', () => {
  const base = { seasonGames: 162, leader: { wins: 92, losses: 60 }, trailer: { wins: 88, losses: 64 } };
  assert.equal(race({ ...base, leader: { wins: 93, losses: 60 } }).magic, 6);
  assert.equal(race({ ...base, trailer: { wins: 88, losses: 65 } }).magic, 6);
  // A trailer win (or a leader loss) changes nothing.
  assert.equal(race({ ...base, trailer: { wins: 89, losses: 64 } }).magic, 7);
  assert.equal(race({ ...base, leader: { wins: 92, losses: 61 } }).magic, 7);
  // Page prose: three leader wins and four rival losses clinch (95 against at most 94).
  const clinched = race({ ...base, leader: { wins: 95, losses: 60 }, trailer: { wins: 88, losses: 68 } });
  assert.equal(clinched.status, 'clinched');
  assert.equal(clinched.maxWinsTrailer, 94);
});

test('clinched, and out of reach', () => {
  // The trailer cannot catch 100 wins: 90 + 3 left = 93 at most.
  const done = race({ seasonGames: 162, leader: { wins: 100, losses: 55 }, trailer: { wins: 90, losses: 69 } });
  assert.equal(done.magic, 0);
  assert.equal(done.status, 'clinched');
  // The "leader" cannot finish ahead: the other team already has more wins
  // than it can reach.
  const behind = race({ seasonGames: 162, leader: { wins: 80, losses: 79 }, trailer: { wins: 84, losses: 75 } });
  assert.equal(behind.status, 'cannot-clinch');
  // Level with nothing left, and the leader holds the tiebreaker: clinched.
  const level = race({ seasonGames: 82, leader: { wins: 50, losses: 32 }, trailer: { wins: 50, losses: 32 }, leaderHoldsTiebreaker: true });
  assert.equal(level.magic, 0);
  assert.equal(level.status, 'clinched');
});

test('ties: percentages yes, magic number no', () => {
  const r = race({ seasonGames: 17, leader: { wins: 11, losses: 4, ties: 1 }, trailer: { wins: 10, losses: 6 } });
  assert.equal(r.hasTies, true);
  assert.equal(r.magic, null);
  assert.equal(r.winPctLeader, 11.5 / 16);
  assert.equal(r.remainingLeader, 1);
});

test('validation', () => {
  const ok = { seasonGames: 162, leader: { wins: 92, losses: 60 }, trailer: { wins: 88, losses: 64 } };
  assert.deepEqual(validateRace(ok), []);
  assert.ok(validateRace({ ...ok, seasonGames: 0 }).length > 0);
  assert.ok(validateRace({ ...ok, leader: { wins: 92.5, losses: 60 } }).length > 0);
  assert.ok(validateRace({ ...ok, trailer: { wins: Number.NaN, losses: 60 } }).length > 0);
  assert.ok(validateRace({ ...ok, leader: { wins: 100, losses: 70 } }).some((e) => e.includes('more games')));
  assert.ok(validateRace({ ...ok, trailer: { wins: 1, losses: 1, ties: -1 } }).length > 0);
});
