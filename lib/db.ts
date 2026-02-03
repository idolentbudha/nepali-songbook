import bundledSongs from "@/assets/data/songs.json";
import { DATABASE_NAME } from "@/constants/constants";
import { db, expo_db } from "@/database";
import { userSongsTable } from "@/database/schema";
import type { Song } from "@/types/song";
import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

//export database
const exportDB = async () => {
  const file = new File(Paths.document, "SQLite", `${DATABASE_NAME}`);
  const exportedFile = new File(Paths.document, "SQLite", `Exported_${DATABASE_NAME}`);
  console.log("Paths.document: ", Paths.document);
  // console.log("Paths.cache: ", Paths.cache);
  console.log("exists:", file.exists);

  // Implementation for exporting the database
  await expo_db.execAsync("PRAGMA wal_checkpoint(FULL)");
  await file.copy(exportedFile);

  const sharingAvailable = await Sharing.isAvailableAsync();
  console.log("sharingAvailable:", sharingAvailable);

  await Sharing.shareAsync(exportedFile.uri, { mimeType: "application/x-sqlite3" });
  exportedFile.delete();
  await alert(`Database exported to: ${exportedFile.uri}`);
};

// Export songs to CSV
const exportSongsCSV = async () => {
  try {
    const songs = await db.select().from(userSongsTable);

    // CSV header
    const headers = ["id", "title", "artist", "key", "capo", "bpm", "tags", "lines"];
    const csvHeader = headers.join(",");

    // CSV rows
    const csvRows = songs.map(song => {
      return [
        escapeCSV(song.id),
        escapeCSV(song.title),
        escapeCSV(song.artist),
        escapeCSV(song.key || ""),
        song.capo?.toString() || "",
        song.bpm?.toString() || "",
        escapeCSV(song.tags),
        escapeCSV(song.lines),
      ].join(",");
    });

    const csvContent = [csvHeader, ...csvRows].join("\n");

    // Save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const csvFile = new File(Paths.document, `songs_export_${timestamp}.csv`);
    await csvFile.write(csvContent);

    // Share the file
    const sharingAvailable = await Sharing.isAvailableAsync();
    if (sharingAvailable) {
      await Sharing.shareAsync(csvFile.uri, { mimeType: "text/csv" });
    }

    console.log(`Exported ${songs.length} songs to CSV`);
    alert(`Exported ${songs.length} songs successfully!`);
  } catch (error) {
    console.error("Failed to export songs CSV:", error);
    alert("Failed to export songs. Please try again.");
  }
};

// Import CSV and override songs table
const importSongsCSV = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "text/csv",
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return;
    }

    const file = new File(result.assets[0].uri);
    const csvContent = await file.text();

    // Parse CSV
    const lines = csvContent.split("\n");
    const headers = lines[0].split(",");

    // Validate headers
    const expectedHeaders = ["id", "title", "artist", "key", "capo", "bpm", "tags", "lines"];
    if (headers.join(",") !== expectedHeaders.join(",")) {
      alert("Invalid CSV format. Headers don't match expected format.");
      return;
    }

    // Parse rows
    const songs = lines
      .slice(1)
      .filter(line => line.trim())
      .map(line => parseCSVRow(line));

    // Clear existing songs and insert new ones
    await expo_db.execAsync("DELETE FROM user_songs;");

    for (const song of songs) {
      await db.insert(userSongsTable).values({
        id: song.id,
        title: song.title,
        artist: song.artist,
        key: song.key || null,
        capo: song.capo ? parseInt(song.capo, 10) : null,
        bpm: song.bpm ? parseInt(song.bpm, 10) : null,
        tags: song.tags,
        lines: song.lines,
      } as any);
    }

    console.log(`Imported ${songs.length} songs from CSV`);
    alert(`Successfully imported ${songs.length} songs!`);
  } catch (error) {
    console.error("Failed to import songs CSV:", error);
    alert("Failed to import songs. Please check the CSV format.");
  }
};

// Helper to escape CSV values
function escapeCSV(value: string | null | undefined): string {
  if (!value) return "";
  const str = String(value);
  // Escape quotes and wrap in quotes if contains comma, newline, or quote
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Helper to parse CSV row with proper quote handling
function parseCSVRow(row: string): {
  id: string;
  title: string;
  artist: string;
  key: string;
  capo: string;
  bpm: string;
  tags: string;
  lines: string;
} {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);

  return {
    id: values[0] || "",
    title: values[1] || "",
    artist: values[2] || "",
    key: values[3] || "",
    capo: values[4] || "",
    bpm: values[5] || "",
    tags: values[6] || "",
    lines: values[7] || "",
  };
}

const clearSongsTable = async () => {
  await expo_db.execAsync("DELETE FROM user_songs;");
  console.log("user_songs table cleared.");
};

// Import bundled songs from songs.json into database
const importBundledSongs = async () => {
  try {
    // Map bundled songs to database schema
    const songsToInsert = bundledSongs.map((song: Song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      key: song.key || null,
      capo: song.capo || 0,
      bpm: song.bpm || null,
      tags: song.tags.join(","),
      lines: song.lines.join("\n"),
    }));

    // Insert songs into database
    await db.insert(userSongsTable).values(songsToInsert).onConflictDoNothing();

    console.log(`Imported ${songsToInsert.length} bundled songs into database`);
    return songsToInsert.length;
  } catch (error) {
    console.error("Failed to import bundled songs:", error);
    throw error;
  }
};

export { clearSongsTable, exportDB, exportSongsCSV, importBundledSongs, importSongsCSV };
