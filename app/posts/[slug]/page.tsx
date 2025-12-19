import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import Sidebar from '@/components/Sidebar';
import { toSentenceCase } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="flex md:flex-row">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-8">
          <header className="mb-8 flex justify-end">
            <div className="text-right">
              <div className="text-base text-[#4A5568]">Nishant Iyengar</div>
              <div className="text-sm text-[#718096] mt-1">iyengar.nish@gmail.com</div>
            </div>
          </header>
          
          <article className="bg-white rounded-lg border border-[#E2E8F0] p-8 md:p-12 shadow-sm">
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-[#629C77] mb-3">
                {toSentenceCase(post.metadata.title)}
              </h1>
              <p className="text-sm text-[#718096] mb-2 leading-5">
                {post.metadata.excerpt}
              </p>
              <time className="text-xs text-[#718096]">
                {new Date(post.metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </header>
            
            <div className="max-w-none">
              <MDXRemote source={post.content} components={components} />
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
