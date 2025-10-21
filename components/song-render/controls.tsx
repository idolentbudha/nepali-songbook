import { useSongRender } from "@/components/song-render/context";
import { Spacer } from "@/components/ui/Spacer";
import { UiText } from "@/components/ui/Text";
import { Radius, Spacing } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { Pressable, View } from "react-native";

export type SongRenderControlsProps = {
  languages?: string[];
};

export function SongRenderControls({ languages }: SongRenderControlsProps) {
  const { settings, setSettings } = useSongRender();
  const border = useThemeColor({}, "icon");
  const tint = useThemeColor({}, "tint");
  const text = useThemeColor({}, "text");

  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
      {/* Row 1: View mode + notation */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Segmented
          options={[
            { key: "chords", label: "Chords" },
            { key: "lyrics", label: "Lyrics" },
          ]}
          value={settings.viewMode}
          onChange={(v) => setSettings({ viewMode: v as any })}
          tint={tint as string}
          border={border as string}
          textColor={text as string}
        />
        <Spacer axis="horizontal" size={2} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle notation"
          onPress={() =>
            setSettings({
              notation: settings.notation === "sharp" ? "flat" : "sharp",
            })
          }
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: Radius.md,
            borderWidth: 1,
            borderColor: border as string,
          }}
        >
          <UiText>{settings.notation === "sharp" ? "♯" : "♭"}</UiText>
        </Pressable>
      </View>

      <Spacer size={2} />

      {/* Row 2: Transpose controls */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Transpose down"
          onPress={() =>
            setSettings({ transposeSteps: settings.transposeSteps - 1 })
          }
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: Radius.md,
            borderWidth: 1,
            borderColor: border as string,
          }}
        >
          <UiText>-</UiText>
        </Pressable>
        <Spacer axis="horizontal" size={2} />
        <UiText>Transpose: {settings.transposeSteps}</UiText>
        <Spacer axis="horizontal" size={2} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Transpose up"
          onPress={() =>
            setSettings({ transposeSteps: settings.transposeSteps + 1 })
          }
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: Radius.md,
            borderWidth: 1,
            borderColor: border as string,
          }}
        >
          <UiText>+</UiText>
        </Pressable>
      </View>

      {/* Row 3: Language chips (if provided) */}
      {languages && languages.length > 0 ? (
        <>
          <Spacer size={2} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {languages.map((lang) => (
              <Pressable
                key={lang}
                accessibilityRole="button"
                accessibilityState={{ selected: settings.language === lang }}
                accessibilityLabel={`Switch to ${lang}`}
                onPress={() =>
                  setSettings({
                    language: settings.language === lang ? undefined : lang,
                  })
                }
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: Radius.full,
                  borderWidth: 1,
                  borderColor:
                    settings.language === lang
                      ? (tint as string)
                      : (border as string),
                  marginRight: Spacing[2],
                  marginBottom: Spacing[1],
                }}
              >
                <UiText
                  style={{
                    color:
                      settings.language === lang
                        ? (tint as string)
                        : (text as string),
                  }}
                >
                  {lang}
                </UiText>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}

function Segmented({
  options,
  value,
  onChange,
  tint,
  border,
  textColor,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (next: string) => void;
  tint: string;
  border: string;
  textColor: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: border,
      }}
    >
      {options.map((opt, idx) => {
        const active = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(opt.key)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: active ? tint + "20" : "transparent",
              borderTopLeftRadius: idx === 0 ? Radius.md : 0,
              borderBottomLeftRadius: idx === 0 ? Radius.md : 0,
              borderTopRightRadius: idx === options.length - 1 ? Radius.md : 0,
              borderBottomRightRadius:
                idx === options.length - 1 ? Radius.md : 0,
            }}
          >
            <UiText style={{ color: textColor }}>{opt.label}</UiText>
          </Pressable>
        );
      })}
    </View>
  );
}
