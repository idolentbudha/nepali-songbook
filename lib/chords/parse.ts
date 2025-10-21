import type {
  ParsedChordLine,
  ParsedChordToken,
  RawChordLine,
} from "@/types/song";

/**
 * Parse a raw chord line with inline chord annotations like `[C]Hello [G]world`.
 * Produces a list of tokens where each token has an optional chord and a lyric fragment.
 */
export function parseChordLine(raw: RawChordLine): ParsedChordLine {
  const tokens: ParsedChordToken[] = [];
  let i = 0;
  let pendingChord: string | undefined;
  let buffer = "";

  while (i < raw.length) {
    const ch = raw[i];
    if (ch === "[") {
      // Flush any buffered lyric into a token before starting a chord
      if (buffer.length > 0) {
        tokens.push({ chord: pendingChord, lyric: buffer });
        buffer = "";
        pendingChord = undefined;
      } else if (pendingChord !== undefined) {
        // Edge: another chord immediately after a chord without lyrics in between
        tokens.push({ chord: pendingChord, lyric: "" });
        pendingChord = undefined;
      }

      // Read chord name until closing bracket or end of line
      let j = i + 1;
      let chordText = "";
      while (j < raw.length && raw[j] !== "]") {
        chordText += raw[j];
        j++;
      }
      if (j < raw.length && raw[j] === "]") {
        // Valid chord annotation
        pendingChord = chordText.trim();
        i = j + 1;
        continue;
      } else {
        // Unclosed bracket — treat as literal
        buffer += ch;
        i++;
        continue;
      }
    } else {
      buffer += ch;
      i++;
    }
  }

  // Flush trailing buffer as a token
  if (buffer.length > 0 || pendingChord !== undefined) {
    tokens.push({ chord: pendingChord, lyric: buffer });
  }

  return { tokens };
}

/** Parse an array of raw lines */
export function parseSongLines(lines: RawChordLine[]): ParsedChordLine[] {
  return lines.map(parseChordLine);
}

/**
 * Utility: from parsed tokens, build two monospaced rows (chords and lyrics)
 * of equal length by padding the chord row to the lyric segment length.
 */
export function buildMonospaceRows(parsed: ParsedChordLine): {
  chords: string;
  lyrics: string;
} {
  let chords = "";
  let lyrics = "";

  for (const token of parsed.tokens) {
    const lyric = token.lyric ?? "";
    const segLen = lyric.length;

    // Determine chord text to place at the start of this lyric segment
    const chordText = token.chord ? token.chord : "";

    // For the chord row: place the chord, then pad with spaces to reach the lyric segment length
    if (segLen === 0) {
      // No lyric characters; still show chord (if any) and a trailing space for readability
      if (chordText) {
        chords += chordText;
        lyrics += " ";
      }
      // If neither chord nor lyric, nothing to add
      continue;
    }

    if (chordText.length > 0) {
      chords += chordText;
      // Pad to the segment length
      const pad = Math.max(0, segLen - chordText.length);
      chords += "".padEnd(pad, " ");
    } else {
      chords += "".padEnd(segLen, " ");
    }

    // Lyrics row simply appends the lyric segment
    lyrics += lyric;
  }

  return { chords, lyrics };
}
