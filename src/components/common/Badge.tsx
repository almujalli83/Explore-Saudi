import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, typography, spacing, borderRadius } from '../../constants/theme';

type BadgeVariant = 'trending' | 'soldOut' | 'new' | 'featured' | 'discount';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'new',
  size = 'sm',
}) => {
  const sizeStyles: Record<BadgeSize, { paddingV: number; paddingH: number; fontSize: number }> = {
    sm: {
      paddingV: spacing.xs - 1,
      paddingH: spacing.sm,
      fontSize: typography.sizes.xs,
    },
    md: {
      paddingV: spacing.xs + 1,
      paddingH: spacing.sm + 4,
      fontSize: typography.sizes.sm,
    },
  };

  const variantColors: Record<Exclude<BadgeVariant, 'featured'>, string> = {
    trending: colors.sand,
    soldOut: colors.error,
    new: colors.teal,
    discount: colors.success,
  };

  const containerStyle: ViewStyle = {
    paddingVertical: sizeStyles[size].paddingV,
    paddingHorizontal: sizeStyles[size].paddingH,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  };

  // Featured variant uses a gradient background
  if (variant === 'featured') {
    return (
      <LinearGradient
        colors={[gradients.goldGradient[0], gradients.goldGradient[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.badge, containerStyle]}
      >
        <Text style={[styles.text, { fontSize: sizeStyles[size].fontSize }]}>
          {text}
        </Text>
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.badge,
        containerStyle,
        { backgroundColor: variantColors[variant] },
      ]}
    >
      <Text style={[styles.text, { fontSize: sizeStyles[size].fontSize }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});

export default Badge;
