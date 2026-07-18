import { describe, expect, it } from 'vitest';
import {
  baseXPForProject,
  calculateSkills,
  levelFromXP,
  levelProgressFromXP,
  xpByTechForProject,
  xpThresholdForLevel,
} from '../src/lib/xp';
import type { Project } from '../src/types';

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 'demo',
    slug: 'demo',
    title: 'Demo',
    description: 'Demo project',
    status: 'completed',
    date: '2024-01-01',
    categories: ['Frontend'],
    technologies: ['React', 'TypeScript'],
    difficulty: 3,
    progress: 100,
    Content: () => null,
    ...overrides,
  };
}

describe('xpThresholdForLevel / levelFromXP', () => {
  it('requires 0 XP to be level 1', () => {
    expect(xpThresholdForLevel(1)).toBe(0);
    expect(levelFromXP(0)).toBe(1);
  });

  it('increases monotonically', () => {
    const thresholds = [1, 2, 3, 4, 5].map(xpThresholdForLevel);
    for (let i = 1; i < thresholds.length; i++) {
      expect(thresholds[i]).toBeGreaterThan(thresholds[i - 1]!);
    }
  });

  it('levelProgressFromXP is internally consistent', () => {
    const progress = levelProgressFromXP(500);
    expect(progress.xpIntoCurrentLevel).toBeGreaterThanOrEqual(0);
    expect(progress.xpIntoCurrentLevel).toBeLessThanOrEqual(progress.xpForNextLevel);
    expect(progress.progressToNextLevel).toBeGreaterThanOrEqual(0);
    expect(progress.progressToNextLevel).toBeLessThanOrEqual(1);
  });
});

describe('baseXPForProject', () => {
  it('gives full credit to a completed project', () => {
    const completed = baseXPForProject(project({ status: 'completed', progress: 100 }));
    const building = baseXPForProject(project({ status: 'building', progress: 50 }));
    expect(completed).toBeGreaterThan(building);
  });

  it('gives zero XP to locked/idea projects', () => {
    expect(baseXPForProject(project({ status: 'locked' }))).toBe(0);
    expect(baseXPForProject(project({ status: 'idea' }))).toBe(0);
  });

  it('rewards more hours invested', () => {
    const fewHours = baseXPForProject(project({ hoursInvested: 5 }));
    const manyHours = baseXPForProject(project({ hoursInvested: 400 }));
    expect(manyHours).toBeGreaterThan(fewHours);
  });
});

describe('xpByTechForProject', () => {
  it('splits XP evenly across technologies by default', () => {
    const contributions = xpByTechForProject(project({ technologies: ['React', 'TypeScript'] }));
    expect(contributions.React).toBeCloseTo(contributions.TypeScript!, 5);
  });

  it('respects xpOverride for a single technology without dropping the rest', () => {
    const contributions = xpByTechForProject(
      project({ technologies: ['React', 'Docker'], xpOverride: { Docker: 999 } }),
    );
    expect(contributions.Docker).toBe(999);
    expect(contributions.React).toBeGreaterThan(0);
  });
});

describe('calculateSkills', () => {
  it('aggregates XP per technology across multiple projects', () => {
    const skills = calculateSkills([
      project({ slug: 'a', technologies: ['React'], difficulty: 3, status: 'completed' }),
      project({ slug: 'b', technologies: ['React', 'Docker'], difficulty: 4, status: 'completed' }),
    ]);
    const react = skills.find((s) => s.name === 'React');
    expect(react).toBeDefined();
    expect(react!.relatedProjectSlugs).toEqual(expect.arrayContaining(['a', 'b']));
    expect(react!.level).toBeGreaterThanOrEqual(1);
  });

  it('is sorted by XP descending', () => {
    const skills = calculateSkills([
      project({ slug: 'a', technologies: ['React'], difficulty: 5, status: 'completed' }),
      project({ slug: 'b', technologies: ['CSS'], difficulty: 1, status: 'idea' }),
    ]);
    for (let i = 1; i < skills.length; i++) {
      expect(skills[i - 1]!.xp).toBeGreaterThanOrEqual(skills[i]!.xp);
    }
  });
});
