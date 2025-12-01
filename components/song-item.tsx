import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacer } from "@/components/ui/layout/spacer";
import { Stack } from "@/components/ui/layout/stack";
import { UiText } from "@/components/ui/Text";
import { Radius } from "@/constants/tokens";
import type { Song } from "@/types/song";
import React from "react";
import { Pressable, View } from "react-native";

export type SongItemProps = {
  song: Song;
  onPress?: (song: Song) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, next: boolean) => void;
};

export function SongItem({
  song,
  onPress,
  onToggleFavorite,
  isFavorite,
}: SongItemProps) {
  const fav = !!isFavorite;
  const toggle = () => onToggleFavorite?.(song.id, !fav);

  return (
    <Pressable
      onPress={() => onPress?.(song)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${song.title} by ${song.artist}`}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: Radius.md,
        backgroundColor: "transparent",
      }}
    >
      <Stack direction="row" align="center" justify="space-between">
        <View style={{ flex: 1 }}>
          <UiText variant="bodySemiBold" numberOfLines={1}>
            {song.title}
          </UiText>
          <Spacer size={1} />
          <UiText variant="caption" numberOfLines={1}>
            {song.artist}
          </UiText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            fav ? "Remove from favorites" : "Add to favorites"
          }
          onPress={(e) => {
            e.stopPropagation();
            toggle();
          }}
          style={{ padding: 8 }}
        >
          <IconSymbol
            name={fav ? "heart.fill" : "heart"}
            size={24}
            color={fav ? "#ef4444" : "#9ca3af"}
          />
        </Pressable>
      </Stack>
    </Pressable>
  );
}
