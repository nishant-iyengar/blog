/**
 * Converts a string to sentence case (first letter capitalized, rest lowercase)
 */
export function toSentenceCase(text: string): string {
  if (!text) return text;
  
  // Trim and convert to lowercase, then capitalize first letter
  const trimmed = text.trim();
  if (trimmed.length === 0) return text;
  
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/**
 * Supported file types for different content categories
 */
export enum FileType {
  JPG = 'jpg',
  JPEG = 'jpeg',
  PNG = 'png',
  GIF = 'gif',
  WEBP = 'webp',
  MP4 = 'mp4',
  MOV = 'mov',
  PDF = 'pdf',
}

/**
 * Checks if a file or blob pathname matches one of the provided file types
 * @param filename - The filename or blob pathname to check
 * @param allowedTypes - Array of FileType enums to check against
 * @returns true if the file extension matches one of the allowed types
 */
export function isValidFileType(filename: string, allowedTypes: FileType[]): boolean {
  if (!filename || allowedTypes.length === 0) {
    return false;
  }

  // Extract file extension (handle both regular filenames and blob pathnames)
  const extension = filename
    .split('.')
    .pop()
    ?.toLowerCase()
    .trim();

  if (!extension) {
    return false;
  }

  return allowedTypes.some(type => type.toLowerCase() === extension);
}
