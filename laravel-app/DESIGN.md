---
name: Electa
description: Platform polling real-time yang ringan, cepat, dan seru.
colors:
  ember-deep: "oklch(0.278 0.033 256.848)"
  signal-rose: "oklch(0.645 0.246 16.439)"
  ember-orange: "oklch(0.75 0.183 55.934)"
  paper: "oklch(1 0 0)"
  ink: "oklch(0.145 0 0)"
  coal: "oklch(0.205 0 0)"
  muted: "oklch(0.556 0 0)"
  line: "oklch(0.922 0 0)"
  danger: "oklch(0.577 0.245 27.325)"
  success: "oklch(0.792 0.209 151.711)"
typography:
  display:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Fira Code, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  xl: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  # button-primary renders the full ember gradient; flat rose below is the schema-compatible fallback (full gradient lives in .impeccable/design.json).
  button-primary:
    backgroundColor: "{colors.signal-rose}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.signal-rose}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0 32px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 32px"
    height: "48px"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "32px"
  input-default:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
  card-default:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  badge-default:
    backgroundColor: "{colors.signal-rose}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
---

# Design System: Electa

## 1. Overview

**Creative North Star: "The Live Tally Hall"**

Electa looks like a bright counting hall on election night: open room, civic gravity, numbers going up on the wall where everyone can see them. The interface is an arbiter, not a participant. Surfaces stay neutral and quiet so the count itself — bars filling, timers ticking, badges unlocking — carries all the excitement. Per PRODUCT.md, the voice is "ringan, cepat, seru": light in weight, fast in response, lively in momentum, never loud in chrome.

This system explicitly rejects the generic AI SaaS look: no purple/blue gradients, no centered hero with three equal feature cards, no pill "NEW" badges, no templated landing scaffolding. It equally rejects the stiff bureaucracy portal and the playful quiz game. Density is a virtue on task screens (polls, dashboards, reports); restraint is the virtue on marketing surfaces, where one decisive idea owns each fold.

**Key Characteristics:**
- Neutral hall, ember gradient: quiet surfaces with a single rose-to-orange ember gradient reserved for action and live state.
- Numbers are the decoration: tabular figures, distribution bars, and timers do the visual work.
- Refined and restrained controls: small radii, thin borders, precise press feedback.
- Lifted cards: depth comes from cards floating over the hall floor, not from flat tonal stacking.
- Motion reports state: 150–250 ms transitions on tasks, choreographed entrances only on brand surfaces, always with a reduced-motion path.

## 2. Colors

One ember accent family on a neutral hall; color is spent on action and live data, never on decoration.

### Primary
- **Signal Rose** (oklch(0.645 0.246 16.439)): the accent. Flat applications — text, chips, rings, data fills — use this value.
- **Ember Orange** (oklch(0.75 0.183 55.934)): the bright end of the primary gradient. Never used alone as text or surface.
- **Ballot Ink** (oklch(0.278 0.033 256.848)): the deep end of the primary gradient. Never used alone as a light-mode surface.

**The Ember Gradient Rule.** The ember gradient is the brand and it stays: primary CTAs, brand moments, progress chrome, and live-glow surfaces render `linear-gradient(135deg, Ballot Ink, Signal Rose 20–50%, Ember Orange)`. This gradient is the primary's default expression; flat Signal Rose is the fallback only where gradients cannot render — text, chips, focus rings, data fills. The gradient never sets type of any size — including large display headings — and never washes page backgrounds.

### Secondary

Omitted. Electa has one accent family; data visualization reuses the ember plus neutral ramps rather than inventing a second brand color.

### Neutral
- **Paper** (oklch(1 0 0)): light-mode background and card surface. Dark mode mirrors to Ink.
- **Ink** (oklch(0.145 0 0)): light-mode foreground text; dark-mode background. Text on tinted backgrounds uses a darker shade of the background hue, never gray.
- **Coal** (oklch(0.205 0 0)): sidebar, deep panels, dark-mode card surface.
- **Muted Caption** (oklch(0.556 0 0)): secondary text. Body copy that must hold 4.5:1 is pulled toward Ink; this value is for true captions and metadata only.
- **Hairline** (oklch(0.922 0 0)): borders, dividers, input strokes.
- **Signal Danger** (oklch(0.577 0.245 27.325)): errors, destructive actions, integrity alerts.
- **Verified Green** (oklch(0.792 0.209 151.711)): success states and verified markers; dark surfaces pair it with a deep green tint, never with light gray text.

