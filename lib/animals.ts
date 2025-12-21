import fs from 'fs';
import path from 'path';
import { list } from '@vercel/blob';
import { isValidFileType, FileType } from './utils';

const animalsMetadataDirectory = path.join(process.cwd(), 'content/animals');

// Animals only supports jpg/jpeg and png
const ANIMALS_ALLOWED_FILE_TYPES = [FileType.JPG, FileType.JPEG, FileType.PNG];

export interface AnimalPhotoMetadata {
  filename: string;
  date?: string; // Optional: photo date (ISO format: YYYY-MM-DD)
  caption?: string;
  alt?: string;
}

export interface AnimalPhoto extends AnimalPhotoMetadata {
  src: string;
}

export async function getAllAnimalPhotos(): Promise<AnimalPhoto[]> {
  try {
    // Check if metadata directory exists
    if (!fs.existsSync(animalsMetadataDirectory)) {
      console.warn('Animals metadata directory does not exist');
      return [];
    }

    const files = fs.readdirSync(animalsMetadataDirectory);
    const photos: AnimalPhoto[] = [];

    // Get all blobs in the animals/ folder
    // Check if BLOB_READ_WRITE_TOKEN is available
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN environment variable is not set');
      return [];
    }

    let blobs;
    try {
      const result = await list({ prefix: 'animals/' });
      blobs = result.blobs;
    } catch (error) {
      console.error('Error fetching blobs from Vercel Blob Storage:', error);
      return [];
    }

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(animalsMetadataDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const metadata: AnimalPhotoMetadata = JSON.parse(fileContents);
        
        // Validate required fields
        if (!metadata.filename) {
          console.warn(`Animal photo ${file} is missing required 'filename' property`);
          continue;
        }
        
        // Validate file type
        if (!isValidFileType(metadata.filename, ANIMALS_ALLOWED_FILE_TYPES)) {
          console.warn(`Animal photo ${metadata.filename} has unsupported file type. Only jpg, jpeg, and png are allowed.`);
          continue;
        }
        
        // Find the blob that matches the filename
        // The blob pathname should end with the filename (may have timestamp prefix)
        const matchingBlobs = blobs.filter(blob => {
          const blobMatches = blob.pathname.endsWith(metadata.filename) || 
                             blob.pathname === `animals/${metadata.filename}`;
          
          // Also validate the blob's file type
          return blobMatches && isValidFileType(blob.pathname, ANIMALS_ALLOWED_FILE_TYPES);
        });
        
        if (matchingBlobs.length === 0) {
          console.warn(`Animal photo ${metadata.filename} not found in blob storage`);
          continue;
        }
        
        // If multiple matches (e.g., different timestamps), use the most recent one
        const matchingBlob = matchingBlobs.sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0];
        
        photos.push({
          ...metadata,
          src: matchingBlob.url,
        });
      }
    }

    return photos;
  } catch (error) {
    // Directory doesn't exist yet or error reading, return empty array
    console.error('Error fetching Animal photos:', error);
    return [];
  }
}
