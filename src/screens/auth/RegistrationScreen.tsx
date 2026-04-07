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
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

type Step = 'upload' | 'review';

interface OCRData {
  name: string;
  passportNumber: string;
  nationality: string;
  expiryDate: string;
}

export default function RegistrationScreen() {
  const navigation = useNavigation<any>();
  const register = useAuthStore((s) => s.register);

  const [step, setStep] = useState<Step>('upload');
  const [scanning, setScanning] = useState(false);
  const [passportImageUri, setPassportImageUri] = useState<string | null>(null);
  const [ocrDone, setOcrDone] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('');

  const runOCR = (imageUri: string) => {
    setScanning(true);
    // Simulate OCR processing on the uploaded passport image
    setTimeout(() => {
      const mock: OCRData = {
        name: 'Sarah Al-Mansouri',
        passportNumber: 'P9876543',
        nationality: 'Saudi Arabia',
        expiryDate: '2030-06-15',
      };
      setName(mock.name);
      setPassportNumber(mock.passportNumber);
      setNationality(mock.nationality);
      setScanning(false);
      setOcrDone(true);
      setStep('review');
    }, 2200);
  };

  const pickPassportImage = () => {
    if (Platform.OS === 'web') {
      // Web: use native file picker via hidden <input type="file">
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
          const uri = URL.createObjectURL(file);
          setPassportImageUri(uri);
          runOCR(uri);
        }
      };
      input.click();
    } else {
      // Mobile: simulate camera capture
      setPassportImageUri('mock://camera');
      runOCR('mock://camera');
    }
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
        <View style={[styles.stepDot, styles.stepActive]}>
          <Text style={styles.stepNum}>{step === 'upload' ? '1' : '✓'}</Text>
        </View>
        <View style={[styles.stepLine, ocrDone && styles.stepLineDone]} />
        <View style={[styles.stepDot, step === 'review' ? styles.stepActive : styles.stepInactive]}>
          <Text style={styles.stepNum}>2</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.stepLabel}>
          {step === 'upload' ? 'Upload Passport' : 'Review & Confirm'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {step === 'upload' ? (
          <View>
            <Text style={styles.sectionTitle}>Passport Upload & OCR</Text>
            <Text style={styles.sectionSub}>
              Upload a photo of your passport. Our OCR engine will automatically read and fill in your details.
            </Text>

            {/* Upload / Preview area */}
            {passportImageUri && passportImageUri !== 'mock://camera' ? (
              <View style={styles.previewBox}>
                <Image source={{ uri: passportImageUri }} style={styles.previewImage} resizeMode="cover" />
                {scanning && (
                  <View style={styles.scanOverlay}>
                    <ActivityIndicator size="large" color={colors.gold} />
                    <Text style={styles.scanText}>Reading passport data…</Text>
                    <View style={styles.scanLine} />
                  </View>
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.uploadBox, scanning && styles.uploadBoxScanning]}
                onPress={!scanning ? pickPassportImage : undefined}
                activeOpacity={0.8}
              >
                {scanning ? (
                  <View style={styles.scanningContent}>
                    <ActivityIndicator size="large" color={colors.gold} />
                    <Text style={styles.scanText}>Processing passport…</Text>
                  </View>
                ) : (
                  <View style={styles.uploadContent}>
                    <Text style={styles.uploadEmoji}>🛂</Text>
                    <Text style={styles.uploadTitle}>
                      {Platform.OS === 'web' ? 'Click to Upload Passport' : 'Tap to Scan Passport'}
                    </Text>
                    <Text style={styles.uploadSub}>
                      {Platform.OS === 'web'
                        ? 'JPG, PNG or PDF • Max 10MB'
                        : 'Hold the passport in good lighting'}
                    </Text>
                    <View style={styles.uploadBtn}>
                      <Text style={styles.uploadBtnText}>
                        {Platform.OS === 'web' ? '📎  Choose File' : '📷  Open Camera'}
                      </Text>
                    </View>
                  </View>
                )}
                {/* Corner frames */}
                <View style={styles.cornerTL} />
                <View style={styles.cornerTR} />
                <View style={styles.cornerBL} />
                <View style={styles.cornerBR} />
              </TouchableOpacity>
            )}

            {/* OCR features list */}
            <View style={styles.featureList}>
              {['Instant data extraction', 'Name & nationality auto-fill', 'Passport number detection', 'Expiry date recognition'].map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Text style={styles.featureTick}>✅</Text>
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.skipBtn} onPress={() => setStep('review')}>
              <Text style={styles.skipText}>Skip — enter details manually</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Review Your Details</Text>
            <Text style={styles.sectionSub}>
              {ocrDone
                ? 'Passport scanned successfully. Review the auto-filled data below before creating your account.'
                : 'Enter your details to complete registration.'}
            </Text>

            {ocrDone && (
              <View style={styles.ocrSuccessBanner}>
                <Text style={styles.ocrSuccessIcon}>🎉</Text>
                <View>
                  <Text style={styles.ocrSuccessTitle}>OCR Complete</Text>
                  <Text style={styles.ocrSuccessSub}>Passport data extracted successfully</Text>
                </View>
              </View>
            )}

            <View style={styles.formCard}>
              <Field label="Full Name *" value={name} onChangeText={setName} placeholder="As on passport" />
              <Field label="Email Address *" value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" autoCapitalize="none" />
              <Field label="Password *" value={password} onChangeText={setPassword} placeholder="Min. 8 characters" secureTextEntry />
              <Field label="Passport Number" value={passportNumber} onChangeText={setPassportNumber} placeholder="e.g. P9876543" autoCapitalize="characters" />
              <Field label="Nationality" value={nationality} onChangeText={setNationality} placeholder="e.g. Saudi Arabia" isLast />
            </View>

            <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
              <Text style={styles.registerBtnText}>Create Account →</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipBtn} onPress={() => { setStep('upload'); setOcrDone(false); }}>
              <Text style={styles.skipText}>← Back to passport upload</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'characters' | 'sentences';
  secureTextEntry?: boolean;
  isLast?: boolean;
}

function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', autoCapitalize = 'sentences', secureTextEntry, isLast }: FieldProps) {
  return (
    <View style={[fStyles.wrap, isLast && { borderBottomWidth: 0 }]}>
      <Text style={fStyles.label}>{label}</Text>
      <TextInput
        style={fStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.slate}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const fStyles = StyleSheet.create({
  wrap: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.pearl },
  label: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.slate, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  input: { fontSize: typography.sizes.md, color: colors.charcoal, paddingVertical: 4 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.pearl,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: colors.charcoal, lineHeight: 34 },
  headerTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal },
  stepRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, backgroundColor: colors.cream },
  stepDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stepActive: { backgroundColor: colors.sand },
  stepInactive: { backgroundColor: colors.pearl },
  stepNum: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.white },
  stepLine: { width: 40, height: 2, backgroundColor: colors.pearl, marginHorizontal: spacing.xs },
  stepLineDone: { backgroundColor: colors.sand },
  stepLabel: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.slate },
  scroll: { padding: spacing.lg },
  sectionTitle: { fontSize: typography.sizes.xl, fontWeight: '700', color: colors.charcoal, marginBottom: spacing.xs },
  sectionSub: { fontSize: typography.sizes.sm, color: colors.slate, lineHeight: 20, marginBottom: spacing.lg },

  // Upload box
  uploadBox: {
    height: 240, borderRadius: borderRadius.lg, backgroundColor: colors.cream,
    borderWidth: 2, borderColor: colors.pearl, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg,
    position: 'relative', overflow: 'hidden',
  },
  uploadBoxScanning: { borderColor: colors.gold },
  uploadContent: { alignItems: 'center', paddingHorizontal: spacing.lg },
  uploadEmoji: { fontSize: 52, marginBottom: spacing.sm },
  uploadTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal, textAlign: 'center', marginBottom: spacing.xs },
  uploadSub: { fontSize: typography.sizes.sm, color: colors.slate, textAlign: 'center', marginBottom: spacing.md },
  uploadBtn: {
    backgroundColor: colors.sand, borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
  },
  uploadBtnText: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.white },
  scanningContent: { alignItems: 'center', gap: spacing.md },
  scanText: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.sand },

  // Preview
  previewBox: {
    height: 220, borderRadius: borderRadius.lg, overflow: 'hidden',
    marginBottom: spacing.lg, position: 'relative',
  },
  previewImage: { width: '100%', height: '100%' },
  scanOverlay: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15,69,34,0.7)',
    alignItems: 'center', justifyContent: 'center', gap: spacing.md,
  },
  scanLine: {
    position: 'absolute', left: 20, right: 20, height: 2,
    backgroundColor: colors.gold, top: '50%',
  },

  // Corner frames
  cornerTL: { position: 'absolute', top: 12, left: 12, width: 28, height: 28, borderTopWidth: 3, borderLeftWidth: 3, borderColor: colors.sand, borderTopLeftRadius: 4 },
  cornerTR: { position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderTopWidth: 3, borderRightWidth: 3, borderColor: colors.sand, borderTopRightRadius: 4 },
  cornerBL: { position: 'absolute', bottom: 12, left: 12, width: 28, height: 28, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: colors.sand, borderBottomLeftRadius: 4 },
  cornerBR: { position: 'absolute', bottom: 12, right: 12, width: 28, height: 28, borderBottomWidth: 3, borderRightWidth: 3, borderColor: colors.sand, borderBottomRightRadius: 4 },

  // Feature list
  featureList: { marginBottom: spacing.lg },
  featureRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs },
  featureTick: { fontSize: 16, marginRight: spacing.sm },
  featureText: { fontSize: typography.sizes.sm, color: colors.charcoal },

  // OCR success
  ocrSuccessBanner: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: '#e8f5ee', borderRadius: borderRadius.md,
    padding: spacing.md, marginBottom: spacing.lg,
    borderLeftWidth: 4, borderLeftColor: colors.sand,
  },
  ocrSuccessIcon: { fontSize: 28 },
  ocrSuccessTitle: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.charcoal },
  ocrSuccessSub: { fontSize: typography.sizes.xs, color: colors.slate },

  formCard: {
    backgroundColor: colors.cream, borderRadius: borderRadius.lg,
    padding: spacing.md, marginBottom: spacing.lg,
    borderWidth: 1, borderColor: colors.pearl,
  },
  registerBtn: {
    backgroundColor: colors.sand, borderRadius: borderRadius.lg,
    paddingVertical: 15, alignItems: 'center', marginBottom: spacing.sm,
    ...shadows.md,
  },
  registerBtnText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  skipBtn: { alignItems: 'center', paddingVertical: spacing.md },
  skipText: { fontSize: typography.sizes.sm, color: colors.slate },
});
