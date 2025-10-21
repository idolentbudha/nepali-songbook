import { Image } from "expo-image";
import { Platform, StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { Stack } from "@/components/ui/Stack";
import { UiText } from "@/components/ui/Text";
import { Radius, Shadows, Typography } from "@/constants/tokens";
import { Link, useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <UiText variant="title">Welcome!</UiText>
        <HelloWave />
      </ThemedView>
      {/* Quick nav to Songs list */}
      <ThemedView style={styles.stepContainer}>
        <Button
          title="Browse Songs"
          onPress={() => router.push("/songs" as any)}
        />
      </ThemedView>

      {/* Button variants demo */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Buttons</ThemedText>
        <Stack direction="row" space={3} align="center">
          <Button title="Primary" onPress={() => {}} />
          <Button title="Secondary" variant="secondary" onPress={() => {}} />
          <Button title="Ghost" variant="ghost" onPress={() => {}} />
        </Stack>
        <Spacer size={3} />
        <Stack direction="row" space={3} align="center">
          <Button title="Small" size="sm" onPress={() => {}} />
          <Button title="Medium" size="md" onPress={() => {}} />
          <Button title="Large" size="lg" onPress={() => {}} />
        </Stack>
        <Spacer size={3} />
        <Stack direction="row" space={3} align="center">
          <Button title="Loading" loading onPress={() => {}} />
          <Button title="Disabled" disabled onPress={() => {}} />
        </Stack>
      </ThemedView>
      {/* UiText variants demo */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Text variants</ThemedText>
        <Stack space={2}>
          <UiText variant="title">Title text</UiText>
          <UiText variant="subtitle">Subtitle text</UiText>
          <UiText variant="body">Body text</UiText>
          <UiText variant="bodySemiBold">Body SemiBold</UiText>
          <UiText variant="caption">Caption text</UiText>
          <UiText variant="overline">Overline text</UiText>
          <UiText variant="link">Link text</UiText>
        </Stack>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <UiText variant="subtitle">Step 1: Try it</UiText>
        <UiText>
          Edit{" "}
          <UiText variant="body" weight="semibold">
            app/(tabs)/index.tsx
          </UiText>{" "}
          to see changes. Press {""}
          <UiText variant="body" weight="semibold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </UiText>{" "}
          to open developer tools.
        </UiText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <UiText variant="subtitle">Step 2: Explore</UiText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert("Action pressed")}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <UiText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </UiText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <UiText variant="subtitle">Step 3: Get a fresh start</UiText>
        <UiText>
          {`When you're ready, run `}
          <UiText variant="body" weight="semibold">
            npm run reset-project
          </UiText>{" "}
          to get a fresh{" "}
          <UiText variant="body" weight="semibold">
            app
          </UiText>{" "}
          directory. This will move the current {""}
          <UiText variant="body" weight="semibold">
            app
          </UiText>{" "}
          to {""}
          <UiText variant="body" weight="semibold">
            app-example
          </UiText>
          .
        </UiText>
      </ThemedView>

      {/* Design tokens + layout helpers demo */}
      <ThemedView style={styles.stepContainer}>
        <UiText variant="subtitle">Design system demo</UiText>
        <UiText>
          Using{" "}
          <UiText variant="body" weight="semibold">
            Stack
          </UiText>{" "}
          and {""}
          <UiText variant="body" weight="semibold">
            Spacer
          </UiText>{" "}
          with tokens from {""}
          <UiText variant="body" weight="semibold">
            constants/tokens.ts
          </UiText>
          .
        </UiText>

        <Stack space={4}>
          <UiText style={{ fontSize: Typography.sizes.lg }}>
            Vertical stack (space=4)
          </UiText>
          <Stack direction="row" space={2} align="center">
            <View
              style={[styles.box, Shadows.sm, { backgroundColor: "#e5e7eb" }]}
            />
            <View
              style={[styles.box, Shadows.sm, { backgroundColor: "#cbd5e1" }]}
            />
            <View
              style={[styles.box, Shadows.sm, { backgroundColor: "#94a3b8" }]}
            />
          </Stack>
          <UiText>Divider + horizontal spacing</UiText>
          <Stack
            direction="row"
            space={2}
            align="center"
            divider={
              <View
                style={{ width: 1, height: 24, backgroundColor: "#e5e7eb" }}
              />
            }
          >
            <UiText>Chord</UiText>
            <UiText>Lyrics</UiText>
            <UiText>Capo</UiText>
          </Stack>
          <UiText>Manual Spacer usage</UiText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.dot, { backgroundColor: "#0ea5e9" }]} />
            <Spacer axis="horizontal" size={2} />
            <UiText>Token gap</UiText>
          </View>
        </Stack>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  box: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
