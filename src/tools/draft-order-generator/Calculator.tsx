'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultRegion, SelectField, TextAreaField } from '@/components/tools/fields';
import { parseNumber } from '@/lib/tools/format.mjs';
import {
  ORDER_TYPES,
  buildBoard,
  cryptoRandomInt,
  fisherYates,
  parseTeamNames,
  picksForSlot,
  seededRandomInt,
  validateDraft,
} from '@/lib/tools/draft.mjs';

type OrderType = 'snake' | 'third-round-reversal' | 'straight';

const DEFAULT_NAMES = Array.from({ length: 12 }, (_, i) => `Team ${i + 1}`).join('\n');

export default function DraftOrderGenerator() {
  const [namesText, setNamesText] = useState(DEFAULT_NAMES);
  const [type, setType] = useState<OrderType>('snake');
  const [roundsText, setRoundsText] = useState('15');
  const [seed, setSeed] = useState('');
  // The drawn order, or null for "the order as entered". Editing the team list
  // clears it, so a stale draw can never be shown against a different league.
  const [drawn, setDrawn] = useState<{ order: string[]; note: string } | null>(null);

  const names = parseTeamNames(namesText);
  const rounds = parseNumber(roundsText);
  const errors = validateDraft({ names, rounds });
  const order = drawn?.order ?? names;
  const typeLabel = ORDER_TYPES.find((t) => t.id === type)?.label ?? type;

  const draw = () => {
    if (errors.length > 0) return;
    const trimmed = seed.trim();
    const randomInt = trimmed
      ? seededRandomInt(trimmed)
      : cryptoRandomInt((buffer) => window.crypto.getRandomValues(buffer));
    setDrawn({
      order: fisherYates(names, randomInt),
      note: trimmed
        ? `Drawn from the seed “${trimmed}” — the same seed and team list always give this order.`
        : 'Drawn with your browser’s cryptographic random number generator.',
    });
  };

  const board = errors.length === 0 ? buildBoard({ order, type, rounds }) : [];

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Generate a draft order"
      intro="One team per line. The order you type is round one’s order until you draw a random one."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextAreaField
              id="do-names"
              label="Teams"
              value={namesText}
              onChange={(value) => {
                setNamesText(value);
                setDrawn(null);
              }}
              rows={8}
              invalid={errors.some((e) => e.startsWith('Enter') || e.includes('appears') || e.includes('characters'))}
            />
          </div>
          <SelectField
            id="do-type"
            label="Order from round to round"
            value={type}
            onChange={(value) => setType(value as OrderType)}
            options={ORDER_TYPES.map((t) => ({ value: t.id, label: t.label }))}
          />
          <NumberField id="do-rounds" label="Rounds" value={roundsText} onChange={setRoundsText} />
          <div className="sm:col-span-2">
            <NumberField
              id="do-seed"
              label="Seed (optional)"
              value={seed}
              onChange={setSeed}
              inputMode="text"
              hint="Leave empty for a cryptographically random draw. Any text works as a seed; share it so others can repeat the draw."
            />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="btn-primary btn-sm" onClick={draw} disabled={errors.length > 0}>
            Draw a random order
          </button>
          <button type="button" className="btn-outline btn-sm" onClick={() => setDrawn(null)} disabled={!drawn}>
            Use the order as entered
          </button>
        </div>
      </form>

      {/* Only the summary is live; re-reading the whole board on every
          keystroke would drown a screen-reader user. */}
      <ResultRegion errors={errors} minHeight="min-h-[5rem]">
        {errors.length === 0 && (
          <p className="text-sm leading-relaxed text-ink-700">
            {drawn ? drawn.note : 'Showing the order as entered.'} <strong className="text-ink-950">{order[0]}</strong>{' '}
            picks first; {order.length} teams, {rounds} rounds, {typeLabel.toLowerCase()} — {order.length * rounds} picks
            in all.
          </p>
        )}
      </ResultRegion>

      {errors.length === 0 && (
        <>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="caption-top pb-2 text-left text-sm font-medium text-ink-700">
                Every pick, by team
              </caption>
              <thead>
                <tr className="border-b border-ink-300 text-xs uppercase tracking-[0.1em] text-ink-500">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Slot
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Team
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Overall picks
                  </th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {order.map((team, i) => (
                  <tr key={team} className="border-b border-ink-200 last:border-0 align-top">
                    <td className="py-2 pr-4 text-ink-700">{i + 1}</td>
                    <th scope="row" className="py-2 pr-4 font-medium text-ink-900">
                      {team}
                    </th>
                    <td className="py-2 text-ink-700">
                      {picksForSlot({ type, teams: order.length, slot: i + 1, rounds })
                        .map((pick) => pick.overall)
                        .join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <details className="mt-6 rounded-xl border border-ink-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold text-ink-800">Show the full board, round by round</summary>
            <ol className="mt-4 space-y-3 text-sm">
              {board.map((round) => (
                <li key={round.round}>
                  <p className="font-semibold text-ink-900">Round {round.round}</p>
                  <p className="mt-1 leading-relaxed text-ink-600">
                    {round.picks.map((pick) => `${pick.overall}. ${pick.team}`).join(' · ')}
                  </p>
                </li>
              ))}
            </ol>
          </details>
        </>
      )}
    </CalculatorCard>
  );
}
