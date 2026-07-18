import type { Skill } from '../types';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';

export function XPBar({ skill }: { skill: Skill }) {
  return (
    <div className="rounded-qmd border border-border bg-surface p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={skill.icon} size={16} style={{ color: skill.color }} />
          <span className="text-sm font-medium text-text-primary">{skill.displayName}</span>
        </div>
        <span className="text-xs text-text-muted">Lvl. {skill.level}</span>
      </div>
      <ProgressBar
        value={skill.progressToNextLevel * 100}
        color={skill.color}
        label={`${skill.xpIntoCurrentLevel} / ${skill.xpForNextLevel} XP · ${skill.xp} total XP`}
      />
    </div>
  );
}
