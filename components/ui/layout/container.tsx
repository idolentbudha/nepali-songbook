import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import {
  resolveSpace,
  spaceStyle,
  type SpaceProps,
  type SpaceValue,
} from "./space";

export type ContainerProps = {
  children?: React.ReactNode;
  /** Max content width, typically for large screens (web/tablet). */
  maxW?: number;
  /** Horizontal padding inside the container. */
  px?: number | SpaceValue;
  style?: StyleProp<ViewStyle>;
  testID?: string;
} & SpaceProps;

export function Container({
  children,
  maxW = 720,
  px = 16,
  style,
  testID,
  ...space
}: ContainerProps) {
  return (
    <View
      testID={testID}
      style={[
        {
          width: "100%",
          alignSelf: "center",
          maxWidth: maxW,
          paddingHorizontal: typeof px === "number" ? px : resolveSpace(px),
        },
        spaceStyle(space),
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default Container;
