import { ChordLine } from "@/components/chord-line";
import { useSongRender } from "@/components/song-render/context";
import { UiText } from "@/components/ui/Text";
import { parseSongLines } from "@/lib/chords/parse";
import type { Song } from "@/types/song";
import React from "react";
import { View } from "react-native";

export function SongView({ song }: { song: Song }) {
  const { settings } = useSongRender();

  // Language selection: prefer selected language if available, else fallback to base lines
  const lines =
    settings.language && song.lyricsByLang?.[settings.language]
      ? song.lyricsByLang[settings.language]!
      : song.lines;

  const parsed = parseSongLines(lines);

  if (settings.viewMode === "lyrics") {
    return (
      <View>
        {parsed.map((p, idx) => (
          <UiText key={idx}>{p.tokens.map((t) => t.lyric).join("")}</UiText>
        ))}
      </View>
    );
  }

  // Default "chords" view
  return (
    <View>
      {parsed.map((p, idx) => (
        <ChordLine key={idx} line={p} />
      ))}
    </View>
  );
}
