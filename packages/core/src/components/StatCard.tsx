import { motion } from 'framer-motion';
import { Icon } from './Icon';
import { AnimatedNumber } from './AnimatedNumber';

export interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
}

export function StatCard({ icon, label, value, suffix }: StatCardProps) {
  return (
    <motion.div
      className="flex items-center gap-3 rounded-none border-2 border-border bg-surface p-3 transition-colors duration-fast hover:border-primary/60"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none border border-border bg-background text-text-secondary">
        <Icon name={icon} size={16} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </p>
        <p className="font-mono text-2xl leading-none text-text-primary">
          <AnimatedNumber value={value} />
          {suffix}
        </p>
      </div>
    </motion.div>
  );
}
