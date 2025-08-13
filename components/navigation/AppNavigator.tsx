import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ShayariScreen from '../screens/ShayariScreen';
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
        <Drawer.Screen 
          name="Shayari" 
          component={ShayariScreen} 
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen name="Share App" component={CategoryScreen} />
        <Drawer.Screen name="Rate Us" component={CategoryScreen} />
        <Drawer.Screen name="About App" component={CategoryScreen} />
        <Drawer.Screen name="Privacy Policy" component={CategoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}