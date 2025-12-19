import type { MDXComponents } from 'mdx/types';
import { ReactNode } from 'react';

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    // Customize built-in components
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8 text-[#629C77]">{children}</h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-3xl font-semibold mb-4 mt-6 text-[#629C77]">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-5 text-[#629C77]">{children}</h3>
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p className="mb-4 leading-7">{children}</p>
    ),
    a: ({ children, href }: { children?: ReactNode; href?: string }) => (
      <a href={href} className="text-[#629C77] hover:underline">{children}</a>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">{children}</pre>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-4 border-[#629C77] pl-4 italic my-4">{children}</blockquote>
    ),
    ...components,
  };
}
