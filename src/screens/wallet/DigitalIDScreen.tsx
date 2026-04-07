import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  ActivityIndicator, Alert, Platform, Image as RNImage,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

type DocType = 'passport' | 'driver_license';

export default function DigitalIDScreen() {
  const navigation = useNavigation();
  const user = useAuthStore((s) => s.user);

  // Upload state for passport & driver license
  const [uploadedImages, setUploadedImages] = useState<Partial<Record<DocType, string>>>({});
  const [uploading, setUploading] = useState<DocType | null>(null);
  const [verified, setVerified] = useState<Partial<Record<DocType, boolean>>>({});

  const pickDocument = (docType: DocType) => {
    if (Platform.OS === 'web') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,.pdf';
      input.onchange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
          const uri = URL.createObjectURL(file);
          simulateUpload(docType, uri);
        }
      };
      input.click();
    } else {
      // Mobile: simulate camera/gallery capture
      simulateUpload(docType, 'mock://captured');
    }
  };

  const simulateUpload = (docType: DocType, uri: string) => {
    setUploading(docType);
    setTimeout(() => {
      setUploadedImages((prev) => ({ ...prev, [docType]: uri }));
      setUploading(null);
      // Simulate verification after upload
      setTimeout(() => {
        setVerified((prev) => ({ ...prev, [docType]: true }));
        Alert.alert('Verified', `Your ${docType === 'passport' ? 'passport' : "driver's license"} has been verified successfully.`);
      }, 1000);
    }, 1500);
  };

  const removeDocument = (docType: DocType) => {
    Alert.alert('Remove Document', 'Are you sure you want to remove this document?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setUploadedImages((prev) => ({ ...prev, [docType]: undefined }));
          setVerified((prev) => ({ ...prev, [docType]: false }));
        },
      },
    ]);
  };

  const getVerificationStatus = (docType: DocType) => {
    if (verified[docType]) return { label: 'Verified', color: colors.success, icon: '✅' };
    if (uploadedImages[docType]) return { label: 'Pending', color: colors.warning, icon: '⏳' };
    return { label: 'Not Uploaded', color: colors.slate, icon: '⚪' };
  };

  const renderUploadSection = (docType: DocType, title: string, icon: string) => {
    const uploadedUri = uploadedImages[docType];
    const isUploading = uploading === docType;
    const status = getVerificationStatus(docType);

    return (
      <View style={styles.uploadSection}>
        <View style={styles.uploadHeader}>
          <Text style={styles.uploadTitle}>{icon} {title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
            <Text style={styles.statusIcon}>{status.icon}</Text>
            <Text style={[styles.statusLabel, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>

        {uploadedUri ? (
          <View style={styles.uploadedWrap}>
            {Platform.OS === 'web' ? (
              <RNImage source={{ uri: uploadedUri }} style={styles.uploadedImg} resizeMode="cover" />
            ) : (
              <View style={styles.uploadedMock}>
                <Text style={styles.uploadedMockIcon}>{icon}</Text>
                <Text style={styles.uploadedMockText}>Document captured</Text>
              </View>
            )}
            <View style={styles.uploadedActions}>
              <TouchableOpacity style={styles.replaceBtn} onPress={() => pickDocument(docType)}>
                <Text style={styles.replaceBtnText}>📷  Replace</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeBtn} onPress={() => removeDocument(docType)}>
                <Text style={styles.removeBtnText}>🗑️  Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => pickDocument(docType)}
            activeOpacity={0.8}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <ActivityIndicator color={colors.primary} size="large" />
                <Text style={styles.uploadingText}>Uploading…</Text>
              </>
            ) : (
              <>
                <Text style={styles.uploadIcon}>📤</Text>
                <Text style={styles.uploadLabel}>Upload {title}</Text>
                <Text style={styles.uploadSub}>
                  Tap to {Platform.OS === 'web' ? 'choose a file' : 'take a photo or pick from gallery'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Digital ID" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
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

        {/* Verification Summary */}
        <Card variant="elevated" style={styles.verificationCard}>
          <Text style={styles.verificationTitle}>🛡️ ID Verification Status</Text>
          <View style={styles.verificationRow}>
            <Text style={styles.verificationDoc}>Passport</Text>
            <View style={[styles.verificationBadge, { backgroundColor: getVerificationStatus('passport').color + '20' }]}>
              <Text style={{ fontSize: 12 }}>{getVerificationStatus('passport').icon}</Text>
              <Text style={[styles.verificationLabel, { color: getVerificationStatus('passport').color }]}>
                {getVerificationStatus('passport').label}
              </Text>
            </View>
          </View>
          <View style={styles.verificationDivider} />
          <View style={styles.verificationRow}>
            <Text style={styles.verificationDoc}>Driver's License</Text>
            <View style={[styles.verificationBadge, { backgroundColor: getVerificationStatus('driver_license').color + '20' }]}>
              <Text style={{ fontSize: 12 }}>{getVerificationStatus('driver_license').icon}</Text>
              <Text style={[styles.verificationLabel, { color: getVerificationStatus('driver_license').color }]}>
                {getVerificationStatus('driver_license').label}
              </Text>
            </View>
          </View>
        </Card>

        {/* Upload Sections */}
        {renderUploadSection('passport', 'Passport', '🛂')}
        {renderUploadSection('driver_license', "Driver's License", '🪪')}

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

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.md },

  // ID Card
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

  // Verification card
  verificationCard: { padding: spacing.md, marginBottom: spacing.lg },
  verificationTitle: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.charcoal, marginBottom: spacing.sm },
  verificationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.xs },
  verificationDoc: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.charcoal },
  verificationBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.full },
  verificationLabel: { fontSize: typography.sizes.xs, fontWeight: '600', marginLeft: 4 },
  verificationDivider: { height: 1, backgroundColor: colors.pearl, marginVertical: spacing.xs },

  // Upload sections
  uploadSection: { marginBottom: spacing.lg },
  uploadHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  uploadTitle: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.charcoal },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.full },
  statusIcon: { fontSize: 12 },
  statusLabel: { fontSize: typography.sizes.xs, fontWeight: '600', marginLeft: 4 },

  // Upload box
  uploadBox: {
    borderWidth: 2, borderStyle: 'dashed', borderColor: colors.primary,
    borderRadius: borderRadius.lg, padding: spacing.xl,
    alignItems: 'center', backgroundColor: colors.pearl + '40',
  },
  uploadIcon: { fontSize: 40, marginBottom: spacing.sm },
  uploadLabel: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.charcoal, marginBottom: spacing.xs },
  uploadSub: { fontSize: typography.sizes.sm, color: colors.slate, textAlign: 'center' },
  uploadingText: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: spacing.sm },

  // Uploaded document preview
  uploadedWrap: {
    borderRadius: borderRadius.lg, overflow: 'hidden',
    backgroundColor: colors.white, ...shadows.sm,
  },
  uploadedImg: { width: '100%', height: 180 },
  uploadedMock: {
    height: 140, backgroundColor: '#e8f0fb',
    alignItems: 'center', justifyContent: 'center',
  },
  uploadedMockIcon: { fontSize: 48, marginBottom: spacing.xs },
  uploadedMockText: { fontSize: typography.sizes.sm, color: colors.slate, fontWeight: '600' },
  uploadedActions: {
    flexDirection: 'row', gap: spacing.sm, padding: spacing.sm,
  },
  replaceBtn: {
    flex: 1, paddingVertical: spacing.sm,
    borderRadius: borderRadius.md, borderWidth: 1.5, borderColor: colors.primary,
    alignItems: 'center',
  },
  replaceBtnText: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.primary },
  removeBtn: {
    flex: 1, paddingVertical: spacing.sm,
    borderRadius: borderRadius.md, borderWidth: 1.5, borderColor: colors.error,
    alignItems: 'center',
  },
  removeBtnText: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.error },

  // Info cards
  infoCard: { flexDirection: 'row', padding: spacing.md, marginBottom: spacing.sm, alignItems: 'center' },
  infoIcon: { fontSize: 22, marginRight: spacing.sm },
  infoText: { flex: 1, fontSize: typography.sizes.sm, color: colors.slate, lineHeight: 20 },
});
