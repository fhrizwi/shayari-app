import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { poetShayariData } from '../PoetData';
import { FavoritesStorage } from '../storage/FavoritesStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Clipboard from 'expo-clipboard'; // ✅ Expo clipboard

type RootStackParamList = {
  Shayari: { poetName: string; categoryName: string };
};

type ShayariScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'Shayari'>;
  route: RouteProp<RootStackParamList, 'Shayari'>;
};

export default function ShayariScreen({ navigation, route }: ShayariScreenProps) {
  const { poetName, categoryName } = route.params;
  const [likedShayaris, setLikedShayaris] = useState<Set<string>>(new Set());

  const shayaris = poetShayariData[poetName]?.[categoryName] || [
    'जल्द ही इस श्रेणी में शायरी जोड़ी जाएगी।\nकृपया बाद में फिर से देखें।'
  ];

  useEffect(() => {
    loadFavoriteStatus();
  }, []);

  const loadFavoriteStatus = async () => {
    const favoriteSet = new Set<string>();
    for (const shayari of shayaris) {
      const isFav = await FavoritesStorage.isFavorite(shayari, poetName);
      if (isFav) {
        favoriteSet.add(shayari);
      }
    }
    setLikedShayaris(favoriteSet);
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
      await Clipboard.setStringAsync(shayari); // ✅ Async method for Expo
      Alert.alert('Copied!', 'Shayari copied to clipboard', [{ text: 'OK' }]);
    } catch (error) {
      console.log('Error copying to clipboard:', error);
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const toggleLike = async (shayari: string) => {
    const isCurrentlyLiked = likedShayaris.has(shayari);

    if (isCurrentlyLiked) {
      await FavoritesStorage.removeFavorite(shayari, poetName);
      const newLikedShayaris = new Set(likedShayaris);
      newLikedShayaris.delete(shayari);
      setLikedShayaris(newLikedShayaris);
      Alert.alert('Removed', 'Shayari removed from favorites');
    } else {
      await FavoritesStorage.addFavorite({
        text: shayari,
        poetName: poetName,
        categoryName: categoryName,
      });
      const newLikedShayaris = new Set(likedShayaris);
      newLikedShayaris.add(shayari);
      setLikedShayaris(newLikedShayaris);
      Alert.alert('Added', 'Shayari added to favorites');
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
          <Appbar.Content 
            title={`${poetName} - ${categoryName}`} 
            titleStyle={styles.title} 
          />
          <Appbar.Action icon="heart" color="white" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {shayaris.map((shayari, index) => (
            <View key={index} style={styles.shayariCard}>
              <Text style={styles.shayariText}>{shayari}</Text>
              <Text style={styles.poetCredit}>- {poetName}</Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => copyToClipboard(shayari)}
                >
                  <Icon name="content-copy" size={20} color="#E37575" />
                  <Text style={styles.actionText}>Copy</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => shareShayari(shayari)}
                >
                  <Icon name="share-variant" size={20} color="#E37575" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => toggleLike(shayari)}
                >
                  <Icon 
                    name={likedShayaris.has(shayari) ? "heart" : "heart-outline"} 
                    size={20} 
                    color={likedShayaris.has(shayari) ? "#ff4757" : "#E37575"} 
                  />
                  <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  shayariCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
