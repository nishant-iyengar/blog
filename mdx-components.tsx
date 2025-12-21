import type { MDXComponents } from 'mdx/types';
import { ReactNode } from 'react';
import Media from '@/components/Media';
import RotatingWords from '@/components/RotatingWords';
import { getPostMediaPath } from '@/lib/posts';

export function useMDXComponents(components: MDXComponents = {}, postSlug?: string): MDXComponents {
  // Create a Media wrapper that resolves paths relative to post slug
  const MediaWithSlug = (props: { src: string; width?: string | number; height?: string | number; alt?: string; caption?: string }) => {
    // If src is a full URL, use it as-is. Otherwise, resolve it relative to post slug
    const resolvedSrc = postSlug && !props.src.startsWith('http://') && !props.src.startsWith('https://') && !props.src.startsWith('/')
      ? getPostMediaPath(postSlug, props.src)
      : props.src;
    
    return <Media {...props} src={resolvedSrc} />;
  };

  return {
    Media: MediaWithSlug,
    RotatingWords,
    // Customize built-in components
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-2xl font-bold mb-4 mt-6 text-[#629C77]">{children}</h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-xl font-semibold mb-3 mt-5 text-[#629C77]">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-lg font-semibold mb-2 mt-4 text-[#629C77]">{children}</h3>
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p className="mb-3 text-sm leading-5 text-[#4A5568]">{children}</p>
    ),
    a: ({ children, href }: { children?: ReactNode; href?: string }) => (
      <a href={href} className="text-[#629C77] hover:underline hover:text-[#4a7a5d]">{children}</a>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc list-inside mb-3 space-y-1.5 text-sm text-[#4A5568]">{children}</ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal list-inside mb-3 space-y-1.5 text-sm text-[#4A5568]">{children}</ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li className="ml-4 leading-6">{children}</li>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="bg-gray-100 p-3 rounded-lg mb-3 overflow-x-auto text-sm">{children}</pre>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-4 border-[#629C77] pl-4 italic my-3 text-sm text-[#4A5568]">{children}</blockquote>
    ),
    ...components,
  };
}
