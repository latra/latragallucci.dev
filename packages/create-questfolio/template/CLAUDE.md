## Design Context

This package is Paula's personal site. Its design context:

- `PRODUCT.md` — audience (recruiters, research leads, collaborators), positioning (serious and professional, no gamification), CTA (email).
- `DESIGN.md` — the visual system: Schibsted Grotesk, near-white/near-black neutrals, one oxide-red accent, hairline-ruled indexes, no cards/glow/eyebrows.

The site's pages and components live in `src/site/`; tokens and styles in `src/main.css`. Content still comes from `config/profile.json` and `content/projects` / `content/timeline` via the `questfolio` loaders. `.impeccable/design.json` describes the previous gamified system and is out of date.

Read PRODUCT.md and DESIGN.md before making any visual changes in this package.
