import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import SearchBar from "src/components/create/SearchBar";
import { EventTypeEnum } from "~/src/model/event";
import { tagColors } from "~/src/utils/stylingValue";

type props = { onAddInterest?: (value: string) => void };

const AddInterestsSheet = ({ onAddInterest }: props) => {
  let [searched, setSearched] = useState("");

  function getEnumNames(type: any) {
    return Object.keys(type).filter(
      (value) => isNaN(Number(value)) && value.toUpperCase()
    );
  }

  function getTypesText() {
    let match: Boolean = false;
    let values = getEnumNames(EventTypeEnum);
    return (
      values
        .filter((value) => {
          // sets match to true so the user input will not be shown if not needed
          if (!match)
            match =
              value.toUpperCase() ===
              searched.toUpperCase().replaceAll(" ", "");

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

  return (
    <BottomSheetView style={styles.container}>
      <SearchBar onTextUpdate={(v) => setSearched(v.toString())} />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {getTypesText().map((value, index) => (
          <View
            key={index}
            style={{
              borderRadius: 15,
              overflow: "hidden",
              marginVertical: 5,
            }}
          >
            <TouchableHighlight onPress={() => onAddInterest?.(value)}>
              <View
                style={{
                  backgroundColor: tagColors(value).background,
                  padding: 10,
                }}
              >
                <Text style={{ color: tagColors(value).foreground }}>
                  {value}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
  },
});

export default AddInterestsSheet;
