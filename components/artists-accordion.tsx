import { Collapsible } from "@/components/ui/collapsible";
import { Spacer } from "@/components/ui/layout/spacer";
import { UiText } from "@/components/ui/Text";
import { Radius } from "@/constants/tokens";
import type { Song } from "@/types/song";
import React from "react";
import { Pressable, View } from "react-native";

export type ArtistGroup = { name: string; songs: Song[] };

export function ArtistsAccordion({
  items,
  onPressSong,
}: {
  items: ArtistGroup[];
  onPressSong: (song: Song) => void;
}) {
  if (!items || items.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <UiText>No artists found.</UiText>
      </View>
    );
  }

  return (
    <View style={{ paddingVertical: 8 }}>
      {items.map((group) => (
        <View
          key={group.name}
          style={{ paddingHorizontal: 16, marginBottom: 8 }}
        >
          <Collapsible title={`${group.name} (${group.songs.length})`}>
            <View>
              {group.songs.map((song, idx) => (
                <View key={song.id}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Open ${song.title} by ${song.artist}`}
                    onPress={() => onPressSong(song)}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 8,
                      borderRadius: Radius.md,
                      backgroundColor: "transparent",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <UiText
                      variant="body"
                      numberOfLines={1}
                      style={{ flex: 1 }}
                    >
                      {song.title}
                    </UiText>
                  </Pressable>
                  {idx < group.songs.length - 1 ? <Spacer size={1} /> : null}
                </View>
              ))}
            </View>
          </Collapsible>
        </View>
      ))}
    </View>
  );
}
