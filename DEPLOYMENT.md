# Deployment Guide - Connecting www.nishantiyengar.com

## Yes, Vercel is Required

Vercel is the recommended platform for Next.js applications and provides:
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Easy custom domain setup
- ✅ Zero configuration for Next.js

## Step-by-Step Deployment

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository

1. In Vercel dashboard, click "Add New Project"
2. Find and select your `nishant-iyengar/blog` repository
3. Vercel will auto-detect Next.js settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `pnpm build` (already configured in vercel.json)
   - **Install Command**: `pnpm install` (already configured)
   - **Output Directory**: `.next` (default)
4. Click "Deploy"

### Step 3: Configure Custom Domain

1. After deployment completes, go to your project dashboard
2. Click on "Settings" → "Domains"
3. Add your domain: `www.nishantiyengar.com`
4. Vercel will show you DNS configuration instructions

### Step 4: Configure DNS in GoDaddy

1. Log in to your GoDaddy account
2. Go to "My Products" → Find your domain `nishantiyengar.com`
3. Click "DNS" or "Manage DNS"
4. You'll need to add/update DNS records:

#### Option A: Using CNAME (Recommended for www subdomain)

**⚠️ IMPORTANT: Check for existing records first!**

1. **Before adding the CNAME record, check if a record named "www" already exists:**
   - Look through your DNS records list
   - If you see an A record or another CNAME for "www", you must **delete it first**
   - **CNAME and A records cannot coexist for the same name**

2. **Delete any existing "www" record:**
   - Find the record with Name = `www`
   - Click the three dots (⋯) or edit button
   - Select "Delete" or "Remove"
   - Confirm deletion

3. **Now add the CNAME record:**
   - Click "Add" or "+" to create a new record
   - **Type**: CNAME
   - **Name**: `www`
   - **Value**: `cname.vercel-dns.com` (or the exact value Vercel provides in domain settings)
   - **TTL**: 600 (or default)
   - Click "Save"

4. **For the root domain (nishantiyengar.com) to work too:**
   - Add an A record:
     - **Type**: A
     - **Name**: `@` (or leave blank for root domain)
     - **Value**: `76.76.21.21` (Vercel's IP - **check Vercel dashboard for the current IP**, it may change)
     - **TTL**: 600
   - **Note**: If you already have an A record for `@`, update its value to Vercel's IP instead of creating a duplicate

#### Option B: Using Vercel's Nameservers (Alternative)

If you prefer, you can point your domain to Vercel's nameservers:
1. In Vercel, go to your domain settings
2. Copy the nameservers provided
3. In GoDaddy, go to DNS settings
4. Change nameservers to Vercel's nameservers

**Note**: Vercel will provide the exact DNS values in the domain settings page. Use those values.

### Step 5: Verify Domain

1. After adding DNS records, go back to Vercel
2. Click "Refresh" in the domain settings
3. Vercel will verify the domain (can take a few minutes to 48 hours)
4. Once verified, SSL certificate will be automatically provisioned

### Step 6: Test Automatic Deployments

1. Make a small change to your repository (e.g., update README.md)
2. Commit and push: `git change`
3. Go to Vercel dashboard
4. You should see a new deployment automatically triggered
5. Once deployed, your changes will be live on www.nishantiyengar.com

## Automatic Deployment Setup

✅ **Already Configured!** 

Your repository is set up for automatic deployments:
- Every push to the `main` branch triggers a new deployment
- Vercel automatically runs `pnpm install` and `pnpm build`
- Deployments are previewed before going live (you can configure this)

## Troubleshooting

### Domain Not Resolving

1. **Check DNS Propagation**: DNS changes can take 24-48 hours to propagate globally
   - Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation
   
2. **Verify DNS Records**: Double-check the CNAME/A records in GoDaddy match Vercel's requirements

3. **Check Vercel Domain Status**: In Vercel dashboard, check if domain shows as "Valid Configuration"

### "Record name www conflicts with another record" Error

This error means you already have a DNS record named "www". Here's how to fix it:

1. **In GoDaddy DNS settings:**
   - Scroll through all your DNS records
   - Look for any record with Name = `www` (could be A, CNAME, or other type)
   - **Delete the existing "www" record first**
   - Then add the new CNAME record

2. **Common scenarios:**
   - **Existing A record for "www"**: Delete it, then add CNAME
   - **Existing CNAME for "www"**: Delete it, then add the new one with Vercel's value
   - **Multiple "www" records**: Delete all of them, then add one CNAME

3. **After deleting and adding:**
   - Wait a few minutes for changes to propagate
   - Check Vercel dashboard - domain should show as "Valid Configuration" once DNS propagates

### Build Failures

1. Check Vercel build logs in the deployment page
2. Ensure `pnpm` is available (Vercel auto-detects package managers)
3. Verify all dependencies are in `package.json`

### SSL Certificate Issues

- Vercel automatically provisions SSL certificates
- If certificate is pending, wait up to 24 hours
- Ensure DNS is correctly configured

## Current Configuration

Your project is already configured with:
- ✅ `vercel.json` with build settings
- ✅ GitHub repository connected
- ✅ pnpm package manager configured
- ✅ Next.js 16 with App Router

## Next Steps After Deployment

1. **Test the site**: Visit www.nishantiyengar.com
2. **Set up redirects** (optional): Redirect `nishantiyengar.com` → `www.nishantiyengar.com` in Vercel
3. **Monitor deployments**: Check Vercel dashboard for deployment status
4. **Add environment variables** (if needed): Settings → Environment Variables

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: support@vercel.com
- GoDaddy DNS Help: https://www.godaddy.com/help

---

**Once deployed, every time you run `git change`, your site will automatically update!** 🚀
