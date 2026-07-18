import type { Achievement, PortfolioStats, Project, SkillCatalog } from '../types';
import { calculateSkills, levelFromXP } from './xp';

export function calculateStats(
  projects: Project[],
  achievements: Achievement[],
  catalog: SkillCatalog = {},
): PortfolioStats {
  const skills = calculateSkills(projects, catalog);
  const totalXP = skills.reduce((sum, skill) => sum + skill.xp, 0);

  const countByStatus = (status: Project['status']) =>
    projects.filter((p) => p.status === status).length;

  const categoryCounts = new Map<string, number>();
  for (const project of projects) {
    for (const category of project.categories) {
      categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
    }
  }
  let favoriteCategory: string | null = null;
  let favoriteCategoryCount = 0;
  for (const [category, count] of categoryCounts) {
    if (count > favoriteCategoryCount) {
      favoriteCategory = category;
      favoriteCategoryCount = count;
    }
  }

  const mostUsedTechnology = skills.length > 0 ? skills[0]!.name : null;

  return {
    totalProjects: projects.length,
    completedCount: countByStatus('completed'),
    activeCount: countByStatus('building'),
    pausedCount: countByStatus('paused'),
    abandonedCount: countByStatus('abandoned'),
    lockedCount: countByStatus('locked'),
    technologiesUsedCount: skills.length,
    totalHoursInvested: projects.reduce((sum, p) => sum + (p.hoursInvested ?? 0), 0),
    totalXP: Math.round(totalXP),
    overallLevel: levelFromXP(totalXP),
    mostUsedTechnology,
    favoriteCategory,
    achievementsUnlocked: achievements.filter((a) => a.status === 'unlocked').length,
    achievementsTotal: achievements.length,
  };
}
