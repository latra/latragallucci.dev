import { describe, expect, it } from 'vitest';
import { calculateStats } from '../src/lib/stats';
import type { Achievement, Project } from '../src/types';

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 'demo',
    slug: 'demo',
    title: 'Demo',
    description: 'Demo project',
    status: 'completed',
    date: '2024-01-01',
    categories: ['Frontend'],
    technologies: ['React'],
    difficulty: 3,
    progress: 100,
    hoursInvested: 10,
    Content: () => null,
    ...overrides,
  };
}

function achievement(overrides: Partial<Achievement> = {}): Achievement {
  return {
    id: 'demo-a',
    slug: 'demo-a',
    name: 'Demo achievement',
    description: 'desc',
    icon: 'Trophy',
    category: 'General',
    status: 'unlocked',
    xpReward: 10,
    unlockedAt: '2024-01-01',
    Content: () => null,
    ...overrides,
  };
}

describe('calculateStats', () => {
  it('counts projects by status', () => {
    const stats = calculateStats(
      [
        project({ slug: 'a', status: 'completed' }),
        project({ slug: 'b', status: 'building' }),
        project({ slug: 'c', status: 'paused' }),
        project({ slug: 'd', status: 'abandoned' }),
      ],
      [],
    );
    expect(stats.completedCount).toBe(1);
    expect(stats.activeCount).toBe(1);
    expect(stats.pausedCount).toBe(1);
    expect(stats.abandonedCount).toBe(1);
    expect(stats.totalProjects).toBe(4);
  });

  it('sums hours invested and computes favorite category', () => {
    const stats = calculateStats(
      [
        project({ slug: 'a', categories: ['Frontend'], hoursInvested: 10 }),
        project({ slug: 'b', categories: ['Frontend'], hoursInvested: 5 }),
        project({ slug: 'c', categories: ['Backend'], hoursInvested: 5 }),
      ],
      [],
    );
    expect(stats.totalHoursInvested).toBe(20);
    expect(stats.favoriteCategory).toBe('Frontend');
  });

  it('counts unlocked achievements', () => {
    const stats = calculateStats([project()], [
      achievement({ slug: 'x', status: 'unlocked' }),
      achievement({ slug: 'y', status: 'locked' }),
    ]);
    expect(stats.achievementsUnlocked).toBe(1);
    expect(stats.achievementsTotal).toBe(2);
  });
});
