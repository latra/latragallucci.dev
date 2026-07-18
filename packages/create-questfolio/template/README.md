# My Questfolio

Portfolio generated with [Questfolio](https://github.com/), a gamified portfolio framework.
**You never need to touch `src/`** to add your content.

## How to customize it

- `config/profile.json` — your name, photo, bio, social links.
- `config/theme.dark.json` / `config/theme.light.json` — colors, typography, radii, shadows,
  animations for each mode. The toggle button in the navbar cycles light → dark → auto (follows
  the visitor's system setting).
- `config/navigation.json` — the menu items.
- `config/skills.json` — optional icon/color/category per technology (XP and level are
  calculated automatically).
- `content/projects/*.mdx` — one file per project. The frontmatter defines status,
  categories, technologies, difficulty, progress, hours invested, etc. The Markdown body is
  the project's long description. Only `status: completed` looks "unlocked"; every other
  status is shown with a dimmed/pending look (though its content and links stay visible),
  and `status: locked` hides the project entirely behind `???`. If you add `updatedAt` to a
  completed project, a second "mission completed" timeline event is generated automatically
  (in addition to the start event).
- `content/achievements/*.mdx` — your achievements, Steam/PlayStation Trophies style.
  `status` can be `unlocked` (earned, full color), `locked` (not earned yet, but the name/
  icon/description stay visible, shown grayed out as a roadmap), or `mysterious` (not
  earned yet and intentionally hidden behind `???`, like a secret trophy).
- `content/posts/*.mdx` — articles and publications. Use `externalUrl` if the article lives
  on another platform (dev.to, Medium...) instead of writing it here.
- `content/timeline/*.mdx` — manual milestones (education, work experience...). Projects
  (start and, if applicable, completion) and unlocked achievements are added to the
  timeline automatically.

Add or delete `.mdx` files freely: they're picked up automatically when the dev server
starts, nothing needs to be registered anywhere.

## Commands

```bash
npm install
npm run dev       # development server
npm run build     # production build
npm run typecheck # type checking
```
