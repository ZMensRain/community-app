import { BottomSheetView } from "@gorhom/bottom-sheet";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import SearchBar from "../../create/SearchBar";
import { useState } from "react";
import { EventTagEnum } from "~/src/model/event";
import FilledButton from "../filledButton";
import { padding, tagColors } from "~/src/utils/stylingValue";
import { getSearchResults } from "~/src/utils/search";

type props = {
  onTagPicked: (tag: string) => void;
};

const quickAccess = Object.keys(EventTagEnum);

const TagBottomSheet = ({ onTagPicked }: props) => {
  const [searched, setSearched] = useState("");

  return (
    <BottomSheetView style={styles.container}>
      <SearchBar onTextUpdate={(v) => setSearched(v)} />
      <ScrollView style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {getSearchResults(searched, quickAccess).map((v) => (
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
