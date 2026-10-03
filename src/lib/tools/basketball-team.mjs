// Team efficiency: Dean Oliver's four factors, an estimate of possessions,
// pace, and offensive, defensive and net rating.
//
// Sources, opened 2026-10-02:
//   Basketball-Reference, "Four Factors" — https://www.basketball-reference.com/about/factors.html
//     Weights: Shooting (40%), Turnovers (25%), Rebounding (20%), Free Throws
//       (15%) — "the approximate weight Mr. Oliver assigned each factor".
//     eFG% = (FG + 0.5 * 3P) / FGA
//     TOV% = TOV / (FGA + 0.44 * FTA + TOV)
//     ORB% = ORB / (ORB + Opp DRB);  DRB% = DRB / (Opp ORB + DRB)
//     FT/FGA = FT / FGA
//     Each worked through for a 2004-05 team season; the tests reproduce them.
//   Basketball-Reference glossary — https://www.basketball-reference.com/about/glossary.html
//     Poss = 0.5 * ((Tm FGA + 0.4 * Tm FTA - 1.07 * (Tm ORB / (Tm ORB + Opp DRB)) * (Tm FGA - Tm FG) + Tm TOV)
//                 + (Opp FGA + 0.4 * Opp FTA - 1.07 * (Opp ORB / (Opp ORB + Tm DRB)) * (Opp FGA - Opp FG) + Opp TOV))
//       "estimates possessions based on both the team's statistics and their
//       opponent's statistics, then averages them".
//     Pace = 48 * ((Tm Poss + Opp Poss) / (2 * (Tm MP / 5))); "40 minutes is
//       used in the calculation for the WNBA."
//     ORtg (teams): points scored per 100 possessions; DRtg: points allowed per 100.
//   NBA.com Stat Glossary — https://www.nba.com/stats/help/glossary
//     OffRtg = 100 * (Points / POSS); DefRtg = 100 * (Opp Points / Opp POSS);
//     NetRtg = OFFRTG - DEFRTG.
//
// Possessions are an estimate from the box score, not a count. Because the
// estimate averages both teams' sides, it is the same for both teams, so the
// opponent's possessions equal the team's here.

import { requireNumber } from './format.mjs';

/** Dean Oliver's approximate weights, as Basketball-Reference reports them. */
export const FOUR_FACTOR_WEIGHTS = [
  { id: 'shooting', label: 'Shooting', weight: 0.4 },
  { id: 'turnovers', label: 'Turnovers', weight: 0.25 },
  { id: 'rebounding', label: 'Rebounding', weight: 0.2 },
  { id: 'freeThrows', label: 'Free throws', weight: 0.15 },
];

/** The free-throw weight in TOV%. */
export const TOV_FREE_THROW_WEIGHT = 0.44;
/** The free-throw weight and offensive-rebound factor in the possessions estimate. */
export const POSS_FREE_THROW_WEIGHT = 0.4;
export const POSS_REBOUND_FACTOR = 1.07;

/** Pace is expressed per this many minutes: 48 in Basketball-Reference's formula, 40 for the WNBA. */
export const PACE_BASES = [48, 40];

const MAX = 1_000_000;

/**
 * One side's box-score totals. Points are not entered: they follow from the
 * line (two per field goal, one more per three, one per free throw).
 *
 * @typedef {object} TeamLine
 * @property {number} fieldGoals            made field goals, twos and threes together
 * @property {number} fieldGoalAttempts
 * @property {number} threePointers
 * @property {number} freeThrows
 * @property {number} freeThrowAttempts
 * @property {number} offensiveRebounds
 * @property {number} defensiveRebounds
 * @property {number} turnovers
 */

/**
 * @typedef {object} GameInput
 * @property {TeamLine} team
 * @property {TeamLine} opponent
 * @property {number} teamMinutes    five players' minutes: 240 for one regulation NBA game
 * @property {number} [paceBasis]    48 (default) or 40
 */

/**
 * @param {TeamLine} line
 * @param {string} who
 * @returns {string[]}
 */
function validateLine(line, who) {
  const errors = [];
  const fields = [
    ['field goals made', line.fieldGoals],
    ['field-goal attempts', line.fieldGoalAttempts],
    ['three-pointers made', line.threePointers],
    ['free throws made', line.freeThrows],
    ['free-throw attempts', line.freeThrowAttempts],
    ['offensive rebounds', line.offensiveRebounds],
    ['defensive rebounds', line.defensiveRebounds],
    ['turnovers', line.turnovers],
  ];
  for (const [label, value] of fields) requireNumber(errors, `${who} ${label}`, Number(value), { min: 0, max: MAX });
  if (errors.length > 0) return errors;
  if (line.fieldGoalAttempts === 0) errors.push(`${who} field-goal attempts must be more than zero.`);
  if (line.fieldGoals > line.fieldGoalAttempts) errors.push(`${who} field goals made cannot be more than attempts.`);
  if (line.threePointers > line.fieldGoals) {
    errors.push(`${who} three-pointers are part of field goals made, so they cannot be more.`);
  }
  if (line.freeThrows > line.freeThrowAttempts) errors.push(`${who} free throws made cannot be more than attempts.`);
  return errors;
}

/**
 * @param {GameInput} input
 * @returns {string[]}
 */
