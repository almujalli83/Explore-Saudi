import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/common/SearchBar';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { SCREEN_WIDTH } from '../../constants/layout';
import { attractions } from '../../services/mockData/attractions';

const FILTERS = ['All', 'Popular', 'Recommended', 'Rating'] as const;
type Filter = typeof FILTERS[number];

export default function ExploreScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    let items = attractions;
    if (activeFilter === 'Popular') items = items.filter((a) => a.isFeatured);
    else if (activeFilter === 'Recommended') items = [...items].sort((a, b) => b.reviewCount - a.reviewCount);
    else if (activeFilter === 'Rating') items = [...items].sort((a, b) => b.rating - a.rating);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((a) => a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q));
    }
    return items;
  }, [activeFilter, search]);

  const EXPLORE_SECTIONS = [
    { id: 'ent', icon: '🎭', label: 'Entertainment', route: 'Entertainment' },
    { id: 'din', icon: '🍽️', label: 'Dining', route: 'Dining' },
    { id: 'shop', icon: '🛍️', label: 'Shopping', route: 'Shopping' },
    { id: 'hotel', icon: '🏨', label: 'Hotels', route: 'Accommodation' },
    { id: 'prayer', icon: '🕌', label: 'Prayer Times', route: 'PrayerTimes' },
    { id: 'culture', icon: '📖', label: 'Culture', route: 'CulturalGuide' },
    { id: 'ai', icon: '🤖', label: 'AI Planner', route: 'AITripPlanner' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>Explore the best places in the Kingdom</Text>
      </View>

      {/* Search + Filter icon */}
      <View style={styles.searchRow}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search destinations..."
          style={{ flex: 1 } as any}
        />
        <TouchableOpacity style={styles.filterIconBtn}>
          <Text style={styles.filterIconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Explore section chips (horizontal scroll) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectionsRow}>
        {EXPLORE_SECTIONS.map((s) => (
          <TouchableOpacity key={s.id} style={styles.sectionChip} onPress={() => navigation.navigate(s.route)}>
            <Text style={styles.sectionIcon}>{s.icon}</Text>
            <Text style={styles.sectionLabel}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter pills: All / Popular / Recommended / Rating */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterPillText, activeFilter === f && styles.filterPillTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 2-column overlay card grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AttractionDetail', { id: item.id })}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
              transition={200}
            />
            {/* Heart */}
            <View style={styles.heartBtn}><Text style={styles.heartIcon}>♡</Text></View>
            {/* Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(5,31,31,0.78)']}
              style={styles.cardOverlay}
            >
              {item.isFeatured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredText}>⭐ Featured</Text>
                </View>
              )}
              <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.cardSub}>
                {item.price === 0 ? 'Free Entry' : `SAR ${item.price}`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🏜️</Text>
            <Text style={styles.emptyText}>No attractions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const CARD_W = (SCREEN_WIDTH - spacing.md * 2 - spacing.sm) / 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },

  // Header
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.xs },
  title: { fontSize: typography.sizes.xxl, fontWeight: '800', color: colors.charcoal },
  subtitle: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 2 },

  // Search row
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.xs,
    gap: spacing.sm,
  },
  filterIconBtn: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  filterIconText: { fontSize: 18 },

  // Explore section chips
  sectionsRow: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm, gap: spacing.sm },
  sectionChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.pearl, borderRadius: borderRadius.full,
    paddingVertical: spacing.xs + 2, paddingHorizontal: spacing.sm + 4,
  },
  sectionIcon: { fontSize: 15, marginRight: spacing.xs },
  sectionLabel: { fontSize: typography.sizes.sm, color: colors.charcoal, fontWeight: '500' },

  // Filter pills
  filterRow: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm, gap: spacing.sm },
  filterPill: {
    paddingVertical: spacing.xs + 2, paddingHorizontal: spacing.md + 4,
    borderRadius: borderRadius.full,
    borderWidth: 1.5, borderColor: colors.pearl,
    backgroundColor: colors.white,
  },
  filterPillActive: {
    backgroundColor: colors.primary, borderColor: colors.primary,
  },
  filterPillText: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.charcoal },
  filterPillTextActive: { color: colors.white },

  // Card grid
  grid: { paddingHorizontal: spacing.md, paddingBottom: 100 },
  gridRow: { gap: spacing.sm, marginBottom: spacing.sm },
  card: {
    width: CARD_W, height: 160,
    borderRadius: borderRadius.xl, overflow: 'hidden',
    backgroundColor: colors.pearl,
    ...shadows.md,
  },
  heartBtn: {
    position: 'absolute', top: spacing.sm, right: spacing.sm,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 2,
  },
  heartIcon: { fontSize: 14, color: colors.error },
  cardOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.sm, paddingBottom: spacing.sm, paddingTop: spacing.xl,
    zIndex: 1,
  },
  featuredBadge: {
    backgroundColor: 'rgba(200,168,75,0.85)', borderRadius: borderRadius.full,
    paddingVertical: 2, paddingHorizontal: spacing.xs + 2, alignSelf: 'flex-start', marginBottom: 4,
  },
  featuredText: { fontSize: 9, fontWeight: '700', color: colors.white },
  cardName: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.white, lineHeight: 17 },
  cardSub: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  // Empty
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.sm },
  emptyText: { fontSize: typography.sizes.md, color: colors.slate },
});
