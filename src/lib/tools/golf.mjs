// World Handicap System calculations, following the USGA's Rules of
// Handicapping:
//
//   Rule 5.1a  Score Differential = (113 ÷ Slope Rating) × (adjusted gross score
//              − Course Rating − PCC adjustment), rounded to the nearest tenth
//              with .5 rounded upwards. PCC runs from −1.0 to +3.0.
//   Rule 5.2a  Fewer than 20 differentials: a table sets how many of the lowest
//              are averaged and the adjustment; the result is rounded to the
//              nearest tenth. Rule 5.2b: with 20, the lowest 8 of the most
//              recent 20. The maximum Handicap Index is 54.0.
//   Rule 6.1a  Course Handicap = Handicap Index × (Slope Rating ÷ 113)
//              + (Course Rating − par), rounded to the nearest whole number with
//              .5 rounded upwards where a rounded figure is used.
//   Rule 6.2a  Playing Handicap = unrounded Course Handicap × allowance,
//              rounded the same way; allowances from Appendix C.
//
// Deliberately not modelled: the soft and hard caps (they need the player's Low
// Handicap Index), exceptional-score reductions, committee adjustments, 9-hole
// scores and team-format allowances. The tool pages say so.

import { requireNumber, requireWhole, roundHalfUp } from './format.mjs';

/** The Slope Rating of a course of standard relative difficulty (Appendix G). */
export const STANDARD_SLOPE = 113;

/** Rule 5.3 — a Handicap Index cannot exceed 54.0. */
export const MAX_HANDICAP_INDEX = 54;

/**
 * Rule 5.2a's table, plus the 20-score case from Rule 5.2b.
 * `use` is how many of the lowest differentials are averaged.
 */
export const DIFFERENTIALS_TABLE = [
  { from: 3, to: 3, use: 1, adjustment: -2 },
  { from: 4, to: 4, use: 1, adjustment: -1 },
  { from: 5, to: 5, use: 1, adjustment: 0 },
  { from: 6, to: 6, use: 2, adjustment: -1 },
  { from: 7, to: 8, use: 2, adjustment: 0 },
  { from: 9, to: 11, use: 3, adjustment: 0 },
  { from: 12, to: 14, use: 4, adjustment: 0 },
  { from: 15, to: 16, use: 5, adjustment: 0 },
  { from: 17, to: 18, use: 6, adjustment: 0 },
  { from: 19, to: 19, use: 7, adjustment: 0 },
  { from: 20, to: 20, use: 8, adjustment: 0 },
];

/** The most recent differentials the calculation looks at. */
export const SCORING_RECORD_SIZE = 20;

/* ------------------------------------------------------- score differential */

/**
 * @typedef {object} RoundInput
 * @property {number} adjustedGrossScore
 * @property {number} courseRating
 * @property {number} slopeRating
 * @property {number} pcc  playing conditions calculation, −1 to +3
 */

/**
 * @param {RoundInput} round
 * @returns {string[]}
 */
export function validateRound(round) {
  const errors = [];
  requireWhole(errors, 'Adjusted gross score', round.adjustedGrossScore, { min: 18, max: 250 });
  requireNumber(errors, 'Course Rating', round.courseRating, { min: 40, max: 90 });
  requireWhole(errors, 'Slope Rating', round.slopeRating, { min: 55, max: 155 });
  requireWhole(errors, 'PCC adjustment', round.pcc, { min: -1, max: 3 });
  return errors;
}

/**
 * @param {RoundInput} round
 * @returns {{ exact: number, rounded: number }}
 */
export function scoreDifferential({ adjustedGrossScore, courseRating, slopeRating, pcc }) {
  const exact = (STANDARD_SLOPE / slopeRating) * (adjustedGrossScore - courseRating - pcc);
  return { exact, rounded: roundHalfUp(exact, 1) };
}

/* ---------------------------------------------------------- Handicap Index */

/**
 * Reads a list of differentials typed one per line or separated by commas or
 * spaces. Returns numbers in the order given (oldest first).
 *
 * @param {string} text
 * @returns {number[]}
 */
export function parseDifferentials(text) {
  return String(text ?? '')
    .split(/[\s,;]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => (/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(part) ? Number(part) : Number.NaN));
}

/**
 * @param {number[]} differentials oldest first
 * @returns {string[]}
 */
export function validateDifferentials(differentials) {
  const errors = [];
  if (differentials.some((d) => !Number.isFinite(d))) {
    errors.push('Each score differential must be a number, such as 18.1 or -1.4.');
  } else if (differentials.some((d) => d < -20 || d > 120)) {
    errors.push('A score differential outside -20 to 120 is almost certainly a typing error.');
  }
  if (differentials.length < 3) {
    errors.push('Enter at least three score differentials — the fewest the Rules of Handicapping table uses.');
  }
  return errors;
}

