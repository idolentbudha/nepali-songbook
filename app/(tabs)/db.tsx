import { ThemedView } from "@/components/themed-view";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { usersTable } from "./../../db/schema";
import migrations from "./../../drizzle/migrations";

const expo = SQLite.openDatabaseSync("db.db");

const db = drizzle(expo);

export default function DatabaseView() {
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<(typeof usersTable.$inferSelect)[] | null>(null);

  useEffect(() => {
    if (!success) return;

    (async () => {
      await db.delete(usersTable);

      await db.insert(usersTable).values([
        {
          name: "John",
          age: 30,
          email: "john@example.com",
        },
      ]);

      const users = await db.select().from(usersTable);
      setItems(users);
    })();
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  if (items === null || items.length === 0) {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }

  return (
    <ThemedView
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {items.map(item => (
        <Text key={item.id}>{item.email}</Text>
      ))}
    </ThemedView>
  );
}
