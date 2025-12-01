import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import type { SpaceProps } from "./space";
import { Stack, type StackProps } from "./stack";

export type VStackProps = Omit<StackProps, "direction"> &
  SpaceProps & {
    style?: StyleProp<ViewStyle>;
  };

export function VStack(props: VStackProps) {
  return <Stack {...props} direction="column" />;
}

export const Column = VStack;

export default VStack;
