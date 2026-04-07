import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

const MENU_ITEMS = [
  { id: '1', icon: '✏️', label: 'Edit Profile', route: 'EditProfile' },
  { id: '2', icon: '📄', label: 'Digital Documents', route: 'DigitalDocuments' },
  { id: '3', icon: '📋', label: 'My Bookings', route: 'MyBookings' },
  { id: '4', icon: '🖼️', label: 'NFT Collection', route: 'NFTCollection' },
  { id: '5', icon: '⭐', label: 'My Reviews', route: 'Reviews' },
  { id: '6', icon: '📤', label: 'Share Experience', route: 'ShareExperience' },
  { id: '7', icon: '📸', label: 'Photo Spots', route: 'PhotoSpots' },
  { id: '8', icon: '⚙️', label: 'Settings', route: 'Settings' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) ?? 'T'}</Text>
          </View>
          <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
          <Text style={styles.email}>{user?.email ?? ''}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>12</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>48</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>7</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>{'\u203A'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            Alert.alert('Log Out', 'Are you sure you want to log out?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log Out', style: 'destructive', onPress: () => useAuthStore.getState().logout() },
            ]);
          }}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: { alignItems: 'center', paddingVertical: spacing.xl },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: colors.sand,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 32, fontWeight: '700', color: colors.white },
  name: { fontSize: typography.sizes.xl, fontWeight: '700', color: colors.charcoal, marginTop: spacing.md },
  email: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 4 },
  statsRow: {
    flexDirection: 'row', marginTop: spacing.lg,
    backgroundColor: colors.pearl, borderRadius: borderRadius.lg, padding: spacing.md,
  },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: typography.sizes.xl, fontWeight: '700', color: colors.charcoal },
  statLabel: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: colors.white, marginHorizontal: spacing.sm },
  menu: { paddingHorizontal: spacing.md },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.pearl,
  },
  menuIcon: { fontSize: 22, marginRight: spacing.md },
  menuLabel: { flex: 1, fontSize: typography.sizes.md, color: colors.charcoal },
  menuArrow: { fontSize: 22, color: colors.slate },
  logoutBtn: { alignItems: 'center', marginTop: spacing.xl },
  logoutText: { fontSize: typography.sizes.md, color: colors.error, fontWeight: '600' },
});
