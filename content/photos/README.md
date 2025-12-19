# Adding Photos

Photos are organized by **sections** (typically by date). Each photo must belong to a section.

## Photo Structure

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
  "section": "2024-12-19",
  "caption": "Optional caption text that appears below the photo",
  "alt": "Optional alt text for accessibility"
}
```

## Required Fields

- **`filename`**: The name of the image file in `public/photos/`
- **`section`**: **REQUIRED** - Section identifier (typically a date like "2024-12-19" or "2024-01-15")
  - Photos are grouped by section on the photos page
  - Sections are displayed with the date as a header
  - Sections are sorted by date (newest first)

## Optional Fields

- **`caption`**: Text displayed below the photo
- **`alt`**: Alt text for accessibility (defaults to caption if not provided)

## Example

**Files:**
- Image: `public/photos/sunset.jpg`
- Metadata: `content/photos/sunset.json`

**JSON content:**
```json
{
  "filename": "sunset.jpg",
  "section": "2024-12-19",
  "caption": "Beautiful sunset over the mountains",
  "alt": "Sunset landscape"
}
```

## Section Organization

Photos are automatically grouped by their `section` property:
- Each section appears as a separate section on the photos page
- Section date is displayed as a header (formatted as "Month Day, Year")
- Sections are sorted chronologically (newest first)
- Photos within each section are displayed in a grid

**Note:** All photos must have a `section` property. Photos without a section will not be displayed.

## Section Descriptions

To add an optional description to a section, edit `content/photos/sections.json`:

```json
[
  {
    "date": "2024-12-19",
    "description": "A memorable trip to the mountains"
  },
  {
    "date": "2024-01-15",
    "description": "Winter photography session"
  }
]
```

The description will appear as a subheader below the section date on the photos page.
