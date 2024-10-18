import { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, StyleSheet, FlatList, Text } from "react-native";
import SearchBar from "../../create/SearchBar";
import { useState } from "react";
import { EventTypeEnum } from "~/src/model/event";
import { margin, padding } from "~/src/utils/stylingValue";
import { IssueTypeEnum } from "~/src/model/issue";
import OutlineButton from "../outlineButton";

type props = {
  onTypePicked?: (tag: string) => void;
};

const TypeBottomSheet = ({ onTypePicked }: props) => {
  const [searched, setSearched] = useState("");

  const getSearchResults = () => {
    let match = false;
    return Object.keys(EventTypeEnum)
      .concat(Object.keys(IssueTypeEnum))
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

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: margin.small }}
        data={getSearchResults()}
        renderItem={(info) => (
          <View style={{ marginVertical: margin.small }}>
            <OutlineButton onPress={() => onTypePicked?.(info.item)}>
              <Text>{info.item}</Text>
            </OutlineButton>
          </View>
        )}
      />
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

export default TypeBottomSheet;
