import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, typography, spacing, borderRadius } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: {
        paddingVertical: spacing.xs + 2,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
      },
      text: {
        fontSize: typography.sizes.sm,
      },
    },
    md: {
      container: {
        paddingVertical: spacing.sm + 4,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
      },
      text: {
        fontSize: typography.sizes.md,
      },
    },
    lg: {
      container: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.lg,
      },
      text: {
        fontSize: typography.sizes.lg,
      },
    },
  };

  const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    primary: {
      container: {},
      text: {
        color: colors.white,
      },
    },
    secondary: {
      container: {
        backgroundColor: colors.teal,
      },
      text: {
        color: colors.white,
      },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.sand,
      },
      text: {
        color: colors.sand,
      },
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: colors.sand,
      },
    },
  };

  const disabledOpacity = disabled ? 0.5 : 1;

  const renderContent = () => (
    <View style={[styles.contentRow, { opacity: disabledOpacity }]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.sand : colors.white}
        />
      ) : (
        <>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <Text
            style={[
              styles.text,
              sizeStyles[size].text,
              variantStyles[variant].text,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </View>
  );

  const containerStyle: ViewStyle[] = [
    styles.container,
    sizeStyles[size].container,
    variantStyles[variant].container,
    fullWidth ? styles.fullWidth : {},
  ];

  if (variant === 'primary') {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }], alignSelf: fullWidth ? 'stretch' : 'auto' }}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[gradients.goldGradient[0], gradients.goldGradient[1], gradients.goldGradient[2]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.container,
              sizeStyles[size].container,
              fullWidth ? styles.fullWidth : {},
            ]}
          >
            {renderContent()}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], alignSelf: fullWidth ? 'stretch' : 'auto' }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={containerStyle}
      >
        {renderContent()}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  iconWrapper: {
    marginRight: spacing.xs + 2,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;
