import { db } from "@/database";
import { userSongsTable } from "@/database/schema";
import { getSongs } from "@/lib/data/songs";
import type { Song } from "@/types/song";

function mapDbRowToSong(row: typeof userSongsTable.$inferSelect): Song {
  const tags = (row.tags ?? "")
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);
  const lines = (row.lines ?? "").split(/\r?\n/).map(l => l.replace(/\s+$/g, ""));
  return {
    id: String(row.id),
    title: row.title,
    artist: row.artist,
    key: row.key ?? undefined,
    capo: typeof row.capo === "number" ? row.capo : undefined,
    bpm: typeof row.bpm === "number" ? row.bpm : undefined,
    tags,
    lines,
  };
}

export async function getAllSongs(): Promise<Song[]> {
  const base = getSongs();
  let userDb: Song[] = [];
  try {
    const rows = await db.select().from(userSongsTable);
    userDb = rows.map(mapDbRowToSong);
    console.log("songs_home:", rows);
  } catch (_) {
    userDb = [];
  }
  // return [...base, ...userDb];
  return [...userDb];
}

export async function findAnySongById(id: string): Promise<Song | undefined> {
  const base = getSongs();
  const found = base.find(s => s.id === id);
  if (found) return found;
  try {
    const rows = await db.select().from(userSongsTable);
    const mapped = rows.map(mapDbRowToSong);
    return mapped.find(s => s.id === id);
  } catch (_) {
    return undefined;
  }
}
