import React from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { spaceStyle, type SpaceProps } from "./space";

export type ZStackProps = {
  children?: React.ReactNode;
  /** Horizontal alignment of stacked children inside the container */
  align?: ViewStyle["alignItems"]; // start|center|end etc.
  /** Vertical alignment of stacked children inside the container */
  justify?: ViewStyle["justifyContent"]; // start|center|end etc.
  style?: StyleProp<ViewStyle>;
  testID?: string;
} & SpaceProps;

export function ZStack({
  children,
  align,
  justify,
  style,
  testID,
  ...space
}: ZStackProps) {
  const kids = React.Children.toArray(children);
  return (
    <View
      testID={testID}
      style={[{ position: "relative" }, spaceStyle(space), style]}
    >
      {kids.map((child, idx) => (
        <View
          key={idx}
          pointerEvents="box-none"
          style={[
            StyleSheet.absoluteFill,
            { alignItems: align, justifyContent: justify },
          ]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

export default ZStack;
