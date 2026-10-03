'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField, TextAreaField } from '@/components/tools/fields';
import { parseNumber } from '@/lib/tools/format.mjs';
import { parseHoleRow, scoreCard, validateCard } from '@/lib/tools/stableford.mjs';

// Starts on the R&A's own example card (Rules of Golf, Diagram 21.1b), scored
// at 30 points, with the illustrative stroke index from the worked example.
const DEFAULTS = {
  holes: '18',
  pars: '4 3 4 4 3 5 4 4 5 3 4 4 3 5 3 5 3 4',
  strokeIndexes: '7 15 3 11 1 13 9 5 17 16 8 4 14 2 18 10 12 6',
  scores: '3 3 5 4 4 7 5 4 5 3 4 6 3 4 3 4 5 4',
  playingHandicap: '0',
};

const firstNine = (text: string) => text.trim().split(/[\s,;]+/).slice(0, 9).join(' ');

// Tailwind does not scan src/tools/, so this uses only classes that the shared
// components already generate.
const cell = 'whitespace-nowrap py-1.5 pr-4 text-ink-700';

const signed = (value: number) => (value > 0 ? `+${value}` : value < 0 ? `−${Math.abs(value)}` : '0');

export default function StablefordCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const setHoles = (value: string) =>
    setRaw((prev) =>
      value === '9'
        ? {
            ...prev,
            holes: value,
            pars: firstNine(prev.pars),
            strokeIndexes: firstNine(prev.strokeIndexes),
            scores: firstNine(prev.scores),
          }
        : { ...prev, holes: value }
    );

  const holes = raw.holes === '9' ? 9 : 18;
  const card = {
    holes: holes as 9 | 18,
    pars: parseHoleRow(raw.pars) as number[],
    strokeIndexes: parseHoleRow(raw.strokeIndexes) as number[],
    scores: parseHoleRow(raw.scores, { allowNoScore: true }),
    playingHandicap: parseNumber(raw.playingHandicap),
  };
  const errors = validateCard(card);
  const r = errors.length === 0 ? scoreCard(card) : null;
  const ph = card.playingHandicap;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Score a Stableford card"
      intro="One number per hole, in hole order, separated by spaces. Type x for a hole where you picked up."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="sf-holes"
            label="Holes"
            value={raw.holes}
            onChange={setHoles}
            options={[
              { value: '18', label: '18 holes' },
              { value: '9', label: '9 holes' },
            ]}
          />
          <NumberField
            id="sf-ph"
            label="Playing Handicap"
            value={raw.playingHandicap}
            onChange={set('playingHandicap')}
            inputMode="text"
            hint="A whole number. For a plus handicap, enter a negative number: +2 is −2."
          />
        </div>
        <div className="mt-4 space-y-4">
          <TextAreaField id="sf-par" label="Par for each hole" value={raw.pars} onChange={set('pars')} rows={2} />
          <TextAreaField
            id="sf-si"
            label="Stroke index for each hole"
            value={raw.strokeIndexes}
            onChange={set('strokeIndexes')}
            rows={2}
            hint="From the scorecard. For nine holes, the 18-hole indexes or a 1–9 allocation both work."
          />
          <TextAreaField id="sf-scores" label="Your strokes on each hole" value={raw.scores} onChange={set('scores')} rows={2} />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {r && (
          <ResultList
            headline
            items={[
              { label: 'Stableford points', value: String(r.points) },
              { label: `Against net par (${r.netParPoints})`, value: signed(r.points - r.netParPoints) },
              {
                label: 'Handicap strokes',
                value: ph >= 0 ? `${ph} received` : `${Math.abs(ph)} given back`,
              },
              { label: 'Holes with no points', value: String(r.holesWithoutPoints) },
              { label: 'Gross score', value: r.gross === null ? '—' : String(r.gross), note: `par ${r.par}` },
              { label: 'Net score', value: r.net === null ? '—' : String(r.net) },
            ]}
          />
        )}
      </ResultRegion>

      {r && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="caption-top pb-2 text-left text-sm font-medium text-ink-700">Hole by hole</caption>
            <thead>
              <tr className="border-b border-ink-300 text-xs text-ink-500">
                {['Hole', 'Par', 'Index', 'Hcp', 'Score', 'Net', 'Points'].map((column) => (
                  <th key={column} scope="col" className="whitespace-nowrap py-2 pr-4 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {r.rows.map((row) => (
                <tr key={row.hole} className="border-b border-ink-200 last:border-0">
                  <th scope="row" className={`${cell} font-medium text-ink-900`}>
                    {row.hole}
                  </th>
                  <td className={cell}>{row.par}</td>
                  <td className={cell}>{row.strokeIndex}</td>
                  <td className={cell}>{row.strokes === 0 ? '' : signed(row.strokes)}</td>
                  <td className={cell}>{row.gross ?? 'x'}</td>
                  <td className={cell}>{row.net ?? '—'}</td>
                  <td className="whitespace-nowrap py-1.5 font-semibold text-ink-950">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            Index is the hole’s stroke index; Hcp is the handicap strokes on it, + received or − given back.
          </p>
        </div>
      )}
    </CalculatorCard>
  );
}
