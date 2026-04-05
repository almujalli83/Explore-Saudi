import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImageCarousel from '../../components/common/ImageCarousel';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import PriceBadge from '../../components/common/PriceBadge';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { entertainmentVenues } from '../../services/mockData/entertainment';

export default function VenueDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const venue = entertainmentVenues.find((v) => v.id === route.params?.id);

  if (!venue) return <View style={styles.center}><Text>Venue not found</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageCarousel images={venue.images} height={280} />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'\u2190'}</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.name}>{venue.name}</Text>
          <Text style={styles.nameAr}>{venue.nameAr}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>{'\uD83D\uDCCD'} {venue.city}</Text>
            <Text style={styles.metaItem}>{'\u2605'} {venue.rating}</Text>
            <Text style={styles.metaItem}>{'\uD83D\uDD52'} {venue.openingHours}</Text>
          </View>

          <Text style={styles.description}>{venue.description}</Text>

          {/* Features */}
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureGrid}>
            {venue.features.map((f) => (
              <View key={f} style={styles.featureTag}>
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Tickets */}
          <Text style={styles.sectionTitle}>Tickets</Text>
          {venue.ticketTypes.map((ticket) => (
            <Card key={ticket.id} variant="outlined" style={styles.ticketCard}>
              <View style={styles.ticketRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.ticketName}>{ticket.name}</Text>
                  <Text style={styles.ticketDesc}>{ticket.description}</Text>
                </View>
                <View style={styles.ticketRight}>
                  <PriceBadge price={ticket.price} size="md" />
                  <Button title="Select" onPress={() => {}} size="sm" />
                </View>
              </View>
            </Card>
          ))}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
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
  name: { fontSize: typography.sizes.xl, fontWeight: '700', color: colors.charcoal },
  nameAr: { fontSize: typography.sizes.md, color: colors.slate, marginTop: 4 },
  metaRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  metaItem: { fontSize: typography.sizes.sm, color: colors.slate },
  description: { fontSize: typography.sizes.md, color: colors.slate, lineHeight: 24, marginTop: spacing.md },
  sectionTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal, marginTop: spacing.lg, marginBottom: spacing.sm },
  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  featureTag: {
    backgroundColor: colors.pearl, paddingVertical: spacing.xs + 2, paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  featureText: { fontSize: typography.sizes.sm, color: colors.charcoal },
  ticketCard: { marginBottom: spacing.sm, padding: spacing.md },
  ticketRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ticketName: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.charcoal },
  ticketDesc: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 2 },
  ticketRight: { alignItems: 'flex-end', gap: spacing.sm },
});
