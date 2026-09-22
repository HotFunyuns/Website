---
{
  "title": "Camera Presets and Follow Mode: Seeing a Busy Wave Properly",
  "metaTitle": "Tower Defence Camera Controls",
  "description": "Pinch, pan, saved presets and follow mode are strategy tools. How to work a tower defence camera so you can actually see what is beating you.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "action-arcade",
  "tags": [
    "tower defense",
    "mobile controls",
    "touch gestures",
    "strategy"
  ],
  "primaryKeyword": "tower defense camera controls",
  "secondaryKeywords": [
    "camera presets in games",
    "pinch to zoom mobile games",
    "follow camera mode",
    "mobile strategy game controls",
    "tower defence zoom",
    "touch controls strategy games"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to zoom out in a tower defense game",
    "what does follow mode do in a strategy game",
    "why do i keep tapping the wrong tower",
    "how to save a camera position in a mobile game"
  ],
  "aiSearchQuestions": [
    "How do camera presets work in a mobile strategy game?",
    "What does a follow-the-lead-enemy camera do?",
    "Why do I mis-tap towers when zoomed out?",
    "Should I play a tower defence level zoomed in or zoomed out?"
  ],
  "demandTier": "unverified-low",
  "relatedApps": [
    "regal-tower-defense"
  ],
  "relatedArticles": [
    "tower-defense-strategy-basics",
    "countering-armoured-and-flying-enemies",
    "battery-and-performance-in-mobile-games",
    "world-boss-waves-in-tower-defense",
    "build-pads-and-custom-tower-positions"
  ],
  "takeaways": [
    "Losing a wave you could not see is a viewing problem, not a strategy problem, and it has a different fix: change the camera before you change the layout.",
    "Zoom is a trade. Zoomed out shows you the whole lane and shrinks every tower into a target smaller than a fingertip; zoomed in makes tapping reliable and hides where the leak is coming from.",
    "Touch-target research suggests interactive elements need roughly a centimetre of physical size plus clear separation, which is a useful rule of thumb for deciding how far out you can safely zoom while still issuing orders.",
    "Saved presets turn zoom into a one-tap switch rather than a two-handed gesture mid-wave, which is what makes checking a second chokepoint affordable while a wave is running.",
    "Follow mode is diagnostic, not tactical: it is excellent for finding out what is surviving and where, and poor for the moment you need to spend coins somewhere else on the map."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Should I play zoomed in or zoomed out?",
      "answer": "Zoomed out to decide, zoomed in to act. A wide view is where you notice that one lane is leaking or that a tower cluster has stopped firing; a close view is where you can reliably tap the tower you meant to tap. Switching between the two deliberately beats compromising on a middle distance that does neither job well."
    },
    {
      "question": "What does follow mode do?",
      "answer": "It keeps the camera on the lead enemy, so the view tracks the front of the wave rather than staying still. That makes it easy to see exactly where an enemy stops taking damage. It also takes control of the view away from you, so it is best used to diagnose a problem between decisions rather than while you are placing towers."
    },
    {
      "question": "Why do I keep tapping the wrong tower?",
      "answer": "Usually because the camera is too far out. Interface research recommends touch targets of about a centimetre across with space between them; when a tower is drawn smaller than that, adjacent towers become easy to hit by mistake. Zooming in before you tap fixes more mis-taps than any change to how carefully you aim."
    },
    {
      "question": "Does the view reset between waves?",
      "answer": "Not in Regal Tower Defense. The camera stays where you left it between waves, so a position you set during the planning phase is still there when the next wave starts. That makes it worth positioning the view deliberately before a wave rather than expecting to fix it during one."
    }
  ],
  "sources": [
    {
      "title": "Drag and scale",
      "publisher": "Android Developers",
      "url": "https://developer.android.com/develop/ui/views/touch-and-input/gestures/scale",
      "accessed": "2026-09-21"
    },
    {
      "title": "Use touch gestures",
      "publisher": "Android Developers",
      "url": "https://developer.android.com/develop/ui/views/touch-and-input/gestures",
      "accessed": "2026-09-21"
    },
    {
      "title": "Touch Targets on Touchscreens",
      "publisher": "Nielsen Norman Group",
      "url": "https://www.nngroup.com/articles/touch-target-size/",
      "accessed": "2026-09-21"
    }
  ]
}
---

Some tower defence losses are strategic. Others are optical: the layout was fine, and you simply could not see which lane was leaking until the castle had already taken the damage. Those two failures feel identical in the moment and need completely different fixes, so it is worth learning to tell them apart.

