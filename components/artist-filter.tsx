import { UiText } from "@/components/ui/Text";
import { Radius, Spacing } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";

export type ArtistFilterProps = {
  artists: string[];
  selected?: string;
  onChange?: (artistId: string | undefined) => void;
};

export function ArtistFilter({
  artists,
  selected,
  onChange,
}: ArtistFilterProps) {
  const border = useThemeColor({}, "icon");
  const tint = useThemeColor({}, "tint");
  const text = useThemeColor({}, "text");
  const subdued = useThemeColor({}, "icon");

  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 4 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 4 }}
        accessibilityRole="tablist"
        accessibilityLabel="Filter by artist"
      >
        <Chip
          label="All"
          active={!selected}
          onPress={() => onChange?.(undefined)}
          tint={tint as string}
          border={border as string}
          textColor={text as string}
          subdued={subdued as string}
        />
        {artists.map((name) => (
          <Chip
            key={name}
            label={name}
            active={selected === name}
            onPress={() => onChange?.(selected === name ? undefined : name)}
            tint={tint as string}
            border={border as string}
            textColor={text as string}
            subdued={subdued as string}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Chip({
  label,
  active,
  onPress,
  tint,
  border,
  textColor,
  subdued,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  tint: string;
  border: string;
  textColor: string;
  subdued: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`Filter by ${label}`}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: Radius.full,
        borderWidth: active ? 2 : 1,
        borderColor: active ? tint : border,
        marginRight: Spacing[2],
      }}
    >
      <UiText
        variant="caption"
        weight={active ? "semibold" : "normal"}
        style={{ color: active ? tint : subdued }}
      >
        {label}
      </UiText>
    </Pressable>
  );
}
