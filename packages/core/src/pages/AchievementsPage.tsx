import type { AchievementStatus } from '../types';
import { usePortfolio } from '../hooks/usePortfolio';
import { AchievementCard } from '../components/AchievementCard';
import { ProgressBar } from '../components/ProgressBar';
import { EmptyState } from '../components/EmptyState';

const STATUS_ORDER: Record<AchievementStatus, number> = {
  unlocked: 0,
  locked: 1,
  mysterious: 2,
};

export function AchievementsPage() {
  const { achievements, stats } = usePortfolio();

  const sorted = [...achievements].sort((a, b) => {
    if (a.status !== b.status) return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-text-primary">Achievements</h1>
        <p className="text-sm text-text-secondary">
          {stats.achievementsUnlocked} of {stats.achievementsTotal} unlocked
        </p>
        <ProgressBar
          className="mt-2 max-w-sm"
          value={stats.achievementsTotal > 0 ? (stats.achievementsUnlocked / stats.achievementsTotal) * 100 : 0}
        />
      </div>

      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sorted.map((achievement, index) => (
            <AchievementCard key={achievement.slug} achievement={achievement} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState icon="Trophy" title="No achievements defined yet" />
      )}
    </div>
  );
}
