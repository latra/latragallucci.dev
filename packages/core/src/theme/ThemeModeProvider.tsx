import { createContext, useContext, type ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { useThemeMode, type ThemeMode, type ResolvedThemeMode } from '../hooks/useThemeMode';
import type { ThemeConfig } from '../types';

interface ThemeModeContextValue {
  mode: ThemeMode;
  resolvedMode: ResolvedThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export interface ThemeModeProviderProps {
  light: ThemeConfig;
  dark: ThemeConfig;
  children: ReactNode;
}

/**
 * Resolves light/dark/auto mode (via useThemeMode) and applies the matching
 * ThemeConfig through the existing single-theme ThemeProvider. Use this
 * instead of <ThemeProvider> directly when a site ships both a light and a
 * dark ThemeConfig and wants the mode toggle to work.
 */
export function ThemeModeProvider({ light, dark, children }: ThemeModeProviderProps) {
  const { mode, resolvedMode, setMode, cycleMode } = useThemeMode();
  const theme = resolvedMode === 'light' ? light : dark;

  return (
    <ThemeModeContext.Provider value={{ mode, resolvedMode, setMode, cycleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeModeContext(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeModeContext must be used within a <ThemeModeProvider>');
  return ctx;
}
