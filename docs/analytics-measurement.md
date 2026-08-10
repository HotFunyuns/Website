# Analytics measurement plan

Property: **GA4 `G-JK8FPQB5L2`**
Implementation: `src/lib/analytics.ts`, `src/components/GoogleAnalytics.tsx`, `src/components/PlayStoreLink.tsx`

This document describes what the site measures today. It is a record of the
existing implementation, not a proposal — the blog was added on top of this
layer without changing it.

## Tag installation

There is exactly **one** GA4 tag on the site. It is injected once from the root
layout (`src/app/layout.tsx` → `<GoogleAnalytics />`), so every page including
every blog route inherits it. There is no second gtag snippet, no Google Tag
Manager container, and no per-page tag.

### Hostname gate

`isAnalyticsEnabled()` returns true only on `reigncreativellc.com` and
`www.reigncreativellc.com`. The site is a static export, so the identical bundle
can be served from `localhost`, a fork's `github.io` subdomain, or a preview
host. Without the gate, all of those would report into the production property.
Every send path checks the gate first, so on a non-production host no `js`,
`config`, `page_view` or `play_store_click` command is ever queued.

## Page views

`config` is sent with **`send_page_view: false`**, and page views are sent
manually instead.

This is deliberate and there is a matching setting in the GA console that must
stay as it is:

> **Admin → Data Streams → Enhanced measurement → Page changes based on browser
> history events must remain OFF.**

If that toggle is turned on, every client-side navigation produces both an
automatic page view and our manual one, and all traffic numbers double. This is
the single most important operational note in this document.

### One navigation, one page view

`trackPageView()` stores the last path it reported in `lastPageViewPath` and
returns early if the path has not changed. The stored value is `pathname +
search`, deliberately excluding the hash.

That exclusion matters on one surface. On `/apps/`, `AppsExplorer` records the
active filter by calling `history.replaceState` with a hash fragment
(`/apps/#health-nutrition`), so the filter survives a page reload and can be
linked to. Because the hash is not part of `pathname + search`, selecting a
filter never produces a second manual page view.

`/blog/` has no equivalent: `BlogExplorer` holds its filter and search text in
component state only and does not touch the URL at all.

The `replaceState` call is still a browser history event, which is precisely
what the enhanced-measurement toggle above listens for. Our own code cannot
double-count a filter change, but that GA setting can.

A real navigation to a different path always reports.

Parameters sent with `page_view`:

| Parameter | Value |
| --- | --- |
| `page_path` | `pathname + search` |
| `page_location` | `origin + pathname + search` |
| `page_title` | `document.title` at send time |

`page_title` is read after the route has rendered, so client-side navigations
report the destination title rather than the previous one.

## `play_store_click`

The site's primary conversion event. It fires from **one** component,
`PlayStoreLink`, which every Play Store CTA on the site routes through
(`GooglePlayButton` wraps it). There is no second click handler and no
duplicate listener, so a click produces exactly one event.

The handler never calls `preventDefault()`. The event is queued into `dataLayer`
synchronously and the browser then opens the link in a new tab as normal, so
navigation is never delayed or blocked by analytics. A thrown error inside the
handler is swallowed — analytics must not be able to break an outbound link.

| Parameter | Source | Notes |
| --- | --- | --- |
| `button_location` | prop | See the enum below |
| `link_url` | prop | The full destination including the install referrer |
| `page_path` | `location` | `pathname + search` |
| `app_name` | prop | Present when the CTA is for a specific app |
| `article_slug` | derived | From `/apps/<slug>/` or `/blog/<slug>/` |
| `link_text` | DOM | Visible anchor text, `.sr-only` stripped, capped at 100 chars |

### `button_location` values

`header`, `hero`, `app_card`, `article_top`, `article_middle`, `article_bottom`,
`related_apps`, `footer`.

On a blog article the three article positions map to the sidebar CTA
(`article_top`), the mid-article CTA (`article_middle`), and the end-of-article
CTA (`article_bottom`). Comparing conversion across those three is the point of
the split — it tells you whether readers convert before or after reading.

## Install attribution

Blog CTAs build their Play URL with `playUrlWithReferrer()` (`src/lib/play.ts`),
which appends a single percent-encoded `referrer` parameter:

```
?referrer=utm_source%3Dreigncreative_blog%26utm_medium%3Dorganic_content
         %26utm_campaign%3D<app-slug>%26utm_content%3D<article-slug>
```

| Key | Value |
| --- | --- |
| `utm_source` | `reigncreative_blog` |
| `utm_medium` | `organic_content` |
| `utm_campaign` | the app slug — which app was installed |
| `utm_content` | the article slug — which article drove it |

The encoding matters. The Play Install Referrer API delivers the value of
`referrer` to the installed app as a single opaque string; writing the UTM keys
as sibling query parameters instead would drop them. `URLSearchParams` handles
the encoding, so this is not hand-rolled.

**No personal data is placed in these URLs.** No user id, email, device id, or
session id — only the app and article slugs, both of which are public.

## What is deliberately not measured

- No scroll depth, heatmaps, session recording, or rage-click tracking.
- No cross-site or cross-app user id. The apps and the website do not share an
  identifier.
- No advertising or remarketing tags.
- No cookie consent banner, because no analytics runs until the hostname gate
  passes and no advertising identifiers are set. Revisit this if a marketing tag
  is ever added.

## Verification checklist after a content release

1. GA4 **Realtime** shows traffic on `/blog/` and on at least one article path.
2. Navigate between three articles client-side and confirm **three** page views,
   not six. Six means the enhanced-measurement history toggle was turned on.
3. Change a category filter on `/apps/` and confirm **no** additional page view.
   This is the surface that writes to browser history, so it is the one that
   exposes the enhanced-measurement toggle being switched back on.
4. Click each of the three CTAs on an article and confirm three
   `play_store_click` events with distinct `button_location` values and a
   populated `article_slug`.
5. In **DebugView**, confirm `link_url` contains the encoded `referrer`
   parameter and that `%26utm_content%3D` carries the correct article slug.
