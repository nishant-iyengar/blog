import fs from 'fs';
import path from 'path';
import { getSectionMetadata } from './sections';

const photosMetadataDirectory = path.join(process.cwd(), 'content/photos');

export interface PhotoMetadata {
  filename: string;
  section: string; // Required: ISO date (YYYY-MM-DD) matching the sub-directory name
  blobUrl: string; // Required: Vercel Blob Storage URL
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

export function getAllPhotos(): Photo[] {
  try {
    // Check if metadata directory exists
    if (!fs.existsSync(photosMetadataDirectory)) {
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
              
              // Set section from directory name if not provided in metadata
              // This ensures consistency between directory structure and metadata
              const section = metadata.section || sectionDate;
              
              // Validate required fields
              if (!metadata.blobUrl) {
                console.warn(`Photo ${file} in ${sectionDate} is missing required 'blobUrl' property`);
                return;
              }
              
              // Only include photos with valid blobUrl
              photos.push({
                ...metadata,
                section, // Use directory name as section
                src: metadata.blobUrl,
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
        if (!metadata.section) {
          console.warn(`Photo ${entry.name} is missing required 'section' property`);
          return;
        }
        
        if (!metadata.blobUrl) {
          console.warn(`Photo ${entry.name} is missing required 'blobUrl' property`);
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
    console.error('Error fetching photos:', error);
    return [];
  }
}

export function getPhotosBySection(): PhotoSection[] {
  const photos = getAllPhotos();
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
