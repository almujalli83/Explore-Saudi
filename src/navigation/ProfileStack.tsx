import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MyBookingsScreen from '../screens/profile/MyBookingsScreen';
import NFTCollectionScreen from '../screens/profile/NFTCollectionScreen';
import ReviewsScreen from '../screens/profile/ReviewsScreen';
import ShareExperienceScreen from '../screens/profile/ShareExperienceScreen';
import PhotoSpotsScreen from '../screens/profile/PhotoSpotsScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
      <Stack.Screen name="NFTCollection" component={NFTCollectionScreen} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
      <Stack.Screen name="ShareExperience" component={ShareExperienceScreen} />
      <Stack.Screen name="PhotoSpots" component={PhotoSpotsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
