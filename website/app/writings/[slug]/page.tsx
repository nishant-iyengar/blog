import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function WritingPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({}, post.slug);

  return (
    <article>
      <Link
        href="/writings"
        className="text-sm text-[#999] hover:text-[#1a1a1a] transition-colors mb-8 inline-block"
      >
        &larr; back
      </Link>

      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">{post.metadata.title}</h1>
        {post.metadata.excerpt && (
          <p className="text-[#999] text-sm mb-1">{post.metadata.excerpt}</p>
        )}
        <time className="text-xs text-[#999]">
          {new Date(post.metadata.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <div className="border-t border-[#eee] pt-8">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}
