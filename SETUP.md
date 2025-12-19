# Setup Guide

## GitHub Repository Setup

To connect this local repository to GitHub:

1. **Create a new repository on GitHub:**
   - Go to [GitHub](https://github.com/new)
   - Repository name: `blog`
   - Choose public or private
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Connect your local repository to GitHub:**
   ```bash
   cd /Users/nishant/Documents/software/blog
   git remote add origin https://github.com/YOUR_USERNAME/blog.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

   If you need to authenticate, GitHub may prompt you for credentials. You can use:
   - Personal Access Token (recommended)
   - GitHub CLI (`gh auth login`)

## Vercel Deployment

1. **Push your code to GitHub** (see above)

2. **Deploy to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository (`blog`)
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configure Custom Domain:**
   - In your Vercel project, go to Settings → Domains
   - Add `www.nishantiyengar.com`
   - Add `nishantiyengar.com` (optional, for root domain)
   - Follow Vercel's DNS configuration instructions

4. **Update GoDaddy DNS:**
   - Log in to GoDaddy
   - Go to DNS Management for your domain
   - Add/Update records:
     - **CNAME**: `www` → `cname.vercel-dns.com` (or the value Vercel provides)
     - **A Record** (if needed for root domain): Follow Vercel's instructions

## Adding New Posts

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter with title, date, and excerpt
3. Write your content in MDX format
4. Commit and push:
   ```bash
   git add content/posts/your-post.mdx
   git commit -m "Add new post: Your Post Title"
   git push
   ```
5. Vercel will automatically rebuild and deploy your site

## Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```
