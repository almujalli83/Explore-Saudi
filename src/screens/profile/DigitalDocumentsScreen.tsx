import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

type Tab = 'passport' | 'visa' | 'insurance';

// Minimal QR-code placeholder
function QRCode() {
  const pattern = [[1,1,1,0,1],[1,0,1,0,0],[1,1,1,1,1],[0,0,0,0,1],[1,1,0,1,1]];
  return (
    <View style={qr.wrap}>
      {pattern.map((row, r) => (
        <View key={r} style={qr.row}>
          {row.map((cell, c) => (
            <View key={c} style={[qr.cell, cell ? qr.filled : qr.empty]} />
          ))}
        </View>
      ))}
    </View>
  );
}
const qr = StyleSheet.create({
  wrap: { padding: 10, backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: borderRadius.md, alignSelf: 'center', marginTop: spacing.md },
  row: { flexDirection: 'row' },
  cell: { width: 12, height: 12, margin: 1.5, borderRadius: 2 },
  filled: { backgroundColor: colors.white },
  empty: { backgroundColor: 'rgba(255,255,255,0.15)' },
});

export default function DigitalDocumentsScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const [activeTab, setActiveTab] = useState<Tab>('passport');

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: 'passport', label: 'Passport', icon: '🛂' },
    { key: 'visa',     label: 'Visa',     icon: '📋' },
    { key: 'insurance',label: 'Insurance',icon: '🛡️' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Digital Documents</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabBtn, activeTab === t.key && styles.tabBtnActive]}
            onPress={() => setActiveTab(t.key)}
          >
            <Text style={styles.tabBtnIcon}>{t.icon}</Text>
            <Text style={[styles.tabBtnLabel, activeTab === t.key && styles.tabBtnLabelActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Passport ── */}
        {activeTab === 'passport' && (
          <LinearGradient colors={['#0f4522', '#1b6b3a', '#2d8f55']} style={styles.docCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.docCircle} />
            <View style={styles.docHeader}>
              <View>
                <Text style={styles.docType}>PASSPORT</Text>
                <Text style={styles.docSubtype}>Kingdom of Saudi Arabia</Text>
              </View>
              <Text style={{ fontSize: 36 }}>🛂</Text>
            </View>
            <View style={styles.docFields}>
              <DocField label="Full Name"       value={user?.name ?? '—'} />
              <DocField label="Passport No."    value={user?.passportNumber ?? '—'} />
              <DocField label="Nationality"     value={user?.nationality ?? '—'} />
              <DocField label="Expiry Date"     value="2030-06-15" />
            </View>
            <QRCode />
            <Text style={styles.docFooter}>Tap QR at immigration gates for digital verification</Text>
          </LinearGradient>
        )}

        {/* ── Visa ── */}
        {activeTab === 'visa' && (
          <LinearGradient colors={['#053333', '#0f4522', '#1b6b3a']} style={styles.docCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.docCircle} />
            <View style={styles.docHeader}>
              <View>
                <Text style={styles.docType}>TOURIST VISA</Text>
                <Text style={styles.docSubtype}>{user?.visaType ?? 'e-Visa'}</Text>
              </View>
              <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>✓ ACTIVE</Text></View>
            </View>
            <View style={styles.docFields}>
              <DocField label="Visa Number"    value="SAU-2026-001234" />
              <DocField label="Issue Date"     value="2026-03-01" />
              <DocField label="Valid Until"    value="2026-09-01" />
              <DocField label="Entry Type"     value="Multiple Entry" />
              <DocField label="Duration"       value="90 Days" />
            </View>
            <QRCode />
            <Text style={styles.docFooter}>Present this QR code at all Saudi entry points</Text>
          </LinearGradient>
        )}

        {/* ── Insurance ── */}
        {activeTab === 'insurance' && (
          <LinearGradient colors={['#a07830', '#c8a84b', '#e8c96b']} style={styles.docCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.docCircle} />
            <View style={styles.docHeader}>
              <View>
                <Text style={styles.docType}>TRAVEL INSURANCE</Text>
                <Text style={styles.docSubtype}>Comprehensive Coverage</Text>
              </View>
              <Text style={{ fontSize: 36 }}>🛡️</Text>
            </View>
            <View style={styles.docFields}>
              <DocField label="Policy No."    value="INS-SA-2026-78901" />
              <DocField label="Holder"        value={user?.name ?? '—'} />
              <DocField label="Coverage"      value="Medical + Evacuation" />
              <DocField label="Valid Until"   value="2026-09-01" />
            </View>
            <View style={styles.coverageList}>
              {['✅ Medical Expenses up to $1M', '✅ Emergency Evacuation', '✅ Trip Cancellation', '✅ Lost Baggage', '✅ 24/7 Assistance'].map((item) => (
                <Text key={item} style={styles.coverageItem}>{item}</Text>
              ))}
            </View>
            <Text style={styles.docFooter}>Call +966-920-000-911 for emergency claims</Text>
          </LinearGradient>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DocField({ label, value }: { label: string; value: string }) {
  return (
    <View style={df.row}>
      <Text style={df.label}>{label}</Text>
      <Text style={df.value}>{value}</Text>
    </View>
  );
}
const df = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  label: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.65)', fontWeight: '500' },
  value: { fontSize: typography.sizes.sm, color: colors.white, fontWeight: '600' },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.pearl,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: colors.charcoal, lineHeight: 34 },
  headerTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal },
  tabRow: {
    flexDirection: 'row', backgroundColor: colors.white,
    paddingHorizontal: spacing.md, paddingBottom: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.pearl, gap: spacing.sm,
  },
  tabBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg, backgroundColor: colors.pearl,
  },
  tabBtnActive: { backgroundColor: colors.primary },
  tabBtnIcon: { fontSize: 16 },
  tabBtnLabel: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.slate },
  tabBtnLabelActive: { color: colors.white },
  scroll: { padding: spacing.md },
  docCard: {
    borderRadius: borderRadius.xl, padding: spacing.lg,
    overflow: 'hidden', position: 'relative',
    ...shadows.large,
  },
  docCircle: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -80, right: -40,
  },
  docHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  docType: { fontSize: typography.sizes.xs, fontWeight: '800', color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5 },
  docSubtype: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white, marginTop: 4 },
  activeBadge: { backgroundColor: 'rgba(47,186,137,0.3)', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.full, borderWidth: 1, borderColor: '#2fba89' },
  activeBadgeText: { fontSize: typography.sizes.xs, fontWeight: '700', color: '#2fba89' },
  docFields: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)', paddingTop: spacing.sm, marginTop: spacing.sm },
  docFooter: { fontSize: 10, color: 'rgba(255,255,255,0.55)', textAlign: 'center', marginTop: spacing.md },
  coverageList: { marginTop: spacing.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: spacing.sm },
  coverageItem: { fontSize: typography.sizes.sm, color: colors.white, paddingVertical: 3 },
});
