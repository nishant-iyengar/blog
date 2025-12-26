/**
 * Model Storage Utilities
 * 
 * Functions to list, save, and load models using Dexie for metadata
 * and TensorFlow.js IndexedDB for actual model storage.
 * 
 * This module provides a clean interface for managing TensorFlow.js models
 * stored in IndexedDB. It uses Dexie to track model metadata independently
 * of TensorFlow.js's internal storage.
 */

import Dexie, { type Table } from 'dexie';
import * as tf from '@tensorflow/tfjs';

export interface SavedModel {
  name: string;
  path: string;
  createdAt: number;
  createdAtString: string;
  evalScore?: number; // Average reward at time of save
}

interface ModelMetadata {
  id?: number;
  path: string;
  name: string;
  createdAt: number;
  createdAtString: string;
  evalScore?: number;
}

class ModelDatabase extends Dexie {
  modelMetadata!: Table<ModelMetadata>;

  constructor() {
    super('tank_ai_models');
    this.version(1).stores({
      modelMetadata: '++id, path, createdAt, evalScore',
    });
  }
}

// Initialize database with error handling for Safari compatibility and SSR safety
// IMPORTANT: This module may be imported during SSR, so we must guard all browser API access
let db: ModelDatabase | null = null;

/**
 * Get or initialize the Dexie database instance
 * This function ensures the database is only created in the browser (not during SSR)
 */
function getDatabase(): ModelDatabase | null {
  // Return existing instance if already initialized
  if (db !== null) {
    return db;
  }
  
  // Only initialize in browser environment (not during SSR)
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    // Check if IndexedDB is available before creating Dexie instance
    if (typeof window.indexedDB !== 'undefined') {
      db = new ModelDatabase();
      return db;
    } else {
      console.warn('IndexedDB not available in this browser');
      return null;
    }
  } catch (error) {
    // Safari private browsing or other IndexedDB restrictions
    console.warn('Failed to initialize Dexie database:', error);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      console.warn('Safari detected. IndexedDB may be disabled (e.g., Private Browsing mode)');
    }
    return null;
  }
}
const MODEL_NAME_PREFIX = 'tank-ai-';
const MAX_MODELS = 8;

/**
 * Check if IndexedDB is available (basic check)
 */
function isIndexedDBAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return typeof window.indexedDB !== 'undefined';
}

/**
 * Get a user-friendly error message for IndexedDB issues
 */
function getIndexedDBErrorMessage(): string {
  if (typeof window === 'undefined') {
    return 'IndexedDB is not available (server-side rendering)';
  }
  
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  if (isSafari) {
    return 'Safari detected. IndexedDB may be unavailable due to:\n' +
           '• Private Browsing mode (disables IndexedDB)\n' +
           '• Safari privacy settings blocking storage\n' +
           '• Try: Safari > Preferences > Privacy > uncheck "Prevent cross-site tracking"\n' +
           '• Or use regular browsing mode instead of Private Browsing';
  }
  
  return 'IndexedDB is not available. This may be due to:\n' +
         '• Private/Incognito browsing mode\n' +
         '• Browser privacy settings blocking storage\n' +
         '• Browser does not support IndexedDB';
}

/**
 * Format date as "December 3, 2:49 pm"
 */
function formatDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const formatted = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  // Convert AM/PM to lowercase
  return formatted.replace(/\s(AM|PM)$/, (match) => match.toLowerCase());
}

/**
 * Save model metadata to Dexie
 */
async function saveMetadata(
  path: string,
  name: string,
  createdAt: number,
  evalScore?: number
): Promise<void> {
  const db = getDatabase();
  if (!db) {
    const errorMsg = getIndexedDBErrorMessage();
    console.warn('Dexie not available:', errorMsg);
    return;
  }
  
  // Check if IndexedDB is actually available
  if (!isIndexedDBAvailable()) {
    const errorMsg = getIndexedDBErrorMessage();
    throw new Error(`Cannot save model metadata: ${errorMsg}`);
  }

  try {
    const metadata = {
      path,
      name,
      createdAt,
      createdAtString: formatDateString(createdAt),
      evalScore,
    };
    console.log(`[saveMetadata] Putting metadata:`, metadata);
    await db.modelMetadata.put(metadata);
    console.log(`[saveMetadata] Metadata put successfully`);
  } catch (error) {
    console.error('Failed to save model metadata:', error);
    // Re-throw so we know if metadata save fails
    throw error;
  }
}

