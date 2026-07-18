import type { Project, ProjectStatus } from '../types';

export interface ProjectFilters {
  query?: string;
  category?: string;
  status?: ProjectStatus;
  technology?: string;
  year?: number;
}

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  const query = filters.query?.trim().toLowerCase();

  return projects.filter((project) => {
    if (filters.status && project.status !== filters.status) return false;
    if (filters.category && !project.categories.includes(filters.category)) return false;
    if (filters.technology && !project.technologies.includes(filters.technology)) return false;
    if (filters.year && new Date(project.date).getFullYear() !== filters.year) return false;

    if (query) {
      const haystack = [
        project.title,
        project.description,
        ...project.technologies,
        ...project.categories,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}

export function uniqueCategories(projects: Project[]): string[] {
  return Array.from(new Set(projects.flatMap((p) => p.categories))).sort();
}

export function uniqueTechnologies(projects: Project[]): string[] {
  return Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();
}

export function uniqueYears(projects: Project[]): number[] {
  return Array.from(new Set(projects.map((p) => new Date(p.date).getFullYear()))).sort(
    (a, b) => b - a,
  );
}
