import { getAllPosts } from '@/lib/posts';
import PostTile from '@/components/PostTile';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#629C77] mb-4">
            Nishant Iyengar
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to my blog
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostTile
              key={post.slug}
              slug={post.slug}
              metadata={post.metadata}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}