/** The table row for a count of differentials (capped at 20). */
export function tableRowFor(count) {
  const n = Math.min(count, SCORING_RECORD_SIZE);
  return DIFFERENTIALS_TABLE.find((row) => n >= row.from && n <= row.to);
}

/**
 * @param {number[]} differentials oldest first; only the most recent 20 count
 */
export function handicapIndex(differentials) {
  const considered = differentials.slice(-SCORING_RECORD_SIZE);
  const row = tableRowFor(considered.length);
  if (!row) throw new RangeError('At least three differentials are required.');
  const used = [...considered].sort((a, b) => a - b).slice(0, row.use);
  const average = used.reduce((sum, d) => sum + d, 0) / used.length;
  const exact = average + row.adjustment;
  const rounded = roundHalfUp(exact, 1);
  return {
    considered,
    ignored: differentials.length - considered.length,
    used,
    average,
    adjustment: row.adjustment,
    exact,
    index: Math.min(MAX_HANDICAP_INDEX, rounded),
    capped: rounded > MAX_HANDICAP_INDEX,
  };
}

/* --------------------------------------------------------- Course Handicap */

/**
 * @typedef {object} CourseInput
 * @property {number} handicapIndex  a plus handicap is negative (+1.2 → −1.2)
 * @property {number} slopeRating
 * @property {number} courseRating
 * @property {number} par
 */

/**
 * @param {CourseInput} input
 * @returns {string[]}
 */
export function validateCourseInput(input) {
  const errors = [];
  requireNumber(errors, 'Handicap Index', input.handicapIndex, { min: -10, max: MAX_HANDICAP_INDEX });
  requireWhole(errors, 'Slope Rating', input.slopeRating, { min: 55, max: 155 });
  requireNumber(errors, 'Course Rating', input.courseRating, { min: 40, max: 90 });
  requireWhole(errors, 'Par', input.par, { min: 27, max: 80 });
  return errors;
}

/**
 * @param {CourseInput} input
 * @returns {{ exact: number, rounded: number }}
 */
export function courseHandicap({ handicapIndex: index, slopeRating, courseRating, par }) {
  const exact = index * (slopeRating / STANDARD_SLOPE) + (courseRating - par);
  return { exact, rounded: roundHalfUp(exact, 0) };
}

/* -------------------------------------------------------- Playing Handicap */

/**
 * Recommended handicap allowances from the Rules of Handicapping, Appendix C,
 * for the formats where one player's own handicap is adjusted. Committees may
 * set different allowances; team formats that combine two players' handicaps
 * (foursomes, greensomes, scrambles) are not modelled here.
 */
export const HANDICAP_ALLOWANCES = [
  { id: 'stroke-individual', label: 'Individual stroke play', percent: 95 },
  { id: 'stableford-individual', label: 'Individual Stableford', percent: 95 },
  { id: 'par-bogey-individual', label: 'Individual par/bogey', percent: 95 },
  { id: 'maximum-score-individual', label: 'Individual maximum score', percent: 95 },
  { id: 'stroke-four-ball', label: 'Four-ball stroke play', percent: 85 },
  { id: 'stableford-four-ball', label: 'Four-ball Stableford', percent: 85 },
  { id: 'match-individual', label: 'Individual match play', percent: 100 },
  { id: 'match-four-ball', label: 'Four-ball match play', percent: 90 },
];

/**
 * Rule 6.2a: Playing Handicap = Course Handicap (unrounded) × handicap
 * allowance, rounded to the nearest whole number with .5 rounded upwards.
 *
 * @param {{ courseHandicapExact: number, percent: number }} input
 * @returns {{ exact: number, rounded: number }}
 */
export function playingHandicap({ courseHandicapExact, percent }) {
  const exact = courseHandicapExact * (percent / 100);
  return { exact, rounded: roundHalfUp(exact, 0) };
}

/**
 * @param {number} percent
 * @returns {string[]}
 */
export function validateAllowance(percent) {
  const errors = [];
  requireNumber(errors, 'Handicap allowance', percent, { min: 1, max: 100 });
  return errors;
}

/**
 * Handicaps better than scratch are written with a plus sign: an index of
 * −1.2 is shown as "+1.2".
 *
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatHandicap(value, decimals) {
  const rounded = roundHalfUp(value, decimals);
  return rounded < 0 ? `+${Math.abs(rounded).toFixed(decimals)}` : rounded.toFixed(decimals);
}
