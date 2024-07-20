import { TextStyle, ViewStyle } from "react-native";

const sizes = { small: 10, medium: 20, large: 25 };
const colors = { primary: "#004FC5", secondary: "#A5D59C" };
const pageTitle: TextStyle = {
  fontWeight: "semibold",
  fontSize: 36,
  textAlign: "center",
};
const pageStyle: ViewStyle = {
  flex: 1,
  paddingHorizontal: 25,
  backgroundColor: "white",
};

export { sizes, colors, pageTitle, pageStyle };
