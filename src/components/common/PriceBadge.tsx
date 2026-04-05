import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

type PriceSize = 'sm' | 'md' | 'lg';

interface PriceBadgeProps {
  price: number;
  currency?: string;
  originalPrice?: number;
  size?: PriceSize;
}

const PriceBadge: React.FC<PriceBadgeProps> = ({
  price,
  currency = 'SAR',
  originalPrice,
  size = 'md',
}) => {
  const sizeStyles: Record<PriceSize, { price: number; original: number; free: number }> = {
    sm: {
      price: typography.sizes.sm,
      original: typography.sizes.xs,
      free: typography.sizes.xs,
    },
    md: {
      price: typography.sizes.lg,
      original: typography.sizes.sm,
      free: typography.sizes.sm,
    },
    lg: {
      price: typography.sizes.xl,
      original: typography.sizes.md,
      free: typography.sizes.md,
    },
  };

  if (price === 0) {
    return (
      <View style={styles.freeBadge}>
        <Text style={[styles.freeText, { fontSize: sizeStyles[size].free }]}>
          Free
        </Text>
      </View>
    );
  }

  const hasDiscount = originalPrice != null && originalPrice > price;

  return (
    <View style={styles.container}>
      {hasDiscount && (
        <Text style={[styles.originalPrice, { fontSize: sizeStyles[size].original }]}>
          {currency} {originalPrice.toLocaleString()}
        </Text>
      )}
      <Text style={[styles.price, { fontSize: sizeStyles[size].price }]}>
        {currency} {price.toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs + 2,
  },
  price: {
    fontWeight: '700',
    color: colors.charcoal,
  },
  originalPrice: {
    color: colors.slate,
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  freeBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  freeText: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default PriceBadge;
