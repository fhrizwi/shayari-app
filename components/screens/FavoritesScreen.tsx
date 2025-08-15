import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert, Clipboard } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { FavoritesStorage, FavoriteShayari } from '../storage/FavoritesStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type FavoritesScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const [favorites, setFavorites] = useState<FavoriteShayari[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await FavoritesStorage.getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareShayari = async (shayari: string) => {
    try {
      await Share.share({
        message: `${shayari}\n\n- Shared from Ishqnama App`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const copyToClipboard = async (shayari: string) => {
    try {
      await Clipboard.setString(shayari);
      Alert.alert('Copied!', 'Shayari copied to clipboard', [{ text: 'OK' }]);
    } catch (error) {
      console.log('Error copying to clipboard:', error);
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const removeFavorite = async (shayari: FavoriteShayari) => {
    try {
      await FavoritesStorage.removeFavorite(shayari.text, shayari.poetName);
      await loadFavorites();
      Alert.alert('Removed', 'Shayari removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <Appbar.Header style={styles.header}>
            <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
            <Appbar.Content title="My Favorites" titleStyle={styles.title} />
          </Appbar.Header>
          <View style={styles.loadingContainer}>
            <Text>Loading favorites...</Text>
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="My Favorites" titleStyle={styles.title} />
        </Appbar.Header>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="heart-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>No favorites yet</Text>
              <Text style={styles.emptySubtext}>
                Like some shayaris to see them here
              </Text>
            </View>
          ) : (
            favorites.map((favorite, index) => (
              <View key={favorite.id} style={styles.shayariCard}>
                <Text style={styles.shayariText}>{favorite.text}</Text>
                <Text style={styles.poetCredit}>- {favorite.poetName}</Text>
                <Text style={styles.categoryText}>{favorite.categoryName}</Text>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => copyToClipboard(favorite.text)}
                  >
                    <Icon name="content-copy" size={20} color="#E37575" />
                    <Text style={styles.actionText}>Copy</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => shareShayari(favorite.text)}
                  >
                    <Icon name="share-variant" size={20} color="#E37575" />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => removeFavorite(favorite)}
                  >
                    <Icon name="heart" size={20} color="#ff4757" />
                    <Text style={styles.actionText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E37575',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  shayariCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shayariText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  poetCredit: {
    fontSize: 14,
    color: '#E37575',
    textAlign: 'right',
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    marginLeft: 4,
    color: '#E37575',
    fontSize: 14,
    fontWeight: '500',
  },
});