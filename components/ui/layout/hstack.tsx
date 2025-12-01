import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import type { SpaceProps } from "./space";
import { Stack, type StackProps } from "./stack";

export type HStackProps = Omit<StackProps, "direction"> &
  SpaceProps & {
    style?: StyleProp<ViewStyle>;
  };

export function HStack(props: HStackProps) {
  return <Stack {...props} direction="row" />;
}

export const Row = HStack;

export default HStack;
