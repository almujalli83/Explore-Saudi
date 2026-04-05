import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onPress: () => void;
  icon?: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({
  label,
  isActive = false,
  onPress,
  icon,
}) => {
  const bgAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: isActive ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isActive, bgAnim]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.pearl, colors.sand],
  });

  const textColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.slate, colors.white],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[styles.pill, { backgroundColor }]}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Animated.Text style={[styles.label, { color: textColor }]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 4,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  icon: {
    fontSize: 14,
    marginRight: spacing.xs + 2,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default CategoryPill;
