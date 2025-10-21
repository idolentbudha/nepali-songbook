import songsData from "@/assets/data/songs.json";
import type { Song } from "@/types/song";

// In Metro/Expo, importing JSON is supported; coerce to our type.
const SONGS: Song[] = songsData as unknown as Song[];

export function getSongs(): Song[] {
  return SONGS;
}

export function findSongById(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id);
}

export function getArtists(): string[] {
  const set = new Set<string>();
  for (const s of SONGS) set.add(s.artist);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getTags(): string[] {
  const set = new Set<string>();
  for (const s of SONGS) s.tags?.forEach((t) => set.add(t));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
