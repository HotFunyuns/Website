---
{
  "title": "Time-in-Force: Day Orders vs Good-’Til-Canceled",
  "metaTitle": "Day Order vs Good-Til-Canceled: Time-in-Force Explained",
  "description": "How long an order stays open: day orders, good-til-canceled, IOC, fill-or-kill, all-or-none and on-open or on-close, plus what happens on dividends and splits.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["investing-basics"],
  "tags": ["investing basics", "order types", "time in force", "limit orders"],
  "primaryKeyword": "day order vs good til canceled",
  "secondaryKeywords": [
    "time in force",
    "good til canceled order",
    "immediate or cancel",
    "fill or kill vs all or none",
    "market on close order"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what happens to a day order at the end of the day",
    "how long does a gtc order last",
    "what happens to open orders on ex dividend date",
    "do day orders work in extended hours"
  ],
  "aiSearchQuestions": [
    "What is the difference between a day order and a good-til-canceled order?",
    "What is an immediate-or-cancel order?",
    "What is the difference between fill-or-kill and all-or-none?",
    "What happens to an open order when a stock pays a dividend or splits?"
  ],
  "relatedApps": ["learn-to-trade-stocks"],
  "relatedArticles": [
    "market-order-vs-limit-order",
    "stop-order-vs-stop-limit-order",
    "stock-market-hours-explained",
    "how-dividends-work",
    "stock-splits-explained",
    "learn-to-trade-stocks-guide"
  ],
  "takeaways": [
    "Time-in-force says how long an order stays open; it is set alongside the order type, such as market, limit or stop.",
    "Unless you choose otherwise, orders are day orders: unfilled, they generally cancel at the end of regular hours and do not carry into extended hours or the next day.",
    "Good-'til-canceled orders stay open until filled or cancelled, subject to time limits that vary by broker.",
    "IOC fills what it can at once and cancels the rest; fill-or-kill must fill completely at once or not at all; all-or-none must fill completely but can wait.",
    "FINRA Rule 5330 requires many open buy and sell-stop orders to be adjusted for cash dividends and splits, unless marked 'Do Not Reduce' or 'Do Not Increase'."
  ],
  "disclaimer": "finance",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between a day order and a GTC order?",
      "answer": "A day order is good only during the trading day it is entered; if not executed, it generally cancels at the end of regular trading hours. A good-'til-canceled order lasts until it is executed in full or cancelled, although brokers set their own limits on how long a GTC order can stay open."
    },
    {
      "question": "What is the difference between fill-or-kill and all-or-none?",
      "answer": "Both require the whole order to be filled. A fill-or-kill order must also be filled immediately, or it is cancelled. An all-or-none order that cannot be filled immediately stays active until it can be filled in full or is cancelled."
    },
    {
      "question": "Do day orders work in extended hours?",
      "answer": "Generally not. The SEC explains that unexecuted day orders cancel at the end of regular hours and do not carry over into the extended-hours session. FINRA notes that firms may accept only limit orders in extended hours and have their own policies on whether unexecuted extended-hours orders cancel or carry over."
    },
    {
      "question": "What happens to my open limit order when a stock pays a dividend?",
      "answer": "Under FINRA Rule 5330, a firm holding an open buy order or open sell stop order generally reduces its price by the cash dividend on the ex-dividend date, unless the order is marked 'Do Not Reduce'. Orders governed by exchange rules are excluded, so check your broker's practice."
    }
  ],
  "sources": [
    {
      "title": "Understanding Order Types – Investor Bulletin",
      "publisher": "Investor.gov, U.S. Securities and Exchange Commission",
      "url": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14",
      "accessed": "2026-10-24"
    },
    {
      "title": "Extended-Hours Trading: Know the Risks",
      "publisher": "FINRA",
      "url": "https://www.finra.org/investors/insights/extended-hours-trading",
      "accessed": "2026-10-24"
    },
    {
      "title": "Rule 5330. Adjustment of Orders",
      "publisher": "FINRA",
      "url": "https://www.finra.org/rules-guidance/rulebooks/finra-rules/5330",
      "accessed": "2026-10-24"
    }
  ]
}
---

Every order to buy or sell a stock carries two instructions. The **order type**, such as market, limit or stop, says at what price it may execute. The **time-in-force** says how long it stays alive while it waits. The SEC's investor bulletin on order types lists the common timing instructions, and choosing the wrong one is a quiet source of surprises: orders that vanish at the close, or old orders that fill weeks later when you have forgotten them.

## Day orders: the default

