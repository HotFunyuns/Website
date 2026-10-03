import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { seededRandomInt } from '@/lib/tools/draft.mjs';
import { formatFixed } from '@/lib/tools/format.mjs';
import {
  LOTTERY_PRESETS,
  MLB_BASE_ODDS,
  drawLottery,
  exactLottery,
  exactStateCount,
  parseLotteryTeams,
  simulateLottery,
  summarise,
} from '@/lib/tools/lottery.mjs';

// The MLB preset as published, the 2026 NBA lottery's published odds, and a
// seeded simulation — all computed here by the same code as the calculator.
// scripts/tests/tools-draft-lottery-simulator.test.mjs pins every figure.
const NBA_2026 = [14.0, 14.0, 14.0, 11.5, 11.5, 9.0, 6.8, 6.7, 4.5, 3.0, 2.0, 1.5, 1.0, 0.5];
const SEED = 'worked-example';
const RUNS = 100_000;

const pct = (p: number, decimals = 1) => `${formatFixed(p * 100, decimals)}%`;

export default function DraftLotteryExplainer() {
  const preset = LOTTERY_PRESETS[0];
  const { teams } = parseLotteryTeams(preset.text);
  const mlb = { teams, picksDrawn: preset.picksDrawn, ineligibleFloor: preset.ineligibleFloor };
  const exact = summarise(exactLottery(mlb) ?? [], mlb.picksDrawn);
  const simulated = summarise(simulateLottery(mlb, RUNS, seededRandomInt(SEED)), mlb.picksDrawn);
  const oneDraw = drawLottery(mlb, seededRandomInt(SEED)).slice(0, mlb.picksDrawn);

  const nba = summarise(
    exactLottery({ teams: NBA_2026.map((odds, i) => ({ name: `Team ${i + 1}`, odds })), picksDrawn: 4 }) ?? [],
    4
  );

  return (
    <>
      <ExplainerSection id="formula" title="How the draw works">
        <Formula label="Chance a team wins the next draw">
          P(team i) = odds<sub>i</sub> ÷ (sum of the odds of every team not yet drawn)
        </Formula>
        <p>
          NBA.com’s explainer describes the drawing the league used through 2026: 1,000 of the 1,001 possible four-ball
          combinations are shared among the teams, and if a combination belonging to a team that has already been drawn
          comes up, it is discarded and drawn again. That makes each draw a choice among the teams still waiting, in
          proportion to their combinations. Once the drawn picks are settled, every other team follows in reverse order of
          its record.
        </p>
        <p>
          The calculator lists each team’s exact chance of every pick by working through every possible sequence of draws
          — for the MLB preset, {exactStateCount(mlb).toLocaleString('en-US')} partial draws — rather than by simulation. Very large
          lotteries are simulated only.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example: MLB’s 2026 lottery">
        <p>
          MLB.com published the 2026 odds before the December 2025 drawing: all 18 non-playoff teams were entered for the
          first six picks, but three were ineligible — one had received a lottery pick in each of the two previous drafts,
          and two were revenue-sharing payors that had received one the year before. The other 15 teams’ chances of the
          No. 1 pick ran from 27.73% to 0.34%. Those figures are MLB’s base odds by record (16.5% for each of the three
          worst, then {MLB_BASE_ODDS.slice(3, 6).join(', ')} and so on down to {MLB_BASE_ODDS[17]}) rescaled over the
          eligible teams, and MLB places ineligible clubs no earlier than 10th. Teams are numbered from the worst 2025
          record.
        </p>
        <DataTable
          caption="Exact chances in MLB’s 2026 lottery"
          columns={['Team', 'No. 1 pick', 'A top-six pick', 'Average pick', 'Possible picks']}
          rows={teams.map((team, i) => [
            team.odds > 0 ? team.name : `${team.name} (ineligible)`,
            team.odds > 0 ? pct(exact[i].first, 2) : '—',
            team.odds > 0 ? pct(exact[i].drawnPick) : '—',
            formatFixed(exact[i].expectedPick, 2),
            exact[i].best === exact[i].worst ? String(exact[i].best) : `${exact[i].best}–${exact[i].worst}`,
          ])}
        />
        <p>
          The worst eligible team, Team 2, has a {pct(exact[1].drawnPick)} chance of a top-six pick and can fall no lower
          than seventh, while Team 18 has a {pct(exact[17].drawnPick)} chance of jumping into the top six. The three
          ineligible teams always pick 10th, 11th and 12th.
        </p>
        <p>
          A seeded simulation of {RUNS.toLocaleString('en-US')} lotteries (seed “{SEED}”) gives Team 2 the No. 1 pick in{' '}
          {pct(simulated[1].first, 2)} of them against an exact {pct(exact[1].first, 2)}, and a top-six pick in{' '}
          {pct(simulated[1].drawnPick)} against {pct(exact[1].drawnPick)}. A single draw from the same seed gives the top six
          picks to Teams {oneDraw.map((team) => team + 1).join(', ')}, in that order. Enter the same seed in the calculator
          and you get the same draw.
        </p>
        <p>
          MLB’s articles do not say how the second to sixth draws are weighted. The simulator uses the rule NBA.com
          describes — each draw among the teams not yet drawn, in proportion to their odds — so only the No. 1 chances are
          guaranteed to match MLB’s published table.
        </p>
      </ExplainerSection>

      <ExplainerSection id="nba" title="The NBA’s format, 2019 to 2026">
        <p>
          For its 2026 lottery the NBA drew four picks from 14 teams. In the odds NBA.com published, the three worst
          records had 14.0% each and teams level on record shared their chances. With those odds, the worst team’s chance
          of the No. 1 pick was{' '}
          {pct(nba[0].first)}, its chance of any top-four pick {pct(nba[0].drawnPick)} — so a{' '}
          {pct(1 - nba[0].drawnPick)} chance of falling to fifth, the lowest it could go.
        </p>
        <p>
          That format has been replaced. The NBA’s new “3-2-1 Lottery”, approved in May 2026 for the 2027 to 2029 drafts,
          expands the lottery to 16 teams with three, two or one ball each and draws all 16 picks, with the three worst
          teams guaranteed no worse than 12th. The announcement does not say how that floor is applied during the drawing,
          so there is no NBA preset; you can still enter any table of odds as a custom lottery.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What this simulator does not model">
        <BulletList
          items={[
            'Limits on how far a team can move up. The NHL draws two picks and, since 2022, has not let a team move up more than 10 places; we could not open an official current NHL odds table, so there is no NHL preset.',
            'Traded and protected picks, which change who holds a pick but not where it falls.',
            'Tiebreakers between teams with the same record. Enter split or adjusted odds as your league publishes them.',
            'Anything after the lottery. It tells you where each team picks, not whom to pick.',
          ]}
        />
        <p>
          For why leagues use lotteries at all and what flattening the odds changes, read{' '}
          <Link href="/blog/how-draft-lotteries-work/" className="link-accent">
            how draft lotteries work
          </Link>
          ; to draw a plain random order for a league with no weighting, use the{' '}
          <Link href="/tools/multi-sport/draft-order-generator/" className="link-accent">
            draft order generator
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
