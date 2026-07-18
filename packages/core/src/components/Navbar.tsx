import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { usePortfolio } from '../hooks/usePortfolio';
import { Icon } from './Icon';
import { ThemeModeToggle } from './ThemeModeToggle';

export function Navbar() {
  const { profile, navigation, stats } = usePortfolio();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-8 w-8 rounded-qfull object-cover"
            />
          )}
          <div className="leading-tight">
            <p className="font-heading text-sm text-text-primary">{profile.name}</p>
            <p className="text-xs text-text-muted">
              Lvl. {stats.overallLevel} · {stats.totalXP} XP
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-1">
          {navigation.items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-1 rounded-qmd px-3 py-1.5 text-sm transition-colors duration-fast',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                )
              }
            >
              {item.icon && <Icon name={item.icon} size={14} />}
              {item.label}
            </NavLink>
          ))}
          <ThemeModeToggle />
        </nav>
      </div>
    </header>
  );
}
