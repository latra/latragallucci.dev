import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { profile } from './data';

/** Scroll to the hash target after navigation, or to the top on a plain route change. */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export function Layout() {
  useScrollOnNavigate();
  const year = new Date().getFullYear();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <Link to="/" className="site-header__name">
            {profile.name}
          </Link>
          <nav aria-label="Main">
            <ul className="site-nav">
              <li>
                <NavLink to="/projects">Work</NavLink>
              </li>
              <li>
                <Link to="/#experience">Experience</Link>
              </li>
              <li>
                <Link to="/#contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <p>
            © {year} {profile.name}
          </p>
          <ul className="site-footer__links">
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
            )}
            {profile.socials?.map((s) => (
              <li key={s.platform}>
                <a href={s.url} rel="me noopener" target="_blank">
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
