// Boxing and MMA weight classes, from four published tables, with pound and
// kilogram limits.
//
// Sources, opened 2026-10-02 (each table below names its own):
//   Association of Boxing Commissions and Combative Sports, Unified Rules of
//     Mixed Martial Arts, amended 5 August 2026 — "Weight Classes" table:
//     https://www.abcboxing.com/wp-content/uploads/2026/08/Unified-Rules-of-MMA-8.2026.pdf
//     (Text extraction of that table checked against the PDF's text positions:
//     each class name sits on the same line as its limit.)
//   Nevada Administrative Code 467.476, "Boxers: Weight classes" — a US
//     commission's schedule: https://www.leg.state.nv.us/NAC/NAC-467.html
//   World Boxing Council ratings pages, men's divisions, each headed with its
//     limit, e.g. "Cruiserweight (200 LBS. - 90.719 KG)":
//     https://wbcboxing.com/en/ratings/male/cruiserweight/
//   International Boxing Federation ratings page, e.g. "Cruiserweight (200 LBS)":
//     https://www.ibf-usba-boxing.com/ratings/
//   NIST Guide to the SI, footnote 22: the exact conversion factor for the
//     avoirdupois pound is 4.535 923 7 E-01 kilogram:
//     https://www.nist.gov/pml/special-publication-811/nist-guide-si-footnotes
//
// The ABC's Unified Rules of Boxing (rev. August 2016) contain no weight table,
// so the boxing tables come from a commission and two sanctioning bodies.
//
// Every limit is an upper limit, inclusive: Nevada and the ABC write classes as
// "over X up to and including Y". A class with `upper: null` has no limit.

import { requireNumber, roundHalfUp } from './format.mjs';

/** Kilograms per avoirdupois pound, exactly (NIST). */
export const KG_PER_LB = 0.45359237;

/**
 * @typedef {object} WeightClass
 * @property {string} name
 * @property {number | null} upper   upper limit in pounds, inclusive; null for the open-ended top class
 */

/**
 * @typedef {object} WeightTable
 * @property {string} id
 * @property {'mma' | 'boxing'} sport
 * @property {string} label        short name for results
 * @property {string} source       where the table comes from
 * @property {WeightClass[]} classes   lightest first
 */

/** @type {WeightTable[]} */
export const WEIGHT_TABLES = [
  {
    id: 'abc-mma',
    sport: 'mma',
    label: 'MMA — ABC Unified Rules',
    source: 'Association of Boxing Commissions, Unified Rules of Mixed Martial Arts (amended 5 August 2026)',
    classes: [
      { name: 'Atomweight', upper: 105 },
      { name: 'Straw Weight', upper: 115 },
      { name: 'Flyweight', upper: 125 },
      { name: 'Bantamweight', upper: 135 },
      { name: 'Featherweight', upper: 145 },
      { name: 'Lightweight', upper: 155 },
      { name: 'Super Lightweight', upper: 165 },
      { name: 'Welterweight', upper: 170 },
      { name: 'Super Welterweight', upper: 175 },
      { name: 'Middleweight', upper: 185 },
      { name: 'Super Middleweight', upper: 195 },
      { name: 'Light Heavyweight', upper: 205 },
      { name: 'Cruiserweight', upper: 225 },
      { name: 'Heavyweight', upper: 265 },
      { name: 'Super Heavyweight', upper: null },
    ],
  },
  {
    id: 'nevada-boxing',
    sport: 'boxing',
    label: 'Boxing — Nevada commission',
    source: 'Nevada Administrative Code 467.476 (Nevada Athletic Commission)',
    classes: [
      { name: 'Strawweight', upper: 105 },
      { name: 'Light-Flyweight', upper: 108 },
      { name: 'Flyweight', upper: 112 },
      { name: 'Super Flyweight', upper: 115 },
      { name: 'Bantamweight', upper: 118 },
      { name: 'Super Bantamweight', upper: 122 },
      { name: 'Featherweight', upper: 126 },
      { name: 'Super Featherweight', upper: 130 },
      { name: 'Lightweight', upper: 135 },
      { name: 'Super Lightweight', upper: 140 },
      { name: 'Welterweight', upper: 147 },
      { name: 'Super Welterweight', upper: 154 },
      { name: 'Middleweight', upper: 160 },
      { name: 'Super Middleweight', upper: 168 },
      { name: 'Light-heavyweight', upper: 175 },
      { name: 'Cruiserweight', upper: 195 },
      { name: 'Heavyweight', upper: null },
    ],
  },
  {
    id: 'wbc',
    sport: 'boxing',
    label: 'Boxing — WBC',
    source: 'World Boxing Council ratings pages, men’s divisions',
    classes: [
      { name: 'Strawweight', upper: 105 },
      { name: 'Light Flyweight', upper: 108 },
      { name: 'Flyweight', upper: 112 },
      { name: 'Super Flyweight', upper: 115 },
      { name: 'Bantamweight', upper: 118 },
      { name: 'Super Bantamweight', upper: 122 },
      { name: 'Featherweight', upper: 126 },
      { name: 'Super Featherweight', upper: 130 },
      { name: 'Lightweight', upper: 135 },
      { name: 'Super Lightweight', upper: 140 },
      { name: 'Welterweight', upper: 147 },
      { name: 'Super Welterweight', upper: 154 },
      { name: 'Middleweight', upper: 160 },
      { name: 'Super Middleweight', upper: 168 },
      { name: 'Light Heavyweight', upper: 175 },
      { name: 'Cruiserweight', upper: 200 },
      { name: 'Bridgerweight', upper: 224 },
      { name: 'Heavyweight', upper: null },
    ],
  },
  {
    id: 'ibf',
    sport: 'boxing',
    label: 'Boxing — IBF',
    source: 'International Boxing Federation ratings page',
    classes: [
      { name: 'Junior Mini Flyweight', upper: 102 },
      { name: 'Mini Flyweight', upper: 105 },
      { name: 'Junior Flyweight', upper: 108 },
      { name: 'Flyweight', upper: 112 },
      { name: 'Junior Bantamweight', upper: 115 },
      { name: 'Bantamweight', upper: 118 },
      { name: 'Junior Featherweight', upper: 122 },
      { name: 'Featherweight', upper: 126 },
      { name: 'Junior Lightweight', upper: 130 },
      { name: 'Lightweight', upper: 135 },
      { name: 'Junior Welterweight', upper: 140 },
      { name: 'Welterweight', upper: 147 },
      { name: 'Junior Middleweight', upper: 154 },
      { name: 'Middleweight', upper: 160 },
      { name: 'Super Middleweight', upper: 168 },
      { name: 'Light Heavyweight', upper: 175 },
      { name: 'Cruiserweight', upper: 200 },
      { name: 'Heavyweight', upper: null },
    ],
  },
];

