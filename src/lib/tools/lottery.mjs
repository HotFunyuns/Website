// Draft lottery: a weighted draw for the first picks, then every other team in
// standings order.
//
// The draw — NBA.com, "NBA Draft Lottery: How it works, odds and where to
// watch", describing the drawing used through the 2026 lottery: 1,000 of the
// 1,001 four-ball combinations are assigned to the teams, and "if the same team
// comes up more than once ... the result is discarded and another four-ball
// combination is drawn". Each draw therefore picks among the teams not yet
// drawn, in proportion to their odds:
//
//   P(team i wins the next draw) = odds_i ÷ Σ odds of the teams not yet drawn
//
// The baseball preset — MLB.com:
//   "Odds for 2026 MLB Draft Lottery" (Dec. 8, 2025): the 18 non-playoff teams
//   are entered for the top six picks; 15 are eligible, with published chances
//   of the No. 1 pick from 27.73% to 0.34%; three are ineligible.
//   "MLB Draft lottery unlike any other" (Dec. 6, 2022): the base odds by record
//   (16.5% for each of the three worst, then 13.2, 10.0, 7.5, 5.5, 3.9, 2.7, 1.8,
//   1.4, 1.1, 0.9, 0.8, 0.6, 0.5, 0.4, 0.2); after the six lottery picks the
//   other teams draft in reverse order of winning percentage; clubs ineligible
//   for a lottery pick "will be permitted to select no earlier than 10th".
// Rescaling the base odds over the 15 eligible teams reproduces every published
// 2026 figure (scripts/tests/tools-draft-lottery-simulator.test.mjs). MLB does
// not describe how the second to sixth draws are weighted; the simulator
// assumes the rule NBA.com describes, and the page says so.
//
// Exact probabilities: a dynamic programme over the set of teams drawn so far,
// which is exact and fast while the number of possible sets stays small (the
// baseball preset has 9,949). Larger leagues fall back to simulation.
// Simulations use draft.mjs's generators: the browser's cryptographic one, or
// a seeded one so a run can be repeated.

import { requireWhole } from './format.mjs';

/** The most teams a lottery may have (sets of teams are kept as bitmasks). */
export const MAX_TEAMS = 30;

/** Above this many partial draws, exact probabilities are not computed. */
export const EXACT_STATE_LIMIT = 250_000;

/** MLB's base odds by record, worst first (MLB.com, 2022). */
export const MLB_BASE_ODDS = [16.5, 16.5, 16.5, 13.2, 10.0, 7.5, 5.5, 3.9, 2.7, 1.8, 1.4, 1.1, 0.9, 0.8, 0.6, 0.5, 0.4, 0.2];

/**
 * The 2026 MLB lottery as MLB.com published it: the 18 non-playoff teams by
 * 2025 record, worst first, with each eligible team's chance of the No. 1 pick
 * and `null` for the three ineligible teams. Teams are numbered, not named.
 */
export const MLB_2026_ODDS = [null, 27.73, null, 22.18, 16.81, null, 9.24, 6.55, 4.54, 3.03, 2.35, 1.85, 1.51, 1.34, 1.01, 0.84, 0.67, 0.34];

export const LOTTERY_PRESETS = [
  {
    id: 'mlb-2026',
    label: 'MLB — 2026 lottery',
    picksDrawn: 6,
    ineligibleFloor: 10,
    text: MLB_2026_ODDS.map((odds, i) => `Team ${i + 1}, ${odds === null ? 'ineligible' : odds}`).join('\n'),
  },
];

/**
 * @typedef {object} LotteryTeam
 * @property {string} name
 * @property {number} odds  relative weight; 0 means the team cannot be drawn
 */

/**
 * @typedef {object} Lottery
 * @property {LotteryTeam[]} teams   in standings order, worst record first
 * @property {number} picksDrawn     picks decided by the draw
 * @property {number | null} [ineligibleFloor]  earliest pick for a team with odds of 0
 */

/* ------------------------------------------------------------------ input */

/**
 * One team per line: "Name, odds". Odds may be any non-negative number (a
 * percentage, a count of combinations or balls) or "ineligible". Blank lines
 * are ignored.
 *
 * @param {string} text
 * @returns {{ teams: LotteryTeam[], errors: string[] }}
 */
