/**
 * Transpose chord symbols by semitone steps, with a choice of sharp/flat notation.
 * Handles simple roots and common accidentals/quality/extensions (e.g., C, Gm7, F#maj7, Bbadd9/D).
 */

export type Notation = "sharp" | "flat";

const NOTES_SHARP = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;
const NOTES_FLAT = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
] as const;

function normalizeRoot(
  root: string
): { index: number; canonical: string } | null {
  const up = root.toUpperCase();
  // Try sharp table
  let idx = NOTES_SHARP.indexOf(up as any);
  if (idx >= 0) return { index: idx, canonical: NOTES_SHARP[idx] };
  // Try flat table
  idx = NOTES_FLAT.indexOf(up as any);
  if (idx >= 0) return { index: idx, canonical: NOTES_FLAT[idx] };
  return null;
}

/** Extract root (with accidental) and the remainder (quality/extensions/bass) */
export function splitChordSymbol(
  chord: string
): { root: string; rest: string; bass?: string } | null {
  if (!chord) return null;
  // Regex: root (A-G), optional accidental (#/b), then the rest; optional slash bass (e.g., /E)
  const m = chord.match(/^([A-Ga-g])([#b]?)([^/]*)(?:\/([A-Ga-g][#b]?))?$/);
  if (!m) return null;
  const root = `${m[1].toUpperCase()}${m[2] || ""}`;
  const rest = m[3] || "";
  const bass = m[4] ? m[4].toUpperCase() : undefined;
  return { root, rest, bass };
}

function transposeIndex(idx: number, steps: number): number {
  const n = (idx + steps) % 12;
  return n < 0 ? n + 12 : n;
}

function noteAt(index: number, notation: Notation): string {
  return notation === "flat" ? NOTES_FLAT[index] : NOTES_SHARP[index];
}

export function transposeChord(
  chord: string,
  steps: number,
  notation: Notation = "sharp"
): string {
  if (!chord || steps === 0) return chord;
  const parts = splitChordSymbol(chord);
  if (!parts) return chord;
  const rootInfo = normalizeRoot(parts.root);
  if (!rootInfo) return chord;
  const newRoot = noteAt(transposeIndex(rootInfo.index, steps), notation);

  let newBass = parts.bass;
  if (newBass) {
    const bassInfo = normalizeRoot(newBass);
    if (bassInfo) {
      newBass = noteAt(transposeIndex(bassInfo.index, steps), notation);
    }
  }

  return newBass
    ? `${newRoot}${parts.rest}/${newBass}`
    : `${newRoot}${parts.rest}`;
}