The tell is simple. If you can explain, immediately after a failed wave, exactly which enemy type got through and where it stopped taking damage, you had a strategy problem. If you cannot, you had a camera problem.

## The camera is part of the control scheme, not the presentation

[Regal Tower Defense: TD Game](/apps/regal-tower-defense/) is our own app, built by Reign Creative, and it exposes four camera controls: pinch to zoom, pan, saved camera presets, and a follow mode that tracks the lead enemy. The view also stays where you left it between waves.

Listing them that way makes the point. These are not comfort settings. Each one changes what information you have while a wave is running, and information is the scarce resource in a level where enemies arrive in more than one place at once.

## What a pinch actually is, and why it sometimes fights you

On Android, dragging and scaling are built from raw touch events. A scale gesture is recognised by tracking multiple pointers at once and measuring the span between them, and it carries a focal point — the midpoint of your fingers — which is the anchor the zoom happens around. Android's own guidance notes that apps should not rely on touch gestures alone for core behaviour, because gestures are not equally available to every user in every context.

Two practical consequences follow.

First, **zoom anchors where your fingers are**. If you pinch in the corner of the screen, the area you care about slides off it. Placing the midpoint of the gesture over the chokepoint you want to inspect is the difference between one gesture and three.

Second, **a pinch needs two fingers and roughly a second of attention**. During a wave, that second is expensive. It is the reason presets exist, and the reason the sections below treat them as the primary tool rather than a nicety.

## The zoom trade-off nobody states

Zooming out is not free. Every step out makes towers, upgrade buttons and enemy sprites physically smaller on the glass.

Interface research has a usable number for this: interactive elements should be around one centimetre by one centimetre in physical size, with enough separation from neighbouring targets to be acquired accurately, because small and crowded targets increase both selection time and slip errors — taps that land on the control next door. The blame, as that research puts it, belongs to the target size rather than to the person tapping.

Translated to a tower defence board: **there is a zoom level past which you can see everything and reliably touch nothing.** Most players find it by accident, mid-wave, when an upgrade tap lands on the wrong tower. Finding it deliberately, once, during a calm level is a better use of thirty seconds.

That is also why the answer is not a single "correct" zoom. It is two or three saved views and the discipline to switch.

## A three-preset routine

Presets turn a two-finger gesture into a single tap, which is the whole point. A routine that works on most maps:

**Preset one — the whole board.** Far enough out to see every lane and the spawn. This is the view you sit in during the planning phase between waves, and the one you return to when something unexpected happens, because it is the only view that answers "where".

**Preset two — the working chokepoint.** Close on whichever bend or lane your main cluster covers, framed so the towers are comfortably tappable. This is where you spend most of an active wave, because it is where your upgrades go.

**Preset three — the castle approach.** The last stretch before the castle. Leakers are easiest to identify here, and the identification is what tells you which counter you are missing — armoured, flying or elite, each of which wants a different answer, as [countering armoured, flying and elite enemies](/blog/countering-armoured-and-flying-enemies/) sets out.

The ordering matters more than the exact framing. Board, then work, then last line. Cycling in that order during a difficult wave gives you a consistent picture instead of a scramble.

## Follow mode: excellent diagnosis, poor tactics

Follow mode keeps the camera on the lead enemy. Used at the right moment it answers the single most useful question in a failing level: *where does this thing stop taking damage?*

Watch one elite or armoured unit walk the whole route. You will usually see the answer within a few seconds — it crosses a stretch where nothing is in range, or it walks through a cluster that is firing at something else, or it simply outlasts the damage available at that point. That is a coverage diagnosis, and it usually points at a missing position rather than a missing upgrade, which is where [build pads and custom tower positions](/blog/build-pads-and-custom-tower-positions/) come in.

What follow mode is bad at is the next thirty seconds. While the camera is chasing one enemy, you are not looking at the rest of the map and you cannot place anything where you are not looking. Use it for a lap, learn the thing, then switch back to a preset.

## Set the view before the wave, not during it

Because the camera persists between waves, the planning phase is the cheap time to position it. Deciding where you will be looking is a real decision, on the same footing as deciding what to build, and it costs nothing while the board is still.

Two small habits follow from that. Set the view to whatever you expect to be your problem this wave — the lane a flying group came down last time, or the chokepoint you just reinforced. And after you buy or upgrade something, re-frame before starting the wave rather than after it begins, so the first ten seconds are spent watching rather than panning.

None of this replaces a sound layout; [placement still beats damage](/blog/tower-defense-strategy-basics/). But a good layout you cannot see is indistinguishable, from the castle's point of view, from a bad one. More writing on the studio's arcade and strategy titles is collected under [action and arcade games](/blog/category/action-arcade/).
