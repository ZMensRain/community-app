import { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, StyleSheet, FlatList, Text } from "react-native";
import SearchBar from "../../create/SearchBar";
import { useState } from "react";
import { EventTypeEnum } from "~/src/model/event";
import { margin, padding } from "~/src/utils/stylingValue";
import { IssueTypeEnum } from "~/src/model/issue";
import OutlineButton from "../outlineButton";
import { getSearchResults } from "~/src/utils/search";

type props = {
  onTypePicked?: (tag: string) => void;
};

const quickAccess = Object.keys(EventTypeEnum).concat(
  Object.keys(IssueTypeEnum)
);

const TypeBottomSheet = ({ onTypePicked }: props) => {
  const [searched, setSearched] = useState("");

  return (
    <BottomSheetView style={styles.container}>
      <SearchBar onTextUpdate={(v) => setSearched(v)} />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: margin.small }}
        data={getSearchResults(searched, quickAccess)}
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
