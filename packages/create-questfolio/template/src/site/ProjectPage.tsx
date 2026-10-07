import { Link, useParams } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { STATUS_LABEL, findProject, projects } from './data';
import { hostOf, projectPeriod } from './format';

export function ProjectPage() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <NotFoundPage />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const { Content } = project;

  const links = [
    project.demo && { label: 'Live', url: project.demo },
    project.repo && { label: 'Source', url: project.repo },
    ...(project.links ?? []),
  ].filter(Boolean) as { label: string; url: string }[];

  return (
    <article className="wrap page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/projects">Work</Link> <span aria-hidden="true">/</span>{' '}
        <span aria-current="page">{project.title}</span>
      </nav>

      <header className="project-head">
        <h1>{project.title}</h1>
        <p className="page__lede">{project.description}</p>
      </header>

      <div className="project-layout">
        <dl className="project-facts">
          <div>
            <dt>Period</dt>
            <dd>{projectPeriod(project)}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="status" data-status={project.status}>
                {STATUS_LABEL[project.status]}
              </span>
            </dd>
          </div>
          {project.technologies.length > 0 && (
            <div>
              <dt>Stack</dt>
              <dd>{project.technologies.join(', ')}</dd>
            </div>
          )}
          {project.categories.length > 0 && (
            <div>
              <dt>Area</dt>
              <dd>{project.categories.join(', ')}</dd>
            </div>
          )}
          {links.length > 0 && (
            <div>
              <dt>Links</dt>
              {links.map((link) => (
                <dd key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener">
                    {link.label} <span className="muted">· {hostOf(link.url)}</span>
                  </a>
                </dd>
              ))}
            </div>
          )}
        </dl>

        <div className="prose">
          {project.images?.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
          <Content />
        </div>
      </div>

      {next && next !== project && (
        <Link to={`/projects/${next.slug}`} className="next-project">
          <span className="muted">Next project</span>
          <span className="next-project__title">
            {next.title} <span className="arrow" aria-hidden="true">→</span>
          </span>
        </Link>
      )}
    </article>
  );
}
