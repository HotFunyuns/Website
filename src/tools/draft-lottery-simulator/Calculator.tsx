'use client';

import { useMemo, useState } from 'react';
import { CalculatorCard, NumberField, ResultRegion, SelectField, TextAreaField } from '@/components/tools/fields';
import { cryptoRandomInt, seededRandomInt } from '@/lib/tools/draft.mjs';
import { formatFixed, isBlank, parseNumber } from '@/lib/tools/format.mjs';
import {
  LOTTERY_PRESETS,
  drawLottery,
  exactLottery,
  parseLotteryTeams,
  simulateLottery,
  summarise,
  validateLottery,
} from '@/lib/tools/lottery.mjs';

const CUSTOM = 'custom';
const START = LOTTERY_PRESETS[0];
const RUN_OPTIONS = ['1000', '10000', '50000'];

// Tailwind does not scan src/tools/, so these use only classes that the
// shared components already generate.
const headCell = 'whitespace-nowrap py-2 pr-4 font-semibold';
const bodyCell = 'whitespace-nowrap py-2 pr-4 text-ink-700';

const pct = (p: number) => (p <= 0 ? '—' : p >= 0.99995 ? '100%' : p < 0.0001 ? '<0.01%' : `${formatFixed(p * 100, 2)}%`);

type Simulated = { matrix: number[][]; runs: number; note: string };

