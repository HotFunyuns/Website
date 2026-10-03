// Tennis from the point up: the chance of holding serve, winning a tie-break,
// a set and a match, from each player's chance of winning a point on serve.
//
// The model — Paul K. Newton and Joseph B. Keller, "Probability of Winning at
// Tennis I. Theory and Data", Studies in Applied Mathematics 114:241–269
// (2005). Points are independent and identically distributed: player A wins a
// point on serve with probability p_A, player B with p_B, all match long.
//   Holding serve, their equation (5), with q = 1 − p:
//     G(p) = p⁴(1 + 4q + 10q²) + 20 p³q³ · p² / (1 − 2pq)
//   Tie-breaks, sets and matches: their recursions (6)–(16) and (43)–(49),
//   which this file solves exactly by the same score-by-score recurrence. At
//   6–6 in a tie-break (and at 5–5 in an advantage set) each further pair of
//   points (games) has one served by each player, which gives their closed
//   form p_A·q_B ÷ (p_A·q_B + q_A·p_B) for winning from level.
//   Tables 3 and 4 of the paper list match-win probabilities for best-of-five
//   and best-of-three matches; scripts/tests/tools-win-probability-calculator
//   .test.mjs reproduces every interior value to four places.
//   They also prove that, in this model, the chance of winning a set or a
//   match does not depend on who serves first.
//
// Scoring — ITF Rules of Tennis (2021 edition): Rule 5 (a standard game; a
// tie-break game is first to seven points by two, the next server serving one
// point and then the players serving two each); Rule 6 (an advantage set is
// first to six games by two; a tie-break set plays a tie-break at six games
// all); Appendix V (a No-Ad game plays one deciding point at deuce; a 10-point
// match tie-break replaces a deciding final set, with the order of service
// continuing).
//   No-Ad hold, from the binomial terms (NIST e-Handbook 1.3.6.6.18): the
//   server needs four points before the receiver does —
//     G_noad(p) = p⁴(1 + 4q + 10q² + 20q³)

import { requireNumber } from './format.mjs';

/** First to this many points wins a tie-break game (Rule 5b). */
export const TIEBREAK_POINTS = 7;
/** First to this many points wins a match tie-break (Appendix V). */
export const MATCH_TIEBREAK_POINTS = 10;

export const FINAL_SET_TYPES = [
  { id: 'tiebreak', label: 'Tie-break at 6–6' },
  { id: 'advantage', label: 'Advantage set, no tie-break' },
  { id: 'match-tiebreak', label: '10-point match tie-break' },
];

/**
 * The chance the server holds.
 *
 * @param {number} p the server's chance of winning a point on serve
 * @param {boolean} [noAd]
 */
export function holdProbability(p, noAd = false) {
  const q = 1 - p;
  if (noAd) return p ** 4 * (1 + 4 * q + 10 * q ** 2 + 20 * q ** 3);
  return p ** 4 * (1 + 4 * q + 10 * q ** 2) + (20 * p ** 3 * q ** 3 * p ** 2) / (1 - 2 * p * q);
}

/**
 * A's chance of winning from level once each further pair of trials has one
 * won by A with probability `a` and one with probability `b` — the deuce
 * closed form: a·b ÷ (a·b + (1 − a)(1 − b)).
 */
function fromLevel(a, b) {
  const aWinsBoth = a * b;
  const bWinsBoth = (1 - a) * (1 - b);
  return aWinsBoth + bWinsBoth === 0 ? 0.5 : aWinsBoth / (aWinsBoth + bWinsBoth);
}

/**
 * A's chance of winning a tie-break game.
 *
 * @param {number} pA A's chance of winning a point on serve
 * @param {number} pB B's chance of winning a point on serve
 * @param {{ target?: number, aServesFirst?: boolean }} [options]
 */
export function tiebreakProbability(pA, pB, { target = TIEBREAK_POINTS, aServesFirst = true } = {}) {
  // Point k (1-based) is served by the first server when floor(k / 2) is even:
  // A, BB, AA, BB, … (Rule 5b).
  const aServes = (k) => (Math.floor(k / 2) % 2 === 0) === aServesFirst;
  const pointA = (k) => (aServes(k) ? pA : 1 - pB);
  const reach = Array.from({ length: target }, () => new Array(target).fill(0));
  reach[0][0] = 1;
  let win = 0;
  for (let total = 0; total <= 2 * (target - 1); total++) {
    for (let i = Math.max(0, total - (target - 1)); i <= Math.min(total, target - 1); i++) {
      const j = total - i;
      const p = reach[i][j];
      if (p === 0) continue;
      if (i === target - 1 && j === target - 1) {
        win += p * fromLevel(pA, 1 - pB);
        continue;
      }
      const a = pointA(total + 1);
      if (i + 1 === target) win += p * a;
      else reach[i + 1][j] += p * a;
      if (j + 1 < target) reach[i][j + 1] += p * (1 - a);
    }
  }
  return win;
}

/**
 * One set, from the point of view of whoever serves its first game.
 *
 * @param {{ pA: number, pB: number, holdA: number, holdB: number, type: 'tiebreak' | 'advantage', aServesFirst: boolean }} input
 * @returns {{ winSame: number, winSwap: number, loseSame: number, loseSwap: number }}
 *   A's chance of winning (or losing) the set with the next set's first game
 *   served by the same player as this one's (`Same`) or the other (`Swap`).
 */
