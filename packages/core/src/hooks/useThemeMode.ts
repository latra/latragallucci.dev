import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ResolvedThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'qf-theme-mode';

function getSystemPreference(): ResolvedThemeMode {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function readStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto';
}

/**
 * Tracks the user's light/dark/auto preference, persisted to localStorage and
 * resolved against the live OS `prefers-color-scheme` when set to "auto".
 * The `<html data-qf-mode>` attribute this writes matches the one set by the
 * blocking inline script in index.html, so there's no flash of the wrong theme.
 */
export function useThemeMode() {
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode);
  const [systemPreference, setSystemPreference] = useState<ResolvedThemeMode>(getSystemPreference);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = () => setSystemPreference(mql.matches ? 'light' : 'dark');
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const cycleMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light');
  }, [mode, setMode]);

  const resolvedMode: ResolvedThemeMode = mode === 'auto' ? systemPreference : mode;

  useEffect(() => {
    document.documentElement.dataset.qfMode = resolvedMode;
  }, [resolvedMode]);

  return { mode, resolvedMode, setMode, cycleMode };
}