export default function DraftLotterySimulator() {
  const [preset, setPreset] = useState(START.id);
  const [text, setText] = useState(START.text);
  const [picksText, setPicksText] = useState(String(START.picksDrawn));
  const [floorText, setFloorText] = useState(String(START.ineligibleFloor));
  const [seed, setSeed] = useState('');
  const [runsText, setRunsText] = useState('10000');
  // Results of the buttons. Any edit to the lottery clears them, so a draw can
  // never be shown against a different set of teams.
  const [drawn, setDrawn] = useState<{ order: number[]; note: string } | null>(null);
  const [simulated, setSimulated] = useState<Simulated | null>(null);

  const edit = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setPreset(CUSTOM);
    setDrawn(null);
    setSimulated(null);
  };

  const loadPreset = (id: string) => {
    setPreset(id);
    setDrawn(null);
    setSimulated(null);
    const chosen = LOTTERY_PRESETS.find((p) => p.id === id);
    if (!chosen) return;
    setText(chosen.text);
    setPicksText(String(chosen.picksDrawn));
    setFloorText(chosen.ineligibleFloor ? String(chosen.ineligibleFloor) : '');
  };

  const parsed = useMemo(() => parseLotteryTeams(text), [text]);
  const lottery = {
    teams: parsed.teams,
    picksDrawn: parseNumber(picksText),
    ineligibleFloor: isBlank(floorText) ? null : parseNumber(floorText),
  };
  const errors = [...parsed.errors, ...validateLottery({ ...lottery, runs: parseNumber(runsText) })];
  const valid = errors.length === 0;

  const exact = useMemo(
    () => (valid ? exactLottery(lottery) : null),
    // The lottery is rebuilt from these three strings on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [valid, text, picksText, floorText]
  );
  const exactSummary = exact ? summarise(exact, lottery.picksDrawn) : null;
  const simSummary = simulated ? summarise(simulated.matrix, lottery.picksDrawn) : null;

  const generator = () => {
    const trimmed = seed.trim();
    return {
      randomInt: trimmed ? seededRandomInt(trimmed) : cryptoRandomInt((buffer) => window.crypto.getRandomValues(buffer)),
      how: trimmed
        ? `from the seed “${trimmed}” — the same seed and teams always give the same result`
        : 'with your browser’s cryptographic random number generator',
    };
  };

  const drawOnce = () => {
    if (!valid) return;
    const { randomInt, how } = generator();
    setDrawn({ order: drawLottery(lottery, randomInt), note: `One draw, ${how}.` });
  };

  const simulate = () => {
    if (!valid) return;
    const runs = parseNumber(runsText);
    const { randomInt, how } = generator();
    setSimulated({
      matrix: simulateLottery(lottery, runs, randomInt),
      runs,
      note: `${runs.toLocaleString('en-US')} simulated lotteries, ${how}.`,
    });
  };

  const names = lottery.teams.map((team) => team.name);
  const topTeam = exactSummary
    ? exactSummary.reduce((top, row, i) => (row.first > exactSummary[top].first ? i : top), 0)
    : null;
  const drawnPick = drawn ? new Map(drawn.order.map((team, pick) => [team, pick + 1])) : null;
  const n = lottery.picksDrawn;
  const drawnPicksLabel = n === 1 ? 'Pick 1' : `Picks 1–${n}`;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Run a draft lottery"
      intro="One team per line, worst record first: a name, a comma, then its odds. “ineligible” means the team cannot be drawn."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="space-y-4">
          <SelectField
            id="dl-preset"
            label="Lottery"
            value={preset}
            onChange={loadPreset}
            options={[
              ...LOTTERY_PRESETS.map((p) => ({ value: p.id, label: p.label })),
              { value: CUSTOM, label: 'Custom — your own teams and odds' },
            ]}
            hint="The MLB preset is the table MLB.com published for its 2026 lottery, with teams numbered from the worst 2025 record."
          />
          <TextAreaField
            id="dl-teams"
            label="Teams and odds, worst record first"
            value={text}
            onChange={edit(setText)}
            rows={10}
            invalid={parsed.errors.length > 0}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberField
            id="dl-picks"
            label="Picks decided by the draw"
            value={picksText}
            onChange={edit(setPicksText)}
          />
          <NumberField
            id="dl-floor"
            label="Earliest pick for ineligible teams (optional)"
            value={floorText}
            onChange={edit(setFloorText)}
            hint="MLB places ineligible clubs no earlier than 10th. Leave empty for none."
          />
          <NumberField
            id="dl-seed"
            label="Seed (optional)"
            value={seed}
            onChange={(value) => setSeed(value)}
            inputMode="text"
            hint="Leave empty for a cryptographically random draw; any text makes it repeatable."
          />
          <SelectField
            id="dl-runs"
            label="Lotteries to simulate"
            value={runsText}
            onChange={(value) => {
              setRunsText(value);
              setSimulated(null);
            }}
            options={RUN_OPTIONS.map((runs) => ({ value: runs, label: Number(runs).toLocaleString('en-US') }))}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="btn-primary btn-sm" onClick={drawOnce} disabled={!valid}>
            Draw once
          </button>
          <button type="button" className="btn-outline btn-sm" onClick={simulate} disabled={!valid}>
            Simulate {Number(runsText).toLocaleString('en-US')} lotteries
          </button>
        </div>
      </form>

      {/* Only this summary is live; re-reading the whole table on every
          keystroke would drown a screen-reader user. */}
      <ResultRegion errors={errors}>
        {valid && (
          <div className="space-y-2 text-sm leading-relaxed text-ink-700">
            <p>
              {lottery.teams.length} teams, {n} pick{n === 1 ? '' : 's'} drawn.{' '}
              {exactSummary && topTeam !== null ? (
                <>
                  <strong className="text-ink-950">{names[topTeam]}</strong> has the top chance of the No. 1 pick:{' '}
                  {pct(exactSummary[topTeam].first)}.
                </>
              ) : (
                'This lottery has too many possible draws to list exactly — run a simulation instead.'
              )}
            </p>
            {drawn && (
              <p>
                {drawn.note} {drawnPicksLabel}:{' '}
                <strong className="text-ink-950">{drawn.order.slice(0, n).map((team) => names[team]).join(', ')}</strong>.
              </p>
            )}
            {simulated && <p>{simulated.note} Shares are shown beside the exact chances.</p>}
          </div>
        )}
      </ResultRegion>

      {valid && (exactSummary || simSummary) && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="caption-top pb-2 text-left text-sm font-medium text-ink-700">
              {exactSummary ? 'Exact chances' : 'Simulated shares'} for each team
            </caption>
            <thead>
              <tr className="border-b border-ink-300 text-xs uppercase tracking-[0.08em] text-ink-500">
                <th scope="col" className={headCell}>
                  Team
                </th>
                <th scope="col" className={headCell}>
                  No. 1 pick
                </th>
                <th scope="col" className={headCell}>
                  {drawnPicksLabel}
                </th>
                {exactSummary && (
                  <>
                    <th scope="col" className={headCell}>
                      Average pick
                    </th>
                    <th scope="col" className={headCell}>
                      Possible picks
                    </th>
                  </>
                )}
                {exactSummary && simSummary && (
                  <th scope="col" className={headCell}>
                    Simulated No. 1
                  </th>
                )}
                {drawnPick && (
                  <th scope="col" className={headCell}>
                    This draw
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {names.map((name, i) => {
                const row = exactSummary ? exactSummary[i] : simSummary![i];
                return (
                  <tr key={name} className="border-b border-ink-200 last:border-0">
                    <th scope="row" className={`${bodyCell} font-medium text-ink-900`}>
                      {name}
                    </th>
                    <td className={bodyCell}>{pct(row.first)}</td>
                    <td className={bodyCell}>{pct(row.drawnPick)}</td>
                    {exactSummary && (
                      <>
                        <td className={bodyCell}>{formatFixed(row.expectedPick, 2)}</td>
                        <td className={bodyCell}>{row.best === row.worst ? row.best : `${row.best}–${row.worst}`}</td>
                      </>
                    )}
                    {exactSummary && simSummary && <td className={bodyCell}>{pct(simSummary[i].first)}</td>}
                    {drawnPick && <td className={`${bodyCell} font-semibold text-ink-900`}>{drawnPick.get(i)}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {valid && exact && (
        <details className="mt-6 rounded-xl border border-ink-200 bg-white p-5">
          <summary className="text-sm font-semibold text-ink-800">Show every team’s chance of every pick</summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <caption className="sr-only">Chance of each pick, by team</caption>
              <thead>
                <tr className="border-b border-ink-300 text-ink-500">
                  <th scope="col" className="whitespace-nowrap py-1.5 pr-4 font-semibold">
                    Team
                  </th>
                  {names.map((_, pick) => (
                    <th key={pick} scope="col" className="px-1.5 py-1.5 font-semibold">
                      {pick + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {exact.map((row, i) => (
                  <tr key={names[i]} className="border-b border-ink-200 last:border-0">
                    <th scope="row" className="whitespace-nowrap py-1.5 pr-4 font-medium text-ink-900">
                      {names[i]}
                    </th>
                    {row.map((p, pick) => (
                      <td key={pick} className="whitespace-nowrap px-1.5 py-1.5 text-ink-700">
                        {p <= 0 ? '' : p >= 0.9995 ? '100' : p < 0.0005 ? '<0.1' : formatFixed(p * 100, 1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-ink-500">Percentages; a blank cell is impossible.</p>
          </div>
        </details>
      )}
    </CalculatorCard>
  );
}
