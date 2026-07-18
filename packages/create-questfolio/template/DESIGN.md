---
name: Paula Gallucci Zurita — Questfolio
description: A gamified developer portfolio — near-monochrome, quiet, one signal color, no glow.
colors:
  background: "#0d0f13"
  surface: "#17181d"
  surface-hover: "#20232a"
  border: "#292c34"
  primary: "#22d3ee"
  primary-foreground: "#04222b"
  secondary: "#a29cbd"
  accent: "#c199ab"
  success: "#34d399"
  warning: "#fbbf24"
  danger: "#f87171"
  text-primary: "#f1f2f7"
  text-secondary: "#b0b3bc"
  text-muted: "#878a95"
  tier-bronze: "#cd7f32"
  tier-silver: "#c0c0c0"
  tier-gold: "#ffd700"
  tier-platinum: "#67e8f9"
typography:
  display:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: "2.5rem"
    letterSpacing: "normal"
  headline:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: "2rem"
    letterSpacing: "normal"
  title:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.75rem"
    letterSpacing: "normal"
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: "normal"
  label:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: "1rem"
    letterSpacing: "0.1em"
  data:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: "2rem"
    letterSpacing: "normal"
rounded:
  sm: "3px"
  md: "3px"
  lg: "3px"
  full: "3px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  badge-primary:
    backgroundColor: "rgba(34, 211, 238, 0.1)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-default:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-success:
    backgroundColor: "rgba(52, 211, 153, 0.1)"
    textColor: "{colors.success}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-warning:
    backgroundColor: "rgba(251, 191, 36, 0.1)"
    textColor: "{colors.warning}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-danger:
    backgroundColor: "rgba(248, 113, 113, 0.1)"
    textColor: "{colors.danger}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-muted:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
---

# Design System: Paula Gallucci Zurita — Questfolio

## 1. Overview

**Creative North Star: "Quiet Signal"**

The portfolio was "The Cyber Nebula": three neon signal colors and a cyan glow against a blue-violet-tinted void. This revision strips that back to one instrument, dialed low. The background, surfaces, borders, and text are now nearly grayscale — the same cool undertone as before, but pulled down to a whisper of chroma rather than a visible tint. Against that quiet field, exactly one color still fires: Signal Cyan. No glow bloom carries it anymore; the color itself, used sparingly, is the whole signal. Violet and magenta didn't disappear — they're still present as barely-there dusty echoes (muted, unsaturated versions of their old selves) in case anything ever needs a second neutral-ish tone, but they no longer read as "color" to a viewer. Corners are uniformly 3px everywhere in the system — not the sharp 0px of a terminal, not the soft 10–18px pill language of a generic SaaS product, but a single quiet value repeated without variation. A small cyan dot trails the real cursor with a touch of spring inertia: the one deliberately alive, playful gesture in an otherwise very quiet system.

This system explicitly rejects the generic SaaS-neon-gradient look — gradient-clip text, glassmorphism panels, purple-to-pink hero blobs, drop-shadow glows. It also rejects its own former self: no bloom, no multi-color signal chorus, no soft varied radius scale. Where the previous system used glow to say "look here," this one uses color scarcity and precise, repeated geometry instead.

**Key Characteristics:**
- Near-monochrome neutrals (background, surface, border, text) — the same cool undertone as before, chroma reduced to a whisper
- Exactly one active color in the whole system: Signal Cyan. No shadow-based glow anywhere — presence comes from the color itself, used rarely
- One uniform 3px corner radius everywhere — no scale, no pills, no sharp 0px terminal look either; the flatness of the value itself is the point
- A small cyan cursor-trail dot with spring inertia is the system's one overtly playful gesture, always paired with a native, visible cursor
- Locked or pending content stays visible as grayscale + dashed border — curiosity over absence
- Motion is quick and functional (120–420ms), never bouncy or celebratory; the cursor dot is the one place spring easing is used, and only there

## 2. Colors: The Quiet Signal Palette

Near-grayscale neutrals carry almost the entire surface; one color — Signal Cyan — is allowed to be seen as color at all.

