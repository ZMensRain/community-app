import { ScrollView, StyleSheet, View, Text, Alert } from "react-native";
import {
  CommunityEvent,
  DressCode,
  EventType,
  EventTypeEnum,
} from "../../../src/model/event";
import { useContext, useState } from "react";
import { EventCreationContext } from "../../../src/contexts/eventCreationContext";
import { SafeAreaView } from "react-native-safe-area-context";

import TypeButton from "../../../src/components/create/TypeButton";
import SearchBar from "../../../src/components/create/SearchBar";
import { router } from "expo-router";

const PickTypeScreen = () => {
  let event = useContext(EventCreationContext);

  let [searched, setSearched] = useState(String);

  function getTypesText() {
    let match: Boolean = false;

    return (
      Object.keys(EventTypeEnum)
        .filter((value) => {
          // sets match to true so the user input will not be shown if not needed
          if (!match) {
            match =
              value.toUpperCase() ===
              searched.toUpperCase().replaceAll(" ", "");
          }

          return (
            isNaN(Number(value)) &&
            value
              .toUpperCase()
              .startsWith(searched.toUpperCase().replaceAll(" ", ""))
          );
        })
        /*Adds the content the UserTyped if necessary*/
        .concat(searched !== "" && match === false ? [searched] : [])
        .map((value) => {
          // Converts PascalCase to Title Case
          return value.replace(/([A-Z])/g, " $1").trimStart();
        })
    );
  }

  function next(type: EventType) {
    if (event === undefined) {
      Alert.alert("State is missing");
      return;
    }
    let e = event?.event;
    e.type = type;
    event.setEvent(e);
    router.navigate("create/event/2");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick Type</Text>
      <SearchBar
        onTextUpdate={(newText) => {
          setSearched(newText.toString());
        }}
      />
      <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView
          style={{ alignContent: "center" }}
          showsVerticalScrollIndicator={false}
        >
          {getTypesText().map((item, index) => (
            <TypeButton
              text={item}
              key={index}
              onPress={(type) => next(type.toString())}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 25 },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default PickTypeScreen;
