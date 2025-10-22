import { Button } from "@/components/ui/Button";
import { Stack } from "@/components/ui/Stack";
import { UiText } from "@/components/ui/Text";
import { Radius, Typography } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/use-theme-color";
import { addUserSong, makeUserSongId } from "@/lib/storage/user-songs";
import type { Song } from "@/types/song";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddSongScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [keyText, setKeyText] = useState("");
  const [capoText, setCapoText] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [linesText, setLinesText] = useState("");
  const [saving, setSaving] = useState(false);

  const valid = useMemo(() => {
    return (
      title.trim().length > 0 &&
      artist.trim().length > 0 &&
      linesText.trim().length > 0
    );
  }, [title, artist, linesText]);

  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const border = useThemeColor({}, "icon");

  async function onSave() {
    if (!valid) return;
    setSaving(true);
    try {
      const id = makeUserSongId();
      const tags = tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const lines = linesText.split(/\r?\n/).map((l) => l.replace(/\s+$/g, ""));
      const capo = capoText.trim() ? parseInt(capoText.trim(), 10) : undefined;
      const song: Song = {
        id,
        title: title.trim(),
        artist: artist.trim(),
        key: keyText.trim() || undefined,
        capo: Number.isFinite(capo as any) ? (capo as number) : undefined,
        bpm: undefined,
        tags,
        lines,
      };
      await addUserSong(song);
      Alert.alert("Saved", "Your song was added to the library.", [
        {
          text: "View",
          onPress: () => router.push(`/song/${song.id}` as any),
        },
        { text: "OK" },
      ]);
      // Reset form
      setTitle("");
      setArtist("");
      setKeyText("");
      setCapoText("");
      setTagsText("");
      setLinesText("");
    } catch (e) {
      console.warn(e);
      Alert.alert("Error", "Failed to save song. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <UiText variant="title">Add Song</UiText>
        <View style={{ height: 12 }} />
        <Field label="Title">
          <TextInput
            placeholder="Eg. Hey Jude"
            value={title}
            onChangeText={setTitle}
            style={inputStyle(bg as string, border as string, text as string)}
            placeholderTextColor={border as string}
          />
        </Field>
        <Field label="Artist">
          <TextInput
            placeholder="Eg. The Beatles"
            value={artist}
            onChangeText={setArtist}
            style={inputStyle(bg as string, border as string, text as string)}
            placeholderTextColor={border as string}
          />
        </Field>
        <Stack direction="row" space={2}>
          <Field label="Key" style={{ flex: 1 }}>
            <TextInput
              placeholder="Eg. C or Gm"
              value={keyText}
              onChangeText={setKeyText}
              autoCapitalize="characters"
              style={inputStyle(bg as string, border as string, text as string)}
              placeholderTextColor={border as string}
            />
          </Field>
          <Field label="Capo" style={{ width: 100 }}>
            <TextInput
              placeholder="0"
              value={capoText}
              onChangeText={setCapoText}
              keyboardType="number-pad"
              style={inputStyle(bg as string, border as string, text as string)}
              placeholderTextColor={border as string}
            />
          </Field>
        </Stack>
        <Field label="Tags (comma separated)">
          <TextInput
            placeholder="worship, easy, nepali"
            value={tagsText}
            onChangeText={setTagsText}
            style={inputStyle(bg as string, border as string, text as string)}
            placeholderTextColor={border as string}
          />
        </Field>
        <Field label="Lyrics + Chords">
          <TextInput
            placeholder={`Type lines here. Use chord markup like [C]Hello [G]world\nOne line per row.`}
            value={linesText}
            onChangeText={setLinesText}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            style={[
              inputStyle(bg as string, border as string, text as string),
              { minHeight: 160 },
            ]}
            placeholderTextColor={border as string}
          />
        </Field>
        <View style={{ height: 12 }} />
        <Button
          title="Save"
          onPress={onSave}
          disabled={!valid || saving}
          loading={saving}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  children,
  style,
}: {
  label: string;
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <View style={style}>
      <UiText variant="caption" style={{ marginBottom: 6 }}>
        {label}
      </UiText>
      {children}
    </View>
  );
}

function inputStyle(bg: string, border: string, text: string) {
  return {
    backgroundColor: bg,
    borderColor: border,
    borderWidth: 1,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: text,
    fontSize: Typography.sizes.base,
  } as const;
}
