import { StyleSheet, Text, Pressable } from "react-native";

type props = { text: String; onPress: (text: String) => void };

const TypeButton = ({ text, onPress }: props) => {
  return (
    <Pressable
      style={(state) => [
        styles.container,
        { borderColor: state.pressed ? "#ded7e1" : "#E6E8F2" },
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
    borderWidth: 2,
  },
});

export default TypeButton;
