import { Typography } from "@/constants/tokens";
import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: Typography.sizes.base,
    lineHeight: Typography.lineHeights.base,
    fontWeight: Typography.weights.normal as any,
  },
  defaultSemiBold: {
    fontSize: Typography.sizes.base,
    lineHeight: Typography.lineHeights.base,
    fontWeight: Typography.weights.semibold as any,
  },
  title: {
    fontSize: Typography.sizes["3xl"],
    fontWeight: Typography.weights.bold as any,
    lineHeight: Typography.lineHeights["3xl"],
  },
  subtitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold as any,
    lineHeight: Typography.lineHeights.xl,
  },
  link: {
    lineHeight: 30,
    fontSize: Typography.sizes.base,
    color: "#0a7ea4",
  },
});
