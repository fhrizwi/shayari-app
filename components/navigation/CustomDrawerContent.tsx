import { View, Text, StyleSheet, Image, Alert, Platform, Linking } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Helper function for opening social media
async function openSocial(platform: string, usernameOrId: string) {
  const webUrls: Record<string, string> = {
    instagram: `https://instagram.com/${usernameOrId}`,
    twitter: `https://twitter.com/${usernameOrId}`,
    linkedin: `https://linkedin.com/in/${usernameOrId}`,
    youtube: `https://youtube.com/@${usernameOrId}`,
  };

  const appUrls: Record<string, string> = {
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

interface CustomDrawerContentProps {
  navigation: any;
}

export default function CustomDrawerContent(props: CustomDrawerContentProps) {
  // Real usernames
  const INSTAGRAM_USERNAME = 'faizulhaque_77';
  const TWITTER_USERNAME = 'fhrizwi';
  const LINKEDIN_USERNAME = 'fhrizwi';
  const YOUTUBE_NAME_OR_CHANNEL = 'Ishqnama';

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Logo & App Info */}
      <View style={styles.drawerHeader}>
        <Image
          source={require('../../assets/Ishqnama.png')}
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
        pressColor="#FEE2E2"
      />

      <Divider style={{ marginVertical: 8 }} />

      {/* Middle Section - Engagement */}
      <DrawerItem
        label="My Favorites"
        icon={({ color }) => <Icon name="heart" size={22} color={color} />}
        onPress={() => props.navigation.navigate('My Favorites')}
        pressColor="#FEE2E2"
      />
      <DrawerItem
        label="Rate Us"
        icon={({ color }) => <Icon name="star-face" size={22} color={color} />}
        onPress={() => props.navigation.navigate('Rate Us')}
        pressColor="#FEE2E2"
      />

      <Divider style={{ marginVertical: 8 }} />

      {/* Bottom Section - Info */}
      <DrawerItem
        label="About App"
        icon={({ color }) => <Icon name="information-outline" size={22} color={color} />}
        onPress={() => props.navigation.navigate('About App')}
        pressColor="#FEE2E2"
      />
      <DrawerItem
        label="Privacy Policy"
        icon={({ color }) => <Icon name="shield-lock-outline" size={22} color={color} />}
        onPress={() => props.navigation.navigate('Privacy Policy')}
        pressColor="#FEE2E2"
      />

      {/* Social Icons Row at Bottom */}
      <View style={styles.socialRow}>
        <Icon
          name="instagram"
          size={26}
          color="#ee2a7b"
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

const styles = StyleSheet.create({
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