import React, { useState } from "react";
import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";

import { EventKitEnum, EventKit } from "../../model/event";
import KitComponent from "./KitComponent";
import SearchBar from "./SearchBar";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { getSearchResults } from "~/src/utils/search";

type props = {
  onAdd: (kit: EventKit) => void;
};
const quickAccess = Object.keys(EventKitEnum);

const KitSearchModal = (props: props) => {
  const [searched, setSearched] = useState("");

  const renderItem = (info: ListRenderItemInfo<string>) => (
    <KitComponent
      kit={info.item}
      add={true}
      key={info.item}
      onButtonPressed={(value) => {
        props.onAdd(value);
      }}
    />
  );

  return (
    <BottomSheetView style={styles.container}>
      <SearchBar onTextUpdate={(value) => setSearched(value.toString())} />
      <FlatList
        data={getSearchResults(searched, quickAccess)}
        renderItem={renderItem}
      />
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-end",

    paddingHorizontal: 10,
  },
});

export default KitSearchModal;
