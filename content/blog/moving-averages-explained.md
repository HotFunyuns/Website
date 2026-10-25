---
{
  "title": "Moving Averages Explained: Simple vs Exponential, and Their Built-In Lag",
  "metaTitle": "Moving Averages: Simple vs Exponential, Explained",
  "description": "How simple and exponential moving averages are calculated, worked step by step, why every moving average lags, and what crossovers do and do not mean.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["investing-basics"],
  "tags": ["investing basics", "moving averages", "technical analysis", "indicators"],
  "primaryKeyword": "moving average stocks",
  "secondaryKeywords": [
    "simple moving average",
    "exponential moving average",
    "sma vs ema",
    "50 day moving average",
    "moving average crossover"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to calculate a moving average",
    "why moving averages lag",
    "ema multiplier formula",
    "what is a golden cross"
  ],
  "aiSearchQuestions": [
    "What is a moving average in stock charts?",
    "What is the difference between a simple and an exponential moving average?",
    "Why do moving averages lag behind prices?",
    "Do moving average crossovers predict price moves?"
  ],
  "relatedApps": ["learn-to-trade-stocks"],
  "relatedArticles": [
    "macd-explained",
    "how-to-read-candlestick-charts",
    "rsi-indicator-explained",
    "support-and-resistance-explained",
    "sequences-and-summation-notation",
    "learn-to-trade-stocks-guide"
  ],
  "takeaways": [
    "A moving average is the average of the last N prices, recalculated each period so that it moves along the chart.",
    "A simple moving average weights each price equally; an exponential moving average gives more weight to recent prices, using a multiplier of 2 ÷ (N + 1).",
    "Every moving average lags, because it is built from past prices; longer averages lag more.",
    "A moving average describes the current trend direction; it does not predict where prices go next.",
    "Crossovers between averages are lagging signals and often give false alarms in sideways markets."
  ],
  "disclaimer": "finance",
  "featured": false,
  "faqs": [
    {
      "question": "What is a moving average?",
      "answer": "The average price over a fixed number of recent periods, recalculated each period. A 20-day moving average is the average of the last 20 closing prices; tomorrow, the oldest price drops out and the newest comes in, so the average moves."
    },
    {
      "question": "What is the difference between SMA and EMA?",
      "answer": "A simple moving average (SMA) weights every price in the window equally. An exponential moving average (EMA) gives more weight to recent prices, so it reacts faster and lags less, at the cost of being more sensitive to short-term swings."
    },
    {
      "question": "Why do moving averages lag?",
      "answer": "Because they average past prices. When the price turns, the average keeps including older prices from before the turn, so it changes direction later. ChartSchool notes that the longer the average, the greater the lag."
    },
    {
      "question": "What is a golden cross?",
      "answer": "A common name for a shorter moving average, often the 50-day, crossing above a longer one, often the 200-day. Because both averages lag, the cross happens after a rise is already under way, and in choppy markets crossovers frequently reverse."
    }
  ],
  "sources": [
    {
      "title": "Moving Averages – Simple and Exponential (ChartSchool)",
      "publisher": "StockCharts.com",
      "url": "https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/moving-averages-simple-and-exponential",
      "accessed": "2026-10-24"
    },
    {
      "title": "Learn to Trade Stocks Beginner (store listing)",
      "publisher": "Google Play",
      "url": "https://play.google.com/store/apps/details?id=com.reigncreative.stocktradingsim",
      "accessed": "2026-10-24"
    }
  ]
}
---

A price chart is noisy: prices jump up and down from one day to the next. A moving average smooths that noise into a line that shows the general direction. It is also the building block for other indicators such as MACD. StockCharts' ChartSchool states its limits plainly: a moving average doesn't predict price direction; it defines the current direction, and it lags because it is based on past prices.

## The simple moving average (SMA)

An N-period simple moving average is the sum of the last N closing prices divided by N. Each period, the oldest price drops out and the newest is added, so the average "moves".

**A worked 5-day SMA.** Closing prices over seven days: 11, 12, 13, 14, 15, 16, 17.

| Day | Window | Average |
| --- | --- | --- |
| 5 | 11, 12, 13, 14, 15 | 65 ÷ 5 = 13 |
| 6 | 12, 13, 14, 15, 16 | 70 ÷ 5 = 14 |
| 7 | 13, 14, 15, 16, 17 | 75 ÷ 5 = 15 |

This is the example ChartSchool uses: prices rise from 11 to 17, and the average rises from 13 to 15. Notice that on day 7 the price is 17 but the average is only 15. That gap is the lag.

## The exponential moving average (EMA)

An EMA reduces lag by weighting recent prices more heavily. It is calculated recursively:

**EMA today = (price − EMA yesterday) × multiplier + EMA yesterday,**

with **multiplier = 2 ÷ (N + 1)**. For a 10-day EMA, ChartSchool shows the multiplier as 2 ÷ 11 ≈ 0.1818, so the latest price carries about 18% of the weight. ChartSchool seeds the first EMA value with an SMA.

**A short example.** A 3-day EMA has multiplier 2 ÷ 4 = 0.5. Seed it with the 3-day SMA of 11, 12 and 13, which is 12. The next price is 14: EMA = (14 − 12) × 0.5 + 12 = 13. The next is 15: EMA = (15 − 13) × 0.5 + 13 = 14. Because each value builds on the previous EMA, ChartSchool notes you need far more data than N periods for an accurate figure.

## Lag: the built-in limitation

ChartSchool's analogy is useful. A 10-day moving average hugs prices and turns soon after they turn, like a speedboat. A 100-day average contains so much past data that it turns slowly, like an ocean tanker. The trade-off:

| | Shorter average (e.g. 10-day) | Longer average (e.g. 100- or 200-day) |
| --- | --- | --- |
| Reacts to turns | Quickly | Slowly |
| Lag | Less | More |
| Noise | More false turns | Fewer false turns |

An EMA lags less than an SMA of the same length, because it weights recent data more. No choice of length or type removes the lag entirely, because the input is always the past.

## How chart readers use them

ChartSchool lists the common uses: identifying the direction of a trend, defining possible [support and resistance](/blog/support-and-resistance-explained/) levels, and building other indicators such as [MACD](/blog/macd-explained/).

- **Direction.** A rising average describes a rising trend over that window; a falling one, a falling trend.
- **Popular lengths.** ChartSchool notes that the 200-day moving average is perhaps the most popular, that the 50-day is popular for the medium-term trend, and that many chartists use the two together.
- **Price versus average.** A price above its 200-day average has, by definition, been higher recently than over the past 200 days on average. That is a description, not a forecast.
- **Crossovers.** A short average crossing a long one is often called a "golden cross" (upward) or a "death cross" (downward). Because both lines lag, a crossover confirms a move that has already happened. In sideways markets, averages cross back and forth, producing signals that reverse.

## What not to conclude

A moving average does not tell you that a trend will continue, and a price touching an average does not mean it will bounce. The listing for our simulator, [Learn to Trade Stocks Beginner](/apps/learn-to-trade-stocks/), frames all indicators this way: they summarise price or volume information but cannot confirm a future outcome or remove uncertainty. Pairing an average with another view, such as the [RSI](/blog/rsi-indicator-explained/), does not change that.

The app includes lessons on moving averages and a chart replay mode for practising with simulated prices and a virtual balance. It is one of our [education apps](/apps/category/education-brain/), and the [investing basics hub](/blog/topics/investing-basics/) lists the other chart guides, including [how to read candlestick charts](/blog/how-to-read-candlestick-charts/). The arithmetic of sums behind every average is in [summation notation](/blog/sequences-and-summation-notation/).