### Named Rules
**The One Voice Rule.** The ember family appears on primary actions, current selection, and live state indicators only — a small fraction of any screen. Its rarity is the point.
**The No Warm Default Rule.** Neutrals stay chroma-zero. Warmth comes from the ember accent, typography, and imagery — never from a cream/sand body background.
**The Theme Token Rule.** Every surface resolves through theme tokens in both light and dark mode. Hardcoded `zinc`/`rose`/`black` values that only survive dark mode are prohibited; the light-mode breakage on the polls feed is the open violation to fix.

## 3. Typography

**Display Font:** Instrument Sans (with ui-sans-serif, system-ui fallback)
**Body Font:** Instrument Sans (with ui-sans-serif, system-ui fallback)
**Label/Mono Font:** Fira Code (with ui-monospace, SFMono-Regular fallback)

**Character:** A single well-tuned sans carries everything — headlines, buttons, labels, body, data — with a technical mono reserved for numbers, timestamps, and short labels. No display/body pairing; this is a tool that occasionally makes a speech, not a magazine.

### Hierarchy
- **Display** (700, clamp(2.5rem, 7vw, 4.5rem), 1.1, -0.02em): hero and campaign headlines only. Ceiling is 6rem; letter-spacing never goes below -0.04em. Balanced wrapping required.
- **Headline** (700, 1.875rem, 1.2, -0.02em): section titles on marketing surfaces, page titles in app.
- **Title** (600, 1.25rem, 1.3): card titles, dialog titles, widget headings. The 500/600 weights carry mid-level hierarchy — never jump from 400 to 700.
- **Body** (400, 1rem–1.125rem, 1.6): prose and UI copy. Line length capped at 65–75ch; long prose uses pretty wrapping.
- **Label** (Fira Code 500, 0.75rem, 1.4, 0.08em, uppercase allowed): eyebrows (used sparingly — never above every section), timestamps, vote counts, metadata.

### Named Rules
**The Balance Rule.** Headings h1–h3 always set `text-wrap: balance`; long prose sets `text-wrap: pretty`. No orphaned single words on the last line.
**The Tabular Rule.** Every count, timer, percentage, and leaderboard figure sets tabular figures. Numbers must not jitter as they update live.
**The Mono Earns It Rule.** Fira Code is for data and short labels only — never for page headings or display copy. The mono page titles on the dashboard are the open violation to fix.

## 4. Elevation

Lifted cards over a quiet hall floor. Depth is structural: resting cards float on a small diffuse shadow, interactive lift answers hover, and overlays step up through a fixed vocabulary. No tonal-stacking substitutes, no shadow-less flatness.

