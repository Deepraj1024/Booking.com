import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';
import BookingScreen from './screens/BookingScreen';
import UserScreen from './screens/UserScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from './screens/SearchScreen';
import PlaceScreen from './screens/PlaceScreen';
import PropertyInfoScreen from './screens/PropertyInfoScreen';
import RoomScreen from './screens/RoomScreen';
import SplashScreen from './screens/SplashScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import loginScreen from './screens/loginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Saved':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Booking':
              iconName = focused ? 'bookmarks' : 'bookmarks-outline';
              break;
            case 'User':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

const stackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="login" component={loginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Places" component={PlaceScreen} />
      <Stack.Screen name="Info" component={PropertyInfoScreen} />
      <Stack.Screen name="Rooms" component={RoomScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Confirm" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default stackNav;

const styles = StyleSheet.create({});
