import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from '../screens/explore/ExploreScreen';
import AttractionDetailScreen from '../screens/explore/AttractionDetailScreen';
import EntertainmentScreen from '../screens/entertainment/EntertainmentScreen';
import VenueDetailScreen from '../screens/entertainment/VenueDetailScreen';
import EventDetailScreen from '../screens/entertainment/EventDetailScreen';
import SeatSelectionScreen from '../screens/entertainment/SeatSelectionScreen';
import TicketCheckoutScreen from '../screens/entertainment/TicketCheckoutScreen';
import DiningScreen from '../screens/dining/DiningScreen';
import RestaurantDetailScreen from '../screens/dining/RestaurantDetailScreen';
import ReservationScreen from '../screens/dining/ReservationScreen';
import ShoppingScreen from '../screens/shopping/ShoppingScreen';
import MallDetailScreen from '../screens/shopping/MallDetailScreen';
import AccommodationScreen from '../screens/accommodation/AccommodationScreen';
import HotelDetailScreen from '../screens/accommodation/HotelDetailScreen';
import HotelReservationScreen from '../screens/accommodation/HotelReservationScreen';
import DigitalCheckInScreen from '../screens/accommodation/DigitalCheckInScreen';
import AITripPlannerScreen from '../screens/explore/AITripPlannerScreen';
import PrayerTimesScreen from '../screens/explore/PrayerTimesScreen';
import CulturalGuideScreen from '../screens/explore/CulturalGuideScreen';
import CuisineFinderScreen from '../screens/explore/CuisineFinderScreen';

const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="AttractionDetail" component={AttractionDetailScreen} />
      <Stack.Screen name="Entertainment" component={EntertainmentScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
      <Stack.Screen name="TicketCheckout" component={TicketCheckoutScreen} />
      <Stack.Screen name="Dining" component={DiningScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen name="Shopping" component={ShoppingScreen} />
      <Stack.Screen name="MallDetail" component={MallDetailScreen} />
      <Stack.Screen name="Accommodation" component={AccommodationScreen} />
      <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
      <Stack.Screen name="HotelReservation" component={HotelReservationScreen} />
      <Stack.Screen name="DigitalCheckIn" component={DigitalCheckInScreen} />
      <Stack.Screen name="AITripPlanner" component={AITripPlannerScreen} />
      <Stack.Screen name="PrayerTimes" component={PrayerTimesScreen} />
      <Stack.Screen name="CulturalGuide" component={CulturalGuideScreen} />
      <Stack.Screen name="CuisineFinder" component={CuisineFinderScreen} />
    </Stack.Navigator>
  );
}
