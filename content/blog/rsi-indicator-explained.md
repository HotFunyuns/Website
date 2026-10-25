---
{
  "title": "The RSI Indicator: How It Is Calculated and Why \"Overbought\" Is Not a Forecast",
  "metaTitle": "RSI Indicator Explained: Calculation and Limits",
  "description": "The Relative Strength Index compares recent gains with recent losses on a 0–100 scale. How Wilder's RSI is calculated and why overbought is not a sell signal.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["investing-basics"],
  "tags": ["investing basics", "rsi", "technical analysis", "momentum indicators"],
  "primaryKeyword": "rsi indicator",
  "secondaryKeywords": [
    "relative strength index",
    "rsi overbought oversold",
    "how is rsi calculated",
    "14 day rsi",
    "rsi divergence"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what does rsi above 70 mean",
    "why rsi stays overbought in an uptrend",
    "rsi average gain average loss formula",
    "rsi settings for beginners"
  ],
  "aiSearchQuestions": [
    "What is the RSI indicator?",
    "How is the Relative Strength Index calculated?",
    "Does an RSI above 70 mean a stock will fall?",
    "What is an RSI divergence?"
  ],
  "relatedApps": ["learn-to-trade-stocks"],
  "relatedArticles": [
    "moving-averages-explained",
    "macd-explained",
    "how-to-read-candlestick-charts",
    "technical-vs-fundamental-analysis",
    "what-is-volatility",
    "learn-to-trade-stocks-guide"
  ],
  "takeaways": [
    "The RSI, developed by J. Welles Wilder and published in 1978, measures the size of recent gains against recent losses on a scale from 0 to 100.",
    "RS is the average gain divided by the average loss over a look-back period, 14 by default, and RSI = 100 − 100 ÷ (1 + RS).",
    "Readings above 70 are conventionally called overbought and below 30 oversold.",
    "In a strong trend the RSI can stay overbought or oversold for a long time, so those labels describe momentum, not a coming reversal.",
    "Like every indicator, RSI summarises past prices and cannot confirm what happens next."
  ],
  "disclaimer": "finance",
  "featured": false,
  "faqs": [
    {
      "question": "What is the RSI indicator?",
      "answer": "A momentum oscillator, developed by J. Welles Wilder, that compares the average size of recent price gains with the average size of recent losses and expresses the result on a scale of 0 to 100. Higher values mean recent gains have outweighed losses."
    },
    {
      "question": "How is RSI calculated?",
      "answer": "Over the look-back period, usually 14, compute the average gain and the average loss, with losses expressed as positive numbers. Divide them to get RS, then RSI = 100 − 100 ÷ (1 + RS). Later values smooth the averages: the prior average times 13, plus the latest value, divided by 14."
    },
    {
      "question": "Does an RSI above 70 mean the stock will fall?",
      "answer": "No. ChartSchool notes momentum oscillators can become overbought and remain so in a strong uptrend, and gives examples of stocks that kept rising after overbought readings. The reading says recent gains have been large, not that they are about to reverse."
    },
    {
      "question": "What is an RSI divergence?",
      "answer": "When price and RSI move in different directions, for example the price making a higher high while RSI makes a lower high. Wilder viewed divergences as signs of potential reversal, but they too can persist or fail."
    }
  ],
  "sources": [
    {
      "title": "Relative Strength Index (RSI) (ChartSchool)",
      "publisher": "StockCharts.com",
      "url": "https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi",
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

The Relative Strength Index, or RSI, is what ChartSchool calls a popular momentum indicator. It condenses recent price movement into a single number between 0 and 100, and readings above 70 and below 30 are labelled "overbought" and "oversold". Those labels sound like predictions. They are not, and the indicator's own reference material shows why.

## Where it comes from

StockCharts' ChartSchool describes the RSI as a momentum oscillator developed by J. Welles Wilder, which measures the speed and change of price movements and oscillates between zero and 100. Wilder presented it in his 1978 book *New Concepts in Technical Trading Systems*, alongside other indicators such as the Average True Range.

"Relative strength" here means the strength of a stock's recent gains relative to its recent losses, not its strength relative to the market, which is a different measure with a similar name.

## The calculation

ChartSchool sets out three components: **average gain**, **average loss** and **RS**.

1. Choose a look-back period. Wilder's default is **14** periods.
2. For each period, record the gain (if the close rose) or the loss (if it fell). Losses are expressed as positive numbers.
3. **First values:** average gain = sum of gains ÷ 14; average loss = sum of losses ÷ 14.
4. **Later values are smoothed:** new average = (previous average × 13 + current gain or loss) ÷ 14.
5. **RS** = average gain ÷ average loss.
6. **RSI** = 100 − 100 ÷ (1 + RS).

**A quick check of the formula.** If the average gain is 1.2 and the average loss is 0.6, RS = 2 and RSI = 100 − 100 ÷ 3 ≈ 66.7. If gains and losses are equal, RS = 1 and RSI = 50. ChartSchool notes the extremes: RSI is 0 when there were no gains in the period, and 100 when there were no losses.

Because of the smoothing, RSI values depend on how much history is used; ChartSchool says it uses at least 250 data points before a chart's start, so different software can show slightly different values.

## Overbought and oversold

Wilder considered RSI overbought above 70 and oversold below 30. ChartSchool adds that the thresholds can be adjusted, for example to 80 and 20, and that a shorter look-back makes extreme readings more frequent: a 10-day RSI reaches the extremes more often than a 20-day one, and a volatile stock more often than a steady one. [Volatility explained](/blog/what-is-volatility/) covers why some stocks swing more than others.

## Why "overbought" is not a forecast

ChartSchool's own worked example makes the point. A stock became overbought in mid-September, did not decline, stalled for a couple of weeks and then continued higher, producing three more overbought readings before it finally peaked. The general lesson it draws: **momentum oscillators can become overbought, or oversold, and remain so in a strong trend.** Overbought and oversold readings, it notes, tend to work best when prices are moving sideways within a range, which you only know for certain afterwards.

So an RSI of 75 says one thing: over the look-back period, gains have been much larger than losses. It does not say they are about to stop.

## Settings change the picture

Because the RSI depends on its look-back period, two charts of the same stock can disagree. ChartSchool notes that short-term traders sometimes use a 2-period RSI with 80 and 20 as thresholds, while the default 14-period version with 70 and 30 is less sensitive, since ChartSchool notes a longer look-back decreases sensitivity. Neither setting is correct in general; each is a different summary of the same prices. If you compare RSI readings across stocks or across sources, check that the period and thresholds match, and remember that a reading which crosses a line because you changed the setting tells you nothing new about the stock.

## Divergences

ChartSchool describes Wilder's view that divergences signal potential reversals, because momentum is not confirming price:

- **Bearish divergence:** price makes a higher high while RSI makes a lower high.
- **Bullish divergence:** price makes a lower low while RSI makes a higher low.

These are interpretations of past data, not guarantees; a divergence can persist through further moves in the same direction.

## Putting RSI in its place

RSI is one summary of price momentum. It ignores everything about the underlying business, which is the domain of fundamental analysis; [technical versus fundamental analysis](/blog/technical-vs-fundamental-analysis/) compares the two approaches. It also works from the same past prices as other indicators, so combining it with [moving averages](/blog/moving-averages-explained/) or [MACD](/blog/macd-explained/) adds less independent information than it might seem.

The listing for our simulator, [Learn to Trade Stocks Beginner](/apps/learn-to-trade-stocks/), describes the right attitude: technical indicators summarise price or volume information but cannot confirm a future outcome or remove uncertainty. Its lessons include momentum indicators, and its chart replay lets you test your reading of them on simulated price action with a virtual balance. It is one of our [education apps](/apps/category/education-brain/); the [investing basics hub](/blog/topics/investing-basics/) has the other chart guides.
