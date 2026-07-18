import { Link, useParams } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { SkillBadge } from '../components/SkillBadge';
import { EmptyState } from '../components/EmptyState';
import { PROJECT_STATUS_BADGE_VARIANT, PROJECT_STATUS_META } from '../components/status-meta';
import { formatDate } from '../utils';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { projects, skills } = usePortfolio();
  const project = projects.find((p) => p.slug === slug);

  if (!project || project.status === 'locked') {
    return (
      <EmptyState
        icon="Lock"
        title="Locked mission"
        description="This project doesn't exist or hasn't been unlocked yet."
        action={
          <Link to="/projects" className="text-sm text-primary hover:underline">
            Back to projects
          </Link>
        }
      />
    );
  }

  const meta = PROJECT_STATUS_META[project.status];
  const relatedSkills = skills.filter((skill) => project.technologies.includes(skill.name));
  const showsProgress = project.status === 'building' || project.status === 'paused';
  const isPending = project.status !== 'completed';
  const Content = project.Content;

  return (
    <article className="flex flex-col gap-6">
      <Link to="/projects" className="flex w-fit items-center gap-1 text-sm text-text-muted hover:text-primary">
        <Icon name="ArrowLeft" size={14} />
        Projects
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={PROJECT_STATUS_BADGE_VARIANT[project.status]} icon={meta.icon}>
            {meta.label}
          </Badge>
          {project.categories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>
        <h1 className="mt-2 font-heading text-3xl text-text-primary">{project.title}</h1>
        <p className="mt-2 text-text-secondary">{project.description}</p>
      </header>

      {isPending && (
        <div className="flex items-center gap-2 rounded-qmd border border-dashed border-border bg-surface px-3 py-2 text-sm text-text-muted">
          <Icon name="Lock" size={14} />
          This mission isn't completed yet — pending completion.
        </div>
      )}

      {showsProgress && (
        <ProgressBar value={project.progress ?? 0} label={`Progress: ${project.progress ?? 0}%`} />
      )}

      <div className="flex flex-wrap gap-4 text-sm text-text-muted">
        <span className="flex items-center gap-1">
          <Icon name="Calendar" size={14} />
          {formatDate(project.date)}
        </span>
        {project.hoursInvested !== undefined && (
          <span className="flex items-center gap-1">
            <Icon name="Clock" size={14} />
            {project.hoursInvested}h invested
          </span>
        )}
        <span className="flex items-center gap-1">
          <Icon name="BarChart3" size={14} />
          Difficulty {project.difficulty}/5
        </span>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {project.images.map((image) => (
            <img key={image} src={image} alt={project.title} className="rounded-qlg border border-border object-cover" />
          ))}
        </div>
      )}

      <div className="prose prose-invert max-w-none text-text-secondary">
        <Content />
      </div>

      {relatedSkills.length > 0 && (
        <div>
          <h2 className="mb-2 font-heading text-sm text-text-primary">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {relatedSkills.map((skill) => (
              <SkillBadge key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {(project.repo || project.demo || (project.links && project.links.length > 0)) && (
        <div className="flex flex-wrap gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-qmd border border-border px-3 py-1.5 text-sm text-text-secondary hover:border-primary/50 hover:text-primary"
            >
              <Icon name="Github" size={14} />
              Repository
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-qmd border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm text-primary hover:bg-primary/20"
            >
              <Icon name="ExternalLink" size={14} />
              Demo
            </a>
          )}
          {project.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-qmd border border-border px-3 py-1.5 text-sm text-text-secondary hover:border-primary/50 hover:text-primary"
            >
              <Icon name={link.icon ?? 'Link'} size={14} />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
