import { Pressable, StyleSheet, Text, View } from "react-native";

type props = { onPressed?: () => void };

const NextButton = (props: props) => {
  return (
    <Pressable
      onPress={props.onPressed}
      style={(state) => [
        styles.container,
        { backgroundColor: state.pressed ? "#42a6ff" : "#53B7FF" },
      ]}
    >
      <Text style={{ color: "#fff" }}>Next</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#53B7FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
});
export default NextButton;
