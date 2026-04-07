import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

interface CheckItem {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  done: boolean;
}

const INITIAL_CHECKS: CheckItem[] = [
  { id: 'id', label: 'Identity Verified', sublabel: 'Passport & visa confirmed', icon: '🛂', done: false },
  { id: 'payment', label: 'Payment Confirmed', sublabel: 'Room deposit processed', icon: '💳', done: false },
  { id: 'room', label: 'Room Ready', sublabel: 'Housekeeping completed', icon: '🛏️', done: false },
];

export default function DigitalCheckInScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const user = useAuthStore((s) => s.user);

  const [checks, setChecks] = useState<CheckItem[]>(INITIAL_CHECKS);
  const [checkedIn, setCheckedIn] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const hotelName = route.params?.hotelName ?? 'Raffles Makkah Palace';
  const roomNumber = route.params?.roomNumber ?? '1204';
  const checkIn = route.params?.checkIn ?? '2026-04-10';
  const checkOut = route.params?.checkOut ?? '2026-04-14';

  useEffect(() => {
    // Simulate progressive check completion
    let delay = 600;
    INITIAL_CHECKS.forEach((_, idx) => {
      setTimeout(() => {
        setChecks((prev) =>
          prev.map((c, i) => (i === idx ? { ...c, done: true } : c))
        );
      }, delay);
      delay += 800;
    });
  }, []);

  const allDone = checks.every((c) => c.done);

  const handleCheckIn = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCheckedIn(true);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Digital Check-In</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hotel info */}
        <View style={styles.hotelCard}>
          <Text style={styles.hotelEmoji}>🏨</Text>
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>{hotelName}</Text>
            <Text style={styles.hotelSub}>Room {roomNumber}</Text>
          </View>
        </View>

        {/* Date row */}
        <View style={styles.dateRow}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>CHECK-IN</Text>
            <Text style={styles.dateVal}>{checkIn}</Text>
          </View>
          <Text style={styles.dateSep}>→</Text>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>CHECK-OUT</Text>
            <Text style={styles.dateVal}>{checkOut}</Text>
          </View>
        </View>

        {/* Verification checklist */}
        <Text style={styles.sectionTitle}>Verification Checklist</Text>
        <View style={styles.checkCard}>
          {checks.map((item) => (
            <View key={item.id} style={styles.checkRow}>
              <View style={[styles.checkIcon, item.done && styles.checkIconDone]}>
                <Text style={styles.checkIconText}>{item.done ? '✓' : item.icon}</Text>
              </View>
              <View style={styles.checkText}>
                <Text style={[styles.checkLabel, item.done && styles.checkLabelDone]}>
                  {item.label}
                </Text>
                <Text style={styles.checkSub}>{item.sublabel}</Text>
              </View>
              {item.done && <Text style={styles.checkTick}>✅</Text>}
            </View>
          ))}
        </View>

        {/* Digital key card (shown after check-in) */}
        {checkedIn ? (
          <Animated.View style={[styles.keyCard, { opacity: fadeAnim }]}>
            <View style={styles.keyCardHeader}>
              <Text style={styles.keyCardTitle}>🗝️  Digital Room Key</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ACTIVE</Text>
              </View>
            </View>
            <Text style={styles.keyHotelName}>{hotelName}</Text>
            <Text style={styles.keyRoom}>Room {roomNumber}</Text>

            {/* QR placeholder */}
            <View style={styles.qrBox}>
              <Text style={styles.qrEmoji}>⬛⬜⬛</Text>
              <Text style={styles.qrEmoji}>⬜⬛⬜</Text>
              <Text style={styles.qrEmoji}>⬛⬜⬛</Text>
              <Text style={styles.qrLabel}>Tap to open door</Text>
            </View>

            <View style={styles.keyDates}>
              <Text style={styles.keyDateText}>Valid: {checkIn} — {checkOut}</Text>
              <Text style={styles.keyGuestText}>👤 {user?.name ?? 'Guest'}</Text>
            </View>
          </Animated.View>
        ) : (
          <TouchableOpacity
            style={[styles.checkInBtn, (!allDone || processing) && styles.checkInBtnDisabled]}
            onPress={handleCheckIn}
            disabled={!allDone || processing}
          >
            <Text style={styles.checkInBtnText}>
              {processing ? 'Processing…' : allDone ? '✅  Check In Now' : '⏳  Verifying…'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.pearl },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.white,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: colors.charcoal, lineHeight: 34 },
  headerTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal },
  scroll: { padding: spacing.md },
  hotelCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white, borderRadius: borderRadius.lg,
    padding: spacing.md, marginBottom: spacing.md, ...shadows.sm,
  },
  hotelEmoji: { fontSize: 40, marginRight: spacing.md },
  hotelInfo: { flex: 1 },
  hotelName: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal },
  hotelSub: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 2 },
  dateRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white, borderRadius: borderRadius.lg,
    padding: spacing.md, marginBottom: spacing.lg, ...shadows.sm,
  },
  dateBox: { flex: 1, alignItems: 'center' },
  dateLabel: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.slate, letterSpacing: 0.5 },
  dateVal: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.charcoal, marginTop: 4 },
  dateSep: { fontSize: 20, color: colors.slate, marginHorizontal: spacing.sm },
  sectionTitle: {
    fontSize: typography.sizes.md, fontWeight: '700', color: colors.charcoal,
    marginBottom: spacing.sm,
  },
  checkCard: {
    backgroundColor: colors.white, borderRadius: borderRadius.lg,
    padding: spacing.md, marginBottom: spacing.lg, ...shadows.sm,
  },
  checkRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.pearl,
  },
  checkIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.pearl, alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkIconDone: { backgroundColor: '#e6f9f3' },
  checkIconText: { fontSize: 20 },
  checkText: { flex: 1 },
  checkLabel: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.slate },
  checkLabelDone: { color: colors.charcoal },
  checkSub: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 2 },
  checkTick: { fontSize: 20 },
  keyCard: {
    backgroundColor: colors.charcoal, borderRadius: borderRadius.xl ?? 20,
    padding: spacing.lg, marginBottom: spacing.lg, ...shadows.lg,
  },
  keyCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  keyCardTitle: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white },
  activeBadge: {
    backgroundColor: '#2fba89', borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm, paddingVertical: 2,
  },
  activeBadgeText: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.white },
  keyHotelName: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.white, marginBottom: 4 },
  keyRoom: { fontSize: typography.sizes.xxl ?? 24, fontWeight: '800', color: colors.sand, marginBottom: spacing.lg },
  qrBox: {
    backgroundColor: colors.white, borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center', marginBottom: spacing.md,
  },
  qrEmoji: { fontSize: 24, letterSpacing: 4 },
  qrLabel: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: spacing.sm, fontWeight: '600' },
  keyDates: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  keyDateText: { fontSize: typography.sizes.xs, color: '#aaa' },
  keyGuestText: { fontSize: typography.sizes.xs, color: '#aaa' },
  checkInBtn: {
    backgroundColor: colors.sand, borderRadius: borderRadius.lg,
    paddingVertical: 16, alignItems: 'center', ...shadows.md,
  },
  checkInBtnDisabled: { opacity: 0.5 },
  checkInBtnText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white },
});