### Primary
- **Signal Cyan** (#22d3ee): the only color in the system that reads as "color" to a viewer — primary CTAs, the active nav state, focus rings, timeline highlights, and the cursor-trail dot. Unchanged from the previous system: the identity anchor that survives the quieting-down. No longer paired with a glow; the color carries itself.

### Secondary
- **Static Violet, muted** (#a29cbd): a desaturated echo of the system's former violet, now closer to a cool gray-lavender than a color. Held in reserve as a quiet alternate neutral; not currently used by any shipped component.

### Tertiary
- **Alert Magenta, muted** (#c199ab): a desaturated echo of the former magenta accent, now a dusty rose-gray. Also held in reserve, not currently wired into a component. If either muted tone is ever activated, it must stay this quiet — reintroducing full saturation here would undo the whole point of this revision.

### Neutral
- **Quiet Void** (#0d0f13): page background — the same cool undertone as before, chroma cut by roughly two-thirds.
- **Quiet Panel** (#17181d): card and surface background.
- **Quiet Panel Hover** (#20232a): hover state for interactive surfaces.
- **Quiet Line** (#292c34): every border in the system — solid at rest, dashed for locked/pending content.
- **Signal White** (#f1f2f7): primary text.
- **Muted Slate** (#b0b3bc): secondary text — bios, descriptions, body copy.
- **Deep Slate** (#878a95): tertiary text — timestamps, micro-labels, muted/disabled states. Holds ≥4.5:1 contrast against every surface in the system (5.57:1 on background, 5.12:1 on Quiet Panel, 4.57:1 on Quiet Panel Hover, its worst case).

### Status
- **Success** (#34d399), **Warning** (#fbbf24), **Danger** (#f87171): semantic feedback, unchanged. Always a 10%-opacity tint with full-strength text — never a solid fill. These are status signals, not brand color, and sit outside the "one signal color" rule.

### Achievement Tiers
- **Bronze** (#cd7f32), **Silver** (#c0c0c0), **Gold** (#ffd700), **Platinum** (#67e8f9): ring and icon color on an unlocked achievement, unchanged. Like Status colors, these are functional (they encode rarity, the way a trophy case does) rather than decorative brand color, so they sit outside the one-signal-color rule too.

### Light Mode

The frontmatter above documents the dark theme (`config/theme.dark.json`), the default. A parallel light theme lives in `config/theme.light.json`, applied by `ThemeModeProvider` when the visitor is in light or auto (system-light) mode. It is not a naive inversion — every color that's used as literal text or an icon on top of a page surface (Signal Cyan included) is independently re-tuned in OKLCH, same hue, different lightness, so it still clears 4.5:1 against every light surface it appears on:

- **Background** #f7f8fb, **Surface** #edeef3, **Surface Hover** #dfe1e7, **Border** #cbced4 — the same cool near-neutral hue family as the dark theme, mirrored to the light end instead of a flat invert (surface sits a step *darker* than background, same relationship as the dark theme's surface sitting a step *lighter* than its background).
- **Signal Cyan, light** (#006b84): the bright #22d3ee used in dark mode drops to 1.7:1 on a white-ish background — unusable as text. This deeper teal-cyan keeps the exact same hue (~211.5°) but is re-lit for legibility; it's used for both the button fill and standalone text/links, so buttons switch their foreground to near-white (`primaryForeground: #f7f8fb`) in light mode rather than the dark theme's navy-on-bright-cyan pairing.
- **Status and tier colors** are all independently re-tuned the same way (e.g. Success #007341, Danger #b5333a, Gold #845d00) — the dark theme's bright values are dark-background-only and fail badly on light surfaces.
- **Shadows** sm/md/lg use a much lighter black alpha (0.08–0.1 vs dark's 0.35–0.45) so they don't read as muddy smudges on a light surface. `glow` stays `none` — the No-Glow Rule holds in both modes.

### Named Rules
**The One Signal Rule.** Signal Cyan is the only color in the system allowed to read as "color" to a viewer. Violet and magenta exist only as muted, near-gray echoes held in reserve — if either is ever activated, it must stay this quiet. Status colors and achievement tiers are functional, not brand color, and are the only other exception.
**The No-Glow Rule.** Nothing in this system casts a colored shadow. Presence is carried by the color and the geometry themselves, at rest, not by a bloom that appears on top of them. If an element needs to stand out, make it the one cyan thing on the screen — don't light it up.
**The Re-Lit, Not Inverted Rule.** Light mode is not `background: white` with every color otherwise untouched. Any color used as text, an icon, or a small fill must be re-tuned per mode to clear contrast — same hue, different lightness — never assumed to carry over from dark mode unchanged.

## 3. Typography

**Display Font:** Space Grotesk (with system-ui, sans-serif)
**Body Font:** Inter (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** Unchanged by this revision. Space Grotesk's geometric, faintly technical letterforms carry every heading, title, and name; Inter disappears into body copy so it never competes; JetBrains Mono turns every stat into a console readout. Three families, three distinct jobs — never blended inside one text block.

### Hierarchy
- **Display** (400, 2.25rem / 2.5rem line-height): the profile name in the hero section — the only place Display appears.
- **Headline** (400, 1.5rem / 2rem): rare, high-emphasis section closers (e.g. "Let's talk").
- **Title** (400, 1.125rem / 1.75rem): every section header ("Stats", "Featured projects") and card titles (project and achievement names).
- **Body** (400, 1rem / 1.5, Inter, Muted Slate): bio copy and descriptions; cap at 65–75ch if a paragraph runs long.
- **Label** (600, 0.75rem / 1rem, letter-spacing 0.1em, uppercase, Deep Slate): stat-card labels and other micro-labels — always uppercase, always tracked wide.
- **Data** (400, 1.5rem / 2rem, JetBrains Mono, Signal White): the numeric readouts on stat cards (XP, hours, counts) — the one place monospace substitutes for the heading font.

### Named Rules
**The One Heading Font Rule.** Space Grotesk is the only typeface used for anything that names or labels a section or entity — headings, titles, nav items, the profile name. Inter is reserved for sentences; JetBrains Mono is reserved for numbers. None of the three ever substitutes for another.

## 4. Elevation

Flat, with no exception now. Cards, badges, the navbar, panels, and even the hero avatar and primary CTAs carry zero box-shadow — depth comes only from a 1px Quiet Line border against Quiet Void. The previous system's one exception (Shadow Glow, a cyan bloom on the avatar and CTAs) has been removed entirely; the `glow` shadow token is now set to `none`. If a shipped component ever needs to signal "this is the one thing to look at," the answer is Signal Cyan itself, not a shadow.

### Shadow Vocabulary
- **Glow** — retired. The token exists (`shadows.glow: "none"`) for schema compatibility but resolves to no shadow. Do not reintroduce a glow value here; use color or the cursor dot's own hover response instead.
- **sm** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.4)`): defined in tokens, not used by a shipped component — reserved for low-emphasis lift.
- **md** (`box-shadow: 0 4px 12px rgb(0 0 0 / 0.35)`): reserved for future overlay-style surfaces (dropdowns, popovers).
- **lg** (`box-shadow: 0 12px 32px rgb(0 0 0 / 0.45)`): reserved for modal-level surfaces that need to lift clearly off the page.

### Named Rules
**The Flat-By-Default Rule.** No component gets a shadow just for being a container, and — as of this revision — no component gets a shadow for being important either. Shadows are reserved for genuine overlay surfaces that lift off the page (modals, dropdowns), not for emphasis.

## 5. Components

### Buttons
- **Shape:** the system's uniform 3px radius (`{rounded.md}`) — quietly rounded, never a pill, never fully sharp.
- **Primary:** Signal Cyan background, dark navy-tinted text (#04222b), no shadow, medium-weight label. One per screen — the single dominant action ("View projects", the mailto CTA).
- **Hover / Focus:** a brightness lift only (`filter: brightness(1.1)`) — no color swap, no shadow, no scale transform.
- **Ghost / Secondary:** transparent background, Quiet Line border, Muted Slate text; border brightens to Signal Cyan at 50% opacity and text lightens to Signal White on hover.

### Badges (Signature Component)
- **Style:** the system's uniform 3px radius (`{rounded.full}`, no longer a true pill), a 10%-opacity tint of the semantic color as background, the full-strength color as text, with an optional 11px leading icon.
- **Variants:** primary (cyan), success, warning, danger, default (surface-hover gray), muted (transparent, muted text) — one variant per project or achievement status.
- **The tell of a broken badge:** if it reads as a solid-color block instead of a tinted tag, the system has been violated — the 10% tint is the whole point.

### Cards / Containers
- **Corner Style:** the system's uniform 3px radius (`{rounded.lg}`) for narrative content cards (project, achievement). Stat cards remain the deliberate exception at 0px (`rounded-none`) — their square edge marks them as a data tile, now the *only* place in the system with a visibly different corner treatment from everything else.
- **Background:** Quiet Panel, brightening to Quiet Panel Hover on interactive hover.
- **Shadow Strategy:** none — a 1px Quiet Line border does the work instead.
- **Border:** solid Quiet Line at rest; dashed Quiet Line + grayscale + reduced opacity for locked or pending content — this is the primary "not yet unlocked" signal, not the lock icon alone.
- **Internal Padding:** 12–16px for compact cards, 32px for hero/CTA panels.

### Inputs / Fields
- **Style:** Quiet Line border, Quiet Panel background, the system's uniform 3px radius (`{rounded.md}`).
- **Focus:** border brightens to Signal Cyan at 50% opacity — no glow, no background change.

### Navigation
- **Style:** sticky top bar, Quiet Panel at 80% opacity with backdrop-blur, Quiet Line bottom border.
- **Active item:** Signal Cyan text on a 10%-tinted cyan background, 3px radius.
- **Default / Hover:** Muted Slate text, brightening to Signal White with a Quiet Panel Hover background on hover.
- **Mobile:** nav items wrap onto additional lines rather than collapsing into a drawer.

### Achievement Card (Signature Component)
Tier color (bronze / silver / gold / platinum) drives the icon ring's border and icon color when unlocked. Locked and mysterious states drop tier color entirely, desaturating to Quiet Line + Deep Slate and swapping the icon for a lock glyph. The XP reward badge always keeps its cyan color, even on an otherwise-muted locked entry — the reward is the one thing that should never gray out.

### Cursor Dot (Signature Component, new)
A small (24px, visually smaller at rest) Signal Cyan dot that trails the real, always-visible native cursor with spring inertia (`useSpring`, damping 28 / stiffness 350 / mass 0.4) — a soft, slightly lagging follow rather than a 1:1 lock. At rest it's small and low-opacity (scale 0.35, opacity 0.5); hovering any interactive element (links, buttons, inputs, or an element explicitly marked `data-cursor-active`) grows it to full size and opacity via a transform-only, ease-out-quint transition. Rendered once at the root layout, above everything else in the stacking order (`--qf-z-cursor`). Automatically absent on coarse-pointer (touch) devices and when the OS requests reduced motion — it is a decorative companion to the cursor, never a replacement for it, and no functionality ever depends on it being present.

### Theme Mode Toggle (Signature Component, new)
A single icon button in the navbar, one control for all three modes rather than a 3-way segmented switch. Each click cycles light → dark → auto → light; the icon (Sun / Moon / MonitorSmartphone) crossfades with a small rotate on change (150ms, ease-out-quint), and the accessible label always states both the current mode and what the next click switches to ("Light theme. Switch to dark mode."). Mode is persisted to `localStorage` (`qf-theme-mode`) and, in auto, tracks live OS `prefers-color-scheme` changes without a reload. Same shape, border, and hover treatment as the Ghost Button — it's chrome, not a CTA, and shouldn't compete visually with one.

### Timeline (Signature Component, new)
Three size tiers, chosen by significance, not frequency: education / experience / achievement render **large** (44px marker, 2px border, `text-base font-medium` title, `pb-12` breathing room); milestone / project-completed render **medium** (32px, 2px border, `text-sm`, `pb-8` — the previous universal size); the auto-generated project-started entries — the most numerous, least individually significant — render **small** (24px, 1px border, `text-sm`/`text-xs`, `pb-5`). The connecting rail stays a single straight line regardless: marker height and its line-start offset always share the same Tailwind step (44px marker → line starts at 44px, and so on), so the rail never visibly kinks as marker size changes down the list.

## 6. Do's and Don'ts

### Do:
- **Do** treat Signal Cyan as the only color that reads as "color" — everything else is a near-gray neutral, a muted echo, or a functional status/tier color.
- **Do** keep every corner in the system at the same 3px radius — the uniformity is the point, not the specific value.
- **Do** use a 1px Quiet Line border, never a shadow, to separate any surface from Quiet Void.
- **Do** keep the cursor dot subtle and skip it entirely on touch devices and under reduced motion.
- **Do** render locked or pending content as grayscale + dashed border, never simply omit it — the point is curiosity, not absence.
- **Do** keep Space Grotesk for anything that names a section or entity, Inter for sentences, and JetBrains Mono for numbers — never blend the three within one text block.
- **Do** re-tune any new color for light mode independently in `theme.light.json` — same hue, a lightness that actually clears contrast — rather than assuming a dark-mode value carries over.

### Don't:
- **Don't** use gradient-clip text, glassmorphism panels, or purple-to-pink hero blobs — the generic SaaS-neon-dashboard look this system explicitly rejects.
- **Don't** add a glow, bloom, or any colored shadow to any element, no matter how important — this system explicitly retired that move. Reach for the one signal color instead.
- **Don't** use a soft varied radius scale (4/10/18px-style pills and rounded cards) — that's the generic SaaS look this revision moved away from. One radius, everywhere.
- **Don't** reactivate the muted secondary/tertiary echoes at full saturation — if they're ever used, they stay as quiet as they are now.
- **Don't** fill a badge with a solid color — the 10%-opacity tint is the badge.
- **Don't** ship a light-mode color that's a naive `background: white` inversion of the dark palette without checking its contrast — Signal Cyan alone drops from 10.6:1 to 1.7:1 doing that.
- **Don't** round a stat card's corners — its square edge is what marks it as a data tile, now the system's one deliberate exception.
- **Don't** hide the native cursor or make any interaction depend on the cursor dot being visible — it's decorative, not functional.
- **Don't** add bounce/elastic easing or celebratory motion (confetti, cartoon pop-ins) to achievement unlocks — the tone is earned and quiet, never toy-like.
