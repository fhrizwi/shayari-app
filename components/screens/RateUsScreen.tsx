import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, TextInput } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RateUsScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export default function RateUsScreen({ navigation }: RateUsScreenProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleStarPress = (starRating: number) => {
    setRating(starRating);
  };

  const submitRating = () => {
    if (rating === 0) {
      Alert.alert('Please Rate', 'Please select a star rating before submitting.');
      return;
    }

    Alert.alert(
      'Thank You!',
      `Thank you for rating us ${rating} star${rating > 1 ? 's' : ''}! Your feedback helps us improve.`,
      [
        {
          text: 'Rate on Play Store',
          onPress: () => openPlayStore(),
        },
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );

    // Reset form
    setRating(0);
    setFeedback('');
  };

  const openPlayStore = async () => {
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.ishqnama.app';
    try {
      const supported = await Linking.canOpenURL(playStoreUrl);
      if (supported) {
        await Linking.openURL(playStoreUrl);
      } else {
        Alert.alert('Error', 'Cannot open Play Store');
      }
    } catch (error) {
      console.error('Error opening Play Store:', error);
      Alert.alert('Error', 'Cannot open Play Store');
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starButton}
        >
          <Icon
            name={i <= rating ? 'star' : 'star-outline'}
            size={40}
            color={i <= rating ? '#FFD700' : '#ccc'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const getRatingText = () => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Tap a star to rate';
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Rate Us" titleStyle={styles.title} />
        </Appbar.Header>

        <View style={styles.container}>
          <View style={styles.content}>
            <Icon name="heart" size={80} color="#E37575" style={styles.heartIcon} />
            
            <Text style={styles.mainTitle}>Rate Ishqnama</Text>
            <Text style={styles.subtitle}>
              How would you rate your experience with our app?
            </Text>

            <View style={styles.starsContainer}>
              {renderStars()}
            </View>

            <Text style={styles.ratingText}>{getRatingText()}</Text>

            <TextInput
              style={styles.feedbackInput}
              placeholder="Share your feedback (optional)"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={feedback}
              onChangeText={setFeedback}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
              <Text style={styles.submitButtonText}>Submit Rating</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.playStoreButton} onPress={openPlayStore}>
              <Icon name="google-play" size={24} color="white" />
              <Text style={styles.playStoreButtonText}>Rate on Play Store</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  heartIcon: {
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  starButton: {
    marginHorizontal: 4,
    padding: 4,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E37575',
    marginBottom: 32,
  },
  feedbackInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 24,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#E37575',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playStoreButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playStoreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});