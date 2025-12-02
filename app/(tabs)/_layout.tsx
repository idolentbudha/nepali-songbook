import React from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Icon, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="songs">
        <Icon sf={{ default: "music.note", selected: "music.note.list" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorites">
        <Icon sf={{ default: "heart", selected: "heart.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="add">
        <Icon
          sf={{
            default: "square.and.pencil",
            selected: "square.and.pencil",
          }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
  // return (
  //   <Tabs
  //     screenOptions={{
  //       tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
  //       headerShown: false,
  //       tabBarButton: HapticTab,
  //     }}
  //   >
  //     <Tabs.Screen
  //       name="songs"
  //       options={{
  //         title: "Songs",
  //         tabBarIcon: ({ color }) => (
  //           <IconSymbol size={28} name="music.note.list" color={color} />
  //         ),
  //       }}
  //     />
  //     <Tabs.Screen
  //       name="index"
  //       options={{
  //         title: "Search",
  //         tabBarIcon: ({ color }) => (
  //           <IconSymbol size={28} name="magnifyingglass" color={color} />
  //         ),
  //       }}
  //     />
  //     <Tabs.Screen
  //       name="favorites"
  //       options={{
  //         title: "Favorites",
  //         tabBarIcon: ({ color }) => (
  //           <IconSymbol size={28} name="heart.fill" color={color} />
  //         ),
  //       }}
  //     />
  //     <Tabs.Screen
  //       name="add"
  //       options={{
  //         title: "Add",
  //         tabBarIcon: ({ color }) => (
  //           <IconSymbol size={28} name="square.and.pencil" color={color} />
  //         ),
  //       }}
  //     />
  //   </Tabs>
  // );
}
