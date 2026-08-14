# Alberto's Place — Baguio staycation site

Static site. No build step, no dependencies. Open `index.html` or serve the folder.

```bash
python -m http.server 5273 --directory "Staycation Landing Page"
```

## Files

| Path | What it is |
|---|---|
| `index.html` | Landing page — hero with the "window" card |
| `unit-1.html` | Listing page for the Megatower 1 two-bedroom |
| `assets/css/style.css` | All styling. Palette lives in `:root` at the top |
| `assets/js/main.js` | Hero reveal, page transition, gallery, lightbox |
| `assets/img/` | Logo assets derived from the client's mark |
| `images/unit-1-baguio/` | 48 original-resolution photos pulled from the Airbnb listing |

## Logo

Source was `Downloads/Albertos place.jpg` — a square with the mark set
off-centre and a lot of dead space. Regenerated into three assets:

- `logo-tile.png` — cropped to the artwork, re-padded square on the brand tan.
  This is the one in use, rounded via CSS. Works on both the dark hero nav and
  the light listing nav.
- `logo-mark-white.png` — white artwork on transparent, if you ever need the
  mark alone on a dark or photographic background.
- `favicon.png`

Brand tan sampled off the original is `#e0b872`, available as `--brand-tan`.

## The hero effect

Two stacked background layers sit behind the hero:

- `.hero__layer--base` — the establishing shot (building exterior)
- `.hero__layer--reveal` — the unit's own photo, hidden at rest

The card's `<img>` is held at `scale(1.45)`, so at rest you're seeing a tight
slice of a bigger scene — the aperture. On hover, `is-peeking` fades the reveal
layer in and pushes it to `scale(1.16)`, while the card's crop eases back to
`1.28`. The card stays a tighter crop than the scene behind it on purpose; if it
opens all the way it stops reading as a window.

The warm scrim does **not** lighten on hover. That was tried and it costs the
headline too much contrast against busy photos.

On touch devices (`max-width: 860px`) there's no hover, so the reveal layer is
shown by default and the rail scrolls horizontally.

## Responsive & accessibility

Verified with no horizontal overflow at 320, 375, 768, 834, 1024 and 1440 wide,
plus 812×375 landscape.

Breakpoints:

| Width | What changes |
|---|---|
| ≤1080px | Booking panel unsticks and drops below the content |
| ≤900px + short landscape | Hero copy and card sit side by side, lede clamped to two lines |
| ≤860px | Nav collapses to a menu button; hero stacks; card rail scrolls; mosaic goes 2-up; hover reveal is shown by default since there's no hover |
| ≤560px | Gallery goes 2-up; "All places to stay" shortens to "Back" |

Accessibility work:

- Photo tiles are real `<button>`s, so the lightbox opens from the keyboard.
  They were click-only `<figure>`s and unreachable without a mouse.
- Lightbox moves focus to Close on open, traps Tab inside while open, and
  returns focus to the tile that opened it. Escape and arrow keys work.
- Menu button carries `aria-expanded` / `aria-controls`; Escape closes it and
  returns focus.
- Skip link on both pages.
- Visible focus ring (`--brand-tan`) on everything interactive.
- Interactive targets are ≥44px.
- Experiences / About / Contact are `<span>`s, not links. They were `href="#"`
  anchors that took focus and went nowhere. Swap them back to `<a>` when those
  pages exist.
- The gallery `<img>`s have empty `alt` because the wrapping button carries the
  label. The mosaic and map images have real descriptions.

Not done: the lightbox doesn't hide the rest of the page from screen readers
(`aria-modal` only hints at it). Fine at this size, worth revisiting if the site
grows.

## Adding units 2–6

1. Drop photos in `images/unit-<n>-<place>/`.
2. Copy `unit-1.html` → `unit-2.html`, update the copy, mosaic `src`s and the
   Airbnb URL (three places: booking aside, "Check dates", and any inline links).
3. In `assets/js/main.js`, the `order` array and `PNG` list drive the gallery —
   point them at the new folder via `DIR`.
4. In `index.html`, duplicate the `.window-card` block inside `.window-rail` and
   delete one `.window-slot`. Each card needs `data-reveal` pointing at the photo
   the background should show on hover.

Once there's more than one card the rail will scroll on its own.

## Before this goes live

- **Nav links** for Experiences / About / Contact are `href="#"` stubs.
- **Photo curation.** The gallery carries 47 of the 48 photos — `unit1-02.png`
  is pulled out and featured on its own as the walking-distance map. A few shots
  (`unit1-17`, `unit1-24`, `unit1-48`) carry the Alberto's Place watermark; kept
  in, since it's the client's own mark. Trim the `order` array in `main.js` to
  taste.
- **Amenity bullets** on `unit-1.html` were written from what's visible in the
  photos plus the listing's house rules. Have the client confirm them — a few
  (hot water, wifi speed, parking) are deliberately absent because they weren't
  verifiable.
- The Airbnb listing's own "carbon monoxide alarm not reported" disclosure is
  not repeated on this page. Worth a conversation with the client.
