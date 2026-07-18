import { usePortfolio } from '../hooks/usePortfolio';
import { Icon } from '../components/Icon';

export function AboutPage() {
  const { profile } = usePortfolio();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-text-primary">About me</h1>
      </div>

      <p className="max-w-2xl whitespace-pre-line text-text-secondary">{profile.bio}</p>

      <div className="flex flex-wrap gap-4 text-sm text-text-muted">
        {profile.location && (
          <span className="flex items-center gap-1">
            <Icon name="MapPin" size={14} />
            {profile.location}
          </span>
        )}
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-primary">
            <Icon name="Mail" size={14} />
            {profile.email}
          </a>
        )}
      </div>

      {profile.links && profile.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {profile.links.map((link) => (
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
    </div>
  );
}
