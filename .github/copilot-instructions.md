# Copilot Instructions for Guitar App

## Project Overview

This is a Digital SongBook App built with **Expo 54** and **React Native 0.81** using **file-based routing** via `expo-router`. The MVP focuses on song display with chords, favorites management, and artist filtering for musicians.

## Architecture & Key Patterns

### File-based Routing Structure

- `app/_layout.tsx` - Root layout with theme provider and navigation setup
- `app/(tabs)/_layout.tsx` - Tab navigation using Expo Router tabs
- `app/(tabs)/index.tsx` - Home screen
- `app/(tabs)/explore.tsx` - Explore/secondary screen
- `app/modal.tsx` - Modal presentation screen

Routes are automatically generated from file structure. Use `(tabs)` folder for tab-based screens.

### Platform-Specific Components Pattern

The app uses platform-specific file extensions for cross-platform compatibility:

- `icon-symbol.tsx` - Default/Android/Web implementation using Material Icons
- `icon-symbol.ios.tsx` - iOS-specific implementation using SF Symbols
- Both files export the same `IconSymbol` interface but with different underlying implementations

### Theme System

- **Colors**: Defined in `constants/theme.ts` with light/dark mode support
- **Themed Components**: Use `ThemedText` and `ThemedView` components instead of base React Native components
- **Typography**: Platform-specific font stacks in `Fonts` object (iOS system fonts, web font stacks)
- **Hook**: `useThemeColor` for accessing theme colors in custom components

### Development Workflows

#### Essential Commands

```bash
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios           # Run on iOS
npm run web           # Run on web
npm run reset-project # Clean slate (moves current app to app-example)
npm run lint          # ESLint with Expo config
```

#### Project Structure Conventions

- `@/` - Absolute import alias for root directory
- `components/ui/` - Reusable UI components
- `components/` - App-specific components
- `hooks/` - Custom React hooks
- `constants/` - App constants (theme, etc.)
- `assets/images/` - Static image assets

### Key Dependencies & Features

- **Navigation**: React Navigation v7 with expo-router v6 file-based routing
- **Animations**: react-native-reanimated v4 (worklets enabled)
- **Icons**: SF Symbols (iOS) + Material Icons (Android/Web) via platform files
- **Images**: expo-image for optimized image handling
- **Haptics**: expo-haptics for tactile feedback (see `HapticTab` component)

### Configuration Notes

- **New Architecture**: Enabled in `app.json` (`newArchEnabled: true`)
- **Typed Routes**: Experimental feature enabled for type-safe navigation
- **React Compiler**: Experimental optimization enabled
- **Edge-to-Edge**: Android edge-to-edge display enabled

### Song App Specific Context

Per README.md, this will become a songbook app with:

1. Song list with filtering by artist
2. Chord display above lyrics
3. Favorites management with AsyncStorage
4. Focus on musician-friendly UX

When implementing song features, consider chord formatting patterns and readable text display for performance use.
