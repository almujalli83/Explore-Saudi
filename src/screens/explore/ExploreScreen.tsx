import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/common/SearchBar';
import CategoryPill from '../../components/common/CategoryPill';
import RatingStars from '../../components/common/RatingStars';
import PriceBadge from '../../components/common/PriceBadge';
import Badge from '../../components/common/Badge';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { SCREEN_WIDTH } from '../../constants/layout';
import { attractions } from '../../services/mockData/attractions';

const CATEGORIES = [
  { key: 'all', label: 'All', icon: '🌍' },
  { key: 'heritage', label: 'Heritage', icon: '🏛️' },
  { key: 'modern', label: 'Modern', icon: '🏙️' },
  { key: 'nature', label: 'Nature', icon: '🏔️' },
  { key: 'religious', label: 'Religious', icon: '🕌' },
  { key: 'museum', label: 'Museums', icon: '🎨' },
];

const EXPLORE_SECTIONS = [
  { id: 'ent', icon: '🎭', label: 'Entertainment', route: 'Entertainment' },
  { id: 'din', icon: '🍽️', label: 'Dining', route: 'Dining' },
  { id: 'shop', icon: '🛍️', label: 'Shopping', route: 'Shopping' },
  { id: 'hotel', icon: '🏨', label: 'Hotels', route: 'Accommodation' },
  { id: 'prayer', icon: '🕌', label: 'Prayer Times', route: 'PrayerTimes' },
  { id: 'culture', icon: '📖', label: 'Cultural Guide', route: 'CulturalGuide' },
  { id: 'cuisine', icon: '🥘', label: 'Cuisine Finder', route: 'CuisineFinder' },
  { id: 'ai', icon: '🤖', label: 'AI Trip Planner', route: 'AITripPlanner' },
];

export default function ExploreScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    let items = attractions;
    if (activeCategory !== 'all') {
      items = items.filter((a) => a.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((a) => a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, search]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Saudi</Text>
        <Text style={styles.subtitle}>Discover the Kingdom</Text>
      </View>

      <View style={styles.searchWrap}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search attractions, cities..." />
      </View>

      {/* Explore Sections */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectionsRow}>
        {EXPLORE_SECTIONS.map((s) => (
          <TouchableOpacity key={s.id} style={styles.sectionChip} onPress={() => navigation.navigate(s.route)}>
            <Text style={styles.sectionIcon}>{s.icon}</Text>
            <Text style={styles.sectionLabel}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {CATEGORIES.map((c) => (
          <CategoryPill
            key={c.key}
            label={c.label}
            icon={c.icon}
            isActive={activeCategory === c.key}
            onPress={() => setActiveCategory(c.key)}
          />
        ))}
      </ScrollView>

      {/* Attractions Grid */}
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
            onPress={() => navigation.navigate('AttractionDetail', { id: item.id })}
          >
            <Image source={{ uri: item.images[0] }} style={styles.cardImage} contentFit="cover" transition={200} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.cardOverlay}>
              {item.isFeatured && <Badge text="Featured" variant="featured" size="sm" />}
            </LinearGradient>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.cardCity}>{item.city}</Text>
              <View style={styles.cardMeta}>
                <RatingStars rating={item.rating} size="sm" />
                <PriceBadge price={item.price} size="sm" />
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>{'\uD83C\uDFDC\uFE0F'}</Text>
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
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  title: { fontSize: typography.sizes.xxl, fontWeight: '700', color: colors.charcoal },
  subtitle: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 2 },
  searchWrap: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  sectionsRow: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm, gap: spacing.sm },
  sectionChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.pearl, borderRadius: borderRadius.full,
    paddingVertical: spacing.xs + 2, paddingHorizontal: spacing.sm + 4,
  },
  sectionIcon: { fontSize: 16, marginRight: spacing.xs },
  sectionLabel: { fontSize: typography.sizes.sm, color: colors.charcoal, fontWeight: '500' },
  categoryRow: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  grid: { paddingHorizontal: spacing.md, paddingBottom: 100 },
  gridRow: { gap: spacing.sm, marginBottom: spacing.sm },
  card: {
    width: CARD_W, borderRadius: borderRadius.lg, backgroundColor: colors.white,
    overflow: 'hidden', ...shadows.small,
  },
  cardImage: { width: '100%', height: CARD_W * 0.75 },
  cardOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, height: CARD_W * 0.75,
    justifyContent: 'flex-end', padding: spacing.sm,
  },
  cardInfo: { padding: spacing.sm },
  cardName: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.charcoal, lineHeight: 18 },
  cardCity: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 2 },
  cardMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.sm },
  emptyText: { fontSize: typography.sizes.md, color: colors.slate },
});
