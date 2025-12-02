import { SongList } from "@/components/song-list";
import { ThemedView } from "@/components/themed-view";
import { UiText } from "@/components/ui/Text";
import { getAllSongs } from "@/lib/data/all-songs";
import { useFavorites } from "@/lib/storage/favorites";
import type { Song } from "@/types/song";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const fav = useFavorites();
  const [songs, setSongs] = useState<Song[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const all = await getAllSongs();
      if (mounted) setSongs(all);
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const favorites = useMemo(() => songs.filter(s => fav.ids.includes(s.id)), [songs, fav.ids]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}>
          <UiText variant="title">Favorites</UiText>
        </View>
        <SongList
          songs={favorites}
          isFavorite={id => fav.isFavorite(id)}
          onToggleFavorite={id => fav.toggleFavorite(id)}
        />
        {favorites.length === 0 ? (
          <View style={{ padding: 16 }}>
            <UiText>No favorites yet.</UiText>
          </View>
        ) : null}
      </SafeAreaView>
    </ThemedView>
  );
}
