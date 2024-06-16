import { ScrollView, StyleSheet, View, Text } from "react-native";

import { EventType } from "../../../model/event";
import TypeButton from "../components/TypeButton";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

type props = { onTypePicked?: (type: String) => void };

const PickTypeStep = ({ onTypePicked }: props) => {
  let [searched, setSearched] = useState(String);

  function getTypesText() {
    let match: Boolean = false;

    return Object.keys(EventType)
      .filter((value) => {
        if (!match) {
          match = value.toUpperCase() === searched.toUpperCase();
        }

        return (
          isNaN(Number(value)) &&
          value.toUpperCase().startsWith(searched.toUpperCase())
        );
      })
      .concat(searched !== "" && match === false ? [searched] : [])
      .map((value) => {
        return value.replace(/([A-Z])/g, " $1").trimStart();
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Pick Type</Text>
      <SearchBar
        onTextUpdate={(newText) => {
          setSearched(newText.toString());
        }}
      />
      <View style={{ flex: 1, marginHorizontal: 25, marginTop: 20 }}>
        <ScrollView
          style={{ alignContent: "center" }}
          showsVerticalScrollIndicator={false}
        >
          {getTypesText().map((item, index) => (
            <TypeButton
              text={item}
              key={index}
              onPress={(type) => {
                onTypePicked?.(type);
              }}
            />
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
