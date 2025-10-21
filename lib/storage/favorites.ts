import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

const KEY = "favorites:songIds";

export async function getFavoriteIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as string[]) : [];
  } catch {
    return [];
  }
}

export async function setFavoriteIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => {
    getFavoriteIds().then(setIds);
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      if (!ids) return false;
      return ids.includes(id);
    },
    [ids]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      const current = ids ?? (await getFavoriteIds());
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      setIds(next);
      await setFavoriteIds(next);
    },
    [ids]
  );

  const value = useMemo(
    () => ({ ready: ids !== null, ids: ids ?? [], isFavorite, toggleFavorite }),
    [ids, isFavorite, toggleFavorite]
  );

  return value;
}
