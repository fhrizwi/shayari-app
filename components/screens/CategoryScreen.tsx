import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

// Define your route params type
type RootStackParamList = {
  Category: { name: string };
};

type CategoryScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'Category'>;
  route: RouteProp<RootStackParamList, 'Category'>;
};

export default function CategoryScreen({ navigation, route }: CategoryScreenProps) {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title={route.name} titleStyle={styles.title} />
        </Appbar.Header>
        <View style={styles.container}>
          <Text>{route.name}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
