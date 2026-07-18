export interface PortfolioStats {
  totalProjects: number;
  completedCount: number;
  activeCount: number;
  pausedCount: number;
  abandonedCount: number;
  lockedCount: number;
  technologiesUsedCount: number;
  totalHoursInvested: number;
  totalXP: number;
  overallLevel: number;
  mostUsedTechnology: string | null;
  favoriteCategory: string | null;
  achievementsUnlocked: number;
  achievementsTotal: number;
}
