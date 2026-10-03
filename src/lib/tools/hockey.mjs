// Hockey goaltending rates, as defined in Hockey-Reference's glossary:
//   saves = shots against − goals against
//   SV%   = saves / shots against
//   GAA   = goals against × 60 / minutes played  (60 = a regulation game)
//
// `gameLength` lets a league with shorter games express the same rate per its
// own game; it defaults to the 60 minutes the definition uses.

import { requireWhole } from './format.mjs';

const MAX = 1_000_000;

/** The length of a regulation game in Hockey-Reference's definition of GAA. */
export const REGULATION_MINUTES = 60;

/**
 * @typedef {object} GoalieLine
 * @property {number} shotsAgainst
 * @property {number} goalsAgainst
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} [gameLength]  minutes in a regulation game; default 60
 */

/**
 * @param {GoalieLine} line
 * @returns {string[]}
 */
export function validateGoalieLine(line) {
  const errors = [];
  requireWhole(errors, 'Shots against', line.shotsAgainst, { min: 1, max: MAX });
  requireWhole(errors, 'Goals against', line.goalsAgainst, { max: MAX });
  requireWhole(errors, 'Minutes played', line.minutes, { max: MAX });
  requireWhole(errors, 'Seconds', line.seconds, { max: 59 });
  if (line.gameLength !== undefined) requireWhole(errors, 'Game length', line.gameLength, { min: 10, max: 120 });
  if (errors.length > 0) return errors;

  if (line.goalsAgainst > line.shotsAgainst) {
    errors.push('Goals against cannot be more than shots against — every goal counts as a shot on goal.');
  }
  if (line.minutes * 60 + line.seconds === 0) errors.push('Time played must be more than zero.');
  return errors;
}

/**
 * @param {GoalieLine} line
 */
export function goalieStats({ shotsAgainst, goalsAgainst, minutes, seconds, gameLength = REGULATION_MINUTES }) {
  const minutesPlayed = minutes + seconds / 60;
  const saves = shotsAgainst - goalsAgainst;
  return {
    saves,
    minutesPlayed,
    gameLength,
    savePct: saves / shotsAgainst,
    goalsAgainstAverage: (goalsAgainst * gameLength) / minutesPlayed,
    shotsAgainstPerGame: (shotsAgainst * gameLength) / minutesPlayed,
  };
}
