/**
 * Model Storage Utilities
 * 
 * Functions to list, save, and load models from IndexedDB
 */

export interface SavedModel {
  name: string;
  path: string;
  createdAt: number;
  createdAtString: string;
}

/**
 * List all saved models from IndexedDB
 */
export async function listSavedModels(): Promise<SavedModel[]> {
  try {
    // TensorFlow.js uses 'tensorflowjs_models' database
    const dbName = 'tensorflowjs_models';
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);
      
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const models: SavedModel[] = [];
        
        try {
          // Get all object stores
          const objectStoreNames = Array.from(db.objectStoreNames);
          
          // Filter for our model names (tank-ai-*)
          const modelStores = objectStoreNames.filter(name => {
            const cleanName = name.replace('indexeddb://', '');
            return cleanName.startsWith('tank-ai-');
          });
          
          // Extract model info from each store
          modelStores.forEach(storeName => {
            try {
              // Remove 'indexeddb://' prefix if present
              const cleanName = storeName.replace('indexeddb://', '');
              
              // Try to extract timestamp from name (format: tank-ai-1234567890 or tank-ai-episode-500)
              let timestamp = Date.now();
              let displayName = cleanName;
              
              // Check for timestamp format: tank-ai-1234567890
              const timestampMatch = cleanName.match(/tank-ai-(\d{10,})$/);
              if (timestampMatch) {
                timestamp = parseInt(timestampMatch[1]);
                displayName = `Model ${new Date(timestamp).toLocaleString()}`;
              } 
              // Check for episode format: tank-ai-episode-500
              else if (cleanName.includes('episode-')) {
                const episodeMatch = cleanName.match(/episode-(\d+)/);
                if (episodeMatch) {
                  const episode = episodeMatch[1];
                  displayName = `Episode ${episode}`;
                  // Try to get creation time from store metadata if available
                  try {
                    const transaction = db.transaction([storeName], 'readonly');
                    const store = transaction.objectStore(storeName);
                    const getRequest = store.get('model.json');
                    getRequest.onsuccess = () => {
                      // Could extract metadata if stored
                    };
                  } catch (e) {
                    // Ignore errors
                  }
                }
              }
              
              models.push({
                name: displayName,
                path: `indexeddb://${cleanName}`,
                createdAt: timestamp,
                createdAtString: new Date(timestamp).toLocaleString(),
              });
            } catch (e) {
              console.warn('Error processing model store:', storeName, e);
            }
          });
          
          // Sort by creation date (newest first)
          models.sort((a, b) => b.createdAt - a.createdAt);
          
          resolve(models);
        } catch (error) {
          console.error('Error processing models:', error);
          resolve([]);
        } finally {
          db.close();
        }
      };
      
      request.onerror = () => {
        console.error('Failed to open IndexedDB');
        resolve([]); // Return empty array instead of rejecting
      };
      
      request.onupgradeneeded = () => {
        // Database doesn't exist yet, no models
        resolve([]);
      };
    });
  } catch (error) {
    console.error('Error listing models:', error);
    return [];
  }
}

/**
 * Delete a model from IndexedDB
 */
export async function deleteModel(modelPath: string): Promise<void> {
  try {
    const dbName = 'tensorflowjs_models';
    const cleanPath = modelPath.replace('indexeddb://', '');
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);
      
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (db.objectStoreNames.contains(cleanPath)) {
          db.deleteObjectStore(cleanPath);
          resolve();
        } else {
          reject(new Error('Model not found'));
        }
        
        db.close();
      };
      
      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };
    });
  } catch (error) {
    console.error('Error deleting model:', error);
    throw error;
  }
}

/**
 * Get model metadata (if stored)
 */
export async function getModelMetadata(modelPath: string): Promise<any> {
  // This would require storing metadata separately
  // For now, we extract from the path/name
  const cleanPath = modelPath.replace('indexeddb://', '');
  const timestampMatch = cleanPath.match(/tank-ai-(\d+)/);
  
  if (timestampMatch) {
    const timestamp = parseInt(timestampMatch[1]);
    return {
      createdAt: timestamp,
      createdAtString: new Date(timestamp).toLocaleString(),
      name: cleanPath,
    };
  }
  
  return null;
}

