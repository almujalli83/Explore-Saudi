import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';
import { attractions } from '../../services/mockData/attractions';

const CATS = [
  { id: '1', icon: '🏛️', label: 'Heritage',  tab: 'ExploreTab', route: undefined as string | undefined },
  { id: '2', icon: '🌿', label: 'Nature',    tab: 'ExploreTab', route: undefined as string | undefined },
  { id: '3', icon: '🕌', label: 'Religious', tab: 'ExploreTab', route: undefined as string | undefined },
  { id: '4', icon: '🏺', label: 'Museum',    tab: 'ExploreTab', route: undefined as string | undefined },
  { id: '5', icon: '🍽️', label: 'Dining',    tab: 'ExploreTab', route: 'Dining' as string | undefined },
  { id: '6', icon: '🛍️', label: 'Shopping',  tab: 'ExploreTab', route: 'Shopping' as string | undefined },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);

  React.useEffect(() => { if (!user) login('demo', 'demo'); }, []);

  const popularDestinations = attractions.filter((a) => a.isFeatured).slice(0, 6);
  const recommended = attractions.filter((a) => a.isFeatured).slice(0, 4);
  const leftRec  = recommended.filter((_, i) => i % 2 === 0);
  const rightRec = recommended.filter((_, i) => i % 2 !== 0);

  const goToDetail = (id: string) =>
    navigation.getParent()?.navigate('ExploreTab', { screen: 'AttractionDetail', params: { id } });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>
              Hi, {user?.name?.split(' ')[0] ?? 'Traveler'}! 👋
            </Text>
            <Text style={styles.subGreeting}>Where do you want to go?</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
              <Text style={styles.notifIcon}>🔔</Text>
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <LinearGradient colors={['#c8a84b', '#a07830']} style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() ?? 'T'}</Text>
            </LinearGradient>
          </View>
        </View>

        {/* ── Search Bar ──────────────────────────────────────────────── */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search destinations, cities...</Text>
          <View style={styles.searchFilterBtn}>
            <Text style={styles.searchFilterIcon}>⚙️</Text>
          </View>
        </TouchableOpacity>

        {/* ── Category Row ────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
          <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
          {CATS.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.catItem}
              onPress={() => {
                if (cat.route) navigation.getParent()?.navigate(cat.tab, { screen: cat.route });
                else navigation.getParent()?.navigate(cat.tab);
              }}
            >
              <View style={styles.catCircle}>
                <Text style={styles.catIcon}>{cat.icon}</Text>
              </View>
              <Text style={styles.catLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Recommended ─────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recGrid}>
          <View style={styles.recCol}>
            {leftRec.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recCard} onPress={() => goToDetail(item.id)} activeOpacity={0.9}>
                <Image source={{ uri: item.images[0] }} style={StyleSheet.absoluteFillObject} contentFit="cover" transition={200} />
                <View style={styles.heartBtn}><Text style={styles.heartIcon}>♡</Text></View>
                <LinearGradient colors={['transparent', 'rgba(5,31,31,0.80)']} style={styles.recOverlay}>
                  <Text style={styles.recCardName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.recCardPrice}>{item.price === 0 ? 'Free Entry' : `SAR ${item.price}`}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ width: spacing.sm }} />
          <View style={styles.recCol}>
            {rightRec.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recCard} onPress={() => goToDetail(item.id)} activeOpacity={0.9}>
                <Image source={{ uri: item.images[0] }} style={StyleSheet.absoluteFillObject} contentFit="cover" transition={200} />
                <View style={styles.heartBtn}><Text style={styles.heartIcon}>♡</Text></View>
                <LinearGradient colors={['transparent', 'rgba(5,31,31,0.80)']} style={styles.recOverlay}>
                  <Text style={styles.recCardName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.recCardPrice}>{item.price === 0 ? 'Free Entry' : `SAR ${item.price}`}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Places to Visit ─────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Places to Visit</Text>
          <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={popularDestinations}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.placeList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.placeCard} onPress={() => goToDetail(item.id)} activeOpacity={0.85}>
              <Image source={{ uri: item.images[0] }} style={styles.placeImg} contentFit="cover" transition={200} />
              <View style={styles.placeInfo}>
                <Text style={styles.placeName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.placeCity} numberOfLines={1}>📍 {item.city}</Text>
                <View style={styles.placeMeta}>
                  <Text style={styles.placeStar}>⭐ {item.rating.toFixed(1)}</Text>
                  <Text style={styles.placePrice}>{item.price === 0 ? 'Free' : `SAR ${item.price}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f6f8' },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  headerLeft: { flex: 1 },
  greeting: { fontSize: typography.sizes.xl, fontWeight: '800', color: colors.charcoal },
  subGreeting: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  notifBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.pearl, alignItems: 'center', justifyContent: 'center',
  },
  notifIcon: { fontSize: 18 },
  notifDot: {
    position: 'absolute', top: 7, right: 7,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.error, borderWidth: 1.5, borderColor: colors.pearl,
  },
  avatarCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '800', color: colors.white },

  // Search
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white, borderRadius: borderRadius.full,
    marginHorizontal: spacing.md, marginVertical: spacing.md,
    paddingHorizontal: spacing.md, paddingVertical: 11,
    borderWidth: 1, borderColor: colors.pearl,
    ...shadows.sm,
  },
  searchIcon: { fontSize: 16, marginRight: spacing.sm },
  searchPlaceholder: { flex: 1, fontSize: typography.sizes.sm, color: colors.slate },
  searchFilterBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  searchFilterIcon: { fontSize: 13 },

  // Section headers
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  sectionTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal },
  seeAll: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.primary },

  // Category
  catRow: { paddingHorizontal: spacing.md, gap: spacing.lg, paddingBottom: spacing.md },
  catItem: { alignItems: 'center', gap: spacing.xs },
  catCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.white,
    borderWidth: 1.5, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.sm,
  },
  catIcon: { fontSize: 24 },
  catLabel: { fontSize: typography.sizes.xs, fontWeight: '500', color: colors.charcoal, textAlign: 'center' },

  // Recommended
  recGrid: { flexDirection: 'row', paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  recCol: { flex: 1 },
  recCard: {
    height: 180, borderRadius: borderRadius.xl, overflow: 'hidden',
    marginBottom: spacing.sm, backgroundColor: colors.pearl,
    ...shadows.md,
  },
  heartBtn: {
    position: 'absolute', top: spacing.sm, right: spacing.sm,
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 2,
  },
  heartIcon: { fontSize: 15, color: colors.error },
  recOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.sm, paddingBottom: spacing.sm, paddingTop: spacing.xl,
    zIndex: 1,
  },
  recCardName: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.white, lineHeight: 17 },
  recCardPrice: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  // Places to Visit
  placeList: { paddingHorizontal: spacing.md, gap: spacing.sm, paddingBottom: spacing.sm },
  placeCard: {
    width: 160, backgroundColor: colors.white,
    borderRadius: borderRadius.lg, overflow: 'hidden',
    ...shadows.sm,
  },
  placeImg: { width: '100%', height: 110, backgroundColor: colors.pearl },
  placeInfo: { padding: spacing.sm },
  placeName: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.charcoal },
  placeCity: { fontSize: 10, color: colors.slate, marginTop: 2 },
  placeMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs },
  placeStar: { fontSize: 10, color: colors.charcoal, fontWeight: '600' },
  placePrice: { fontSize: 10, color: colors.primary, fontWeight: '700' },
});
