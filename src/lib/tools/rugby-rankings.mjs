// The World Rugby Rankings points exchange, as it applies to matches played
// on or after 1 July 2026.
//
// Sources, opened 2026-10-02:
//   World Rugby, "Rankings Explanation" (page dated 14 November 2014) —
//     https://www.world.rugby/rankings/explanation
//     - "Whatever one side gains, the other loses."
//     - Core rating changes depend on the result and the rating gap. The page's
//       three diagrams plot them: a win is worth 1 point at a gap of 0, falling
//       to 0 for a side 10 or more points better and rising to 2 for a side 10
//       or more points worse; a draw is worth 0 at a gap of 0, between -1 and +1;
//       a loss is the win line moved down by 2. As a formula:
//         change = result - clamp((own rating - opponent rating) / 10, -1, 1)
//       with result +1 for a win, 0 for a draw, -1 for a loss.
//     - Worked example: a rating gap of 3.56 gives 0.64 if the stronger side
//       wins, 0.36 (from the stronger side) for a draw, and 1.36 if the weaker
//       side wins.
//     - "If one side has won by more than 15 points, we multiply the Core
//       Rating Change by 1.5." At a Rugby World Cup, "we would then double the
//       Rating Change."
//     - Ratings are "typically between 0 and 100".
//   World Rugby, "New World Rugby Rankings criteria" (18 June 2026) —
//     https://www.world.rugby/news/1044762/new-world-rugby-rankings-criteria
//     "With effect from 1 July, 2026 the 'home weighting' aspect of the World
//     Rugby Rankings will be removed". Until then the home side was treated as
//     three rating points stronger. The explanation page above still describes
//     that step; this module leaves it out.
//
// scripts/tests/tools-world-rankings-calculator.test.mjs reproduces the
// explanation page's example and a rating change World Rugby reported for a
// match played after 1 July 2026.

import { requireNumber } from './format.mjs';

/** A gap this large (or larger) makes the result fully expected. */
export const GAP_CAP = 10;
/** Winning margin above which the exchange is multiplied by 1.5. */
export const BIG_WIN_MARGIN = 15;
export const BIG_WIN_MULTIPLIER = 1.5;
export const WORLD_CUP_MULTIPLIER = 2;

/** The five outcomes that can move ratings, from Team A's point of view. */
export const OUTCOMES = [
  { id: 'a-big', winner: 'a', bigWin: true, label: 'Team A wins by more than 15' },
  { id: 'a', winner: 'a', bigWin: false, label: 'Team A wins by 15 or fewer' },
  { id: 'draw', winner: null, bigWin: false, label: 'Draw' },
  { id: 'b', winner: 'b', bigWin: false, label: 'Team B wins by 15 or fewer' },
  { id: 'b-big', winner: 'b', bigWin: true, label: 'Team B wins by more than 15' },
];

/** @typedef {'a-big' | 'a' | 'draw' | 'b' | 'b-big'} OutcomeId */

/**
 * @param {{ ratingA: number, ratingB: number }} input
 * @returns {string[]}
 */
export function validateRatings({ ratingA, ratingB }) {
  const errors = [];
  requireNumber(errors, 'Team A rating', ratingA, { min: 0, max: 100 });
  requireNumber(errors, 'Team B rating', ratingB, { min: 0, max: 100 });
  return errors;
}

/**
 * The core rating change for one side, before the margin and World Cup
 * weightings.
 *
 * @param {number} ownRating
 * @param {number} opponentRating
 * @param {'win' | 'draw' | 'loss'} result
 */
export function coreRatingChange(ownRating, opponentRating, result) {
  const expected = Math.max(-1, Math.min(1, (ownRating - opponentRating) / GAP_CAP));
  const score = result === 'win' ? 1 : result === 'draw' ? 0 : -1;
  const change = score - expected;
  return Object.is(change, -0) ? 0 : change;
}

/**
 * The exchange for one outcome. `changeA` and `changeB` always sum to zero.
 *
 * @param {{ ratingA: number, ratingB: number, outcome: OutcomeId, worldCup?: boolean }} input
 */
export function pointsExchange({ ratingA, ratingB, outcome, worldCup = false }) {
  const spec = OUTCOMES.find((o) => o.id === outcome);
  if (!spec) throw new Error(`Unknown outcome "${outcome}"`);
  const resultA = spec.winner === 'a' ? 'win' : spec.winner === 'b' ? 'loss' : 'draw';
  const core = coreRatingChange(ratingA, ratingB, resultA);
  const multiplier = (spec.bigWin ? BIG_WIN_MULTIPLIER : 1) * (worldCup ? WORLD_CUP_MULTIPLIER : 1);
  const changeA = core * multiplier;
  const changeB = changeA === 0 ? 0 : -changeA;
  return {
    outcome: spec,
    gap: ratingA - ratingB,
    coreChangeA: core,
    multiplier,
    changeA,
    changeB,
    /** Rating points that move from one side to the other. */
    exchanged: Math.abs(changeA),
    newRatingA: ratingA + changeA,
    newRatingB: ratingB + changeB,
  };
}

/**
 * Every outcome's exchange, in OUTCOMES order — the preview World Rugby says
 * can be worked out before a match.
 *
 * @param {{ ratingA: number, ratingB: number, worldCup?: boolean }} input
 */
export function allOutcomes({ ratingA, ratingB, worldCup = false }) {
  return OUTCOMES.map((o) => pointsExchange({ ratingA, ratingB, worldCup, outcome: /** @type {OutcomeId} */ (o.id) }));
}
