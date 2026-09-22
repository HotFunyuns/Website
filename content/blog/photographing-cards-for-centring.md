---
{
  "title": "Photographing a Card So the Centring Measurement Means Something",
  "metaTitle": "Photographing Cards for Centring",
  "description": "A skewed or badly lit photo produces a confident, wrong centring ratio. How to capture front and back so the border measurement is worth trusting.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "video-utility",
  "tags": [
    "trading cards",
    "photography",
    "centring",
    "measurement"
  ],
  "primaryKeyword": "how to photograph cards for centering",
  "secondaryKeywords": [
    "card centring photo setup",
    "photographing trading cards",
    "card border measurement",
    "avoiding glare on cards",
    "camera angle card measurement",
    "card scanning lighting"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does my card centring measurement keep changing",
    "how to avoid glare when photographing holo cards",
    "does camera angle affect card centering",
    "should i photograph the back of the card too"
  ],
  "aiSearchQuestions": [
    "How should you photograph a card for a centring measurement?",
    "Why does camera angle change a centring ratio?",
    "How do you photograph a holo card without glare?",
    "Why does centring need the back of the card as well as the front?"
  ],
  "demandTier": "unverified-low",
  "relatedApps": [
    "tcg-card-grading-scanner"
  ],
  "relatedArticles": [
    "how-to-measure-card-centring",
    "card-condition-grading-scales",
    "when-a-card-scanner-picks-the-wrong-card",
    "why-card-price-estimates-disagree",
    "bulk-scanning-a-card-collection"
  ],
  "takeaways": [
    "A centring ratio is a measurement of the photo, not of the card, so an off-axis capture produces a confident number that describes a distortion rather than a border.",
    "Perspective error is the dangerous one because it mimics real miscentring: tilting the camera makes the near edge look wider and the far edge narrower, exactly as a genuinely off-centre cut would.",
    "Shoot straight down with the card flat, the phone parallel to the surface and the card near the middle of the frame, since lens distortion is smallest at the centre of the image.",
    "Use even, diffuse light from two sides rather than one bright source, because a single light throws a gradient across the border and holo surfaces turn direct light into glare that swallows an edge.",
    "Measure front and back separately. Printing and cutting are different steps, so a card can be well centred on one face and poorly centred on the other, and a grading decision depends on the worse of the two."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why does my centring measurement change between photos?",
      "answer": "Because the measurement is taken from the image. Small changes in camera angle, distance, lighting and how you place the guides all move the border pixels, and the app's own guidance says lighting and camera angle affect the result. A repeatable setup produces repeatable numbers; a handheld one at a slight tilt does not."
    },
    {
      "question": "Does camera angle really matter that much?",
      "answer": "Yes, and it matters in the worst possible way, because tilt produces the same visual signature as genuine miscentring. Photographing from slightly above one edge widens the border nearest the lens and narrows the far one. The card has not changed; the projection has."
    },
    {
      "question": "How do you photograph a holo card without glare?",
      "answer": "Move the light rather than the card. Use two diffuse sources at roughly forty-five degrees from opposite sides instead of one bright overhead light, avoid direct sun and bare bulbs, and check the preview for a bright band across a border before capturing. A blown-out edge cannot be measured, only guessed at."
    },
    {
      "question": "Why photograph the back as well as the front?",
      "answer": "Because front and back centring are produced by different parts of manufacturing and can disagree. Professional assessment looks at both, and a card that is excellent on the front and poor on the back is limited by the back. Measuring only the face you like best tells you what you hoped rather than what you have."
    }
  ],
  "sources": [
    {
      "title": "Technical Guidelines for Digitizing Cultural Heritage Materials, Third Edition",
      "publisher": "Federal Agencies Digital Guidelines Initiative (FADGI)",
      "url": "https://www.digitizationguidelines.gov/guidelines/digitize-technical.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Guidelines for Digitizing Archival Materials for Electronic Access",
      "publisher": "U.S. National Archives and Records Administration",
      "url": "https://www.archives.gov/preservation/technical/guidelines.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "CameraX overview",
      "publisher": "Android Developers",
      "url": "https://developer.android.com/media/camera/camerax",
      "accessed": "2026-09-21"
    }
  ]
}
---

A centring tool measures the photograph you gave it. That sentence contains the whole problem: if the capture is tilted, unevenly lit or too far away, the numbers that come back will be precise, confident and wrong, and nothing about them will look wrong.

[TCG Card Grading Scanner Value](/apps/tcg-card-grading-scanner/) — our own app, built by Reign Creative — measures left, right, top and bottom borders from front and back photos using adjustable rounded guides and an overlay, and its own guidance is explicit that lighting, glare, camera angle, card design and manual alignment all affect the measurement. This article is about removing as many of those variables as a kitchen table allows.

