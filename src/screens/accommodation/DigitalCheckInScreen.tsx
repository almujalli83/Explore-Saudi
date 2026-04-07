import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

type CheckInStep = 'verifying' | 'preparing' | 'ready';

const STEPS: { key: CheckInStep; icon: string; label: string; sub: string }[] = [
  { key: 'verifying', icon: '🛂', label: 'Verifying Identity', sub: 'Checking your passport & booking...' },
  { key: 'preparing', icon: '🏨', label: 'Preparing Your Room', sub: 'Your room is being prepared...' },
  { key: 'ready',    icon: '🗝️', label: 'Key Ready!',          sub: 'Your digital room key is ready.' },
];

// Simple QR-code placeholder (5×5 grid of small squares)
function QRPlaceholder() {
  const pattern = [
    [1,1,1,0,1],[1,0,1,0,0],[1,1,1,1,1],[0,0,0,0,1],[1,1,0,1,1],
  ];
  return (
    <View style={qr.wrap}>
      {pattern.map((row, r) => (
        <View key={r} style={qr.row}>
          {row.map((cell, c) => (
            <View key={c} style={[qr.cell, cell ? qr.cellFilled : qr.cellEmpty]} />
          ))}
        </View>
      ))}
    </View>
  );
}
const qr = StyleSheet.create({
  wrap: { padding: 12, backgroundColor: colors.white, borderRadius: borderRadius.md, alignSelf: 'center' },
  row: { flexDirection: 'row' },
  cell: { width: 14, height: 14, margin: 2, borderRadius: 2 },
  cellFilled: { backgroundColor: colors.primary },
  cellEmpty: { backgroundColor: colors.pearl },
});

export default function DigitalCheckInScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const user = useAuthStore((s) => s.user);

  const { hotelName = 'Hotel', roomNumber = '1204', checkIn = '2026-04-10', checkOut = '2026-04-14' } = route.params ?? {};

  const [currentStep, setCurrentStep] = useState<CheckInStep>('verifying');
  const progress = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.85)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Step 1 → verifying (1.5 s)
    Animated.timing(progress, { toValue: 0.45, duration: 1500, useNativeDriver: false }).start(() => {
      setCurrentStep('preparing');
      // Step 2 → preparing (1.5 s)
      Animated.timing(progress, { toValue: 0.85, duration: 1500, useNativeDriver: false }).start(() => {
        setCurrentStep('ready');
        Animated.timing(progress, { toValue: 1, duration: 400, useNativeDriver: false }).start();
        // Reveal card
        Animated.parallel([
          Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
          Animated.timing(cardOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        ]).start();
      });
    });
  }, []);

  const stepData = STEPS.find((s) => s.key === currentStep)!;
  const isReady = currentStep === 'ready';

  const progressWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Digital Check-In</Text>
      <Text style={styles.screenSub}>{hotelName}</Text>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      {/* Step icons row */}
      <View style={styles.stepIcons}>
        {STEPS.map((s, i) => {
          const done = STEPS.findIndex((x) => x.key === currentStep) > i;
          const active = s.key === currentStep;
          return (
            <React.Fragment key={s.key}>
              <View style={[styles.stepIcon, active && styles.stepIconActive, done && styles.stepIconDone]}>
                <Text style={styles.stepIconEmoji}>{done ? '✓' : s.icon}</Text>
              </View>
              {i < STEPS.length - 1 && <View style={[styles.stepConnector, done && styles.stepConnectorDone]} />}
            </React.Fragment>
          );
        })}
      </View>

      {/* Current step label */}
      <View style={styles.stepLabelWrap}>
        <Text style={styles.stepLabelText}>{stepData.label}</Text>
        <Text style={styles.stepLabelSub}>{stepData.sub}</Text>
      </View>

      {/* Digital Key Card — shown only when ready */}
      {isReady && (
        <Animated.View style={[styles.cardWrap, { transform: [{ scale: cardScale }], opacity: cardOpacity }]}>
          <LinearGradient colors={['#0f4522', '#1b6b3a', '#2d8f55']} style={styles.keyCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            {/* Deco circles */}
            <View style={styles.circle1} />
            <View style={styles.circle2} />

            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardHotelName}>{hotelName}</Text>
                <Text style={styles.cardRoomLabel}>Room {roomNumber}</Text>
              </View>
              <Text style={styles.cardKeyIcon}>🗝️</Text>
            </View>

            <QRPlaceholder />

            <View style={styles.cardFooter}>
              <View style={styles.cardDates}>
                <View>
                  <Text style={styles.cardDateLabel}>Check-In</Text>
                  <Text style={styles.cardDateValue}>{checkIn}</Text>
                </View>
                <View style={styles.cardDateDivider} />
                <View>
                  <Text style={styles.cardDateLabel}>Check-Out</Text>
                  <Text style={styles.cardDateValue}>{checkOut}</Text>
                </View>
              </View>
              <Text style={styles.cardGuest}>👤 {user?.name ?? 'Guest'}</Text>
            </View>
          </LinearGradient>

          {/* Add to Wallet button */}
          <TouchableOpacity
            style={styles.walletBtn}
            onPress={() => Alert.alert('Added!', 'Digital key added to your Explore Saudi Wallet.')}
          >
            <LinearGradient colors={['#c8a84b', '#a07830']} style={styles.walletBtnGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.walletBtnText}>💳  Add to Wallet</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center' },
  backBtn: { position: 'absolute', top: 55, left: spacing.md, zIndex: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: colors.charcoal, lineHeight: 34 },
  screenTitle: { marginTop: 60, fontSize: typography.sizes.xl, fontWeight: '800', color: colors.charcoal },
  screenSub: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 4, marginBottom: spacing.lg },

  // Progress bar
  progressTrack: { width: '80%', height: 6, backgroundColor: colors.pearl, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },

  // Step icons
  stepIcons: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg },
  stepIcon: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.pearl,
    alignItems: 'center', justifyContent: 'center',
  },
  stepIconActive: { backgroundColor: colors.primary },
  stepIconDone: { backgroundColor: colors.success },
  stepIconEmoji: { fontSize: 22 },
  stepConnector: { width: 32, height: 3, backgroundColor: colors.pearl },
  stepConnectorDone: { backgroundColor: colors.success },

  // Step label
  stepLabelWrap: { alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.lg, paddingHorizontal: spacing.xl },
  stepLabelText: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal, textAlign: 'center' },
  stepLabelSub: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 4, textAlign: 'center' },

  // Key card
  cardWrap: { width: '90%', alignItems: 'stretch' },
  keyCard: {
    borderRadius: borderRadius.xl, padding: spacing.lg,
    overflow: 'hidden', position: 'relative',
    ...shadows.large,
  },
  circle1: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', top: -80, right: -40 },
  circle2: { position: 'absolute', width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(200,168,75,0.1)', bottom: -50, left: '30%' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
  cardHotelName: { fontSize: typography.sizes.lg, fontWeight: '800', color: colors.white },
  cardRoomLabel: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  cardKeyIcon: { fontSize: 32 },
  cardFooter: { marginTop: spacing.lg },
  cardDates: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  cardDateLabel: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.6)' },
  cardDateValue: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.white, marginTop: 2 },
  cardDateDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: spacing.lg },
  cardGuest: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.8)' },

  // Wallet button
  walletBtn: { marginTop: spacing.md, borderRadius: borderRadius.lg, overflow: 'hidden' },
  walletBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  walletBtnText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white, letterSpacing: 0.4 },
});
