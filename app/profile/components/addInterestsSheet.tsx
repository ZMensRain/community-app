import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import SearchBar from "src/components/create/SearchBar";
import FilledButton from "~/src/components/shared/filledButton";
import { EventTypeEnum } from "~/src/model/event";
import { margin, padding, tagColors } from "~/src/utils/stylingValue";

type props = { onAddInterest?: (value: string) => void };

const AddInterestsSheet = ({ onAddInterest }: props) => {
  const [searched, setSearched] = useState("");

  function getEnumNames(type: any) {
    return Object.keys(type).filter(
      (value) => isNaN(Number(value)) && value.toUpperCase()
    );
  }

  function getTypesText() {
    let match: Boolean = false;
    const values = getEnumNames(EventTypeEnum);
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
        data={getTypesText()}
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
