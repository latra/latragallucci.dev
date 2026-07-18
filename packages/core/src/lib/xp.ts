import type { Project, ProjectStatus, Skill, SkillCatalog } from '../types';

/**
 * XP is never authored by hand. It is derived from difficulty, status,
 * progress and (optionally) hours invested, then split across the
 * project's technologies. `xpOverride` is an escape hatch for a single
 * technology, not the primary input path.
 */
const DIFFICULTY_XP = 60;
const MAX_HOURS_CONSIDERED = 500;
const MAX_HOURS_MULTIPLIER = 2.5;

const XP_CURVE_BASE = 100;
const XP_CURVE_EXPONENT = 1.5;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function statusCompletionFactor(status: ProjectStatus, progress: number): number {
  const p = clamp01(progress / 100);
  switch (status) {
    case 'completed':
      return 1;
    case 'building':
      return Math.max(p, 0.1);
    case 'paused':
      return p * 0.7;
    case 'abandoned':
      return Math.max(p * 0.4, 0.1);
    case 'planning':
      return 0.05;
    case 'idea':
    case 'locked':
    default:
      return 0;
  }
}

function hoursMultiplier(hoursInvested: number | undefined): number {
  if (!hoursInvested || hoursInvested <= 0) return 1;
  const capped = Math.min(hoursInvested, MAX_HOURS_CONSIDERED);
  return 1 + (capped / MAX_HOURS_CONSIDERED) * (MAX_HOURS_MULTIPLIER - 1);
}

export function baseXPForProject(project: Pick<Project, 'difficulty' | 'status' | 'progress' | 'hoursInvested'>): number {
  const completion = statusCompletionFactor(project.status, project.progress ?? 0);
  return project.difficulty * DIFFICULTY_XP * completion * hoursMultiplier(project.hoursInvested);
}

/** Per-technology XP contribution of a single project. */
export function xpByTechForProject(project: Project): Record<string, number> {
  const result: Record<string, number> = {};
  if (project.technologies.length === 0) return result;

  const overrides = project.xpOverride ?? {};
  const nonOverriddenTechs = project.technologies.filter((tech) => !(tech in overrides));
  const base = baseXPForProject(project);
  const perTech = nonOverriddenTechs.length > 0 ? base / nonOverriddenTechs.length : 0;

  for (const tech of project.technologies) {
    const contribution = tech in overrides ? overrides[tech]! : perTech;
    result[tech] = (result[tech] ?? 0) + contribution;
  }
  return result;
}

/** Cumulative XP required to reach `level` (level 1 requires 0 XP). */
export function xpThresholdForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.round(XP_CURVE_BASE * Math.pow(level - 1, XP_CURVE_EXPONENT));
}

export function levelFromXP(xp: number): number {
  if (xp <= 0) return 1;
  let level = 1;
  while (xpThresholdForLevel(level + 1) <= xp) level++;
  return level;
}

export interface LevelProgress {
  level: number;
  xpIntoCurrentLevel: number;
  xpForNextLevel: number;
  progressToNextLevel: number;
}

export function levelProgressFromXP(xp: number): LevelProgress {
  const level = levelFromXP(xp);
  const currentThreshold = xpThresholdForLevel(level);
  const nextThreshold = xpThresholdForLevel(level + 1);
  const xpIntoCurrentLevel = Math.max(0, xp - currentThreshold);
  const xpForNextLevel = nextThreshold - currentThreshold;
  return {
    level,
    xpIntoCurrentLevel,
    xpForNextLevel,
    progressToNextLevel: xpForNextLevel > 0 ? clamp01(xpIntoCurrentLevel / xpForNextLevel) : 1,
  };
}

const DEFAULT_SKILL_CATEGORY = 'General';
const DEFAULT_SKILL_ICON = 'Code2';
const DEFAULT_SKILL_COLORS = [
  '#38bdf8', '#a78bfa', '#f472b6', '#facc15', '#4ade80', '#fb923c', '#2dd4bf', '#f87171',
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function defaultColorForTech(tech: string): string {
  return DEFAULT_SKILL_COLORS[hashString(tech) % DEFAULT_SKILL_COLORS.length]!;
}

/** Aggregates XP per technology across every project and enriches it with the optional skill catalog. */
export function calculateSkills(projects: Project[], catalog: SkillCatalog = {}): Skill[] {
  const xpByTech = new Map<string, number>();
  const projectsByTech = new Map<string, Set<string>>();

  for (const project of projects) {
    const contributions = xpByTechForProject(project);
    for (const [tech, xp] of Object.entries(contributions)) {
      if (xp <= 0) continue;
      xpByTech.set(tech, (xpByTech.get(tech) ?? 0) + xp);
      if (!projectsByTech.has(tech)) projectsByTech.set(tech, new Set());
      projectsByTech.get(tech)!.add(project.slug);
    }
  }

  const skills: Skill[] = Array.from(xpByTech.entries()).map(([name, xp]) => {
    const meta = catalog[name] ?? {};
    const progress = levelProgressFromXP(xp);
    return {
      name,
      displayName: meta.displayName ?? name,
      icon: meta.icon ?? DEFAULT_SKILL_ICON,
      color: meta.color ?? defaultColorForTech(name),
      category: meta.category ?? DEFAULT_SKILL_CATEGORY,
      xp: Math.round(xp),
      level: progress.level,
      xpIntoCurrentLevel: Math.round(progress.xpIntoCurrentLevel),
      xpForNextLevel: Math.round(progress.xpForNextLevel),
      progressToNextLevel: progress.progressToNextLevel,
      relatedProjectSlugs: Array.from(projectsByTech.get(name) ?? []),
    };
  });

  return skills.sort((a, b) => b.xp - a.xp);
}
