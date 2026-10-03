// Baseball rate statistics.
//
// Batting average, slugging percentage, on-base percentage and earned-run
// average are defined in Rule 9.21 of MLB's Official Baseball Rules (2026
// edition). WHIP, K/9, BB/9, HR/9, K/BB, OPS, isolated power and BABIP follow
// MLB.com's glossary; FIP and its constant follow the FanGraphs Sabermetrics
// Library. Each function states its formula next to the code that computes it.

import { requireNumber, requireWhole } from './format.mjs';

const MAX = 1_000_000;

/* --------------------------------------------------------------- innings */

/**
 * Box scores write innings in outs: "6.1" is six innings and one out (6⅓),
 * "6.2" is 6⅔. Returns the number of outs, or NaN for anything that is not
 * that notation — including "6.3", because the third out ends the inning.
 *
 * @param {string | number} notation
 * @returns {number} outs
 */
export function parseInnings(notation) {
  const text = String(notation ?? '').trim();
  const match = /^(\d+)(?:\.(\d))?$/.exec(text);
  if (!match) return Number.NaN;
  const whole = Number(match[1]);
  const partial = match[2] === undefined ? 0 : Number(match[2]);
  if (partial > 2) return Number.NaN;
  return whole * 3 + partial;
}

/**
 * Outs back to box-score notation: 19 → "6.1".
 *
 * @param {number} outs
 * @returns {string}
 */
export function formatInnings(outs) {
  return `${Math.floor(outs / 3)}.${outs % 3}`;
}

/* --------------------------------------------------------------- batting */

/**
 * @typedef {object} BattingLine
 * @property {number} atBats
 * @property {number} hits
 * @property {number} doubles
 * @property {number} triples
 * @property {number} homeRuns
 * @property {number} walks
 * @property {number} hitByPitch
 * @property {number} sacrificeFlies
 * @property {number | null} [strikeouts]  needed only for BABIP
 */

/**
 * @param {BattingLine} line
 * @returns {string[]}
 */
export function validateBattingLine(line) {
  const errors = [];
  requireWhole(errors, 'At-bats', line.atBats, { min: 1, max: MAX });
  requireWhole(errors, 'Hits', line.hits, { max: MAX });
  requireWhole(errors, 'Doubles', line.doubles, { max: MAX });
  requireWhole(errors, 'Triples', line.triples, { max: MAX });
  requireWhole(errors, 'Home runs', line.homeRuns, { max: MAX });
  requireWhole(errors, 'Walks', line.walks, { max: MAX });
  requireWhole(errors, 'Hit by pitch', line.hitByPitch, { max: MAX });
  requireWhole(errors, 'Sacrifice flies', line.sacrificeFlies, { max: MAX });
  const hasStrikeouts = line.strikeouts !== null && line.strikeouts !== undefined;
  if (hasStrikeouts) requireWhole(errors, 'Strikeouts', line.strikeouts, { max: MAX });
  if (errors.length > 0) return errors;

  if (line.hits > line.atBats) errors.push('Hits cannot be more than at-bats.');
  if (line.doubles + line.triples + line.homeRuns > line.hits) {
    errors.push('Doubles, triples and home runs together cannot be more than hits.');
  }
  if (hasStrikeouts && line.hits + line.strikeouts > line.atBats) {
    errors.push('Hits plus strikeouts cannot be more than at-bats.');
  }
  return errors;
}

/**
 * AVG = H / AB; OBP = (H + BB + HBP) / (AB + BB + HBP + SF); SLG = TB / AB,
 * with TB = 1B + 2×2B + 3×3B + 4×HR; OPS = OBP + SLG; ISO = SLG − AVG;
 * BABIP = (H − HR) / (AB − K − HR + SF), or null without strikeouts or when
 * no ball was put in play.
 *
 * @param {BattingLine} line
 */
export function battingStats(line) {
  const { atBats, hits, doubles, triples, homeRuns, walks, hitByPitch, sacrificeFlies } = line;
  const singles = hits - doubles - triples - homeRuns;
  const totalBases = singles + 2 * doubles + 3 * triples + 4 * homeRuns;
  const timesOnBase = hits + walks + hitByPitch;
  const onBaseDenominator = atBats + walks + hitByPitch + sacrificeFlies;

  const hasStrikeouts = line.strikeouts !== null && line.strikeouts !== undefined;
  const ballsInPlay = hasStrikeouts ? atBats - line.strikeouts - homeRuns + sacrificeFlies : null;

  const avg = hits / atBats;
  const obp = timesOnBase / onBaseDenominator;
  const slg = totalBases / atBats;
  return {
    singles,
    totalBases,
    timesOnBase,
    onBaseDenominator,
    ballsInPlay,
    avg,
    obp,
    slg,
    ops: obp + slg,
    iso: slg - avg,
    babip: ballsInPlay !== null && ballsInPlay > 0 ? (hits - homeRuns) / ballsInPlay : null,
  };
}

/* -------------------------------------------------------------- pitching */

