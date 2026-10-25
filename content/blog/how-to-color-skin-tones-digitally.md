---
{
  "title": "How to Colour Skin Tones Digitally: Base, Shadow and Light",
  "metaTitle": "How to Color Skin Digitally: Base, Shadow and Light",
  "description": "How to colour skin digitally: why skin is not one colour, choosing a base, hue-shifted shadows worked out with multiply maths, highlights and blush.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "anime-creative",
  "tags": ["digital colouring", "skin tones", "shading", "anime art", "colour theory"],
  "primaryKeyword": "how to color skin digitally",
  "secondaryKeywords": [
    "how to colour skin tones",
    "skin shading digital art",
    "anime skin colouring",
    "skin shadow colour",
    "multiply layer skin shading"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does my skin shading look grey",
    "what colour should skin shadows be",
    "how to shade darker skin tones digitally",
    "how to add blush to anime skin"
  ],
  "aiSearchQuestions": [
    "How do you colour skin digitally?",
    "What colour should skin shadows be?",
    "Why does digital skin shading look grey or muddy?",
    "How do multiply layers change skin colours?"
  ],
  "relatedApps": ["anime-coloring-book"],
  "relatedArticles": [
    "how-to-color-anime-eyes",
    "color-palettes-for-anime-art",
    "digital-coloring-techniques",
    "how-to-shade-anime-hair"
  ],
  "takeaways": [
    "Skin is not one colour: Wikipedia names melanin, the hemoglobin in the dermis and the connective tissue beneath as contributors, so a flat grey shadow leaves out colour that real skin has.",
    "Work in three steps: a flat base, a shadow shifted in hue as well as value, then small highlights.",
    "A multiply layer multiplies colour channels; a lavender multiply shifts a skin shadow cooler and pinker, while grey simply darkens it.",
    "Keep the same relationships at every depth of skin tone: shifted shadows, restrained highlights, and no pure white or black.",
    "Skin is translucent; a slightly warmer, more saturated band where light turns to shadow is one way to suggest it."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What colour should skin shadows be?",
      "answer": "A colour shifted in hue as well as darker, rather than the base with black or grey added. A slightly cooler, pinker or redder shadow keeps skin looking alive; a plain darker version of the base can look grey."
    },
    {
      "question": "Why does my skin shading look grey or muddy?",
      "answer": "One likely cause is a shadow made by darkening the base with grey or black. That lowers the value without changing the hue, so the skin loses its warmth. Pick a shadow colour with its own hue instead."
    },
    {
      "question": "What does a multiply layer do to skin colours?",
      "answer": "Wikipedia explains that multiply takes each colour channel, from 0 to 1, in the top layer and multiplies it by the layer below, so the result is darker unless the top colour is white. A tinted multiply colour darkens and shifts hue at once."
    },
    {
      "question": "How do you shade darker skin tones digitally?",
      "answer": "With the same relationships as lighter tones: a base, a shadow shifted in hue and darker in value, and restrained highlights. Deep skin can carry richer, more saturated shadows; avoid pure black, which flattens the form."
    }
  ],
  "sources": [
    {
      "title": "Human skin color",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Human_skin_color",
      "accessed": "2026-10-24"
    },
    {
      "title": "Blend modes",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Blend_modes",
      "accessed": "2026-10-24"
    },
    {
      "title": "Subsurface scattering",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Subsurface_scattering",
      "accessed": "2026-10-24"
    }
  ]
}
---

A face that looks fine in flat colour can turn grey and plasticky once shadows go on. The fix is not a magic swatch but an understanding of why skin looks the way it does, and three steps applied in order. This guide covers both, with the colour arithmetic worked out.

## Why skin is not one colour

Real skin colour has several sources. Wikipedia explains that the pigment **melanin**, made by cells called melanocytes, is the main determinant of colour in darker skin, and that cells make two main types of melanin. In lighter skin, colour comes mainly from the bluish-white connective tissue under the dermis and the **hemoglobin** circulating in the dermis's veins. Skin is also **translucent**: Wikipedia's article on subsurface scattering notes that light penetrates skin and scatters inside it before leaving, and that 3D renderers must simulate this for skin, marble, leaves or wax, or the material may look unnatural, like plastic or metal.

The practical lesson for colouring: treat skin as having an undertone, such as a hint of red, yellow or olive, and let its shadows carry colour rather than just darkness.

## Step 1: the base

Lay a **flat base** over all the skin first: face, neck, hands, everything in one colour. Flats first is a rule that [digital colouring techniques](/blog/digital-coloring-techniques/) explains in more detail. Choose the base for its undertone as much as its lightness. Two bases with the same lightness can read very differently if one leans pink and the other yellow.

## Step 2: shadows that shift in hue

A mistake to avoid is making the shadow by darkening the base with grey or black. That changes **value** but not **hue**, so the skin drains of warmth. A better shadow changes both.

**A worked example using multiply.** In programs with layers, shadows can be painted on a **multiply** layer; Wikipedia describes multiply as one of the basic blend modes for darkening an image. It explains that multiply takes each colour channel of the top layer, on a scale from 0 to 1, and multiplies it by the channel below, so the result is darker unless the top colour is white. Take a light skin base, RGB (240, 200, 170):

| Shadow colour on multiply | Result | What happened |
| --- | --- | --- |
| Neutral grey (204, 204, 204) | (192, 160, 136) | Every channel × 0.8: darker, same hue |
| Lavender (200, 170, 220) | (188, 133, 147) | Green drops most, blue least: darker, cooler and pinker |

Both shadows are darker, but the lavender one has a hue of its own, which is what keeps skin from looking grey. The same lavender over a deep base of (120, 80, 60) gives (94, 53, 52): again darker, with a richer red cast. If your app has no multiply layers, you can pick a colour close to the result from a palette and paint it on.

## Step 3: light and highlights

Highlights on skin should be **small and restrained**. Skin is not chrome; a pure white highlight on a cheek can read as a wet or glossy shine. Place light where the form faces the light source: the bridge of the nose, the top of the cheekbones, the lower lip, the brow. Keep highlights lighter than the base but still tinted, warmer or cooler depending on the light.

To suggest translucency, try a slightly **warmer, more saturated band** where light turns to shadow, a nod to the scattering described above. It is a small touch that can make the skin look less like paper.

## Blush and accents

A soft, warm accent on the cheeks, nose tip and ears is one way to add life. Keep it low in saturation relative to the base and soft-edged, so it reads as colour under the skin rather than paint on top.

## The same rules at every skin tone

Whatever the base, keep the relationships the same:

1. **Shadows** shifted in hue and darker in value, never grey.
2. **Highlights** lighter but tinted, never pure white on skin.
3. **No pure black** in skin shadows, which flattens form.

Deeper bases can carry richer, more saturated shadows; lighter bases may suit gentler, cooler ones. [Anime colour palettes](/blog/color-palettes-for-anime-art/) covers how skin fits into a whole character's palette.

## Doing it in a colouring app

[Anime Coloring Book: Paint Art](/apps/anime-coloring-book/) is built around fill, a brush and two erasers; our app page does not list layers or blend modes, so pick the shadow colour you want directly. Fill the skin areas with your base in a tap, then switch to the brush for shadows and highlights, zooming in on faces and hands. Its **warm and cool** palette sets suit skin bases and shifted shadows, and the **Recently Used** row keeps your three skin colours within reach. Eyes need the same three-shade thinking; [how to colour anime eyes](/blog/how-to-color-anime-eyes/) covers them, and [the app guide](/blog/anime-coloring-app-guide/) explains the tools. It is one of our [anime and creative apps](/apps/category/anime-creative/).
