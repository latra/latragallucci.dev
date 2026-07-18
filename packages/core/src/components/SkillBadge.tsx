import type { Skill } from '../types';
import { Icon } from './Icon';

export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-qfull border border-border bg-surface px-2 py-1 text-xs text-text-secondary">
      <Icon name={skill.icon} size={12} style={{ color: skill.color }} />
      {skill.displayName}
      <span className="text-text-muted">Lv{skill.level}</span>
    </span>
  );
}
