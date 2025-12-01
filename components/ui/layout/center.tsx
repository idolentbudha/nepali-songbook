import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { spaceStyle, type SpaceProps } from "./space";

export type CenterProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
} & SpaceProps;

export function Center({ children, style, testID, ...space }: CenterProps) {
  return (
    <View
      testID={testID}
      style={[
        { alignItems: "center", justifyContent: "center" },
        spaceStyle(space),
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default Center;
