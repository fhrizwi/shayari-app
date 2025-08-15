import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type AboutAppScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export default function AboutAppScreen({ navigation }: AboutAppScreenProps) {
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="About App" titleStyle={styles.title} />
        </Appbar.Header>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* App Logo and Name */}
            <View style={styles.logoSection}>
              <Image
                source={require('../../assets/Ishqnama.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>Ishqnama</Text>
              <Text style={styles.version}>Version 1.0.0</Text>
            </View>

            {/* App Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Ishqnama</Text>
              <Text style={styles.description}>
                Ishqnama is a beautiful collection of Urdu and Hindi poetry (Shayari) from renowned poets. 
                Our app brings you the finest verses of love, life, philosophy, and emotions from legendary 
                poets like Mirza Ghalib, Allama Iqbal, Faiz Ahmed Faiz, and many more.
              </Text>
            </View>

            {/* Features */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Icon name="book-open-variant" size={24} color="#E37575" />
                  <Text style={styles.featureText}>Extensive collection of poetry from famous poets</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="heart" size={24} color="#E37575" />
                  <Text style={styles.featureText}>Save your favorite shayaris</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="share-variant" size={24} color="#E37575" />
                  <Text style={styles.featureText}>Share beautiful verses with friends</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="translate" size={24} color="#E37575" />
                  <Text style={styles.featureText}>Multi-language support</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="format-list-bulleted" size={24} color="#E37575" />
                  <Text style={styles.featureText}>Organized by categories and poets</Text>
                </View>
              </View>
            </View>

            {/* Mission */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Our Mission</Text>
              <Text style={styles.description}>
                To preserve and promote the rich heritage of Urdu and Hindi poetry, making it accessible 
                to poetry lovers worldwide. We aim to connect people with the timeless beauty of words 
                and emotions expressed by master poets.
              </Text>
            </View>

            {/* Developer Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Developer</Text>
              <Text style={styles.description}>
                Developed with ❤️ by the Ishqnama team. We are passionate about poetry and technology, 
                working to bring the best poetry experience to your mobile device.
              </Text>
            </View>

            {/* Contact */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Us</Text>
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => openLink('mailto:ishqnama@gmail.com')}
              >
                <Icon name="email" size={24} color="#E37575" />
                <Text style={styles.contactText}>ishqnama@gmail.com</Text>
              </TouchableOpacity>
            </View>

            {/* Copyright */}
            <View style={styles.footer}>
              <Text style={styles.copyright}>
                © 2024 Ishqnama. All rights reserved.
              </Text>
              <Text style={styles.footerText}>
                Made with love for poetry enthusiasts
              </Text>
            </View>
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
  content: {
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E37575',
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'justify',
  },
  featuresList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactText: {
    fontSize: 16,
    color: '#E37575',
    marginLeft: 12,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  copyright: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#E37575',
    fontStyle: 'italic',
  },
});