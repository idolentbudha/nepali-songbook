import { Spacing } from "@/constants/tokens";
import React from "react";
import { View } from "react-native";

export type SpacerProps = {
  size?: keyof typeof Spacing | number;
  axis?: "vertical" | "horizontal";
  /** Optional test id for e2e */
  testID?: string;
};

function resolveSpacing(size?: keyof typeof Spacing | number): number {
  if (size == null) return 0;
  const tokens = Spacing as Record<string, number>;
  if (typeof size === "number") {
    // If the number maps to a token key, prefer the token value; otherwise use the raw number.
    const tokenVal = tokens[String(size)];
    return typeof tokenVal === "number" ? tokenVal : size;
  }
  return tokens[String(size)] ?? 0;
}

export function Spacer({ size = 0, axis = "vertical", testID }: SpacerProps) {
  const value = resolveSpacing(size);
  return (
    <View
      testID={testID}
      style={
        axis === "vertical"
          ? { height: value, width: 0, flexShrink: 0 }
          : { width: value, height: 0, flexShrink: 0 }
      }
    />
  );
}
