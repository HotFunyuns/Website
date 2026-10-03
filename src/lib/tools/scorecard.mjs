// Ten-point-must scorecards: round scores, point deductions, card totals, and
// the decision three cards produce.
//
// Sources, opened 2026-10-02:
//   Association of Boxing Commissions and Combative Sports, Unified Rules of
//   Mixed Martial Arts, amended 5 August 2026 —
//     https://www.abcboxing.com/wp-content/uploads/2026/08/Unified-Rules-of-MMA-8.2026.pdf
//     - "10 points must be awarded to the winner of the round and nine points or
//       less must be awarded to the loser, except for a rare even round, which
//       is scored (10-10)"; criteria for 10-10, 10-9, 10-8 and 10-7 rounds.
//     - Bouts of one to five rounds; "minimum of three (3) judges".
//     - Decisions: unanimous (all three judges for the same contestant), split
//       (two for one contestant, one for the opponent), majority (two for the
//       same contestant, one draw). Draws: unanimous (all three draw), majority
//       (two draw), split ("all three judges score differently and the score
//       total results in a draw").
//     - Deductions: two points, mandatory, for an intentional foul that causes
//       an injury; "the appropriate points shall be deducted when the
//       scorekeeper calculates the final score".
//   ABC Unified Rules of Boxing, amended 3 August 2016 —
//     https://www.abcboxing.com/wp-content/uploads/2016/10/unified_rules_boxing_rev_august2016.pdf
//     Three judges; the 10 Point Must System; a mandatory two-point deduction
//     for an intentional foul that causes an injury.
//   ABC Boxing Judge Manual (rev. 06/2024) —
//     https://www.abcboxing.com/wp-content/uploads/2025/10/ABC-BOXING-JUDGE-MANUAL.pdf
//     10-9, 10-8, 10-7, 10-6 ("Your score can continue to go lower than 10-6 if
//     additional knockdowns occur"), and 10-10, which "should rarely happen".
//     Judges "mark the number of points being deducted from the offending boxer
//     next to the actual score". And: "If one fighter wins all the rounds by
//     the slimmest of margins, your championship score could read 120-108."
//   Nevada Administrative Code 467.612 (boxing) —
//     https://www.leg.state.nv.us/NAC/NAC-467.html
//     "The majority opinion is conclusive and, if there is no majority, the
//     decision is a draw." NAC 467.7968 lists the same decision and draw types
//     for MMA as the ABC rules.

/** @typedef {'boxing' | 'mma'} Sport */
/** @typedef {'red' | 'blue'} Corner */
/** @typedef {'red' | 'blue' | 'even'} Verdict */

/** Number of judges the ABC's rules require for both sports. */
export const JUDGES = 3;

/** Largest deduction the calculator accepts for one corner in one round. */
export const MAX_DEDUCTION = 3;

/**
 * Round scores as codes: R9 is Red 10–9, B8 is Blue 10–8, E is 10–10.
 * MMA stops at 10–7 (the ABC's criteria); boxing lists 10–6 as well.
 */
export const SPORTS = {
  boxing: {
    label: 'Boxing',
    maxRounds: 12,
    scores: ['R9', 'R8', 'R7', 'R6', 'E', 'B9', 'B8', 'B7', 'B6'],
  },
  mma: {
    label: 'MMA',
    maxRounds: 5,
    scores: ['R9', 'R8', 'R7', 'E', 'B9', 'B8', 'B7'],
  },
};

export const CORNER_LABELS = { red: 'Red corner', blue: 'Blue corner' };

/**
 * The points each corner gets for a round score code, before deductions.
 *
 * @param {string} code
 * @returns {{ red: number, blue: number } | null}
 */
export function roundPoints(code) {
  if (code === 'E') return { red: 10, blue: 10 };
  const match = /^([RB])([6-9])$/.exec(code);
  if (!match) return null;
  const loser = Number(match[2]);
  return match[1] === 'R' ? { red: 10, blue: loser } : { red: loser, blue: 10 };
}

/** @param {string} code */
export function scoreLabel(code) {
  if (code === 'E') return 'Even 10–10';
  const points = roundPoints(code);
  if (!points) return 'Not scored';
  return points.red === 10 ? `Red 10–${points.blue}` : `Blue 10–${points.red}`;
}

/**
 * @typedef {object} BoutInput
 * @property {Sport} sport
 * @property {number} rounds
 * @property {string[][]} cards        one array of round codes per judge
 * @property {{ red: number, blue: number }[]} deductions   one entry per round, applied to every card
 */

/**
 * @param {BoutInput} input
 * @returns {string[]}
 */
