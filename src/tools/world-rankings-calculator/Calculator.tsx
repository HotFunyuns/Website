'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatFixed, parseNumber } from '@/lib/tools/format.mjs';
import { OUTCOMES, allOutcomes, pointsExchange, validateRatings, type OutcomeId } from '@/lib/tools/rugby-rankings.mjs';

// The illustrative match used in the worked example below — not real teams.
const DEFAULTS = { ratingA: '82.40', ratingB: '79.10' };

/** "+0.67", "−0.67", "0.00". */
function signed(value: number) {
  const fixed = formatFixed(Math.abs(value), 2);
  if (fixed === '0.00') return '0.00';
  return value > 0 ? `+${fixed}` : `−${fixed}`;
}

export default function WorldRankingsCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const [outcome, setOutcome] = useState<OutcomeId>('a');
  const [matchType, setMatchType] = useState<'standard' | 'world-cup'>('standard');
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const ratingA = parseNumber(raw.ratingA);
  const ratingB = parseNumber(raw.ratingB);
  const worldCup = matchType === 'world-cup';
  const errors = validateRatings({ ratingA, ratingB });
  const x = errors.length === 0 ? pointsExchange({ ratingA, ratingB, outcome, worldCup }) : null;
  const rows = errors.length === 0 ? allOutcomes({ ratingA, ratingB, worldCup }) : null;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate the points exchange"
      intro="Ratings are the numbers on World Rugby’s rankings table, between 0 and 100 — not ranking positions."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="wr-a"
            label="Team A rating"
            value={raw.ratingA}
            onChange={set('ratingA')}
            inputMode="decimal"
          />
          <NumberField
            id="wr-b"
            label="Team B rating"
            value={raw.ratingB}
            onChange={set('ratingB')}
            inputMode="decimal"
          />
          <SelectField
            id="wr-result"
            label="Result"
            value={outcome}
            onChange={(value) => setOutcome(value as OutcomeId)}
            options={OUTCOMES.map((o) => ({ value: o.id, label: o.label }))}
          />
          <SelectField
            id="wr-type"
            label="Match"
            value={matchType}
            onChange={(value) => setMatchType(value as 'standard' | 'world-cup')}
            options={[
              { value: 'standard', label: 'Full international' },
              { value: 'world-cup', label: 'Rugby World Cup match (points doubled)' },
            ]}
            hint="Venue no longer matters: home weighting ended on 1 July 2026."
          />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {x && (
          <>
            <ResultList
              headline
              items={[
                { label: 'Rating points exchanged', value: formatFixed(x.exchanged, 2) },
                {
                  label: 'Team A after the match',
                  value: formatFixed(x.newRatingA, 2),
                  note: signed(x.changeA),
                },
                {
                  label: 'Team B after the match',
                  value: formatFixed(x.newRatingB, 2),
                  note: signed(x.changeB),
                },
                { label: 'Rating gap (A − B)', value: formatFixed(x.gap, 2) },
              ]}
            />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              {x.exchanged === 0
                ? 'No points move: a favourite 10 or more rating points ahead gains nothing for winning.'
                : `Core change ${formatFixed(Math.abs(x.coreChangeA), 3)}${x.multiplier === 1 ? '' : ` × ${x.multiplier}`}. Rankings change only through rating points; positions depend on every other team’s rating too.`}
            </p>
          </>
        )}
      </ResultRegion>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-200">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="caption-top px-4 pb-2 pt-4 text-left text-sm font-medium text-ink-700">
            Every possible result{worldCup ? ' at a Rugby World Cup' : ''}
          </caption>
          <thead>
            <tr className="border-b border-ink-300 bg-cream-100 text-xs uppercase tracking-[0.08em] text-ink-500">
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Result
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Team A
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Team B
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {OUTCOMES.map((o, i) => {
              const row = rows?.[i];
              return (
                <tr key={o.id} className="border-b border-ink-200 last:border-0">
                  <th scope="row" className="px-4 py-2.5 font-medium text-ink-800">
                    {o.label}
                  </th>
                  <td className="px-4 py-2.5 text-ink-700">
                    {row ? `${signed(row.changeA)} → ${formatFixed(row.newRatingA, 2)}` : '—'}
                  </td>
                  <td className="px-4 py-2.5 text-ink-700">
                    {row ? `${signed(row.changeB)} → ${formatFixed(row.newRatingB, 2)}` : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CalculatorCard>
  );
}
