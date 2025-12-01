import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { spaceStyle, type SpaceProps } from "./space";

export type FlexProps = {
  children?: React.ReactNode;
  direction?: ViewStyle["flexDirection"];
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  wrap?: ViewStyle["flexWrap"];
  grow?: number;
  shrink?: number;
  basis?: ViewStyle["flexBasis"];
  style?: StyleProp<ViewStyle>;
  testID?: string;
} & SpaceProps;

export function Flex({
  children,
  direction = "column",
  align,
  justify,
  wrap,
  grow,
  shrink,
  basis,
  style,
  testID,
  ...space
}: FlexProps) {
  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          flexGrow: grow,
          flexShrink: shrink,
          flexBasis: basis,
        },
        spaceStyle(space),
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default Flex;