export function parseLotteryTeams(text) {
  const teams = [];
  const errors = [];
  const lines = String(text ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  lines.forEach((line, i) => {
    const cut = line.lastIndexOf(',');
    if (cut === -1) {
      errors.push(`Line ${i + 1}: add the odds after a comma, such as “Team ${i + 1}, 14”.`);
      return;
    }
    const name = line.slice(0, cut).trim();
    const raw = line.slice(cut + 1).trim().replace(/%$/, '').trim();
    const odds = /^(ineligible|x|-)$/i.test(raw) ? 0 : /^\d+(?:\.\d+)?$|^\.\d+$/.test(raw) ? Number(raw) : Number.NaN;
    if (!name) errors.push(`Line ${i + 1}: add a team name before the comma.`);
    else if (name.length > 40) errors.push(`Line ${i + 1}: keep the team name to 40 characters or fewer.`);
    if (!Number.isFinite(odds)) errors.push(`Line ${i + 1}: the odds must be a number of 0 or more, or “ineligible”.`);
    teams.push({ name, odds });
  });
  return { teams, errors };
}

/**
 * @param {Lottery & { runs?: number | null }} lottery
 * @returns {string[]}
 */
export function validateLottery({ teams, picksDrawn, ineligibleFloor = null, runs = null }) {
  const errors = [];
  if (teams.length < 2) errors.push('Enter at least two teams, one per line.');
  if (teams.length > MAX_TEAMS) errors.push(`Enter no more than ${MAX_TEAMS} teams.`);
  const seen = new Set();
  for (const team of teams) {
    const key = team.name.toLowerCase();
    if (key && seen.has(key)) {
      errors.push(`“${team.name}” appears more than once — give each team a different name.`);
      break;
    }
    seen.add(key);
  }
  const eligible = teams.filter((team) => team.odds > 0).length;
  if (teams.length >= 2 && eligible === 0) errors.push('Give at least one team odds above zero.');
  requireWhole(errors, 'Picks decided by the draw', picksDrawn, { min: 1, max: MAX_TEAMS });
  if (Number.isInteger(picksDrawn) && eligible > 0 && picksDrawn > eligible) {
    errors.push(`Only ${eligible} team${eligible === 1 ? ' has' : 's have'} odds above zero, so the draw can decide at most ${eligible} pick${eligible === 1 ? '' : 's'}.`);
  }
  if (ineligibleFloor !== null && ineligibleFloor !== undefined) {
    requireWhole(errors, 'Earliest pick for ineligible teams', ineligibleFloor, { min: 1, max: MAX_TEAMS });
    if (Number.isInteger(ineligibleFloor) && ineligibleFloor > teams.length) {
      errors.push('The earliest pick for ineligible teams cannot be later than the number of teams.');
    }
  }
  if (runs !== null && runs !== undefined) requireWhole(errors, 'Simulated lotteries', runs, { min: 100, max: 100_000 });
  return errors;
}

/* ------------------------------------------------------------ the draw */

/**
 * The full order once the draw is known: the drawn teams first, in the order
 * drawn, then everyone else in standings order — except that a team with odds
 * of 0 may not pick before `ineligibleFloor`.
 *
 * @param {Lottery} lottery
 * @param {number[]} drawn indexes of the teams drawn, in draw order
 * @returns {number[]} team indexes, first pick first
 */
export function orderAfterDraw({ teams, ineligibleFloor = null }, drawn) {
  const order = [...drawn];
  const rest = teams.map((_, i) => i).filter((i) => !drawn.includes(i));
  while (rest.length > 0) {
    const pick = order.length + 1;
    let at = rest.findIndex((i) => !ineligibleFloor || teams[i].odds > 0 || pick >= ineligibleFloor);
    if (at === -1) at = 0;
    order.push(rest.splice(at, 1)[0]);
  }
  return order;
}

/**
 * One lottery. `randomInt(n)` must return a uniform integer in [0, n), as
 * draft.mjs's generators do.
 *
 * @param {Lottery} lottery
 * @param {(n: number) => number} randomInt
 * @returns {number[]} team indexes, first pick first
 */
export function drawLottery(lottery, randomInt) {
  const { teams, picksDrawn } = lottery;
  const drawn = [];
  for (let k = 0; k < picksDrawn; k++) {
    let total = 0;
    for (let i = 0; i < teams.length; i++) if (!drawn.includes(i)) total += teams[i].odds;
    // A uniform number in [0, 1) from 53 random bits (21 + 32, exactly
    // representable), scaled to the odds still in the draw, then a walk
    // along the cumulative odds.
    const u = (randomInt(0x200000) * 0x100000000 + randomInt(0x100000000)) / 2 ** 53;
    let target = u * total;
    let chosen = -1;
    for (let i = 0; i < teams.length; i++) {
      if (drawn.includes(i) || teams[i].odds <= 0) continue;
      chosen = i;
      if (target < teams[i].odds) break;
      target -= teams[i].odds;
    }
    drawn.push(chosen);
  }
  return orderAfterDraw(lottery, drawn);
}

/**
 * Many lotteries: how often each team landed each pick.
 *
 * @param {Lottery} lottery
 * @param {number} runs
 * @param {(n: number) => number} randomInt
 * @returns {number[][]} share[team][pick − 1]
 */
export function simulateLottery(lottery, runs, randomInt) {
  const n = lottery.teams.length;
  const counts = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let r = 0; r < runs; r++) {
    drawLottery(lottery, randomInt).forEach((team, pick) => {
      counts[team][pick] += 1;
    });
  }
  return counts.map((row) => row.map((count) => count / runs));
}

