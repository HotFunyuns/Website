---
{
  "title": "Line Art and Flats: The Two Stages That Decide Everything",
  "metaTitle": "What Are Flats in Digital Colouring?",
  "description": "What flats are, why professionals separate them from shading, and how the flats stage prevents almost every colouring problem that shows up later.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "Reign Creative Team",
  "category": "anime-creative",
  "tags": [
    "colouring",
    "workflow",
    "flats",
    "line art"
  ],
  "primaryKeyword": "what are flats in coloring",
  "secondaryKeywords": [
    "line art colouring workflow",
    "flatting comics",
    "base colours illustration",
    "colouring order of operations",
    "digital colouring stages"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what does flatting mean in comics",
    "why do you do flats before shading",
    "how do you fix gaps in line art",
    "what order should you colour in"
  ],
  "aiSearchQuestions": [
    "What are flats in digital colouring?",
    "Why do colourists do flats before shading?",
    "How do you fix gaps in line art before filling?",
    "What order should you colour an illustration in?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "anime-coloring-book"
  ],
  "relatedArticles": [
    "digital-coloring-techniques",
    "color-palettes-for-anime-art",
    "anime-coloring-app-guide",
    "anime-art-styles-explained"
  ],
  "takeaways": [
    "Flats are the base colours laid down before any shading — one solid colour per region, no gradients, no light source.",
    "Separating flats from shading exists because the flats stage answers a different question: does this colour scheme work at all?",
    "A gap in the line art is the most common reason a fill escapes into the wrong region, and closing it takes seconds.",
    "Judging a palette at the flats stage is cheap; judging it after shading is expensive, which is why the order matters.",
    "Most colouring problems that appear during shading were actually decided during flats."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What are flats?",
      "answer": "The base colours of an illustration, laid down as solid regions before any shading. One colour per area, no gradients, no light source implied. It is the stage where the colour scheme is decided."
    },
    {
      "question": "Why separate flats from shading?",
      "answer": "Because they answer different questions. Flats answer 'does this colour scheme work?' Shading answers 'where is the light coming from?' Trying to answer both at once means discovering a scheme problem after doing hours of rendering."
    },
    {
      "question": "Why does my fill escape into other areas?",
      "answer": "Almost always a gap in the line art. A fill spreads until it meets a closed boundary, so a single missing pixel lets it flood the whole image. Closing the gap takes seconds; undoing the flood does not."
    },
    {
      "question": "What order should I work in?",
      "answer": "Line art, then flats, then shading, then highlights and effects. Each stage assumes the previous one is settled, which is what makes the sequence worth following."
    },
    {
      "question": "How do I know if my flats are working?",
      "answer": "Look at them without shading. If the flats read as a coherent image — regions distinguishable, focus in the right place — shading will improve them. If they do not, shading will not rescue them."
    }
  ],
  "sources": [
    {
      "title": "CSS Color Module Level 4",
      "publisher": "World Wide Web Consortium (W3C)",
      "url": "https://www.w3.org/TR/css-color-4/",
      "accessed": "2026-09-03"
    },
    {
      "title": "Color Blindness",
      "publisher": "National Eye Institute, U.S. National Institutes of Health",
      "url": "https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness",
      "accessed": "2026-09-03"
    }
  ]
}
---

**Flats are the base colours of an illustration, laid down as solid regions before any shading.** One colour per area. No gradients, no highlights, no implied light source.

It is the least glamorous stage of colouring and the one that decides whether the finished piece works.

## Why the stages are separated

Flats and shading answer different questions:

| Stage | Question it answers |
| --- | --- |
| Line art | What is in the image? |
| Flats | Does this colour scheme work? |
| Shading | Where is the light coming from? |
| Highlights and effects | What should the eye go to? |

Combining flats and shading means answering both at once — and discovering that the colour scheme does not work after you have spent an hour rendering it.

The flats stage is where a bad palette is cheap to fix. Every stage after that, it gets more expensive.

## Doing flats well

**One colour per region, solid.** No variation within a region at this stage. Variation is shading and it comes later.

**Work large to small.** Big areas first — background, clothing masses, hair — then smaller details. Working the other way round means constantly adjusting small elements to match large ones you have not chosen yet.

**Do not pick the final colour, pick the relationship.** Whether the hair is exactly this brown matters less than whether it separates from the skin and the background. Adjust the specific value once the relationships are right.

**Stop and look before shading.** This is the step people skip and the one with the highest return. Flats that do not read as a coherent image will not be rescued by shading — shading adds depth to a structure that is already working, and adds confusion to one that is not.

## The gap problem

The most common practical failure: a fill escapes into a neighbouring region and floods half the image.

The cause is always the same. **A fill spreads until it meets a closed boundary.** A single missing pixel in the line art is enough for it to leak out.

The fix takes seconds: close the gap, then fill again. The version that takes much longer is undoing the flood and repairing what it overwrote.

Two habits that prevent it:

- **Zoom in on the boundary before filling** a large region. Gaps are easier to spot than to undo.
- **Fill the large regions first**, so a leak has less finished work to damage.

## Value at the flats stage

The check that catches most problems: **look at your flats without shading and ask whether the regions separate.**

Areas that are different hues at the same value do not separate visually. This is the mechanism behind muddy colouring, and it is easiest to detect and fix at flats — see [colour palettes for anime art](/blog/color-palettes-for-anime-art/) for how to build a palette with value separation designed in.

It also matters for readability. Colour vision deficiency is common — [the National Eye Institute's page on colour blindness](https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness) covers the types — and regions distinguished only by hue at similar values become ambiguous for a substantial number of viewers. Value separation solves both problems at once.

For the numeric side of hue, saturation and lightness, [the W3C's CSS Color Module](https://www.w3.org/TR/css-color-4/) is an unusually clear reference.

## The line art stage before it

Two things about line art specifically affect how flats go:

**Closure.** Regions that are fully enclosed fill cleanly. Regions with gaps do not. If you are drawing your own line art, closing regions is worth doing deliberately.

**Line weight.** Heavier lines separate regions visually on their own, which means the flats can be closer in value without the image falling apart. Fine linework needs the colours to do more work. [Anime art styles explained](/blog/anime-art-styles-explained/) covers line weight as a style variable.

## The full order

1. **Line art** — settled before colour begins.
2. **Flats** — one colour per region, evaluated before proceeding.
3. **Shading** — hard-edged or soft, decided in advance rather than discovered.
4. **Highlights and effects** — last, and sparingly.

Each stage assumes the previous one is finished. That is what makes the sequence worth following rather than an arbitrary convention.

[Digital colouring techniques](/blog/digital-coloring-techniques/) covers the shading stages in detail, and [our guide to colouring anime line art](/blog/anime-coloring-app-guide/) covers the conventions specific to hair, eyes and skin.

## Where our app fits

[Anime Coloring Book: Paint Art](/apps/anime-coloring-book/) is built around this workflow. Fill covers large areas in a tap, which makes a full flats pass fast enough to be worth doing properly rather than skipping. The brush handles seam cleanup, shadow shapes and rim strokes at the shading stage.

Two erasers — one for the artwork, one for the background — mean an experiment that fails costs nothing, and being able to fail cheaply is what makes people try the better option rather than the safe one. Zoom, move and centre handle the detail pass, with centre snapping the view back when you lose your place.

It is free to download on Google Play, supported by ads, with optional in-app purchases and an Everyone content rating. Everything we make here is under [anime and creative games](/apps/category/anime-creative/).
