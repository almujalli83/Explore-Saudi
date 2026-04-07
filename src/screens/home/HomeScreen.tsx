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
import Badge from '../../components/common/Badge';
import RatingStars from '../../components/common/RatingStars';
import { useAuthStore } from '../../store/useAuthStore';
import { useWalletStore } from '../../store/useWalletStore';
import { attractions } from '../../services/mockData/attractions';
import { entertainmentEvents } from '../../services/mockData/entertainment';
import { restaurants } from '../../services/mockData/restaurants';
import { prayerTimes } from '../../services/mockData/prayerTimes';
import { formatCurrency } from '../../utils/formatters';

const QUICK_ACTIONS = [
  { id: '1', icon: '🧭', label: 'Explore', tab: 'ExploreTab', route: 'Explore' },
  { id: '2', icon: '🏨', label: 'Hotels', tab: 'ExploreTab', route: 'Accommodation' },
  { id: '3', icon: '🍽️', label: 'Dining', tab: 'ExploreTab', route: 'Dining' },
  { id: '4', icon: '🎭', label: 'Events', tab: 'ExploreTab', route: 'Entertainment' },
];

const EXPLORE_CATEGORIES = [
  { id: '1', icon: '🎭', label: 'Events', route: 'Entertainment', gradient: ['#0f4522', '#1b6b3a'] as const },
  { id: '2', icon: '🍽️', label: 'Dining', route: 'Dining', gradient: ['#962640', '#cf6d84'] as const },
  { id: '3', icon: '🛍️', label: 'Shopping', route: 'Shopping', gradient: ['#053333', '#214242'] as const },
  { id: '4', icon: '🏨', label: 'Hotels', route: 'Accommodation', gradient: ['#c8a84b', '#a07830'] as const },
];

