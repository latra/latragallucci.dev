import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Project } from '../types';
import { Icon } from './Icon';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import { PROJECT_STATUS_BADGE_VARIANT, PROJECT_STATUS_META } from './status-meta';
import { formatYear } from '../utils';

export interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const meta = PROJECT_STATUS_META[project.status];
  const isLocked = project.status === 'locked';
  const isCompleted = project.status === 'completed';
  const isPending = !isLocked && !isCompleted;
  const showsProgress = project.status === 'building' || project.status === 'paused';
  const hasLinks = !isLocked && (project.repo || project.demo);

  const card = (
    <motion.div
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-qlg border bg-surface p-4 transition-colors duration-base',
        isLocked && 'border-dashed border-border opacity-60 grayscale',
        isPending && 'border-dashed border-border opacity-75 grayscale-[0.6] hover:opacity-90 hover:grayscale-[0.3]',
        isCompleted && 'border-border hover:border-primary/50 hover:bg-surface-hover',
      )}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.05 }}
      whileHover={isLocked ? undefined : { y: -4 }}
    >
      {project.images?.[0] && !isLocked && (
        <img
          src={project.images[0]}
          alt=""
          loading="lazy"
          decoding="async"
          className="mb-3 h-32 w-full rounded-qmd object-cover"
        />
      )}

      <div className="mb-2 flex items-center justify-between gap-2">
        <Badge variant={PROJECT_STATUS_BADGE_VARIANT[project.status]} icon={meta.icon}>
          {meta.label}
        </Badge>
        {!isLocked && <span className="text-xs text-text-muted">{formatYear(project.date)}</span>}
      </div>

      <h3 className="font-heading text-lg text-text-primary">{isLocked ? '???' : project.title}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm text-text-secondary">
        {isLocked ? 'This achievement is still locked.' : project.description}
      </p>

      {isPending && (
        <div className="mt-2 flex items-center gap-1 text-text-muted">
          <Icon name="Lock" size={12} />
          <span className="text-xs">Pending completion</span>
        </div>
      )}

      {!isLocked && showsProgress && (
        <ProgressBar value={project.progress ?? 0} className="mt-3" label={`${project.progress ?? 0}%`} />
      )}

      {!isLocked && (
        <div className="mt-3 flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="muted">+{project.technologies.length - 4}</Badge>
          )}
        </div>
      )}

      {isLocked && (
        <div className="mt-3 flex items-center gap-1 text-text-muted">
          <Icon name="Lock" size={14} />
          <span className="text-xs">Locked</span>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="flex h-full flex-col">
      {isLocked ? (
        card
      ) : (
        <Link to={`/projects/${project.slug}`} className="block h-full">
          {card}
        </Link>
      )}

      {hasLinks && (
        <div className="mt-2 flex flex-wrap gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-qmd border border-border px-2 py-1 text-xs text-text-muted transition-colors duration-fast hover:border-primary/40 hover:text-text-secondary"
            >
              <Icon name="Github" size={12} />
              Repository
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-qmd border border-border px-2 py-1 text-xs text-text-muted transition-colors duration-fast hover:border-primary/40 hover:text-text-secondary"
            >
              <Icon name="ExternalLink" size={12} />
              Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
