import React, { useState } from "react";
import { Modal, View, Pressable, ScrollView, StyleSheet } from "react-native";

import { EventKit } from "../../../model/event";
import KitComponent from "./KitComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "./SearchBar";

type props = {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (kit: String | EventKit) => void;
};

const KitSearchModal = (props: props) => {
  let [searched, setSearched] = useState("");
  const getSearchResults = () => {
    let match = false;
    return Object.keys(EventKit)
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
    <Modal animationType="slide" transparent={true} visible={props.isVisible}>
      <View style={styles.container}>
        <View style={styles.sheet}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Pressable
              style={{ justifyContent: "center" }}
              onPress={props.onClose}
            >
              <Ionicons name="close" size={24} />
            </Pressable>

            <SearchBar
              onTextUpdate={(value) => setSearched(value.toString())}
            />
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
                    props.onClose();
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  sheet: {
    height: "80%",
    backgroundColor: "#eeeeee",
    width: "100%",
    alignItems: "stretch",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    overflow: "hidden",
  },
});

export default KitSearchModal;
