import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import PriceBadge from '../../components/common/PriceBadge';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { SCREEN_WIDTH } from '../../constants/layout';
import { attractions } from '../../services/mockData/attractions';

const TABS = ['Hotels', 'Restaurants', 'Activities'] as const;

export default function AttractionDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Hotels');
  const [expanded, setExpanded] = useState(false);

  const attraction = attractions.find((a) => a.id === route.params?.id);

  if (!attraction) {
    return (
      <View style={styles.center}><Text>Attraction not found</Text></View>
    );
  }

  const handleBook = () => {
    Alert.alert(
      attraction.price === 0 ? 'Directions' : 'Booking',
      attraction.price === 0
        ? `Opening Maps to ${attraction.name}...`
        : `Book a ticket for ${attraction.name}?\nEntry: SAR ${attraction.price}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Hero Image with overlay ───────────────────────────────── */}
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: attraction.images[0] }}
            style={styles.heroImg}
            contentFit="cover"
            transition={200}
          />

          {/* Top action bar: back / share / heart */}
          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.heroBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.heroBtnIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.heroActRight}>
              <TouchableOpacity style={styles.heroBtn}>
                <Text style={styles.heroBtnIcon}>⤴</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBtn}>
                <Text style={styles.heroBtnIcon}>♡</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom overlay: name + city + rating chip */}
          <LinearGradient
            colors={['transparent', 'rgba(5,31,31,0.88)']}
            style={styles.heroOverlay}
          >
            <Text style={styles.heroName}>{attraction.name}</Text>
            <Text style={styles.heroCity}>{attraction.city}, Saudi Arabia</Text>
            <View style={styles.heroRatingChip}>
              <Text style={styles.heroRatingStar}>⭐</Text>
              <Text style={styles.heroRatingNum}>{attraction.rating.toFixed(1)}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* ── Tabs ─────────────────────────────────────────────────── */}
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabRow}
        >
          {TABS.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, activeTab === t && styles.tabActive]}
              onPress={() => setActiveTab(t)}
            >
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Photo Grid ───────────────────────────────────────────── */}
        <View style={styles.photoGrid}>
          <Image
            source={{ uri: attraction.images[1] ?? attraction.images[0] }}
            style={styles.photoLeft}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.photoRightCol}>
            <Image
              source={{ uri: attraction.images[2] ?? attraction.images[0] }}
              style={styles.photoSmall}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.photoMore}>
              <Text style={styles.photoMoreText}>10+</Text>
            </View>
          </View>
        </View>

        {/* ── Details ──────────────────────────────────────────────── */}
        <View style={styles.content}>
          <Text style={styles.detailsLabel}>DETAILS</Text>
          <Text style={styles.description} numberOfLines={expanded ? undefined : 4}>
            {attraction.description}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMore}>{expanded ? 'Show less' : 'Read More'}</Text>
          </TouchableOpacity>

          {/* Meta row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{attraction.city}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⭐</Text>
              <Text style={styles.metaText}>{attraction.rating.toFixed(1)} / 5</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>🕙</Text>
              <Text style={styles.metaText} numberOfLines={1}>{attraction.openingHours}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ── Bottom Bar ───────────────────────────────────────────────── */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>
            {attraction.price === 0 ? 'Free Entry' : 'Entry Fee'}
          </Text>
          <PriceBadge price={attraction.price} size="lg" />
        </View>
        <TouchableOpacity style={styles.continueBtn} onPress={handleBook}>
          <Text style={styles.continueBtnText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PHOTO_H = 150;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Hero
  heroWrap: { width: '100%', height: 280 },
  heroImg: { width: '100%', height: '100%', backgroundColor: colors.pearl },
  heroActions: {
    position: 'absolute', top: 48, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  heroActRight: { flexDirection: 'row', gap: spacing.sm },
  heroBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
    ...shadows.sm,
  },
  heroBtnIcon: { fontSize: 17, color: colors.charcoal },
  heroOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.md, paddingBottom: spacing.md, paddingTop: 60,
  },
  heroName: {
    fontSize: typography.sizes.xl, fontWeight: '800', color: colors.white,
    textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4,
  },
  heroCity: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.8)', marginTop: 3 },
  heroRatingChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)', alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm, paddingVertical: 4,
    borderRadius: borderRadius.full, marginTop: spacing.xs,
    gap: 4,
  },
  heroRatingStar: { fontSize: 13 },
  heroRatingNum: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.white },

  // Tabs
  tabRow: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.pearl,
  },
  tab: {
    paddingVertical: spacing.xs + 2, paddingHorizontal: spacing.md + 4,
    borderRadius: borderRadius.full,
    borderWidth: 1.5, borderColor: colors.pearl,
  },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.charcoal },
  tabTextActive: { color: colors.white },

  // Photo grid
  photoGrid: {
    flexDirection: 'row', height: PHOTO_H,
    marginHorizontal: spacing.md, marginTop: spacing.md,
    borderRadius: borderRadius.lg, overflow: 'hidden', gap: 4,
  },
  photoLeft: { width: '58%', height: '100%', backgroundColor: colors.pearl },
  photoRightCol: { flex: 1, gap: 4 },
  photoSmall: { flex: 1, backgroundColor: colors.pearl },
  photoMore: {
    height: 46, backgroundColor: 'rgba(5,31,31,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  photoMoreText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white },

  // Content
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.lg },
  detailsLabel: {
    fontSize: typography.sizes.xs, fontWeight: '800', letterSpacing: 1,
    color: colors.slate, marginBottom: spacing.xs,
  },
  description: { fontSize: typography.sizes.md, color: colors.slate, lineHeight: 23 },
  readMore: {
    fontSize: typography.sizes.sm, fontWeight: '700', color: colors.primary,
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg,
    paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.pearl,
    flexWrap: 'wrap',
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaIcon: { fontSize: 14 },
  metaText: { fontSize: typography.sizes.sm, color: colors.slate },

  // Bottom bar
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.white, padding: spacing.md, paddingBottom: spacing.xl,
    borderTopWidth: 1, borderTopColor: colors.pearl,
    ...shadows.lg,
  },
  priceLabel: { fontSize: typography.sizes.xs, color: colors.slate, marginBottom: 4 },
  continueBtn: {
    backgroundColor: colors.primary, borderRadius: 28,
    paddingVertical: 14, paddingHorizontal: spacing.xl,
    ...shadows.md,
  },
  continueBtnText: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white },
});
