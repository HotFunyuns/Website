// A two-team race in the standings: winning percentage, games behind, and the
// magic (elimination) number.
//
// Magic number — MLB.com glossary, "Magic Number (MN)": "the combination of
// wins needed by that team and losses by its closest competitor to clinch";
//   MN = games remaining + 1 − (losses by second-place team − losses by
//        first-place team)
// which, when both teams play a season of G games, is the same as
//   MN = G + 1 − leader's wins − trailing team's losses.
// The glossary lists "elimination number" and "tragic number" as the names for
// the same count seen from the trailing team's side.
//
// Tiebreaker (derived, and labelled so on the page): the "+ 1" makes the
// leader finish strictly ahead. Where a tie in the standings would be broken in
// the leader's favour by rule — the NFL publishes such procedures, starting
// with head-to-head record — finishing level is enough, so the number is one
// smaller.
//
// Games behind — Milton P. Eisner, "A Truer Measure of 'Games Behind'",
// Baseball Research Journal 1986 (SABR): "the average of the number of games a
// team trails the percentage leader in the win column and the number of games
// that team trails the leader in the loss column":
//   GB = ((W_leader − W_team) + (L_team − L_leader)) ÷ 2
//
// Winning percentage — Official Baseball Rules 2026, Rule 9.21(a): wins ÷
// (wins + losses). With ties, the NFL's rule: "Tie games count as one-half win
// and one-half loss for both clubs" (NFL Tiebreaking Procedures):
//   (W + ½T) ÷ (W + L + T)

import { requireWhole } from './format.mjs';

/**
 * @typedef {object} Record
 * @property {number} wins
 * @property {number} losses
 * @property {number} [ties]
 */

/**
 * @param {Record} record
 * @returns {number | null} null before any game has been played
 */
export function winningPercentage({ wins, losses, ties = 0 }) {
  const games = wins + losses + ties;
  return games === 0 ? null : (wins + ties / 2) / games;
}

/**
 * Eisner's average of the two column deficits. Negative when the "trailing"
 * team is actually ahead on games.
 *
 * @param {Record} leader
 * @param {Record} team
 */
export function gamesBehind(leader, team) {
  return (leader.wins - team.wins + (team.losses - leader.losses)) / 2;
}

/**
 * Games behind as standings print it: 4, 2½, ½, −½.
 *
 * @param {number} value a whole or half number
 * @returns {string}
 */
export function formatGamesBehind(value) {
  const whole = Math.trunc(value);
  const sign = value < 0 ? '−' : '';
  if (Math.abs(value - whole) !== 0.5) return `${sign}${Math.abs(whole)}`;
  return `${sign}${whole === 0 ? '' : Math.abs(whole)}½`;
}

/**
 * @param {{ seasonGames: number, leader: Record, trailer: Record }} input
 * @returns {string[]}
 */
export function validateRace({ seasonGames, leader, trailer }) {
  const errors = [];
  requireWhole(errors, 'Games in the season', seasonGames, { min: 1, max: 200 });
  const check = (label, record) => {
    requireWhole(errors, `${label} wins`, record.wins, { max: 200 });
    requireWhole(errors, `${label} losses`, record.losses, { max: 200 });
    requireWhole(errors, `${label} ties`, record.ties ?? 0, { max: 200 });
  };
  check('First-place team', leader);
  check('Trailing team', trailer);
  if (errors.length > 0) return errors;
  for (const [label, record] of [
    ['first-place team', leader],
    ['trailing team', trailer],
  ]) {
    if (record.wins + record.losses + (record.ties ?? 0) > seasonGames) {
      errors.push(`The ${label} has played more games than the season has.`);
    }
  }
  return errors;
}

/**
 * Everything the calculator shows for one race.
 *
 * @param {{ seasonGames: number, leader: Record, trailer: Record, leaderHoldsTiebreaker?: boolean }} input
 */
export function race({ seasonGames, leader, trailer, leaderHoldsTiebreaker = false }) {
  const played = (r) => r.wins + r.losses + (r.ties ?? 0);
  const remainingLeader = seasonGames - played(leader);
  const remainingTrailer = seasonGames - played(trailer);
  const hasTies = (leader.ties ?? 0) > 0 || (trailer.ties ?? 0) > 0;

  // The glossary's form, and the equivalent season-length form.
  const glossary = remainingLeader + 1 - (trailer.losses - leader.losses);
  const magic = hasTies ? null : glossary - (leaderHoldsTiebreaker ? 1 : 0);

  let status = 'open';
  if (magic !== null) {
    if (magic <= 0) status = 'clinched';
    // Even winning out while the other team loses out would not be enough:
    // the trailing team already has as many wins as the leader can reach.
    else if (magic > remainingLeader + remainingTrailer) status = 'cannot-clinch';
  }

  return {
    winPctLeader: winningPercentage(leader),
    winPctTrailer: winningPercentage(trailer),
    gamesBehind: gamesBehind(leader, trailer),
    remainingLeader,
    remainingTrailer,
    maxWinsLeader: leader.wins + remainingLeader,
    maxWinsTrailer: trailer.wins + remainingTrailer,
    /** Null when either team has a tie, which this formula does not handle. */
    magic: magic === null ? null : Math.max(0, magic),
    status,
    hasTies,
  };
}
