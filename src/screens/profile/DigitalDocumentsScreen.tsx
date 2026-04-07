import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';
import { Document } from '../../types/models';

type DocType = 'passport' | 'visa' | 'insurance' | 'boarding_pass';

const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc_001',
    type: 'passport',
    title: 'Saudi Arabian Passport',
    number: 'P9876543',
    issuedDate: '2020-06-15',
    expiryDate: '2030-06-14',
    country: 'Saudi Arabia',
  },
  {
    id: 'doc_002',
    type: 'visa',
    title: 'Tourist Visa',
    number: 'V-SA-4829101',
    issuedDate: '2026-03-01',
    expiryDate: '2026-09-01',
    country: 'Saudi Arabia',
  },
  {
    id: 'doc_003',
    type: 'insurance',
    title: 'Travel Health Insurance',
    number: 'INS-2026-88772',
    issuedDate: '2026-01-01',
    expiryDate: '2026-12-31',
    country: 'International',
  },
  {
    id: 'doc_004',
    type: 'boarding_pass',
    title: 'Boarding Pass',
    number: 'SV 432 · 10A',
    issuedDate: '2026-04-10',
    expiryDate: '2026-04-10',
    country: 'RUH → JED',
  },
];

const TABS: { key: DocType; label: string; icon: string }[] = [
  { key: 'passport', label: 'Passport', icon: '🛂' },
  { key: 'visa', label: 'Visa', icon: '🔏' },
  { key: 'insurance', label: 'Insurance', icon: '🛡️' },
  { key: 'boarding_pass', label: 'Boarding', icon: '✈️' },
];

const DOC_COLORS: Record<DocType, string[]> = {
  passport: ['#053333', '#214242'],
  visa: ['#6a58af', '#846edb'],
  insurance: ['#2fba89', '#82d9bf'],
  boarding_pass: ['#962640', '#cf6d84'],
};

export default function DigitalDocumentsScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const [activeTab, setActiveTab] = useState<DocType>('passport');

  const doc = MOCK_DOCUMENTS.find((d) => d.type === activeTab);
  const docColors = DOC_COLORS[activeTab];

  const isExpired = doc ? new Date(doc.expiryDate) < new Date() : false;
  const daysLeft = doc
    ? Math.max(0, Math.ceil((new Date(doc.expiryDate).getTime() - Date.now()) / 86400000))
    : 0;

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

      {/* Tab selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      >
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {doc ? (
          <>
            {/* Document card */}
            <View style={[styles.docCard, { backgroundColor: docColors[0] }]}>
              {/* Card header */}
              <View style={styles.docCardHeader}>
                <View>
                  <Text style={styles.docCardType}>{doc.title.toUpperCase()}</Text>
                  <Text style={styles.docCardOwner}>{user?.name ?? 'Traveller'}</Text>
                </View>
                <Text style={styles.docCardIcon}>
                  {TABS.find((t) => t.key === activeTab)?.icon}
                </Text>
              </View>

              {/* Document number */}
              <Text style={styles.docNumber}>{doc.number}</Text>

              {/* Dates */}
              <View style={styles.docDates}>
                <View>
                  <Text style={styles.docDateLabel}>ISSUED</Text>
                  <Text style={styles.docDateVal}>{doc.issuedDate}</Text>
                </View>
                <View>
                  <Text style={styles.docDateLabel}>EXPIRES</Text>
                  <Text style={styles.docDateVal}>{doc.expiryDate}</Text>
                </View>
                <View>
                  <Text style={styles.docDateLabel}>COUNTRY</Text>
                  <Text style={styles.docDateVal}>{doc.country}</Text>
                </View>
              </View>

              {/* QR / Barcode placeholder */}
              <View style={styles.qrBox}>
                <Text style={styles.qrText}>▐██ ███ ██▌</Text>
                <Text style={styles.qrSub}>Scan to verify</Text>
              </View>
            </View>

            {/* Status banner */}
            <View style={[styles.statusBanner, isExpired ? styles.statusExpired : styles.statusValid]}>
              <Text style={styles.statusIcon}>{isExpired ? '⚠️' : '✅'}</Text>
              <Text style={styles.statusText}>
                {isExpired
                  ? 'This document has expired'
                  : `Valid · ${daysLeft} days remaining`}
              </Text>
            </View>

            {/* Detail rows */}
            <View style={styles.detailCard}>
              <DetailRow label="Document Type" value={doc.type.replace('_', ' ').toUpperCase()} />
              <DetailRow label="Document Number" value={doc.number} />
              <DetailRow label="Issue Date" value={doc.issuedDate} />
              <DetailRow label="Expiry Date" value={doc.expiryDate} />
              <DetailRow label="Country / Route" value={doc.country} isLast />
            </View>

            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>📤  Share Document</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📂</Text>
            <Text style={styles.emptyText}>No document found</Text>
          </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ label, value, isLast }: { label: string; value: string; isLast?: boolean }) {
  return (
    <View style={[detailStyles.row, isLast && { borderBottomWidth: 0 }]}>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={detailStyles.value}>{value}</Text>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.pearl,
  },
  label: { fontSize: typography.sizes.sm, color: colors.slate },
  value: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.charcoal },
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
  tabBar: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.xs },
  tab: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: borderRadius.full ?? 100, backgroundColor: colors.pearl,
    marginRight: spacing.xs,
  },
  tabActive: { backgroundColor: colors.charcoal },
  tabIcon: { fontSize: 16, marginRight: 6 },
  tabLabel: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.slate },
  tabLabelActive: { color: colors.white },
  scroll: { padding: spacing.md },
  docCard: {
    borderRadius: borderRadius.xl ?? 20, padding: spacing.lg,
    marginBottom: spacing.md, ...shadows.lg,
  },
  docCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
  docCardType: { fontSize: typography.sizes.xs, fontWeight: '700', color: 'rgba(255,255,255,0.6)', letterSpacing: 1 },
  docCardOwner: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.white, marginTop: 4 },
  docCardIcon: { fontSize: 36 },
  docNumber: {
    fontSize: typography.sizes.xl, fontWeight: '800', color: colors.white,
    letterSpacing: 3, marginBottom: spacing.lg,
  },
  docDates: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  docDateLabel: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.6)', fontWeight: '600', letterSpacing: 0.5 },
  docDateVal: { fontSize: typography.sizes.sm, color: colors.white, fontWeight: '600', marginTop: 2 },
  qrBox: {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center',
  },
  qrText: { fontSize: 22, color: colors.white, letterSpacing: 2 },
  qrSub: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.6)', marginTop: 6 },
  statusBanner: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: borderRadius.md, padding: spacing.sm,
    marginBottom: spacing.md,
  },
  statusValid: { backgroundColor: '#e6f9f3' },
  statusExpired: { backgroundColor: '#fdecea' },
  statusIcon: { fontSize: 18, marginRight: spacing.sm },
  statusText: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.charcoal },
  detailCard: {
    backgroundColor: colors.white, borderRadius: borderRadius.lg,
    padding: spacing.md, marginBottom: spacing.md, ...shadows.sm,
  },
  shareBtn: {
    borderWidth: 1.5, borderColor: colors.sand, borderRadius: borderRadius.lg,
    paddingVertical: 14, alignItems: 'center',
  },
  shareBtnText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.sand },
  empty: { alignItems: 'center', paddingVertical: spacing.xxl ?? 48 },
  emptyEmoji: { fontSize: 56, marginBottom: spacing.md },
  emptyText: { fontSize: typography.sizes.md, color: colors.slate },
});
