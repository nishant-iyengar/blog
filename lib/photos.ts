import fs from 'fs';
import path from 'path';
import { list } from '@vercel/blob';
import { getSectionMetadata } from './sections';
import { isValidFileType, FileType } from './utils';

const photosMetadataDirectory = path.join(process.cwd(), 'content/photos');

// Photos support all image types
const PHOTOS_ALLOWED_FILE_TYPES = [
  FileType.JPG,
  FileType.JPEG,
  FileType.PNG,
  FileType.GIF,
  FileType.WEBP,
];

export interface PhotoMetadata {
  filename: string;
  section: string; // Required: ISO date (YYYY-MM-DD) matching the sub-directory name
  date?: string; // Optional: photo date (for sorting)
  rank?: number; // Optional: photo rank (for sorting)
  caption?: string;
  alt?: string;
}

export interface Photo extends PhotoMetadata {
  src: string;
}

export interface PhotoSection {
  date: string; // Section date/identifier
  description?: string; // Optional section description
  photos: Photo[];
}

export async function getAllPhotos(): Promise<Photo[]> {
  try {
    // Check if metadata directory exists
    if (!fs.existsSync(photosMetadataDirectory)) {
      console.warn('Photos metadata directory does not exist');
      return [];
    }

    // Check if BLOB_READ_WRITE_TOKEN is available
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN environment variable is not set');
      return [];
    }

    // Get all blobs in the photos/ folder
    let blobs;
    try {
      const result = await list({ prefix: 'photos/' });
      blobs = result.blobs;
    } catch (error) {
      console.error('Error fetching blobs from Vercel Blob Storage:', error);
      return [];
    }

    const photos: Photo[] = [];
    const entries = fs.readdirSync(photosMetadataDirectory, { withFileTypes: true });

    entries.forEach((entry) => {
      // Skip sections.json if it's in the root
      if (entry.isFile() && entry.name === 'sections.json') {
        return;
      }

      // If it's a directory (ISO date sub-folder), read JSON files from it
      if (entry.isDirectory()) {
        const sectionDate = entry.name; // Directory name is the ISO date (section)
        const sectionPath = path.join(photosMetadataDirectory, sectionDate);
        
        // Validate that the directory name is a valid ISO date format (YYYY-MM-DD)
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!isoDateRegex.test(sectionDate)) {
          console.warn(`Photo directory ${sectionDate} does not match ISO date format (YYYY-MM-DD)`);
          return;
        }

        try {
          const files = fs.readdirSync(sectionPath);
          files.forEach((file) => {
            if (file.endsWith('.json')) {
              const filePath = path.join(sectionPath, file);
              const fileContents = fs.readFileSync(filePath, 'utf8');
              const metadata: PhotoMetadata = JSON.parse(fileContents);
              
              // Validate required fields
              if (!metadata.filename) {
                console.warn(`Photo ${file} in ${sectionDate} is missing required 'filename' property`);
                return;
              }
              
              // Set section from directory name if not provided in metadata
              const section = metadata.section || sectionDate;
              
              // Validate file type
              if (!isValidFileType(metadata.filename, PHOTOS_ALLOWED_FILE_TYPES)) {
                console.warn(`Photo ${metadata.filename} has unsupported file type`);
                return;
              }
              
              // Find the blob that matches the filename
              // Expected blob path structure: photos/<date>/photo.jpeg or photos/<date>/<timestamp>-photo.jpeg
              const matchingBlobs = blobs.filter(blob => {
                // Primary: Match photos/<date>/filename (with or without timestamp prefix)
                const matchesDateSubdir = blob.pathname.startsWith(`photos/${sectionDate}/`) && 
                                         blob.pathname.endsWith(metadata.filename);
                
                // Fallback: Match photos/filename (root level)
                const matchesRoot = blob.pathname === `photos/${metadata.filename}`;
                
                // Also validate the blob's file type
                return (matchesDateSubdir || matchesRoot) && isValidFileType(blob.pathname, PHOTOS_ALLOWED_FILE_TYPES);
              });
              
              if (matchingBlobs.length === 0) {
                console.warn(`Photo ${metadata.filename} not found in blob storage`);
                return;
              }
              
              // If multiple matches (e.g., different timestamps), use the most recent one
              const matchingBlob = matchingBlobs.sort((a, b) => 
                new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
              )[0];
              
              // Only include photos with valid blob match
              photos.push({
                ...metadata,
                section, // Use directory name as section
                src: matchingBlob.url,
              });
            }
          });
        } catch (error) {
          console.warn(`Error reading photos from directory ${sectionDate}:`, error);
        }
      }
      
      // Also support legacy structure: JSON files directly in photos directory
      // (for backward compatibility)
      if (entry.isFile() && entry.name.endsWith('.json')) {
        const filePath = path.join(photosMetadataDirectory, entry.name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const metadata: PhotoMetadata = JSON.parse(fileContents);
        
        // Validate required fields
        if (!metadata.filename) {
          console.warn(`Photo ${entry.name} is missing required 'filename' property`);
          return;
        }
        
        if (!metadata.section) {
          console.warn(`Photo ${entry.name} is missing required 'section' property`);
          return;
        }
        
        // Validate file type
        if (!isValidFileType(metadata.filename, PHOTOS_ALLOWED_FILE_TYPES)) {
          console.warn(`Photo ${metadata.filename} has unsupported file type`);
          return;
        }
        
        // Find the blob that matches the filename
        const matchingBlobs = blobs.filter(blob => {
          const blobMatches = blob.pathname.endsWith(metadata.filename) || 
                             blob.pathname === `photos/${metadata.filename}`;
          
          return blobMatches && isValidFileType(blob.pathname, PHOTOS_ALLOWED_FILE_TYPES);
        });
        
        if (matchingBlobs.length === 0) {
          console.warn(`Photo ${metadata.filename} not found in blob storage`);
          return;
        }
        
        // If multiple matches, use the most recent one
        const matchingBlob = matchingBlobs.sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0];
        
        photos.push({
          ...metadata,
          src: matchingBlob.url,
        });
      }
    });

    return photos;
  } catch (error) {
    // Directory doesn't exist yet or error reading, return empty array
    console.error('Error fetching photos:', error);
    return [];
  }
}

