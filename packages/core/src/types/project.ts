import type { ComponentType } from 'react';

export type ProjectStatus =
  | 'locked'
  | 'idea'
  | 'planning'
  | 'building'
  | 'paused'
  | 'completed'
  | 'abandoned';

export type ProjectDifficulty = 1 | 2 | 3 | 4 | 5;

export interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

/** What the author writes in a project .mdx frontmatter block. */
export interface ProjectFrontmatter {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  /** Start date, ISO 8601 (yyyy-mm-dd). */
  date: string;
  updatedAt?: string;
  categories: string[];
  technologies: string[];
  difficulty: ProjectDifficulty;
  images?: string[];
  links?: ProjectLink[];
  repo?: string;
  demo?: string;
  /** 0-100, only meaningful while status is "building" or "paused". */
  progress?: number;
  hoursInvested?: number;
  /** Escape hatch: manual per-technology XP, bypassing the automatic formula. */
  xpOverride?: Record<string, number>;
  featured?: boolean;
}

/** A project after its .mdx module has been loaded and normalized. */
export interface Project extends ProjectFrontmatter {
  slug: string;
  /** Rendered MDX body (rich description). */
  Content: ComponentType;
}
