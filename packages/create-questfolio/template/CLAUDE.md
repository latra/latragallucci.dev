## Design Context

This package has captured Impeccable design context:

- `PRODUCT.md` — strategic brief: brand register, web platform, primary audience (recruiters/hiring managers), positioning around the gamification hook, conversion CTA, and design principles.
- `DESIGN.md` — visual system spec ("The Cyber Nebula"): the dark signal-lit palette, Space Grotesk/Inter/JetBrains Mono typography, flat-by-default elevation with a rationed cyan glow, and component rules (buttons, badges, cards, achievement cards).
- `.impeccable/design.json` — machine-readable sidecar extending DESIGN.md (tonal ramps, shadows, motion tokens, component HTML/CSS snippets) for the live variant panel.
- `.impeccable/live/config.json` — pre-configured live mode (injects into `index.html`, no CSP patch needed).

Read PRODUCT.md and DESIGN.md before making any visual changes in this package.
