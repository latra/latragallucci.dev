import { createContext, useEffect, type ReactNode } from 'react';
import type { ThemeConfig } from '../types';

export const ThemeContext = createContext<ThemeConfig | null>(null);

function toCssVars(theme: ThemeConfig): Record<string, string> {
  return {
    '--qf-color-background': theme.colors.background,
    '--qf-color-surface': theme.colors.surface,
    '--qf-color-surface-hover': theme.colors.surfaceHover,
    '--qf-color-border': theme.colors.border,
    '--qf-color-primary': theme.colors.primary,
    '--qf-color-primary-foreground': theme.colors.primaryForeground,
    '--qf-color-secondary': theme.colors.secondary,
    '--qf-color-accent': theme.colors.accent,
    '--qf-color-success': theme.colors.success,
    '--qf-color-warning': theme.colors.warning,
    '--qf-color-danger': theme.colors.danger,
    '--qf-color-text-primary': theme.colors.textPrimary,
    '--qf-color-text-secondary': theme.colors.textSecondary,
    '--qf-color-text-muted': theme.colors.textMuted,
    '--qf-tier-bronze': theme.achievementTiers.bronze,
    '--qf-tier-silver': theme.achievementTiers.silver,
    '--qf-tier-gold': theme.achievementTiers.gold,
    '--qf-tier-platinum': theme.achievementTiers.platinum,
    '--qf-font-heading': theme.typography.fontHeading,
    '--qf-font-body': theme.typography.fontBody,
    '--qf-font-mono': theme.typography.fontMono,
    '--qf-radius-sm': theme.radii.sm,
    '--qf-radius-md': theme.radii.md,
    '--qf-radius-lg': theme.radii.lg,
    '--qf-radius-full': theme.radii.full,
    '--qf-shadow-sm': theme.shadows.sm,
    '--qf-shadow-md': theme.shadows.md,
    '--qf-shadow-lg': theme.shadows.lg,
    '--qf-shadow-glow': theme.shadows.glow,
    '--qf-duration-fast': theme.animation.enabled ? theme.animation.durationFast : '0ms',
    '--qf-duration-base': theme.animation.enabled ? theme.animation.durationBase : '0ms',
    '--qf-duration-slow': theme.animation.enabled ? theme.animation.durationSlow : '0ms',
  };
}

export interface ThemeProviderProps {
  theme: ThemeConfig;
  children: ReactNode;
}

/** Applies theme.json as CSS custom properties on <html>, so no component ever hardcodes a color. */
export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    const vars = toCssVars(theme);
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
    root.dataset.qfBackground = theme.backgroundPattern ?? 'none';
    root.dataset.qfAnimated = String(theme.animation.enabled);
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
