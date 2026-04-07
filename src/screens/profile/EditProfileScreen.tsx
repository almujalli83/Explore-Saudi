import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [nationality, setNationality] = useState(user?.nationality ?? '');
  const [passportNumber, setPassportNumber] = useState(user?.passportNumber ?? '');
  const [visaType, setVisaType] = useState(user?.visaType ?? '');

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Required', 'Name and email cannot be empty.');
      return;
    }
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      nationality: nationality.trim(),
      passportNumber: passportNumber.trim(),
      visaType: visaType.trim(),
    });
    Alert.alert('Saved', 'Your profile has been updated.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.charAt(0) || '?'}</Text>
          </View>
          <TouchableOpacity style={styles.changePhotoBtn}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Fields */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>

          <Field label="Full Name *" value={name} onChangeText={setName} placeholder="Your full name" />
          <Field
            label="Email Address *"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Nationality"
            value={nationality}
            onChangeText={setNationality}
            placeholder="e.g. Saudi Arabia"
          />
          <Field
            label="Passport Number"
            value={passportNumber}
            onChangeText={setPassportNumber}
            placeholder="e.g. P1234567"
            autoCapitalize="characters"
          />
          <Field
            label="Visa Type"
            value={visaType}
            onChangeText={setVisaType}
            placeholder="e.g. Tourist Visa"
            isLast
          />
        </View>

        {/* Member since — read only */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Info</Text>
          <View style={styles.readonlyRow}>
            <Text style={styles.readonlyLabel}>Member Since</Text>
            <Text style={styles.readonlyValue}>{user?.memberSince ?? '—'}</Text>
          </View>
          <View style={[styles.readonlyRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.readonlyLabel}>User ID</Text>
            <Text style={styles.readonlyValue}>{user?.id ?? '—'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveFullBtn} onPress={handleSave}>
          <Text style={styles.saveFullText}>Save Changes</Text>
        </TouchableOpacity>

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
  isLast?: boolean;
}

function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', autoCapitalize = 'sentences', isLast }: FieldProps) {
  return (
    <View style={[fieldStyles.wrap, isLast && { borderBottomWidth: 0 }]}>
      <Text style={fieldStyles.label}>{label}</Text>
      <TextInput
        style={fieldStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.slate}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrap: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.pearl,
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: '600',
    color: colors.slate,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  input: {
    fontSize: typography.sizes.md,
    color: colors.charcoal,
    paddingVertical: 4,
  },
});

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
  saveBtn: { paddingHorizontal: spacing.sm, paddingVertical: 6 },
  saveText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.sand },
  scroll: { padding: spacing.md },
  avatarSection: { alignItems: 'center', paddingVertical: spacing.xl },
  avatar: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: colors.sand,
    alignItems: 'center', justifyContent: 'center', ...shadows.md,
  },
  avatarText: { fontSize: 40, fontWeight: '700', color: colors.white },
  changePhotoBtn: { marginTop: spacing.sm },
  changePhotoText: { fontSize: typography.sizes.sm, color: colors.sand, fontWeight: '600' },
  card: {
    backgroundColor: colors.white, borderRadius: borderRadius.lg,
    padding: spacing.md, marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.sizes.sm, fontWeight: '700', color: colors.charcoal,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.sm,
  },
  readonlyRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.pearl,
  },
  readonlyLabel: { fontSize: typography.sizes.sm, color: colors.slate },
  readonlyValue: { fontSize: typography.sizes.sm, color: colors.charcoal, fontWeight: '500' },
  saveFullBtn: {
    backgroundColor: colors.sand, borderRadius: borderRadius.lg,
    paddingVertical: 14, alignItems: 'center', marginTop: spacing.sm,
    ...shadows.md,
  },
  saveFullText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white },
});