/** @param {number} lb */
export function lbToKg(lb) {
  return lb * KG_PER_LB;
}

/** @param {number} kg */
export function kgToLb(kg) {
  return kg / KG_PER_LB;
}

/**
 * A pound limit in kilograms, to the nearest gram — the three decimals the WBC
 * prints. A weight typed in kilograms is compared at the same precision (see
 * KG_INPUT_TOLERANCE_LB), so a limit as shown is always inside its class.
 *
 * @param {number} lb
 */
export function limitInKg(lb) {
  return roundHalfUp(lbToKg(lb), 3);
}

/**
 * @param {{ weight: number, unit: 'lb' | 'kg' }} input
 * @returns {string[]}
 */
export function validateWeight({ weight, unit }) {
  const errors = [];
  if (unit !== 'lb' && unit !== 'kg') errors.push('Choose pounds or kilograms.');
  requireNumber(errors, 'Weight', weight, { min: 0, max: unit === 'kg' ? 450 : 1000 });
  if (errors.length === 0 && weight === 0) errors.push('Weight must be more than zero.');
  return errors;
}

/**
 * Half a gram (and a hair, for floating-point error), in pounds. A weight typed
 * in kilograms is compared to the nearest gram, so a kilogram limit rounded to
 * the gram — this page's, or a body's own: the WBC prints 79.379 kg for 175 lb,
 * a fraction of a gram over — stays inside the class.
 */
export const KG_INPUT_TOLERANCE_LB = (0.0005 + 1e-9) / KG_PER_LB;

/**
 * The class a weight falls in, with the classes either side and the distance
 * to each limit, in pounds.
 *
 * @param {WeightTable} table
 * @param {number} weightLb
 * @param {number} [toleranceLb]  how far over a limit still counts as on it
 */
export function findClass(table, weightLb, toleranceLb = 1e-9) {
  const { classes } = table;
  let index = classes.findIndex((c) => c.upper !== null && weightLb <= c.upper + toleranceLb);
  if (index === -1) index = classes.length - 1;
  const cls = classes[index];
  const lower = index > 0 ? classes[index - 1].upper : null;
  return {
    table,
    index,
    cls,
    /** The limit of the class below — this class starts just over it. */
    lower,
    upper: cls.upper,
    lighter: index > 0 ? classes[index - 1] : null,
    heavier: index < classes.length - 1 ? classes[index + 1] : null,
    /** Pounds to spare under this class's limit; null for an open-ended class. */
    underLimitBy: cls.upper === null ? null : Math.max(0, cls.upper - weightLb),
    /** Pounds over the class below's limit; null for the lightest class. */
    overLowerBy: lower === null ? null : weightLb - lower,
  };
}

/**
 * The class in every table for one weight.
 *
 * @param {{ weight: number, unit: 'lb' | 'kg' }} input
 */
export function classesForWeight({ weight, unit }) {
  const weightLb = unit === 'kg' ? kgToLb(weight) : weight;
  const tolerance = unit === 'kg' ? KG_INPUT_TOLERANCE_LB : 1e-9;
  return {
    weightLb,
    weightKg: unit === 'kg' ? weight : lbToKg(weight),
    results: WEIGHT_TABLES.map((table) => findClass(table, weightLb, tolerance)),
  };
}
