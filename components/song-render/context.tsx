import React, { createContext, useContext, useMemo, useState } from "react";

export type ViewMode = "chords" | "lyrics";
export type Notation = "sharp" | "flat";

export interface SongRenderSettings {
  viewMode: ViewMode;
  transposeSteps: number;
  notation: Notation;
  language?: string;
}

const SongRenderContext = createContext<{
  settings: SongRenderSettings;
  setSettings: (next: Partial<SongRenderSettings>) => void;
} | null>(null);

export function SongRenderProvider({
  children,
  initial,
}: {
  children: React.ReactNode;
  initial?: Partial<SongRenderSettings>;
}) {
  const [settings, setInternal] = useState<SongRenderSettings>({
    viewMode: initial?.viewMode ?? "chords",
    transposeSteps: initial?.transposeSteps ?? 0,
    notation: initial?.notation ?? "sharp",
    language: initial?.language,
  });

  const api = useMemo(
    () => ({
      settings,
      setSettings: (next: Partial<SongRenderSettings>) =>
        setInternal((prev) => ({ ...prev, ...next })),
    }),
    [settings]
  );

  return (
    <SongRenderContext.Provider value={api}>
      {children}
    </SongRenderContext.Provider>
  );
}

export function useSongRender() {
  const ctx = useContext(SongRenderContext);
  if (!ctx)
    throw new Error("useSongRender must be used within SongRenderProvider");
  return ctx;
}
