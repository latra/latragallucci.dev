import { Link } from 'react-router-dom';
import type { Project } from 'questfolio';
import { STATUS_LABEL } from './data';
import { projectYears } from './format';

interface ProjectListProps {
  projects: Project[];
  /** Show the status column (useful on the home page, redundant inside a status group). */
  showStatus?: boolean;
}

export function ProjectList({ projects, showStatus = true }: ProjectListProps) {
  return (
    <ul className="project-list">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link to={`/projects/${project.slug}`} className="project-row">
            <span className="project-row__years">{projectYears(project)}</span>
            <span className="project-row__main">
              <span className="project-row__title">
                {project.title}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </span>
              <span className="project-row__desc">{project.description}</span>
            </span>
            <span className="project-row__meta">
              {project.technologies.length > 0 && (
                <span className="project-row__stack">{project.technologies.join(', ')}</span>
              )}
              {showStatus && (
                <span className="status" data-status={project.status}>
                  {STATUS_LABEL[project.status]}
                </span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
