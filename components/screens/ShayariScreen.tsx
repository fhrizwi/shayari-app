import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Sample shayari data - you can replace this with your actual data
const shayariData: Record<string, string[]> = {
  'Hope': [
    'उम्मीद का दीया जलाए रखना,\nअंधेरों में भी रास्ता दिखाए रखना।\nजिंदगी में कितने भी तूफान आएं,\nहौसला और हिम्मत बनाए रखना।',
    'आशा की किरण से भरा है मन,\nसपनों का महल बनाता हूं।\nहर मुश्किल को अवसर समझकर,\nनई राह खुद बनाता हूं।',
    'टूटे सपनों के टुकड़ों से,\nनया सपना बुनता हूं।\nहर गिरावट के बाद उठकर,\nऔर मजबूत बनता हूं।'
  ],
  'Love': [
    'इश्क़ में डूबा है दिल मेरा,\nतेरी यादों में खोया हूं।\nहर सांस में तेरा नाम है,\nतेरे प्यार में रोया हूं।',
    'मोहब्बत का रंग ऐसा है,\nजो दिल को रंग देता है।\nहर ख्वाब में तू आता है,\nऔर सुकून दे जाता है।',
    'तेरे बिना अधूरा लगता है,\nये दिल और ये जहान।\nतू मेरी मंजिल है प्यारे,\nतू मेरी पहचान।'
  ],
  'Heart': [
    'दिल की बात कहना आसान नहीं,\nजो महसूस करते हैं वो बयान नहीं।\nकुछ रिश्ते शब्दों से परे होते हैं,\nकुछ एहसास केवल दिल की जुबान नहीं।',
    'दिल से दिल तक का सफर,\nबिना कहे समझ जाना।\nआंखों की भाषा में छुपे,\nप्रेम के गीत गुनगुनाना।',
    'दिल की गहराइयों में छुपे,\nकितने राज हैं अनकहे।\nहर धड़कन में बसा है,\nप्यार का अहसास सच्चे।'
  ],
  'Esc': [
    'दिल की बात कहना आसान नहीं,\nजो महसूस करते हैं वो बयान नहीं।\nकुछ रिश्ते शब्दों से परे होते हैं,\nकुछ एहसास केवल दिल की जुबान नहीं।',
    'दिल से दिल तक का सफर,\nबिना कहे समझ जाना।\nआंखों की भाषा में छुपे,\nप्रेम के गीत गुनगुनाना।',
    'दिल की गहराइयों में छुपे,\nकितने राज हैं अनकहे।\nहर धड़कन में बसा है,\nप्यार का अहसास सच्चे।'
  ]
};

type RootStackParamList = {
  Shayari: { categoryName: string };
};

type ShayariScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'Shayari'>;
  route: RouteProp<RootStackParamList, 'Shayari'>;
};

export default function ShayariScreen({ navigation, route }: ShayariScreenProps) {
  const { categoryName } = route.params;
  const shayaris = shayariData[categoryName] || ['No shayari found for this category.'];

  const shareShayari = async (shayari: string) => {
    try {
      await Share.share({
        message: `${shayari}\n\n- Shared from Ishqnama App`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const copyToClipboard = (shayari: string) => {
    // You can implement clipboard functionality here
    console.log('Copied to clipboard:', shayari);
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
          <Appbar.Content title={categoryName} titleStyle={styles.title} />
          <Appbar.Action icon="heart" color="white" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {shayaris.map((shayari, index) => (
            <View key={index} style={styles.shayariCard}>
              <Text style={styles.shayariText}>{shayari}</Text>
              
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
                
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="heart-outline" size={20} color="#E37575" />
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