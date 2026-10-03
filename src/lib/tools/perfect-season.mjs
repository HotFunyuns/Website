// Perfect and unbeaten seasons: the chance that a team with the same chance of
// winning every game wins all of them, or loses none of them.
//
//   P(perfect, n–0)          = w^n
//   P(unbeaten, no losses)   = (w + d)^n = (1 − l)^n
//   P(exactly k losses)      = C(n, k) · l^k · (1 − l)^(n − k)
//
// where w, d and l are one game's chances of a win, a draw and a loss. These
// are the binomial distribution's probability mass function, from the NIST/
// SEMATECH e-Handbook of Statistical Methods, section 1.3.6.6.18, with a loss
// as one outcome and anything else as the other. NIST notes that the binomial
// distribution "assumes that p is fixed for all trials"; treating the games as
// independent of one another is the other half of the model. Neither holds in a
// real season, and the tool page says so.
//
// Season-length presets, each from the body that sets the schedule:
//   162  Official Baseball Rules 2026, Rule 9.22(a) Comment: a major-league
//        schedule of 162 games for each club
//    82  NBA.com, "NBA announces schedule for 2026-27 season": 82 games each
//    17  2025 NFL Record & Fact Book: "every team plays 17 games"
//    20  the same plus three playoff wins — the Fact Book's 2025 postseason
//        schedule gives the No. 1 seed in each conference the only bye, so it
//        plays the divisional round, the conference championship and the
//        Super Bowl
//    38  arithmetic: a 20-team league in which every side plays the other 19
//        home and away

import { formatFixed, requireNumber, requireWhole, roundHalfUp } from './format.mjs';

/** Season lengths the calculator offers, each traceable to a cited source. */
export const SEASON_PRESETS = [
  { id: 'football', games: 17, label: '17 — NFL regular season' },
  { id: 'football-top-seed', games: 20, label: '20 — NFL No. 1 seed, with playoffs' },
  { id: 'league-38', games: 38, label: '38 — 20-team league, home and away' },
  { id: 'basketball', games: 82, label: '82 — NBA regular season' },
  { id: 'baseball', games: 162, label: '162 — MLB regular season' },
];

/**
 * @typedef {object} SeasonInput
 * @property {number} games        games in the season
 * @property {number} winPercent   one game's chance of a win, 0–100
 * @property {number} [drawPercent] one game's chance of a draw, 0–100
 */

/**
 * @param {SeasonInput} input
 * @returns {string[]}
 */
export function validateSeason({ games, winPercent, drawPercent = 0 }) {
  const errors = [];
  requireWhole(errors, 'Games in the season', games, { min: 1, max: 1_000 });
  requireNumber(errors, 'Chance of winning a game', winPercent, { min: 0, max: 100 });
  requireNumber(errors, 'Chance of a draw', drawPercent, { min: 0, max: 100 });
  if (errors.length > 0) return errors;
  if (winPercent + drawPercent > 100 + 1e-9) {
    errors.push('The chances of a win and a draw cannot add up to more than 100%.');
  }
  return errors;
}

/**
 * log C(n, k), summed term by term so a 1,000-game season cannot overflow.
 *
 * @param {number} n
 * @param {number} k
 */
function logChoose(n, k) {
  const m = Math.min(k, n - k);
  let total = 0;
  for (let i = 1; i <= m; i++) total += Math.log((n - m + i) / i);
  return total;
}

/**
 * The binomial probability mass function, P(x; p, n) in NIST's notation.
 *
 * @param {number} n trials
 * @param {number} x successes
 * @param {number} p chance of success on one trial
 */
export function binomialPmf(n, x, p) {
  if (x < 0 || x > n) return 0;
  if (p <= 0) return x === 0 ? 1 : 0;
  if (p >= 1) return x === n ? 1 : 0;
  return Math.exp(logChoose(n, x) + x * Math.log(p) + (n - x) * Math.log(1 - p));
}

/**
 * The chance of at most `max` losses in `games` games.
 *
 * @param {number} games
 * @param {number} lossChance one game's chance of a loss, 0–1
 * @param {number} max
 */
