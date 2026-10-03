// Elo ratings: the expected score between two ratings, and how a result moves
// them. Three published implementations, each as its source states it.
//
// Elo's formula — Glickman & Jones, "Rating the chess rating system", Chance
// 12(2), 21–28 (1999), formulas (1) and (2); the same formula and update are
// US Chess's "standard winning expectancy" and "standard rating formula"
// (Glickman & Doan, "The US Chess Rating System", 2020, section 4.2):
//   E_A  = 1 / (1 + 10^(−(R_A − R_B) / 400))     an expected score, which is a
//                                                win probability only when
//                                                draws are impossible
//   R'_A = R_A + K (S_A − E_A)                   S = 1 win, ½ draw, 0 loss
//   Glickman & Jones's example: players rated 1500 and 1700 — the 1500 player's
//   long-run expected score is "about 0.24".
//
// FIDE Rating Regulations effective from 1 March 2024 (handbook.fide.com):
//   8.1.2  a table converts the rating difference D into the expected score P_D
//          for the higher-rated (H) and lower-rated (L) player
//   8.3.1  effective 1 October 2025: for a player rated below 2650, a difference
//          of more than 400 counts as 400; at 2650 and above the actual
//          difference is used
//   8.3.2  ΔR = score − P_D; the rating change is ΣΔR × K
//   8.3.3  K = 40 for a player new to the list until 30 games, and for players
//          until the end of the year of their 18th birthday while rated under
//          2300; K = 20 while rated under 2400; K = 10 once a published rating
//          has reached 2400; K × games in a rating period may not exceed 700
//   8.3.4  the change is rounded to the nearest whole number, 0.5 away from zero
//
// FIFA men's world ranking, "SUM" — FIFA, "Revision of the FIFA / Coca-Cola
// World Ranking":
//   P = P_before + I × (W − W_e),  W_e = 1 / (10^(−dr / 600) + 1),  dr = P_A − P_B
//   W = 1 win, 0.5 draw, 0 defeat; a match decided by a penalty shoot-out gives
//   the winner 0.75 and the loser 0.5; in the knockout rounds of a final
//   competition a team does not lose points (if W − W_e < 0, P = P_before).
//   FIFA's example: a team on 1300 beats one on 1500 in a continental qualifier
//   (I = 25) and gains 17 points; the other loses the same.

import { requireNumber, requireWhole } from './format.mjs';

/* ------------------------------------------------------ Elo's formula (400) */

/**
 * The logistic expected score of A against B.
 *
 * @param {number} ratingA
 * @param {number} ratingB
 * @param {number} [scale] 400 in Elo's formula, 600 in FIFA's
 */
export function expectedScore(ratingA, ratingB, scale = 400) {
  return 1 / (1 + 10 ** (-(ratingA - ratingB) / scale));
}

/** Results the calculator offers, as A's score. */
export const RESULTS = [
  { id: 'a-win', label: 'A wins', scoreA: 1 },
  { id: 'draw', label: 'Draw', scoreA: 0.5 },
  { id: 'b-win', label: 'B wins', scoreA: 0 },
];

/**
 * Elo's update for one game, the same K for both sides, so what one gains the
 * other loses.
 *
 * @param {{ ratingA: number, ratingB: number, scoreA: number, k: number }} input
 */
export function eloUpdate({ ratingA, ratingB, scoreA, k }) {
  const expectedA = expectedScore(ratingA, ratingB);
  const changeA = k * (scoreA - expectedA);
  return {
    expectedA,
    expectedB: 1 - expectedA,
    changeA,
    changeB: -changeA,
    newA: ratingA + changeA,
    newB: ratingB - changeA,
  };
}

/**
 * @param {{ ratingA: number, ratingB: number, k: number }} input
 * @returns {string[]}
 */
export function validateElo({ ratingA, ratingB, k }) {
  const errors = [];
  requireNumber(errors, 'Rating A', ratingA, { min: 0, max: 4_000 });
  requireNumber(errors, 'Rating B', ratingB, { min: 0, max: 4_000 });
  requireNumber(errors, 'K-factor', k, { min: 1, max: 100 });
  return errors;
}

/* ------------------------------------------------------------------- FIDE */

/**
 * FIDE table 8.1.2: [largest difference in the row, P_D for the higher-rated
 * player in hundredths]. The lower-rated player's P_D is 100 minus it. Kept in
 * hundredths so ΔR × K is exact and the .5 rounding rule applies cleanly.
 */
export const FIDE_TABLE = [
  [3, 50], [10, 51], [17, 52], [25, 53], [32, 54], [39, 55], [46, 56], [53, 57], [61, 58], [68, 59],
  [76, 60], [83, 61], [91, 62], [98, 63], [106, 64], [113, 65], [121, 66], [129, 67], [137, 68], [145, 69],
  [153, 70], [162, 71], [170, 72], [179, 73], [188, 74], [197, 75], [206, 76], [215, 77], [225, 78], [235, 79],
  [245, 80], [256, 81], [267, 82], [278, 83], [290, 84], [302, 85], [315, 86], [328, 87], [344, 88], [357, 89],
  [374, 90], [391, 91], [411, 92], [432, 93], [456, 94], [484, 95], [517, 96], [559, 97], [619, 98], [735, 99],
  [Infinity, 100],
];

/** FIDE 8.3.3's development coefficients. */
export const FIDE_K = [
  { k: 40, label: 'K = 40 — new to the list (under 30 games), or a junior rated under 2300' },
  { k: 20, label: 'K = 20 — rated under 2400' },
  { k: 10, label: 'K = 10 — has reached 2400' },
];

