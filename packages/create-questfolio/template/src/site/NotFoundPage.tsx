import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="wrap page">
      <header className="page__head">
        <h1>Page not found</h1>
        <p className="page__lede">
          This address doesn’t point to anything here. It may have moved, or never existed.
        </p>
        <p>
          <Link to="/" className="button">
            Back to the home page
          </Link>
        </p>
      </header>
    </div>
  );
}
