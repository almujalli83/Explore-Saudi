import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletDashboardScreen from '../screens/wallet/WalletDashboardScreen';
import DigitalIDScreen from '../screens/wallet/DigitalIDScreen';
import PaymentScreen from '../screens/wallet/PaymentScreen';
import CurrencyExchangeScreen from '../screens/wallet/CurrencyExchangeScreen';
import ExpenseTrackerScreen from '../screens/wallet/ExpenseTrackerScreen';
import LoyaltyCardsScreen from '../screens/wallet/LoyaltyCardsScreen';
import MyTicketsScreen from '../screens/wallet/MyTicketsScreen';

const Stack = createNativeStackNavigator();

export default function WalletStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalletDashboard" component={WalletDashboardScreen} />
      <Stack.Screen name="DigitalID" component={DigitalIDScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="CurrencyExchange" component={CurrencyExchangeScreen} />
      <Stack.Screen name="ExpenseTracker" component={ExpenseTrackerScreen} />
      <Stack.Screen name="LoyaltyCards" component={LoyaltyCardsScreen} />
      <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
    </Stack.Navigator>
  );
}
