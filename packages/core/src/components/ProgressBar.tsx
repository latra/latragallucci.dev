import { motion } from 'framer-motion';
import clsx from 'clsx';

export interface ProgressBarProps {
  /** 0-100 */
  value: number;
  color?: string;
  className?: string;
  label?: string;
}

export function ProgressBar({ value, color = 'var(--qf-color-primary)', className, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={clsx('w-full', className)}>
      <div className="h-2 w-full overflow-hidden rounded-qfull bg-surface-hover">
        <motion.div
          className="h-full rounded-qfull"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      {label && <p className="mt-1 text-xs text-text-muted">{label}</p>}
    </div>
  );
}
