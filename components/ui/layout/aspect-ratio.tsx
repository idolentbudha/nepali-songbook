import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

export type AspectRatioProps = {
  /** aspect ratio = width / height. Example: 16 / 9 = 1.777... */
  ratio: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** If true, sets width: '100%'. Defaults to true. */
  fillWidth?: boolean;
  testID?: string;
};

export function AspectRatio({
  ratio,
  children,
  style,
  fillWidth = true,
  testID,
}: AspectRatioProps) {
  return (
    <View
      testID={testID}
      style={[
        { aspectRatio: ratio, width: fillWidth ? "100%" : undefined },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default AspectRatio;
