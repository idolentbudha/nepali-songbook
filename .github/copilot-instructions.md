# Copilot Instructions — nepali-songbook (Expo/React Native)

These notes make AI agents productive quickly in this codebase. Keep changes small, follow the patterns below, and cite concrete files.

## Architecture

- Expo + React Native with expo-router v6 (file-based routing).
  - Root stack: `app/_layout.tsx` wraps in `@react-navigation/native` `ThemeProvider` and imports `react-native-reanimated`.
  - Tabs live in `app/(tabs)/_layout.tsx` with two screens: `index.tsx`, `explore.tsx`.
- Theming: light/dark via RN `useColorScheme()`.
  - Colors/Fonts: `constants/theme.ts` (`Colors`, `Fonts`). Theme lookup uses `hooks/use-theme-color.ts`.
  - Design tokens: `constants/tokens.ts` exposes `Typography`, `Spacing`, `Radius`, `Shadows`.
  - Prefer `components/themed-text.tsx` and `components/themed-view.tsx` over raw RN primitives to auto-apply colors; `ThemedText` consumes `Typography` tokens.
- Icons: `components/ui/icon-symbol.*` uses SF Symbols on iOS and falls back to MaterialIcons elsewhere.
- Haptics: `components/haptic-tab.tsx` adds light impact on iOS tab presses.
- Path alias: `@/*` → project root (`tsconfig.json`). Use it for imports (e.g., `@/components/...`).

## Workflows

- Dev: `npm run start` (or `npm run ios` / `npm run android` / `npm run web`). Entry is `expo-router/entry` (see `package.json`).
- Lint: `npm run lint` (eslint-config-expo).
- Reset to blank template (dangerous): `npm run reset-project` (see `scripts/reset-project.js`).
- Reanimated: keep `import 'react-native-reanimated'` at the top of `app/_layout.tsx`.

## Conventions & patterns

- Routing
  - Add a stack or tab screen by creating files under `app/`. Example: `app/song/[id].tsx` for a dynamic route.
  - Hide headers or change titles via screen options in parent layout (e.g., `app/(tabs)/_layout.tsx`).
- Theming
  - Get colors with `useThemeColor({ light?, dark? }, 'text'|'background'|...)`.
  - When building new UI, wrap with `ThemedView` and prefer tokenized text via `components/ui/Text.tsx` (`UiText` variants: `title|subtitle|body|bodySemiBold|caption|overline|link`).
  - Use tokenized sizes/weights from `constants/tokens.ts` (`Typography.sizes`, `Typography.weights`, `Typography.lineHeights`). Spacing and radius come from `Spacing` and `Radius`.
  - Extend or tweak brand tints in `constants/theme.ts` (e.g., `Colors.light.tint`). Keep keys in both `light` and `dark`.
- Icons
  - On iOS, `IconSymbol` uses `expo-symbols`. On Android/Web, it maps to MaterialIcons via `components/ui/icon-symbol.tsx`.
  - To add a new icon name, update `MAPPING` in `components/ui/icon-symbol.tsx` with the SF Symbol → MaterialIcon pair.
- Haptics
  - For tab buttons, reuse `HapticTab` like in `app/(tabs)/_layout.tsx`. It triggers only on iOS (checks `process.env.EXPO_OS`).
- Imports
  - Prefer `@/` alias over relative paths. Example: `import { ThemedText } from '@/components/themed-text'`.

## Example additions

- New tab screen: create `app/(tabs)/favorites.tsx` and register icon in `app/(tabs)/_layout.tsx` using `IconSymbol`.
- Themed component: compose `ThemedView` + `UiText` and read colors via `useThemeColor`.
- Layout helpers: use `components/ui/Stack.tsx` and `components/ui/Spacer.tsx` for consistent gaps (`space={2|3|4}` or numbers). `Stack` supports `direction`, `align`, `justify`, and optional `divider`.
- Buttons: `components/ui/Button.tsx` supports `variant` (`primary|secondary|ghost`), `size` (`sm|md|lg`), `loading`, `disabled`, and optional `leftIcon`/`rightIcon`.

## What this project does NOT include (yet)

- No backend calls or data layer; no AsyncStorage wiring for favorites yet.
- No tests configured.

If anything above seems off (e.g., routes, theme keys, or icons), check the referenced files and update this doc accordingly.
