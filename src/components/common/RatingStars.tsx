import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants/theme';

type StarSize = 'sm' | 'md';

interface RatingStarsProps {
  rating: number;
  size?: StarSize;
  showCount?: boolean;
  count?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = 'md',
  showCount = false,
  count = 0,
}) => {
  const clampedRating = Math.max(0, Math.min(5, rating));

  const sizeMap: Record<StarSize, { star: number; text: number }> = {
    sm: { star: 12, text: typography.sizes.xs },
    md: { star: 16, text: typography.sizes.sm },
  };

  const renderStars = () => {
    const stars: React.ReactNode[] = [];
    for (let i = 1; i <= 5; i++) {
      if (clampedRating >= i) {
        // Full star
        stars.push(
          <Text
            key={i}
            style={[styles.star, { fontSize: sizeMap[size].star, color: colors.sand }]}
          >
            {'\u2605'}
          </Text>
        );
      } else if (clampedRating >= i - 0.5) {
        // Half star - render a full star at half opacity over an empty star
        stars.push(
          <View key={i} style={styles.halfStarContainer}>
            <Text
              style={[styles.star, { fontSize: sizeMap[size].star, color: colors.pearl }]}
            >
              {'\u2605'}
            </Text>
            <View style={styles.halfStarOverlay}>
              <Text
                style={[styles.star, { fontSize: sizeMap[size].star, color: colors.sand }]}
                numberOfLines={1}
              >
                {'\u2605'}
              </Text>
            </View>
          </View>
        );
      } else {
        // Empty star
        stars.push(
          <Text
            key={i}
            style={[styles.star, { fontSize: sizeMap[size].star, color: colors.pearl }]}
          >
            {'\u2605'}
          </Text>
        );
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>{renderStars()}</View>
      {showCount && (
        <Text style={[styles.countText, { fontSize: sizeMap[size].text }]}>
          ({count.toLocaleString()})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 1,
  },
  halfStarContainer: {
    position: 'relative',
  },
  halfStarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    width: '50%',
  },
  countText: {
    color: colors.slate,
    marginLeft: spacing.xs,
  },
});

export default RatingStars;