/** FIDE 8.3.1: below this rating, a difference over 400 counts as 400. */
export const FIDE_FULL_DIFFERENCE_FROM = 2650;

/**
 * P_D for a player against an opponent, in hundredths, after rule 8.3.1.
 *
 * @param {number} rating   the player's rating
 * @param {number} opponent the opponent's rating
 */
export function fideExpectedHundredths(rating, opponent) {
  let difference = Math.abs(rating - opponent);
  if (rating < FIDE_FULL_DIFFERENCE_FROM) difference = Math.min(difference, 400);
  const high = FIDE_TABLE.find(([max]) => difference <= max)[1];
  if (rating === opponent) return 50;
  return rating > opponent ? high : 100 - high;
}

/** Rounds to the nearest whole number with .5 going away from zero (FIDE 8.3.4). */
export function roundHalfAwayFromZero(value) {
  const rounded = Math.sign(value) * Math.floor(Math.abs(value) + 0.5 + 1e-9);
  return Object.is(rounded, -0) ? 0 : rounded;
}

/**
 * One game under the FIDE regulations, from each player's side: each uses
 * their own K and their own side of rule 8.3.1, so the changes need not
 * cancel.
 *
 * @param {{ ratingA: number, ratingB: number, scoreA: number, kA: number, kB: number }} input
 */
export function fideUpdate({ ratingA, ratingB, scoreA, kA, kB }) {
  const side = (rating, opponent, score, k) => {
    const expectedHundredths = fideExpectedHundredths(rating, opponent);
    // (score − P_D) × K, computed in hundredths: exact for every table value.
    const exact = ((Math.round(score * 100) - expectedHundredths) * k) / 100;
    return { expected: expectedHundredths / 100, exact, change: roundHalfAwayFromZero(exact) };
  };
  const a = side(ratingA, ratingB, scoreA, kA);
  const b = side(ratingB, ratingA, 1 - scoreA, kB);
  return {
    expectedA: a.expected,
    expectedB: b.expected,
    exactChangeA: a.exact,
    exactChangeB: b.exact,
    changeA: a.change,
    changeB: b.change,
    newA: ratingA + a.change,
    newB: ratingB + b.change,
  };
}

/**
 * @param {{ ratingA: number, ratingB: number, kA: number, kB: number }} input
 * @returns {string[]}
 */
export function validateFide({ ratingA, ratingB, kA, kB }) {
  const errors = [];
  // Rule 7.2.1: ratings below 1400 are not published.
  requireWhole(errors, 'Rating A', ratingA, { min: 1_400, max: 3_500 });
  requireWhole(errors, 'Rating B', ratingB, { min: 1_400, max: 3_500 });
  if (!FIDE_K.some((option) => option.k === kA)) errors.push('Choose a K-factor for player A.');
  if (!FIDE_K.some((option) => option.k === kB)) errors.push('Choose a K-factor for player B.');
  return errors;
}

/* ------------------------------------------------------------------- FIFA */

/** Match importance, I, as FIFA lists it. */
export const FIFA_IMPORTANCE = [
  { id: 'friendly-outside', value: 5, label: '5 — friendly outside an international window' },
  { id: 'friendly-window', value: 10, label: '10 — friendly in an international window' },
  { id: 'nations-league-group', value: 15, label: '15 — Nations League group phase' },
  { id: 'nations-league-finals', value: 25, label: '25 — Nations League play-offs and finals' },
  { id: 'qualifier', value: 25, label: '25 — qualifier for a confederation or World Cup final competition' },
  { id: 'confederation-early', value: 35, label: '35 — confederation final competition, before the quarter-finals' },
  { id: 'confederation-late', value: 40, label: '40 — confederation final competition, quarter-finals on' },
  { id: 'world-cup-early', value: 50, label: '50 — World Cup finals, before the quarter-finals' },
  { id: 'world-cup-late', value: 60, label: '60 — World Cup finals, quarter-finals on' },
];

/** FIFA results, with W for each team. */
export const FIFA_RESULTS = [
  { id: 'a-win', label: 'A wins', wA: 1, wB: 0 },
  { id: 'draw', label: 'Draw', wA: 0.5, wB: 0.5 },
  { id: 'b-win', label: 'B wins', wA: 0, wB: 1 },
  { id: 'a-shootout', label: 'A wins a penalty shoot-out', wA: 0.75, wB: 0.5 },
  { id: 'b-shootout', label: 'B wins a penalty shoot-out', wA: 0.5, wB: 0.75 },
];

/**
 * One match under SUM.
 *
 * @param {{ pointsA: number, pointsB: number, wA: number, wB: number, importance: number, knockout: boolean }} input
 */
export function fifaUpdate({ pointsA, pointsB, wA, wB, importance, knockout }) {
  const expectedA = expectedScore(pointsA, pointsB, 600);
  const expectedB = 1 - expectedA;
  const raw = (w, expected) => importance * (w - expected);
  const protect = (change) => (knockout && change < 0 ? 0 : change);
  const changeA = protect(raw(wA, expectedA));
  const changeB = protect(raw(wB, expectedB));
  return {
    expectedA,
    expectedB,
    changeA,
    changeB,
    newA: pointsA + changeA,
    newB: pointsB + changeB,
  };
}

/**
 * @param {{ pointsA: number, pointsB: number }} input
 * @returns {string[]}
 */
export function validateFifa({ pointsA, pointsB }) {
  const errors = [];
  requireNumber(errors, 'Points for team A', pointsA, { min: 0, max: 3_000 });
  requireNumber(errors, 'Points for team B', pointsB, { min: 0, max: 3_000 });
  return errors;
}
