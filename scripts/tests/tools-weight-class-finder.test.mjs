// Weight classes (src/lib/tools/weight-classes.mjs).
//
// Sources, opened 2026-10-02:
//   - ABC Unified Rules of MMA (amended 5 August 2026), "Weight Classes".
//   - Nevada Administrative Code 467.476 (boxing).
//   - WBC ratings pages, men's divisions: each heading gives the limit in
//     pounds and kilograms, e.g. "Bridgerweight (224 LBS. - 101.605 KG)".
//   - IBF ratings page: "Cruiserweight (200 LBS)", "Heavyweight (Over 200LBS)".
//   - NIST Guide to the SI, footnote 22: 1 lb = 0.453 592 37 kg exactly.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFixed } from '../../src/lib/tools/format.mjs';
import {
  KG_INPUT_TOLERANCE_LB,
  KG_PER_LB,
  WEIGHT_TABLES,
  classesForWeight,
  findClass,
  kgToLb,
  lbToKg,
  limitInKg,
  validateWeight,
} from '../../src/lib/tools/weight-classes.mjs';

const table = (id) => {
  const t = WEIGHT_TABLES.find((x) => x.id === id);
  if (!t) throw new Error(id);
  return t;
};
const nameAt = (id, lb) => findClass(table(id), lb).cls.name;

test('the conversion factor is NIST’s exact one', () => {
  assert.equal(KG_PER_LB, 0.45359237);
  assert.ok(Math.abs(kgToLb(lbToKg(155)) - 155) < 1e-12);
});

test('every table rises strictly and ends with an open-ended class', () => {
  for (const t of WEIGHT_TABLES) {
    const limits = t.classes.slice(0, -1).map((c) => c.upper);
    assert.ok(limits.every((u) => typeof u === 'number'), `${t.id} has a missing limit`);
    for (let i = 1; i < limits.length; i += 1) assert.ok(limits[i] > limits[i - 1], `${t.id} is not ascending at ${i}`);
    assert.equal(t.classes.at(-1)?.upper, null, `${t.id} should end open-ended`);
  }
});

test('the tables hold the limits their sources publish', () => {
  const uppers = (id) => table(id).classes.map((c) => c.upper);
  assert.deepEqual(uppers('abc-mma'), [105, 115, 125, 135, 145, 155, 165, 170, 175, 185, 195, 205, 225, 265, null]);
  assert.deepEqual(uppers('nevada-boxing'), [105, 108, 112, 115, 118, 122, 126, 130, 135, 140, 147, 154, 160, 168, 175, 195, null]);
  assert.deepEqual(uppers('wbc'), [105, 108, 112, 115, 118, 122, 126, 130, 135, 140, 147, 154, 160, 168, 175, 200, 224, null]);
  assert.deepEqual(uppers('ibf'), [102, 105, 108, 112, 115, 118, 122, 126, 130, 135, 140, 147, 154, 160, 168, 175, 200, null]);
});

test('limits are inclusive: "over X up to and including Y"', () => {
  assert.equal(nameAt('abc-mma', 155), 'Lightweight');
  assert.equal(nameAt('abc-mma', 155.1), 'Super Lightweight');
  assert.equal(nameAt('abc-mma', 105), 'Atomweight');
  assert.equal(nameAt('abc-mma', 90), 'Atomweight');
  assert.equal(nameAt('abc-mma', 265), 'Heavyweight');
  assert.equal(nameAt('abc-mma', 300), 'Super Heavyweight');
});

test('where the bodies differ: cruiserweight and above', () => {
  // 196 lb: heavyweight in Nevada, cruiserweight for the WBC and IBF.
  assert.equal(nameAt('nevada-boxing', 196), 'Heavyweight');
  assert.equal(nameAt('wbc', 196), 'Cruiserweight');
  assert.equal(nameAt('ibf', 196), 'Cruiserweight');
  // 210 lb: the WBC's bridgerweight, the IBF's heavyweight.
  assert.equal(nameAt('wbc', 210), 'Bridgerweight');
  assert.equal(nameAt('ibf', 210), 'Heavyweight');
  assert.equal(nameAt('wbc', 225), 'Heavyweight');
  assert.equal(nameAt('ibf', 102), 'Junior Mini Flyweight');
  assert.equal(nameAt('wbc', 102), 'Strawweight');
});

test('kilograms: the WBC’s printed figures and the page’s gram-rounded limits', () => {
  // The WBC prints three decimals; NIST's factor reproduces them, except that
  // it prints 90.719 for 200 lb, where the exact figure is 90.718474.
  assert.equal(formatFixed(lbToKg(105), 3), '47.627');
  assert.equal(formatFixed(lbToKg(175), 3), '79.379');
  assert.equal(formatFixed(lbToKg(224), 3), '101.605');
  assert.equal(formatFixed(lbToKg(200), 6), '90.718474');
  // The page rounds limits to the nearest gram.
  assert.equal(limitInKg(105), 47.627);
  assert.equal(limitInKg(175), 79.379);
  assert.equal(limitInKg(200), 90.718);
  assert.equal(limitInKg(265), 120.202);
});

