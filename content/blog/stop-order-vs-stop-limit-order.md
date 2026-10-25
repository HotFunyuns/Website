---
{
  "title": "Stop Orders vs Stop-Limit Orders: What Happens When the Price Gaps",
  "metaTitle": "Stop Order vs Stop-Limit Order: What Each Does",
  "description": "A stop order turns into a market order at the stop price; a stop-limit turns into a limit order. How each behaves in a fast or gapping market, with examples.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["investing-basics"],
  "tags": ["investing basics", "order types", "stop loss", "risk"],
  "primaryKeyword": "stop order vs stop limit order",
  "secondaryKeywords": [
    "what is a stop loss order",
    "stop limit order explained",
    "trailing stop order",
    "stop price vs limit price",
    "sell stop order example"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why did my stop loss sell below the stop price",
    "what happens to a stop limit order if the price gaps down",
    "how does a trailing stop work",
    "buy stop order when short selling"
  ],
  "aiSearchQuestions": [
    "What is the difference between a stop order and a stop-limit order?",
    "Why can a stop-loss order sell far below the stop price?",
    "What happens to a stop-limit order when the price gaps past the limit?",
    "How does a trailing stop order work?"
  ],
  "relatedApps": ["learn-to-trade-stocks"],
  "relatedArticles": [
    "market-order-vs-limit-order",
    "short-selling-explained",
    "market-circuit-breakers-explained",
    "what-is-volatility",
    "risk-tolerance-explained",
    "learn-to-trade-stocks-guide"
  ],
  "takeaways": [
    "A stop order, or stop-loss order, becomes a market order once the stop price is reached, so it will usually execute, but possibly well away from the stop price.",
    "A stop-limit order becomes a limit order once the stop price is reached, so it controls the price but may not execute at all.",
    "The stop price is a trigger, not a guaranteed price; in a fast market or a price gap the difference can be large.",
    "Brief intraday moves can trigger either order, and brokers differ on whether last-sale prices or quotes trigger stops.",
    "A trailing stop moves its stop price as the market moves in your favour and stays put when it moves against you."
  ],
  "disclaimer": "finance",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between a stop order and a stop-limit order?",
      "answer": "Both wait for a trigger, the stop price. When it is reached, a stop order becomes a market order and executes at the best available price, while a stop-limit order becomes a limit order and executes only at the limit price or better. One prioritises getting out; the other prioritises the price."
    },
    {
      "question": "Why did my stop-loss order sell below my stop price?",
      "answer": "Because the stop price is only a trigger. Once reached, the order becomes a market order and fills at whatever price is available. The SEC notes the execution price can deviate significantly from the stop price, depending on demand for the stock and the liquidity available."
    },
    {
      "question": "What happens to a stop-limit order if the price gaps down?",
      "answer": "If the price jumps past both the stop and the limit, the limit order is activated but may not fill, because no buyers are available at the limit or better. You could still hold the shares as the price keeps falling."
    },
    {
      "question": "How does a trailing stop work?",
      "answer": "Its stop price is set as a fixed amount or percentage away from the market price. As the price moves in your favour, the stop follows it; when the price moves against you, the stop stays where it is. In the SEC's example, a sell trailing stop $1 below the market follows a rising price to a $24 peak, leaving the stop at $23."
    }
  ],
  "sources": [
    {
      "title": "Stop, Stop-Limit, and Trailing Stop Orders – Investor Bulletin",
      "publisher": "Investor.gov, U.S. Securities and Exchange Commission",
      "url": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15",
      "accessed": "2026-10-24"
    },
    {
      "title": "Stop Order (glossary)",
      "publisher": "Investor.gov, U.S. Securities and Exchange Commission",
      "url": "https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order",
      "accessed": "2026-10-24"
    },
    {
      "title": "Understanding Order Types – Investor Bulletin",
      "publisher": "Investor.gov, U.S. Securities and Exchange Commission",
      "url": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14",
      "accessed": "2026-10-24"
    }
  ]
}
---

