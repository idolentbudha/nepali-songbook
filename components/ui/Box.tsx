import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { spaceStyle, type SpaceProps } from "./space";

export type BoxProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
} & SpaceProps;

export function Box({ children, style, testID, ...space }: BoxProps) {
  return (
    <View testID={testID} style={[spaceStyle(space), style]}>
      {children}
    </View>
  );
}

export default Box;
