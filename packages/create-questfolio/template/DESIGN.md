---
name: Paula Gallucci Zurita — personal site
description: Professional, typographic portfolio. One typeface, near-white ground, one oxide-red accent used as a single colour field.
colors:
  bg: "oklch(0.985 0.002 30)"
  surface: "oklch(0.955 0.005 30)"
  line: "oklch(0.885 0.006 30)"
  ink: "oklch(0.21 0.012 30)"
  ink-2: "oklch(0.43 0.012 30)"
  accent: "oklch(0.53 0.19 32)"
  field: "oklch(0.53 0.19 32)"
typography:
  family: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
  mono: "ui-monospace (code in project write-ups only)"
rounded: 0
---

# Design System

All tokens live in `src/main.css` (`:root`, with a `prefers-color-scheme: dark` override). The site components live in `src/site/`.

## Overview

A quiet, typographic site. Structure comes from content — an intro, an index of projects, a dated experience list — not from cards or decoration. Hairline rules separate rows; the only filled panel is the featured project; the only colour field is the contact band.

## Colour

- **Strategy:** restrained, with one committed moment. Neutrals are true near-white / near-black with a whisper of the accent hue (30°).
- **Accent (oxide red):** links on hover, active nav underline, the "in progress" status, focus rings, and the contact band as a full field. Never a glow, gradient, or card edge.
- **Dark mode** follows the OS; the accent is re-lit (L 0.73) for text and darkened (L 0.46) for the field so white text keeps contrast.

## Typography

Schibsted Grotesk only, mixed case everywhere, weights 400–600. Scale: `--step--1` 0.875rem → `--step-4` clamp(2.75rem…5.5rem). Display headings use -0.035em tracking; no uppercase labels, no letter-spaced kickers. Dates use tabular numerals.

## Layout

- Container 74rem, fluid gutter `clamp(1rem, 4vw, 2.5rem)`, section spacing `clamp(4rem…7.5rem)`.
- Project index rows: years | title + description | stack + status (stacks on mobile).
- Project detail: sticky facts column (period, status, stack, area, links) beside a 68ch prose column.

## Components

- **Button:** solid ink, square, turns accent on hover. One per view.
- **Status:** small text with a dot — filled for in progress (accent) and completed, hollow for concept / discontinued.
- **Feature panel:** the one `--surface` block on the home page, for the featured project.

## Motion

Hover only: 150ms colour changes and a small arrow nudge on project rows. No entrance animations; content is never gated on motion. Reduced motion disables transitions.

## Don'ts

No rounded cards, shadows, glows, gradient text, eyebrows, numbered section markers, stat rows, XP/achievement vocabulary, or condensed caps with tracking.
