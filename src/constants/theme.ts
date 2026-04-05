import { Platform } from 'react-native';

// Design system inspired by mt.gov.sa (Saudi Ministry of Tourism)
// Font: FS Albert Pro / FS Albert Arabic
// Primary: Purple (#846edb) — links, CTAs, focus
// Secondary: Lime (#d7f285) — highlights, badges
// Dark: Deep green-black (#051f1f) — body text, headers
// SlateGreen: (#053333) — dark backgrounds, cards
// Success: Emerald (#2fba89) — confirmations
// Info: Mint (#82d9bf) — info, accents
// Warning: Amber (#ffb752)
// Danger: Crimson (#962640)

export const colors = {
  // Primary brand
  primary: '#846edb',
  primaryLight: '#b5a8e9',
  primaryDark: '#6a58af',

  // Secondary / accent
  secondary: '#d7f285',
  secondaryDark: '#b5cc5e',

  // Greens (signature mt.gov.sa)
  teal: '#053333',
  tealLight: '#214242',
  tealDark: '#051f1f',

  // Mint / info accent
  mint: '#82d9bf',
  mintLight: '#b4e8d9',

  // Neutrals
  charcoal: '#051f1f',
  slate: '#547070',
  pearl: '#e6ebeb',
  cream: '#f8f9fa',
  white: '#FFFFFF',

  // Semantic
  success: '#2fba89',
  warning: '#ffb752',
  error: '#962640',
  info: '#82d9bf',

  // Legacy aliases (ease migration)
  sand: '#846edb',
  sandLight: '#b5a8e9',
  sandDark: '#6a58af',
} as const;

export const gradients = {
  goldGradient: ['#846edb', '#b5a8e9', '#6a58af'] as const,
  tealGradient: ['#051f1f', '#053333', '#214242'] as const,
  nightGradient: ['#051f1f', '#053333', '#547070'] as const,
  sunsetGradient: ['#846edb', '#82d9bf', '#053333'] as const,
  // mt.gov.sa signature animated gradient
  mtGovGradient: ['#003232', '#009696', '#007846', '#00a000'] as const,
  // Purple to mint
  primaryGradient: ['#6a58af', '#846edb', '#b5a8e9'] as const,
  // Success gradient
  successGradient: ['#2fba89', '#82d9bf'] as const,
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
      shadowColor: '#030f0f',
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
      shadowColor: '#030f0f',
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
      shadowColor: '#030f0f',
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
