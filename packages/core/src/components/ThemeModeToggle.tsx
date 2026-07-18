import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icon';
import { useThemeModeContext } from '../theme/ThemeModeProvider';
import type { ThemeMode } from '../hooks/useThemeMode';

const MODE_ICON: Record<ThemeMode, string> = {
  light: 'Sun',
  dark: 'Moon',
  auto: 'MonitorSmartphone',
};

const MODE_LABEL: Record<ThemeMode, string> = {
  light: 'Light theme',
  dark: 'Dark theme',
  auto: 'Auto theme (follows system)',
};

const NEXT_MODE: Record<ThemeMode, ThemeMode> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
};

/** Single button that cycles light -> dark -> auto -> light, persisted via useThemeMode. */
export function ThemeModeToggle() {
  const { mode, cycleMode } = useThemeModeContext();

  return (
    <button
      type="button"
      onClick={cycleMode}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-qmd border border-border text-text-secondary transition-colors duration-fast hover:border-primary/50 hover:text-primary"
      aria-label={`${MODE_LABEL[mode]}. Switch to ${MODE_LABEL[NEXT_MODE[mode]].toLowerCase()}.`}
      title={MODE_LABEL[mode]}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          className="flex items-center justify-center"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon name={MODE_ICON[mode]} size={16} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
