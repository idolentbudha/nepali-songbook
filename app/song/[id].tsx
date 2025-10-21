import { SongRenderProvider } from "@/components/song-render/context";
import { SongRenderControls } from "@/components/song-render/controls";
import { SongView } from "@/components/song-view";
import { Spacer } from "@/components/ui/Spacer";
import { UiText } from "@/components/ui/Text";
import { findSongById } from "@/lib/data/songs";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SongDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const song = typeof id === "string" ? findSongById(id) : undefined;

  if (!song) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <UiText variant="subtitle">Song not found.</UiText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <UiText variant="title">{song.title}</UiText>
        <Spacer size={1} />
        <UiText variant="caption">{song.artist}</UiText>
      </View>
      <SongRenderProvider>
        <SongRenderControls languages={Object.keys(song.lyricsByLang ?? {})} />
        <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          <SongView song={song} />
        </View>
      </SongRenderProvider>
    </SafeAreaView>
  );
}
