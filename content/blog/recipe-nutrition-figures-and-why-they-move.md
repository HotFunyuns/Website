---
{
  "title": "Recipe Nutrition Figures and Why Two Apps Disagree",
  "metaTitle": "Recipe Nutrition Figures",
  "description": "Recipe nutrition depends on ingredient entries, yield assumptions and cooking losses. Why two calculators disagree and which figure to trust.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "Reign Creative Team",
  "category": "health-nutrition",
  "tags": ["nutrition", "recipes", "accuracy", "troubleshooting"],
  "primaryKeyword": "recipe nutrition calculator",
  "secondaryKeywords": [
    "recipe nutrition calculator free",
    "how to calculate nutrition for a recipe",
    "recipe calorie calculator",
    "cooking losses nutrition",
    "yield after cooking",
    "nutrition per serving calculation"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why do recipe nutrition calculators give different numbers",
    "does cooking change the calories in a recipe",
    "how is nutrition per serving calculated",
    "should you weigh food raw or cooked",
    "how accurate are recipe nutrition figures"
  ],
  "aiSearchQuestions": [
    "Why do recipe nutrition calculators disagree?",
    "Does cooking change a recipe calorie count?",
    "Should you weigh ingredients raw or cooked?",
    "How accurate are recipe nutrition figures?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": ["easy-recipes-meal-planner"],
  "relatedArticles": [
    "why-food-databases-disagree",
    "added-sugars-vs-total-sugars",
    "recipe-scaling-and-serving-sizes",
    "low-carb-tracking-apps-compared"
  ],
  "takeaways": [
    "A recipe figure is built from three separate assumptions — which ingredient entry was used, what the batch weighed after cooking, and how the batch was divided — and two calculators can differ on all three.",
    "Cooking yields and nutrient retention factors are real, published variables: USDA's National Agricultural Library lists both among the data its food composition laboratory provides.",
    "FoodData Central holds several distinct data types with different provenance, and not all of them carry data on all nutrients, so the same food can have more than one legitimate entry.",
    "Raw and cooked weights are not interchangeable, and a calculator that silently mixes them produces a confident wrong answer.",
    "Where the ingredient data does not support a figure, our app leaves it blank rather than estimating one."
  ],
  "disclaimer": "health",
  "featured": false,
  "faqs": [
    {
      "question": "Why do two recipe calculators give different numbers for the same dish?",
      "answer": "Because a recipe figure is a chain of assumptions, not a measurement. Each calculator picks an entry for every ingredient, assumes a weight for the cooked batch, and divides by a serving count. A difference at any one of those three steps changes the result, and in practice they differ at all three. The disagreement is usually a sign that both are being honest about an inherently approximate calculation rather than that one is wrong."
    },
    {
      "question": "Does cooking change the calories in a recipe?",
      "answer": "The energy in the ingredients does not vanish, but the weight of the food changes and some components are lost to the cooking medium or to evaporation. That is why USDA's food composition work publishes both cooking yields and nutrient retention factors as data in their own right. A figure calculated from raw ingredients and then reported per 100 grams of cooked food is describing two different things unless the yield was accounted for."
    },
    {
      "question": "Should ingredients be weighed raw or cooked?",
      "answer": "Consistently, in whichever way the database entry you are using was recorded. Entries exist for both raw and cooked forms of many foods, and they are not interchangeable — cooked rice and raw rice have very different weights for the same starting amount. The error to avoid is mixing them: weighing raw and matching to a cooked entry, or the reverse, produces a confident figure that is wrong by a large margin."
    },
    {
      "question": "Why does the same ingredient have several database entries?",
      "answer": "Because food composition data comes from different sources with different methods. USDA's FoodData Central contains several distinct data types, including Foundation Foods with extensive metadata about samples and analytical approach, SR Legacy values derived from analyses, imputations and published literature, survey data, and branded data supplied by industry. Not all data types carry values for all nutrients, so choosing between entries is a real decision rather than a formality."
    },
    {
      "question": "How accurate are recipe nutrition figures?",
      "answer": "Precise enough to compare one recipe against another, and not precise enough to treat as a measurement of what is on your plate. The ingredient values themselves carry natural variability — the same food profile can represent many analysed samples — and every step after that adds assumptions. Consistency over time is a more useful property than accuracy at any single meal."
    }
  ],
  "sources": [
    {
      "title": "About FoodData Central",
      "publisher": "USDA FoodData Central, Agricultural Research Service",
      "url": "https://fdc.nal.usda.gov/about-us",
      "accessed": "2026-09-15"
    },
    {
      "title": "Food Composition",
      "publisher": "National Agricultural Library, U.S. Department of Agriculture",
      "url": "https://www.nal.usda.gov/human-nutrition-and-food-safety/food-composition",
      "accessed": "2026-09-15"
    }
  ]
}
---

You put the same recipe into two apps and get two different calorie figures. Neither app is broken, and neither number is the truth.

A recipe nutrition figure is not a measurement. It is the output of a chain of three assumptions, and two calculators can reasonably differ at every link:

1. **Which database entry** was used for each ingredient.
2. **What the batch weighed after cooking**, and what was lost along the way.
3. **How the batch was divided** into servings.

Understanding those three is enough to explain almost every disagreement you will ever see, and to know which figure is worth paying attention to.

## Link one: the ingredient entry

This is where the difference usually starts, and it is a bigger space than most people realise.

USDA's FoodData Central — the reference most calculators draw on directly or indirectly — is not a single list. It holds several distinct data types with different provenance:

- **Foundation Foods**, covering basic unprocessed or lightly processed foods with extensive underlying metadata including the number of samples, sampling location, date of collection and analytical approach.
- **SR Legacy**, for decades the primary US food composition database, with values derived from analyses, imputations and the published literature.
- **Survey Foods (FNDDS)**, derived from the Foundation and SR Legacy data and used for dietary intake analysis.
- **Experimental Foods**, covering foods studied under specific research conditions.
- **Branded Foods**, supplied through a public-private partnership from industry data providers and reflecting what appears on product labels.

Two consequences follow. First, **the same food can legitimately appear more than once**, with values that differ because the methods differed. Second, **not all data types provide data on all nutrients** — so an entry chosen for one reason may be missing a value you needed for another.

There is a further wrinkle worth knowing about: Foundation Foods data includes a Limit of Quantification field, the lowest amount that can be measured with acceptable precision, with values expressed as "less than" a threshold. A number that is genuinely below the detection floor is not zero, and how a calculator treats those differs.

The metadata exists precisely so users can recognise the potential variability of values across food components — a single food profile can represent hundreds of analysed samples. Variation in food is real, not a database defect.

This article is about the recipe layer. The layer beneath it — why entries for the same packaged food differ between databases in the first place — is a separate subject covered in [why food databases disagree](/blog/why-food-databases-disagree/). If your disagreement is about a branded product rather than a cooked dish, that is the page you want.

## Link two: yield and cooking losses

Here is the link most people have never thought about, and it is not a rounding detail.

When food cooks, its weight changes. Water evaporates, fat renders out, liquid is absorbed. A dish that went into the oven at 1,200 grams does not come out at 1,200 grams, and if a calculator reports "per 100 grams" of the finished dish, that assumption is doing real work.

Nutrient content changes too, and not uniformly — some components are more affected by heat and by leaching into cooking water than others.

None of this is folklore. USDA's National Agricultural Library lists **cooking yields** and **nutrient retention factors** among the data its Methods and Application of Food Composition Laboratory provides, alongside components such as choline, isoflavones, iodine and fluoride. These are published research outputs precisely because the effect is measurable and matters.

So when two calculators disagree, one may be applying yield and retention assumptions while the other treats the cooked dish as the simple sum of its raw ingredients. Both are defensible. They are not the same calculation.

**The practical consequence for anyone weighing food:** be consistent about raw versus cooked, and match the database entry to what you weighed. Cooked rice and raw rice are different entries with very different weights for the same starting quantity. Mixing them is the single largest error available in this whole process, and it is invisible because the result still looks like a plausible number.

## Link three: the serving division

The last link is arithmetic and is still a common source of disagreement.

"Serves four" is a claim made by whoever wrote the recipe. It is not a standard, it is not enforced, and two recipes producing the same quantity of food can divide it differently. Scale the ingredients without scaling the stated yield and every per-serving figure moves — the mechanics of that are in [why doubling a recipe is not just doubling](/blog/recipe-scaling-and-serving-sizes/).

If you are comparing two apps' figures for "the same recipe", check first that both are dividing by the same number. Surprisingly often, that is the entire discrepancy.

## Why we leave the figure blank

[Easy Recipes & Meal Planner](/apps/easy-recipes-meal-planner/) shows calories along with protein, carbohydrates and fat for **supported** recipes, at the serving size you have selected. Where a recipe does not have nutrition data available, the app does not estimate one for it.

The blank is deliberate, and it is the design decision in this app we get asked about most.

It would be trivial to fill. Match each ingredient to the nearest-looking database entry, sum, divide, display. The result would look exactly like the figures shown on recipes where the data genuinely supports it — same typeface, same position, same air of authority — and there would be nothing on screen to tell you that one of them was assembled from approximations of approximations.

That is the problem. **An estimated figure that is presented identically to a supported one destroys the reader's ability to tell them apart.** Someone tracking intake would have no way of knowing which numbers came from matched ingredient data and which came from a guess about what "a handful of herbs" weighs.

So the rule is: show it where the underlying data supports it, leave it empty where it does not, and never fill the gap with something that merely looks like an answer. The cost is that the app has visible holes in it, which looks less complete than the alternative. We would rather have a visible hole than an invisible fabrication.

## Which figure should you actually use?

If you need a single answer: **pick one tool and stay with it.**

Consistency beats accuracy here, and the reasoning is straightforward. Every calculator is applying its own chain of assumptions. As long as you use the same chain every time, the differences between your own meals are meaningful, even if the absolute numbers carry uncertainty. Switch tools every week and you are measuring the tools rather than the food.

The other habits worth having:

- **Check the serving count** before comparing anything.
- **Weigh consistently**, raw or cooked, and match the entry.
- **Prefer entries with better provenance** where you have the choice.
- **Treat a figure as a comparison, not a measurement.** It is precise enough to tell you one recipe differs from another, and not precise enough to be a reading of what is on your plate.
- **Expect label figures and recipe figures to behave differently.** Packaged-food labels follow their own conventions, including how particular components are declared — [added sugars versus total sugars](/blog/added-sugars-vs-total-sugars/) is a good example of a distinction that exists on a label and has no direct equivalent in a home calculation.

None of this is a reason to distrust the numbers. It is a reason to know what kind of number you are looking at. If you are choosing between tracking apps rather than recipe tools, the trade-offs there are different again and are covered in [low-carb tracking apps compared](/blog/low-carb-tracking-apps-compared/).

The planner sits with the rest of the studio's nutrition tools under [Health & Nutrition](/apps/category/health-nutrition/).
