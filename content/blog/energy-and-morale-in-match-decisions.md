---
{
  "title": "Energy and Morale: Why the Same Pass Works at Minute 20 and Fails at Minute 80",
  "metaTitle": "Stamina and Morale in Football Career Mode",
  "description": "A match decision in a career sim is weighted by six things, not one. What energy and morale actually change, and how to read a failed action correctly.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "soccer",
    "career sim",
    "stamina",
    "morale",
    "match engine"
  ],
  "primaryKeyword": "stamina and morale in football career mode",
  "secondaryKeywords": [
    "energy in soccer career sim",
    "why do my actions fail late in matches",
    "match situation weighting career mode",
    "football sim fatigue model",
    "morale effect football game"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does the same action succeed early and fail late",
    "does stamina matter in a soccer career sim",
    "what is the difference between energy and morale in a career game",
    "do footballers really run less in the second half"
  ],
  "aiSearchQuestions": [
    "What weights the outcome of a match moment in a career sim?",
    "Do real footballers run less late in a match?",
    "Is late-match decline caused by fatigue or by pacing?",
    "How are energy and morale different in a football career game?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "soccer-career-sim-xi"
  ],
  "relatedArticles": [
    "injuries-in-sports-career-games",
    "understanding-sports-sim-probability",
    "press-conferences-in-career-mode"
  ],
  "takeaways": [
    "Football Career Soccer XI Sim states that attributes, position, energy, morale, the match situation and the difficulty setting all weigh on a match moment — so a failed action has six candidate explanations, not one.",
    "Late-match decline is documented in real football. One review reports that roughly 40 per cent of players in a top-level game show reduced high-intensity running in the final fifteen minutes.",
    "Fatigue is also temporary and local: the same review notes a 12 per cent drop in high-intensity running in the five minutes following the most intense period of a match.",
    "The cause is contested. A 2022 analysis of 244 players found total distance down about 14 per cent and high-intensity running down about 15 per cent late on, but argued the pattern fits pacing strategy better than fatigue.",
    "Energy and morale are separate axes. Energy limits what your body can still attempt; morale shifts how the same attempt is weighted. Treating a morale problem as a fitness problem wastes a season."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why does the same action work early and fail late?",
      "answer": "Because it is not the same action. In Football Career Soccer XI Sim the result of a match moment is weighted by your attributes, your position, energy, morale, the match situation and the difficulty setting. At minute 80 the energy term has moved, the match situation has almost certainly changed, and morale may have shifted too. The decision looks identical on screen and is not identical underneath."
    },
    {
      "question": "Do real footballers actually run less in the second half?",
      "answer": "Yes, consistently. Published work reports the capacity for intense effort being markedly reduced towards the end of a match, with around 40 per cent of players in a top-level game showing reduced high-intensity running in the final fifteen minutes. A separate analysis of 244 players found total distance down roughly 14 per cent and high-intensity running down roughly 15 per cent comparing late periods with early ones."
    },
    {
      "question": "Is late-match decline fatigue or pacing?",
      "answer": "Researchers disagree, and the disagreement is instructive. Metabolic work points to muscle glycogen depletion in individual fibres as a determinant of the point of fatigue. A 2022 match-analysis study argued that because players did not reduce output in the very latest stages of each half, pacing strategy explains the pattern better than fatigue alone. Both mechanisms are likely present."
    },
    {
      "question": "How is morale different from energy?",
      "answer": "Energy is a capacity constraint — it limits what you can still attempt and how well. Morale is a weighting on attempts you are still perfectly capable of making. A tired player at high morale and a fresh player at low morale are different problems, and they respond to different interventions: rest and rotation for one, performances and role for the other."
    }
  ],
  "sources": [
    {
      "title": "Metabolic Limitations of Performance and Fatigue in Football",
      "publisher": "Asian Journal of Sports Medicine (Alghannam, 2012)",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3426724/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Decline in Running Performance in Highest-Level Soccer: Analysis of the UEFA Champions League Matches",
      "publisher": "Biology (Basel) (Modric et al., 2022)",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9598698/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Laws of the Game — Documents",
      "publisher": "The International Football Association Board (The IFAB)",
      "url": "https://www.theifab.com/laws-of-the-game-documents/",
      "accessed": "2026-09-21"
    }
  ]
}
---

You play the same through-ball twice. In the twentieth minute it splits the defence. In the eightieth it is intercepted, and the obvious conclusion is that the game cheated.

It did not. The two passes were different passes, and the difference is documented rather than hidden.

## Six things weight a match moment

[Football Career Soccer XI Sim](/apps/soccer-career-sim-xi/) — our own app — is explicit about what goes into resolving an interactive match moment. Its description of how a match plays says that your attributes, your position, energy, morale, the match situation and the difficulty setting all weigh on the outcome, and the feature summary repeats the core of it: attributes, energy, morale and the match situation weighting the result.

That is six inputs. A player who reads a failed action as "bad luck" is collapsing all six into one, and then has no way to improve.

The first thing to do with a failure, therefore, is to ask which term moved. Attributes and difficulty are stable within a match. Position is stable. That leaves energy, morale and the match situation — and by the eightieth minute, all three of them have almost certainly changed.

## Energy: the part real football measures

Fatigue in football is not folklore. It has been measured repeatedly, and the numbers are large enough to justify a game modelling them.

