import { usePortfolio } from '../hooks/usePortfolio';
import { XPBar } from '../components/XPBar';
import { EmptyState } from '../components/EmptyState';

export function SkillsPage() {
  const { skills } = usePortfolio();

  const byCategory = new Map<string, typeof skills>();
  for (const skill of skills) {
    const list = byCategory.get(skill.category) ?? [];
    list.push(skill);
    byCategory.set(skill.category, list);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-text-primary">Skills</h1>
        <p className="text-sm text-text-secondary">
          Experience calculated automatically from your projects.
        </p>
      </div>

      {skills.length > 0 ? (
        Array.from(byCategory.entries()).map(([category, categorySkills]) => (
          <section key={category}>
            <h2 className="mb-2 font-heading text-sm uppercase tracking-wide text-text-muted">
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categorySkills.map((skill) => (
                <XPBar key={skill.name} skill={skill} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <EmptyState icon="Sparkles" title="No technologies tracked yet" />
      )}
    </div>
  );
}
