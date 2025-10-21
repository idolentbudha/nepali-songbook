import { Typography } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

export type TextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "bodySemiBold"
  | "caption"
  | "overline"
  | "link";

export type UiTextProps = RNTextProps & {
  variant?: TextVariant;
  lightColor?: string;
  darkColor?: string;
  align?: TextStyle["textAlign"];
  weight?: keyof typeof Typography.weights;
};

export function UiText({
  variant = "body",
  lightColor,
  darkColor,
  align,
  weight,
  style,
  ...rest
}: UiTextProps) {
  const defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const linkColor = useThemeColor({}, "tint");

  const base: TextStyle = {
    color: variant === "link" ? linkColor : defaultColor,
    textAlign: align,
  };

  const variantStyle = getVariantStyle(variant, weight);

  return <RNText style={[base, variantStyle, style]} {...rest} />;
}

function getVariantStyle(
  variant: TextVariant,
  weightOverride?: keyof typeof Typography.weights
): TextStyle {
  const weights = Typography.weights;
  const sizes = Typography.sizes;
  const lines = Typography.lineHeights;

  const chooseWeight = (fallback: keyof typeof weights) =>
    weightOverride ? weights[weightOverride] : weights[fallback];

  switch (variant) {
    case "title":
      return {
        fontSize: sizes["3xl"],
        lineHeight: lines["3xl"],
        fontWeight: chooseWeight("bold") as any,
      };
    case "subtitle":
      return {
        fontSize: sizes.xl,
        lineHeight: lines.xl,
        fontWeight: chooseWeight("bold") as any,
      };
    case "bodySemiBold":
      return {
        fontSize: sizes.base,
        lineHeight: lines.base,
        fontWeight: chooseWeight("semibold") as any,
      };
    case "caption":
      return {
        fontSize: sizes.sm,
        lineHeight: lines.sm,
        fontWeight: chooseWeight("normal") as any,
      };
    case "overline":
      return {
        fontSize: sizes.xs,
        lineHeight: lines.xs,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        fontWeight: chooseWeight("medium") as any,
      };
    case "link":
      return {
        fontSize: sizes.base,
        lineHeight: lines.base,
        fontWeight: chooseWeight("semibold") as any,
      };
    case "body":
    default:
      return {
        fontSize: sizes.base,
        lineHeight: lines.base,
        fontWeight: chooseWeight("normal") as any,
      };
  }
}

// Reserved for future style overrides if needed
