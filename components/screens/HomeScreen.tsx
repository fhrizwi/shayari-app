import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { poetData, Poet } from '../PoetData';
import AutoSlider from '../AutoSlider';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with margins

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const bannerImages = [
    require('../../assets/jaunelia.jpg'),
    require('../../assets/g.jpg'),
    require('../../assets/munawwar.jpg'),
    require('../../assets/jaunelia.jpg'),
    require('../../assets/munawwar.jpg'),
    require('../../assets/g.jpg'),
    require('../../assets/munawwar.jpg'),
  ];

  const renderHorizontalPoetCard = ({ item }: { item: Poet }) => (
    <TouchableOpacity 
      style={styles.horizontalPoetCard}
      onPress={() => navigation.navigate('PoetCategories', { poet: item })}
    >
      <Image source={item.image} style={styles.horizontalPoetImage} resizeMode="cover" />
      <Text style={styles.horizontalPoetName} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPoetCard = (poet: Poet) => (
    <TouchableOpacity 
      key={poet.id}
      style={[styles.poetCard, { width: cardWidth }]}
      onPress={() => navigation.navigate('PoetCategories', { poet: poet })}
    >
      <Image source={poet.image} style={styles.poetImage} resizeMode="cover" />
      <View style={styles.poetInfo}>
        <Text style={styles.poetName}>{poet.name}</Text>
        <Text style={styles.poetDescription} numberOfLines={2}>
          {poet.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Ishqnama" titleStyle={styles.title} />
          <Appbar.Action icon="heart" color="white" onPress={() => { }} />
        </Appbar.Header>

        <ScrollView 
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.bannerContainer}>
            <AutoSlider images={bannerImages} autoPlayInterval={3000} />
          </View>
          
          {/* Horizontal Poets Scroll */}
          <View style={styles.horizontalSection}>
            <Text style={styles.sectionTitle}>Quick Access Poets</Text>
            <FlatList
              data={poetData}
              renderItem={renderHorizontalPoetCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
            />
          </View>
          
          <Text style={styles.sectionTitle}>Famous Poets</Text>
          
          <View style={styles.poetsContainer}>
            {poetData.map((poet, index) => {
              if (index % 2 === 0) {
                return (
                  <View key={`row-${index}`} style={styles.poetRow}>
                    {renderPoetCard(poet)}
                    {poetData[index + 1] && renderPoetCard(poetData[index + 1])}
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
  bannerContainer: {
    padding: 8,
  },
  horizontalSection: {
    marginBottom: 20,
  },
  horizontalScrollContainer: {
    paddingHorizontal: 16,
  },
  horizontalPoetCard: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  horizontalPoetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#E37575',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  horizontalPoetName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E37575',
    textAlign: 'center',
    lineHeight: 13,
    maxWidth: 90,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E37575',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  poetsContainer: {
    paddingHorizontal: 16,
  },
  poetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  poetCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
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
    width: '100%',
    height: 140,
  },
  poetInfo: {
    padding: 12,
  },
  poetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  poetDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});