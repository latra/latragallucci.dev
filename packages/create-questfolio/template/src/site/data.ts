import type { Profile, Project, ProjectStatus, TimelineEntry } from 'questfolio';
import profileData from '../../config/profile.json';
import { projects as allProjects, timelineEntries } from '../content';

export interface Role {
  title: string;
  org: string;
  url?: string;
}

export interface SiteProfile extends Profile {
  roles: Role[];
}

export const profile = profileData as SiteProfile;

/** Hidden from the site entirely: placeholders, not work. */
const HIDDEN: ProjectStatus[] = ['locked'];

export const projects: Project[] = allProjects.filter((p) => !HIDDEN.includes(p.status));

export interface StatusGroup {
  key: string;
  label: string;
  statuses: ProjectStatus[];
}

/** Order and wording of the project index on /projects. */
export const STATUS_GROUPS: StatusGroup[] = [
  { key: 'active', label: 'In progress', statuses: ['building', 'planning'] },
  { key: 'done', label: 'Completed', statuses: ['completed'] },
  { key: 'concepts', label: 'Concepts', statuses: ['idea'] },
  { key: 'archived', label: 'Archived', statuses: ['paused', 'abandoned'] },
];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  locked: 'Unannounced',
  idea: 'Concept',
  planning: 'Planning',
  building: 'In progress',
  paused: 'Paused',
  completed: 'Completed',
  abandoned: 'Discontinued',
};

/** Projects shown on the home page: real, started work — concepts stay on /projects. */
export const selectedWork: Project[] = projects.filter(
  (p) => p.status !== 'idea' && p.status !== 'planning',
);

export const experience: TimelineEntry[] = timelineEntries
  .filter((e) => e.type === 'experience' || e.type === 'education')
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function findProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
