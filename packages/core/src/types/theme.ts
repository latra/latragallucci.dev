export interface ThemeColors {
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export interface AchievementTierColors {
  bronze: string;
  silver: string;
  gold: string;
  platinum: string;
}

export interface ThemeTypography {
  fontHeading: string;
  fontBody: string;
  fontMono: string;
}

export interface ThemeRadii {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  glow: string;
}

export interface ThemeAnimation {
  enabled: boolean;
  durationFast: string;
  durationBase: string;
  durationSlow: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  achievementTiers: AchievementTierColors;
  typography: ThemeTypography;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  animation: ThemeAnimation;
  backgroundPattern?: 'none' | 'grid' | 'dots' | 'scanlines';
}
