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

  return (
    <Link href={`/posts/${slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-[#E2E8F0] hover:border-[#629C77] cursor-pointer w-[240px] h-[240px] flex flex-col">
        <h2 className="text-base font-semibold mb-2 text-[#629C77] line-clamp-2">
          {toSentenceCase(metadata.title)}
        </h2>
        <p className="text-xs text-[#718096] mb-3 flex-grow leading-4 line-clamp-3">
          {metadata.excerpt}
        </p>
        <div className="mt-auto">
          <Badge tag={tag} />
        </div>
      </div>
    </Link>
  );
}
