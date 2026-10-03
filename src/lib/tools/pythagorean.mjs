// Pythagorean expectation: the winning percentage a team's scoring margin
// implies.
//
//   win% = PF^x / (PF^x + PA^x)
//
// Exponents are kept only where a published source states them:
//   2     Bill James's original baseball formula (MLB.com glossary)
//   1.83  Baseball-Reference's baseball exponent (MLB.com glossary)
//   14    Basketball-Reference's basketball exponent (Basketball-Reference glossary)
//   2     James's formula as interpreted for hockey (Ryder, "Win Probabilities", 2004)
// Anything else — including American football, where the commonly quoted
// exponent could not be verified from an open source — is a custom exponent
// the reader supplies.

import { requireNumber, requireWhole } from './format.mjs';

/** Presets the calculator offers, each traceable to a cited source. */
export const PYTHAGOREAN_PRESETS = [
  { id: 'baseball-james', label: 'Baseball — Bill James’s original (2)', exponent: 2, sport: 'baseball' },
  { id: 'baseball-reference', label: 'Baseball — Baseball-Reference (1.83)', exponent: 1.83, sport: 'baseball' },
  { id: 'basketball-reference', label: 'Basketball — Basketball-Reference (14)', exponent: 14, sport: 'basketball' },
  { id: 'hockey-ryder', label: 'Hockey — James’s formula as applied by Ryder (2)', exponent: 2, sport: 'hockey' },
];

/**
 * @typedef {object} PythagoreanInput
 * @property {number} pointsFor      runs, points or goals scored
 * @property {number} pointsAgainst  runs, points or goals allowed
 * @property {number} exponent
 * @property {number} games          games those totals came from
 * @property {number | null} [actualWins]      optional: the team's real wins in those games
 * @property {number | null} [gamesRemaining]  optional: games left to play
 */

/**
 * @param {PythagoreanInput} input
 * @returns {string[]}
 */
export function validatePythagorean(input) {
  const errors = [];
  requireNumber(errors, 'Scored', input.pointsFor, { min: 0, max: 1_000_000 });
  requireNumber(errors, 'Allowed', input.pointsAgainst, { min: 0, max: 1_000_000 });
  requireNumber(errors, 'Exponent', input.exponent, { min: 0.5, max: 30 });
  requireWhole(errors, 'Games played', input.games, { min: 1, max: 1_000 });
  const hasWins = input.actualWins !== null && input.actualWins !== undefined;
  if (hasWins) requireWhole(errors, 'Actual wins', input.actualWins, { max: 1_000 });
  const hasRemaining = input.gamesRemaining !== null && input.gamesRemaining !== undefined;
  if (hasRemaining) requireWhole(errors, 'Games remaining', input.gamesRemaining, { max: 1_000 });
  if (errors.length > 0) return errors;

  if (input.pointsFor === 0 && input.pointsAgainst === 0) errors.push('Scored and allowed cannot both be zero.');
  if (hasWins && input.actualWins > input.games) errors.push('Actual wins cannot be more than games played.');
  return errors;
}

/**
 * Written as 1 / (1 + (PA/PF)^x), which is algebraically the same and cannot
 * overflow even with basketball's exponent of 14 and a season's points.
 *
 * With `actualWins`, also reports how far the real record is from the
 * expectation; with `gamesRemaining`, what the final record would be if the
 * team won its remaining games at the expected rate — a hypothetical, not a
 * forecast.
 *
 * @param {PythagoreanInput} input
 */
export function pythagoreanExpectation({ pointsFor, pointsAgainst, exponent, games, actualWins = null, gamesRemaining = null }) {
  const winPct = pointsFor === 0 ? 0 : 1 / (1 + (pointsAgainst / pointsFor) ** exponent);
  const expectedWins = winPct * games;
  const hasWins = actualWins !== null && actualWins !== undefined;
  const hasRemaining = gamesRemaining !== null && gamesRemaining !== undefined;
  return {
    winPct,
    expectedWins,
    expectedLosses: games - expectedWins,
    winsAboveExpected: hasWins ? actualWins - expectedWins : null,
    projectedFinalWins: hasWins && hasRemaining ? actualWins + winPct * gamesRemaining : null,
    projectedFinalGames: hasRemaining ? games + gamesRemaining : null,
  };
}
