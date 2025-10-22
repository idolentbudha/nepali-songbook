import { getSongs } from "@/lib/data/songs";
import { getUserSongs } from "@/lib/storage/user-songs";
import type { Song } from "@/types/song";

export async function getAllSongs(): Promise<Song[]> {
  const base = getSongs();
  const user = await getUserSongs();
  return [...base, ...user];
}

export async function findAnySongById(id: string): Promise<Song | undefined> {
  const base = getSongs();
  const found = base.find((s) => s.id === id);
  if (found) return found;
  const user = await getUserSongs();
  return user.find((s) => s.id === id);
}
