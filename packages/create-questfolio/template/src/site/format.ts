import type { Project } from 'questfolio';

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });

export function year(iso: string): number {
  return new Date(iso).getFullYear();
}

export function formatMonthYear(iso: string): string {
  return monthYear.format(new Date(iso));
}

/** "2023 – present", "2020", "2024 – 2025" */
export function projectYears(project: Project): string {
  const start = year(project.date);
  if (project.status === 'building' || project.status === 'planning') return `${start} – present`;
  const end = project.updatedAt ? year(project.updatedAt) : start;
  return end === start ? String(start) : `${start} – ${end}`;
}

/** Full period with months, for the project detail page. */
export function projectPeriod(project: Project): string {
  const start = formatMonthYear(project.date);
  if (project.status === 'building' || project.status === 'planning') return `${start} – present`;
  if (!project.updatedAt) return start;
  const end = formatMonthYear(project.updatedAt);
  return end === start ? start : `${start} – ${end}`;
}

export function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
}
