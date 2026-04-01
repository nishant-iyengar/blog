import type { MDXComponents } from "mdx/types";
import { ReactNode } from "react";
import Media from "@/components/Media";
import RotatingWords from "@/components/RotatingWords";
import { getPostMediaPath } from "@/lib/posts";

export function useMDXComponents(
  components: MDXComponents = {},
  postSlug?: string
): MDXComponents {
  const MediaWithSlug = (props: {
    src: string;
    width?: string | number;
    height?: string | number;
    alt?: string;
    caption?: string;
  }) => {
    const resolvedSrc =
      postSlug &&
      !props.src.startsWith("http://") &&
      !props.src.startsWith("https://") &&
      !props.src.startsWith("/")
        ? getPostMediaPath(postSlug, props.src)
        : props.src;
    return <Media {...props} src={resolvedSrc} />;
  };

  return {
    Media: MediaWithSlug,
    RotatingWords,
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-xl font-semibold mb-4 mt-8">{children}</h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-lg font-semibold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-base font-semibold mb-2 mt-4">{children}</h3>
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p className="mb-4 text-[#555] leading-relaxed">{children}</p>
    ),
    a: ({ children, href }: { children?: ReactNode; href?: string }) => (
      <a href={href} className="underline hover:text-[#1a1a1a]">
        {children}
      </a>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-[#555]">
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-[#555]">
        {children}
      </ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code className="bg-[#f0f0f0] px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="bg-[#f0f0f0] p-4 rounded-lg mb-4 overflow-x-auto text-sm">
        {children}
      </pre>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-2 border-[#ddd] pl-4 italic my-4 text-[#999]">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
