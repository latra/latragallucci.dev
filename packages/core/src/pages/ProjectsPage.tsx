import type { Project, ProjectStatus } from '../types';
import { usePortfolio } from '../hooks/usePortfolio';
import { useProjectFilters } from '../hooks/useProjectFilters';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { ProjectCard } from '../components/ProjectCard';
import { Icon } from '../components/Icon';
import { EmptyState } from '../components/EmptyState';

interface KanbanColumn {
  label: string;
  icon: string;
  statuses: ProjectStatus[];
}

/** Waiting bundles anything not actively being worked on yet (including
 * locked/secret missions); Running is active work; Completed stands alone.
 * Abandoned lives outside the board — it's history, not a workflow stage. */
const KANBAN_COLUMNS: KanbanColumn[] = [
  { label: 'Waiting', icon: 'Clock', statuses: ['idea', 'paused', 'locked'] },
  { label: 'Running', icon: 'Zap', statuses: ['planning', 'building'] },
  { label: 'Completed', icon: 'Trophy', statuses: ['completed'] },
];

export function ProjectsPage() {
  const { projects } = usePortfolio();
  const filterState = useProjectFilters(projects);
  const { filters, filteredProjects, setFilter } = filterState;

  const abandoned = filteredProjects.filter((project) => project.status === 'abandoned');

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl text-text-primary">Projects</h1>
        <p className="text-sm text-text-secondary">Completed, active, and upcoming missions.</p>
      </div>

      <SearchBar value={filters.query ?? ''} onChange={(value) => setFilter('q', value)} />
      <FilterBar {...filterState} showStatus={false} />

      {filteredProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {KANBAN_COLUMNS.map((column) => {
              const items = filteredProjects.filter((project) => column.statuses.includes(project.status));
              return (
                <div
                  key={column.label}
                  className="flex flex-col rounded-qlg border border-border bg-surface/50"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2.5">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Icon name={column.icon} size={14} />
                      <span className="text-xs font-semibold uppercase tracking-wide">{column.label}</span>
                    </div>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-qfull bg-surface-hover px-1.5 text-[11px] text-text-muted">
                      {items.length}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-3">
                    {items.length > 0 ? (
                      items.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                      ))
                    ) : (
                      <p className="py-6 text-center text-xs text-text-muted">No projects</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <section>
            <div className="mb-3 flex items-center gap-2 text-text-secondary">
              <Icon name="Archive" size={14} />
              <h2 className="text-xs font-semibold uppercase tracking-wide">Abandoned</h2>
            </div>
            {abandoned.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {abandoned.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-muted">No abandoned projects.</p>
            )}
          </section>
        </>
      ) : (
        <EmptyState icon="SearchX" title="No results" description="Try changing the filters or search." />
      )}
    </div>
  );
}