/**
 * Get metadata for a model
 */
async function getMetadata(path: string): Promise<SavedModel | null> {
  const db = getDatabase();
  if (!db) {
    return null;
  }

  try {
    const metadata = await db.modelMetadata.get({ path });
    if (metadata) {
      return {
        name: metadata.name,
        path: metadata.path,
        createdAt: metadata.createdAt,
        createdAtString: metadata.createdAtString,
        evalScore: metadata.evalScore,
      };
    }
    return null;
  } catch (error) {
    console.warn('Failed to get model metadata:', error);
    return null;
  }
}

/**
 * Delete metadata for a model
 */
async function deleteMetadata(path: string): Promise<void> {
  const db = getDatabase();
  if (!db) {
    return;
  }

  try {
    await db.modelMetadata.delete(path);
  } catch (error) {
    console.warn('Failed to delete model metadata:', error);
    // Don't throw - metadata deletion is optional
  }
}

/**
 * Check if a TensorFlow.js model exists in IndexedDB
 * 
 * IMPORTANT: Uses TensorFlow.js's official API (tf.io.listModels()) instead of
 * manually inspecting IndexedDB. This ensures we're checking models the way
 * TensorFlow.js expects them to be stored.
 */
export async function modelExists(modelPath: string): Promise<boolean> {
  if (typeof window === 'undefined') {
    console.log(`[modelExists] Window not available for path: ${modelPath}`);
    return false;
  }

  try {
    // Use TensorFlow.js's official API to check if model exists
    const savedModels = await tf.io.listModels();
    const modelKeys = Object.keys(savedModels);
    
    const exists = modelKeys.includes(modelPath);
    console.log(`[modelExists] Model '${modelPath}' exists according to TensorFlow.js: ${exists}`);
    
    if (!exists) {
      console.log(`[modelExists] Available models:`, modelKeys);
    }
    
    return exists;
  } catch (error) {
    console.warn(`[modelExists] Error checking model existence with TensorFlow.js API:`, error);
    // Fallback to manual IndexedDB inspection if TensorFlow.js API fails
    return await modelExistsFallback(modelPath);
  }
}

/**
 * Fallback method: manually inspect IndexedDB
 * Only used if TensorFlow.js API is unavailable
 */
async function modelExistsFallback(modelPath: string): Promise<boolean> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    console.log(`[modelExistsFallback] IndexedDB not available for path: ${modelPath}`);
    return false;
  }

  const cleanPath = modelPath.replace('indexeddb://', '');
  const dbName = 'tensorflowjs_models';
  
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName);
    
    request.onsuccess = () => {
      const db = request.result;
      
      // Check if object store exists
      if (!db.objectStoreNames.contains(cleanPath)) {
        console.log(`[modelExistsFallback] Object store '${cleanPath}' does not exist in database`);
        db.close();
        resolve(false);
        return;
      }
      
      // Check if the object store has any data
      try {
        const transaction = db.transaction([cleanPath], 'readonly');
        const store = transaction.objectStore(cleanPath);
        const countRequest = store.count();
        
        countRequest.onsuccess = () => {
          const hasData = countRequest.result > 0;
          console.log(`[modelExistsFallback] Object store '${cleanPath}' has ${countRequest.result} entries, exists=${hasData}`);
          db.close();
          resolve(hasData);
        };
        
        countRequest.onerror = (e) => {
          console.warn(`[modelExistsFallback] Error counting entries in '${cleanPath}':`, e);
          db.close();
          resolve(false);
        };
        
        transaction.onerror = (e) => {
          console.warn(`[modelExistsFallback] Transaction error for '${cleanPath}':`, e);
          db.close();
          resolve(false);
        };
      } catch (e) {
        console.warn(`[modelExistsFallback] Exception checking model existence for '${cleanPath}':`, e);
        db.close();
        resolve(false);
      }
    };
    
    request.onerror = (e) => {
      console.warn(`[modelExistsFallback] Error opening database '${dbName}':`, e);
      resolve(false);
    };
    
    request.onupgradeneeded = () => {
      // Database doesn't exist yet or needs upgrade
      console.log(`[modelExistsFallback] Database '${dbName}' needs upgrade, model doesn't exist yet`);
      resolve(false);
    };
  });
}

