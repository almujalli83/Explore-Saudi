import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// On web, Dimensions returns the full browser window width; cap to mobile viewport
export const SCREEN_WIDTH = Platform.OS === 'web' ? Math.min(width, 430) : width;
export const SCREEN_HEIGHT = height;
export const IS_SMALL_DEVICE = width < 375;

export const CARD_WIDTH = SCREEN_WIDTH - 32;
export const CARD_HEIGHT = CARD_WIDTH * 0.6;

export const TAB_BAR_HEIGHT = 85;
export const HEADER_HEIGHT = 100;
