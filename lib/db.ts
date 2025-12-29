import { DATABASE_NAME } from "@/constants/constants";
import { expo_db } from "@/database";
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
export { exportDB };
