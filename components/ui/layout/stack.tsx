import { Spacing } from "@/constants/tokens";
import React, { Fragment, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { spaceStyle, type SpaceProps } from "./space";
import { Spacer } from "./spacer";

export type StackProps = {
  children?: React.ReactNode;
  direction?: "row" | "column";
  space?: keyof typeof Spacing | number;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  wrap?: ViewStyle["flexWrap"];
  divider?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Optional test id for e2e */
  testID?: string;
} & SpaceProps;

export function Stack({
  children,
  direction = "column",
  space = 0,
  align,
  justify,
  wrap,
  divider,
  style,
  testID,
  ...spaceProps
}: StackProps) {
  const axis = direction === "row" ? "horizontal" : "vertical";
  const items = React.Children.toArray(children);

  if (items.length === 0) {
    return <View style={[{ flexDirection: direction }, style]} testID={testID} />;
  }

  const interleaved: ReactNode[] = [];
  items.forEach((child, idx) => {
    if (idx > 0) {
      if (divider) {
        interleaved.push(<Fragment key={`divider-${idx}`}>{divider}</Fragment>);
      }
      interleaved.push(<Spacer key={`spacer-${idx}`} size={space} axis={axis} />);
    }
    interleaved.push(<Fragment key={`item-${idx}`}>{child}</Fragment>);
  });

  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
        },
        spaceStyle(spaceProps),
        style,
      ]}
    >
      {interleaved}
    </View>
  );
}

export default Stack;
