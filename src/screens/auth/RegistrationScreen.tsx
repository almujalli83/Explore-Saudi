import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

type Step = 'scan' | 'review';

interface OCRData {
  name: string;
  passportNumber: string;
  nationality: string;
  expiryDate: string;
}

export default function RegistrationScreen() {
  const navigation = useNavigation<any>();
  const register = useAuthStore((s) => s.register);

  const [step, setStep] = useState<Step>('scan');
  const [scanning, setScanning] = useState(false);
  const [ocrData, setOcrData] = useState<OCRData | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('');

  const simulateOCR = () => {
    setScanning(true);
    setTimeout(() => {
      const mock: OCRData = {
        name: 'Sarah Al-Mansouri',
        passportNumber: 'P9876543',
        nationality: 'Saudi Arabia',
        expiryDate: '2030-06-15',
      };
      setOcrData(mock);
      setName(mock.name);
      setPassportNumber(mock.passportNumber);
      setNationality(mock.nationality);
      setScanning(false);
      setStep('review');
    }, 2000);
  };

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }
    register(name.trim(), email.trim(), passportNumber, nationality);
    Alert.alert('Welcome!', 'Your account has been created successfully.', [
      { text: 'Get Started', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.stepRow}>
        <View style={[styles.stepDot, step === 'scan' ? styles.stepActive : styles.stepDone]}>
          <Text style={styles.stepNum}>1</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step === 'review' ? styles.stepActive : styles.stepInactive]}>
          <Text style={styles.stepNum}>2</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.stepLabel}>
          {step === 'scan' ? 'Scan Passport' : 'Review Details'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {step === 'scan' ? (
          <View style={styles.scanSection}>
            <Text style={styles.sectionTitle}>Passport OCR Scan</Text>
            <Text style={styles.sectionSub}>
              Hold your passport up to the camera. Our OCR technology will automatically read your details.
            </Text>

            {/* Camera placeholder */}
            <View style={styles.cameraBox}>
              <View style={styles.cameraCornerTL} />
              <View style={styles.cameraCornerTR} />
              <View style={styles.cameraCornerBL} />
              <View style={styles.cameraCornerBR} />
              {scanning ? (
                <View style={styles.scanningOverlay}>
                  <ActivityIndicator size="large" color={colors.sand} />
                  <Text style={styles.scanningText}>Reading passport…</Text>
                </View>
              ) : (
                <View style={styles.cameraPlaceholder}>
                  <Text style={styles.cameraEmoji}>🛂</Text>
                  <Text style={styles.cameraHint}>Position passport within frame</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[styles.btn, scanning && styles.btnDisabled]}
              onPress={simulateOCR}
              disabled={scanning}
            >
              <Text style={styles.btnText}>
                {scanning ? 'Scanning…' : '📷  Scan Passport'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipBtn} onPress={() => setStep('review')}>
              <Text style={styles.skipText}>Skip and enter manually</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.reviewSection}>
            <Text style={styles.sectionTitle}>Review Your Details</Text>
            <Text style={styles.sectionSub}>
              {ocrData
                ? 'Passport data has been auto-filled. Please review and complete your registration.'
                : 'Enter your details to create your account.'}
            </Text>

            {ocrData && (
              <View style={styles.ocrBadge}>
                <Text style={styles.ocrBadgeText}>✅  Passport scanned successfully</Text>
              </View>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="As it appears on your passport"
                placeholderTextColor={colors.slate}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email Address *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                placeholderTextColor={colors.slate}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password *</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Minimum 8 characters"
                placeholderTextColor={colors.slate}
                secureTextEntry
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Passport Number</Text>
              <TextInput
                style={styles.input}
                value={passportNumber}
                onChangeText={setPassportNumber}
                placeholder="e.g. P1234567"
                placeholderTextColor={colors.slate}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Nationality</Text>
              <TextInput
                style={styles.input}
                value={nationality}
                onChangeText={setNationality}
                placeholder="e.g. Saudi Arabia"
                placeholderTextColor={colors.slate}
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipBtn}
              onPress={() => setStep('scan')}
            >
              <Text style={styles.skipText}>← Back to passport scan</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: colors.charcoal, lineHeight: 34 },
  headerTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal },
  stepRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
  },
  stepDot: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  stepActive: { backgroundColor: colors.sand },
  stepDone: { backgroundColor: colors.success ?? '#2fba89' },
  stepInactive: { backgroundColor: colors.pearl },
  stepNum: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.white },
  stepLine: { width: 40, height: 2, backgroundColor: colors.pearl, marginHorizontal: spacing.xs },
  stepLabel: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.slate },
  scroll: { paddingHorizontal: spacing.lg },
  scanSection: {},
  reviewSection: {},
  sectionTitle: {
    fontSize: typography.sizes.xl, fontWeight: '700', color: colors.charcoal,
    marginTop: spacing.lg, marginBottom: spacing.xs,
  },
  sectionSub: { fontSize: typography.sizes.sm, color: colors.slate, lineHeight: 20, marginBottom: spacing.lg },
  cameraBox: {
    height: 220, borderRadius: borderRadius.lg,
    backgroundColor: '#0a0a0a', overflow: 'hidden',
    marginBottom: spacing.lg, position: 'relative',
  },
  cameraCornerTL: {
    position: 'absolute', top: 16, left: 16,
    width: 32, height: 32,
    borderTopWidth: 3, borderLeftWidth: 3, borderColor: colors.sand,
    borderTopLeftRadius: 4,
  },
  cameraCornerTR: {
    position: 'absolute', top: 16, right: 16,
    width: 32, height: 32,
    borderTopWidth: 3, borderRightWidth: 3, borderColor: colors.sand,
    borderTopRightRadius: 4,
  },
  cameraCornerBL: {
    position: 'absolute', bottom: 16, left: 16,
    width: 32, height: 32,
    borderBottomWidth: 3, borderLeftWidth: 3, borderColor: colors.sand,
    borderBottomLeftRadius: 4,
  },
  cameraCornerBR: {
    position: 'absolute', bottom: 16, right: 16,
    width: 32, height: 32,
    borderBottomWidth: 3, borderRightWidth: 3, borderColor: colors.sand,
    borderBottomRightRadius: 4,
  },
  cameraPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cameraEmoji: { fontSize: 56, marginBottom: spacing.sm },
  cameraHint: { fontSize: typography.sizes.sm, color: '#888' },
  scanningOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  scanningText: { fontSize: typography.sizes.sm, color: colors.sand },
  ocrBadge: {
    backgroundColor: '#e6f9f3', borderRadius: borderRadius.md,
    padding: spacing.sm, marginBottom: spacing.lg,
  },
  ocrBadgeText: { fontSize: typography.sizes.sm, color: '#1a7a5a', fontWeight: '600' },
  fieldGroup: { marginBottom: spacing.md },
  fieldLabel: {
    fontSize: typography.sizes.sm, fontWeight: '600',
    color: colors.charcoal, marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1, borderColor: colors.pearl, borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    fontSize: typography.sizes.md, color: colors.charcoal,
    backgroundColor: colors.white,
  },
  btn: {
    backgroundColor: colors.sand, borderRadius: borderRadius.lg,
    paddingVertical: 14, alignItems: 'center', marginTop: spacing.sm,
    ...shadows.md,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white },
  skipBtn: { alignItems: 'center', paddingVertical: spacing.md },
  skipText: { fontSize: typography.sizes.sm, color: colors.slate },
});
