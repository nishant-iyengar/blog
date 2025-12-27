# Environment Variables Setup

## Supabase Configuration

The website needs Supabase environment variables to fetch AI models. These are stored in `website/.env.local` (which is gitignored).

### Required Variables

The website uses Next.js standard `NEXT_PUBLIC_` prefixed variables for both server and client-side access:

1. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL
2. **NEXT_PUBLIC_SUPABASE_KEY** - Your Supabase API key
3. **NEXT_PUBLIC_SUPABASE_TABLE** - The table name (defaults to `ai_tank_models`)

### Setup

1. Create or update `website/.env.local` with these variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_KEY=your-api-key
   NEXT_PUBLIC_SUPABASE_TABLE=ai_tank_models
   ```

2. Restart your Next.js dev server for the changes to take effect:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Why NEXT_PUBLIC_?

- Variables prefixed with `NEXT_PUBLIC_` are exposed to both server and client-side code
- This allows the same variables to be used in API routes and client components
- Standard Next.js convention for public environment variables

### Note

- `.env.local` is gitignored and should not be committed
- These values should match the Supabase configuration in the root `.env` file
- The `NEXT_PUBLIC_` prefix makes these variables accessible in the browser, so use appropriate keys (anon key is fine for read operations)

