// Feature flags. Use EXPO_PUBLIC_* env vars to configure at build/runtime.

export const SEARCH_ONLINE_ENABLED: boolean =
  (typeof process !== "undefined" &&
    (process.env as any)?.EXPO_PUBLIC_SEARCH_ONLINE === "true") ||
  false;

// Add more flags here as needed, e.g. moderation UI, proxy usage banners, etc.
export const SEARCH_SITES: string[] = (() => {
  const raw =
    (typeof process !== "undefined" &&
      (process.env as any)?.EXPO_PUBLIC_SEARCH_SITES) ||
    "";
  return raw
    .split(",")
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0);
})();

export const GOOGLE_CSE = {
  key:
    (typeof process !== "undefined" &&
      (process.env as any)?.EXPO_PUBLIC_GOOGLE_CSE_KEY) ||
    "",
  cx:
    (typeof process !== "undefined" &&
      (process.env as any)?.EXPO_PUBLIC_GOOGLE_CSE_CX) ||
    "",
};
