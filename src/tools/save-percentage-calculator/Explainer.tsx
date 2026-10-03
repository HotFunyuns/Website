import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed, formatInteger, formatRate } from '@/lib/tools/format.mjs';
import { goalieStats } from '@/lib/tools/hockey.mjs';

// An illustrative season — 60 full games — not a real goalie. Also the
// calculator's default. Then the same save rate behind two different defences.
const SEASON = { shotsAgainst: 1800, goalsAgainst: 150, minutes: 3600, seconds: 0 };
const BUSY = { shotsAgainst: 40, goalsAgainst: 3.2, minutes: 60, seconds: 0 };
const QUIET = { shotsAgainst: 25, goalsAgainst: 2, minutes: 60, seconds: 0 };

export default function SavePercentageExplainer() {
  const s = goalieStats(SEASON);
  const busy = goalieStats(BUSY);
  const quiet = goalieStats(QUIET);
  return (
    <>
      <ExplainerSection id="formulas" title="The formulas">
        <Formula label="Saves">saves = shots against − goals against</Formula>
        <Formula label="Save percentage">SV% = saves ÷ shots against</Formula>
        <Formula label="Goals-against average">GAA = goals against × 60 ÷ minutes played</Formula>
        <Formula label="Shots faced per 60">shots against × 60 ÷ minutes played</Formula>
        <p>
          Shots against are shots on goal, which include the goals themselves. Sixty is the length of a regulation game,
          so goals-against average is the number of goals the goalie would concede in a full game at the same rate.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          An illustrative season — not a real goalie — of {formatInteger(SEASON.shotsAgainst)} shots and{' '}
          {SEASON.goalsAgainst} goals against over {formatInteger(SEASON.minutes)} minutes, which is 60 full games:
        </p>
        <DataTable
          caption="The illustrative season"
          columns={['Statistic', 'Calculation', 'Result']}
          rows={[
            ['Saves', '1,800 − 150', formatInteger(s.saves)],
            ['SV%', `${formatInteger(s.saves)} ÷ 1,800`, formatRate(s.savePct)],
            ['GAA', '150 × 60 ÷ 3,600', formatFixed(s.goalsAgainstAverage, 2)],
            ['Shots per 60', '1,800 × 60 ÷ 3,600', formatFixed(s.shotsAgainstPerGame, 1)],
          ]}
        />
        <p>
          Now the same save rate — 92% — behind two defences, over one 60-minute game each. (Fractional goals are fine
          here: these are per-game averages, not single games.)
        </p>
        <DataTable
          caption="One save percentage, two goals-against averages"
          columns={['Defence', 'Shots against per 60', 'SV%', 'GAA']}
          rows={[
            ['Busy', BUSY.shotsAgainst, formatRate(busy.savePct), formatFixed(busy.goalsAgainstAverage, 2)],
            ['Quiet', QUIET.shotsAgainst, formatRate(quiet.savePct), formatFixed(quiet.goalsAgainstAverage, 2)],
          ]}
        />
        <p>
          The goalie’s save rate is identical; the goals-against average differs by more than a goal a game because of
          how many shots got through.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What goalie numbers leave out">
        <BulletList
          items={[
            'Shot quality. A save on a long-range wrist shot and one on a two-on-one count the same.',
            'The defence in front. Goals-against average in particular reflects how many shots the team allows.',
            'Sample size. Over a handful of games, two or three soft goals move both numbers a long way.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/hockey-goaltending-explained/" className="link-accent">
            goaltending explainer
          </Link>{' '}
          covers what the position actually involves, and{' '}
          <Link href="/blog/plus-minus-and-hockey-stats/" className="link-accent">
            plus/minus and hockey’s other statistics
          </Link>{' '}
          covers the skaters’ side of the stat sheet.
        </p>
      </ExplainerSection>
    </>
  );
}
