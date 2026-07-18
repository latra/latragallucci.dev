import { usePortfolio } from '../hooks/usePortfolio';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import { timelineYears } from '../lib/content';
import { TimelineItem } from '../components/TimelineItem';
import { EmptyState } from '../components/EmptyState';
import clsx from 'clsx';

export function TimelinePage() {
  const { timeline } = usePortfolio();
  const [year, setYear] = useSearchParamsState('year');
  const years = timelineYears(timeline);

  const filtered = year
    ? timeline.filter((entry) => String(new Date(entry.date).getFullYear()) === year)
    : timeline;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-text-primary">Timeline</h1>
        <p className="text-sm text-text-secondary">Projects, achievements, and professional milestones.</p>
      </div>

      {years.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setYear(undefined)}
            className={clsx(
              'rounded-qfull border px-3 py-1 text-xs',
              !year ? 'border-primary bg-primary/10 text-primary' : 'border-border text-text-secondary',
            )}
          >
            All
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYear(String(y))}
              className={clsx(
                'rounded-qfull border px-3 py-1 text-xs',
                year === String(y)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-text-secondary',
              )}
            >
              {y}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="ml-1">
          {filtered.map((entry, index) => (
            <TimelineItem
              key={entry.slug}
              entry={entry}
              index={index}
              isLast={index === filtered.length - 1}
            />
          ))}
        </div>
      ) : (
        <EmptyState icon="CalendarClock" title="Nothing to show for this year" />
      )}
    </div>
  );
}
