import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import PoetCategoriesScreen from '../screens/PoetCategoriesScreen';
import ShayariScreen from '../screens/ShayariScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import RateUsScreen from '../screens/RateUsScreen';
import AboutAppScreen from '../screens/AboutAppScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
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
        <Drawer.Screen name="My Favorites" component={FavoritesScreen} />
        <Drawer.Screen 
          name="PoetCategories" 
          component={PoetCategoriesScreen} 
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen 
          name="Shayari" 
          component={ShayariScreen} 
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen name="Rate Us" component={RateUsScreen} />
        <Drawer.Screen name="About App" component={AboutAppScreen} />
        <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}