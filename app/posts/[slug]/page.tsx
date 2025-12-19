import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';

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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-block mb-8 text-[#629C77] hover:underline"
        >
          ← Back to Home
        </Link>
        
        <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-[#629C77] mb-4">
              {post.metadata.title}
            </h1>
            <p className="text-gray-600 mb-2">
              {post.metadata.excerpt}
            </p>
            <time className="text-sm text-gray-500">
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={components} />
          </div>
        </article>
      </main>
    </div>
  );
}
