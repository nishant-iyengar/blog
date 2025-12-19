import { getAllPosts } from '@/lib/posts';
import PostTile from '@/components/PostTile';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="flex md:flex-row">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto px-4 md:px-8 py-8">
          <header className="mb-8 flex justify-end">
            <div className="text-right">
              <div className="text-base text-[#4A5568]">Nishant Iyengar</div>
              <div className="text-sm text-[#718096] mt-1">iyengar.nish@gmail.com</div>
            </div>
          </header>
          
          <div className="flex flex-wrap gap-4">
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
              <p className="text-[#718096]">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