/**
 * List all available model paths in TensorFlow.js database
 * 
 * IMPORTANT: Uses TensorFlow.js's official API (tf.io.listModels()) instead of
 * manually inspecting IndexedDB. TensorFlow.js may store models in a different
 * structure than we expect, so we should use their API.
 */
export async function listAvailableModelPaths(): Promise<string[]> {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    // Use TensorFlow.js's official API to list models
    // This is the correct way to get all saved models
    const savedModels = await tf.io.listModels();
    const modelKeys = Object.keys(savedModels);
    
    console.log(`[listAvailableModelPaths] TensorFlow.js reports ${modelKeys.length} saved models`);
    console.log(`[listAvailableModelPaths] All model keys:`, modelKeys);
    
    // Filter to only IndexedDB models that match our naming pattern
    const indexedDbModels = modelKeys.filter(key => 
      key.startsWith('indexeddb://') && key.includes(MODEL_NAME_PREFIX)
    );
    
    console.log(`[listAvailableModelPaths] Filtered IndexedDB models (starting with 'indexeddb://${MODEL_NAME_PREFIX}'):`, indexedDbModels);
    
    return indexedDbModels;
  } catch (error) {
    console.warn(`[listAvailableModelPaths] Error listing models with TensorFlow.js API:`, error);
    // Fallback to manual IndexedDB inspection if TensorFlow.js API fails
    return await listAvailableModelPathsFallback();
  }
}

/**
 * Fallback method: manually inspect IndexedDB
 * Only used if TensorFlow.js API is unavailable
 */
async function listAvailableModelPathsFallback(): Promise<string[]> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    return [];
  }

  const dbName = 'tensorflowjs_models';
  
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName);
    
    request.onsuccess = () => {
      const db = request.result;
      const objectStoreNames = Array.from(db.objectStoreNames);
      console.log(`[listAvailableModelPathsFallback] Database '${dbName}' has ${objectStoreNames.length} object stores:`, objectStoreNames);
      
      const modelPaths = objectStoreNames
        .filter(name => name.startsWith(MODEL_NAME_PREFIX))
        .map(name => `indexeddb://${name}`);
      
      // Also log all object stores (not just ones starting with MODEL_NAME_PREFIX)
      if (objectStoreNames.length > 0) {
        console.log(`[listAvailableModelPathsFallback] All object stores in '${dbName}':`, objectStoreNames);
        console.log(`[listAvailableModelPathsFallback] Filtered model paths (starting with '${MODEL_NAME_PREFIX}'):`, modelPaths);
      } else {
        console.log(`[listAvailableModelPathsFallback] No object stores found in '${dbName}' database`);
      }
      
      db.close();
      resolve(modelPaths);
    };
    
    request.onerror = (e) => {
      console.warn(`[listAvailableModelPathsFallback] Error opening database '${dbName}':`, e);
      resolve([]);
    };
    
    request.onupgradeneeded = () => {
      console.log(`[listAvailableModelPathsFallback] Database '${dbName}' needs upgrade - no models exist yet`);
      resolve([]);
    };
  });
}

/**
 * Debug function to list ALL IndexedDB databases and their object stores
 * Useful for understanding what TensorFlow.js actually creates
 */
