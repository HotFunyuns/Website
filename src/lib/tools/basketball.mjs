// Basketball shooting efficiency.
//
// Formulas as published in Basketball-Reference's glossary:
//   FG% = FG / FGA;  3P% = 3P / 3PA;  FT% = FT / FTA
//   eFG% = (FG + 0.5 × 3P) / FGA
//   TS%  = PTS / (2 × TSA), where TSA = FGA + 0.44 × FTA
// Points are derived from the line rather than typed in, because they are
// fully determined by it: two per field goal, one more per three-pointer, one
// per free throw made.

import { requireWhole } from './format.mjs';

/** Basketball-Reference's weight for free-throw attempts in true shooting attempts. */
export const TS_FREE_THROW_WEIGHT = 0.44;

const MAX = 1_000_000;

/**
 * @typedef {object} ShootingLine
 * @property {number} fieldGoals          made field goals, twos and threes together
 * @property {number} fieldGoalAttempts
 * @property {number} threePointers       made three-pointers
 * @property {number | null} [threePointAttempts]  optional; only needed for 3P%
 * @property {number} freeThrows          made free throws
 * @property {number} freeThrowAttempts
 */

/**
 * @param {ShootingLine} line
 * @returns {string[]}
 */
export function validateShootingLine(line) {
  const errors = [];
  requireWhole(errors, 'Field goals made', line.fieldGoals, { max: MAX });
  requireWhole(errors, 'Field-goal attempts', line.fieldGoalAttempts, { min: 1, max: MAX });
  requireWhole(errors, 'Three-pointers made', line.threePointers, { max: MAX });
  const hasThreeAttempts = line.threePointAttempts !== null && line.threePointAttempts !== undefined;
  if (hasThreeAttempts) requireWhole(errors, 'Three-point attempts', line.threePointAttempts, { max: MAX });
  requireWhole(errors, 'Free throws made', line.freeThrows, { max: MAX });
  requireWhole(errors, 'Free-throw attempts', line.freeThrowAttempts, { max: MAX });
  if (errors.length > 0) return errors;

  if (line.fieldGoals > line.fieldGoalAttempts) errors.push('Field goals made cannot be more than attempts.');
  if (line.threePointers > line.fieldGoals) {
    errors.push('Three-pointers made are part of field goals made, so they cannot be more than field goals made.');
  }
  if (hasThreeAttempts) {
    if (line.threePointers > line.threePointAttempts) errors.push('Three-pointers made cannot be more than three-point attempts.');
    if (line.threePointAttempts > line.fieldGoalAttempts) {
      errors.push('Three-point attempts are part of field-goal attempts, so they cannot be more than field-goal attempts.');
    }
  }
  if (line.freeThrows > line.freeThrowAttempts) errors.push('Free throws made cannot be more than attempts.');
  return errors;
}

/**
 * @param {ShootingLine} line
 */
export function shootingEfficiency(line) {
  const { fieldGoals, fieldGoalAttempts, threePointers, freeThrows, freeThrowAttempts } = line;
  const hasThreeAttempts = line.threePointAttempts !== null && line.threePointAttempts !== undefined;
  const points = 2 * fieldGoals + threePointers + freeThrows;
  const trueShootingAttempts = fieldGoalAttempts + TS_FREE_THROW_WEIGHT * freeThrowAttempts;
  return {
    points,
    fieldGoalPct: fieldGoals / fieldGoalAttempts,
    threePointPct: hasThreeAttempts && line.threePointAttempts > 0 ? threePointers / line.threePointAttempts : null,
    freeThrowPct: freeThrowAttempts > 0 ? freeThrows / freeThrowAttempts : null,
    effectiveFieldGoalPct: (fieldGoals + 0.5 * threePointers) / fieldGoalAttempts,
    trueShootingAttempts,
    trueShootingPct: points / (2 * trueShootingAttempts),
  };
}
