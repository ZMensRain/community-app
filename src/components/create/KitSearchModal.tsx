import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

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

  return (
    <BottomSheetView>
      <View style={styles.container}>
        <SearchBar onTextUpdate={(value) => setSearched(value.toString())} />

        <ScrollView>
          {getSearchResults(searched, quickAccess).map((value) => (
            <KitComponent
              kit={value}
              add={true}
              key={value}
              onButtonPressed={(value) => {
                props.onAdd(value);
              }}
            />
          ))}
        </ScrollView>
      </View>
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
