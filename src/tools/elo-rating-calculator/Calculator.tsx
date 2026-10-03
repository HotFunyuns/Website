'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatFixed, parseNumber } from '@/lib/tools/format.mjs';
import {
  FIDE_K,
  FIFA_IMPORTANCE,
  FIFA_RESULTS,
  RESULTS,
  eloUpdate,
  fideUpdate,
  fifaUpdate,
  validateElo,
  validateFide,
  validateFifa,
} from '@/lib/tools/elo.mjs';

type Method = 'elo' | 'fide' | 'fifa';

const METHODS: { value: Method; label: string }[] = [
  { value: 'elo', label: 'Elo’s formula (400-point scale)' },
  { value: 'fide', label: 'FIDE rating regulations (chess)' },
  { value: 'fifa', label: 'FIFA men’s world ranking (SUM)' },
];

// Starts on Glickman and Jones’s example: 1500 against 1700.
const DEFAULTS = {
  method: 'elo' as Method,
  ratingA: '1500',
  ratingB: '1700',
  result: 'a-win',
  k: '20',
  kA: '20',
  kB: '20',
  importance: 'qualifier',
  knockout: 'no',
};

const signed = (value: number, decimals: number) => {
  const text = formatFixed(Math.abs(value), decimals);
  return value > 0 ? `+${text}` : value < 0 ? `−${text}` : formatFixed(0, decimals);
};

export default function EloCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));
  const method = raw.method;
  const ratingA = parseNumber(raw.ratingA);
  const ratingB = parseNumber(raw.ratingB);

  const results = method === 'fifa' ? FIFA_RESULTS : RESULTS;
  // A shoot-out result means nothing outside FIFA's method: fall back to a win.
  const result = results.find((r) => r.id === raw.result) ?? results[0];

  let errors: string[] = [];
  let items: { label: string; value: string; note?: string }[] = [];

  if (method === 'elo') {
    const k = parseNumber(raw.k);
    errors = validateElo({ ratingA, ratingB, k });
    if (errors.length === 0) {
      const r = eloUpdate({ ratingA, ratingB, scoreA: 'scoreA' in result ? result.scoreA : 1, k });
      items = [
        { label: 'Expected score, A', value: formatFixed(r.expectedA, 3), note: 'out of 1' },
        { label: 'Expected score, B', value: formatFixed(r.expectedB, 3) },
        { label: 'Change for A', value: signed(r.changeA, 1) },
        { label: 'Change for B', value: signed(r.changeB, 1) },
        { label: 'New rating, A', value: formatFixed(r.newA, 1) },
        { label: 'New rating, B', value: formatFixed(r.newB, 1) },
      ];
    }
  } else if (method === 'fide') {
    const kA = Number(raw.kA);
    const kB = Number(raw.kB);
    errors = validateFide({ ratingA, ratingB, kA, kB });
    if (errors.length === 0) {
      const r = fideUpdate({ ratingA, ratingB, scoreA: 'scoreA' in result ? result.scoreA : 1, kA, kB });
      items = [
        { label: 'Expected score, A (table 8.1.2)', value: formatFixed(r.expectedA, 2), note: 'out of 1' },
        { label: 'Expected score, B', value: formatFixed(r.expectedB, 2) },
        { label: 'Change for A', value: signed(r.changeA, 0), note: `${signed(r.exactChangeA, 1)} before rounding` },
        { label: 'Change for B', value: signed(r.changeB, 0), note: `${signed(r.exactChangeB, 1)} before rounding` },
        { label: 'New rating, A', value: String(r.newA) },
        { label: 'New rating, B', value: String(r.newB) },
      ];
    }
  } else {
    const importance = FIFA_IMPORTANCE.find((option) => option.id === raw.importance) ?? FIFA_IMPORTANCE[0];
    errors = validateFifa({ pointsA: ratingA, pointsB: ratingB });
    if (errors.length === 0) {
      const w = 'wA' in result ? result : FIFA_RESULTS[0];
      const r = fifaUpdate({
        pointsA: ratingA,
        pointsB: ratingB,
        wA: w.wA,
        wB: w.wB,
        importance: importance.value,
        knockout: raw.knockout === 'yes',
      });
      items = [
        { label: 'Expected result, A (We)', value: formatFixed(r.expectedA, 3), note: 'out of 1' },
        { label: 'Expected result, B', value: formatFixed(r.expectedB, 3) },
        { label: 'Points change, A', value: signed(r.changeA, 2) },
        { label: 'Points change, B', value: signed(r.changeB, 2) },
        { label: 'New points, A', value: formatFixed(r.newA, 2) },
        { label: 'New points, B', value: formatFixed(r.newB, 2) },
      ];
    }
  }

  const ratingLabel = method === 'fifa' ? 'points' : 'rating';

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate an Elo rating change"
      intro="One game or match between two sides, rated before it was played."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="space-y-4">
          <SelectField
            id="elo-method"
            label="Method"
            value={method}
            onChange={(value) => setRaw((prev) => ({ ...prev, method: value as Method }))}
            options={METHODS}
            hint={
              method === 'elo'
                ? 'Expected score 1 ÷ (1 + 10^(−difference ÷ 400)); the same K for both sides.'
                : method === 'fide'
                  ? 'FIDE’s table 8.1.2, its 400-point rule and its K-factors; changes rounded to whole points.'
                  : 'FIFA’s 600-point scale, match importance, shoot-outs and knockout protection.'
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              id="elo-a"
              label={`A’s ${ratingLabel}`}
              value={raw.ratingA}
              onChange={set('ratingA')}
              inputMode={method === 'fide' ? 'numeric' : 'decimal'}
            />
            <NumberField
              id="elo-b"
              label={`B’s ${ratingLabel}`}
              value={raw.ratingB}
              onChange={set('ratingB')}
              inputMode={method === 'fide' ? 'numeric' : 'decimal'}
            />
          </div>
          <SelectField
            id="elo-result"
            label="Result"
            value={result.id}
            onChange={set('result')}
            options={results.map((r) => ({ value: r.id, label: r.label }))}
          />
          {method === 'elo' && (
            <NumberField
              id="elo-k"
              label="K-factor"
              value={raw.k}
              onChange={set('k')}
              inputMode="decimal"
              hint="How far one result can move a rating. FIDE’s values are 40, 20 and 10."
            />
          )}
          {method === 'fide' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                id="elo-ka"
                label="K-factor, A"
                value={raw.kA}
                onChange={set('kA')}
                options={FIDE_K.map((option) => ({ value: String(option.k), label: option.label }))}
              />
              <SelectField
                id="elo-kb"
                label="K-factor, B"
                value={raw.kB}
                onChange={set('kB')}
                options={FIDE_K.map((option) => ({ value: String(option.k), label: option.label }))}
              />
            </div>
          )}
          {method === 'fifa' && (
            <>
              <SelectField
                id="elo-importance"
                label="Match importance (I)"
                value={raw.importance}
                onChange={set('importance')}
                options={FIFA_IMPORTANCE.map((option) => ({ value: option.id, label: option.label }))}
              />
              <SelectField
                id="elo-knockout"
                label="Knockout round of a final competition?"
                value={raw.knockout}
                onChange={set('knockout')}
                options={[
                  { value: 'no', label: 'No' },
                  { value: 'yes', label: 'Yes — a team cannot lose points' },
                ]}
              />
            </>
          )}
        </div>
      </form>

      <ResultRegion errors={errors}>{items.length > 0 && <ResultList headline items={items} />}</ResultRegion>
    </CalculatorCard>
  );
}
