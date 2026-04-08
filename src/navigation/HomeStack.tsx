import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import SearchScreen from '../screens/home/SearchScreen';
import AttractionDetailScreen from '../screens/explore/AttractionDetailScreen';
import HotelDetailScreen from '../screens/accommodation/HotelDetailScreen';
import HotelReservationScreen from '../screens/accommodation/HotelReservationScreen';
import DigitalCheckInScreen from '../screens/accommodation/DigitalCheckInScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AttractionDetail" component={AttractionDetailScreen} />
      <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
      <Stack.Screen name="HotelReservation" component={HotelReservationScreen} />
      <Stack.Screen name="DigitalCheckIn" component={DigitalCheckInScreen} />
    </Stack.Navigator>
  );
}
