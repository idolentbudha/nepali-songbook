import { Radius, Shadows, Spacing, Typography } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
  accessibilityLabel?: string;
};

const sizeStyles: Record<
  ButtonSize,
  { paddingV: number; paddingH: number; fontSize: number; lineHeight: number }
> = {
  sm: {
    paddingV: Spacing[2],
    paddingH: Spacing[3],
    fontSize: Typography.sizes.sm,
    lineHeight: Typography.lineHeights.sm,
  },
  md: {
    paddingV: Spacing[3],
    paddingH: Spacing[4],
    fontSize: Typography.sizes.base,
    lineHeight: Typography.lineHeights.base,
  },
  lg: {
    paddingV: Spacing[4],
    paddingH: Spacing[5],
    fontSize: Typography.sizes.lg,
    lineHeight: Typography.lineHeights.lg,
  },
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  testID,
  accessibilityLabel,
}: ButtonProps) {
  // Base colors from theme with sensible defaults; useThemeColor resolves based on current scheme
  const backgroundPrimary = useThemeColor({}, "tint");
  const textOnPrimary = useThemeColor(
    { light: "#FFFFFF", dark: "#11181C" },
    "text"
  );
  const bgDefault = useThemeColor({}, "background");
  const textDefault = useThemeColor({}, "text");
  const iconDefault = useThemeColor({}, "icon");

  const sz = sizeStyles[size];

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: Radius.lg,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: sz.paddingV,
      paddingHorizontal: sz.paddingH,
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case "primary":
        return {
          ...base,
          backgroundColor: backgroundPrimary,
          ...(Shadows.base as ViewStyle),
        };
      case "secondary":
        return {
          ...base,
          backgroundColor: bgDefault,
          borderWidth: 1,
          borderColor: iconDefault as string,
        };
      case "ghost":
        return { ...base, backgroundColor: "transparent" };
    }
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontSize: sz.fontSize,
      lineHeight: sz.lineHeight,
      fontWeight: Typography.weights.semibold as any,
    };

    switch (variant) {
      case "primary":
        return { ...base, color: textOnPrimary };
      case "secondary":
        return { ...base, color: textDefault };
      case "ghost":
        return { ...base, color: backgroundPrimary };
    }
  };

  const gap = Spacing[2];

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      disabled={disabled || loading}
      onPress={onPress}
      style={[getContainerStyle(), style]}
    >
      {leftIcon ? <React.Fragment>{leftIcon}</React.Fragment> : null}
      {leftIcon ? <SpacerInline size={gap} /> : null}
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      {rightIcon ? <SpacerInline size={gap} /> : null}
      {rightIcon ? <React.Fragment>{rightIcon}</React.Fragment> : null}
      {loading ? (
        <React.Fragment>
          <SpacerInline size={gap} />
          <ActivityIndicator
            size="small"
            color={variant === "primary" ? textOnPrimary : backgroundPrimary}
          />
        </React.Fragment>
      ) : null}
    </Pressable>
  );
}

function SpacerInline({ size }: { size: number }) {
  return <View style={{ width: size, height: 1 }} />;
}
