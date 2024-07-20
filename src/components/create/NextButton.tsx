import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { colors } from "../../utils/stylingValue";

type props = { onPressed?: () => void; text?: string };

const NextButton = ({ onPressed, text = "Next" }: props) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPressed} style={{ width: "100%" }}>
        <View style={styles.button}>
          <Text style={{ color: "#fff" }}>{text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: "center",
  },
});
export default NextButton;
