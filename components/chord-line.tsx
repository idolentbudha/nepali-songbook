import { useSongRender } from "@/components/song-render/context";
import { UiText } from "@/components/ui/Text";
import { Fonts } from "@/constants/theme";
import { buildMonospaceRows } from "@/lib/chords/parse";
import { transposeChord } from "@/lib/chords/transpose";
import type { ParsedChordLine } from "@/types/song";
import React from "react";
import { View } from "react-native";

export type ChordLineProps = {
  line: ParsedChordLine;
};

export function ChordLine({ line }: ChordLineProps) {
  const { settings } = useSongRender();
  const transposed = {
    tokens: line.tokens.map((t) =>
      t.chord
        ? {
            ...t,
            chord: transposeChord(
              t.chord,
              settings.transposeSteps,
              settings.notation
            ),
          }
        : t
    ),
  };
  const rows = buildMonospaceRows(transposed);
  return (
    <View style={{ marginVertical: 4 }}>
      {/* Chords row */}
      <UiText
        style={{
          fontFamily: Fonts.mono,
        }}
      >
        {rows.chords}
      </UiText>
      {/* Lyrics row */}
      <UiText
        style={{
          fontFamily: Fonts.mono,
        }}
      >
        {rows.lyrics}
      </UiText>
    </View>
  );
}