export function lossesAtMost(games, lossChance, max) {
  if (max >= games) return 1;
  let total = 0;
  for (let k = 0; k <= max; k++) total += binomialPmf(games, k, lossChance);
  return Math.min(1, total);
}

/**
 * Everything the calculator shows for one season.
 *
 * @param {SeasonInput} input
 */
export function seasonOdds({ games, winPercent, drawPercent = 0 }) {
  const win = winPercent / 100;
  const draw = drawPercent / 100;
  const loss = Math.max(0, 1 - win - draw);
  return {
    win,
    draw,
    loss,
    /** Every game won: w^n. */
    perfect: win ** games,
    /** No game lost: (w + d)^n. Equal to `perfect` when draws are impossible. */
    unbeaten: Math.min(1, win + draw) ** games,
    atMostOneLoss: lossesAtMost(games, loss, 1),
    atMostTwoLosses: lossesAtMost(games, loss, 2),
    expectedWins: games * win,
    expectedDraws: games * draw,
    expectedLosses: games * loss,
  };
}

/**
 * The single-game win chance at which a perfect season of `games` games has
 * probability `target`: the n-th root of the target.
 *
 * @param {number} games
 * @param {number} target 0–1
 */
export function winChanceForPerfect(games, target) {
  return target ** (1 / games);
}

/* ------------------------------------------------------------- formatting */

const SUPERSCRIPT = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };

/** @type {[number, string][]} */
const SCALES = [
  [1e6, 'million'],
  [1e9, 'billion'],
  [1e12, 'trillion'],
];

/** Three significant figures, rounded half up. */
function threeFigures(value) {
  const exponent = Math.floor(Math.log10(value));
  const factor = 10 ** (exponent - 2);
  return roundHalfUp(value / factor, 0) * factor;
}

/**
 * A probability as a percentage that never rounds a possibility away: a tiny
 * chance reads "<0.1%", not "0.0%", and a near-certainty ">99.9%".
 *
 * @param {number} p 0–1
 * @returns {string}
 */
export function formatChance(p) {
  if (p <= 0) return '0%';
  if (p >= 1) return '100%';
  if (p > 0.999) return '>99.9%';
  if (p < 0.001) return '<0.1%';
  return `${formatFixed(p * 100, 1)}%`;
}

/**
 * "1 in N" for a chance below one half, to three significant figures — 1 in
 * 8.2, 1 in 4,060, 1 in 25.9 million, 1 in 1.29 × 10²⁵ — or null when "1 in N"
 * would not help (an even chance or better, or no chance at all).
 *
 * @param {number} p 0–1
 * @returns {string | null}
 */
export function formatOneIn(p) {
  if (!(p > 0) || p >= 0.5) return null;
  const n = 1 / p;
  if (n < 10) return `1 in ${formatFixed(n, 1)}`;
  // Round first, then name the scale, so 999.96 million reads "1 billion".
  const value = threeFigures(n);
  if (value < 1e6) return `1 in ${value.toLocaleString('en-US')}`;
  for (const [scale, name] of SCALES) {
    if (value >= scale && value < scale * 1000) return `1 in ${formatScaled(value / scale)} ${name}`;
  }
  const exponent = Math.floor(Math.log10(n));
  let mantissa = roundHalfUp(n / 10 ** exponent, 2);
  let power = exponent;
  if (mantissa >= 10) {
    mantissa /= 10;
    power += 1;
  }
  const sup = String(power)
    .split('')
    .map((digit) => SUPERSCRIPT[digit])
    .join('');
  return `1 in ${formatScaled(mantissa)} × 10${sup}`;
}

/** 25.9 → "25.9", 4 → "4", 1.29 → "1.29" (three significant figures already applied). */
function formatScaled(value) {
  if (value >= 100) return String(Math.round(value));
  if (value >= 10) return formatFixed(value, 1).replace(/\.0$/, '');
  return formatFixed(value, 2).replace(/\.?0+$/, '');
}
