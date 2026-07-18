import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Project } from '../types';
import type { ProjectFilters } from '../lib/search';
import { filterProjects, uniqueCategories, uniqueTechnologies, uniqueYears } from '../lib/search';

export type { ProjectFilters } from '../lib/search';

type FilterKey = 'q' | 'category' | 'status' | 'tech' | 'year';

export function useProjectFilters(projects: Project[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProjectFilters = useMemo(
    () => ({
      query: searchParams.get('q') ?? undefined,
      category: searchParams.get('category') ?? undefined,
      status: (searchParams.get('status') as Project['status'] | null) ?? undefined,
      technology: searchParams.get('tech') ?? undefined,
      year: searchParams.get('year') ? Number(searchParams.get('year')) : undefined,
    }),
    [searchParams],
  );

  const filteredProjects = useMemo(() => filterProjects(projects, filters), [projects, filters]);
  const categories = useMemo(() => uniqueCategories(projects), [projects]);
  const technologies = useMemo(() => uniqueTechnologies(projects), [projects]);
  const years = useMemo(() => uniqueYears(projects), [projects]);

  function setFilter(key: FilterKey, value: string | undefined) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });
  }

  function clearFilters() {
    setSearchParams({});
  }

  return { filters, filteredProjects, categories, technologies, years, setFilter, clearFilters };
}
