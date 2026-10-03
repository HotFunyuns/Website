// Stableford: points per hole from strokes, par and handicap strokes.
//
// Points — Rules of Golf, Rule 21.1b (R&A and USGA): points compare the
// player's score with the fixed target score for the hole, which is par unless
// the Committee sets another:
//   more than one over, or no score returned   0
//   one over                                   1
//   the fixed score                            2
//   one under                                  3
//   two under                                  4
//   three under                                5
//   four under                                 6
// so points = max(0, 2 + fixed score − score). A player who does not hole out
// gets zero points. In a handicap competition the handicap strokes are applied
// to each hole's score first. The R&A's Diagram 21.1b scores a scratch card of
// 76 on a par-70 course at 30 points; the tests reproduce it hole by hole.
// Rules of Handicapping, Rule 3.1: net double bogey "is equal to the lowest
// score on a hole for which the player would achieve zero Stableford points".
//
// Handicap strokes — Rules of Handicapping, Appendix E (Stroke Index
// Allocation):
//   - strokes are given in stroke-index order; above 18, "stroke index 1
//     repeating as stroke index 19, 37 and 55", so on 18 holes a Playing
//     Handicap PH gives floor(PH ÷ 18) strokes on every hole, plus one more on
//     the holes whose stroke index is at most PH mod 18;
//   - for 9 holes on an 18-hole course, strokes are "taken in ascending order"
//     of the 18-hole stroke indexes of those holes (the calculator ranks the
//     nine indexes, which also covers a committee's own 1–9 allocation);
//   - a plus-handicap player gives strokes back starting "on the hole with the
//     highest published stroke index" — Appendix E says this for 9-hole play,
//     and the calculator applies the same order over 18 holes.

import { requireWhole } from './format.mjs';

/** Points for a hole: max(0, 2 + fixed score − net score); null score → 0. */
export function stablefordPoints(fixedScore, netScore) {
  if (netScore === null || netScore === undefined) return 0;
  return Math.max(0, 2 + fixedScore - netScore);
}

/**
 * Handicap strokes on each hole: positive received, negative given back.
 *
 * @param {number[]} strokeIndexes one per hole, in hole order
 * @param {number} playingHandicap whole number; negative for a plus handicap
 * @returns {number[]}
 */
export function allocateStrokes(strokeIndexes, playingHandicap) {
  const holes = strokeIndexes.length;
  // Rank 1 = the lowest stroke index among these holes.
  const order = strokeIndexes.map((si, hole) => ({ si, hole })).sort((a, b) => a.si - b.si);
  const rank = new Array(holes);
  order.forEach(({ hole }, i) => {
    rank[hole] = i + 1;
  });
  if (playingHandicap >= 0) {
    const base = Math.floor(playingHandicap / holes);
    const extra = playingHandicap % holes;
    return rank.map((r) => base + (r <= extra ? 1 : 0));
  }
  const back = -playingHandicap;
  const base = Math.floor(back / holes);
  const extra = back % holes;
  // Given back from the highest stroke index down.
  return rank.map((r) => {
    const given = base + (r > holes - extra ? 1 : 0);
    return given === 0 ? 0 : -given;
  });
}

/**
 * Reads a row of numbers typed with spaces, commas or tabs between them. An
 * "x", "-" or "NR" stands for no score returned (null).
 *
 * @param {string} text
 * @param {{ allowNoScore?: boolean }} [options]
 * @returns {(number | null)[]} NaN for anything unreadable
 */
export function parseHoleRow(text, { allowNoScore = false } = {}) {
  return String(text ?? '')
    .trim()
    .split(/[\s,;]+/)
    .filter(Boolean)
    .map((token) => {
      if (allowNoScore && /^(x|-|nr)$/i.test(token)) return null;
      return /^\d+$/.test(token) ? Number(token) : Number.NaN;
    });
}

/**
 * @typedef {object} Card
 * @property {9 | 18} holes
 * @property {number[]} pars
 * @property {number[]} strokeIndexes
 * @property {(number | null)[]} scores   gross strokes; null for no score returned
 * @property {number} playingHandicap
 */

/**
 * @param {Card} card
 * @returns {string[]}
 */
export function validateCard({ holes, pars, strokeIndexes, scores, playingHandicap }) {
  const errors = [];
  const count = (label, row) => {
    if (row.length !== holes) errors.push(`${label}: enter ${holes} numbers, one per hole (found ${row.length}).`);
  };
  count('Par', pars);
  count('Stroke index', strokeIndexes);
  count('Your strokes', scores);
  if (pars.some((par) => !Number.isInteger(par) || par < 3 || par > 6)) {
    errors.push('Par: each hole’s par must be a whole number from 3 to 6.');
  }
  if (strokeIndexes.some((si) => !Number.isInteger(si) || si < 1 || si > 18)) {
    errors.push('Stroke index: use whole numbers from 1 to 18.');
  } else if (new Set(strokeIndexes).size !== strokeIndexes.length) {
    errors.push('Stroke index: each hole needs a different stroke index.');
  }
  if (scores.some((score) => score !== null && (!Number.isInteger(score) || score < 1 || score > 20))) {
    errors.push('Your strokes: use whole numbers from 1 to 20, or x for a hole with no score.');
  }
  requireWhole(errors, 'Playing Handicap', playingHandicap, { min: -18, max: 72 });
  return errors;
}

/**
 * The card, hole by hole, and the totals.
 *
 * @param {Omit<Card, 'holes'>} card
 */
export function scoreCard({ pars, strokeIndexes, scores, playingHandicap }) {
  const strokes = allocateStrokes(strokeIndexes, playingHandicap);
  const rows = pars.map((par, i) => {
    const gross = scores[i];
    const net = gross === null ? null : gross - strokes[i];
    return {
      hole: i + 1,
      par,
      strokeIndex: strokeIndexes[i],
      strokes: strokes[i],
      gross,
      net,
      points: stablefordPoints(par, net),
      /** Rule 3.1's net double bogey for the hole: par + 2 + strokes received. */
      netDoubleBogey: par + 2 + strokes[i],
    };
  });
  const sum = (key) => rows.reduce((total, row) => total + (row[key] ?? 0), 0);
  const complete = rows.every((row) => row.gross !== null);
  return {
    rows,
    points: sum('points'),
    /** Two points a hole: net par everywhere. */
    netParPoints: 2 * rows.length,
    par: sum('par'),
    gross: complete ? sum('gross') : null,
    net: complete ? sum('gross') - playingHandicap : null,
    holesWithoutPoints: rows.filter((row) => row.points === 0).length,
  };
}
