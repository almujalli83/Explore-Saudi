import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

const NOTIFICATIONS = [
  { id: '1', icon: '🎟️', title: 'F1 Saudi Grand Prix', body: 'Tickets are selling fast! Book your Jeddah Corniche Circuit experience now.', time: '2h ago', unread: true },
  { id: '2', icon: '💳', title: 'Wallet Top-up', body: 'SAR 5,000.00 has been added to your wallet via Visa.', time: '5h ago', unread: true },
  { id: '3', icon: '🕌', title: 'Prayer Reminder', body: 'Asr prayer time at 3:30 PM. King Fahd Grand Mosque is 350m away.', time: '6h ago', unread: false },
  { id: '4', icon: '🎉', title: 'Riyadh Season 2026', body: 'Opening ceremony announced! Be the first to grab VIP tickets.', time: '1d ago', unread: false },
  { id: '5', icon: '🍽️', title: 'Reservation Confirmed', body: 'Your table at Nusr-Et Steakhouse is confirmed for tonight at 8 PM.', time: '1d ago', unread: false },
  { id: '6', icon: '⚡', title: 'Flash Sale', body: 'Boulevard Riyadh City tickets 50% off for the next 24 hours!', time: '2d ago', unread: false },
  { id: '7', icon: '🏨', title: 'Hotel Deal', body: 'Banyan Tree AlUla — 20% off desert villas this weekend.', time: '3d ago', unread: false },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Notifications" showBack onBack={() => navigation.goBack()} />
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.notifItem, item.unread && styles.unread]}>
            <View style={styles.iconWrap}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                {item.unread && <View style={styles.dot} />}
              </View>
              <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  list: { padding: spacing.md },
  notifItem: {
    flexDirection: 'row',
    padding: spacing.sm + 4,
    borderRadius: borderRadius.md,
  },
  unread: { backgroundColor: 'rgba(212,168,83,0.08)' },
  iconWrap: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: colors.pearl,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm,
  },
  icon: { fontSize: 22 },
  content: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.charcoal },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.sand },
  body: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 2, lineHeight: 18 },
  time: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 4 },
  separator: { height: 1, backgroundColor: colors.pearl, marginVertical: spacing.xs },
});
