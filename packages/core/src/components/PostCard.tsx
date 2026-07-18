import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Post } from '../types';
import { Icon } from './Icon';
import { Badge } from './Badge';
import { formatDate } from '../utils';

export interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const isExternal = Boolean(post.externalUrl);

  const inner = (
    <motion.div
      className="group flex h-full flex-col overflow-hidden rounded-qlg border border-border bg-surface p-4 transition-colors duration-base hover:border-primary/50 hover:bg-surface-hover"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.05 }}
      whileHover={{ y: -4 }}
    >
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="mb-3 h-32 w-full rounded-qmd object-cover"
        />
      )}

      <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <Icon name="Calendar" size={12} />
          {formatDate(post.date)}
        </span>
        {isExternal && (
          <span className="flex items-center gap-1">
            <Icon name="ExternalLink" size={12} />
            External
          </span>
        )}
      </div>

      <h3 className="mt-2 font-heading text-lg text-text-primary">{post.title}</h3>
      <p className="mt-1 line-clamp-3 flex-1 text-sm text-text-secondary">{post.excerpt}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );

  if (isExternal) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }

  return (
    <Link to={`/posts/${post.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}