### Shadow Vocabulary
- **Resting card** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.05)`): default card lift.
- **Hover lift** (`box-shadow: 0 4px 12px rgb(0 0 0 / 0.08)`): cards and controls under the cursor.
- **Overlay** (`box-shadow: 0 8px 30px rgb(0 0 0 / 0.12)`): dropdowns, sheets, dialogs, tooltips.
- **Ember glow** (`box-shadow: 0 0 6px rgb(244 63 94 / 0.75)`): primary CTA halo, intensifying on hover. Reserved for the primary action only.

### Named Rules
**The One Depth Rule.** A surface gets one depth signal — a border or a shadow, never the 1px-border-plus-wide-soft-shadow ghost card. Cards choose border plus resting shadow at most.
**The Tinted Shadow Rule.** New shadows carry the surface hue (rose-tinted glow on ember actions, neutral diffusion elsewhere). Generic pure-black wide blurs are prohibited.
**The 12px Corner Rule.** Cards top out at 12px radius; controls sit at 4–6px. Full-pill is for tags and buttons only. Radii of 24px and above on cards are forbidden.

## 5. Components

Controls feel refined and restrained: small radii, thin hairlines, exact press feedback, no ornament that does not report state.

### Buttons
- **Shape:** gently squared (4px radius), heights 36px default / 40px large / 48–56px hero. Full-pill never on buttons here.
- **Primary:** ember gradient fill, near-white text, ember glow shadow, semibold. Hover deepens the glow; press answers with `scale(0.98)`; focus shows a 3px ring at 50% strength. Transition 150–250 ms, exponential ease-out.
- **Hover / Focus:** every variant shifts background plus a 1px translate or scale response on press. Instant zero-duration state changes are prohibited.
- **Secondary / Ghost / Tertiary:** secondary is tonal neutral fill; outline is hairline border on paper; ghost is text-only tinting toward accent-fill on hover; link is Signal Rose underlined. Tertiary text links reduce noise where a second button would shout.

### Chips
- **Style:** 6px radius, hairline border, 2px/8px padding, 12px medium label. Selected state fills Signal Rose; unselected stays neutral hairline.
- **State:** category filters use the chip, never full buttons. Active filter is unmistakable at a glance.

### Cards / Containers
- **Corner Style:** softly squared (12px radius).
- **Background:** Paper in light mode, Coal-tinted surface in dark mode — always through theme tokens.
- **Shadow Strategy:** resting shadow at rest per Elevation; hover lift on linked cards only.
- **Border:** 1px Hairline, or nothing where spacing alone separates. Nested cards are forbidden.
- **Internal Padding:** 24px canonical card padding; 16px in dense widgets. Card groups pin CTAs to a shared baseline so buttons align regardless of content length.

### Inputs / Fields
- **Style:** 36px height, 6px radius, hairline stroke on transparent fill, 12px horizontal padding, base-size text.
- **Focus:** border shifts to ring color with a 3px ring at 50% strength. Focus indicators are an accessibility requirement, never optional.
- **Error / Disabled:** error takes Signal Danger border plus matching ring; disabled drops to 50% opacity with no pointer events. Inline messages, never alerts.

### Navigation
- Fixed top bar, transparent at rest, blurring to translucent paper with a hairline bottom border past 10px of scroll. Desktop items use 14px medium type in muted-ink, active item in full ink with an underline marker. Dropdowns float with overlay shadow and staggered 180 ms entrances; mobile collapses to a top sheet with expandable sections and bottom-pinned Masuk/Daftar actions. Current location is always indicated.

### Poll Result Bar (signature component)
- 32px track, 6px radius, muted fill; the winning fill renders Signal Rose (flat) with the leading percentage in tabular figures; labels sit inside the bar in 14px medium type. Live updates pulse the indicator dot; bars never animate `width` on layout — fills resolve via transform-aware updates.

## 6. Do's and Don'ts

### Do:
- **Do** spend the ember on one primary action per screen and let neutrals do the rest (The One Voice Rule).
- **Do** set vote counts, timers, and percentages in tabular Fira Code so live numbers never jitter (The Tabular Rule).
- **Do** balance headings and pretty-wrap prose so no single word orphans (The Balance Rule).
- **Do** ship skeleton loaders shaped like the content, composed empty states that teach the next action, and inline errors on every form.
- **Do** honor `prefers-reduced-motion` on every animation with a crossfade or instant path, and keep task transitions inside 150–250 ms.
- **Do** resolve every color through theme tokens so light and dark mode both hold (The Theme Token Rule).

### Don't:
- **Don't** ship the generic AI SaaS look PRODUCT.md forbids: purple/blue gradients, the centered hero with three equal feature cards, pill "NEW" badges, templated landing scaffolding.
- **Don't** use gradient text anywhere — `background-clip: text` gradients are decorative, never meaningful. Emphasis comes from weight and size in a single solid color. (The CTA headline gradient is the open violation to remove.)
- **Don't** use `border-left` thicker than 1px as a colored accent stripe on cards, list items, or alerts.
- **Don't** pair a 1px border with a 16px-plus soft shadow on the same element, and don't round cards past 12px.
- **Don't** set page headings or display copy in Fira Code, repeat tiny uppercase eyebrows above every section, or number sections 01/02/03 unless the order itself carries information.
- **Don't** hardcode dark-only `zinc`/`black` surfaces that shatter light mode, leave `href="#"` dead links, or gate content visibility on animation classes that never fire for reduced-motion users and headless renderers.
