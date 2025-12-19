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
