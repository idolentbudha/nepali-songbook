import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { Stack, type StackProps } from "./Stack";
import type { SpaceProps } from "./space";

export type VStackProps = Omit<StackProps, "direction"> &
  SpaceProps & {
    style?: StyleProp<ViewStyle>;
  };

export function VStack(props: VStackProps) {
  return <Stack {...props} direction="column" />;
}

export const Column = VStack;

export default VStack;
