import type { ComponentType } from 'react';

/**
 * - "unlocked": earned — full color, real everything.
 * - "locked": not earned yet, but the goal is visible — real name/icon/
 *   description, shown grayed out as a roadmap of what's coming.
 * - "mysterious": not earned yet and intentionally hidden — shows "???"
 *   instead of the name/description, like a secret trophy.
 */
export type AchievementStatus = 'locked' | 'unlocked' | 'mysterious';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface AchievementFrontmatter {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: AchievementStatus;
  tier?: AchievementTier;
  /** ISO date, required when status is "unlocked". */
  unlockedAt?: string;
  xpReward: number;
  /** Optional link back to the project that granted this achievement. */
  relatedProjectId?: string;
}

export interface Achievement extends AchievementFrontmatter {
  slug: string;
  Content: ComponentType;
}
