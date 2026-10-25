---
{
  "title": "MACD Explained: Lines, Signal and Histogram From Their Moving Averages",
  "metaTitle": "MACD Explained: MACD Line, Signal Line and Histogram",
  "description": "MACD subtracts a 26-day EMA from a 12-day EMA and adds a signal line and histogram. How each part is built, how crossovers work and why they often whipsaw.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["investing-basics"],
  "tags": ["investing basics", "macd", "technical analysis", "momentum indicators"],
  "primaryKeyword": "macd indicator",
  "secondaryKeywords": [
    "macd line and signal line",
    "macd histogram explained",
    "macd 12 26 9",
    "macd crossover",
    "macd divergence"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how is macd calculated",
    "what does it mean when macd crosses zero",
    "why macd gives false signals",
    "difference between macd and rsi"
  ],
  "aiSearchQuestions": [
    "What is the MACD indicator?",
    "How are the MACD line, signal line and histogram calculated?",
    "What does a MACD crossover mean?",
    "How is MACD different from RSI?"
  ],
  "relatedApps": ["learn-to-trade-stocks"],
  "relatedArticles": [
    "moving-averages-explained",
    "rsi-indicator-explained",
    "support-and-resistance-explained",
    "technical-vs-fundamental-analysis",
    "how-to-read-candlestick-charts",
    "learn-to-trade-stocks-guide"
  ],
  "takeaways": [
    "MACD, developed by Gerald Appel in the late 1970s, is the 12-day exponential moving average of closing prices minus the 26-day EMA.",
    "The signal line is a 9-day EMA of the MACD line, and the histogram is MACD minus the signal line.",
    "Positive MACD means the shorter average is above the longer one; the further apart they move, the larger the value.",
    "Signal-line and zero-line crossovers are the most common readings, and both can produce whipsaws when no strong trend follows.",
    "Because MACD is built from moving averages, it inherits their lag and describes momentum that has already happened."
  ],
  "disclaimer": "finance",
  "featured": false,
  "faqs": [
    {
      "question": "What is the MACD indicator?",
      "answer": "Moving Average Convergence/Divergence: the difference between a faster and a slower exponential moving average of price, usually the 12-day minus the 26-day. ChartSchool describes it as turning two trend-following indicators into a momentum oscillator."
    },
    {
      "question": "How is the MACD histogram calculated?",
      "answer": "Subtract the signal line, a 9-day EMA of the MACD line, from the MACD line. The histogram is positive when MACD is above its signal line and negative when it is below, so it shows how far apart the two lines are."
    },
    {
      "question": "What does a MACD crossover mean?",
      "answer": "A signal-line crossover is when the MACD line crosses its 9-day signal line; a centerline crossover is when MACD crosses zero, meaning the 12-day EMA has crossed the 26-day EMA. Both describe a change in momentum that has already occurred, and both can reverse quickly."
    },
    {
      "question": "How is MACD different from RSI?",
      "answer": "RSI compares the average size of recent gains and losses and is bounded between 0 and 100. MACD measures the gap between two moving averages in price units and has no upper or lower limit. Both are built from past prices."
    }
  ],
  "sources": [
    {
      "title": "MACD (Moving Average Convergence/Divergence) Oscillator (ChartSchool)",
      "publisher": "StockCharts.com",
      "url": "https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/macd-moving-average-convergence-divergence-oscillator",
      "accessed": "2026-10-24"
    },
    {
      "title": "Moving Averages – Simple and Exponential (ChartSchool)",
      "publisher": "StockCharts.com",
      "url": "https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/moving-averages-simple-and-exponential",
      "accessed": "2026-10-24"
    },
    {
      "title": "Technical Analysis (ChartSchool)",
      "publisher": "StockCharts.com",
      "url": "https://chartschool.stockcharts.com/table-of-contents/overview/technical-analysis",
      "accessed": "2026-10-24"
    }
  ]
}
---

MACD usually appears under a price chart as two wavy lines and a bar graph. It looks complicated, but every part of it is built from one ingredient, the exponential moving average, in three simple steps, and knowing the construction makes it harder to read more into it than it contains.

