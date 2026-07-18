import { Link, useParams } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { EmptyState } from '../components/EmptyState';
import { formatDate } from '../utils';

export function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = usePortfolio();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <EmptyState
        icon="Newspaper"
        title="Post not found"
        action={
          <Link to="/posts" className="text-sm text-primary hover:underline">
            Back to posts
          </Link>
        }
      />
    );
  }

  const Content = post.Content;

  return (
    <article className="flex flex-col gap-6">
      <Link to="/posts" className="flex w-fit items-center gap-1 text-sm text-text-muted hover:text-primary">
        <Icon name="ArrowLeft" size={14} />
        Posts
      </Link>

      <header>
        <h1 className="font-heading text-3xl text-text-primary">{post.title}</h1>
        <p className="mt-2 text-text-secondary">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-text-muted">
          <span className="flex items-center gap-1">
            <Icon name="Calendar" size={14} />
            {formatDate(post.date)}
          </span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="rounded-qlg border border-border object-cover" />
      )}

      <div className="prose prose-invert max-w-none text-text-secondary">
        <Content />
      </div>
    </article>
  );
}
