import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { colors } from "~/src/utils/stylingValue";

type props = {
  onSearch?: (text: string) => void;
  onTextUpdate?: (text: string) => void;
};

const SearchBar = ({ onSearch, onTextUpdate: onUpdate }: props) => {
  let [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => onSearch?.(text)}
        name="search"
        size={24}
        style={{ marginRight: 5 }}
        color={colors.input}
      />

      <TextInput
        placeholder="Search"
        placeholderTextColor={colors.input}
        style={{ width: "100%" }}
        value={text}
        onChangeText={(newText) => {
          setText(newText);
          onUpdate?.(newText);
        }}
        onSubmitEditing={() => {
          onSearch?.(text);
        }}
      ></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: colors.input,
    borderWidth: 2,
    overflow: "hidden",
    flexDirection: "row",
    borderRadius: 15,
  },
});

export default SearchBar;
