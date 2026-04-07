import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { SCREEN_WIDTH } from '../../constants/layout';
import RatingStars from '../../components/common/RatingStars';
import { useAuthStore } from '../../store/useAuthStore';
import { useWalletStore } from '../../store/useWalletStore';
import { attractions } from '../../services/mockData/attractions';
import { formatCurrency } from '../../utils/formatters';

// ── Category grid data ──────────────────────────────────────────────────────
const CATEGORIES = [
  { id: '1', icon: '🏛️', label: 'Heritage',  tab: 'ExploreTab', route: undefined },
  { id: '2', icon: '🌿', label: 'Nature',    tab: 'ExploreTab', route: undefined },
  { id: '3', icon: '🕌', label: 'Religious', tab: 'ExploreTab', route: undefined },
  { id: '4', icon: '🏺', label: 'Museum',    tab: 'ExploreTab', route: undefined },
  { id: '5', icon: '🍽️', label: 'Dining',    tab: 'ExploreTab', route: 'Dining' },
  { id: '6', icon: '🛍️', label: 'Shopping',  tab: 'ExploreTab', route: 'Shopping' },
  { id: '7', icon: '🎭', label: 'Events',    tab: 'ExploreTab', route: 'Entertainment' },
  { id: '8', icon: '⋯',  label: 'See All',   tab: 'ExploreTab', route: undefined },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const balance = useWalletStore((s) => s.balance);

  const login = useAuthStore((s) => s.login);
  React.useEffect(() => {
    if (!user) login('demo', 'demo');
  }, []);

  const featuredAttractions = attractions.filter((a) => a.isFeatured).slice(0, 6);
  const popularDestinations = attractions.filter((a) => a.isFeatured).slice(0, 5);
  const recommended = attractions.filter((a) => a.isFeatured).slice(0, 4);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Section A: Search Header ──────────────────────────────────── */}
        <View style={styles.searchHeader}>
          {/* Logo */}
          <View style={styles.logoWrap}>
            <LinearGradient colors={['#1b6b3a', '#0f4522']} style={styles.logoBg}>
              <Text style={styles.logoIcon}>🌴</Text>
            </LinearGradient>
          </View>

          {/* Fake search bar — taps into Search screen */}
          <TouchableOpacity
            style={styles.searchBar}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Search destinations...</Text>
          </TouchableOpacity>

          {/* Notification */}
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.notifIcon}>🔔</Text>
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* ── Section B: Welcome Card ───────────────────────────────────── */}
        <LinearGradient
          colors={['#0f4522', '#1b6b3a', '#2d8f55']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.welcomeCard}
        >
          {/* Decorative circle */}
          <View style={styles.welcomeCircle} />

          {/* Avatar */}
          <LinearGradient colors={['#c8a84b', '#a07830']} style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() ?? 'T'}</Text>
          </LinearGradient>

          {/* Greeting */}
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeHi}>Welcome! 👋</Text>
            <Text style={styles.welcomeName} numberOfLines={1}>{user?.name ?? 'Traveler'}</Text>
          </View>

          {/* Wallet chip */}
          <TouchableOpacity
            style={styles.walletChip}
            onPress={() => navigation.getParent()?.navigate('WalletTab')}
          >
            <Text style={styles.walletChipIcon}>💳</Text>
            <View>
              <Text style={styles.walletChipLabel}>Balance</Text>
              <Text style={styles.walletChipAmount}>{formatCurrency(balance)}</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/* ── Section C: Category Grid ──────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryItem}
                onPress={() => {
                  if (cat.route) {
                    navigation.getParent()?.navigate(cat.tab, { screen: cat.route });
                  } else {
                    navigation.getParent()?.navigate(cat.tab);
                  }
                }}
              >
                <LinearGradient
                  colors={['#1b6b3a', '#0f4522']}
                  style={styles.categoryCircle}
                >
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                </LinearGradient>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Section D: Popular Destinations ──────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={popularDestinations}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.destCard}
                onPress={() => navigation.getParent()?.navigate('ExploreTab', {
                  screen: 'AttractionDetail', params: { id: item.id },
                })}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.destImage}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.destLabel}>
                  <Text style={styles.destName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.destCity} numberOfLines={1}>📍 {item.city}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── Section E: Recommended ───────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recGrid}>
            {recommended.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recCard}
                onPress={() => navigation.getParent()?.navigate('ExploreTab', {
                  screen: 'AttractionDetail', params: { id: item.id },
                })}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.recImage}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.recInfo}>
                  <Text style={styles.recName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.recCity} numberOfLines={1}>📍 {item.city}</Text>
                  <RatingStars rating={item.rating} size="sm" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const REC_CARD_W = (SCREEN_WIDTH - spacing.md * 2 - spacing.sm) / 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },

  // ── Search Header ──────────────────────────────────────────────────────────
  searchHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.white, gap: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.pearl,
  },
  logoWrap: { width: 40, height: 40 },
  logoBg: {
    width: 40, height: 40, borderRadius: borderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  logoIcon: { fontSize: 20 },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.pearl, borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md, paddingVertical: 9, gap: spacing.sm,
  },
  searchIcon: { fontSize: 15 },
  searchPlaceholder: { fontSize: typography.sizes.sm, color: colors.slate },
  notifBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.pearl, alignItems: 'center', justifyContent: 'center',
  },
  notifIcon: { fontSize: 18 },
  notifDot: {
    position: 'absolute', top: 7, right: 7,
    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.error,
    borderWidth: 1.5, borderColor: colors.pearl,
  },

  // ── Welcome Card ───────────────────────────────────────────────────────────
  welcomeCard: {
    marginHorizontal: spacing.md, marginTop: spacing.md,
    borderRadius: borderRadius.xl, padding: spacing.md,
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    overflow: 'hidden', minHeight: 80,
  },
  welcomeCircle: {
    position: 'absolute', width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -50, right: -20,
  },
  avatar: {
    width: 46, height: 46, borderRadius: 23,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: colors.white },
  welcomeText: { flex: 1 },
  welcomeHi: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.75)' },
  welcomeName: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white },
  walletChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: spacing.sm, paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.lg, flexShrink: 0,
  },
  walletChipIcon: { fontSize: 18 },
  walletChipLabel: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.7)' },
  walletChipAmount: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.white },

  // ── Category Grid ──────────────────────────────────────────────────────────
  section: { marginTop: spacing.lg },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal },
  seeAll: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.primary },

  categoryGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.md, rowGap: spacing.md,
  },
  categoryItem: {
    width: '25%', alignItems: 'center', gap: spacing.xs,
  },
  categoryCircle: {
    width: 60, height: 60, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.small,
  },
  categoryIcon: { fontSize: 26 },
  categoryLabel: {
    fontSize: typography.sizes.xs, fontWeight: '500',
    color: colors.charcoal, textAlign: 'center',
  },

  // ── Popular Destinations ───────────────────────────────────────────────────
  hList: { paddingLeft: spacing.md, paddingRight: spacing.sm },
  destCard: {
    width: 140, marginRight: spacing.sm, borderRadius: borderRadius.lg,
    backgroundColor: colors.white, overflow: 'hidden', ...shadows.small,
  },
  destImage: { width: '100%', height: 100 },
  destLabel: { padding: spacing.xs + 2 },
  destName: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.charcoal },
  destCity: { fontSize: 10, color: colors.slate, marginTop: 2 },

  // ── Recommended Grid ───────────────────────────────────────────────────────
  recGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.md, gap: spacing.sm,
  },
  recCard: {
    width: REC_CARD_W, backgroundColor: colors.white,
    borderRadius: borderRadius.lg, overflow: 'hidden', ...shadows.small,
  },
  recImage: { width: '100%', height: 120 },
  recInfo: { padding: spacing.sm },
  recName: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.charcoal, lineHeight: 18 },
  recCity: { fontSize: 10, color: colors.slate, marginTop: 2, marginBottom: spacing.xs },
});
