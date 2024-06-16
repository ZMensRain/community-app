import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type props = { onSearch?: (text: String) => void };

const SearchBar = (props: props) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Ionicons
          name="search"
          size={24}
          style={{ marginRight: 10 }}
        ></Ionicons>
      </Pressable>

      <TextInput placeholder="Search" style={{ width: "100%" }}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
    flexDirection: "row",
    borderRadius: 20,
  },
});

export default SearchBar;
