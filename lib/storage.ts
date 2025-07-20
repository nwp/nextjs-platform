// localStorage-based storage implementation
export const storage = {
  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  async set(key: string, value: any): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  async del(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  async keys(pattern: string): Promise<string[]> {
    if (typeof window === 'undefined') return [];
    try {
      const keys = [];
      const prefix = pattern.replace('*', '');
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keys.push(key);
        }
      }
      return keys;
    } catch (error) {
      console.error('Error getting keys from localStorage:', error);
      return [];
    }
  },

  async mget<T>(...keys: string[]): Promise<(T | null)[]> {
    if (typeof window === 'undefined') return [];
    try {
      return keys.map(key => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      });
    } catch (error) {
      console.error('Error bulk reading from localStorage:', error);
      return [];
    }
  }
};
