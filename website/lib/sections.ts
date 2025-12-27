import fs from 'fs';
import path from 'path';

const sectionsMetadataPath = path.join(process.cwd(), 'content/photos/sections.json');

export interface SectionMetadata {
  date: string;
  description?: string;
}

let sectionsCache: Map<string, SectionMetadata> | null = null;

export function getSectionMetadata(sectionId: string): SectionMetadata {
  if (sectionsCache === null) {
    loadSectionsMetadata();
  }
  return sectionsCache?.get(sectionId) || { date: sectionId };
}

function loadSectionsMetadata(): void {
  sectionsCache = new Map();
  
  try {
    if (fs.existsSync(sectionsMetadataPath)) {
      const fileContents = fs.readFileSync(sectionsMetadataPath, 'utf8');
      const sections: SectionMetadata[] = JSON.parse(fileContents);
      
      sections.forEach((section) => {
        sectionsCache!.set(section.date, section);
      });
    }
  } catch (error) {
    console.warn('Error loading sections metadata:', error);
  }
}
