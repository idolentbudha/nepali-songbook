import { SongList } from "@/components/song-list";
import { ThemedView } from "@/components/themed-view";
import { UiText } from "@/components/ui/Text";
import { getAllSongs } from "@/lib/data/all-songs";
import { useFavorites } from "@/lib/storage/favorites";
import type { Song } from "@/types/song";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const router = useRouter();
  const fav = useFavorites();
  console.log("fav:", fav);
  const [songs, setSongs] = useState<Song[]>([]);

  const fetchSongs = React.useCallback(async () => {
    const all = await getAllSongs();
    setSongs(all);
  }, []);

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

  useFocusEffect(
    React.useCallback(() => {
      fetchSongs();
    }, [fetchSongs])
  );

  const favorites = useMemo(() => songs.filter(s => fav.ids.includes(s.id)), [songs, fav.ids]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}>
          <UiText variant="title">Favorites</UiText>
        </View>
        <SongList
          songs={favorites}
          onPressItem={song => router.push(`/song/${song.id}` as any)}
          isFavorite={id => fav.isFavorite(id)}
          onToggleFavorite={id => fav.toggleFavorite(id)}
          onDelete={fetchSongs}
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
