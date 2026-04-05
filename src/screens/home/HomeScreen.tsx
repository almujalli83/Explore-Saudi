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
import { colors, gradients, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { SCREEN_WIDTH } from '../../constants/layout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import RatingStars from '../../components/common/RatingStars';
import GradientCard from '../../components/common/GradientCard';
import { useAuthStore } from '../../store/useAuthStore';
import { useWalletStore } from '../../store/useWalletStore';
import { attractions } from '../../services/mockData/attractions';
import { entertainmentEvents } from '../../services/mockData/entertainment';
import { restaurants } from '../../services/mockData/restaurants';
import { prayerTimes } from '../../services/mockData/prayerTimes';
import { formatCurrency } from '../../utils/formatters';

const QUICK_ACTIONS = [
  { id: '1', icon: '🎭', label: 'Entertainment', route: 'Entertainment' },
  { id: '2', icon: '🍽️', label: 'Dining', route: 'Dining' },
  { id: '3', icon: '🛍️', label: 'Shopping', route: 'Shopping' },
  { id: '4', icon: '🏨', label: 'Hotels', route: 'Accommodation' },
  { id: '5', icon: '🕌', label: 'Prayer', route: 'PrayerTimes' },
  { id: '6', icon: '🚇', label: 'Transport', route: 'Transport' },
  { id: '7', icon: '🤖', label: 'AI Planner', route: 'AITripPlanner' },
  { id: '8', icon: '📖', label: 'Culture', route: 'CulturalGuide' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const balance = useWalletStore((s) => s.balance);
  const featuredAttractions = attractions.filter((a) => a.isFeatured).slice(0, 5);
  const trendingEvents = entertainmentEvents.filter((e) => e.isTrending).slice(0, 4);
  const featuredRestaurants = restaurants.filter((r) => r.isFeatured).slice(0, 4);
  const nextPrayer = prayerTimes.find((p) => p.isNext);

  // Auto-login for demo
  const login = useAuthStore((s) => s.login);
  React.useEffect(() => {
    if (!user) login('demo', 'demo');
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Marhaba! {'\u{1F44B}'}</Text>
            <Text style={styles.userName}>{user?.name ?? 'Traveler'}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.notifBtn}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Text style={styles.notifIcon}>{'\uD83D\uDD14'}</Text>
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Wallet Card */}
        <GradientCard
          colors={[...gradients.tealGradient]}
          style={styles.walletCard}
          onPress={() => navigation.getParent()?.navigate('WalletTab')}
        >
          <View style={styles.walletRow}>
            <View>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <Text style={styles.walletBalance}>{formatCurrency(balance)}</Text>
            </View>
            <View style={styles.walletActions}>
              <TouchableOpacity style={styles.walletAction}>
                <Text style={styles.walletActionIcon}>{'\u2795'}</Text>
                <Text style={styles.walletActionText}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.walletAction}>
                <Text style={styles.walletActionIcon}>{'\uD83D\uDCB3'}</Text>
                <Text style={styles.walletActionText}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GradientCard>

        {/* Prayer Time Banner */}
        {nextPrayer && (
          <TouchableOpacity
            style={styles.prayerBanner}
            onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'PrayerTimes' })}
          >
            <Text style={styles.prayerIcon}>{'\uD83D\uDD4C'}</Text>
            <View style={styles.prayerInfo}>
              <Text style={styles.prayerLabel}>Next Prayer</Text>
              <Text style={styles.prayerName}>{nextPrayer.name} - {nextPrayer.time}</Text>
            </View>
            <Text style={styles.prayerArrow}>{'\u203A'}</Text>
          </TouchableOpacity>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickAction}
                onPress={() => {
                  if (['Entertainment', 'Dining', 'Shopping', 'Accommodation', 'PrayerTimes', 'AITripPlanner', 'CulturalGuide'].includes(action.route)) {
                    navigation.getParent()?.navigate('ExploreTab', { screen: action.route });
                  } else if (action.route === 'Transport') {
                    navigation.getParent()?.navigate('ServicesTab', { screen: action.route });
                  }
                }}
              >
                <View style={styles.quickIconWrap}>
                  <Text style={styles.quickIcon}>{action.icon}</Text>
                </View>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Attractions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Attractions</Text>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredAttractions}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.attractionCard}
                onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'AttractionDetail', params: { id: item.id } })}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.attractionImage}
                  contentFit="cover"
                  placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
                  transition={300}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.attractionOverlay}
                >
                  <Badge text={item.category} variant="featured" size="sm" />
                  <Text style={styles.attractionName}>{item.name}</Text>
                  <View style={styles.attractionMeta}>
                    <RatingStars rating={item.rating} size="sm" />
                    <Text style={styles.attractionCity}>{item.city}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Trending Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Events</Text>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'Entertainment' })}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {trendingEvents.map((event) => (
            <Card
              key={event.id}
              variant="elevated"
              style={styles.eventCard}
              padding={0}
              onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'EventDetail', params: { id: event.id } })}
            >
              <View style={styles.eventRow}>
                <Image
                  source={{ uri: event.images[0] }}
                  style={styles.eventImage}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.eventInfo}>
                  <Badge text="Trending" variant="trending" size="sm" />
                  <Text style={styles.eventName} numberOfLines={1}>{event.name}</Text>
                  <Text style={styles.eventVenue} numberOfLines={1}>{event.venue}</Text>
                  <Text style={styles.eventDate}>{event.date} - {event.city}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Featured Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Restaurants</Text>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'Dining' })}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredRestaurants}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.restaurantCard}
                onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'RestaurantDetail', params: { id: item.id } })}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.restaurantImage}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
                  <View style={styles.restaurantMeta}>
                    <RatingStars rating={item.rating} size="sm" />
                    <Text style={styles.restaurantPrice}>{'$'.repeat(item.priceRange)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  greeting: { fontSize: typography.sizes.md, color: colors.slate },
  userName: { fontSize: typography.sizes.xl, fontWeight: '700', color: colors.charcoal, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  notifBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.pearl, alignItems: 'center', justifyContent: 'center',
  },
  notifIcon: { fontSize: 20 },
  notifDot: {
    position: 'absolute', top: 8, right: 10,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.error,
  },
  walletCard: { marginHorizontal: spacing.md, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletLabel: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.8)' },
  walletBalance: { fontSize: typography.sizes.hero, fontWeight: '700', color: colors.white, marginTop: 4 },
  walletActions: { flexDirection: 'row', gap: spacing.md },
  walletAction: { alignItems: 'center' },
  walletActionIcon: {
    fontSize: 20, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 40,
    overflow: 'hidden',
  },
  walletActionText: { fontSize: typography.sizes.xs, color: colors.white, marginTop: 4 },
  prayerBanner: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: spacing.md, marginTop: spacing.md,
    backgroundColor: colors.pearl, borderRadius: borderRadius.md,
    padding: spacing.sm + 4,
  },
  prayerIcon: { fontSize: 28, marginRight: spacing.sm },
  prayerInfo: { flex: 1 },
  prayerLabel: { fontSize: typography.sizes.xs, color: colors.slate },
  prayerName: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.charcoal },
  prayerArrow: { fontSize: 24, color: colors.slate },
  section: { marginTop: spacing.lg },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal,
    paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  seeAll: { fontSize: typography.sizes.sm, color: colors.sand, fontWeight: '600' },
  horizontalList: { paddingLeft: spacing.md, paddingRight: spacing.sm },
  attractionCard: {
    width: SCREEN_WIDTH * 0.7, height: 220, borderRadius: borderRadius.lg,
    marginRight: spacing.sm, overflow: 'hidden', ...shadows.medium,
  },
  attractionImage: { width: '100%', height: '100%' },
  attractionOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: spacing.sm + 4, paddingTop: spacing.xl,
  },
  attractionName: {
    fontSize: typography.sizes.md, fontWeight: '700', color: colors.white, marginTop: spacing.xs,
  },
  attractionMeta: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4,
  },
  attractionCity: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.8)' },
  eventCard: { marginHorizontal: spacing.md, marginBottom: spacing.sm },
  eventRow: { flexDirection: 'row' },
  eventImage: { width: 100, height: 100, borderRadius: borderRadius.md },
  eventInfo: { flex: 1, padding: spacing.sm, justifyContent: 'center' },
  eventName: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.charcoal, marginTop: 4 },
  eventVenue: { fontSize: typography.sizes.sm, color: colors.slate, marginTop: 2 },
  eventDate: { fontSize: typography.sizes.xs, color: colors.sand, fontWeight: '600', marginTop: 4 },
  restaurantCard: {
    width: 180, borderRadius: borderRadius.lg, backgroundColor: colors.white,
    marginRight: spacing.sm, overflow: 'hidden', ...shadows.small,
  },
  restaurantImage: { width: '100%', height: 120 },
  restaurantInfo: { padding: spacing.sm },
  restaurantName: { fontSize: typography.sizes.md, fontWeight: '600', color: colors.charcoal },
  restaurantCuisine: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 2 },
  restaurantMeta: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4,
  },
  restaurantPrice: { fontSize: typography.sizes.sm, color: colors.sand, fontWeight: '600' },
  quickGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.md, gap: spacing.sm,
  },
  quickAction: {
    width: (SCREEN_WIDTH - spacing.md * 2 - spacing.sm * 3) / 4,
    alignItems: 'center', paddingVertical: spacing.sm,
  },
  quickIconWrap: {
    width: 52, height: 52, borderRadius: 16, backgroundColor: colors.pearl,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs,
  },
  quickIcon: { fontSize: 24 },
  quickLabel: { fontSize: typography.sizes.xs, color: colors.charcoal, fontWeight: '500', textAlign: 'center' },
});
