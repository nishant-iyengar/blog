import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMetadata {
  slug: string; // Required: post slug (used for URL and media sub-folder)
  title: string;
  date: string; // Publication date (for display)
  createdAt?: string; // Creation date (for sorting, preferred over date)
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
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const metadata = data as PostMetadata;

      // Validate required slug property
      if (!metadata.slug) {
        console.warn(`Post ${fileName} is missing required 'slug' property`);
        // Fallback to filename for backward compatibility, but this should be fixed
        const fallbackSlug = fileName.replace(/\.mdx$/, '');
        return {
          slug: fallbackSlug,
          metadata: { ...metadata, slug: fallbackSlug },
          content,
        };
      }

      return {
        slug: metadata.slug,
        metadata,
        content,
      };
    });

  // Sort posts by createdAt (or date) in descending order (newest first)
  return allPostsData.sort((a, b) => {
    // Prefer createdAt over date for sorting
    const dateAStr = a.metadata.createdAt || a.metadata.date;
    const dateBStr = b.metadata.createdAt || b.metadata.date;
    
    const dateA = new Date(dateAStr).getTime();
    const dateB = new Date(dateBStr).getTime();
    
    // If dates are valid, sort by date (newest first)
    if (!isNaN(dateA) && !isNaN(dateB)) {
      return dateB - dateA; // Descending order (newest first)
    }
    
    // Fallback to string comparison if dates are invalid
    return dateBStr.localeCompare(dateAStr);
  });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    // First, try to find by matching slug in frontmatter
    const fileNames = fs.readdirSync(postsDirectory);
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.mdx')) continue;
      
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const metadata = data as PostMetadata;

      // Use slug from frontmatter if available, otherwise fallback to filename
      const postSlug = metadata.slug || fileName.replace(/\.mdx$/, '');
      
      if (postSlug === slug) {
        return {
          slug: postSlug,
          metadata: { ...metadata, slug: postSlug },
          content,
        };
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const metadata = data as PostMetadata;
      // Use slug from frontmatter if available, otherwise fallback to filename
      return metadata.slug || fileName.replace(/\.mdx$/, '');
    });
}

/**
 * Resolves a media path relative to a post's slug-based sub-folder
 * @param postSlug - The post's slug
 * @param mediaPath - The media filename or relative path
 * @returns The full path to the media file in the post's sub-folder
 */
export function getPostMediaPath(postSlug: string, mediaPath: string): string {
  // If mediaPath is already a full URL or absolute path, return it as-is
  if (mediaPath.startsWith('http://') || mediaPath.startsWith('https://') || mediaPath.startsWith('/')) {
    return mediaPath;
  }
  
  // Construct path: /posts/{slug}/{mediaPath}
  // This will be resolved by Next.js static file serving from public/posts/{slug}/
  // or can be used with Vercel Blob Storage paths like posts/{slug}/{mediaPath}
  return `/posts/${postSlug}/${mediaPath}`;
}
