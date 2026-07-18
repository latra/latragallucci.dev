import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { StatCard } from '../components/StatCard';
import { ProjectCard } from '../components/ProjectCard';
import { AchievementCard } from '../components/AchievementCard';
import { PostCard } from '../components/PostCard';
import { Icon } from '../components/Icon';
import { EmptyState } from '../components/EmptyState';

export function HomePage() {
  const { profile, stats, projects, achievements, posts } = usePortfolio();

  const featuredProjects = projects.filter((p) => p.featured && p.status !== 'locked').slice(0, 3);
  const recentAchievements = achievements
    .filter((a) => a.status === 'unlocked')
    .sort((a, b) => (b.unlockedAt ?? '').localeCompare(a.unlockedAt ?? ''))
    .slice(0, 4);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col gap-14">
      <motion.section
        className="flex flex-col items-start gap-6 rounded-qlg border border-border bg-surface p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-20 w-20 rounded-qfull border-2 border-primary/60 object-cover"
            />
          )}
          <div>
            <p className="text-sm text-primary">{profile.title}</p>
            <h1 className="font-heading text-4xl text-text-primary">{profile.name}</h1>
            {profile.tagline && <p className="mt-1 text-text-secondary">{profile.tagline}</p>}
          </div>
        </div>

        <p className="max-w-2xl text-text-secondary">{profile.bio}</p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            className="flex items-center gap-2 rounded-qmd bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-fast hover:brightness-110"
          >
            <Icon name="Rocket" size={16} />
            View projects
          </Link>
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-qmd border border-border px-4 py-2 text-sm text-text-secondary transition-colors duration-fast hover:border-primary/50 hover:text-text-primary"
            >
              <Icon name="Mail" size={16} />
              Contact
            </a>
          )}
          {profile.socials?.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-qfull border border-border text-text-secondary transition-colors duration-fast hover:border-primary/50 hover:text-primary"
              aria-label={social.platform}
            >
              <Icon name={social.icon ?? 'Link'} size={14} />
            </a>
          ))}
        </div>
      </motion.section>

      <section>
        <h2 className="mb-3 font-heading text-lg text-text-primary">Stats</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard icon="Trophy" label="Completed" value={stats.completedCount} />
          <StatCard icon="Hammer" label="Active" value={stats.activeCount} />
          <StatCard icon="PauseCircle" label="Paused" value={stats.pausedCount} />
          <StatCard icon="Layers" label="Technologies" value={stats.technologiesUsedCount} />
          <StatCard icon="Clock" label="Hours invested" value={stats.totalHoursInvested} suffix="h" />
          <StatCard icon="Zap" label="Total XP" value={stats.totalXP} />
          <StatCard icon="Star" label="Overall level" value={stats.overallLevel} />
          <StatCard icon="Medal" label="Achievements" value={stats.achievementsUnlocked} suffix={`/${stats.achievementsTotal}`} />
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-lg text-text-primary">Featured projects</h2>
            <Link to="/projects" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-lg text-text-primary">Latest posts</h2>
            <Link to="/posts" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 font-heading text-lg text-text-primary">Recent achievements</h2>
        {recentAchievements.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {recentAchievements.map((achievement, index) => (
              <AchievementCard key={achievement.slug} achievement={achievement} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState icon="Trophy" title="No achievements unlocked yet" />
        )}
      </section>

      {profile.email && (
        <motion.section
          className="flex flex-col items-center gap-4 rounded-qlg border border-primary/30 bg-surface p-8 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-heading text-2xl text-text-primary">Let's talk</h2>
          <p className="max-w-md text-text-secondary">
            Always open to new projects, collaborations, or just talking tech.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded-qmd bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-fast hover:brightness-110"
          >
            <Icon name="Mail" size={16} />
            {profile.email}
          </a>
        </motion.section>
      )}
    </div>
  );
}
