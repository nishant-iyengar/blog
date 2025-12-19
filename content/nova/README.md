# Adding Nova Photos

Nova is a simple gallery format for dog photos - no sections required!

## Photo Structure

1. **Add the image file** to `public/nova/` directory
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
   - Example: `public/nova/nova1.jpg`

2. **Create a JSON metadata file** in `content/nova/` directory
   - The filename should match the image filename (with `.json` extension)
   - Example: `content/nova/nova1.json`

3. **JSON file format:**
```json
{
  "filename": "nova1.jpg",
  "caption": "Optional caption text that appears below the photo",
  "alt": "Optional alt text for accessibility"
}
```

## Required Fields

- **`filename`**: The name of the image file in `public/nova/`

## Optional Fields

- **`caption`**: Text displayed below the photo
- **`alt`**: Alt text for accessibility (defaults to caption if not provided)

## Example

**Files:**
- Image: `public/nova/nova-playing.jpg`
- Metadata: `content/nova/nova-playing.json`

**JSON content:**
```json
{
  "filename": "nova-playing.jpg",
  "caption": "Nova playing in the park",
  "alt": "Nova the dog playing fetch"
}
```

## Gallery Format

- Photos are displayed in a simple grid (no sections)
- Grid is responsive: 1 column on mobile, 2 on tablet, 3 on desktop
- Photos are sorted in the order they appear in the directory
- Hover effects: photos scale slightly and show a dark overlay
