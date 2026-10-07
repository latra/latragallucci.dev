import { Link } from 'react-router-dom';
import { ProjectList } from './ProjectList';
import { experience, profile, selectedWork } from './data';
import { hostOf, projectYears, year } from './format';

export function HomePage() {
  const featured = selectedWork.find((p) => p.featured) ?? selectedWork[0];
  const rest = selectedWork.filter((p) => p !== featured).slice(0, 5);

  return (
    <>
      <section className="intro wrap" aria-labelledby="intro-title">
        <h1 id="intro-title" className="intro__name">
          {profile.name}
        </h1>
        <div className="intro__grid">
          <div>
            <p className="intro__lede">{profile.tagline}</p>
            <p className="intro__bio">{profile.bio}</p>
          </div>
          <dl className="intro__facts">
            <div>
              <dt>Currently</dt>
              {profile.roles.map((role) => (
                <dd key={role.org}>
                  {role.title}
                  <br />
                  <span className="muted">
                    {role.url ? (
                      <a href={role.url} target="_blank" rel="noopener">
                        {role.org}
                      </a>
                    ) : (
                      role.org
                    )}
                  </span>
                </dd>
              ))}
            </div>
            {profile.location && (
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="work-title">
        <div className="section__head">
          <h2 id="work-title">Selected work</h2>
          <Link to="/projects" className="text-link">
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>

        {featured && (
          <article className="feature">
            <div className="feature__body">
              <p className="feature__years">{projectYears(featured)}</p>
              <h3 className="feature__title">
                <Link to={`/projects/${featured.slug}`}>{featured.title}</Link>
              </h3>
              <p className="feature__desc">{featured.description}</p>
              <p className="feature__actions">
                <Link to={`/projects/${featured.slug}`} className="button">
                  Read the case study
                </Link>
                {featured.demo && (
                  <a href={featured.demo} className="text-link" target="_blank" rel="noopener">
                    {hostOf(featured.demo)} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            </div>
            <dl className="feature__meta">
              <div>
                <dt>Stack</dt>
                <dd>{featured.technologies.join(', ')}</dd>
              </div>
              <div>
                <dt>Area</dt>
                <dd>{featured.categories.join(', ')}</dd>
              </div>
            </dl>
          </article>
        )}

        <ProjectList projects={rest} />
      </section>

      <section id="experience" className="section wrap split" aria-labelledby="exp-title">
        <h2 id="exp-title">Experience &amp; education</h2>
        <ol className="cv">
          {profile.roles.map((role) => (
            <li key={role.org} className="cv__item">
              <span className="cv__when">Now</span>
              <span>
                <span className="cv__title">{role.title}</span>
                <span className="cv__desc">{role.org}</span>
              </span>
            </li>
          ))}
          {experience.map((entry) => (
            <li key={entry.slug} className="cv__item">
              <span className="cv__when">{year(entry.date)}</span>
              <span>
                <span className="cv__title">{entry.title}</span>
                <span className="cv__desc">{entry.description}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="wrap contact__inner">
          <h2 id="contact-title">Get in touch</h2>
          <p className="contact__text">
            For engineering roles, research collaborations or teaching, email is the quickest way to
            reach me.
          </p>
          {profile.email && (
            <a className="contact__email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          )}
          <ul className="contact__links">
            {profile.socials?.map((s) => (
              <li key={s.platform}>
                <a href={s.url} target="_blank" rel="me noopener">
                  {s.platform} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