Stop orders are often called "protective" orders: an instruction to sell if a price falls to a certain level, set in advance so you do not have to watch the screen. They behave very differently when prices move fast or jump, and the two main versions, stop and stop-limit, fail in opposite ways. The SEC's investor bulletin on stop, stop-limit and trailing stop orders sets out exactly how.

## The stop order: a trigger plus a market order

A **stop order**, also called a stop-loss order, is an order to buy or sell once the price reaches a specified level, the **stop price**. When the stop price is reached, the stop order becomes a [market order](/blog/market-order-vs-limit-order/).

- A **sell stop** is placed below the current price. Investors generally use one to try to limit a loss or protect a profit on a stock they own.
- A **buy stop** is placed above the current price, generally to limit a loss or protect a profit on a stock that has been [sold short](/blog/short-selling-explained/).

The crucial sentence in the SEC bulletin: **the stop price is not the guaranteed execution price.** It is a trigger. Once triggered, the market order fills at whatever price is available, which can deviate significantly from the stop price.

## The stop-limit order: a trigger plus a limit order

A **stop-limit order** combines a stop with a [limit](/blog/market-order-vs-limit-order/). Once the stop price is reached, it becomes a limit order that can only execute at the limit price or better. The benefit, in the SEC's words, is control over the price at which the order can be executed. The cost is the usual limit-order risk: it may not execute if the price moves away.

The stop and limit prices need not match. The SEC's example is a sell stop-limit with a stop at $3.00 and a limit at $2.50: it activates when the price reaches $3.00 but can only sell at $2.50 or better.

## The same gap, two outcomes

Suppose you own a stock trading at $50 and set protection at $45. Overnight, bad news arrives and the stock opens at $40.

| Order | What happens at the open |
| --- | --- |
| Sell stop at $45 | Triggered (the price is below $45), becomes a market order, sells at about $40, well below the stop |
| Sell stop-limit, stop $45, limit $44 | Triggered, becomes a limit order to sell at $44 or better; with the price at $40 there may be no buyer at $44, so it may not sell at all |

Neither order gave the outcome its name suggests. The stop order got you out, at a much worse price. The stop-limit order protected the price, by not trading. If the stock keeps falling, the stop-limit holder still owns it. Which risk is worse depends on the situation, and it is worth deciding before relying on either.

## Other ways stops misfire

**Short-term swings.** The SEC warns that a brief intraday move can trigger a stop or stop-limit order and produce an execution substantially worse than the stock's closing price that day. A stock that dips sharply for a few minutes and recovers can leave a stop-loss holder sold out at the low. [Volatility](/blog/what-is-volatility/) makes this more likely.

**Different triggers.** Brokerage firms do not all agree on what "reaching the stop price" means. The SEC notes that some use only last-sale prices and others use quotes. Check which standard applies.

**Not every broker offers every type.** The bulletin says stop, stop-limit and trailing stop orders may not be available through all firms, and that firms' specific policies on them differ, so ask yours.

**Market-wide halts.** In extreme sell-offs, trading can pause under [market circuit breakers](/blog/market-circuit-breakers-explained/), and orders wait until it resumes.

## Trailing stops

A **trailing stop** sets the stop price as a fixed amount or percentage away from the market price rather than a fixed number. The SEC's example: a sell trailing stop $1 below the market. As the price rises, the stop follows it up, staying $1 below. When the stock peaks at $24 and turns down, the stop stays at $23, and the order triggers if the price falls to $23. A trailing stop can be either a stop or a stop-limit, with the same trade-offs as above.

## Deciding whether to use one

A stop is a plan written in advance: at this price, I want out. That has real value for discipline, and it is one input into thinking about [risk tolerance](/blog/risk-tolerance-explained/). But it is not insurance. It does not guarantee an exit price, and it can be triggered by noise. Setting the stop too close to the current price invites being stopped out by ordinary fluctuation; too far, and it limits little.

[Learn to Trade Stocks Beginner](/apps/learn-to-trade-stocks/) includes stop orders in its practice account, so you can watch one trigger with virtual money. A simulator cannot fully reproduce overnight gaps or thin markets, though. The app is listed with our [education apps](/apps/category/education-brain/), and the [investing basics hub](/blog/topics/investing-basics/) has the related order guides.
