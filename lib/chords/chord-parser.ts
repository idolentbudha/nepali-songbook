/**
 * Parse chord notation from various internet formats into the app's chord markup format
 * Supports:
 * - Chords on separate lines above lyrics
 * - Inline chords in various bracket formats
 * - Tab-style positioning (chords above lyrics aligned by position)
 */

/**
 * Main parser function that detects format and converts to app markup
 */
export function parseChordNotation(input: string): string[] {
  if (!input.trim()) return [];

  const lines = input.split(/\r?\n/);

  // Try to detect the format
  const format = detectFormat(lines);

  switch (format) {
    case "chords-above":
      return parseChordsAboveLyrics(lines);
    case "inline-brackets":
      return parseInlineBrackets(lines);
    case "already-formatted":
      return lines.filter(line => line.trim());
    default:
      // Return as-is if can't detect format
      return lines.filter(line => line.trim());
  }
}

/**
 * Detect the chord notation format
 */
function detectFormat(
  lines: string[]
): "chords-above" | "inline-brackets" | "already-formatted" | "unknown" {
  let hasChordLines = false;
  let hasInlineBrackets = false;
  let hasAppFormat = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check for app's format: [C]lyrics
    if (/\[[A-G][#b]?(?:m|maj|min|dim|aug|sus|add)?[0-9]?\]/.test(line)) {
      hasAppFormat = true;
    }

    // Check for inline brackets like (C) or {Am}
    if (/[\(\{][A-G][#b]?(?:m|maj|min|dim|aug|sus|add)?[0-9]?[\)\}]/.test(line)) {
      hasInlineBrackets = true;
    }

    // Check if line contains only chords (separated by spaces)
    if (isChordLine(trimmed)) {
      hasChordLines = true;
    }
  }

  if (hasAppFormat) return "already-formatted";
  if (hasInlineBrackets) return "inline-brackets";
  if (hasChordLines) return "chords-above";
  return "unknown";
}

/**
 * Check if a line contains only chord symbols
 */
function isChordLine(line: string): boolean {
  // Empty line is not a chord line
  if (!line.trim()) return false;

  // Split by whitespace
  const tokens = line.trim().split(/\s+/);

  // Must have at least one token
  if (tokens.length === 0) return false;

  // Check if all tokens look like chords
  const chordPattern = /^[A-G][#b]?(?:m|maj|min|dim|aug|sus|add)?[0-9]?(?:\/[A-G][#b]?)?$/;

  const chordCount = tokens.filter(token => chordPattern.test(token)).length;

  // If more than 60% are chords and there's at least one chord, consider it a chord line
  return chordCount > 0 && chordCount / tokens.length >= 0.6;
}

/**
 * Parse format where chords are on separate lines above lyrics
 * Example:
 *   C        G        Am       F
 *   Hello world this is a song
 */
function parseChordsAboveLyrics(lines: string[]): string[] {
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const currentLine = lines[i];
    const nextLine = i + 1 < lines.length ? lines[i + 1] : "";

    // Skip empty lines
    if (!currentLine.trim()) {
      i++;
      continue;
    }

    // Check if this is a chord line followed by lyrics
    if (isChordLine(currentLine.trim()) && nextLine.trim() && !isChordLine(nextLine.trim())) {
      // Merge chord line with next line (don't trim to preserve spacing)
      const merged = mergeChordAndLyricLines(currentLine, nextLine);
      result.push(merged);
      i += 2; // Skip both lines
    } else if (isChordLine(currentLine.trim())) {
      // Chord line without lyrics below
      result.push(convertChordLineToMarkup(currentLine));
      i++;
    } else {
      // Regular lyrics line
      result.push(currentLine.trim());
      i++;
    }
  }

  return result;
}

/**
 * Parse inline brackets like (C) or {Am} into [C] format
 */
function parseInlineBrackets(lines: string[]): string[] {
  return lines
    .filter(line => line.trim())
    .map(line => {
      // Replace (C) or {C} with [C]
      return line.replace(
        /[\(\{]([A-G][#b]?(?:m|maj|min|dim|aug|sus|add)?[0-9]?(?:\/[A-G][#b]?)?)[\)\}]/g,
        "[$1]"
      );
    });
}

/**
 * Merge a chord line with a lyric line based on positioning
 * Preserves exact character positions from the chord line
 */
function mergeChordAndLyricLines(chordLine: string, lyricLine: string): string {
  const chords = extractChordsWithPositions(chordLine);

  if (chords.length === 0) {
    return lyricLine.trim();
  }

  // Build result by inserting chords at their positions
  let result = "";
  let lastChordEnd = 0;

  // Sort chords by position (forward order)
  chords.sort((a, b) => a.position - b.position);

  for (let i = 0; i < chords.length; i++) {
    const { chord, position } = chords[i];

    // Get the lyric text between last chord position and current chord position
    const lyricSegment = lyricLine.substring(lastChordEnd, position);

    // Add the lyric segment and the chord
    result += lyricSegment + `[${chord}]`;

    // Update last position to current chord position
    lastChordEnd = position;
  }

  // Add remaining lyrics after the last chord
  if (lastChordEnd < lyricLine.length) {
    result += lyricLine.substring(lastChordEnd);
  }

  return result.trim();
}

/**
 * Extract chords and their positions from a chord line
 */
function extractChordsWithPositions(chordLine: string): { chord: string; position: number }[] {
  const chords: { chord: string; position: number }[] = [];
  const chordPattern = /[A-G][#b]?(?:m|maj|min|dim|aug|sus|add)?[0-9]?(?:\/[A-G][#b]?)?/g;

  let match;
  while ((match = chordPattern.exec(chordLine)) !== null) {
    chords.push({
      chord: match[0],
      position: match.index,
    });
  }

  return chords;
}

/**
 * Convert a line of chords (with spaces) into markup format
 */
function convertChordLineToMarkup(chordLine: string): string {
  const chords = chordLine.trim().split(/\s+/);
  return chords.map(chord => `[${chord}]`).join(" ");
}

/**
 * Clean up and normalize parsed output
 * Preserves intentional spacing but removes excessive whitespace
 */
export function normalizeChordMarkup(lines: string[]): string[] {
  return lines
    .filter(line => line.trim())
    .map(line => line.trim())
    .map(line => {
      // Only collapse multiple spaces that aren't between lyrics
      // Keep single spaces intact
      return line.replace(/\s{2,}/g, " ");
    });
}