export async function getPhotosBySection(): Promise<PhotoSection[]> {
  const photos = await getAllPhotos();
  const sectionsMap = new Map<string, PhotoSection>();

  photos.forEach((photo) => {
    if (!sectionsMap.has(photo.section)) {
      const sectionMeta = getSectionMetadata(photo.section);
      sectionsMap.set(photo.section, {
        date: photo.section,
        description: sectionMeta.description,
        photos: [],
      });
    }
    sectionsMap.get(photo.section)!.photos.push(photo);
  });

  // Sort photos within each section by date and/or rank
  sectionsMap.forEach((section) => {
    section.photos.sort((a, b) => {
      // First, try to sort by date if both have dates
      if (a.date && b.date) {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (!isNaN(dateA) && !isNaN(dateB)) {
          const dateDiff = dateB - dateA; // Newest first
          if (dateDiff !== 0) return dateDiff;
        }
      }
      
      // If dates are equal or one is missing, sort by rank
      if (a.rank !== undefined && b.rank !== undefined) {
        return a.rank - b.rank; // Lower rank first
      }
      if (a.rank !== undefined) return -1; // Photos with rank come first
      if (b.rank !== undefined) return 1;
      
      // If only one has a date, prioritize it
      if (a.date && !b.date) return -1;
      if (b.date && !a.date) return 1;
      
      // If both have dates but couldn't parse, try string comparison
      if (a.date && b.date) {
        return b.date.localeCompare(a.date);
      }
      
      // Default: maintain original order
      return 0;
    });
  });

  // Convert to array and sort sections by date from sections.json (newest first)
  const sections = Array.from(sectionsMap.values());
  sections.sort((a, b) => {
    const sectionMetaA = getSectionMetadata(a.date);
    const sectionMetaB = getSectionMetadata(b.date);
    
    // Use the date from sections.json metadata if available, otherwise use section identifier
    const dateAStr = sectionMetaA.date || a.date;
    const dateBStr = sectionMetaB.date || b.date;
    
    // Try to parse section dates for sorting
    const dateA = new Date(dateAStr).getTime();
    const dateB = new Date(dateBStr).getTime();
    if (!isNaN(dateA) && !isNaN(dateB)) {
      return dateB - dateA; // Newest first
    }
    // If not valid dates, sort alphabetically (reverse)
    return dateBStr.localeCompare(dateAStr);
  });

  return sections;
}
