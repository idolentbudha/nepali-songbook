/**
 * Domain types for the Nepali Songbook app
 */

/** Loose tag string for filtering/grouping */
export type Tag = string;

/** Basic artist string for MVP; can be expanded later */
export type Artist = string;

/** A single raw chord/lyric line as authored in data (e.g., "[C]Hello [G]World"). */
export type RawChordLine = string;

/** Song entity used throughout the app */
export interface Song {
  /** Stable id (string UUID or slug) */
  id: string;
  /** Visible title */
  title: string;
  /** Primary artist name */
  artist: Artist;
  /** Optional song key (e.g., "C", "Gm") */
  key?: string;
  /** Optional capo position (fret number) */
  capo?: number;
  /** Optional BPM/tempo */
  bpm?: number;
  /** Free-form tags (genre, mood, difficulty, language, etc.) */
  tags: Tag[];
  /** Lines with inline chord markup for MVP; parsed later by chord parser */
  lines: RawChordLine[];
  /** Optional multi-language lyrics (inline chord markup), e.g., { 'ne': [...], 'en': [...] } */
  lyricsByLang?: Record<string, RawChordLine[]>;
  /** Optional time signature, tempo, etc., for future features */
  timeSignature?: string;
}

/** Shape returned by data loaders */
export interface SongsResponse {
  songs: Song[];
}

/** Parsed chord token for a segment like "[C]Hello" => { chord: "C", lyric: "Hello" } */
export interface ParsedChordToken {
  chord?: string;
  lyric: string; // may be empty when chords precede lyrics
}

/** Parsed representation of a raw chord line */
export interface ParsedChordLine {
  tokens: ParsedChordToken[];
}