The SEC explains that unless you specify a time frame, orders are **day orders**: good only during the trading day they are entered. A day order that has not executed generally cancels at the end of regular trading hours, and it does **not** carry over to the extended-hours session or to the next trading day.

So a buy limit order at $48 on a $50 stock, entered at 10 a.m., either fills during that day's regular session or disappears at the 4 p.m. close. To try again tomorrow, you place it again.

## Good-'til-canceled orders

A **good-'til-canceled (GTC)** order lasts until it is executed in full or cancelled. The SEC notes two broker-specific details: some firms let you set an automatic cancellation date and time, and the maximum time a GTC order can stay open varies by firm, so ask yours.

GTC orders are convenient for patient limit prices, but they keep working when you are not watching. Suppose you place a GTC buy limit at $45 on a $50 stock, then forget it. Weeks later the company reports bad news and the stock opens at $40. A buy limit fills at the limit price or better, so the order can execute at around $40: a "good" price, bought straight into news you had not seen. Reviewing open GTC orders regularly, and especially before earnings, reduces the chance of that. [Market versus limit orders](/blog/market-order-vs-limit-order/) explains how limit prices work.

## Immediate and all-or-nothing instructions

Three instructions control partial fills. The SEC defines them as:

| Instruction | Must fill immediately? | Must fill completely? | If it cannot |
| --- | --- | --- | --- |
| Immediate-or-cancel (IOC) | Yes | No | Unfilled part is cancelled at once |
| Fill-or-kill (FOK) | Yes | Yes | Whole order is cancelled |
| All-or-none (AON) | No | Yes | Stays active until it can fill in full, or is cancelled |

Worked example: you want 500 shares and only 300 are available at your price right now.

- **IOC:** 300 shares fill; the other 200 are cancelled.
- **FOK:** nothing fills; the whole order is cancelled.
- **AON:** nothing fills yet; the order waits for a moment when all 500 can fill together.

## At the open and at the close

The SEC also describes two session-timed instructions:

- **On open:** a market or limit order that must execute when the market opens or re-opens; any part not executed in the opening trade is cancelled.
- **On close:** a market or limit order that must execute at the closing price; any part not executed in the closing trade is cancelled.

"Re-opens" matters after a trading halt; [market circuit breakers](/blog/market-circuit-breakers-explained/) explains when halts happen.

## Extended hours have their own rules

Day orders do not reach the extended-hours sessions. FINRA describes pre-market trading as typically 7 to 9:30 a.m. ET, after-hours trading as 4 to 8 p.m. ET, and some overnight trading from 8 p.m. to 4 a.m. ET for certain stocks. It notes that firms may accept **only limit orders** in extended hours, and may have different policies on whether unexecuted extended-hours orders are cancelled or carried over to the regular session. [Stock market hours](/blog/stock-market-hours-explained/) covers the sessions themselves.

## Open orders, dividends and splits

Long-lived orders meet corporate events. FINRA Rule 5330 requires a firm holding an **open order**, defined as an order to buy or an open stop order to sell, including GTC, limit and stop-limit orders, to adjust it on the day the stock goes ex-dividend or ex-distribution:

- **Cash dividends:** unless marked "Do Not Reduce", the order price is reduced by the dividend, then rounded down to the next lower price increment. A GTC buy limit at $50.00 becomes $49.60 when a $0.40 dividend goes ex. Dividends below one cent are ignored.
- **Stock splits:** the price is reduced and, unless marked "Do Not Increase", the share quantity is raised by the split ratio. A 2-for-1 split turns a buy limit for 100 shares at $50 into 200 shares at $25.
- **Reverse splits:** pending orders are cancelled.

The rule excludes orders governed by the rules of a national securities exchange, open stop orders to buy and open sell orders, so practice varies; check how your broker handles open orders around [dividends](/blog/how-dividends-work/) and [stock splits](/blog/stock-splits-explained/).

## Choosing a time-in-force

- Trading during the day and watching the screen: a **day order** expires with the session.
- Waiting for a price that may take weeks: a **GTC limit**, reviewed regularly.
- Wanting no partial fill: **FOK** for now-or-never, **AON** if you can wait.
- Protective orders: see [stop versus stop-limit orders](/blog/stop-order-vs-stop-limit-order/) for why a stop's fill price is not guaranteed.

The store screenshots for [Learn to Trade Stocks Beginner](/apps/learn-to-trade-stocks/), one of our [education apps](/apps/category/education-brain/), show market, limit and stop orders placed with a virtual balance, a low-stakes way to practise before real orders. The [investing basics hub](/blog/topics/investing-basics/) lists the related guides.
