import { Pressable, StyleSheet, Text, View } from "react-native";

type props = {};

const NextButton = (props: props) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={{ color: "#fff" }}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#53B7FF",
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