export function setOutcomes({ pA, pB, holdA, holdB, type, aServesFirst }) {
  // Game g (1-based) is served by the set's first server when g is odd.
  const gameA = (g) => ((g % 2 === 1) === aServesFirst ? holdA : 1 - holdB);
  const out = { winSame: 0, winSwap: 0, loseSame: 0, loseSwap: 0 };
  // After `games` games, the next game is served by the first server when
  // `games` is even.
  const settle = (won, games, p) => {
    const key = `${won ? 'win' : 'lose'}${games % 2 === 0 ? 'Same' : 'Swap'}`;
    out[key] += p;
  };
  // Scores are visited in order of games played, so every way into a score
  // has been added up before the score itself is expanded.
  const reach = Array.from({ length: 7 }, () => new Array(7).fill(0));
  reach[0][0] = 1;
  for (let total = 0; total <= 12; total++) {
    for (let i = Math.max(0, total - 6); i <= Math.min(total, 6); i++) {
      const j = total - i;
      const p = reach[i][j];
      if (p === 0) continue;
      if (type === 'advantage' && i === 5 && j === 5) {
        // From five all, each pair of games has one served by each player and
        // the set ends at an even total (7–5, 8–6, …).
        const w = fromLevel(holdA, 1 - holdB);
        settle(true, 12, p * w);
        settle(false, 12, p * (1 - w));
        continue;
      }
      if (i === 6 && j === 6) {
        // The tie-break counts as the 13th game: its first server is the
        // set's first server, and the next set opens with the other player.
        const w = tiebreakProbability(pA, pB, { aServesFirst });
        settle(true, 13, p * w);
        settle(false, 13, p * (1 - w));
        continue;
      }
      const a = gameA(total + 1);
      // Six games and two clear (6–4, 7–5) wins the set.
      if (i + 1 >= 6 && i + 1 - j >= 2) settle(true, total + 1, p * a);
      else reach[i + 1][j] += p * a;
      if (j + 1 >= 6 && j + 1 - i >= 2) settle(false, total + 1, p * (1 - a));
      else reach[i][j + 1] += p * (1 - a);
    }
  }
  return out;
}

/**
 * @typedef {object} MatchInput
 * @property {number} pA        A's chance of winning a point on serve, 0–1
 * @property {number} pB        B's chance of winning a point on serve, 0–1
 * @property {3 | 5} bestOf
 * @property {'tiebreak' | 'advantage' | 'match-tiebreak'} finalSet
 * @property {boolean} [noAd]
 * @property {boolean} [aServesFirst]
 */

/**
 * Everything the calculator shows.
 *
 * @param {MatchInput} input
 */
export function matchProbabilities({ pA, pB, bestOf, finalSet, noAd = false, aServesFirst = true }) {
  const holdA = holdProbability(pA, noAd);
  const holdB = holdProbability(pB, noAd);
  const toWin = (bestOf + 1) / 2;
  const scores = new Map();
  // state key: `${setsA}-${setsB}-${aServesNext ? 'A' : 'B'}`
  let states = new Map([[`0-0-${aServesFirst ? 'A' : 'B'}`, 1]]);
  let matchA = 0;
  const finish = (a, b, p) => {
    const key = `${a}–${b}`;
    scores.set(key, (scores.get(key) ?? 0) + p);
    if (a === toWin) matchA += p;
  };
  for (let played = 0; played < bestOf; played++) {
    const next = new Map();
    for (const [key, p] of states) {
      const [a, b, server] = key.split('-');
      const setsA = Number(a);
      const setsB = Number(b);
      const aFirst = server === 'A';
      const deciding = setsA === toWin - 1 && setsB === toWin - 1;
      if (deciding && finalSet === 'match-tiebreak') {
        const w = tiebreakProbability(pA, pB, { target: MATCH_TIEBREAK_POINTS, aServesFirst: aFirst });
        finish(setsA + 1, setsB, p * w);
        finish(setsA, setsB + 1, p * (1 - w));
        continue;
      }
      const type = deciding && finalSet === 'advantage' ? 'advantage' : 'tiebreak';
      const o = setOutcomes({ pA, pB, holdA, holdB, type, aServesFirst: aFirst });
      const go = (sa, sb, aNext, q) => {
        if (q === 0) return;
        if (sa === toWin || sb === toWin) finish(sa, sb, q);
        else {
          const k = `${sa}-${sb}-${aNext ? 'A' : 'B'}`;
          next.set(k, (next.get(k) ?? 0) + q);
        }
      };
      go(setsA + 1, setsB, aFirst, p * o.winSame);
      go(setsA + 1, setsB, !aFirst, p * o.winSwap);
      go(setsA, setsB + 1, aFirst, p * o.loseSame);
      go(setsA, setsB + 1, !aFirst, p * o.loseSwap);
    }
    states = next;
  }
  const firstSet = setOutcomes({ pA, pB, holdA, holdB, type: 'tiebreak', aServesFirst });
  return {
    holdA,
    holdB,
    /** A's chance of breaking B's serve. */
    breakA: 1 - holdB,
    tiebreakA: tiebreakProbability(pA, pB, { aServesFirst }),
    setA: firstSet.winSame + firstSet.winSwap,
    matchA,
    scores: [...scores.entries()]
      .map(([score, p]) => ({ score, p }))
      .sort((x, y) => y.score.localeCompare(x.score)),
  };
}

/**
 * @param {{ pAPercent: number, pBPercent: number }} input percentages, 1–99
 * @returns {string[]}
 */
export function validateTennis({ pAPercent, pBPercent }) {
  const errors = [];
  requireNumber(errors, 'Player A’s points won on serve', pAPercent, { min: 1, max: 99 });
  requireNumber(errors, 'Player B’s points won on serve', pBPercent, { min: 1, max: 99 });
  return errors;
}
