/**
 * Environment Variable Loader
 * 
 * Loads specific environment variables from root .env file instead of .env.local
 * This ensures BLOB_READ_WRITE_TOKEN and VERCEL_OIDC_TOKEN come from root .env
 */

import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

let rootEnvLoaded = false;

/**
 * Load environment variables from root .env file
 * This overrides any values from .env.local for specific variables
 */
function loadRootEnv(): void {
  if (rootEnvLoaded) {
    return; // Only load once
  }

  // Path to root .env (two levels up from website/lib/)
  const rootEnvPath = resolve(__dirname, '../../.env');
  
  if (!existsSync(rootEnvPath)) {
    console.warn(`Root .env file not found at ${rootEnvPath}`);
    rootEnvLoaded = true;
    return;
  }

  try {
    const envContent = readFileSync(rootEnvPath, 'utf-8');
    const lines = envContent.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      // Parse KEY=VALUE
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (!match) {
        continue;
      }

      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes

      // Only override specific variables from root .env
      // Root .env takes precedence over .env.local for these tokens
      if (key === 'BLOB_READ_WRITE_TOKEN' || key === 'VERCEL_OIDC_TOKEN') {
        // Force override from root .env (root .env always wins for these tokens)
        process.env[key] = value;
      }
    }

    rootEnvLoaded = true;
  } catch (error) {
    console.error(`Failed to load root .env file: ${error}`);
    rootEnvLoaded = true; // Mark as loaded to prevent retry loops
  }
}

// Load immediately when module is imported
loadRootEnv();

/**
 * Get environment variable, ensuring it comes from root .env if applicable
 */
export function getEnv(key: string): string | undefined {
  // Ensure root env is loaded
  if (!rootEnvLoaded) {
    loadRootEnv();
  }
  return process.env[key];
}

/**
 * Get BLOB_READ_WRITE_TOKEN from root .env
 */
export function getBlobReadWriteToken(): string | undefined {
  return getEnv('BLOB_READ_WRITE_TOKEN');
}

/**
 * Get VERCEL_OIDC_TOKEN from root .env
 */
export function getVercelOidcToken(): string | undefined {
  return getEnv('VERCEL_OIDC_TOKEN');
}