export async function debugListAllIndexedDBDatabases(): Promise<void> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    console.log('[debugListAllIndexedDBDatabases] IndexedDB not available');
    return;
  }
  
  console.log('[debugListAllIndexedDBDatabases] Listing all IndexedDB databases...');
  
  if (indexedDB.databases) {
    try {
      const databases = await indexedDB.databases();
      console.log(`[debugListAllIndexedDBDatabases] Found ${databases.length} databases:`, databases.map(db => ({ name: db.name, version: db.version })));
      
      // Open each database and list object stores
      for (const dbInfo of databases) {
        if (!dbInfo.name) continue;
        try {
          const request = indexedDB.open(dbInfo.name);
          request.onsuccess = () => {
            const db = request.result;
            const objectStores = Array.from(db.objectStoreNames);
            console.log(`[debugListAllIndexedDBDatabases] Database '${dbInfo.name}' (v${db.version}) has ${objectStores.length} object stores:`, objectStores);
            db.close();
          };
          request.onerror = () => {
            console.warn(`[debugListAllIndexedDBDatabases] Could not open database '${dbInfo.name}'`);
          };
        } catch (e) {
          console.warn(`[debugListAllIndexedDBDatabases] Error inspecting database '${dbInfo.name}':`, e);
        }
      }
    } catch (e) {
      console.warn('[debugListAllIndexedDBDatabases] Error getting database list:', e);
    }
  } else {
    console.warn('[debugListAllIndexedDBDatabases] indexedDB.databases() not available in this browser');
  }
}

/**
 * List all saved models from Dexie metadata
 */
export async function listSavedModels(): Promise<SavedModel[]> {
  const db = getDatabase();
  if (!db) {
    console.warn('Dexie not available (likely SSR or browser not supported)');
    return [];
  }
  
  try {
    // Get all metadata from Dexie, sorted by creation date (newest first)
    // db is guaranteed to be non-null here because we checked above
    const allModels = await db!.modelMetadata
      .orderBy('createdAt')
      .reverse()
      .toArray();
    
    // Filter to only include models that actually exist in TensorFlow.js IndexedDB
    // This filters out orphaned metadata entries (metadata without corresponding model weights)
    const validModels: SavedModel[] = [];
    const orphanedModels: string[] = [];
    
    for (const m of allModels) {
      const exists = await modelExists(m.path);
      console.log(`[listSavedModels] Checking model ${m.path}: exists=${exists}`);
      if (exists) {
        validModels.push({
          name: m.name,
          path: m.path,
          createdAt: m.createdAt,
          createdAtString: m.createdAtString,
          evalScore: m.evalScore,
        });
      } else {
        // Model metadata exists but weights are missing - will be cleaned up below
        orphanedModels.push(m.path);
      }
    }
    
    console.log(`[listSavedModels] Found ${allModels.length} total models in metadata, ${validModels.length} valid, ${orphanedModels.length} orphaned`);
    
    // Clean up orphaned metadata entries (models with metadata but no weights)
    // This can happen if IndexedDB was cleared but Dexie metadata remained, or if a save failed
    if (orphanedModels.length > 0) {
      console.log(`[listSavedModels] Cleaning up ${orphanedModels.length} orphaned metadata entries (model weights missing)`);
      for (const orphanedPath of orphanedModels) {
        try {
          await deleteMetadata(orphanedPath);
        } catch (error) {
          // Silently handle cleanup errors - not critical
        }
      }
    }
    
    return validModels;
  } catch (error) {
    console.error('Error listing models:', error);
    return [];
  }
}

/**
 * Delete a model from both TensorFlow.js IndexedDB and Dexie metadata
 * 
 * This function deletes both the TensorFlow.js model data and our metadata.
 */
