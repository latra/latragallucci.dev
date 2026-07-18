import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';

export function NotFoundPage() {
  return (
    <EmptyState
      icon="MapPinOff"
      title="404 — Uncharted territory"
      description="This route doesn't exist on the map."
      action={
        <Link to="/" className="text-sm text-primary hover:underline">
          Back home
        </Link>
      }
    />
  );
}
