import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed } from '@/lib/tools/format.mjs';
import { holdProbability, matchProbabilities } from '@/lib/tools/tennis.mjs';

// The worked example (62% against 60%) and an edge table — illustrative
// players, not real ones. scripts/tests/tools-win-probability-calculator
// .test.mjs pins the figures and checks the model against the paper's tables.
const BASE = 0.6;
const EDGES = [0, 0.01, 0.02, 0.03, 0.05];

const pct = (p: number) => `${formatFixed(p * 100, 1)}%`;

export default function TennisExplainer() {
  const r5 = matchProbabilities({ pA: 0.62, pB: 0.6, bestOf: 5, finalSet: 'tiebreak' });
  const r3 = matchProbabilities({ pA: 0.62, pB: 0.6, bestOf: 3, finalSet: 'tiebreak' });
  const finals = [
    { label: 'Tie-break at 6–6', id: 'tiebreak' as const },
    { label: 'Advantage set', id: 'advantage' as const },
    { label: '10-point match tie-break', id: 'match-tiebreak' as const },
  ].map((f) => ({ ...f, p: matchProbabilities({ pA: 0.62, pB: 0.6, bestOf: 3, finalSet: f.id }).matchA }));

  return (
    <>
      <ExplainerSection id="formula" title="The model">
        <p>
          Newton and Keller (2005) model a match from two numbers: <em>p</em>
          <sub>A</sub>, the chance that player A wins a point on A’s serve, and <em>p</em>
          <sub>B</sub>, the same for B. Every point is independent and the two chances never change. The chance of holding
          serve is their equation (5), with <em>q</em> = 1 − <em>p</em>:
        </p>
        <Formula label="Holding serve">
          G(p) = p<sup>4</sup>(1 + 4q + 10q<sup>2</sup>) + 20p<sup>3</sup>q<sup>3</sup> · p<sup>2</sup> ÷ (1 − 2pq)
        </Formula>
        <p>
          The first part counts wins to love, 15 and 30; the second reaches deuce and then wins two points in a row before
          the receiver does. In a No-Ad game, deuce is one deciding point, so the server simply needs four points before the
          receiver gets four: p<sup>4</sup>(1 + 4q + 10q<sup>2</sup> + 20q<sup>3</sup>).
        </p>
        <Formula label="Winning a tie-break from 6–6">
          p<sub>A</sub>(1 − p<sub>B</sub>) ÷ (p<sub>A</sub>(1 − p<sub>B</sub>) + (1 − p<sub>A</sub>)p<sub>B</sub>)
        </Formula>
        <p>
          Tie-breaks, sets and matches are built up score by score, following the serve: in a tie-break one point, then two
          each, as the ITF’s Rule 5 sets out; in a set, alternate games, with the tie-break counted as the 13th. From 6–6
          in a tie-break each further pair of points has one served by each player, which gives the closed form above, and
          an advantage set from five games all works the same way with games. Newton and Keller proved that in this model
          it makes no difference who serves first.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example">
        <p>
          Two illustrative players: A wins 62% of points on serve, B wins 60%. The two-point edge grows at every layer of
          the scoring:
        </p>
        <DataTable
          caption="62% against 60% on serve"
          columns={['Measure', 'Player A', 'Player B']}
          rows={[
            ['Holds serve', pct(r5.holdA), pct(r5.holdB)],
            ['Wins a tie-break', pct(r5.tiebreakA), pct(1 - r5.tiebreakA)],
            ['Wins a set', pct(r5.setA), pct(1 - r5.setA)],
            ['Wins a best-of-three match', pct(r3.matchA), pct(1 - r3.matchA)],
            ['Wins a best-of-five match', pct(r5.matchA), pct(1 - r5.matchA)],
          ]}
        />
        <p>
          The final-set format matters too. In a best-of-three match between the same two players, A wins{' '}
          {finals.map((f) => `${pct(f.p)} with ${f.label.toLowerCase()}`).join(', ')}: the shorter the decider, the more
          room for the weaker server.
        </p>
      </ExplainerSection>

      <ExplainerSection id="edges" title="How an edge on serve compounds">
        <p>Player B fixed at 60% of points on serve; player A at 60% plus the edge shown:</p>
        <DataTable
          caption="Player A’s chances as the edge grows"
          columns={['A on serve', 'A holds', 'A wins a set', 'Best of three', 'Best of five']}
          rows={EDGES.map((edge) => {
            const pA = BASE + edge;
            const r = matchProbabilities({ pA, pB: BASE, bestOf: 5, finalSet: 'tiebreak' });
            const three = matchProbabilities({ pA, pB: BASE, bestOf: 3, finalSet: 'tiebreak' });
            return [`${formatFixed(pA * 100, 0)}%`, pct(holdProbability(pA)), pct(r.setA), pct(three.matchA), pct(r.matchA)];
          })}
        />
        <p>
          The calculator reproduces Newton and Keller’s equation (5) exactly and the match probabilities in their Tables 3
          and 4 to within 0.003, most of them to four decimal places.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="How to read it, and its limits">
        <BulletList
          items={[
            'Points are not truly independent. Pressure, momentum, fatigue and tactics all move a player’s chances during a match, which the model leaves out.',
            'A serving percentage depends on the opponent and the surface; a figure from one match-up does not carry over to another.',
            'It covers singles scoring with the formats listed. Short sets and other alternatives in the ITF’s Appendix V are not included.',
            'The results describe what the inputs imply. They are not a forecast of any match and not betting guidance.',
          ]}
        />
        <p>
          For what decides the points this model treats as identical, read{' '}
          <Link href="/blog/playing-the-big-points-in-tennis/" className="link-accent">
            playing the big points in tennis
          </Link>{' '}
          and{' '}
          <Link href="/blog/tennis-scoring-for-beginners/" className="link-accent">
            tennis scoring for beginners
          </Link>
          .
        </p>
      </ExplainerSection>
    </>
  );
}