/* ------------------------------------------------------------- exact odds */

/**
 * How many partial draws the exact calculation would visit.
 *
 * @param {Lottery} lottery
 */
export function exactStateCount({ teams, picksDrawn }) {
  const m = teams.filter((team) => team.odds > 0).length;
  let total = 0;
  let choose = 1;
  for (let k = 0; k <= Math.min(picksDrawn, m); k++) {
    total += choose;
    choose = (choose * (m - k)) / (k + 1);
  }
  return total;
}

/**
 * The exact chance of every team landing every pick, or null when the league
 * is too large to enumerate (see EXACT_STATE_LIMIT).
 *
 * @param {Lottery} lottery
 * @returns {number[][] | null} probability[team][pick − 1]
 */
export function exactLottery(lottery) {
  const { teams, picksDrawn } = lottery;
  if (exactStateCount(lottery) > EXACT_STATE_LIMIT) return null;
  const n = teams.length;
  const probability = Array.from({ length: n }, () => new Array(n).fill(0));
  const eligible = teams.map((team, i) => ({ i, odds: team.odds })).filter((team) => team.odds > 0);
  const total = eligible.reduce((sum, team) => sum + team.odds, 0);

  // level: drawn set (bitmask over team indexes) → [probability, odds drawn]
  let level = new Map([[0, [1, 0]]]);
  for (let k = 0; k < picksDrawn; k++) {
    const next = new Map();
    for (const [mask, [p, drawnOdds]] of level) {
      const remaining = total - drawnOdds;
      for (const { i, odds } of eligible) {
        const bit = 2 ** i;
        if (Math.floor(mask / bit) % 2 === 1) continue;
        const q = (p * odds) / remaining;
        probability[i][k] += q;
        const key = mask + bit;
        const entry = next.get(key);
        if (entry) entry[0] += q;
        else next.set(key, [q, drawnOdds + odds]);
      }
    }
    level = next;
  }
  // Everyone not drawn follows in standings order. The drawn teams' own
  // positions are already counted, so only the rest are placed here.
  for (const [mask, [p]] of level) {
    const drawn = [];
    for (let i = 0; i < n; i++) if (Math.floor(mask / 2 ** i) % 2 === 1) drawn.push(i);
    const order = orderAfterDraw(lottery, drawn);
    for (let pick = picksDrawn; pick < n; pick++) probability[order[pick]][pick] += p;
  }
  return probability;
}

/**
 * Summary figures for each team from a probability (or frequency) matrix.
 *
 * @param {number[][]} matrix probability[team][pick − 1]
 * @param {number} picksDrawn
 */
export function summarise(matrix, picksDrawn) {
  return matrix.map((row) => {
    const possible = row.map((p, pick) => (p > 1e-12 ? pick + 1 : 0)).filter(Boolean);
    let mostLikely = 1;
    row.forEach((p, pick) => {
      if (p > row[mostLikely - 1] + 1e-12) mostLikely = pick + 1;
    });
    return {
      first: row[0],
      drawnPick: row.slice(0, picksDrawn).reduce((sum, p) => sum + p, 0),
      expectedPick: row.reduce((sum, p, pick) => sum + p * (pick + 1), 0),
      best: possible.length > 0 ? Math.min(...possible) : null,
      worst: possible.length > 0 ? Math.max(...possible) : null,
      mostLikely,
    };
  });
}
