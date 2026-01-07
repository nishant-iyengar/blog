/**
 * Upload an image to Vercel Blob Storage
 * 
 * Usage:
 *   pnpm tsx scripts/upload-image.ts <image-path> <category> [--update-metadata]
 * 
 * Examples:
 *   pnpm tsx scripts/upload-image.ts ./my-photo.jpg photos
 *   pnpm tsx scripts/upload-image.ts ./animal-photo.jpg animals --update-metadata
 */

// Load environment variables from root .env FIRST
import '../lib/env-loader';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

interface PhotoMetadata {
  filename?: string;
  blobUrl?: string;
  section?: string;
  date?: string;
  caption?: string;
  alt?: string;
  rank?: number;
}

const args = process.argv.slice(2);
const updateMetadata = args.includes('--update-metadata');
const filteredArgs = args.filter(arg => arg !== '--update-metadata');

if (filteredArgs.length < 2) {
  console.error('Usage: pnpm tsx scripts/upload-image.ts <image-path> <category> [--update-metadata]');
  console.error('  category: "photos" or "animals"');
  console.error('  --update-metadata: Automatically create/update JSON metadata file');
  process.exit(1);
}

const [imagePath, category] = filteredArgs;

if (!['photos', 'animals'].includes(category)) {
  console.error('Category must be "photos" or "animals"');
  process.exit(1);
}

const fullImagePath = path.resolve(imagePath);
if (!fs.existsSync(fullImagePath)) {
  console.error(`File not found: ${fullImagePath}`);
  process.exit(1);
}

async function uploadImage() {
  try {
    const fileBuffer = fs.readFileSync(fullImagePath);
    const filename = path.basename(fullImagePath);
    const timestamp = Date.now();
    const blobPath = `${category}/${timestamp}-${filename}`;

    console.log(`Uploading ${filename} to Vercel Blob Storage...`);

    const blob = await put(blobPath, fileBuffer, {
      access: 'public',
    });

    console.log(`✅ Upload successful!`);
    console.log(`   URL: ${blob.url}`);
    console.log(`   Path: ${blob.pathname}`);

    if (updateMetadata) {
      const metadataDir = path.join(process.cwd(), 'content', category);
      const metadataFilename = path.basename(filename, path.extname(filename)) + '.json';
      const metadataPath = path.join(metadataDir, metadataFilename);

      // Read existing metadata or create new
      let metadata: PhotoMetadata = {};
      if (fs.existsSync(metadataPath)) {
        const existingContent = fs.readFileSync(metadataPath, 'utf8');
        metadata = JSON.parse(existingContent) as PhotoMetadata;
        console.log(`   Updating existing metadata: ${metadataFilename}`);
      } else {
        console.log(`   Creating new metadata: ${metadataFilename}`);
      }

      // Update metadata with blob URL
      metadata.filename = filename;
      metadata.blobUrl = blob.url;

      // For photos, require section
      if (category === 'photos' && !metadata.section) {
        console.log('\n⚠️  Photos require a section. Please add it manually to the metadata file.');
        console.log('   Example: "section": "2024-12-19"');
      }

      // Ensure metadata directory exists
      if (!fs.existsSync(metadataDir)) {
        fs.mkdirSync(metadataDir, { recursive: true });
      }

      // Write metadata file
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
      console.log(`   ✅ Metadata saved to: ${metadataPath}`);
    } else {
      console.log(`\n💡 Tip: Add --update-metadata to automatically create/update the JSON metadata file`);
      console.log(`\nAdd this to your metadata JSON file:`);
      console.log(`  "blobUrl": "${blob.url}"`);
    }

    return blob.url;
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

uploadImage();
