import React, { useState } from "react";
import { Modal, View, Pressable, ScrollView, StyleSheet } from "react-native";

import { EventKitEnum, EventKit } from "../../model/event";
import KitComponent from "./KitComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "./SearchBar";
import { BottomSheetView } from "@gorhom/bottom-sheet";

type props = {
  onAdd: (kit: EventKit) => void;
};

const KitSearchModal = (props: props) => {
  let [searched, setSearched] = useState("");
  const getSearchResults = () => {
    let match = false;
    return Object.keys(EventKitEnum)
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
    <BottomSheetView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <SearchBar onTextUpdate={(value) => setSearched(value.toString())} />
        </View>
        <ScrollView>
          {getSearchResults().map((value, index) => {
            return (
              <KitComponent
                kit={value}
                add={true}
                key={index}
                onButtonPressed={(value) => {
                  props.onAdd(value);
                }}
              />
            );
          })}
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
