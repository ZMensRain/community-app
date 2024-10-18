import { BottomSheetView } from "@gorhom/bottom-sheet";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import SearchBar from "../../create/SearchBar";
import { useState } from "react";
import { EventTagEnum } from "~/src/model/event";
import FilledButton from "../filledButton";
import { padding, tagColors } from "~/src/utils/stylingValue";

type props = {
  onTagPicked: (tag: string) => void;
};

const TagBottomSheet = ({ onTagPicked }: props) => {
  const [searched, setSearched] = useState("");

  const getSearchResults = () => {
    let match = false;
    return Object.keys(EventTagEnum)
      .filter((value) => {
        if (match === false) {
          match = value.toUpperCase() === searched.toUpperCase();
        }
        return (
          isNaN(Number(value)) &&
          value.toUpperCase().startsWith(searched.toUpperCase())
        );
      })
      .concat(match || searched === "" ? [] : [searched]);
  };

  return (
    <BottomSheetView style={styles.container}>
      <SearchBar onTextUpdate={(v) => setSearched(v)} />
      <ScrollView style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {getSearchResults().map((v) => (
            <FilledButton
              text={v}
              key={v}
              buttonStyle={{ backgroundColor: tagColors(v).background }}
              onPress={() => onTagPicked(v)}
            />
          ))}
        </View>
      </ScrollView>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-end",
    paddingHorizontal: padding.small,
  },
});

export default TagBottomSheet;
