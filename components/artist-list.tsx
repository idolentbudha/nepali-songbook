import { Spacer } from "@/components/ui/layout/spacer";
import { UiText } from "@/components/ui/Text";
import { Radius } from "@/constants/tokens";
import React from "react";
import { FlatList, Pressable, View } from "react-native";

export type ArtistItem = { name: string; count: number };

export function ArtistList({
  items,
  onPress,
}: {
  items: ArtistItem[];
  onPress?: (name: string) => void;
}) {
  if (!items || items.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <UiText>No artists found.</UiText>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.name}
      ItemSeparatorComponent={() => <Spacer size={2} />}
      contentContainerStyle={{ paddingVertical: 8 }}
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`View songs by ${item.name}`}
          onPress={() => onPress?.(item.name)}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: Radius.md,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <UiText variant="bodySemiBold" numberOfLines={1} style={{ flex: 1 }}>
            {item.name}
          </UiText>
          <Spacer axis="horizontal" size={2} />
          <UiText variant="caption">{item.count}</UiText>
        </Pressable>
      )}
    />
  );
}
