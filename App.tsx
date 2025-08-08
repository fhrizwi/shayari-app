import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { cardData, CardItem } from './components/CardData';
import AutoSlider from './components/AutoSlider';
import './global.css';

export default function App() {
  // Banner images for slider (4 instances of the same image)
  const bannerImages = [
    require('./assets/jaunelia.jpg'),
    require('./assets/g.jpg'),
    require('./assets/jaunelia.jpg'),
    require('./assets/g.jpg'),

  ];

  // Render item function for FlatList
  const renderCard = ({ item }: { item: CardItem }) => (
    <View
      className="bg-red-300 h-36 w-[30%] rounded-xl mb-4 overflow-hidden border-rose-300 border-[1px] shadow-lg shadow-pink-800"
    >
      <Image
        source={item.img}
        style={{ width: '100%', height: '75%' }}
        resizeMode="cover"
      />
      <Text className="text-black text-center font-bold mt-2">{item.title}</Text>
    </View>
  );

  // Header component for FlatList
  const ListHeader = () => (
    <View className="p-2 ">
      {/* Auto Sliding Banner */}
      <AutoSlider images={bannerImages} autoPlayInterval={3000} />

      {/* Categories Title */}
      <Text className='text-start text-lg text-rose-600 px-3 my-4'>Shayari Categories</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <PaperProvider>
        {/* Appbar */}
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color='white' onPress={() => { }} />
          <Appbar.Content title="Shayari" titleStyle={styles.title} />
          <Appbar.Action icon="dots-vertical" color='white' onPress={() => { }} />
        </Appbar.Header>
        
        <FlatList
          data={cardData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          style={{ flex: 1 }}
        />
        
        <View className="h-12 bg-red-300" />
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
});
