import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

type props = {
  onSearch?: (text: string) => void;
  onTextUpdate?: (text: string) => void;
};

const SearchBar = ({ onSearch, onTextUpdate: onUpdate }: props) => {
  let [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onSearch?.(text)}
        style={{ alignSelf: "center" }}
      >
        <Ionicons
          name="search"
          size={24}
          style={{ marginRight: 10 }}
        ></Ionicons>
      </Pressable>

      <TextInput
        placeholder="Search"
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
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
    flexDirection: "row",
    borderRadius: 20,
  },
});

export default SearchBar;
