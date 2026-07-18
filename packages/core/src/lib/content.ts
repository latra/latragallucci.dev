import type {
  Achievement,
  AchievementFrontmatter,
  GlobbedModules,
  Post,
  PostFrontmatter,
  Project,
  ProjectFrontmatter,
  TimelineEntry,
  TimelineEntryFrontmatter,
} from '../types';

function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.mdx?$/, '');
}

function byDateDesc(a: { date: string }, b: { date: string }): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/** Normalizes the result of `import.meta.glob('content/projects/*.mdx', { eager: true })`. */
export function loadProjects(modules: GlobbedModules<ProjectFrontmatter>): Project[] {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      ...mod.frontmatter,
      slug: mod.frontmatter.id ?? slugFromPath(path),
      Content: mod.default,
    }))
    .sort(byDateDesc);
}

export function loadPosts(modules: GlobbedModules<PostFrontmatter>): Post[] {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      ...mod.frontmatter,
      slug: mod.frontmatter.id ?? slugFromPath(path),
      Content: mod.default,
    }))
    .sort(byDateDesc);
}

export function loadAchievements(modules: GlobbedModules<AchievementFrontmatter>): Achievement[] {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      ...mod.frontmatter,
      slug: mod.frontmatter.id ?? slugFromPath(path),
      Content: mod.default,
    }))
    .sort((a, b) => (a.name < b.name ? -1 : 1));
}

export function loadTimelineEntries(
  modules: GlobbedModules<TimelineEntryFrontmatter>,
): TimelineEntry[] {
  return Object.entries(modules).map(([path, mod]) => ({
    ...mod.frontmatter,
    slug: mod.frontmatter.id ?? slugFromPath(path),
    Content: mod.default,
  }));
}

/**
 * Builds the full timeline: explicit entries from content/timeline/*.mdx
 * merged with entries auto-derived from every project and every unlocked
 * achievement, sorted newest first.
 */
export function buildFullTimeline(
  explicitEntries: TimelineEntry[],
  projects: Project[],
  achievements: Achievement[],
): TimelineEntry[] {
  const projectStartedEntries: TimelineEntry[] = projects.map((project) => ({
    id: `project-started-${project.slug}`,
    slug: `project-started-${project.slug}`,
    title: project.title,
    description: 'Started this mission.',
    date: project.date,
    type: 'project-started',
    relatedProjectId: project.slug,
  }));

  const projectCompletedEntries: TimelineEntry[] = projects
    .filter((project) => project.status === 'completed' && project.updatedAt)
    .map((project) => ({
      id: `project-completed-${project.slug}`,
      slug: `project-completed-${project.slug}`,
      title: project.title,
      description: 'Mission completed.',
      date: project.updatedAt as string,
      type: 'project-completed',
      relatedProjectId: project.slug,
    }));

  const achievementEntries: TimelineEntry[] = achievements
    .filter((achievement) => achievement.status === 'unlocked' && achievement.unlockedAt)
    .map((achievement) => ({
      id: `achievement-${achievement.slug}`,
      slug: `achievement-${achievement.slug}`,
      title: achievement.name,
      description: achievement.description,
      date: achievement.unlockedAt as string,
      type: 'achievement',
      relatedAchievementId: achievement.slug,
    }));

  return [
    ...explicitEntries,
    ...projectStartedEntries,
    ...projectCompletedEntries,
    ...achievementEntries,
  ].sort(byDateDesc);
}

export function timelineYears(entries: TimelineEntry[]): number[] {
  const years = new Set(entries.map((entry) => new Date(entry.date).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
}
