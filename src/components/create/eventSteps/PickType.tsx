import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import { EventType } from "../../../model/event";
import TypeButton from "../components/TypeButton";
import SearchBar from "../components/SearchBar";

type props = {};

const PickTypeStep = (props: props) => {
  function getTypesText() {
    return Object.keys(EventType).filter((value) => {
      return isNaN(Number(value));
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Pick Type</Text>
      <SearchBar />
      <View style={{ flex: 1, marginHorizontal: 25, marginTop: 20 }}>
        <ScrollView
          style={{ alignContent: "center" }}
          showsVerticalScrollIndicator={false}
        >
          {getTypesText().map((item, index) => (
            <TypeButton text={item} key={index} onPress={() => {}} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  pageTitle: {
    textAlign: "center",
    margin: 50,
    marginBottom: 15,
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default PickTypeStep;
