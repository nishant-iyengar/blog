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
 * This checks both that the object store exists and that it contains data.
 * TensorFlow.js stores models with the object store name matching the path (without indexeddb:// prefix).
 */
export async function modelExists(modelPath: string): Promise<boolean> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    console.log(`[modelExists] IndexedDB not available for path: ${modelPath}`);
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
        console.log(`[modelExists] Object store '${cleanPath}' does not exist in database`);
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
          console.log(`[modelExists] Object store '${cleanPath}' has ${countRequest.result} entries, exists=${hasData}`);
          db.close();
          resolve(hasData);
        };
        
        countRequest.onerror = (e) => {
          console.warn(`[modelExists] Error counting entries in '${cleanPath}':`, e);
          db.close();
          resolve(false);
        };
        
        transaction.onerror = (e) => {
          console.warn(`[modelExists] Transaction error for '${cleanPath}':`, e);
          db.close();
          resolve(false);
        };
      } catch (e) {
        console.warn(`[modelExists] Exception checking model existence for '${cleanPath}':`, e);
        db.close();
        resolve(false);
      }
    };
    
    request.onerror = (e) => {
      console.warn(`[modelExists] Error opening database '${dbName}':`, e);
      resolve(false);
    };
    
    request.onupgradeneeded = () => {
      // Database doesn't exist yet or needs upgrade
      console.log(`[modelExists] Database '${dbName}' needs upgrade, model doesn't exist yet`);
      resolve(false);
    };
  });
}

/**
 * List all available model paths in TensorFlow.js database
 * Useful for debugging
 */
export async function listAvailableModelPaths(): Promise<string[]> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    return [];
  }

  const dbName = 'tensorflowjs_models';
  
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName);
    
    request.onsuccess = () => {
      const db = request.result;
      const objectStoreNames = Array.from(db.objectStoreNames);
      const modelPaths = objectStoreNames
        .filter(name => name.startsWith(MODEL_NAME_PREFIX))
        .map(name => `indexeddb://${name}`);
      db.close();
      resolve(modelPaths);
    };
    
    request.onerror = () => {
      resolve([]);
    };
    
    request.onupgradeneeded = () => {
      resolve([]);
    };
  });
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
        console.warn(`[listSavedModels] Model ${m.path} has metadata but weights are missing`);
        orphanedModels.push(m.path);
      }
    }
    
    console.log(`[listSavedModels] Found ${allModels.length} total models in metadata, ${validModels.length} valid, ${orphanedModels.length} orphaned`);
    
    // Clean up orphaned metadata entries (models with metadata but no weights)
    if (orphanedModels.length > 0) {
      console.warn(`Found ${orphanedModels.length} orphaned model metadata entries (metadata exists but model weights are missing). Cleaning up...`);
      for (const orphanedPath of orphanedModels) {
        try {
          await deleteMetadata(orphanedPath);
          console.log(`Cleaned up orphaned metadata for: ${orphanedPath}`);
        } catch (error) {
          console.warn(`Failed to clean up orphaned metadata for ${orphanedPath}:`, error);
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
        // Delete from TensorFlow.js IndexedDB
        const tfDbName = 'tensorflowjs_models';
        await new Promise<void>((resolve, reject) => {
          const request = indexedDB.open(tfDbName);
          
          request.onsuccess = () => {
            const db = request.result;
            const cleanDeletePath = modelToDelete.path.replace('indexeddb://', '');
            
            if (db.objectStoreNames.contains(cleanDeletePath)) {
              const transaction = db.transaction([cleanDeletePath], 'readwrite');
              const store = transaction.objectStore(cleanDeletePath);
              const clearRequest = store.clear();
              
              clearRequest.onsuccess = () => {
                db.close();
                resolve();
              };
              
              clearRequest.onerror = () => {
                db.close();
                reject(new Error('Failed to clear model data'));
              };
            } else {
              db.close();
              resolve();
            }
          };
          
          request.onerror = () => {
            reject(new Error('Failed to open TensorFlow.js database'));
          };
        });
        
        // Delete metadata from Dexie
        await deleteMetadata(modelToDelete.path);
        console.log(`Deleted old model: ${modelToDelete.path}`);
      } catch (error) {
        console.warn(`Failed to delete old model ${modelToDelete.path}:`, error);
      }
    }
  }
}
