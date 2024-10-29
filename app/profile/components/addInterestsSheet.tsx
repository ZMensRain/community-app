import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import SearchBar from "src/components/create/SearchBar";
import FilledButton from "~/src/components/shared/filledButton";
import { EventTypeEnum } from "~/src/model/event";
import { getSearchResults } from "~/src/utils/search";
import { margin, padding, tagColors } from "~/src/utils/stylingValue";

type props = { onAddInterest?: (value: string) => void };

const quickAccess = Object.keys(EventTypeEnum);

const AddInterestsSheet = ({ onAddInterest }: props) => {
  const [searched, setSearched] = useState("");

  const renderItem = (info: ListRenderItemInfo<string>) => {
    return (
      <View style={{ marginVertical: margin.small }}>
        <FilledButton
          text={info.item}
          key={info.index}
          buttonStyle={{
            backgroundColor: tagColors(info.item).background,
          }}
          onPress={() => onAddInterest?.(info.item)}
        />
      </View>
    );
  };

  return (
    <BottomSheetView style={styles.container}>
      <SearchBar onTextUpdate={(v) => setSearched(v.toString())} />
      <FlatList
        data={getSearchResults(searched, quickAccess)}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.small,
    width: "100%",
    height: "100%",
  },
});

export default AddInterestsSheet;
