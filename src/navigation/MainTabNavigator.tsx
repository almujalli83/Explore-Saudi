import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../constants/theme';
import HomeStack from './HomeStack';
import ExploreStack from './ExploreStack';
import WalletStack from './WalletStack';
import ServicesStack from './ServicesStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, string> = {
  HomeTab: '🏠',
  ExploreTab: '🧭',
  WalletTab: '💳',
  ServicesTab: '⚡',
  ProfileTab: '👤',
};

const TAB_LABELS: Record<string, string> = {
  HomeTab: 'Home',
  ExploreTab: 'Explore',
  WalletTab: 'Wallet',
  ServicesTab: 'Services',
  ProfileTab: 'Profile',
};

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBarContainer}>
      <BlurView intensity={80} tint="light" style={styles.blurView}>
        <View style={styles.tabBar}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const isWallet = route.name === 'WalletTab';

            const onPress = () => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            if (isWallet) {
              return (
                <TouchableOpacity key={route.key} onPress={onPress} style={styles.walletTabWrapper}>
                  <LinearGradient
                    colors={[colors.sand, colors.sandDark]}
                    style={styles.walletTab}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.walletIcon}>💳</Text>
                  </LinearGradient>
                  <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                    {TAB_LABELS[route.name]}
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity key={route.key} onPress={onPress} style={styles.tab}>
                <Text style={[styles.tabIcon, isFocused && styles.tabIconActive]}>
                  {TAB_ICONS[route.name]}
                </Text>
                <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                  {TAB_LABELS[route.name]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="ExploreTab" component={ExploreStack} />
      <Tab.Screen name="WalletTab" component={WalletStack} />
      <Tab.Screen name="ServicesTab" component={ServicesStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 88 : 72,
  },
  blurView: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(212, 168, 83, 0.2)',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    color: colors.slate,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: colors.sand,
    fontWeight: '700',
  },
  walletTabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -28,
  },
  walletTab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.sand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  walletIcon: {
    fontSize: 26,
  },
});
