import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function WritingsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Writings</h1>
      <div className="space-y-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writings/${post.slug}`}
            className="flex justify-between items-baseline py-3 group hover:no-underline"
          >
            <div>
              <span className="text-[#1a1a1a] group-hover:underline">
                {post.metadata.title}
              </span>
              {post.metadata.tag && (
                <span className="text-xs text-[#999] ml-3">
                  {post.metadata.tag}
                </span>
              )}
            </div>
            <time className="text-sm text-[#999] ml-4 shrink-0">
              {new Date(post.metadata.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </time>
          </Link>
        ))}
      </div>
    </div>
  );
}