StockCharts' ChartSchool credits the indicator to Gerald Appel in the late 1970s and describes what it does: it turns two trend-following indicators, moving averages, into a momentum oscillator by subtracting the longer moving average from the shorter one.

## The three parts

| Component | Calculation (standard 12, 26, 9 settings) | Shown as |
| --- | --- | --- |
| MACD line | 12-day EMA of closing prices − 26-day EMA | A line oscillating around zero |
| Signal line | 9-day EMA of the MACD line | A second, smoother line |
| Histogram | MACD line − signal line | Bars above or below zero |

ChartSchool notes that 12, 26 and 9 are the typical settings, though others can be used. If exponential moving averages are unfamiliar, [moving averages explained](/blog/moving-averages-explained/) works through the calculation; the important property here is that an EMA weights recent prices more heavily than older ones.

**A quick numerical example.** Suppose today the 12-day EMA of a stock is $52.40 and the 26-day EMA is $51.10. The MACD line is 52.40 − 51.10 = **1.30**. If the signal line, the 9-day EMA of recent MACD values, is 0.95, the histogram bar is 1.30 − 0.95 = **0.35**.

## Reading the MACD line

- **Positive MACD** means the 12-day EMA is above the 26-day EMA: recent prices have been higher than longer-run prices.
- **Negative MACD** means the reverse.
- **Rising MACD** means the gap between the averages is widening in the positive direction. ChartSchool describes increasing positive values as increasing upside momentum.

The names "convergence" and "divergence" refer to the two averages moving toward or away from each other.

Unlike the [RSI](/blog/rsi-indicator-explained/), MACD has no fixed upper or lower limit. Because it is the difference between two averages of price, its values are in price units, so a $500 stock produces larger MACD values than a $20 stock, and MACD values cannot be compared directly between them.

## What the histogram adds

The histogram is the gap between the MACD line and its signal line, drawn as bars. ChartSchool notes it is positive when MACD is above the signal line and negative when it is below. Because it measures the distance between two lines that are themselves built from moving averages, it reacts before a crossover happens:

| Histogram behaviour | What it describes |
| --- | --- |
| Positive and growing | MACD pulling away above its signal line |
| Positive but shrinking | MACD drifting back toward its signal line |
| Crossing zero | A signal-line crossover |
| Negative and growing | MACD pulling away below its signal line |

A shrinking histogram is sometimes read as momentum fading. It is still a description of recent prices; a shrinking histogram can turn around and grow again without any crossover at all.

## Crossovers

ChartSchool describes two kinds as the most common readings:

1. **Signal-line crossovers.** MACD crossing above its signal line is called bullish; crossing below, bearish.
2. **Centerline crossovers.** MACD crossing above zero means the 12-day EMA has moved above the 26-day EMA; below zero, the reverse.

The same source is candid about their reliability. In one example it counts eight signal-line crossovers in six months, "some good signals and some bad signals", including two bearish crossovers while the stock kept trending higher. In another, a stock produced seven centerline crossovers in five months that would have resulted in numerous whipsaws, because strong trends did not follow. It advises due diligence before relying on these common signals.

## Divergences

When price makes a new low but MACD makes a higher low, or price makes a new high while MACD makes a lower high, chart readers call it a divergence, a sign that momentum is not confirming the price move. As with RSI, divergences describe past momentum and can persist.

## The built-in lag

MACD is made of moving averages, and moving averages are made of past prices. Every MACD reading therefore describes momentum that has already happened. ChartSchool's overview of technical analysis notes the general criticism that signals can arrive late, after much of a move has already taken place, and that not all technical signals and patterns work.

That matches the framing in the listing for our simulator, [Learn to Trade Stocks Beginner](/apps/learn-to-trade-stocks/): technical indicators summarise price or volume information but cannot confirm a future outcome or remove uncertainty. Its lessons include momentum indicators, and its chart replay lets you test your reading of them on simulated price action with a virtual balance, so you can see how often crossovers whipsaw without real money at stake. It is one of our [education apps](/apps/category/education-brain/); the [investing basics hub](/blog/topics/investing-basics/) lists the other chart guides, including [support and resistance](/blog/support-and-resistance-explained/) and [technical versus fundamental analysis](/blog/technical-vs-fundamental-analysis/).
