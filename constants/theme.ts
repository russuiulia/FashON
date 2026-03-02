/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#8B6914'; // warm antique gold
const tintColorDark = '#C9A84C';  // polished gold

export const Colors = {
  light: {
    text: '#2C1F14',           // deep espresso brown — rich, readable
    background: '#F9F3EC',     // your warm cream base
    tint: tintColorLight,      // antique gold for interactive elements
    icon: '#9C7D5A',           // warm caramel — softer than pure grey
    tabIconDefault: '#9C7D5A', // caramel for inactive tabs
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F0E6D6',           // warm parchment — cream instead of cold white
    background: '#1C1510',     // deep espresso — warm dark, not blue-black
    tint: tintColorDark,       // polished gold pops on dark
    icon: '#7A6248',           // muted bronze for inactive icons
    tabIconDefault: '#7A6248', // muted bronze
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});