// Ten-point-must scorecards (src/lib/tools/scorecard.mjs).
//
// Sources, opened 2026-10-02:
//   - ABC Unified Rules of MMA (amended 5 August 2026): round scores, the six
//     decision and draw types, deductions.
//   - ABC Unified Rules of Boxing (amended 3 August 2016) and ABC Boxing Judge
//     Manual (rev. 06/2024): "If one fighter wins all the rounds by the slimmest
//     of margins, your championship score could read 120-108."
//   - Nevada Administrative Code 467.612: "The majority opinion is conclusive
//     and, if there is no majority, the decision is a draw."
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SPORTS,
  decide,
  formatCard,
  roundPoints,
  scoreBout,
  scoreLabel,
  validateBout,
} from '../../src/lib/tools/scorecard.mjs';

const none = (rounds) => Array.from({ length: rounds }, () => ({ red: 0, blue: 0 }));

test('round score codes', () => {
  assert.deepEqual(roundPoints('R9'), { red: 10, blue: 9 });
  assert.deepEqual(roundPoints('B7'), { red: 7, blue: 10 });
  assert.deepEqual(roundPoints('E'), { red: 10, blue: 10 });
  assert.equal(roundPoints(''), null);
  assert.equal(roundPoints('R5'), null);
  assert.equal(scoreLabel('B8'), 'Blue 10–8');
  assert.equal(scoreLabel('E'), 'Even 10–10');
  assert.deepEqual(SPORTS.mma.scores, ['R9', 'R8', 'R7', 'E', 'B9', 'B8', 'B7']);
  assert.equal(SPORTS.mma.maxRounds, 5);
  assert.ok(SPORTS.boxing.scores.includes('R6'));
});

test('the ABC Judge Manual’s example: every round 10–9 over 12 rounds reads 120–108', () => {
  const card = Array.from({ length: 12 }, () => 'R9');
  const input = { sport: 'boxing', rounds: 12, cards: [card, card, card], deductions: none(12) };
  assert.deepEqual(validateBout(input), []);
  const bout = scoreBout(input);
  assert.equal(formatCard(bout.cards[0]), '120–108');
  assert.equal(bout.decision.label, 'Red corner wins by unanimous decision');
});

test('every combination of three cards gets the ABC’s decision type', () => {
  const cases = [
    [['red', 'red', 'red'], 'unanimous-decision', 'red'],
    [['blue', 'blue', 'blue'], 'unanimous-decision', 'blue'],
    [['red', 'red', 'blue'], 'split-decision', 'red'],
    [['blue', 'red', 'blue'], 'split-decision', 'blue'],
    [['red', 'even', 'red'], 'majority-decision', 'red'],
    [['even', 'blue', 'blue'], 'majority-decision', 'blue'],
    [['even', 'even', 'even'], 'unanimous-draw', null],
    [['red', 'even', 'even'], 'majority-draw', null],
    [['even', 'blue', 'even'], 'majority-draw', null],
    [['red', 'blue', 'even'], 'split-draw', null],
  ];
  for (const [verdicts, type, winner] of cases) {
    const d = decide(verdicts);
    assert.equal(d.type, type, verdicts.join(','));
    assert.equal(d.winner, winner, verdicts.join(','));
  }
  assert.equal(decide(['red', 'blue', 'even']).label, 'Split draw');
  assert.equal(decide(['blue', 'blue', 'even']).label, 'Blue corner wins by majority decision');
});

test('Nevada: a corner needs a majority of the cards; otherwise it is a draw', () => {
  const verdicts = ['red', 'blue', 'even'];
  for (const a of verdicts) {
    for (const b of verdicts) {
      for (const c of verdicts) {
        const d = decide([a, b, c]);
        const reds = [a, b, c].filter((v) => v === 'red').length;
        const blues = [a, b, c].filter((v) => v === 'blue').length;
        const majority = reds >= 2 ? 'red' : blues >= 2 ? 'blue' : null;
        assert.equal(d.winner, majority);
      }
    }
  }
});

