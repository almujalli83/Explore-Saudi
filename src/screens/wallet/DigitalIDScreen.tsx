import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { colors, gradients, typography, spacing, borderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function DigitalIDScreen() {
  const navigation = useNavigation();
  const user = useAuthStore((s) => s.user);

  return (
    <View style={styles.container}>
      <Header title="Digital ID" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ID Card */}
        <LinearGradient colors={[...gradients.nightGradient]} style={styles.idCard}>
          <View style={styles.idHeader}>
            <Text style={styles.idHeaderText}>{'\uD83C\uDDF8\uD83C\uDDE6'} Kingdom of Saudi Arabia</Text>
            <Text style={styles.idType}>Tourist Digital ID</Text>
          </View>
          <View style={styles.idBody}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) ?? 'T'}</Text>
            </View>
            <View style={styles.idInfo}>
              <Text style={styles.idName}>{user?.name ?? 'Guest'}</Text>
              <Text style={styles.idNationality}>{user?.nationality ?? 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.idFields}>
            <View style={styles.idField}>
              <Text style={styles.fieldLabel}>Passport No.</Text>
              <Text style={styles.fieldValue}>{user?.passportNumber ?? 'N/A'}</Text>
            </View>
            <View style={styles.idField}>
              <Text style={styles.fieldLabel}>Visa Type</Text>
              <Text style={styles.fieldValue}>{user?.visaType ?? 'N/A'}</Text>
            </View>
            <View style={styles.idField}>
              <Text style={styles.fieldLabel}>Valid Until</Text>
              <Text style={styles.fieldValue}>2026-12-31</Text>
            </View>
          </View>
          <View style={styles.qrWrap}>
            <View style={styles.qrPlaceholder}>
              <Text style={styles.qrText}>QR</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Info Cards */}
        <Card variant="outlined" style={styles.infoCard}>
          <Text style={styles.infoIcon}>{'\u2139\uFE0F'}</Text>
          <Text style={styles.infoText}>
            Your Digital ID can be used for verification at hotels, attractions, and government services throughout Saudi Arabia.
          </Text>
        </Card>

        <Card variant="outlined" style={styles.infoCard}>
          <Text style={styles.infoIcon}>{'\uD83D\uDD12'}</Text>
          <Text style={styles.infoText}>
            This digital ID is secured with end-to-end encryption and stored locally on your device.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.md },
  idCard: { borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  idHeader: { alignItems: 'center', marginBottom: spacing.lg },
  idHeaderText: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.white },
  idType: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  idBody: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  avatarWrap: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.sand,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: colors.white },
  idInfo: { marginLeft: spacing.md },
  idName: { fontSize: typography.sizes.xl, fontWeight: '700', color: colors.white },
  idNationality: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  idFields: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  idField: {},
  fieldLabel: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.5)' },
  fieldValue: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.white, marginTop: 2 },
  qrWrap: { alignItems: 'center' },
  qrPlaceholder: {
    width: 100, height: 100, borderRadius: borderRadius.md,
    backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center',
  },
  qrText: { fontSize: typography.sizes.xl, fontWeight: '700', color: colors.charcoal },
  infoCard: { flexDirection: 'row', padding: spacing.md, marginBottom: spacing.sm, alignItems: 'center' },
  infoIcon: { fontSize: 22, marginRight: spacing.sm },
  infoText: { flex: 1, fontSize: typography.sizes.sm, color: colors.slate, lineHeight: 20 },
});
