import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';

interface PostTileProps {
  slug: string;
  metadata: PostMetadata;
}

export default function PostTile({ slug, metadata }: PostTileProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 hover:border-[#629C77] cursor-pointer h-full flex flex-col">
        <h2 className="text-2xl font-semibold mb-3 text-[#629C77]">
          {metadata.title}
        </h2>
        <p className="text-gray-600 mb-4 flex-grow">
          {metadata.excerpt}
        </p>
        <div className="text-sm text-gray-500 mt-auto">
          {new Date(metadata.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </Link>
  );
}
