import { SongList } from "@/components/song-list";
import { UiText } from "@/components/ui/Text";
import { getSongs } from "@/lib/data/songs";
import { useFavorites } from "@/lib/storage/favorites";
import React, { useMemo } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const fav = useFavorites();
  const songs = getSongs();
  const favorites = useMemo(
    () => songs.filter((s) => fav.ids.includes(s.id)),
    [songs, fav.ids]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}>
        <UiText variant="title">Favorites</UiText>
      </View>
      <SongList
        songs={favorites}
        isFavorite={(id) => fav.isFavorite(id)}
        onToggleFavorite={(id) => fav.toggleFavorite(id)}
      />
      {favorites.length === 0 ? (
        <View style={{ padding: 16 }}>
          <UiText>No favorites yet.</UiText>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
