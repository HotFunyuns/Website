'use client';

import { useState } from 'react';
import { CalculatorCard, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import {
  CORNER_LABELS,
  JUDGES,
  MAX_DEDUCTION,
  SPORTS,
  formatCard,
  scoreBout,
  scoreLabel,
  validateBout,
} from '@/lib/tools/scorecard.mjs';

type Sport = 'boxing' | 'mma';
type Deduction = { red: number; blue: number };

const MAX_SLOTS = SPORTS.boxing.maxRounds;

// The illustrative three-round MMA bout used in the worked example below —
// not a real fight. Each judge's card has room for 12 rounds; only the
// scheduled rounds are used, so shortening and lengthening a bout keeps scores.
const EXAMPLE: string[][] = [
  ['R9', 'B9', 'R9'],
  ['R9', 'R9', 'B9'],
  ['B9', 'B9', 'R9'],
];
const DEFAULT_CARDS = EXAMPLE.map((card) => [...card, ...Array<string>(MAX_SLOTS - card.length).fill('')]);
const NO_DEDUCTIONS: Deduction[] = Array.from({ length: MAX_SLOTS }, () => ({ red: 0, blue: 0 }));

// Text stays 16px so iOS does not zoom on focus, as in the shared fields.
const selectBase =
  'rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-base text-ink-900 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300/60';
// flex-1 and min-w-0 let a round's select take the rest of its row and shrink
// on a narrow screen instead of pushing past the card's padding.
const selectClass = `min-w-0 flex-1 ${selectBase}`;

export default function FightScorecard() {
  const [sport, setSport] = useState<Sport>('mma');
  const [rounds, setRounds] = useState(3);
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [deductions, setDeductions] = useState(NO_DEDUCTIONS);

  const rules = SPORTS[sport];
  const roundList = Array.from({ length: rounds }, (_, i) => i);
  const input = { sport, rounds, cards: cards.map((card) => card.slice(0, rounds)), deductions: deductions.slice(0, rounds) };
  const errors = validateBout(input);
  const bout = errors.length === 0 ? scoreBout(input) : null;
  const anyDeduction = input.deductions.some((d) => d.red > 0 || d.blue > 0);

  const changeSport = (value: string) => {
    const next: Sport = value === 'boxing' ? 'boxing' : 'mma';
    setSport(next);
    setRounds((current) => Math.min(current, SPORTS[next].maxRounds));
  };
  const setScore = (judge: number, round: number, code: string) =>
    setCards((prev) => prev.map((card, j) => (j === judge ? card.map((c, r) => (r === round ? code : c)) : card)));
  const setDeduction = (round: number, corner: 'red' | 'blue', points: number) =>
    setDeductions((prev) => prev.map((d, r) => (r === round ? { ...d, [corner]: points } : d)));
  const clearCards = () => setCards(Array.from({ length: JUDGES }, () => Array<string>(MAX_SLOTS).fill('')));

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Score the bout"
      intro="Pick the winner and the score of each round on each judge’s card. Point deductions apply to every card."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="sc-sport"
            label="Sport"
            value={sport}
            onChange={changeSport}
            options={[
              { value: 'mma', label: 'MMA (ABC Unified Rules)' },
              { value: 'boxing', label: 'Boxing' },
            ]}
          />
          <SelectField
            id="sc-rounds"
            label="Scheduled rounds"
            value={String(rounds)}
            onChange={(value) => setRounds(Number(value))}
            options={Array.from({ length: rules.maxRounds }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {Array.from({ length: JUDGES }, (_, judge) => (
            <fieldset key={judge} className="rounded-2xl border border-ink-200 p-5">
              <legend className="px-1.5 text-sm font-semibold text-ink-800">Judge {judge + 1}</legend>
              <div className="space-y-2">
                {roundList.map((round) => {
                  const id = `sc-j${judge + 1}-r${round + 1}`;
                  return (
                    <div key={round} className="flex items-center gap-3">
                      <label htmlFor={id} className="w-16 shrink-0 text-sm font-medium text-ink-700">
                        Round {round + 1}
                      </label>
                      <select
                        id={id}
                        value={cards[judge][round]}
                        onChange={(event) => setScore(judge, round, event.target.value)}
                        className={selectClass}
                      >
                        <option value="">Not scored</option>
                        {rules.scores.map((code) => (
                          <option key={code} value={code}>
                            {scoreLabel(code)}
                          </option>
                        ))}
                        {cards[judge][round] && !rules.scores.includes(cards[judge][round]) && (
                          <option value={cards[judge][round]}>{scoreLabel(cards[judge][round])} (boxing only)</option>
                        )}
                      </select>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <details className="mt-4 rounded-xl border border-ink-200 bg-white p-5">
          <summary className="text-sm font-semibold text-ink-800">
            Point deductions{anyDeduction ? ' (applied)' : ''}
          </summary>
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            Points the referee took away, round by round. They come off that corner’s score on all three cards.
          </p>
          <div className="mt-4 space-y-3">
            {roundList.map((round) => {
              const groupId = `sc-d${round + 1}-label`;
              return (
                <div
                  key={round}
                  role="group"
                  aria-labelledby={groupId}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2"
                >
                  <span id={groupId} className="w-16 shrink-0 text-sm font-medium text-ink-700">
                    Round {round + 1}
                  </span>
                  {(['red', 'blue'] as const).map((corner) => {
                    const id = `sc-d${round + 1}-${corner}`;
                    return (
                      <div key={corner} className="flex items-center gap-2">
                        <label htmlFor={id} className="text-sm text-ink-600">
                          {corner === 'red' ? 'Red corner' : 'Blue corner'}
                        </label>
                        <select
                          id={id}
                          value={deductions[round][corner]}
                          onChange={(event) => setDeduction(round, corner, Number(event.target.value))}
                          className={selectBase}
                        >
                          {Array.from({ length: MAX_DEDUCTION + 1 }, (_, n) => (
                            <option key={n} value={n}>
                              {n === 0 ? '0' : `−${n}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </details>

        <div className="mt-4">
          <button type="button" className="btn-outline btn-sm" onClick={clearCards}>
            Clear all three cards
          </button>
        </div>
      </form>

      <ResultRegion errors={errors}>
        {bout && (
          <>
            <p className="text-sm font-medium text-ink-600">Decision</p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">{bout.decision.label}</p>
            <div className="mt-4">
              <ResultList
                items={bout.cards.map((card, judge) => ({
                  label: `Judge ${judge + 1} (red–blue)`,
                  value: formatCard(card),
                  note: card.verdict === 'even' ? 'level' : CORNER_LABELS[card.verdict].toLowerCase(),
                }))}
              />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              {anyDeduction
                ? `Includes deductions of ${bout.totalDeductions.red} from red and ${bout.totalDeductions.blue} from blue on every card. `
                : ''}
              {bout.evenRounds > 0
                ? `${bout.evenRounds} of the ${rounds * JUDGES} round scores are 10–10, which both sets of rules treat as rare.`
                : `Scored over ${rounds} ${rounds === 1 ? 'round' : 'rounds'}.`}
            </p>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
