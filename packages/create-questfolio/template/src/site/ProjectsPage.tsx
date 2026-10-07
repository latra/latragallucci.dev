import { ProjectList } from './ProjectList';
import { STATUS_GROUPS, projects } from './data';

export function ProjectsPage() {
  const groups = STATUS_GROUPS.map((group) => ({
    ...group,
    items: projects.filter((p) => group.statuses.includes(p.status)),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="wrap page">
      <header className="page__head">
        <h1>Work</h1>
        <p className="page__lede">
          Tools, services and side projects — from production-style backends to the lab software I
          use in class. Each entry links to its write-up and source.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.key} className="group" aria-labelledby={`group-${group.key}`}>
          <h2 id={`group-${group.key}`} className="group__title">
            {group.label} <span className="group__count">{group.items.length}</span>
          </h2>
          <ProjectList projects={group.items} showStatus={false} />
        </section>
      ))}
    </div>
  );
}
