import { usePortfolio } from '../hooks/usePortfolio';
import { PostCard } from '../components/PostCard';
import { EmptyState } from '../components/EmptyState';

export function PostsPage() {
  const { posts } = usePortfolio();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-text-primary">Posts</h1>
        <p className="text-sm text-text-secondary">Articles and publications.</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState icon="Newspaper" title="No posts yet" />
      )}
    </div>
  );
}
