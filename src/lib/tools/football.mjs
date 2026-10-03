// NFL passer rating.
//
// Source: Official 2025 National Football League Record & Fact Book, the
// "passer rating" explanation (system adopted 1973). Four per-attempt rates are
// each converted to a point value, floored at 0 and capped at 2.375; the sum is
// divided by six and multiplied by 100, so the maximum is 158.3.
//
//   completion  = (completion % − 30) × 0.05
//   yards       = (yards per attempt − 3) × 0.25
//   touchdowns  = touchdown % × 0.2
//   interceptions = 2.375 − interception % × 0.25
//
// The Fact Book's worked example — 343 of 502 for 4,643 yards, 45 touchdowns
// and six interceptions — rates 122.5; scripts/tests/tools.test.mjs checks it.
//
// College football uses a different formula, passing efficiency, from the NCAA
// Football Statisticians' Manual (item 16 and its sample compilation):
//
//   efficiency = completion % + 8.4 × yards per attempt
//              + 3.3 × touchdown % − 2 × interception %
//
// The manual carries every percentage and factor to two decimal places, and
// following that procedure reproduces its printed example (161.71).

import { requireWhole, roundHalfUp } from './format.mjs';

/** The most any one of the four components can contribute. */
export const PASSER_RATING_COMPONENT_CAP = 2.375;

/** The highest possible rating: four capped components. */
export const PASSER_RATING_MAX = ((PASSER_RATING_COMPONENT_CAP * 4) / 6) * 100;

/**
 * @typedef {object} PasserLine
 * @property {number} attempts
 * @property {number} completions
 * @property {number} yards
 * @property {number} touchdowns
 * @property {number} interceptions
 */

/**
 * Every reason a stat line cannot be rated, in plain words.
 *
 * @param {PasserLine} line
 * @returns {string[]}
 */
export function validatePasserLine({ attempts, completions, yards, touchdowns, interceptions }) {
  const errors = [];
  requireWhole(errors, 'Attempts', attempts, { min: 1, max: 100_000 });
  requireWhole(errors, 'Completions', completions, { min: 0, max: 100_000 });
  requireWhole(errors, 'Passing yards', yards, { min: -100_000, max: 1_000_000 });
  requireWhole(errors, 'Touchdown passes', touchdowns, { min: 0, max: 100_000 });
  requireWhole(errors, 'Interceptions', interceptions, { min: 0, max: 100_000 });
  if (errors.length > 0) return errors;

  if (completions > attempts) errors.push('Completions cannot be more than attempts.');
  if (touchdowns > completions) errors.push('Touchdown passes cannot be more than completions.');
  // An interception is an incomplete pass, so completions and interceptions
  // together cannot exceed attempts.
  if (completions + interceptions > attempts) {
    errors.push('Completions plus interceptions cannot be more than attempts.');
  }
  return errors;
}

/** Clamps a component into the 0–2.375 band the formula allows. */
function band(value) {
  return Math.min(PASSER_RATING_COMPONENT_CAP, Math.max(0, value));
}

/**
 * The rating and the four components behind it. Assumes a valid line — call
 * validatePasserLine first.
 *
 * @param {PasserLine} line
 */
export function passerRating({ attempts, completions, yards, touchdowns, interceptions }) {
  const completionPct = (completions / attempts) * 100;
  const yardsPerAttempt = yards / attempts;
  const touchdownPct = (touchdowns / attempts) * 100;
  const interceptionPct = (interceptions / attempts) * 100;

  const components = {
    completion: band((completionPct - 30) * 0.05),
    yards: band((yardsPerAttempt - 3) * 0.25),
    touchdowns: band(touchdownPct * 0.2),
    interceptions: band(PASSER_RATING_COMPONENT_CAP - interceptionPct * 0.25),
  };
  const sum = components.completion + components.yards + components.touchdowns + components.interceptions;

  return {
    completionPct,
    yardsPerAttempt,
    touchdownPct,
    interceptionPct,
    components,
    sum,
    rating: (sum / 6) * 100,
  };
}

/**
 * NCAA passing efficiency, following the statisticians' manual's procedure of
 * carrying percentages and factors to two decimal places. Unlike the NFL
 * rating it has no floor or cap. Assumes a valid line.
 *
 * @param {PasserLine} line
 */
export function ncaaPassingEfficiency({ attempts, completions, yards, touchdowns, interceptions }) {
  const two = (value) => roundHalfUp(value, 2);
  const completionPct = two((completions / attempts) * 100);
  const yardsPerAttempt = two(yards / attempts);
  const touchdownPct = two((touchdowns / attempts) * 100);
  const interceptionPct = two((interceptions / attempts) * 100);
  const factors = {
    completion: completionPct,
    yards: two(yardsPerAttempt * 8.4),
    touchdowns: two(touchdownPct * 3.3),
    interceptions: two(interceptionPct * 2),
  };
  return {
    completionPct,
    yardsPerAttempt,
    touchdownPct,
    interceptionPct,
    factors,
    rating: two(factors.completion + factors.yards + factors.touchdowns - factors.interceptions),
  };
}
