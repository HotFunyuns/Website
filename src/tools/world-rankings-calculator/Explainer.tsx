import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed } from '@/lib/tools/format.mjs';
import {
  BIG_WIN_MARGIN,
  BIG_WIN_MULTIPLIER,
  GAP_CAP,
  WORLD_CUP_MULTIPLIER,
  allOutcomes,
  coreRatingChange,
  pointsExchange,
} from '@/lib/tools/rugby-rankings.mjs';

// World Rugby's worked example (a 2004 Six Nations match), as its explanation
// page gives it: home side 76.92, visitors 76.36, home side counted 3 points
// stronger under the rule in force until 30 June 2026.
const OLD_HOME = 76.92;
const OLD_AWAY = 76.36;
const OLD_HOME_WEIGHT = 3;
// An illustrative match — not real teams — that is also the calculator's default.
const A = 82.4;
const B = 79.1;
// From World Rugby's rankings updates of 13 and 20 July 2026: a side that went in
// on 84.75 beat a side on 84.06 by seven points and gained 0.93.
const CHECK_WINNER = 84.75;
const CHECK_LOSER = 84.06;

const two = (value: number) => formatFixed(value, 2);

export default function WorldRankingsExplainer() {
  const oldHome = OLD_HOME + OLD_HOME_WEIGHT;
  const oldWin = coreRatingChange(oldHome, OLD_AWAY, 'win');
  const oldDraw = -coreRatingChange(oldHome, OLD_AWAY, 'draw');
  const oldLoss = coreRatingChange(OLD_AWAY, oldHome, 'win');
  const nowWin = coreRatingChange(OLD_HOME, OLD_AWAY, 'win');
  const nowDraw = -coreRatingChange(OLD_HOME, OLD_AWAY, 'draw');
  const nowLoss = coreRatingChange(OLD_AWAY, OLD_HOME, 'win');
  const rows = allOutcomes({ ratingA: A, ratingB: B });
  const check = pointsExchange({ ratingA: CHECK_WINNER, ratingB: CHECK_LOSER, outcome: 'a' });
  return (
    <>
      <ExplainerSection id="formulas" title="How the exchange works">
        <Formula label="Expected result">expected = (your rating − opponent’s rating) ÷ {GAP_CAP}, held between −1 and +1</Formula>
        <Formula label="Core rating change">core change = result − expected, where a win counts +1, a draw 0 and a loss −1</Formula>
        <Formula label="Weightings">
          × {BIG_WIN_MULTIPLIER} if the winning margin is more than {BIG_WIN_MARGIN} points · × {WORLD_CUP_MULTIPLIER} at a
          Rugby World Cup
        </Formula>
        <p>
          World Rugby publishes the core changes as charts rather than as a formula. They are straight lines: a win is
          worth 1 point between evenly rated sides, falling to nothing for a favourite {GAP_CAP} or more points ahead and
          rising to 2 for a side {GAP_CAP} or more points behind; a draw moves a tenth of the gap, up to a full point,
          from the higher-rated side to the lower. The formula above traces those charts and reproduces the page’s worked
          example. Whatever one side gains, the other loses.
        </p>
      </ExplainerSection>

      <ExplainerSection id="home-weighting" title="The change on 1 July 2026">
        <p>
          Until 30 June 2026 the home side was treated as {OLD_HOME_WEIGHT} rating points stronger than it was, which
          cut what it gained for winning and raised what it lost for losing. World Rugby’s announcement of 18 June 2026
          removed that step from 1 July 2026, because so many international matches are now played in centralised or
          neutral venues. The explanation page, dated 2014, still describes the old step, so
          this calculator follows the page in every other respect and leaves the home weighting out. Results from before
          1 July 2026 were calculated with it.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example: World Rugby’s own">
        <p>
          World Rugby’s explanation works through a 2004 Six Nations match between a home side rated{' '}
          {two(OLD_HOME)} and visitors rated {two(OLD_AWAY)}. Under the old rule the home side counted as{' '}
          {two(oldHome)}, a gap of {two(oldHome - OLD_AWAY)}. The same ratings under the current method give a gap of{' '}
          {two(OLD_HOME - OLD_AWAY)}:
        </p>
        <DataTable
          caption="One match, before and after home weighting ended"
          columns={['Result', 'With home weighting (World Rugby’s figures)', 'Current method']}
          rows={[
            ['Home win', two(oldWin), two(nowWin)],
            ['Draw (home side gives)', two(oldDraw), two(nowDraw)],
            ['Away win', two(oldLoss), two(nowLoss)],
          ]}
        />
        <p>
          The home side won by 13, inside the 15-point threshold, so the teams exchanged {two(oldWin)} points; the
          visitors dropped to {two(OLD_AWAY - oldWin)}, as the page reports. Today the same win would exchange{' '}
          {two(nowWin)}. (The page multiplies the rounded 0.64 by 1.5 to show a bigger win would have been worth 0.96;
          unrounded, it is {formatFixed(oldWin * BIG_WIN_MULTIPLIER, 3)}.)
        </p>
        <p>
          Now an illustrative pair — not real teams — rated {two(A)} and {two(B)}, the calculator’s starting values:
        </p>
        <DataTable
          caption={`Every result between sides rated ${two(A)} and ${two(B)}`}
          columns={['Result', 'Points exchanged', 'Team A after']}
          rows={rows.map((r) => [r.outcome.label, formatFixed(r.exchanged, 3), two(r.newRatingA)])}
        />
      </ExplainerSection>

      <ExplainerSection id="checked" title="Checked against a result after the change">
        <p>
          World Rugby’s rankings update of 20 July 2026 reports a side gaining {two(check.exchanged)} points for a
          seven-point win, taking it to {two(check.newRatingA)}; its update of 13 July had put the opponent on{' '}
          {two(CHECK_LOSER)}. That is a gap of {two(CHECK_WINNER - CHECK_LOSER)} and exactly the{' '}
          {two(check.exchanged)} the current method gives. With the old three points added to either side as hosts,
          the figure would have been {two(coreRatingChange(CHECK_WINNER + 3, CHECK_LOSER, 'win'))} or{' '}
          {two(coreRatingChange(CHECK_WINNER, CHECK_LOSER + 3, 'win'))}.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What the calculator does not do">
        <BulletList
          items={[
            'Rank anyone. It moves two ratings; a team’s position also depends on every other team’s rating.',
            'Hold any ratings. You enter them from World Rugby’s rankings, which are published to two decimals, so results can differ from World Rugby’s by 0.01.',
            'Judge which matches count. Only full internationals between World Rugby full member unions affect the rankings.',
            'Apply the old home weighting. Matches played before 1 July 2026 were calculated with it.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/how-rugby-scoring-works/" className="link-accent">
            guide to rugby scoring
          </Link>{' '}
          covers what tries, conversions and penalty goals are worth — the scores a 15-point margin is built from — and{' '}
          <Link href="/blog/how-tennis-ranking-points-work/" className="link-accent">
            how tennis ranking points work
          </Link>{' '}
          shows a ranking system built the other way, on points that drop off a rolling window.
        </p>
      </ExplainerSection>
    </>
  );
}
