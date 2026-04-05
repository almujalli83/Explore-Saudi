import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImageCarousel from '../../components/common/ImageCarousel';
import Button from '../../components/common/Button';
import RatingStars from '../../components/common/RatingStars';
import PriceBadge from '../../components/common/PriceBadge';
import Badge from '../../components/common/Badge';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { attractions } from '../../services/mockData/attractions';

export default function AttractionDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const attraction = attractions.find((a) => a.id === route.params?.id);

  if (!attraction) {
    return (
      <View style={styles.center}>
        <Text>Attraction not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <ImageCarousel images={attraction.images} height={300} autoPlay />

        {/* Back Button Overlay */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'\u2190'}</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{attraction.name}</Text>
              <Text style={styles.nameAr}>{attraction.nameAr}</Text>
            </View>
            {attraction.isFeatured && <Badge text="Featured" variant="featured" />}
          </View>

          {/* Meta */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>{'\uD83D\uDCCD'}</Text>
              <Text style={styles.metaText}>{attraction.city}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>{'\uD83D\uDD52'}</Text>
              <Text style={styles.metaText}>{attraction.openingHours}</Text>
            </View>
          </View>

          {/* Rating & Price */}
          <View style={styles.ratingPriceRow}>
            <View>
              <RatingStars rating={attraction.rating} showCount count={attraction.reviewCount} />
              <Text style={styles.ratingNum}>{attraction.rating.toFixed(1)} out of 5</Text>
            </View>
            <PriceBadge price={attraction.price} size="lg" />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{attraction.description}</Text>
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{attraction.category}</Text>
              </View>
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationCard}>
              <Text style={styles.locationIcon}>{'\uD83D\uDDFA\uFE0F'}</Text>
              <View>
                <Text style={styles.locationName}>{attraction.city}, Saudi Arabia</Text>
                <Text style={styles.locationCoords}>
                  {attraction.latitude.toFixed(4)}, {attraction.longitude.toFixed(4)}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Entry Fee</Text>
          <PriceBadge price={attraction.price} size="lg" />
        </View>
        <Button
          title={attraction.price === 0 ? 'Visit Now' : 'Book Ticket'}
          onPress={() => {
            Alert.alert(
              attraction.price === 0 ? 'Directions' : 'Booking Confirmed',
              attraction.price === 0
                ? `Opening Maps to ${attraction.name}, ${attraction.city}...`
                : `Your ticket for ${attraction.name} has been booked!\n\nEntry fee: ${attraction.price} SAR\nLocation: ${attraction.city}`,
              [{ text: 'OK' }]
            );
          }}
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backBtn: {
    position: 'absolute', top: 50, left: spacing.md,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center',
    ...shadows.small,
  },
  backIcon: { fontSize: 20, color: colors.charcoal },
  content: { padding: spacing.md },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontSize: typography.sizes.xl, fontWeight: '700', color: colors.charcoal, flex: 1 },
  nameAr: { fontSize: typography.sizes.md, color: colors.slate, marginTop: 4 },
  metaRow: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaIcon: { fontSize: 16, marginRight: spacing.xs },
  metaText: { fontSize: typography.sizes.sm, color: colors.slate },
  ratingPriceRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: spacing.md, paddingVertical: spacing.md,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.pearl,
  },
  ratingNum: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 4 },
  section: { marginTop: spacing.lg },
  sectionTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal, marginBottom: spacing.sm },
  description: { fontSize: typography.sizes.md, color: colors.slate, lineHeight: 24 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: {
    backgroundColor: colors.pearl, paddingVertical: spacing.xs + 2, paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  tagText: { fontSize: typography.sizes.sm, color: colors.charcoal, fontWeight: '500', textTransform: 'capitalize' },
  locationCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.pearl, borderRadius: borderRadius.md, padding: spacing.md,
  },
  locationIcon: { fontSize: 28 },
  locationName: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.charcoal },
  locationCoords: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 2 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.white, padding: spacing.md, paddingBottom: spacing.xl,
    borderTopWidth: 1, borderTopColor: colors.pearl,
    ...shadows.large,
  },
  bottomLabel: { fontSize: typography.sizes.xs, color: colors.slate, marginBottom: 4 },
});
