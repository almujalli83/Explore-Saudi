import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from '../screens/services/ServicesScreen';
import TransportScreen from '../screens/services/TransportScreen';
import EmergencySOSScreen from '../screens/services/EmergencySOSScreen';
import OfflineMapsScreen from '../screens/services/OfflineMapsScreen';
import InsuranceScreen from '../screens/services/InsuranceScreen';
import LanguageHelperScreen from '../screens/services/LanguageHelperScreen';

const Stack = createNativeStackNavigator();

export default function ServicesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="Transport" component={TransportScreen} />
      <Stack.Screen name="EmergencySOS" component={EmergencySOSScreen} />
      <Stack.Screen name="OfflineMaps" component={OfflineMapsScreen} />
      <Stack.Screen name="Insurance" component={InsuranceScreen} />
      <Stack.Screen name="LanguageHelper" component={LanguageHelperScreen} />
    </Stack.Navigator>
  );
}
