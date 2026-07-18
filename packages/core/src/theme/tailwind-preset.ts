/**
 * Tailwind v3-style preset mapping utility colors to the CSS custom
 * properties written by ThemeProvider. Consuming apps extend it in their
 * own tailwind config: `presets: [questfolioPreset]`.
 */
export const questfolioPreset = {
  theme: {
    extend: {
      colors: {
        background: 'var(--qf-color-background)',
        surface: 'var(--qf-color-surface)',
        'surface-hover': 'var(--qf-color-surface-hover)',
        border: 'var(--qf-color-border)',
        primary: 'var(--qf-color-primary)',
        'primary-foreground': 'var(--qf-color-primary-foreground)',
        secondary: 'var(--qf-color-secondary)',
        accent: 'var(--qf-color-accent)',
        success: 'var(--qf-color-success)',
        warning: 'var(--qf-color-warning)',
        danger: 'var(--qf-color-danger)',
        'text-primary': 'var(--qf-color-text-primary)',
        'text-secondary': 'var(--qf-color-text-secondary)',
        'text-muted': 'var(--qf-color-text-muted)',
        'tier-bronze': 'var(--qf-tier-bronze)',
        'tier-silver': 'var(--qf-tier-silver)',
        'tier-gold': 'var(--qf-tier-gold)',
        'tier-platinum': 'var(--qf-tier-platinum)',
      },
      fontFamily: {
        heading: 'var(--qf-font-heading)',
        body: 'var(--qf-font-body)',
        mono: 'var(--qf-font-mono)',
      },
      borderRadius: {
        qsm: 'var(--qf-radius-sm)',
        qmd: 'var(--qf-radius-md)',
        qlg: 'var(--qf-radius-lg)',
        qfull: 'var(--qf-radius-full)',
      },
      boxShadow: {
        qsm: 'var(--qf-shadow-sm)',
        qmd: 'var(--qf-shadow-md)',
        qlg: 'var(--qf-shadow-lg)',
        glow: 'var(--qf-shadow-glow)',
      },
      transitionDuration: {
        fast: 'var(--qf-duration-fast)',
        base: 'var(--qf-duration-base)',
        slow: 'var(--qf-duration-slow)',
      },
    },
  },
};
