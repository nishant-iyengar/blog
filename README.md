# Nishant Iyengar's Blog

A simple, elegant blog built with Next.js 16 and MDX, designed to showcase blog posts with a clean tile-based interface.

## Features

- 🎨 Simple, clean design with custom color theme (#629C77)
- 📝 MDX support for rich content with custom React components
- 🏠 Tile-based homepage displaying all blog posts
- 📱 Fully responsive design
- ⚡ Static site generation for optimal performance
- 🚀 Easy deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- pnpm (package manager)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding New Blog Posts

To add a new blog post:

1. Create a new `.mdx` file in the `content/posts/` directory
2. Add frontmatter at the top of the file:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
---

# Your Post Title

Your content here...
```

3. Commit and push to your GitHub repository
4. The website will automatically rebuild and deploy on Vercel

## Project Structure

```
blog/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage with post tiles
│   └── posts/
│       └── [slug]/
│           └── page.tsx    # Individual post page
├── components/
│   └── PostTile.tsx        # Reusable post tile component
├── content/
│   └── posts/              # MDX blog posts
├── lib/
│   └── posts.ts            # Utility functions for reading posts
└── mdx-components.tsx      # Custom MDX component styling
```

## Customization

### Color Theme

The primary color theme (#629C77) is used throughout the site. To change it:

1. Update the color in `app/globals.css`
2. Update the color in `components/PostTile.tsx`
3. Update the color in `mdx-components.tsx`
4. Update the color in `app/page.tsx` and `app/posts/[slug]/page.tsx`

### MDX Components

Customize MDX rendering by editing `mdx-components.tsx`. You can add custom React components that can be used directly in your MDX files.

## Deployment

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Start

1. **Vercel is required** for automatic deployments from GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your custom domain: `www.nishantiyengar.com`
4. Configure DNS in GoDaddy (see DEPLOYMENT.md for details)
5. Every commit to GitHub will automatically deploy!

### Automatic Deployments

✅ **Already configured!** Every push to the `main` branch automatically:
- Triggers a new Vercel deployment
- Runs `pnpm install` and `pnpm build`
- Deploys to www.nishantiyengar.com

**Just run `git change` and your site updates automatically!**

## Development

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Lint

```bash
pnpm lint
```

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Markdown with JSX
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX rendering

## License

This project is private and proprietary.
