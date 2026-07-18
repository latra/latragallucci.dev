import type { ProjectStatus } from '../types';
import type { BadgeVariant } from './Badge';

export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  { label: string; icon: string; description: string }
> = {
  locked: { label: '???', icon: 'Lock', description: 'Locked achievement' },
  idea: { label: 'Idea', icon: 'Lightbulb', description: 'Initial concept' },
  planning: { label: 'Planning', icon: 'Compass', description: 'In design' },
  building: { label: 'In progress', icon: 'Hammer', description: 'Active mission' },
  paused: { label: 'Paused', icon: 'PauseCircle', description: 'Mission on hold' },
  completed: { label: 'Completed', icon: 'Trophy', description: 'Unlocked achievement' },
  abandoned: { label: 'Abandoned', icon: 'Archive', description: 'Archived' },
};

export const PROJECT_STATUS_BADGE_VARIANT: Record<ProjectStatus, BadgeVariant> = {
  locked: 'muted',
  idea: 'muted',
  planning: 'default',
  building: 'primary',
  paused: 'warning',
  completed: 'success',
  abandoned: 'muted',
};
