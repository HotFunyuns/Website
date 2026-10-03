// Basketball player rates: per-36 lines, usage percentage, Game Score and
// assist-to-turnover ratio.
//
// Sources, opened 2026-10-02:
//   Basketball-Reference glossary — https://www.basketball-reference.com/about/glossary.html
//     Per 36 Minutes: "A statistic (e.g., assists) divided by minutes played,
//       multiplied by 36."
//     Usg%: 100 * ((FGA + 0.44 * FTA + TOV) * (Tm MP / 5))
//                 / (MP * (Tm FGA + 0.44 * Tm FTA + Tm TOV))
//       "an estimate of the percentage of team plays used by a player while he
//       was on the floor."
//     GmSc: PTS + 0.4 * FG - 0.7 * FGA - 0.4 * (FTA - FT) + 0.7 * ORB + 0.3 * DRB
//           + STL + 0.7 * AST + 0.7 * BLK - 0.4 * PF - TOV
//       Created by John Hollinger "to give a rough measure of a player's
//       productivity for a single game ... (40 is an outstanding performance,
//       10 is an average performance, etc.)"
//   NBA.com Stat Glossary — https://www.nba.com/stats/help/glossary
//     AST/TO: "The number of assists for a player or team compared to the
//       number of turnovers they have committed" — assists divided by turnovers.
//
// scripts/tests/tools-per-36-calculator.test.mjs checks these functions against
// figures Basketball-Reference prints: usage and per-36 numbers on a team page,
// and Game Scores in a game log.

import { requireNumber } from './format.mjs';

/** Basketball-Reference's per-minute basis. */
export const PER_MINUTES = 36;

/** The free-throw weight in Basketball-Reference's usage formula. */
export const USAGE_FREE_THROW_WEIGHT = 0.44;

const MAX = 1_000_000;

/**
 * Reads minutes as a box score prints them: "34:30" (minutes and seconds) or a
 * decimal such as "34.5". Anything else is NaN, so validation can say so.
 *
 * @param {string | number | null | undefined} raw
 * @returns {number}
 */
export function parseMinutes(raw) {
  if (typeof raw === 'number') return raw;
  const text = String(raw ?? '')
    .trim()
    .replace(/,/g, '');
  const clock = /^(\d+):([0-5]?\d)$/.exec(text);
  if (clock) return Number(clock[1]) + Number(clock[2]) / 60;
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return Number.NaN;
  return Number(text);
}

/**
 * One player's line: a single game, per-game averages, or season totals.
 *
 * @typedef {object} PlayerLine
 * @property {number} minutes
 * @property {number} points
 * @property {number} fieldGoals
 * @property {number} fieldGoalAttempts
 * @property {number} freeThrows
 * @property {number} freeThrowAttempts
 * @property {number} offensiveRebounds
 * @property {number} defensiveRebounds
 * @property {number} assists
 * @property {number} steals
 * @property {number} blocks
 * @property {number} turnovers
 * @property {number} personalFouls
 */

/**
 * The team's totals over the same games, used only for usage percentage.
 *
 * @typedef {object} TeamTotals
 * @property {number} minutes            team minutes: five players' worth, 240 in a regulation game
 * @property {number} fieldGoalAttempts
 * @property {number} freeThrowAttempts
 * @property {number} turnovers
 */

/**
 * @param {PlayerLine} line
 * @returns {string[]}
 */
export function validatePlayerLine(line) {
  const errors = [];
  const fields = [
    ['Minutes', line.minutes],
    ['Points', line.points],
    ['Field goals made', line.fieldGoals],
    ['Field-goal attempts', line.fieldGoalAttempts],
    ['Free throws made', line.freeThrows],
    ['Free-throw attempts', line.freeThrowAttempts],
    ['Offensive rebounds', line.offensiveRebounds],
    ['Defensive rebounds', line.defensiveRebounds],
    ['Assists', line.assists],
    ['Steals', line.steals],
    ['Blocks', line.blocks],
    ['Turnovers', line.turnovers],
    ['Personal fouls', line.personalFouls],
  ];
  for (const [label, value] of fields) requireNumber(errors, String(label), Number(value), { min: 0, max: MAX });
  if (errors.length > 0) return errors;

  if (line.minutes === 0) errors.push('Minutes must be more than zero — every rate here is per minute played.');
  if (line.fieldGoals > line.fieldGoalAttempts) errors.push('Field goals made cannot be more than attempts.');
  if (line.freeThrows > line.freeThrowAttempts) errors.push('Free throws made cannot be more than attempts.');
  // Every field goal is worth two or three points, so a whole-number line has
  // a points total inside this range. Per-game averages are rounded, so the
  // check is skipped for them rather than raising a false alarm.
  if ([line.points, line.fieldGoals, line.freeThrows].every(Number.isInteger)) {
    const least = 2 * line.fieldGoals + line.freeThrows;
    const most = 3 * line.fieldGoals + line.freeThrows;
    if (line.points < least || line.points > most) {
      errors.push(
        `Points do not match the shooting line: ${line.fieldGoals} field goals and ${line.freeThrows} free throws make between ${least} and ${most} points.`
      );
    }
  }
  return errors;
}