test('the WBC’s printed kilogram limits match the page’s, except at cruiserweight (the page says so)', () => {
  // As printed on the WBC's men's ratings pages, 2026-10-02.
  const printed = {
    105: '47.627', 108: '48.988', 112: '50.802', 115: '52.163', 118: '53.524', 122: '55.338',
    126: '57.153', 130: '58.967', 135: '61.235', 140: '63.503', 147: '66.678', 154: '69.853',
    160: '72.575', 168: '76.204', 175: '79.379', 200: '90.719', 224: '101.605',
  };
  const mismatches = Object.entries(printed)
    .filter(([lb, kg]) => limitInKg(Number(lb)).toFixed(3) !== kg)
    .map(([lb]) => Number(lb));
  assert.deepEqual(mismatches, [200]);
  assert.equal(limitInKg(155).toFixed(3), '70.307'); // the FAQ's example
});

test('every limit as the page shows it in kilograms is inside its own class', () => {
  for (const t of WEIGHT_TABLES) {
    for (const c of t.classes) {
      if (c.upper === null) continue;
      const found = findClass(t, kgToLb(limitInKg(c.upper)), KG_INPUT_TOLERANCE_LB);
      assert.equal(found.cls.name, c.name, `${t.id} ${c.name}`);
      // One gram more is over it.
      const over = findClass(t, kgToLb(limitInKg(c.upper) + 0.001), KG_INPUT_TOLERANCE_LB);
      assert.notEqual(over.cls.name, c.name, `${t.id} ${c.name} + 1 g`);
    }
  }
});

test('a weight in kilograms is compared to the nearest gram', () => {
  // The WBC's own 79.379 kg figure for 175 lb stays light heavyweight…
  const atLimit = classesForWeight({ weight: 79.379, unit: 'kg' }).results.find((r) => r.table.id === 'wbc');
  assert.equal(atLimit?.cls.name, 'Light Heavyweight');
  // …while 79.38 kg is over it.
  const over = classesForWeight({ weight: 79.38, unit: 'kg' }).results.find((r) => r.table.id === 'wbc');
  assert.equal(over?.cls.name, 'Cruiserweight');
  // In pounds there is no tolerance.
  const lbOver = classesForWeight({ weight: 175.001, unit: 'lb' }).results.find((r) => r.table.id === 'wbc');
  assert.equal(lbOver?.cls.name, 'Cruiserweight');
});

test('the page’s illustrative weight: 150 lb', () => {
  const { results, weightKg } = classesForWeight({ weight: 150, unit: 'lb' });
  assert.equal(formatFixed(weightKg, 3), '68.039');
  const mma = results.find((r) => r.table.id === 'abc-mma');
  assert.equal(mma?.cls.name, 'Lightweight');
  assert.equal(mma?.underLimitBy, 5);
  assert.equal(mma?.overLowerBy, 5);
  assert.equal(mma?.heavier?.name, 'Super Lightweight');
  const wbc = results.find((r) => r.table.id === 'wbc');
  assert.equal(wbc?.cls.name, 'Super Welterweight');
  assert.equal(wbc?.underLimitBy, 4);
  assert.equal(wbc?.overLowerBy, 3);
  const nevada = results.find((r) => r.table.id === 'nevada-boxing');
  assert.equal(nevada?.cls.name, 'Super Welterweight');
  const ibf = results.find((r) => r.table.id === 'ibf');
  assert.equal(ibf?.cls.name, 'Junior Middleweight');
});

test('open-ended and lightest classes have no limit on one side', () => {
  const heavy = findClass(table('wbc'), 260);
  assert.equal(heavy.underLimitBy, null);
  assert.equal(heavy.overLowerBy, 36);
  assert.equal(heavy.heavier, null);
  const light = findClass(table('abc-mma'), 100);
  assert.equal(light.overLowerBy, null);
  assert.equal(light.lighter, null);
});

test('validation', () => {
  assert.deepEqual(validateWeight({ weight: 150, unit: 'lb' }), []);
  assert.ok(validateWeight({ weight: 0, unit: 'lb' }).some((e) => e.includes('more than zero')));
  assert.ok(validateWeight({ weight: Number.NaN, unit: 'kg' }).some((e) => e.includes('enter a number')));
  assert.ok(validateWeight({ weight: 500, unit: 'kg' }).some((e) => e.includes('no more than 450')));
  // Stones are not a unit the finder offers.
  assert.ok(validateWeight({ weight: 10, unit: 'st' }).some((e) => e.includes('pounds or kilograms')));
});
