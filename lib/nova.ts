import fs from 'fs';
import path from 'path';

const novaMetadataDirectory = path.join(process.cwd(), 'content/nova');

export interface NovaPhotoMetadata {
  filename: string;
  blobUrl: string; // Required: Vercel Blob Storage URL
  caption?: string;
  alt?: string;
}

export interface NovaPhoto extends NovaPhotoMetadata {
  src: string;
}

export function getAllNovaPhotos(): NovaPhoto[] {
  try {
    // Check if metadata directory exists
    if (!fs.existsSync(novaMetadataDirectory)) {
      return [];
    }

    const files = fs.readdirSync(novaMetadataDirectory);
    const photos: NovaPhoto[] = [];

    files.forEach((file) => {
      // Skip README.md
      if (file === 'README.md') {
        return;
      }
      
      if (file.endsWith('.json')) {
        const filePath = path.join(novaMetadataDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const metadata: NovaPhotoMetadata = JSON.parse(fileContents);
        
        // Validate required field
        if (!metadata.blobUrl) {
          console.warn(`Nova photo ${file} is missing required 'blobUrl' property`);
          return;
        }
        
        // Only include photos with valid blobUrl
        photos.push({
          ...metadata,
          src: metadata.blobUrl,
        });
      }
    });

    return photos;
  } catch (error) {
    // Directory doesn't exist yet or error reading, return empty array
    return [];
  }
}
