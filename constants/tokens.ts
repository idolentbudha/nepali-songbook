// Design tokens for consistent styling across the app
// Keep values simple and mobile-friendly. Extend cautiously.

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
  },
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    xs: 18,
    sm: 20,
    base: 24,
    lg: 26,
    xl: 28,
    "2xl": 32,
    "3xl": 36,
  },
} as const;

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

// Unified color tokens: palette + semantic (light/dark) in one object.
export const ColorTokens = {
  // Palette ramps
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  brand: {
    primary: "#0a7ea4",
    secondary: "#13658b",
  },
  feedback: {
    success: "#16A34A",
    warning: "#D97706",
    danger: "#DC2626",
    info: "#2563EB",
  },
  // Base semantic surfaces (non-mode-specific)
  base: {
    surface: "#FFFFFF",
    surfaceAlt: "#F3F4F6",
    surfaceDark: "#151718",
    border: "#E5E7EB",
    borderDark: "#2A2F33",
    overlay: "rgba(0,0,0,0.4)",
  },
  // Mode-specific semantic intentions
  light: {
    primary: "#0a7ea4",
    primaryForeground: "#FFFFFF",
    secondary: "#13658b",
    secondaryForeground: "#FFFFFF",
    accent: "#FFB300",
    accentForeground: "#1F2937",
    success: "#16A34A",
    danger: "#DC2626",
    warning: "#D97706",
    info: "#2563EB",
    background: "#FFFFFF",
    backgroundAlt: "#F9FAFB",
    surface: "#FFFFFF",
    surfaceAlt: "#F3F4F6",
    surfaceElevated: "#FFFFFF",
    border: "#E5E7EB",
    borderStrong: "#D1D5DB",
    text: "#11181C",
    textMuted: "#6B7280",
    overlay: "rgba(0,0,0,0.4)",
  },
  dark: {
    primary: "#ffffff",
    primaryForeground: "#000000",
    secondary: "#0a7ea4",
    secondaryForeground: "#FFFFFF",
    accent: "#F59E0B",
    accentForeground: "#000000",
    success: "#22C55E",
    danger: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
    background: "#151718",
    backgroundAlt: "#1F2325",
    surface: "#1F2325",
    surfaceAlt: "#24282B",
    surfaceElevated: "#2A2F33",
    border: "#2A2F33",
    borderStrong: "#374151",
    text: "#ECEDEE",
    textMuted: "#9CA3AF",
    overlay: "rgba(0,0,0,0.55)",
  },
} as const;

// Backwards-compatible aliases (if any code still imports Color / SemanticColor)
export const Color = ColorTokens; // palette + semantic combined
export const SemanticColor = {
  light: ColorTokens.light,
  dark: ColorTokens.dark,
} as const;

// Types
export type ColorTokensType = typeof ColorTokens;
export type SemanticColorTokens = typeof ColorTokens.light;
export type ColorRamp = typeof ColorTokens.gray;
export type BrandColors = typeof ColorTokens.brand;
export type FeedbackColors = typeof ColorTokens.feedback;
export type BaseSemanticColors = typeof ColorTokens.base;
