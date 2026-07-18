/** Optional per-technology metadata catalog (config/skills.json). Never stores XP or level. */
export interface SkillMeta {
  icon?: string;
  color?: string;
  category?: string;
  displayName?: string;
}

export type SkillCatalog = Record<string, SkillMeta>;

/** Fully computed at runtime from project data — never authored by hand. */
export interface Skill {
  name: string;
  displayName: string;
  icon: string;
  color: string;
  category: string;
  xp: number;
  level: number;
  xpIntoCurrentLevel: number;
  xpForNextLevel: number;
  progressToNextLevel: number;
  relatedProjectSlugs: string[];
}
