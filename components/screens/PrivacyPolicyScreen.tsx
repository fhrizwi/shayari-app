import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type PrivacyPolicyScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export default function PrivacyPolicyScreen({ navigation }: PrivacyPolicyScreenProps) {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Privacy Policy" titleStyle={styles.title} />
        </Appbar.Header>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.lastUpdated}>Last updated: January 2024</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Introduction</Text>
              <Text style={styles.text}>
                Welcome to Ishqnama. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you use our 
                mobile application and tell you about your privacy rights.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Information We Collect</Text>
              <Text style={styles.subTitle}>Personal Information</Text>
              <Text style={styles.text}>
                • We do not collect any personal information such as your name, email address, or phone number unless you voluntarily provide it to us.
              </Text>
              
              <Text style={styles.subTitle}>Usage Data</Text>
              <Text style={styles.text}>
                • App usage statistics (which features you use most)
                {'\n'}• Device information (device type, operating system version)
                {'\n'}• Crash reports and error logs to improve app stability
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How We Use Your Information</Text>
              <Text style={styles.text}>
                We use the collected information to:
                {'\n'}• Provide and maintain our service
                {'\n'}• Improve user experience
                {'\n'}• Analyze app usage patterns
                {'\n'}• Fix bugs and improve app performance
                {'\n'}• Send you technical notices and support messages
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Data Storage and Security</Text>
              <Text style={styles.text}>
                • Your favorite shayaris are stored locally on your device
                {'\n'}• We implement appropriate security measures to protect your information
                {'\n'}• We do not sell, trade, or rent your personal information to third parties
                {'\n'}• Data is encrypted during transmission
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Third-Party Services</Text>
              <Text style={styles.text}>
                Our app may contain links to third-party websites or services. We are not responsible for 
                the privacy practices of these third parties. We encourage you to read their privacy policies.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Children's Privacy</Text>
              <Text style={styles.text}>
                Our service is suitable for all ages. We do not knowingly collect personal information from 
                children under 13. If you are a parent or guardian and believe your child has provided us with 
                personal information, please contact us.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Rights</Text>
              <Text style={styles.text}>
                You have the right to:
                {'\n'}• Access your personal data
                {'\n'}• Correct inaccurate data
                {'\n'}• Delete your data
                {'\n'}• Object to data processing
                {'\n'}• Data portability
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cookies and Tracking</Text>
              <Text style={styles.text}>
                Our app does not use cookies or tracking technologies. All data is stored locally on your device 
                for your convenience and privacy.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Changes to This Policy</Text>
              <Text style={styles.text}>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy in the app. Changes are effective immediately after they are posted.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Us</Text>
              <Text style={styles.text}>
                If you have any questions about this Privacy Policy, please contact us at:
                {'\n'}Email: ishqnama@gmail.com
                {'\n'}
                {'\n'}We will respond to your inquiry within 48 hours.
              </Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By using Ishqnama, you agree to this Privacy Policy.
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
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E37575',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    textAlign: 'justify',
  },
  footer: {
    backgroundColor: '#E37575',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});