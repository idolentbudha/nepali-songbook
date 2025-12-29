import { DATABASE_NAME } from "@/constants/constants";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

const expo_db = SQLite.openDatabaseSync(DATABASE_NAME);
const db = drizzle(expo_db);

export { db, expo_db };
