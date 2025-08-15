import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { Poet } from '../PoetData';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

type RootStackParamList = {
  PoetCategories: { poet: Poet };
};

type PoetCategoriesScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'PoetCategories'>;
  route: RouteProp<RootStackParamList, 'PoetCategories'>;
};

export default function PoetCategoriesScreen({ navigation, route }: PoetCategoriesScreenProps) {
  const { poet } = route.params;

  const renderCategoryCard = (category: string, index: number) => (
    <TouchableOpacity 
      key={index}
      style={[styles.categoryCard, { width: cardWidth }]}
      onPress={() => navigation.navigate('Shayari', { 
        poetName: poet.name, 
        categoryName: category 
      })}
    >
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <Text style={styles.categorySubtitle}>
          {poet.name}'s {category} Poetry
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
          <Appbar.Content title={poet.name} titleStyle={styles.title} />
          <Appbar.Action icon="heart" color="white" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView 
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Poet Info Header */}
          <View style={styles.poetHeader}>
            <Image source={poet.image} style={styles.poetImage} resizeMode="cover" />
            <View style={styles.poetInfo}>
              <Text style={styles.poetName}>{poet.name}</Text>
              <Text style={styles.poetDescription}>{poet.description}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Poetry Categories</Text>
          
          <View style={styles.categoriesContainer}>
            {poet.categories.map((category, index) => {
              if (index % 2 === 0) {
                return (
                  <View key={`row-${index}`} style={styles.categoryRow}>
                    {renderCategoryCard(category, index)}
                    {poet.categories[index + 1] && renderCategoryCard(poet.categories[index + 1], index + 1)}
                  </View>
                );
              }
              return null;
            })}
          </View>
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
  scrollContent: {
    paddingBottom: 80,
  },
  poetHeader: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  poetImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  poetInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  poetName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  poetDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E37575',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#E37575',
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});