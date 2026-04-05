import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import SearchScreen from '../screens/home/SearchScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
