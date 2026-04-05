import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/common/Card';
import { colors, gradients, typography, spacing, borderRadius } from '../../constants/theme';

const SERVICES = [
  { id: '1', icon: '🚇', title: 'Transport', subtitle: 'Metro, bus, train & ride-hailing', route: 'Transport', colors: ['#064D4D', '#0A6E6E'] },
  { id: '2', icon: '🆘', title: 'Emergency SOS', subtitle: 'Emergency contacts & assistance', route: 'EmergencySOS', colors: ['#E74C3C', '#C0392B'] },
  { id: '3', icon: '🗺️', title: 'Offline Maps', subtitle: 'Download maps for offline use', route: 'OfflineMaps', colors: ['#3498DB', '#2980B9'] },
  { id: '4', icon: '🛡️', title: 'Travel Insurance', subtitle: 'Health & travel coverage', route: 'Insurance', colors: ['#2ECC71', '#27AE60'] },
  { id: '5', icon: '🗣️', title: 'Language Helper', subtitle: 'Arabic phrases & translator', route: 'LanguageHelper', colors: ['#D4A853', '#B8922E'] },
];

export default function ServicesScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>Essential tools for your trip</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => navigation.navigate(service.route)}
          >
            <LinearGradient colors={service.colors} style={styles.iconWrap}>
              <Text style={styles.icon}>{service.icon}</Text>
            </LinearGradient>
            <View style={styles.info}>
              <Text style={styles.serviceName}>{service.title}</Text>
              <Text style={styles.serviceSub}>{service.subtitle}</Text>
            </View>
            <Text style={styles.arrow}>{'\u203A'}</Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.md },
  title: { fontSize: typography.sizes.xxl, fontWeight: '700', color: colors.charcoal },
  subtitle: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 2 },
  scroll: { padding: spacing.md },
  serviceCard: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.md,
    backgroundColor: colors.white, borderRadius: borderRadius.lg,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.pearl,
  },
  iconWrap: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: 26 },
  info: { flex: 1, marginLeft: spacing.md },
  serviceName: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.charcoal },
  serviceSub: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 2 },
  arrow: { fontSize: 24, color: colors.slate },
});