export function validateGame(input) {
  const errors = [...validateLine(input.team, 'Team'), ...validateLine(input.opponent, 'Opponent')];
  requireNumber(errors, 'Team minutes', input.teamMinutes, { min: 0, max: MAX });
  if (input.paceBasis !== undefined && !PACE_BASES.includes(input.paceBasis)) {
    errors.push('Pace is per 48 or per 40 minutes.');
  }
  if (errors.length > 0) return errors;
  if (input.teamMinutes === 0) errors.push('Team minutes must be more than zero.');
  if (input.team.offensiveRebounds + input.opponent.defensiveRebounds === 0) {
    errors.push('The team’s offensive rebounds and the opponent’s defensive rebounds cannot both be zero.');
  }
  if (input.opponent.offensiveRebounds + input.team.defensiveRebounds === 0) {
    errors.push('The opponent’s offensive rebounds and the team’s defensive rebounds cannot both be zero.');
  }
  if (errors.length === 0 && possessions(input.team, input.opponent) <= 0) {
    errors.push('These totals do not give a positive possession estimate — check them against the box score.');
  }
  return errors;
}

/** @param {TeamLine} line */
export function pointsFrom(line) {
  return 2 * line.fieldGoals + line.threePointers + line.freeThrows;
}

/**
 * The four factors for one side's offence. `opponent` supplies the defensive
 * rebounds that ORB% is measured against.
 *
 * @param {TeamLine} line
 * @param {TeamLine} opponent
 */
export function fourFactors(line, opponent) {
  return {
    effectiveFieldGoalPct: (line.fieldGoals + 0.5 * line.threePointers) / line.fieldGoalAttempts,
    turnoverPct: line.turnovers / (line.fieldGoalAttempts + TOV_FREE_THROW_WEIGHT * line.freeThrowAttempts + line.turnovers),
    offensiveReboundPct: line.offensiveRebounds / (line.offensiveRebounds + opponent.defensiveRebounds),
    freeThrowRate: line.freeThrows / line.fieldGoalAttempts,
  };
}

/**
 * One side's half of Basketball-Reference's possession estimate.
 *
 * @param {TeamLine} line
 * @param {TeamLine} opponent
 */
export function possessionEstimate(line, opponent) {
  const offensiveReboundShare = line.offensiveRebounds / (line.offensiveRebounds + opponent.defensiveRebounds);
  return (
    line.fieldGoalAttempts +
    POSS_FREE_THROW_WEIGHT * line.freeThrowAttempts -
    POSS_REBOUND_FACTOR * offensiveReboundShare * (line.fieldGoalAttempts - line.fieldGoals) +
    line.turnovers
  );
}

/**
 * Basketball-Reference's possession estimate: the average of both sides' estimates.
 *
 * @param {TeamLine} team
 * @param {TeamLine} opponent
 */
export function possessions(team, opponent) {
  return 0.5 * (possessionEstimate(team, opponent) + possessionEstimate(opponent, team));
}

/**
 * @param {GameInput} input
 */
export function teamEfficiency(input) {
  const { team, opponent, teamMinutes } = input;
  const paceBasis = input.paceBasis ?? 48;
  const poss = possessions(team, opponent);
  const points = pointsFrom(team);
  const opponentPoints = pointsFrom(opponent);
  const offensiveRating = (100 * points) / poss;
  const defensiveRating = (100 * opponentPoints) / poss;
  const teamFactors = fourFactors(team, opponent);
  const opponentFactors = fourFactors(opponent, team);
  return {
    points,
    opponentPoints,
    team: teamFactors,
    opponent: opponentFactors,
    /** The team's defensive rebound percentage: the share of the opponent's misses it rebounded. */
    defensiveReboundPct: team.defensiveRebounds / (opponent.offensiveRebounds + team.defensiveRebounds),
    teamPossessionEstimate: possessionEstimate(team, opponent),
    opponentPossessionEstimate: possessionEstimate(opponent, team),
    possessions: poss,
    paceBasis,
    // Basketball-Reference's pace: paceBasis × (Tm Poss + Opp Poss) / (2 × (Tm MP / 5)).
    // The two possession counts are equal here, so this is paceBasis × poss / (Tm MP / 5).
    pace: (paceBasis * (2 * poss)) / (2 * (teamMinutes / 5)),
    offensiveRating,
    defensiveRating,
    netRating: offensiveRating - defensiveRating,
  };
}

/**
 * Which side did better on each factor: a higher eFG%, ORB% and FT/FGA, and a
 * lower TOV%, are better.
 *
 * @param {ReturnType<typeof fourFactors>} team
 * @param {ReturnType<typeof fourFactors>} opponent
 * @returns {Record<'shooting' | 'turnovers' | 'rebounding' | 'freeThrows', 'team' | 'opponent' | 'even'>}
 */
export function factorEdges(team, opponent) {
  /** @param {number} a @param {number} b @param {boolean} higherIsBetter */
  const edge = (a, b, higherIsBetter) => {
    if (Math.abs(a - b) < 1e-12) return 'even';
    return (a > b) === higherIsBetter ? 'team' : 'opponent';
  };
  return {
    shooting: edge(team.effectiveFieldGoalPct, opponent.effectiveFieldGoalPct, true),
    turnovers: edge(team.turnoverPct, opponent.turnoverPct, false),
    rebounding: edge(team.offensiveReboundPct, opponent.offensiveReboundPct, true),
    freeThrows: edge(team.freeThrowRate, opponent.freeThrowRate, true),
  };
}
