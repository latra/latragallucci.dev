import { describe, expect, it } from 'vitest';
import { buildFullTimeline, loadProjects, timelineYears } from '../src/lib/content';
import type { GlobbedModules, Project, ProjectFrontmatter } from '../src/types';

function fakeModules(entries: ProjectFrontmatter[]): GlobbedModules<ProjectFrontmatter> {
  const modules: GlobbedModules<ProjectFrontmatter> = {};
  for (const frontmatter of entries) {
    modules[`/content/projects/${frontmatter.id}.mdx`] = {
      default: () => null,
      frontmatter,
    };
  }
  return modules;
}

function frontmatter(overrides: Partial<ProjectFrontmatter> = {}): ProjectFrontmatter {
  return {
    id: 'demo',
    title: 'Demo',
    description: 'desc',
    status: 'completed',
    date: '2024-01-01',
    categories: [],
    technologies: [],
    difficulty: 1,
    ...overrides,
  };
}

describe('loadProjects', () => {
  it('normalizes globbed modules into typed projects sorted by date desc', () => {
    const projects = loadProjects(
      fakeModules([
        frontmatter({ id: 'old', date: '2022-01-01' }),
        frontmatter({ id: 'new', date: '2024-01-01' }),
      ]),
    );
    expect(projects.map((p) => p.slug)).toEqual(['new', 'old']);
    expect(projects[0]!.Content).toBeTypeOf('function');
  });
});

describe('buildFullTimeline', () => {
  it('merges explicit entries with an auto-derived project-started entry', () => {
    const projects = loadProjects(fakeModules([frontmatter({ id: 'p1', date: '2023-05-01' })]));
    const timeline = buildFullTimeline(
      [
        {
          id: 'milestone-1',
          slug: 'milestone-1',
          title: 'Graduated',
          description: 'desc',
          date: '2021-06-01',
          type: 'education',
        },
      ],
      projects,
      [],
    );
    expect(timeline).toHaveLength(2);
    expect(timeline.some((entry) => entry.type === 'project-started')).toBe(true);
    expect(timeline.some((entry) => entry.type === 'education')).toBe(true);
  });

  it('adds a project-completed entry only when status is completed and updatedAt is set', () => {
    const projects = loadProjects(
      fakeModules([
        frontmatter({ id: 'done', date: '2023-01-01', status: 'completed', updatedAt: '2023-06-01' }),
        frontmatter({ id: 'still-building', date: '2023-02-01', status: 'building' }),
      ]),
    );
    const timeline = buildFullTimeline([], projects, []);
    const completedEntries = timeline.filter((entry) => entry.type === 'project-completed');
    expect(completedEntries).toHaveLength(1);
    expect(completedEntries[0]!.relatedProjectId).toBe('done');
    expect(timeline.filter((entry) => entry.type === 'project-started')).toHaveLength(2);
  });
});

describe('timelineYears', () => {
  it('returns unique years sorted descending', () => {
    const years = timelineYears([
      { id: 'a', slug: 'a', title: '', description: '', date: '2022-01-01', type: 'milestone' },
      { id: 'b', slug: 'b', title: '', description: '', date: '2024-01-01', type: 'milestone' },
      { id: 'c', slug: 'c', title: '', description: '', date: '2022-06-01', type: 'milestone' },
    ]);
    expect(years).toEqual([2024, 2022]);
  });
});
