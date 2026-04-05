import { Platform } from 'react-native';

export const colors = {
  sand: '#D4A853',
  sandLight: '#E8CC8C',
  sandDark: '#B8922E',
  teal: '#0A6E6E',
  tealLight: '#1A9E9E',
  tealDark: '#064D4D',
  charcoal: '#1A1A2E',
  slate: '#4A4A5A',
  pearl: '#F5F0E8',
  cream: '#FDF8F0',
  white: '#FFFFFF',
  success: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
} as const;

export const gradients = {
  goldGradient: ['#D4A853', '#E8CC8C', '#B8922E'] as const,
  tealGradient: ['#064D4D', '#0A6E6E', '#1A9E9E'] as const,
  nightGradient: ['#1A1A2E', '#2D2D44', '#4A4A5A'] as const,
  sunsetGradient: ['#D4A853', '#E74C3C', '#1A1A2E'] as const,
} as const;

export const typography = {
  fontFamily: {
    regular: 'System',
    semibold: 'System',
    bold: 'System',
  },
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 36,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const shadows = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: {
      elevation: 5,
    },
    default: {},
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
    },
    android: {
      elevation: 10,
    },
    default: {},
  }),
} as const;