test('the page’s illustrative MMA bout: a split decision, then a majority draw after one deduction', () => {
  const cards = [
    ['R9', 'B9', 'R9'],
    ['R9', 'R9', 'B9'],
    ['B9', 'B9', 'R9'],
  ];
  const clean = scoreBout({ sport: 'mma', rounds: 3, cards, deductions: none(3) });
  assert.deepEqual(clean.cards.map(formatCard), ['29–28', '29–28', '28–29']);
  assert.equal(clean.decision.type, 'split-decision');
  assert.equal(clean.decision.winner, 'red');

  const deductions = none(3);
  deductions[2] = { red: 1, blue: 0 };
  const docked = scoreBout({ sport: 'mma', rounds: 3, cards, deductions });
  assert.deepEqual(docked.cards.map(formatCard), ['28–28', '28–28', '27–29']);
  assert.equal(docked.decision.type, 'majority-draw');
  assert.equal(docked.decision.winner, null);
  assert.deepEqual(docked.totalDeductions, { red: 1, blue: 0 });
});

test('a knockdown round and deductions', () => {
  // Boxing, 4 rounds. Round 2 is a 10–8 (a knockdown); Blue wins the other
  // three 10–9, so the cards read 37–38 before any deduction.
  const card = ['B9', 'R8', 'B9', 'B9'];
  const before = scoreBout({ sport: 'boxing', rounds: 4, cards: [card, card, card], deductions: none(4) });
  assert.equal(formatCard(before.cards[0]), '37–38');
  assert.equal(before.decision.winner, 'blue');
  assert.deepEqual(before.cards[0].roundsWon, { red: 1, blue: 3, even: 0 });
  // One point taken from Blue in round 4 levels every card…
  const one = none(4);
  one[3] = { red: 0, blue: 1 };
  const level = scoreBout({ sport: 'boxing', rounds: 4, cards: [card, card, card], deductions: one });
  assert.equal(formatCard(level.cards[0]), '37–37');
  assert.equal(level.decision.type, 'unanimous-draw');
  // …and the mandatory two points for an intentional foul that causes an injury turns it.
  const two = none(4);
  two[3] = { red: 0, blue: 2 };
  const turned = scoreBout({ sport: 'boxing', rounds: 4, cards: [card, card, card], deductions: two });
  assert.equal(formatCard(turned.cards[0]), '37–36');
  assert.equal(turned.decision.label, 'Red corner wins by unanimous decision');
});

test('10–10 rounds are counted', () => {
  const card = ['E', 'R9', 'B9'];
  const bout = scoreBout({ sport: 'mma', rounds: 3, cards: [card, card, card], deductions: none(3) });
  assert.equal(bout.evenRounds, 3);
  assert.equal(formatCard(bout.cards[0]), '29–29');
});

test('validation', () => {
  const full = (code, rounds) => Array.from({ length: rounds }, () => code);
  const ok = { sport: 'mma', rounds: 3, cards: [full('R9', 3), full('R9', 3), full('R9', 3)], deductions: none(3) };
  assert.deepEqual(validateBout(ok), []);
  assert.ok(validateBout({ ...ok, rounds: 6 }).some((e) => e.includes('1 to 5 rounds')));
  assert.ok(validateBout({ ...ok, sport: 'boxing', rounds: 13 }).some((e) => e.includes('1 to 12 rounds')));
  const gaps = validateBout({ ...ok, cards: [['R9', '', ''], full('R9', 3), ['', 'R9', 'R9']] });
  assert.ok(gaps.some((e) => e.includes('3 rounds are still to score')));
  const mmaSix = validateBout({ ...ok, cards: [['R6', 'B6', 'R9'], full('R9', 3), full('R9', 3)] });
  assert.equal(mmaSix.filter((e) => e.includes('10–6 is not an MMA round score')).length, 1);
  const deductions = none(3);
  deductions[1] = { red: 4, blue: -1 };
  assert.equal(validateBout({ ...ok, deductions }).filter((e) => e.startsWith('Round 2')).length, 1);
  assert.ok(validateBout({ ...ok, sport: 'kickboxing' }).some((e) => e.includes('boxing or MMA')));
});
