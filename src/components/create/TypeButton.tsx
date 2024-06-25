import { StyleSheet, View, Text, Pressable } from "react-native";

type props = { text: String; onPress: (text: String) => void };

const TypeButton = ({ text, onPress }: props) => {
  return (
    <Pressable
      style={(state) => [
        styles.container,
        { backgroundColor: state.pressed ? "#ded7e1" : "#E6E8F2" },
      ]}
      onPress={() => onPress(text)}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowOpacity: 0.25,

    shadowOffset: { width: 0, height: 2 },
  },
});

export default TypeButton;
