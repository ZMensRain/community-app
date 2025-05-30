import { ViewStyle, ColorValue } from "react-native";
import { EventTag, EventType } from "../model/event";

type ColorValueHex = `#${string}`;

export const padding = { small: 10, medium: 15, large: 20 };
export const margin = { small: 10, medium: 15, large: 20 };
export const colors = {
  primary: "#004FC5",
  secondary: "#A5D59C",
  primaryContainer: "#F2F2F2",
  input: "#E0E0E0",
  subText: "#494949",
  background: "white",
};

export const inputStyle: ViewStyle = {
  marginVertical: 7.5,
  paddingVertical: padding.small,
  paddingHorizontal: padding.medium,
  borderColor: "#E0E0E0",
  borderRadius: 10,
  borderWidth: 1,
};

export const pageStyle: ViewStyle = {
  flex: 1,
  paddingHorizontal: padding.small,
  paddingTop: padding.small,
  backgroundColor: colors.background,
};

const _tagColors: ColorValueHex[] = [
  "#B53B69",
  "#FF1493",
  "#1E90FF",
  "#0000CD",
  "#E6E6FA",
  "#808080",
  "#8B008B",
  "#F0F8FF",
  "#FFA500",
  "#9ACD32",
  "#DAA520",
  "#6B8E23",
  "#F5DEB3",
  "#FFFAFA",
  "#9966CC",
  "#BC8F8F",
  "#808000",
  "#FFA07A",
  "#4682B4",
  "#FDF5E6",
  "#FFD700",
  "#008000",
  "#3CB371",
  "#A9A9A9",
  "#FFE4E1",
  "#800000",
  "#DEB887",
  "#FFDAB9",
  "#C71585",
  "#00FFFF",
  "#C0C0C0",
];

const _typeColors: ColorValueHex[] = [
  "#B53B69",
  "#FF1493",
  "#1E90FF",
  "#0000CD",
  "#E6E6FA",
  "#808080",
  "#8B008B",
  "#F0F8FF",
  "#FFA500",
  "#9ACD32",
  "#DAA520",
  "#6B8E23",
  "#F5DEB3",
  "#FFFAFA",
  "#9966CC",
  "#BC8F8F",
  "#808000",
  "#FFA07A",
  "#4682B4",
  "#FDF5E6",
  "#FFD700",
  "#008000",
  "#3CB371",
  "#A9A9A9",
  "#FFE4E1",
  "#800000",
  "#DEB887",
  "#FFDAB9",
  "#C71585",
  "#00FFFF",
  "#C0C0C0",
];

/// Returns a background and a foreground color based on the tag passed in
export const tagColors = (tag: String | EventTag) => {
  let back: ColorValueHex =
    _tagColors[
      hash(typeof tag === "string" ? tag : tag.toString(), _tagColors.length)
    ];
  let fore: ColorValueHex = foregroundColor(back);

  return { background: back, foreground: fore };
};

/// Returns a color based on the type passed in
export const typeColor = (type: String | EventType) => {
  let color: ColorValueHex =
    _tagColors[
      hash(
        typeof type === "string" ? type : type.toString(),
        _typeColors.length
      )
    ];

  return color;
};

/// Returns a number between 0 and n - 1 inclusive based on the string passed in
const hash = (s: String, n: number) => {
  let t = 0;

  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    t += code;
  }

  return t % n;
};

/// Returns black or white based on the background color passed in
export const foregroundColor = (color: ColorValue) => {
  let k = color.toString();
  let r = parseInt(k.slice(1, 3), 16);
  let g = parseInt(k.slice(3, 5), 16);
  let b = parseInt(k.slice(5, 7), 16);

  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (luminance > 140) {
    return "#000000";
  }
  return "#ffffff";
};

export const pascalToTitleCase = (text: string) => {
  return text.replace(/([A-Z])/g, " $1").trimStart();
};

export const bodyFonts = { small: 14, medium: 16, large: 18 };

export const titleFonts = { small: 20, medium: 24, large: 30 };