## Perspective is the error that impersonates miscentring

Of all the ways a photo can mislead a border measurement, one is genuinely dangerous, because it produces the same visual result as the thing you are trying to detect.

When the camera is not parallel to the card, the nearer edge is imaged larger and the farther edge smaller. A rectangle photographed from slightly above its top edge comes out as a subtle trapezoid: the top border looks thin, the bottom border looks thick. That is indistinguishable, in the image, from a card whose printing sits high on the stock.

The fix is mechanical, not clever.

- **Put the card flat** on a surface, not held in the hand, not propped against anything.
- **Bring the phone parallel to that surface** and shoot straight down. If your camera app offers a level indicator, use it.
- **Centre the card in the frame.** Lens distortion is smallest in the middle of the image and grows towards the corners, so a card sitting in the corner of the frame is being bent by the optics before anything else happens.
- **Do not crop to correct a tilt.** Cropping changes which pixels you keep; it does not undo a projection.

Institutional digitisation practice reaches the same conclusions from the archive side. FADGI's technical guidelines for digitising cultural heritage materials and the National Archives' guidelines for digitising archival materials both exist because consistent, controlled capture is what makes one image comparable with another — and comparability is exactly what you need when deciding which of two copies of a card is better cut.

## Light it evenly, then check for the band

Lighting fails in two distinct ways, and holo cards fail in both at once.

The first is a gradient. A single light source to one side makes one border brighter than the opposite border, which shifts where an automatic edge looks like it sits and makes your own guide placement inconsistent. Two diffuse sources from opposite sides, at roughly forty-five degrees, cancel most of it. An overcast window with the card a foot back from the glass works surprisingly well.

The second is specular glare. Foil, holo and reverse holo surfaces reflect a light source as a bright patch, and where that patch crosses a border, the edge is simply not in the image any more. No measurement can recover it.

A ten-second habit catches both: **look at the preview along each of the four borders before you capture.** If any of them has a bright band or a visible brightness gradient, move the light, tilt the card a few degrees relative to the light while keeping the camera square, and look again.

## Distance, resolution and the thing that quietly ruins it

Border widths are small. On a standard trading card, the difference between a strong and a mediocre centring ratio can be under half a millimetre, so the photo has to resolve that difference before software can measure it.

Two rules cover most phones. Fill the frame with the card, leaving a small margin so the guides have somewhere to sit. And avoid heavy digital zoom, which invents pixels rather than capturing them — moving the phone closer is always better than zooming from further away.

It is also worth knowing what the capture layer is doing. Android's CameraX library exposes separate use cases for preview, image capture and image analysis, and the image your app measures is not necessarily the one your eye approved in the preview. That is a good reason to capture deliberately rather than at the moment of a slight hand wobble, and to re-shoot rather than measure a frame you are not confident about.

## Measure both faces, and expect them to differ

Printing and cutting are separate manufacturing steps, and they can disagree. A card can be well centred on the front and noticeably off on the back, which is why the app takes front and back photos and why professional condition assessment looks at both.

The practical consequence is a discipline rather than a technique: **photograph both faces in the same session, with the same setup, without moving the lights.** Two photos taken under different conditions produce two measurements you cannot compare, and the whole point of measuring the back is comparison. [How to measure card centring](/blog/how-to-measure-card-centring/) walks through what the resulting ratios mean.

## Setting the guides honestly

Once the photo is right, the remaining variable is you. The guides are adjustable, which is necessary — card designs vary, and some have decorative borders that are not the print border — and also an opportunity to fool yourself.

Place the guides to the actual edge of the printed area, not to a design element that happens to be close to it. Do it at a zoom level where you can see individual pixels along the edge. And if you find yourself nudging a guide back and forth to see which position gives a nicer ratio, stop: that is no longer a measurement.

When two copies of the same card are close, the useful output is not the absolute ratio but the comparison, and a comparison is only valid if both cards were shot and measured the same way. If you are working through a stack, keeping the setup fixed matters for the same reason it matters in a [bulk scanning session](/blog/bulk-scanning-a-card-collection/).

## What you now have, and what you do not

You have a repeatable, informational measurement of border geometry. That is genuinely useful: it turns "this one looks better" into a number you can check, and it is enough to decide which copy to keep or whether a card is worth looking at more closely.

You do not have a grade. The measurement is informational only, lighting and camera angle still influence it, and an official grade requires an independent professional grading service — which also weighs surface, edges and corners rather than centring alone, as [card condition grading scales](/blog/card-condition-grading-scales/) sets out.

More writing on the studio's utility apps sits under [video and utility apps](/blog/category/video-utility/).
