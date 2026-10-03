import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatInteger, formatRate } from '@/lib/tools/format.mjs';
import { battingStats } from '@/lib/tools/baseball.mjs';

// An illustrative season, not a real player. The same line is the calculator's
// default, and scripts/tests/tools.test.mjs pins every figure below.
const LINE = {
  atBats: 600,
  hits: 180,
  doubles: 35,
  triples: 3,
  homeRuns: 30,
  walks: 70,
  hitByPitch: 5,
  sacrificeFlies: 5,
  strikeouts: 110,
};

export default function BattingStatsExplainer() {
  const s = battingStats(LINE);
  return (
    <>
      <ExplainerSection id="formulas" title="The formulas">
        <p>
          The first three come straight from Rule 9.21 of the Official Baseball Rules; OPS, isolated power and BABIP are
          built from the same counts, as MLB’s glossary defines them.
        </p>
        <Formula label="Batting average">AVG = hits ÷ at-bats</Formula>
        <Formula label="On-base percentage">OBP = (H + BB + HBP) ÷ (AB + BB + HBP + SF)</Formula>
        <Formula label="Slugging percentage">SLG = total bases ÷ at-bats, where TB = 1B + 2×2B + 3×3B + 4×HR</Formula>
        <Formula label="On-base plus slugging">OPS = OBP + SLG</Formula>
        <Formula label="Isolated power">ISO = SLG − AVG = (2B + 2×3B + 3×HR) ÷ AB</Formula>
        <Formula label="Batting average on balls in play">BABIP = (H − HR) ÷ (AB − K − HR + SF)</Formula>
        <p>
          Walks, hit-by-pitches and sacrifice flies are not at-bats, which is why they appear in on-base percentage and
          nowhere in batting average or slugging. Sacrifice bunts are left out of every one of these numbers.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example">
        <p>
          Take an illustrative season — not a real player — of {formatInteger(LINE.atBats)} at-bats with {LINE.hits}{' '}
          hits ({LINE.doubles} doubles, {LINE.triples} triples, {LINE.homeRuns} home runs), {LINE.walks} walks,{' '}
          {LINE.hitByPitch} hit-by-pitches, {LINE.sacrificeFlies} sacrifice flies and {LINE.strikeouts} strikeouts. That
          leaves {s.singles} singles and {s.totalBases} total bases.
        </p>
        <DataTable
          caption="Rate statistics for the illustrative season"
          columns={['Statistic', 'Calculation', 'Result']}
          rows={[
            ['AVG', `${LINE.hits} ÷ ${LINE.atBats}`, formatRate(s.avg)],
            ['OBP', `${s.timesOnBase} ÷ ${s.onBaseDenominator}`, formatRate(s.obp)],
            ['SLG', `${s.totalBases} ÷ ${LINE.atBats}`, formatRate(s.slg)],
            ['OPS', `${formatRate(s.obp)} + ${formatRate(s.slg)}`, formatRate(s.ops)],
            ['ISO', `${formatRate(s.slg)} − ${formatRate(s.avg)}`, formatRate(s.iso)],
            ['BABIP', `${LINE.hits - LINE.homeRuns} ÷ ${s.ballsInPlay}`, s.babip === null ? '—' : formatRate(s.babip)],
          ]}
        />
        <p>
          The same {LINE.hits} hits produce quite different pictures: a .300 average, a better on-base percentage
          because of the walks, a slugging percentage pulled up by the extra-base hits, and a BABIP that sets the home
          runs and strikeouts aside entirely.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What these numbers do not tell you">
        <BulletList
          items={[
            'Where the games were played. None of these rates adjusts for ballpark or for the league’s scoring level that season, so they compare players best within the same context.',
            'How the hitter made outs. A strikeout and a deep fly ball count the same in batting average.',
            'How reliable a small sample is. Over a few dozen at-bats, a handful of hits moves every rate a long way — BABIP most of all, because it rests on the smallest count.',
            'OPS precision. It adds two rates with different denominators, so it is a convenient shorthand rather than a measured weighting of getting on base against hitting for power.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/ops-and-slugging-explained/" className="link-accent">
            OPS and slugging explainer
          </Link>{' '}
          goes further into what OPS captures, and{' '}
          <Link href="/blog/baseball-stats-explained-for-beginners/" className="link-accent">
            baseball stats explained for beginners
          </Link>{' '}
          covers the rest of the stat line.
        </p>
      </ExplainerSection>
    </>
  );
}
