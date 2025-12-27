import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';
import { toSentenceCase } from '@/lib/utils';
import Badge from './Badge';

interface PostTileProps {
  slug: string;
  metadata: PostMetadata;
}

export default function PostTile({ slug, metadata }: PostTileProps) {
  const tag = metadata.tag || 'random';
  
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Link href={`/posts/${slug}`}>
      <div data-post-tile className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-[#E2E8F0] hover:border-[#629C77] cursor-pointer w-[280px] h-[200px] flex flex-col">
        <h2 className="text-base font-semibold mb-2 text-[#629C77] line-clamp-2">
          {toSentenceCase(metadata.title)}
        </h2>
        <p className="text-xs text-[#718096] mb-3 flex-grow leading-4 line-clamp-3">
          {metadata.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <Badge tag={tag} />
          {metadata.date && (
            <time className="text-xs text-[#718096]">
              {formatDate(metadata.date)}
            </time>
          )}
        </div>
      </div>
    </Link>
  );
}
