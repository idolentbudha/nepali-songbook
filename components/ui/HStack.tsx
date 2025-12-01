import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { Stack, type StackProps } from "./Stack";
import type { SpaceProps } from "./space";

export type HStackProps = Omit<StackProps, "direction"> &
  SpaceProps & {
    style?: StyleProp<ViewStyle>;
  };

export function HStack(props: HStackProps) {
  return <Stack {...props} direction="row" />;
}

export const Row = HStack;

export default HStack;
