import { UiText } from "@/components/ui/Text";
import { Radius, Typography } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useEffect, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export type SearchBarProps = {
  value?: string;
  placeholder?: string;
  debounceMs?: number;
  onChange?: (text: string) => void;
  onClear?: () => void;
};

export function SearchBar({
  value = "",
  placeholder = "Search songs…",
  debounceMs = 200,
  onChange,
  onClear,
}: SearchBarProps) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);

  useEffect(() => {
    const id = setTimeout(() => onChange?.(text), debounceMs);
    return () => clearTimeout(id);
  }, [text, debounceMs, onChange]);

  const bg = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const placeholderColor = useThemeColor({}, "icon");
  const border = useThemeColor({}, "icon");
  const tint = useThemeColor({}, "tint");

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      <View
        style={{
          backgroundColor: bg,
          borderColor: border,
          borderWidth: 1,
          borderRadius: Radius.lg,
          paddingHorizontal: 12,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          accessibilityRole="search"
          accessibilityLabel="Search songs"
          style={{
            flex: 1,
            color: textColor,
            fontSize: Typography.sizes.base,
          }}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor as string}
          value={text}
          onChangeText={setText}
          returnKeyType="search"
        />
        {text.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            style={{ paddingHorizontal: 8, paddingVertical: 4 }}
            onPress={() => {
              setText("");
              onClear?.();
              onChange?.("");
            }}
          >
            <UiText variant="link" darkColor={tint as string}>
              Clear
            </UiText>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
