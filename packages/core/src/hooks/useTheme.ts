import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';
import type { ThemeConfig } from '../types';

export function useTheme(): ThemeConfig {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a <ThemeProvider>');
  return ctx;
}
