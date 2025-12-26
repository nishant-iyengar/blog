/**
 * Model Storage Utilities
 * 
 * Functions to list, save, and load models from IndexedDB
 * 
 * This module provides a clean interface for managing TensorFlow.js models
 * stored in IndexedDB. It uses a separate metadata store to track model
 * information independently of TensorFlow.js's internal storage.
 */

export interface SavedModel {
  name: string;
  path: string;
  createdAt: number;
  createdAtString: string;
}

const DB_NAME = 'tank_ai_models';
const DB_VERSION = 1;
const METADATA_STORE = 'model_metadata';
const MODEL_NAME_PREFIX = 'tank-ai-';

/**
 * Initialize the database and return a promise that resolves to the database
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available (likely SSR or browser not supported)'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create metadata store if it doesn't exist
      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        const metadataStore = db.createObjectStore(METADATA_STORE, { keyPath: 'path' });
        metadataStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  });
}

/**
 * Save model metadata to our custom store
 */
async function saveMetadata(path: string, name: string, createdAt: number): Promise<void> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([METADATA_STORE], 'readwrite');
    const store = transaction.objectStore(METADATA_STORE);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put({
        path,
        name,
        createdAt,
        createdAtString: new Date(createdAt).toLocaleString(),
      });
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to save metadata'));
    });
    
    db.close();
  } catch (error) {
    console.warn('Failed to save model metadata:', error);
    // Don't throw - metadata is optional
  }
}

/**
 * Get metadata for a model
 */
async function getMetadata(path: string): Promise<SavedModel | null> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([METADATA_STORE], 'readonly');
    const store = transaction.objectStore(METADATA_STORE);
    
    return new Promise<SavedModel | null>((resolve, reject) => {
      const request = store.get(path);
      
      request.onsuccess = () => {
        const result = request.result;
        db.close();
        if (result) {
          resolve({
            name: result.name,
            path: result.path,
            createdAt: result.createdAt,
            createdAtString: result.createdAtString,
          });
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => {
        db.close();
        reject(new Error('Failed to get metadata'));
      };
    });
  } catch (error) {
    console.warn('Failed to get model metadata:', error);
    return null;
  }
}

/**
 * Delete metadata for a model
 */
async function deleteMetadata(path: string): Promise<void> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction([METADATA_STORE], 'readwrite');
    const store = transaction.objectStore(METADATA_STORE);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.delete(path);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete metadata'));
    });
    
    db.close();
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
          db.close();
          resolve(hasData);
        };
        
        countRequest.onerror = () => {
          db.close();
          resolve(false);
        };
        
        transaction.onerror = () => {
          db.close();
          resolve(false);
        };
      } catch (e) {
        console.warn('Error checking model existence:', e);
        db.close();
        resolve(false);
      }
    };
    
    request.onerror = () => {
      resolve(false);
    };
    
    request.onupgradeneeded = () => {
      // Database doesn't exist yet or needs upgrade
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
 * List all saved models from IndexedDB
 */
export async function listSavedModels(): Promise<SavedModel[]> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    console.warn('IndexedDB not available (likely SSR or browser not supported)');
    return [];
  }
  
  try {
    // Get all metadata from our custom store
    const db = await openDatabase();
    const transaction = db.transaction([METADATA_STORE], 'readonly');
    const store = transaction.objectStore(METADATA_STORE);
    const index = store.index('createdAt');
    
    const models: SavedModel[] = await new Promise((resolve, reject) => {
      const request = index.openCursor(null, 'prev'); // Sort by createdAt descending
      const results: SavedModel[] = [];
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const value = cursor.value;
          results.push({
            name: value.name,
            path: value.path,
            createdAt: value.createdAt,
            createdAtString: value.createdAtString,
          });
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      
      request.onerror = () => {
        reject(new Error('Failed to read models'));
      };
    });
    
    db.close();
    
    // Also check TensorFlow.js database for any models we might have missed
    // (for backward compatibility with models saved before metadata tracking)
    const tfDbName = 'tensorflowjs_models';
    const tfModels = await new Promise<SavedModel[]>((resolve) => {
      const request = indexedDB.open(tfDbName);
      
      request.onsuccess = () => {
        const db = request.result;
        const objectStoreNames = Array.from(db.objectStoreNames);
        const results: SavedModel[] = [];
        
        for (const storeName of objectStoreNames) {
          // Only process our models
          if (storeName.startsWith(MODEL_NAME_PREFIX)) {
            // Check if we already have metadata for this model
            const path = `indexeddb://${storeName}`;
            const hasMetadata = models.some(m => m.path === path);
              
            if (!hasMetadata) {
              // Extract info from store name
              let timestamp = Date.now();
              let displayName = storeName;
              
              const timestampMatch = storeName.match(/tank-ai-(\d{10,})$/);
              if (timestampMatch) {
                timestamp = parseInt(timestampMatch[1]);
                displayName = `Model ${new Date(timestamp).toLocaleString()}`;
              } else if (storeName.includes('episode-')) {
                const episodeMatch = storeName.match(/episode-(\d+)/);
                if (episodeMatch) {
                  displayName = `Episode ${episodeMatch[1]}`;
                }
              }
              
              results.push({
                name: displayName,
                path,
                createdAt: timestamp,
                createdAtString: new Date(timestamp).toLocaleString(),
              });
            }
            }
        }
        
        db.close();
        resolve(results);
      };
      
      request.onerror = () => {
        resolve([]);
      };
    });
    
    // Combine and deduplicate
    const allModels = [...models, ...tfModels];
    const uniqueModels = Array.from(
      new Map(allModels.map(m => [m.path, m])).values()
    );
    
    // Sort by creation date (newest first)
    uniqueModels.sort((a, b) => b.createdAt - a.createdAt);
    
    return uniqueModels;
  } catch (error) {
    console.error('Error listing models:', error);
    return [];
  }
}

/**
 * Delete a model from IndexedDB
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
    
    // Delete metadata
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
  // First try to get from our metadata store
  const metadata = await getMetadata(modelPath);
  if (metadata) {
    return metadata;
  }
  
  // Fallback: extract from path
  const cleanPath = modelPath.replace('indexeddb://', '');
  const timestampMatch = cleanPath.match(/tank-ai-(\d{10,})$/);
  
  if (timestampMatch) {
    const timestamp = parseInt(timestampMatch[1]);
    return {
      name: cleanPath,
      path: modelPath,
      createdAt: timestamp,
      createdAtString: new Date(timestamp).toLocaleString(),
    };
  }
  
  return null;
}

/**
 * Helper function to save model with metadata
 * Call this after saving a model with TensorFlow.js
 */
export async function saveModelWithMetadata(
  modelPath: string,
  displayName?: string
): Promise<void> {
  const cleanPath = modelPath.replace('indexeddb://', '');
  
  // Extract timestamp from path or use current time
  let timestamp = Date.now();
  let name = displayName || cleanPath;
  
  const timestampMatch = cleanPath.match(/tank-ai-(\d{10,})$/);
  if (timestampMatch) {
    timestamp = parseInt(timestampMatch[1]);
    if (!displayName) {
      name = `Model ${new Date(timestamp).toLocaleString()}`;
    }
  } else if (cleanPath.includes('episode-')) {
    const episodeMatch = cleanPath.match(/episode-(\d+)/);
    if (episodeMatch) {
      name = displayName || `Episode ${episodeMatch[1]}`;
    }
  }
  
  await saveMetadata(modelPath, name, timestamp);
}
