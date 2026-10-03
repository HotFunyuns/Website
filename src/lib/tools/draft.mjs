// Draft order: the three common pick orders, a fair random draw, and the pick
// board that follows from them.
//
// Orders, as Fantasy Postseason's draft help defines them:
//   straight  the same order every round: 1–12, 1–12, …
//   snake     the order reverses every round: 1–12, 12–1, 1–12, … (also ESPN)
//   3RR       third-round reversal: like a snake, but round 3 repeats round 2's
//             order, then the snake resumes: 1–12, 12–1, 12–1, 1–12, …
//
// Random order: the Fisher–Yates shuffle (NIST Dictionary of Algorithms and
// Data Structures), fed by the browser's cryptographic generator with
// rejection sampling, so every order of the teams is equally likely. Seeded
// draws are reproducible but come from a small pseudo-random generator, which —
// as NIST's note on the shuffle says — cannot reach every possible order once
// there are more than a dozen or so teams.

import { requireWhole } from './format.mjs';

export const ORDER_TYPES = [
  { id: 'snake', label: 'Snake' },
  { id: 'third-round-reversal', label: 'Third-round reversal (3RR)' },
  { id: 'straight', label: 'Straight (same order every round)' },
];

/** @typedef {'snake' | 'third-round-reversal' | 'straight'} OrderType */

/**
 * Whether a round runs in round-one order (true) or reversed (false).
 *
 * @param {OrderType} type
 * @param {number} round 1-based
 */
export function isForwardRound(type, round) {
  if (type === 'straight') return true;
  if (type === 'third-round-reversal' && round >= 3) return round % 2 === 0;
  return round % 2 === 1;
}

/**
 * The pick a draft slot makes in one round.
 *
 * @param {{ type: OrderType, teams: number, slot: number, round: number }} input
 * @returns {{ pickInRound: number, overall: number }}
 */
export function pickFor({ type, teams, slot, round }) {
  const pickInRound = isForwardRound(type, round) ? slot : teams - slot + 1;
  return { pickInRound, overall: (round - 1) * teams + pickInRound };
}

/** Kept for readers of the snake formulas: a snake pick, by slot and round. */
export function snakePick({ teams, slot, round }) {
  return pickFor({ type: 'snake', teams, slot, round });
}

/**
 * Every pick one slot makes, with how many other picks happen before each.
 *
 * @param {{ type?: OrderType, teams: number, slot: number, rounds: number }} input
 */
export function picksForSlot({ type = 'snake', teams, slot, rounds }) {
  const picks = [];
  for (let round = 1; round <= rounds; round++) {
    const { pickInRound, overall } = pickFor({ type, teams, slot, round });
    const previous = picks[picks.length - 1];
    picks.push({
      round,
      pickInRound,
      overall,
      waitBefore: previous ? overall - previous.overall - 1 : overall - 1,
    });
  }
  return picks;
}

/** The snake-only version, kept as a named export for the worked examples. */
export function snakeDraftPicks({ teams, slot, rounds }) {
  return picksForSlot({ type: 'snake', teams, slot, rounds });
}

/**
 * The two alternating waits for a slot in a snake draft.
 *
 * @param {number} teams
 * @param {number} slot
 */
export function snakeWaits(teams, slot) {
  return { afterOddRound: 2 * (teams - slot), afterEvenRound: 2 * (slot - 1) };
}

/**
 * The full board: for each round, the teams in the order they pick.
 *
 * @param {{ order: string[], type: OrderType, rounds: number }} input
 * @returns {{ round: number, picks: { overall: number, pickInRound: number, team: string }[] }[]}
 */
export function buildBoard({ order, type, rounds }) {
  const teams = order.length;
  const board = [];
  for (let round = 1; round <= rounds; round++) {
    const sequence = isForwardRound(type, round) ? order : [...order].reverse();
    board.push({
      round,
      picks: sequence.map((team, i) => ({ overall: (round - 1) * teams + i + 1, pickInRound: i + 1, team })),
    });
  }
  return board;
}

/* -------------------------------------------------------------- the draw */

/**
 * Fisher–Yates: walk the list from the end, swapping each position with a
 * uniformly chosen position at or before it. `randomInt(n)` must return a
 * uniform integer in [0, n).
 *
 * @template T
 * @param {T[]} items
 * @param {(n: number) => number} randomInt
 * @returns {T[]} a new, shuffled array
 */
export function fisherYates(items, randomInt) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * A uniform integer in [0, n) from a cryptographic source, using rejection
 * sampling so that no value is favoured by the modulo.
 *
 * @param {(buffer: Uint32Array) => Uint32Array} getRandomValues
 * @returns {(n: number) => number}
 */
export function cryptoRandomInt(getRandomValues) {
  const buffer = new Uint32Array(1);
  return (n) => {
    const limit = Math.floor(0x100000000 / n) * n;
    for (;;) {
      getRandomValues(buffer);
      if (buffer[0] < limit) return buffer[0] % n;
    }
  };
}

/**
 * A reproducible generator from a text seed: the seed is hashed (xmur3) into a
 * 128-bit state for sfc32. Same seed, same sequence, on every device.
 *
 * @param {string} seed
 * @returns {(n: number) => number}
 */
export function seededRandomInt(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  const next32 = () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
  let a = next32();
  let b = next32();
  let c = next32();
  let d = next32();
  const sfc32 = () => {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return t >>> 0;
  };
  return (n) => {
    const limit = Math.floor(0x100000000 / n) * n;
    for (;;) {
      const value = sfc32();
      if (value < limit) return value % n;
    }
  };
}

/* ---------------------------------------------------------------- input */

/**
 * Team names, one per line; blank lines ignored, surrounding spaces trimmed.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function parseTeamNames(text) {
  return String(text ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * @param {{ names: string[], rounds: number }} input
 * @returns {string[]}
 */
export function validateDraft({ names, rounds }) {
  const errors = [];
  if (names.length < 2) errors.push('Enter at least two teams, one per line.');
  if (names.length > 40) errors.push('Enter no more than 40 teams.');
  if (names.some((name) => name.length > 40)) errors.push('Keep each team name to 40 characters or fewer.');
  const seen = new Set();
  for (const name of names) {
    const key = name.toLowerCase();
    if (seen.has(key)) {
      errors.push(`“${name}” appears more than once — give each team a different name.`);
      break;
    }
    seen.add(key);
  }
  requireWhole(errors, 'Rounds', rounds, { min: 1, max: 50 });
  return errors;
}

/**
 * The snake-only validator, for a league described by numbers alone.
 *
 * @param {{ teams: number, slot: number, rounds: number }} input
 * @returns {string[]}
 */
export function validateSnake(input) {
  const errors = [];
  requireWhole(errors, 'Teams', input.teams, { min: 2, max: 40 });
  requireWhole(errors, 'Your draft slot', input.slot, { min: 1, max: 40 });
  requireWhole(errors, 'Rounds', input.rounds, { min: 1, max: 50 });
  if (errors.length === 0 && input.slot > input.teams) {
    errors.push('Your draft slot cannot be higher than the number of teams.');
  }
  return errors;
}
