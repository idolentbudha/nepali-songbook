import { MOCKED_SEARCH_SCREEN_DATA } from "@/constants/dummy-responses";
import db from "@/database";
import { userSongsTable } from "@/database/schema";

type SeedSong = {
  id: string;
  title: string;
  artist: string;
  tags?: string[];
  lines?: string[];
};

// Map mocked search items into minimal seedable songs.
export const seedSongs: SeedSong[] = MOCKED_SEARCH_SCREEN_DATA.map(item => ({
  id: item.id,
  title: item.title,
  artist: item.artist || item.source.site,
  tags: [item.source.site.replace(/^www\./, "")],
  lines: [`[C]Sample line for ${item.title}`, `[G]Replace with imported content later`],
}));

export async function runSeeds() {
  // Insert seed songs if not already present
  for (const s of seedSongs) {
    try {
      await db.insert(userSongsTable).values({
        id: s.id,
        title: s.title,
        artist: s.artist,
        key: null as any,
        capo: null as any,
        bpm: null as any,
        tags: (s.tags ?? []).join(","),
        lines: (s.lines ?? []).join("\n"),
      } as any);
    } catch (e) {
      // ignore duplicates or insert errors in seed
    }
  }
}
