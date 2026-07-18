import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import type { ProjectStatus } from '../types';
import type { useProjectFilters } from '../hooks/useProjectFilters';
import { PROJECT_STATUS_META } from './status-meta';

type FiltersState = ReturnType<typeof useProjectFilters>;

export interface FilterBarProps extends FiltersState {
  /** Hide the status chips — useful when status is already expressed some
   * other way, like Kanban columns. Defaults to true. */
  showStatus?: boolean;
}

export function FilterBar({
  categories,
  technologies,
  years,
  filters,
  setFilter,
  clearFilters,
  showStatus = true,
}: FilterBarProps) {
  const hasActiveFilters = Boolean(
    filters.category || filters.status || filters.technology || filters.year,
  );

  const statusOptions = (Object.keys(PROJECT_STATUS_META) as ProjectStatus[]).filter(
    (status) => status !== 'locked',
  );

  return (
    <div className="flex flex-col gap-2">
      {showStatus && (
        <FilterGroup label="Status">
          {statusOptions.map((status) => (
            <FilterChip
              key={status}
              active={filters.status === status}
              onClick={() => setFilter('status', filters.status === status ? undefined : status)}
            >
              {PROJECT_STATUS_META[status].label}
            </FilterChip>
          ))}
        </FilterGroup>
      )}

      {categories.length > 0 && (
        <FilterGroup label="Category">
          {categories.map((category) => (
            <FilterChip
              key={category}
              active={filters.category === category}
              onClick={() => setFilter('category', filters.category === category ? undefined : category)}
            >
              {category}
            </FilterChip>
          ))}
        </FilterGroup>
      )}

      {technologies.length > 0 && (
        <FilterGroup label="Technology">
          {technologies.map((tech) => (
            <FilterChip
              key={tech}
              active={filters.technology === tech}
              onClick={() => setFilter('tech', filters.technology === tech ? undefined : tech)}
            >
              {tech}
            </FilterChip>
          ))}
        </FilterGroup>
      )}

      {years.length > 0 && (
        <FilterGroup label="Year">
          {years.map((year) => (
            <FilterChip
              key={year}
              active={filters.year === year}
              onClick={() => setFilter('year', filters.year === year ? undefined : String(year))}
            >
              {year}
            </FilterChip>
          ))}
        </FilterGroup>
      )}

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={clearFilters}
            className="w-fit text-xs text-text-muted underline-offset-2 hover:text-danger hover:underline"
          >
            Clear filters
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="mr-1 text-xs uppercase tracking-wide text-text-muted">{label}</span>
      {children}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-qfull border px-2 py-1 text-xs transition-colors duration-fast',
        active
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border text-text-secondary hover:border-primary/40',
      )}
    >
      {children}
    </button>
  );
}
