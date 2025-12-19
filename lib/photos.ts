import fs from 'fs';
import path from 'path';

const photosMetadataDirectory = path.join(process.cwd(), 'content/photos');
const photosPublicDirectory = path.join(process.cwd(), 'public/photos');

export interface PhotoMetadata {
  filename: string;
  caption?: string;
  alt?: string;
}

export interface Photo extends PhotoMetadata {
  src: string;
}

export function getAllPhotos(): Photo[] {
  try {
    // Check if metadata directory exists
    if (!fs.existsSync(photosMetadataDirectory)) {
      return [];
    }

    const files = fs.readdirSync(photosMetadataDirectory);
    const photos: Photo[] = [];

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(photosMetadataDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const metadata: PhotoMetadata = JSON.parse(fileContents);
        
        // Check if the image file exists in public/photos
        const imagePath = path.join(photosPublicDirectory, metadata.filename);
        if (fs.existsSync(imagePath)) {
          photos.push({
            ...metadata,
            src: `/photos/${metadata.filename}`,
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
