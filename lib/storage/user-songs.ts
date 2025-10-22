import type { Song } from "@/types/song";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@user_songs";

export async function getUserSongs(): Promise<Song[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Song[];
    return [];
  } catch (e) {
    console.warn("Failed to read user songs:", e);
    return [];
  }
}

export async function setUserSongs(songs: Song[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(songs));
  } catch (e) {
    console.warn("Failed to write user songs:", e);
  }
}

export async function addUserSong(song: Song): Promise<void> {
  const list = await getUserSongs();
  list.push(song);
  await setUserSongs(list);
}

export async function clearUserSongs(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {
    console.warn("Failed to clear user songs:", e);
  }
}

export function makeUserSongId(): string {
  return `user-${Date.now()}`;
}