export async function deleteModel(modelPath: string): Promise<void> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    throw new Error('IndexedDB not available (likely SSR or browser not supported)');
  }
  
  const cleanPath = modelPath.replace('indexeddb://', '');
  
  try {
    // Delete from TensorFlow.js database
    // TensorFlow.js stores models in object stores. We clear all data from the store.
    const tfDbName = 'tensorflowjs_models';
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(tfDbName);
      
      request.onsuccess = () => {
        const db = request.result;
        
        if (db.objectStoreNames.contains(cleanPath)) {
          // Clear all data from the object store
          const transaction = db.transaction([cleanPath], 'readwrite');
          const store = transaction.objectStore(cleanPath);
          const clearRequest = store.clear();
          
          clearRequest.onsuccess = () => {
            db.close();
            resolve();
          };
          
          clearRequest.onerror = () => {
            db.close();
            reject(new Error('Failed to clear model data'));
          };
          
          transaction.onerror = () => {
            db.close();
            reject(new Error('Transaction failed'));
          };
        } else {
          db.close();
          resolve(); // Model doesn't exist, consider it deleted
        }
      };
      
      request.onerror = () => {
        reject(new Error('Failed to open TensorFlow.js database'));
      };
    });
    
    // Delete metadata from Dexie
    await deleteMetadata(modelPath);
    
    console.log(`Model deleted: ${modelPath}`);
  } catch (error) {
    console.error('Error deleting model:', error);
    // Still try to delete metadata even if TensorFlow.js deletion failed
    try {
      await deleteMetadata(modelPath);
    } catch (metaError) {
      console.warn('Failed to delete metadata:', metaError);
    }
    throw error;
  }
}

/**
 * Get model metadata
 */
export async function getModelMetadata(modelPath: string): Promise<SavedModel | null> {
  // Get from Dexie metadata store
  const metadata = await getMetadata(modelPath);
  if (metadata) {
    return metadata;
  }
  
  // Fallback: extract from path (for backward compatibility)
  const cleanPath = modelPath.replace('indexeddb://', '');
  const timestampMatch = cleanPath.match(/tank-ai-(\d{10,})$/);
  
  if (timestampMatch) {
    const timestamp = parseInt(timestampMatch[1]);
    return {
      name: cleanPath,
      path: modelPath,
      createdAt: timestamp,
      createdAtString: formatDateString(timestamp),
    };
  }
  
  return null;
}

/**
 * Helper function to save model with metadata
 * Call this after saving a model with TensorFlow.js
 * 
 * This function:
 * - Creates a new model (doesn't update existing)
 * - Uses formatted date string for display
 * - Keeps max 8 models (deletes oldest if needed)
 */
export async function saveModelWithMetadata(
  modelPath: string,
  evalScore?: number,
  displayName?: string
): Promise<void> {
  const db = getDatabase();
  if (!db) {
    console.warn('Dexie not available, cannot save metadata');
    return;
  }

  const cleanPath = modelPath.replace('indexeddb://', '');
  
  // Extract timestamp from path or use current time
  let timestamp = Date.now();
  let name = displayName || cleanPath;
  
  // Try to extract timestamp from path
  const timestampMatch = cleanPath.match(/tank-ai-(\d{10,})$/);
  if (timestampMatch) {
    timestamp = parseInt(timestampMatch[1]);
  }
  
  // Use ISO timestamp for display name if not provided
  if (!displayName) {
    const isoString = new Date(timestamp).toISOString();
    name = isoString;
  }
  
  // Save metadata
  console.log(`[saveModelWithMetadata] Saving metadata for path: ${modelPath}, name: ${name}, timestamp: ${timestamp}, evalScore: ${evalScore}`);
  await saveMetadata(modelPath, name, timestamp, evalScore);
  console.log(`[saveModelWithMetadata] Metadata saved successfully`);
  
  // Keep only the most recent MAX_MODELS models
  const allModels = await db!.modelMetadata
    .orderBy('createdAt')
    .reverse()
    .toArray();
  
  if (allModels.length > MAX_MODELS) {
    // Delete oldest models (keep the first MAX_MODELS)
    const modelsToDelete = allModels.slice(MAX_MODELS);
    for (const modelToDelete of modelsToDelete) {
      try {
        // Use the deleteModel function which properly deletes from both TensorFlow.js IndexedDB and Dexie
        await deleteModel(modelToDelete.path);
        console.log(`Deleted old model: ${modelToDelete.path}`);
      } catch (error) {
        console.warn(`Failed to delete old model ${modelToDelete.path}:`, error);
      }
    }
  }
}
