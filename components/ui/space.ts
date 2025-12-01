import { Spacing } from "@/constants/tokens";
import type { ViewStyle } from "react-native";

export type SpaceScale = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type SpaceValue = SpaceScale | number;

export type SpaceProps = {
  p?: SpaceValue;
  px?: SpaceValue;
  py?: SpaceValue;
  pt?: SpaceValue;
  pr?: SpaceValue;
  pb?: SpaceValue;
  pl?: SpaceValue;
  m?: SpaceValue;
  mx?: SpaceValue;
  my?: SpaceValue;
  mt?: SpaceValue;
  mr?: SpaceValue;
  mb?: SpaceValue;
  ml?: SpaceValue;
};

const map: Record<SpaceScale, number> = {
  xs: Spacing[1], // 4
  sm: Spacing[2], // 8
  md: Spacing[3], // 12
  lg: Spacing[4], // 16
  xl: Spacing[5], // 20
  "2xl": Spacing[6], // 24
  "3xl": Spacing[8], // 32
};

export function resolveSpace(v?: SpaceValue): number | undefined {
  if (v == null) return undefined;
  if (typeof v === "number") return v;
  return map[v];
}

export function spaceStyle(props: SpaceProps): ViewStyle {
  const s: ViewStyle = {};

  // padding
  const p = resolveSpace(props.p);
  if (p != null) {
    s.padding = p;
  }
  const px = resolveSpace(props.px);
  if (px != null) {
    s.paddingLeft = px;
    s.paddingRight = px;
  }
  const py = resolveSpace(props.py);
  if (py != null) {
    s.paddingTop = py;
    s.paddingBottom = py;
  }
  const pt = resolveSpace(props.pt);
  if (pt != null) s.paddingTop = pt;
  const pr = resolveSpace(props.pr);
  if (pr != null) s.paddingRight = pr;
  const pb = resolveSpace(props.pb);
  if (pb != null) s.paddingBottom = pb;
  const pl = resolveSpace(props.pl);
  if (pl != null) s.paddingLeft = pl;

  // margin
  const m = resolveSpace(props.m);
  if (m != null) {
    s.margin = m;
  }
  const mx = resolveSpace(props.mx);
  if (mx != null) {
    s.marginLeft = mx;
    s.marginRight = mx;
  }
  const my = resolveSpace(props.my);
  if (my != null) {
    s.marginTop = my;
    s.marginBottom = my;
  }
  const mt = resolveSpace(props.mt);
  if (mt != null) s.marginTop = mt;
  const mr = resolveSpace(props.mr);
  if (mr != null) s.marginRight = mr;
  const mb = resolveSpace(props.mb);
  if (mb != null) s.marginBottom = mb;
  const ml = resolveSpace(props.ml);
  if (ml != null) s.marginLeft = ml;

  return s;
}
