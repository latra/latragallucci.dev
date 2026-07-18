import type { ComponentType } from 'react';

export type TimelineEntryType =
  | 'project'
  | 'project-started'
  | 'project-completed'
  | 'achievement'
  | 'milestone'
  | 'education'
  | 'experience';

export interface TimelineEntryFrontmatter {
  id: string;
  title: string;
  description: string;
  /** ISO date. */
  date: string;
  type: TimelineEntryType;
  icon?: string;
  relatedProjectId?: string;
  relatedAchievementId?: string;
}

export interface TimelineEntry extends TimelineEntryFrontmatter {
  slug: string;
  Content?: ComponentType;
}