export function validateBout({ sport, rounds, cards, deductions }) {
  const errors = [];
  const rules = SPORTS[sport];
  if (!rules) return ['Choose boxing or MMA.'];
  if (!Number.isInteger(rounds) || rounds < 1 || rounds > rules.maxRounds) {
    errors.push(`${rules.label} scorecards here take 1 to ${rules.maxRounds} rounds.`);
    return errors;
  }
  if (cards.length !== JUDGES) errors.push(`Enter ${JUDGES} judges’ cards.`);

  let unscored = 0;
  const wrongSport = new Set();
  cards.forEach((card) => {
    for (let r = 0; r < rounds; r += 1) {
      const code = card[r] ?? '';
      if (!roundPoints(code)) unscored += 1;
      else if (!rules.scores.includes(code)) wrongSport.add(scoreLabel(code).replace(/^(Red|Blue) /, ''));
    }
  });
  if (unscored > 0) {
    errors.push(`Score every round on all three cards — ${unscored} ${unscored === 1 ? 'round is' : 'rounds are'} still to score.`);
  }
  for (const score of wrongSport) {
    errors.push(`${score} is not an MMA round score — the ABC’s criteria go down to 10–7.`);
  }

  for (let r = 0; r < rounds; r += 1) {
    const d = deductions[r] ?? { red: 0, blue: 0 };
    const valid = (/** @type {number} */ value) => Number.isInteger(value) && value >= 0 && value <= MAX_DEDUCTION;
    if (!valid(d.red) || !valid(d.blue)) errors.push(`Round ${r + 1}: a deduction is 0 to ${MAX_DEDUCTION} points.`);
  }
  return errors;
}

/**
 * One judge's card: totals after deductions, rounds won, and who it favours.
 *
 * @param {string[]} card
 * @param {{ red: number, blue: number }[]} deductions
 * @param {number} rounds
 */
export function cardResult(card, deductions, rounds) {
  let red = 0;
  let blue = 0;
  const roundsWon = { red: 0, blue: 0, even: 0 };
  for (let r = 0; r < rounds; r += 1) {
    const points = roundPoints(card[r]);
    if (!points) throw new Error(`Round ${r + 1} is not scored`);
    const d = deductions[r] ?? { red: 0, blue: 0 };
    red += points.red - d.red;
    blue += points.blue - d.blue;
    if (points.red > points.blue) roundsWon.red += 1;
    else if (points.blue > points.red) roundsWon.blue += 1;
    else roundsWon.even += 1;
  }
  /** @type {Verdict} */
  const verdict = red > blue ? 'red' : blue > red ? 'blue' : 'even';
  return { red, blue, verdict, roundsWon };
}

export const DECISION_LABELS = {
  'unanimous-decision': 'unanimous decision',
  'split-decision': 'split decision',
  'majority-decision': 'majority decision',
  'unanimous-draw': 'unanimous draw',
  'majority-draw': 'majority draw',
  'split-draw': 'split draw',
};

/** @typedef {keyof typeof DECISION_LABELS} DecisionType */

/**
 * The decision three cards produce. A corner needs a majority of the cards to
 * win; anything else is a draw, as Nevada's NAC 467.612 puts it.
 *
 * @param {Verdict[]} verdicts
 * @returns {{ type: DecisionType, winner: Corner | null, label: string }}
 */
export function decide(verdicts) {
  if (verdicts.length !== JUDGES) throw new Error(`Expected ${JUDGES} cards`);
  const count = { red: 0, blue: 0, even: 0 };
  for (const v of verdicts) count[v] += 1;

  /** @type {Corner | null} */
  const winner = count.red >= 2 ? 'red' : count.blue >= 2 ? 'blue' : null;
  /** @type {DecisionType} */
  let type;
  if (winner) {
    const loser = winner === 'red' ? 'blue' : 'red';
    if (count[winner] === 3) type = 'unanimous-decision';
    else if (count[loser] === 1) type = 'split-decision';
    else type = 'majority-decision';
  } else if (count.even === 3) type = 'unanimous-draw';
  else if (count.even === 2) type = 'majority-draw';
  else type = 'split-draw';

  const label = winner
    ? `${CORNER_LABELS[winner]} wins by ${DECISION_LABELS[type]}`
    : `${DECISION_LABELS[type].charAt(0).toUpperCase()}${DECISION_LABELS[type].slice(1)}`;
  return { type, winner, label };
}

/**
 * @param {BoutInput} input
 */
export function scoreBout({ rounds, cards, deductions }) {
  const results = cards.map((card) => cardResult(card, deductions, rounds));
  const totalDeductions = { red: 0, blue: 0 };
  for (let r = 0; r < rounds; r += 1) {
    totalDeductions.red += deductions[r]?.red ?? 0;
    totalDeductions.blue += deductions[r]?.blue ?? 0;
  }
  return {
    cards: results,
    decision: decide(results.map((c) => c.verdict)),
    totalDeductions,
    evenRounds: results.reduce((sum, c) => sum + c.roundsWon.even, 0),
  };
}

/**
 * Formats a card total Red–Blue, e.g. "29–28".
 *
 * @param {{ red: number, blue: number }} card
 */
export function formatCard(card) {
  return `${card.red}–${card.blue}`;
}
