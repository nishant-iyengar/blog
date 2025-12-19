import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  tag?: 'poem' | 'short story' | 'random';
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        metadata: data as PostMetadata,
        content,
      };
    });

  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    
    // If dates are valid, sort by date (newest first)
    if (!isNaN(dateA) && !isNaN(dateB)) {
      return dateB - dateA; // Descending order (newest first)
    }
    
    // Fallback to string comparison if dates are invalid
    return b.metadata.date.localeCompare(a.metadata.date);
  });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data as PostMetadata,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
