import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { TimelineEntry } from '../types';
import { Icon } from './Icon';
import { formatDate } from '../utils';

const TYPE_ICON: Record<TimelineEntry['type'], string> = {
  project: 'Rocket',
  'project-started': 'Rocket',
  'project-completed': 'CheckCircle2',
  achievement: 'Trophy',
  milestone: 'Flag',
  education: 'GraduationCap',
  experience: 'Briefcase',
};

const TYPE_COLOR: Partial<Record<TimelineEntry['type'], string>> = {
  'project-completed': 'var(--qf-color-success)',
};

/**
 * Three-tier size scale, chosen by significance rather than frequency:
 * education/experience/achievement are the milestones worth slowing down for;
 * milestone/project-completed are solid, ordinary accomplishments; the
 * auto-generated project-started entries (the most numerous, least
 * individually significant) get the compact treatment. Marker heights (44/32/24)
 * and their matching line-start offsets (top-11/top-8/top-6) share the same
 * Tailwind scale step on purpose, so the connecting rail always begins exactly
 * where each marker ends regardless of tier.
 */
type TimelineSize = 'lg' | 'md' | 'sm';

const TYPE_SIZE: Record<TimelineEntry['type'], TimelineSize> = {
  education: 'lg',
  experience: 'lg',
  achievement: 'lg',
  milestone: 'md',
  project: 'md',
  'project-completed': 'md',
  'project-started': 'sm',
};

const SIZE_CONFIG: Record<
  TimelineSize,
  { marker: string; icon: number; lineTop: string; gap: string; title: string; desc: string }
> = {
  lg: { marker: 'h-11 w-11 border-2', icon: 20, lineTop: 'top-11', gap: 'pb-12', title: 'text-base font-medium', desc: 'text-sm' },
  md: { marker: 'h-8 w-8 border-2', icon: 14, lineTop: 'top-8', gap: 'pb-8', title: 'text-sm', desc: 'text-sm' },
  sm: { marker: 'h-6 w-6 border', icon: 11, lineTop: 'top-6', gap: 'pb-5', title: 'text-sm', desc: 'text-xs' },
};

export function TimelineItem({ entry, index = 0, isLast = false }: { entry: TimelineEntry; index?: number; isLast?: boolean }) {
  const color = TYPE_COLOR[entry.type] ?? 'var(--qf-color-primary)';
  const size = SIZE_CONFIG[TYPE_SIZE[entry.type] ?? 'md'];

  return (
    <motion.div
      className={clsx('relative flex gap-4', size.gap)}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.04 }}
    >
      <div className="flex w-12 shrink-0 justify-center">
        <span
          className={clsx('z-10 flex shrink-0 items-center justify-center rounded-qfull bg-surface', size.marker)}
          style={{ borderColor: `${color}66`, color }}
        >
          <Icon name={entry.icon ?? TYPE_ICON[entry.type]} size={size.icon} />
        </span>
      </div>
      {!isLast && <div className={clsx('absolute bottom-0 left-6 w-px bg-border', size.lineTop)} />}
      <div className="min-w-0 flex-1 pt-1">
        <p className="text-xs text-text-muted">{formatDate(entry.date)}</p>
        <p className={clsx('font-heading text-text-primary', size.title)}>{entry.title}</p>
        <p className={clsx('text-text-secondary', size.desc)}>{entry.description}</p>
      </div>
    </motion.div>
  );
}
