import { loadAchievements, loadPosts, loadProjects, loadTimelineEntries } from 'questfolio';
import type {
  AchievementFrontmatter,
  GlobbedModules,
  PostFrontmatter,
  ProjectFrontmatter,
  TimelineEntryFrontmatter,
} from 'questfolio';

/**
 * The only place that globs content/. Adding a new .mdx file under
 * content/projects, content/achievements, content/posts or content/timeline
 * is picked up automatically here — you never need to edit this file.
 */
const projectModules = import.meta.glob('../content/projects/*.mdx', {
  eager: true,
}) as GlobbedModules<ProjectFrontmatter>;

const achievementModules = import.meta.glob('../content/achievements/*.mdx', {
  eager: true,
}) as GlobbedModules<AchievementFrontmatter>;

const postModules = import.meta.glob('../content/posts/*.mdx', {
  eager: true,
}) as GlobbedModules<PostFrontmatter>;

const timelineModules = import.meta.glob('../content/timeline/*.mdx', {
  eager: true,
}) as GlobbedModules<TimelineEntryFrontmatter>;

export const projects = loadProjects(projectModules);
export const achievements = loadAchievements(achievementModules);
export const posts = loadPosts(postModules);
export const timelineEntries = loadTimelineEntries(timelineModules);