A review in the *Asian Journal of Sports Medicine* summarising the metabolic limits on football performance reports that the capacity to perform intense efforts is markedly reduced towards the end of a game, with roughly 40 per cent of players in a top-level match showing reduced high-intensity running in the final fifteen minutes. It also describes a shorter-term effect that matters just as much for a decision engine: in the five-minute period following the most intense passage of a game, high-intensity running showed about a 12 per cent reduction.

On mechanism, the same review points to muscle glycogen. Histochemical analysis found roughly half of individual muscle fibres glycogen-depleted, particularly fast-twitch fibres, and the depletion of those fibres was shown to determine the point of fatigue in both simulated and real match conditions. Fluid loss is substantial too — over two litres in a typical match, and four to five in hot conditions — though the review is careful to say the evidence tying fluid loss directly to end-game fatigue remains inconclusive.

Two things follow for a career-mode player. Fatigue is not only a late-match phenomenon; it also arrives temporarily after your own most intense passage. And the actions it hits hardest are the explosive ones, because those are the ones drawing on the fibres that empty first.

## The complication: pacing, not only fatigue

Here is where an honest article has to introduce a disagreement, because the research does not speak with one voice.

A 2022 analysis in *Biology* examined 244 players across twenty matches in a top European club competition, dividing play into fifteen-minute blocks. It found total distance down around 14 per cent and high-intensity running down around 15 per cent when comparing the final periods with the initial ones — decline of the size you would expect.

But the authors argued the pattern does not fit fatigue cleanly. Players did not reduce their running in the very latest stages of each half, which is not what a progressive fatigue model predicts. Their conclusion was that pacing strategy explains the shape better: players are managing their output across a match they know the length of, rather than simply running out.

Both readings are probably partly right, and for a player of a career sim the takeaway is the same either way. Output late in a match is systematically different from output early in it, whether the cause is depletion or deliberate management, and a simulator that flattens the game into a single probability per action would be modelling football worse.

## Morale is a different axis entirely

The frequent mistake is to treat morale as a second stamina bar. It is not, and conflating them produces the wrong response.

Energy is a capacity constraint. It describes what your body can still do. It is replenished by rest, rotation and the gap between fixtures, and it declines within a match in a broadly predictable way.

Morale is a weighting on things you remain perfectly capable of doing. It is fed by the career state around the match — form, role, relationships, and the wider off-pitch layer that includes the [media and reputation systems](/blog/press-conferences-in-career-mode/). It does not recover with a night's sleep.

The diagnostic question is simple. If your actions are failing at the end of matches but succeeding at the start, that is an energy signature. If they are failing consistently across the whole match regardless of minute, energy is not the variable, and the answer is somewhere in form, role or relationships.

## "The same pass" was never the same pass

The sixth input — match situation — is the one players discount most, and it can be the largest of all.

The Laws of the Game, maintained and published by The IFAB, set the basic frame: two halves of forty-five minutes plus whatever additional time the referee allows. Nothing in the Laws changes between minute 20 and minute 80. Everything about the football does.

At minute 20 the score is often level, the opposition shape is intact and disciplined, and nobody has committed to anything. At minute 80 someone is chasing the game, lines have stretched, a defender is on a booking, and the space your pass is aimed at either exists in a way it did not before or has been closed deliberately. The receiver's position is different. The pressure on the ball is different.

A career sim that includes match situation as an explicit input is telling you that it is reading the state of the game, not just your attributes. The same nominal decision at two different game states is two different bets.

## Reading a failure correctly

This is where the practical value sits, because misreading failures is what stalls careers.

**Failed late, succeeded early.** Energy. The response is stamina development and honest management of when you attempt high-cost actions.

**Failed consistently all match.** Attributes or morale. Check whether the action you keep choosing is one your build actually supports — finishing, passing, dribbling, pace, strength, defending, vision, stamina and goalkeeping are the attributes on offer, and an action drawing on a weak one will fail at any minute.

**Failed in a specific game state.** Match situation. You are choosing an aggressive option in a state that punishes it, and the fix is decision selection rather than development.

**Failed once, spectacularly.** Variance. Probabilistic systems produce unlikely outcomes at exactly the rate their probabilities specify, and [understanding how a sports simulation converts ratings into results](/blog/understanding-sports-sim-probability/) is the antidote to reading a single event as a verdict.

Injuries sit slightly outside this list because they are discrete events rather than continuous weightings, and [managing them across a career](/blog/injuries-in-sports-career-games/) is a separate discipline — but they interact with energy in the obvious way, and a fatigued player attempting a high-cost action is the standard setup.

## Playing with the model rather than against it

Three habits follow from all of this.

Spend attribute points on stamina earlier than feels satisfying. It does not make any single action better; it keeps the rest of your attributes operating for longer, and the last fifteen minutes is where matches are decided.

Match your ambition to the minute. The risky ball is a good decision when energy is high and the game state rewards it, and a poor one when both have turned against you. Choosing it anyway because it worked an hour ago is the most common avoidable error in the format.

And separate your diagnoses. Every club, competition and player here is fictional and the results are model outputs, but the model has six distinct inputs and responds to being addressed at the right one. For how the other sports handle fatigue, form and decision weighting, the [sports career and GM library](/blog/category/sports-gm/) covers the equivalent systems elsewhere.
