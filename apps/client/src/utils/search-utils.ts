export function searchItems<T>(items: T[], searchTerm: string, keys?: string[]): T[] {
  if (!searchTerm.trim()) return items;
  
  const searchTermLower = searchTerm.toLowerCase();
  
  return items.filter(item => {
    // Handle null/undefined items
    if (item === null || item === undefined) return false;
    
    // Handle primitive types
    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      return item.toString().toLowerCase().includes(searchTermLower);
    }
    
    // Handle arrays
    if (Array.isArray(item)) {
      return item.some(element => 
        searchItems([element], searchTerm, keys).length > 0
      );
    }
    
    // Handle objects
    if (typeof item === 'object') {
      return Object.entries(item).some(([key, value]) => {
        // If specific keys are provided, only search in those keys
        if (keys && keys.length > 0 && !keys.includes(key)) return false;
        
        // Recursively search through nested objects/arrays
        if (value && typeof value === 'object') {
          return searchItems([value], searchTerm, keys).length > 0;
        }
        
        // Check primitive values
        if (value !== null && value !== undefined) {
          return value.toString().toLowerCase().includes(searchTermLower);
        }
        
        return false;
      });
    }
    
    return false;
  });
}

export function createSearch<T>(keys?: string[]) {
  return (items: T[], searchTerm: string): T[] => {
    return searchItems(items, searchTerm, keys);
  };
}