/**
 * @param {TeamTotals} team
 * @param {PlayerLine} line
 * @returns {string[]}
 */
export function validateTeamTotals(team, line) {
  const errors = [];
  requireNumber(errors, 'Team minutes', team.minutes, { min: 0, max: MAX });
  requireNumber(errors, 'Team field-goal attempts', team.fieldGoalAttempts, { min: 0, max: MAX });
  requireNumber(errors, 'Team free-throw attempts', team.freeThrowAttempts, { min: 0, max: MAX });
  requireNumber(errors, 'Team turnovers', team.turnovers, { min: 0, max: MAX });
  if (errors.length > 0) return errors;

  if (team.minutes < line.minutes) errors.push('Team minutes cannot be fewer than the player’s minutes.');
  if (team.fieldGoalAttempts < line.fieldGoalAttempts) {
    errors.push('Team field-goal attempts include the player’s, so they cannot be fewer.');
  }
  if (team.freeThrowAttempts < line.freeThrowAttempts) {
    errors.push('Team free-throw attempts include the player’s, so they cannot be fewer.');
  }
  if (team.turnovers < line.turnovers) errors.push('Team turnovers include the player’s, so they cannot be fewer.');
  if (team.fieldGoalAttempts + USAGE_FREE_THROW_WEIGHT * team.freeThrowAttempts + team.turnovers === 0) {
    errors.push('The team totals need at least one shot, free throw or turnover.');
  }
  return errors;
}

/**
 * A statistic scaled to 36 minutes.
 *
 * @param {number} value
 * @param {number} minutes
 */
export function per36(value, minutes) {
  return (value * PER_MINUTES) / minutes;
}

/**
 * Hollinger's Game Score, as Basketball-Reference publishes it.
 *
 * @param {PlayerLine} line
 */
export function gameScore(line) {
  return (
    line.points +
    0.4 * line.fieldGoals -
    0.7 * line.fieldGoalAttempts -
    0.4 * (line.freeThrowAttempts - line.freeThrows) +
    0.7 * line.offensiveRebounds +
    0.3 * line.defensiveRebounds +
    line.steals +
    0.7 * line.assists +
    0.7 * line.blocks -
    0.4 * line.personalFouls -
    line.turnovers
  );
}

/**
 * Usage percentage as a fraction (0.19 is 19%).
 *
 * @param {PlayerLine} line
 * @param {TeamTotals} team
 */
export function usageRate(line, team) {
  const playerPlays = line.fieldGoalAttempts + USAGE_FREE_THROW_WEIGHT * line.freeThrowAttempts + line.turnovers;
  const teamPlays = team.fieldGoalAttempts + USAGE_FREE_THROW_WEIGHT * team.freeThrowAttempts + team.turnovers;
  return (playerPlays * (team.minutes / 5)) / (line.minutes * teamPlays);
}

/**
 * Everything the calculator shows. `team` is optional; without it usage is null.
 *
 * @param {PlayerLine} line
 * @param {TeamTotals | null} [team]
 */
export function playerRates(line, team = null) {
  const m = line.minutes;
  const rebounds = line.offensiveRebounds + line.defensiveRebounds;
  return {
    rebounds,
    per36: {
      points: per36(line.points, m),
      rebounds: per36(rebounds, m),
      offensiveRebounds: per36(line.offensiveRebounds, m),
      defensiveRebounds: per36(line.defensiveRebounds, m),
      assists: per36(line.assists, m),
      steals: per36(line.steals, m),
      blocks: per36(line.blocks, m),
      turnovers: per36(line.turnovers, m),
      fieldGoals: per36(line.fieldGoals, m),
      fieldGoalAttempts: per36(line.fieldGoalAttempts, m),
      freeThrows: per36(line.freeThrows, m),
      freeThrowAttempts: per36(line.freeThrowAttempts, m),
      personalFouls: per36(line.personalFouls, m),
    },
    gameScore: gameScore(line),
    assistToTurnover: line.turnovers > 0 ? line.assists / line.turnovers : null,
    usage: team ? usageRate(line, team) : null,
    /** True when the line covers fewer than 36 minutes, so per-36 figures project beyond what was played. */
    projectsBeyondMinutes: m < PER_MINUTES,
  };
}
