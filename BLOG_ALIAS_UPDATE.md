# Blog Alias Update ✅

## Summary

The `blog` alias has been successfully updated to include a local Next.js build step before deployment. This prevents deployment failures from being caught only on Vercel, and displays build errors with code pointers (file paths and line numbers) if the build fails.

## Changes Made

### Before
```bash
alias blog='git-change-deploy() { git change "$1" && vercel --prod; }; git-change-deploy'
```

### After
The alias now:
1. **Changes to the blog directory** (`/Users/nishant/Documents/software/blog`)
2. **Runs `pnpm build`** locally to catch build errors early
3. **Displays build errors** with file paths and line numbers if build fails
4. **Cancels deployment** if build fails (returns early with exit code 1)
5. **Proceeds with git commit and Vercel deployment** only if build succeeds

## Error Display

When the build fails, the alias displays:
- ❌ Clear error indication
- Full build output (includes file paths and line numbers from Next.js)
- Helpful message to fix errors before deploying

Next.js build errors already include code pointers in the format:
```
./path/to/file.ts:line:column
Type error: ...
```

These are automatically displayed in the build output.

## Usage

The usage remains the same:
```bash
blog "your commit message here"
```

The alias will:
1. Build the Next.js app locally
2. If successful: commit, push, and deploy to Vercel
3. If build fails: display errors and stop (no commit/deploy)

## To Apply Changes

Run:
```bash
source ~/.zshrc
```

Or simply open a new terminal window.

## Backup

A backup of your `.zshrc` was created before making changes:
- Location: `~/.zshrc.backup.*` (timestamped)

## Testing

To test the alias without deploying:
1. Create a build error intentionally
2. Run `blog "test message"`
3. Verify it stops at the build step and displays errors
4. Fix the error and run again to see successful deployment

