import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Achievement, AchievementTier } from '../types';
import { Icon } from './Icon';
import { Badge } from './Badge';

const TIER_VAR: Record<AchievementTier, string> = {
  bronze: 'var(--qf-tier-bronze)',
  silver: 'var(--qf-tier-silver)',
  gold: 'var(--qf-tier-gold)',
  platinum: 'var(--qf-tier-platinum)',
};

export function AchievementCard({ achievement, index = 0 }: { achievement: Achievement; index?: number }) {
  const isUnlocked = achievement.status === 'unlocked';
  const isMysterious = achievement.status === 'mysterious';
  const tierColor = TIER_VAR[achievement.tier ?? 'bronze'];
  const iconColor = isUnlocked ? tierColor : 'var(--qf-color-text-muted)';
  const borderColor = isUnlocked ? tierColor : 'var(--qf-color-border)';

  return (
    <motion.div
      className={clsx(
        'flex items-center gap-3 rounded-qlg border p-3',
        isUnlocked
          ? 'border-border bg-surface'
          : clsx('border-dashed border-border grayscale', isMysterious ? 'opacity-50' : 'opacity-70'),
      )}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: Math.min(index, 12) * 0.03 }}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-qfull border-2"
        style={{ borderColor, color: iconColor }}
      >
        <Icon name={isMysterious ? 'Lock' : achievement.icon} size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-sm text-text-primary">
          {isMysterious ? '???' : achievement.name}
        </p>
        <p className="truncate text-xs text-text-secondary">
          {isMysterious ? 'Locked achievement' : achievement.description}
        </p>
      </div>
      <Badge variant={isUnlocked ? 'primary' : 'muted'}>+{achievement.xpReward} XP</Badge>
    </motion.div>
  );
}
