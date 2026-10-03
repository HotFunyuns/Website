// Hockey standings arithmetic: points, points percentage, pace, maximum
// points, and a points-based magic number against one other team.
//
// Sources, opened 2026-10-02:
//   NHL Official Rules 2026-2027, Rule 78.1 (and Rule 84.1) —
//     https://media.nhl.com/site/asset/public/ext/2026-27/2026-27Rules.pdf
//     The team that wins in regulation "shall be credited with two points in
//     the League standings". "In the event a winner during the regular season
//     is determined in the overtime period or the shootout, the winning team
//     shall be credited with two points in the League standings and the losing
//     team will be credited with one point".
//   Hockey-Reference glossary — https://www.hockey-reference.com/about/glossary.html
//     PTS%: "calculated by dividing points by maximum possible points."
//   NHL.com, "NHL releases 2026-27 regular-season schedule" (16 July 2026) —
//     https://www.nhl.com/news/nhl-releases-2026-27-regular-season-schedule
//     "Each team will play 84 games this season, up from 82".
//   (The league's stats feed is not cited: its terms allow non-commercial
//   personal use only.)
//
// The magic numbers are arithmetic on that points rule, not a statistic any
// league publishes. Which team wins a tie on points is an input, because the
// tie-breaking order is not part of this calculation.

import { requireWhole } from './format.mjs';

/** Points for any win, and for a loss in overtime or a shootout (NHL Rule 78.1). */
export const POINTS_FOR_WIN = 2;
export const POINTS_FOR_OVERTIME_LOSS = 1;

/** Regular-season length for 2026-27 (NHL.com schedule release), and the 82 it replaced. */
export const SEASON_GAMES_2026_27 = 84;
/** Regular-season length of every full NHL season from 1995-96 to 2025-26. */
export const SEASON_GAMES_PREVIOUS = 82;

/**
 * @typedef {object} TeamRecord
 * @property {number} wins             all wins: regulation, overtime and shootout
 * @property {number} losses           regulation losses
 * @property {number} overtimeLosses   losses in overtime or a shootout
 */

/**
 * @param {TeamRecord} record
 * @param {number} seasonGames
 * @param {string} who   prefix for messages, e.g. "Your team"
 * @returns {string[]}
 */
export function validateRecord(record, seasonGames, who) {
  const errors = [];
  requireWhole(errors, `${who}: wins`, record.wins, { max: 1000 });
  requireWhole(errors, `${who}: regulation losses`, record.losses, { max: 1000 });
  requireWhole(errors, `${who}: overtime and shootout losses`, record.overtimeLosses, { max: 1000 });
  if (errors.length > 0) return errors;
  const played = gamesPlayed(record);
  if (played === 0) errors.push(`${who}: enter a record with at least one game played.`);
  if (Number.isFinite(seasonGames) && played > seasonGames) {
    errors.push(`${who}: ${played} games played is more than the ${seasonGames}-game season.`);
  }
  return errors;
}

/**
 * @param {number} seasonGames
 * @returns {string[]}
 */
export function validateSeason(seasonGames) {
  const errors = [];
  requireWhole(errors, 'Games in the season', seasonGames, { min: 1, max: 200 });
  return errors;
}

/** @param {TeamRecord} record */
export function gamesPlayed(record) {
  return record.wins + record.losses + record.overtimeLosses;
}

/** @param {TeamRecord} record */
export function standingsPoints(record) {
  return POINTS_FOR_WIN * record.wins + POINTS_FOR_OVERTIME_LOSS * record.overtimeLosses;
}

/**
 * @param {TeamRecord} record
 * @param {number} seasonGames
 */
export function recordStats(record, seasonGames) {
  const played = gamesPlayed(record);
  const points = standingsPoints(record);
  const pointsPct = points / (POINTS_FOR_WIN * played);
  const remaining = seasonGames - played;
  return {
    gamesPlayed: played,
    points,
    /** Points ÷ maximum possible points so far. */
    pointsPct,
    /** Points per game played, carried over the whole season. */
    pace: (points / played) * seasonGames,
    pace84: (points / played) * SEASON_GAMES_2026_27,
    pace82: (points / played) * SEASON_GAMES_PREVIOUS,
    gamesRemaining: remaining,
    maxPoints: points + POINTS_FOR_WIN * remaining,
  };
}

/**
 * Points still needed to reach `target`, and the share of the remaining
 * available points that requires.
 *
 * @param {TeamRecord} record
 * @param {number} seasonGames
 * @param {number} target
 */
export function pointsNeeded(record, seasonGames, target) {
  const { points, gamesRemaining } = recordStats(record, seasonGames);
  const needed = Math.max(0, target - points);
  const available = POINTS_FOR_WIN * gamesRemaining;
  return {
    needed,
    available,
    reached: needed === 0,
    possible: needed <= available,
    /** Fraction of the remaining points needed; null when no games remain. */
    pctOfRemaining: available > 0 ? needed / available : null,
  };
}

/**
 * Magic numbers between "your" team and one other team, counted in points.
 *
 * clinch:      any combination of points your team earns and points the other
 *              team fails to earn that adds up to this number guarantees your
 *              team finishes ahead of them. Zero or less: already done.
 * elimination: the same, the other way round — the points they earn plus the
 *              points you fail to earn that guarantee they finish ahead of you.
 *
 * A team "fails to earn" two points with a regulation loss and one with an
 * overtime or shootout loss. `tiebreak` says who finishes ahead on equal points.
 *
 * @param {{ you: TeamRecord, them: TeamRecord, seasonGames: number, tiebreak: 'you' | 'them' }} input
 */
export function magicNumbers({ you, them, seasonGames, tiebreak }) {
  const a = recordStats(you, seasonGames);
  const b = recordStats(them, seasonGames);
  const clinch = b.maxPoints - a.points + (tiebreak === 'you' ? 0 : 1);
  const elimination = a.maxPoints - b.points + (tiebreak === 'them' ? 0 : 1);
  return {
    you: a,
    them: b,
    clinch,
    elimination,
    clinched: clinch <= 0,
    eliminated: elimination <= 0,
  };
}
