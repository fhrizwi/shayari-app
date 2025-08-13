import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { cardData, CardItem } from '../CardData';
import AutoSlider from '../AutoSlider';

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

  const renderCard = ({ item }: { item: CardItem }) => (
    <TouchableOpacity 
      className="bg-red-300 h-36 w-[30%] rounded-xl mb-4 overflow-hidden border-rose-300 border-[1px] shadow-lg shadow-pink-800"
      onPress={() => navigation.navigate('Shayari', { categoryName: item.title })}
    >
      <Image source={item.img} style={{ width: '100%', height: '75%' }} resizeMode="cover" />
      <Text className="text-black text-center font-bold mt-2">{item.title}</Text>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View className="p-2">
      <AutoSlider images={bannerImages} autoPlayInterval={3000} />
      <Text className="text-start text-lg text-rose-600 px-3 my-4">Shayari Categories</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Ishqnama" titleStyle={styles.title} />
          <Appbar.Action icon="heart" color="white" onPress={() => { }} />
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