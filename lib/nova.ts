import fs from 'fs';
import path from 'path';

const novaMetadataDirectory = path.join(process.cwd(), 'content/nova');
const novaPublicDirectory = path.join(process.cwd(), 'public/nova');

export interface NovaPhotoMetadata {
  filename: string;
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
        
        // Check if the image file exists in public/nova
        const imagePath = path.join(novaPublicDirectory, metadata.filename);
        if (fs.existsSync(imagePath)) {
          photos.push({
            ...metadata,
            src: `/nova/${metadata.filename}`,
          });
        }
      }
    });

    return photos;
  } catch (error) {
    // Directory doesn't exist yet or error reading, return empty array
    return [];
  }
}
