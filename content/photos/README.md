# Adding Photos

To add photos to your blog:

1. **Add the image file** to `public/photos/` directory
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
   - Example: `public/photos/photo1.jpg`

2. **Create a JSON metadata file** in `content/photos/` directory
   - The filename should match the image filename (with `.json` extension)
   - Example: `content/photos/photo1.json`

3. **JSON file format:**
```json
{
  "filename": "photo1.jpg",
  "caption": "Optional caption text that appears below the photo",
  "alt": "Optional alt text for accessibility"
}
```

**Example:**
- Image: `public/photos/sunset.jpg`
- Metadata: `content/photos/sunset.json`
- JSON content:
```json
{
  "filename": "sunset.jpg",
  "caption": "Beautiful sunset over the mountains",
  "alt": "Sunset landscape"
}
```

The photos will automatically appear on the `/photos` page.
