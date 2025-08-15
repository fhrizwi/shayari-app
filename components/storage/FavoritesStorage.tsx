import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavoriteShayari {
  id: string;
  text: string;
  poetName: string;
  categoryName: string;
  timestamp: number;
}

const FAVORITES_KEY = '@ishqnama_favorites';

export class FavoritesStorage {
  static async getFavorites(): Promise<FavoriteShayari[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  static async addFavorite(shayari: Omit<FavoriteShayari, 'id' | 'timestamp'>): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const newFavorite: FavoriteShayari = {
        ...shayari,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      
      // Check if already exists
      const exists = favorites.some(fav => 
        fav.text === shayari.text && 
        fav.poetName === shayari.poetName
      );
      
      if (!exists) {
        favorites.unshift(newFavorite);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  }

  static async removeFavorite(shayariText: string, poetName: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter(fav => 
        !(fav.text === shayariText && fav.poetName === poetName)
      );
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }

  static async isFavorite(shayariText: string, poetName: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => 
        fav.text === shayariText && fav.poetName === poetName
      );
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }
}