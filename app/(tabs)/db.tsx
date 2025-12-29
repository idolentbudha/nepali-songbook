import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/Button";
import { VStack } from "@/components/ui/layout";
import { db } from "@/database";
import { runSeeds } from "@/database/seed";
import { exportDB } from "@/lib/db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TextInput } from "react-native";
import { usersTable } from "../../database/schema";
import migrations from "./../../drizzle/migrations";

export default function DatabaseView() {
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<(typeof usersTable.$inferSelect)[] | null>([]);
  const nameRef = useRef<TextInput>(null);
  const ageRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const [userForm, setUserForm] = useState({ name: "", age: "", email: "" });

  useEffect(() => {
    if (!success) return;

    (async () => {
      // await db.delete(usersTable);

      // await db.insert(usersTable).values([
      //   {
      //     name: "John",
      //     age: 30,
      //     email: "john@example.com",
      //   },
      // ]);

      // const users = await db.select().from(usersTable);
      // Run seed data for user_songs after migrations
      await runSeeds();
    })();
  }, [success]);

  // if (error) {
  //   return (
  //     <View>
  //       <Text>Migration error: {error.message}</Text>
  //     </View>
  //   );
  // }

  // if (!success) {
  //   return (
  //     <View>
  //       <Text>Migration is in progress...</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
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
        <Button
          title="Fetch Users"
          onPress={async () => {
            const users = await db.select().from(usersTable);
            setItems(users);
          }}
        />

        <VStack space={2}>
          <TextInput
            ref={nameRef}
            placeholder="Name"
            style={{ borderWidth: 1, width: 200, marginTop: 20 }}
            onChangeText={v => {
              setUserForm(p => {
                return { ...p, name: v };
              });
            }}
          />
          <TextInput
            ref={ageRef}
            placeholder="Age"
            style={{ borderWidth: 1, width: 200, marginTop: 20 }}
            onChangeText={v => {
              setUserForm(p => {
                return { ...p, age: v };
              });
            }}
          />
          <TextInput
            ref={emailRef}
            placeholder="Email"
            style={{ borderWidth: 1, width: 200, marginTop: 20 }}
            onChangeText={v => {
              setUserForm(p => {
                return { ...p, email: v };
              });
            }}
          />
          <Button
            title="Save User"
            onPress={async () => {
              const _data = {
                name: nameRef.current,
                // age: ageRef.current?.value,
                // email: emailRef.current?.value,
              };
              console.log("data:", userForm);
              await db.insert(usersTable).values({
                name: userForm.name,
                age: parseInt(userForm.age, 10),
                email: userForm.email,
              });
              const users = await db.select().from(usersTable);
              setItems(users);
              setUserForm({ name: "", age: "", email: "" });
            }}
          />
          <Button
            title="Export Data"
            onPress={() => {
              exportDB();
            }}
          />
          <Button
            title="Import Data"
            onPress={async e => {
              e.stopPropagation();
            }}
          />
        </VStack>
      </ThemedView>
    </ScrollView>
  );
}
