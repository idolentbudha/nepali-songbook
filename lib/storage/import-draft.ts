import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@import_draft";

export type ImportDraft = {
  title: string;
  artist: string;
  /** Optional album name if detected */
  album?: string;
  /** Optional chord key/tonality if detected */
  key?: string;
  lines: string[];
  sourceUrl: string;
};

export async function setImportDraft(draft: ImportDraft): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(draft));
}

export async function getImportDraft(): Promise<ImportDraft | null> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ImportDraft;
  } catch {
    return null;
  }
}

export async function clearImportDraft(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