const QUICK_SERVICES = [
  { id: '1', icon: '🕌', label: 'Prayer Times', route: 'PrayerTimes', tab: 'ExploreTab' },
  { id: '2', icon: '🚇', label: 'Transport', route: 'Transport', tab: 'ServicesTab' },
  { id: '3', icon: '🤖', label: 'AI Planner', route: 'AITripPlanner', tab: 'ExploreTab' },
  { id: '4', icon: '📖', label: 'Culture', route: 'CulturalGuide', tab: 'ExploreTab' },
  { id: '5', icon: '📄', label: 'Documents', route: 'DigitalDocuments', tab: 'ProfileTab' },
  { id: '6', icon: '🆘', label: 'Emergency', route: 'EmergencySOS', tab: 'ServicesTab' },
  { id: '7', icon: '🗺️', label: 'Maps', route: 'OfflineMaps', tab: 'ServicesTab' },
  { id: '8', icon: '🛡️', label: 'Insurance', route: 'Insurance', tab: 'ServicesTab' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const balance = useWalletStore((s) => s.balance);
  const featuredAttractions = attractions.filter((a) => a.isFeatured).slice(0, 5);
  const trendingEvents = entertainmentEvents.filter((e) => e.isTrending).slice(0, 3);
  const featuredRestaurants = restaurants.filter((r) => r.isFeatured).slice(0, 4);
  const nextPrayer = prayerTimes.find((p) => p.isNext);

  const login = useAuthStore((s) => s.login);
  React.useEffect(() => {
    if (!user) login('demo', 'demo');
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient colors={['#1b6b3a', '#0f4522']} style={styles.avatarSmall}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) ?? 'T'}</Text>
            </LinearGradient>
            <View>
              <Text style={styles.greeting}>Marhaba! 👋</Text>
              <Text style={styles.userName}>{user?.name ?? 'Traveler'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.notifIcon}>🔔</Text>
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* ── HERO: Discover the Kingdom ── */}
        <View style={styles.heroWrap}>
          <LinearGradient
            colors={['#0f4522', '#1b6b3a', '#2d8f55']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            {/* Decorative circles */}
            <View style={styles.heroCircle1} />
            <View style={styles.heroCircle2} />

            <View style={styles.heroContent}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>🇸🇦  KINGDOM OF SAUDI ARABIA</Text>
              </View>
              <Text style={styles.heroTitle}>Discover{'\n'}the Kingdom</Text>
              <Text style={styles.heroSubtitle}>Ancient heritage meets modern luxury</Text>

              {/* Stats row */}
              <View style={styles.heroStats}>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNum}>5,000+</Text>
                  <Text style={styles.heroStatLabel}>Attractions</Text>
                </View>
                <View style={styles.heroStatDiv} />
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNum}>100+</Text>
                  <Text style={styles.heroStatLabel}>Cities</Text>
                </View>
                <View style={styles.heroStatDiv} />
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNum}>1M+</Text>
                  <Text style={styles.heroStatLabel}>Visitors</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.heroBtn}
                onPress={() => navigation.getParent()?.navigate('ExploreTab')}
              >
                <Text style={styles.heroBtnText}>Start Exploring →</Text>
              </TouchableOpacity>
            </View>

            {/* Right decoration */}
            <View style={styles.heroRight}>
              <Text style={styles.heroEmoji}>🕌</Text>
              <Text style={styles.heroEmoji2}>🌴</Text>
            </View>
          </LinearGradient>
        </View>

        {/* ── Quick Action Pills ── */}
        <View style={styles.quickActionRow}>
          {QUICK_ACTIONS.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={styles.quickActionPill}
              onPress={() => navigation.getParent()?.navigate(a.tab, { screen: a.route })}
            >
              <Text style={styles.quickActionIcon}>{a.icon}</Text>
              <Text style={styles.quickActionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Wallet + Prayer Row ── */}
        <View style={styles.dualRow}>
          <TouchableOpacity style={styles.walletMini} onPress={() => navigation.getParent()?.navigate('WalletTab')}>
            <LinearGradient colors={['#0f4522', '#1b6b3a']} style={styles.walletMiniGradient}>
              <Text style={styles.walletMiniLabel}>My Wallet</Text>
              <Text style={styles.walletMiniBalance}>{formatCurrency(balance)}</Text>
              <View style={styles.walletMiniActions}>
                <View style={styles.walletDot} />
                <Text style={styles.walletMiniAction}>Tap to manage</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.prayerMini}
            onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'PrayerTimes' })}
          >
            <View style={styles.prayerMiniInner}>
              <Text style={styles.prayerMiniIcon}>🕌</Text>
              <Text style={styles.prayerMiniLabel}>Next Prayer</Text>
              {nextPrayer ? (
                <>
                  <Text style={styles.prayerMiniName}>{nextPrayer.name}</Text>
                  <Text style={styles.prayerMiniTime}>{nextPrayer.time}</Text>
                </>
              ) : (
                <Text style={styles.prayerMiniName}>--:--</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Explore Categories ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <View style={styles.categoryRow}>
            {EXPLORE_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: cat.route })}
              >
                <LinearGradient colors={cat.gradient} style={styles.categoryGradient}>
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Must-Visit Places ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Must-Visit Places</Text>
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
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.78)']} style={styles.attractionOverlay}>
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

        {/* ── Trending Events ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Events</Text>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'Entertainment' })}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trendingEvents}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.eventCard}
                onPress={() => navigation.getParent()?.navigate('ExploreTab', { screen: 'EventDetail', params: { id: item.id } })}
              >
                <Image source={{ uri: item.images[0] }} style={styles.eventImage} contentFit="cover" transition={200} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.82)']} style={styles.eventOverlay}>
                  <Badge text="Trending" variant="trending" size="sm" />
                  <Text style={styles.eventName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.eventVenue} numberOfLines={1}>{item.venue} · {item.city}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── Popular Restaurants ── */}
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
                <Image source={{ uri: item.images[0] }} style={styles.restaurantImage} contentFit="cover" transition={200} />
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

        {/* ── Quick Services Grid ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <View style={styles.servicesGrid}>
            {QUICK_SERVICES.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceItem}
                onPress={() => navigation.getParent()?.navigate(service.tab, { screen: service.route })}
              >
                <LinearGradient
                  colors={service.id === '5' ? ['#0f4522', '#1b6b3a'] : ['#ffffff', '#f0f5f0']}
                  style={styles.serviceIconWrap}
                >
                  <Text style={styles.serviceIcon}>{service.icon}</Text>
                </LinearGradient>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_GAP = spacing.sm;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  container: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.sm,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatarSmall: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '700', color: colors.white },
  greeting: { fontSize: typography.sizes.sm, color: colors.slate },
  userName: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal },
  notifBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', ...shadows.small,
  },
  notifIcon: { fontSize: 20 },
  notifDot: {
    position: 'absolute', top: 8, right: 10,
    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.error,
  },

  // Hero
  heroWrap: { paddingHorizontal: spacing.md, marginTop: spacing.sm },
  heroCard: {
    borderRadius: borderRadius.xl, padding: spacing.lg,
    flexDirection: 'row', overflow: 'hidden', minHeight: 210,
    position: 'relative',
  },
  heroCircle1: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.05)', top: -60, right: -40,
  },
  heroCircle2: {
    position: 'absolute', width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(200,168,75,0.12)', bottom: -30, left: '40%',
  },
  heroContent: { flex: 1, justifyContent: 'space-between', zIndex: 1 },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(200,168,75,0.25)',
    paddingVertical: 4, paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  heroBadgeText: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.goldLight, letterSpacing: 0.5 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: colors.white, lineHeight: 34, marginTop: spacing.sm },
  heroSubtitle: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.7)', marginTop: spacing.xs },
  heroStats: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
  heroStat: { alignItems: 'center' },
  heroStatNum: { fontSize: typography.sizes.md, fontWeight: '800', color: colors.goldLight },
  heroStatLabel: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.65)' },
  heroStatDiv: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: spacing.md },
  heroBtn: {
    alignSelf: 'flex-start', marginTop: spacing.md,
    backgroundColor: colors.gold, paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  heroBtnText: { fontSize: typography.sizes.sm, fontWeight: '700', color: colors.tealDark },
  heroRight: { width: 70, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  heroEmoji: { fontSize: 44 },
  heroEmoji2: { fontSize: 30, marginTop: spacing.xs },

  // Quick Action Pills
  quickActionRow: {
    flexDirection: 'row', paddingHorizontal: spacing.md,
    marginTop: spacing.md, gap: spacing.sm,
  },
  quickActionPill: {
    flex: 1, alignItems: 'center', paddingVertical: spacing.sm,
    backgroundColor: colors.white, borderRadius: borderRadius.lg,
    borderWidth: 1, borderColor: colors.pearl, ...shadows.small,
  },
  quickActionIcon: { fontSize: 22 },
  quickActionLabel: { fontSize: typography.sizes.xs, fontWeight: '600', color: colors.charcoal, marginTop: 4 },

  // Wallet + Prayer Row
  dualRow: { flexDirection: 'row', paddingHorizontal: spacing.md, marginTop: spacing.md, gap: CARD_GAP },
  walletMini: { flex: 3, borderRadius: borderRadius.lg, overflow: 'hidden', ...shadows.medium },
  walletMiniGradient: { padding: spacing.md, borderRadius: borderRadius.lg },
  walletMiniLabel: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.7)' },
  walletMiniBalance: { fontSize: typography.sizes.xl, fontWeight: '800', color: colors.white, marginTop: 2 },
  walletMiniActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm },
  walletDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.goldLight },
  walletMiniAction: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.6)' },
  prayerMini: { flex: 2, borderRadius: borderRadius.lg, overflow: 'hidden', ...shadows.small },
  prayerMiniInner: {
    flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.lg,
    padding: spacing.md, alignItems: 'center', justifyContent: 'center',
  },
  prayerMiniIcon: { fontSize: 24 },
  prayerMiniLabel: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 4 },
  prayerMiniName: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.charcoal, marginTop: 2 },
  prayerMiniTime: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.primary, marginTop: 2 },

  // Explore Categories
  categoryRow: { flexDirection: 'row', paddingHorizontal: spacing.md, gap: CARD_GAP },
  categoryCard: { flex: 1, borderRadius: borderRadius.lg, overflow: 'hidden', ...shadows.small },
  categoryGradient: { paddingVertical: spacing.lg, alignItems: 'center', justifyContent: 'center', borderRadius: borderRadius.lg },
  categoryIcon: { fontSize: 28 },
  categoryLabel: { fontSize: typography.sizes.xs, fontWeight: '700', color: colors.white, marginTop: spacing.xs },

  // Sections
  section: { marginTop: spacing.lg },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  sectionTitle: { fontSize: typography.sizes.lg, fontWeight: '700', color: colors.charcoal, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  seeAll: { fontSize: typography.sizes.sm, color: colors.primary, fontWeight: '600' },
  horizontalList: { paddingLeft: spacing.md, paddingRight: spacing.sm },

  // Attraction Cards
  attractionCard: {
    width: 260, height: 200, borderRadius: borderRadius.lg,
    marginRight: spacing.sm, overflow: 'hidden', ...shadows.medium,
  },
  attractionImage: { width: '100%', height: '100%' },
  attractionOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.sm + 4, paddingTop: spacing.xl },
  attractionName: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white, marginTop: spacing.xs },
  attractionMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  attractionCity: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.8)' },

  // Event Cards
  eventCard: {
    width: 210, height: 170, borderRadius: borderRadius.lg,
    marginRight: spacing.sm, overflow: 'hidden', ...shadows.medium,
  },
  eventImage: { width: '100%', height: '100%' },
  eventOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.sm + 4, paddingTop: spacing.xl },
  eventName: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.white, marginTop: spacing.xs },
  eventVenue: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.75)', marginTop: 2 },

  // Restaurant Cards
  restaurantCard: {
    width: 170, borderRadius: borderRadius.lg, backgroundColor: colors.white,
    marginRight: spacing.sm, overflow: 'hidden', ...shadows.small,
  },
  restaurantImage: { width: '100%', height: 110 },
  restaurantInfo: { padding: spacing.sm },
  restaurantName: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.charcoal },
  restaurantCuisine: { fontSize: typography.sizes.xs, color: colors.slate, marginTop: 2 },
  restaurantMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  restaurantPrice: { fontSize: typography.sizes.sm, color: colors.primary, fontWeight: '600' },

  // Quick Services Grid
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.md },
  serviceItem: {
    width: '23%', marginRight: '2%', marginBottom: spacing.sm,
    alignItems: 'center', paddingVertical: spacing.sm,
  },
  serviceIconWrap: {
    width: 50, height: 50, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs,
    ...shadows.small,
  },
  serviceIcon: { fontSize: 22 },
  serviceLabel: { fontSize: typography.sizes.xs, color: colors.charcoal, fontWeight: '500', textAlign: 'center' },
});