/**
 * @typedef {object} PitchingLine
 * @property {number} outs  innings pitched, in outs (see parseInnings)
 * @property {number} earnedRuns
 * @property {number} hits
 * @property {number} walks
 * @property {number} strikeouts
 * @property {number | null} [homeRuns]    needed for HR/9 and FIP
 * @property {number | null} [hitByPitch]  needed for FIP
 * @property {number | null} [fipConstant] FIP is skipped when this is null
 * @property {number} [gameInnings]  innings in a regulation game; ERA is scaled to it (default 9)
 */

/**
 * @param {PitchingLine} line
 * @returns {string[]}
 */
export function validatePitchingLine(line) {
  const errors = [];
  if (!Number.isFinite(line.outs)) {
    errors.push('Innings pitched: use box-score notation such as 6, 6.1 or 6.2 (the digit after the point counts outs, so it can only be 0, 1 or 2).');
  } else {
    requireWhole(errors, 'Innings pitched', line.outs, { min: 1, max: MAX });
  }
  requireWhole(errors, 'Earned runs', line.earnedRuns, { max: MAX });
  requireWhole(errors, 'Hits allowed', line.hits, { max: MAX });
  requireWhole(errors, 'Walks', line.walks, { max: MAX });
  requireWhole(errors, 'Strikeouts', line.strikeouts, { max: MAX });
  if (line.gameInnings !== undefined) requireWhole(errors, 'Innings per game', line.gameInnings, { min: 1, max: 9 });
  if (line.homeRuns !== null && line.homeRuns !== undefined) {
    requireWhole(errors, 'Home runs allowed', line.homeRuns, { max: MAX });
  }

  const wantsFip = line.fipConstant !== null && line.fipConstant !== undefined;
  if (wantsFip) {
    requireNumber(errors, 'FIP constant', line.fipConstant, { min: 0, max: 10 });
    if (line.homeRuns === null || line.homeRuns === undefined) errors.push('FIP needs home runs allowed.');
    requireWhole(errors, 'Hit batters (for FIP)', line.hitByPitch ?? Number.NaN, { max: MAX });
  }
  return errors;
}

/**
 * ERA = 9 × ER / IP (MLB) — and the same figure scaled to `gameInnings` when a
 * league plays shorter games; WHIP = (BB + H) / IP; K/9, BB/9 and HR/9 =
 * 9 × count / IP; K/BB = K / BB; FIP = (13 × HR + 3 × (BB + HBP) − 2 × K) / IP
 * + constant.
 *
 * @param {PitchingLine} line
 */
export function pitchingStats(line) {
  const innings = line.outs / 3;
  const gameInnings = line.gameInnings ?? 9;
  const hasHomeRuns = line.homeRuns !== null && line.homeRuns !== undefined;
  const wantsFip = line.fipConstant !== null && line.fipConstant !== undefined;
  const fipCore = wantsFip
    ? (13 * (line.homeRuns ?? 0) + 3 * (line.walks + (line.hitByPitch ?? 0)) - 2 * line.strikeouts) / innings
    : null;
  return {
    innings,
    gameInnings,
    era: (9 * line.earnedRuns) / innings,
    eraPerGame: (gameInnings * line.earnedRuns) / innings,
    whip: (line.walks + line.hits) / innings,
    k9: (9 * line.strikeouts) / innings,
    bb9: (9 * line.walks) / innings,
    hr9: hasHomeRuns ? (9 * Number(line.homeRuns)) / innings : null,
    strikeoutsPerWalk: line.walks > 0 ? line.strikeouts / line.walks : null,
    fipCore,
    fip: fipCore === null ? null : fipCore + Number(line.fipConstant),
  };
}

/**
 * The FIP constant for a season, from league totals (FanGraphs):
 * lgERA − (13 × lgHR + 3 × (lgBB + lgHBP) − 2 × lgK) / lgIP.
 *
 * @param {{ leagueEra: number, homeRuns: number, walks: number, hitByPitch: number, strikeouts: number, outs: number }} league
 */
export function fipConstantFromLeague({ leagueEra, homeRuns, walks, hitByPitch, strikeouts, outs }) {
  return leagueEra - (13 * homeRuns + 3 * (walks + hitByPitch) - 2 * strikeouts) / (outs / 3);
}

/**
 * @param {{ leagueEra: number, homeRuns: number, walks: number, hitByPitch: number, strikeouts: number, outs: number }} league
 * @returns {string[]}
 */
export function validateLeagueTotals(league) {
  const errors = [];
  requireNumber(errors, 'League ERA', league.leagueEra, { min: 0, max: 20 });
  requireWhole(errors, 'League home runs', league.homeRuns, { max: 100_000_000 });
  requireWhole(errors, 'League walks', league.walks, { max: 100_000_000 });
  requireWhole(errors, 'League hit batters', league.hitByPitch, { max: 100_000_000 });
  requireWhole(errors, 'League strikeouts', league.strikeouts, { max: 100_000_000 });
  if (!Number.isFinite(league.outs)) errors.push('League innings: use box-score notation such as 43210.1.');
  else requireWhole(errors, 'League innings', league.outs, { min: 3, max: 300_000_000 });
  return errors;
}
