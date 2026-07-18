import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type {
  Achievement,
  NavigationConfig,
  PortfolioStats,
  Post,
  Profile,
  Project,
  Skill,
  SkillCatalog,
  TimelineEntry,
} from '../types';
import { buildFullTimeline, calculateSkills, calculateStats } from '../lib';

export interface PortfolioData {
  projects: Project[];
  achievements: Achievement[];
  posts: Post[];
  timeline: TimelineEntry[];
  profile: Profile;
  navigation: NavigationConfig;
  skills: Skill[];
  stats: PortfolioStats;
}

const PortfolioContext = createContext<PortfolioData | null>(null);

export interface PortfolioProviderProps {
  projects: Project[];
  achievements: Achievement[];
  posts?: Post[];
  timelineEntries: TimelineEntry[];
  profile: Profile;
  navigation: NavigationConfig;
  skillCatalog?: SkillCatalog;
  children: ReactNode;
}

/**
 * Single source of truth for a portfolio instance. Takes already-loaded
 * content (see lib/content.ts loaders) and derives skills/stats/timeline —
 * pages and components below never compute this themselves.
 */
export function PortfolioProvider({
  projects,
  achievements,
  posts = [],
  timelineEntries,
  profile,
  navigation,
  skillCatalog = {},
  children,
}: PortfolioProviderProps) {
  const value = useMemo<PortfolioData>(() => {
    return {
      projects,
      achievements,
      posts,
      timeline: buildFullTimeline(timelineEntries, projects, achievements),
      profile,
      navigation,
      skills: calculateSkills(projects, skillCatalog),
      stats: calculateStats(projects, achievements, skillCatalog),
    };
  }, [projects, achievements, posts, timelineEntries, profile, navigation, skillCatalog]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioData {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within a <PortfolioProvider>');
  return ctx;
}
