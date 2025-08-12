import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar, Divider } from 'react-native-paper';
import { View, Text, StyleSheet, Image, FlatList, Linking, Alert, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { cardData, CardItem } from './components/CardData';
import AutoSlider from './components/AutoSlider';
import './global.css';

const Drawer = createDrawerNavigator();

// -------------------------
// Helper: Open social
// -------------------------
async function openSocial(platform, usernameOrId) {
  const webUrls = {
    instagram: `https://instagram.com/${usernameOrId}`,
    twitter: `https://twitter.com/${usernameOrId}`,
    linkedin: `https://linkedin.com/in/${usernameOrId}`,
    youtube: `https://youtube.com/@${usernameOrId}`,
  };

  const appUrls = {
    instagram: `instagram://user?username=${usernameOrId}`,
    twitter: `twitter://user?screen_name=${usernameOrId}`,
    linkedin: `linkedin://in/${usernameOrId}`,
    youtube: Platform.OS === 'android'
      ? `vnd.youtube://user/${usernameOrId}`
      : `youtube://www.youtube.com/channel/${usernameOrId}`,
  };

  const appUrl = appUrls[platform];
  const webUrl = webUrls[platform];

  try {
    if (appUrl && await Linking.canOpenURL(appUrl)) {
      await Linking.openURL(appUrl);
      return;
    }

    if (platform === 'youtube' && Platform.OS === 'android') {
      const intentUrl = `intent://${usernameOrId}#Intent;package=com.google.android.youtube;scheme=https;end`;
      if (await Linking.canOpenURL(intentUrl)) {
        await Linking.openURL(intentUrl);
        return;
      }
    }

    if (webUrl && await Linking.canOpenURL(webUrl)) {
      await Linking.openURL(webUrl);
      return;
    }

    await Linking.openURL(webUrl);
  } catch (err) {
    console.warn('openSocial error', err);
    Alert.alert('Unable to open link', 'Please check your internet connection or app availability.');
  }
}

// -------------------------
// Custom Drawer
// -------------------------
function CustomDrawerContent(props) {
  // ✅ Real usernames
  const INSTAGRAM_USERNAME = 'faizulhaque_77';
  const TWITTER_USERNAME = 'fhrizwi';
  const LINKEDIN_USERNAME = 'fhrizwi';
  const YOUTUBE_NAME_OR_CHANNEL = 'Ishqnama';

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Logo & App Info */}
      <View style={styles.drawerHeader}>
        <Image
          source={require('./assets/Ishqnama.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>Ishqnama</Text>
        <Text style={styles.email}>Ishqnama@gmail.com</Text>
      </View>

      {/* Top Section - Main Features */}
      <DrawerItem
        label="Home"
        icon={({ color }) => <Icon name="home-outline" size={22} color={color} />}
        onPress={() => props.navigation.navigate('Home')}
        pressColor="#FEE2E2"               // Ripple color on press (Android)

      />
      <DrawerItem
        label="Favourites"
        icon={({ color }) => <Icon name="star-outline" size={22} color={color} />}
        onPress={() => props.navigation.navigate('Favourites')}
        pressColor="#FEE2E2"               // Ripple color on press (Android)

      />

      <Divider style={{ marginVertical: 8 }} />

      {/* Middle Section - Engagement */}
      <DrawerItem
        label="Share App"
        icon={({ color }) => <Icon name="share-variant" size={22} color={color} />}
        onPress={() => props.navigation.navigate('Share App')}
        pressColor="#FEE2E2"               // Ripple color on press (Android)

      />
      <DrawerItem
        label="Rate Us"
        icon={({ color }) => <Icon name="star-face" size={22} color={color} />}
        onPress={() => props.navigation.navigate('Rate Us')}
        pressColor="#FEE2E2"               // Ripple color on press (Android)

      />

      <Divider style={{ marginVertical: 8 }} />

      {/* Bottom Section - Info */}
      <DrawerItem
        label="About App"
        icon={({ color }) => <Icon name="information-outline" size={22} color={color} />}
        onPress={() => props.navigation.navigate('About App')}
        pressColor="#FEE2E2"               // Ripple color on press (Android)

      />
      <DrawerItem
        label="Privacy Policy"
        icon={({ color }) => <Icon name="shield-lock-outline" size={22} color={color} />}
        onPress={() => props.navigation.navigate('Privacy Policy')}
        pressColor="#FEE2E2"               // Ripple color on press (Android)

      />

      {/* Social Icons Row at Bottom */}
      <View style={styles.socialRow}>
        <Icon
          name="instagram"
          size={26}
          color="#FEE2E2"
          onPress={() => openSocial('instagram', INSTAGRAM_USERNAME)}
        />
        <Icon
          name="twitter"
          size={26}
          color="#1DA1F2"
          onPress={() => openSocial('twitter', TWITTER_USERNAME)}
        />
        <Icon
          name="linkedin"
          size={26}
          color="#0077B5"
          onPress={() => openSocial('linkedin', LINKEDIN_USERNAME)}
        />
        <Icon
          name="youtube"
          size={26}
          color="#FF0000"
          onPress={() => openSocial('youtube', YOUTUBE_NAME_OR_CHANNEL)}
        />
      </View>
    </DrawerContentScrollView>
  );
}

// -------------------------
// Home Screen
// -------------------------
function HomeScreen({ navigation }) {
  const bannerImages = [
    require('./assets/jaunelia.jpg'),
    require('./assets/g.jpg'),
    require('./assets/munawwar.jpg'),
    require('./assets/jaunelia.jpg'),
    require('./assets/munawwar.jpg'),
    require('./assets/g.jpg'),
    require('./assets/munawwar.jpg'),
  ];

  const renderCard = ({ item }: { item: CardItem }) => (
    <View className="bg-red-300 h-36 w-[30%] rounded-xl mb-4 overflow-hidden border-rose-300 border-[1px] shadow-lg shadow-pink-800">
      <Image source={item.img} style={{ width: '100%', height: '75%' }} resizeMode="cover" />
      <Text className="text-black text-center font-bold mt-2">{item.title}</Text>
    </View>
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
            {/* star-outline */}
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

// -------------------------
// Category Screen
// -------------------------
function CategoryScreen({ navigation, route }) {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title={route.name} titleStyle={styles.title} />
        </Appbar.Header>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{route.name}</Text>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

// -------------------------
// Main App
// -------------------------
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#E37575',
          drawerLabelStyle: { fontSize: 15 },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Favourites" component={CategoryScreen} />
        <Drawer.Screen name="Write Your Shayari" component={CategoryScreen} />
        <Drawer.Screen name="New Shayari" component={CategoryScreen} />
        <Drawer.Screen name="Share App" component={CategoryScreen} />
        <Drawer.Screen name="Rate Us" component={CategoryScreen} />
        <Drawer.Screen name="Feedback / Contact Us" component={CategoryScreen} />
        <Drawer.Screen name="About App" component={CategoryScreen} />
        <Drawer.Screen name="Privacy Policy" component={CategoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// -------------------------
// Styles
// -------------------------
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E37575',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',

  },
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E37575',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 'auto',
  },
});
