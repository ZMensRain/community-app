import {
  Button,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useCallback } from "react";
import KitSearchModal from "../../../src/components/create/KitSearchModal";
import { useContext, useState } from "react";
import KitComponent from "../../../src/components/create/KitComponent";
import NextButton from "../../../src/components/create/NextButton";
import { EventKit } from "../../../src/model/event";
import { EventCreationContext } from "../../../src/contexts/eventCreationContext";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const KitScreen = () => {
  let eventContext = useContext(EventCreationContext);
  if (eventContext === undefined) {
    Alert.alert("State is missing");
    return;
  }

  function next() {
    let e = eventContext!.event;
    e.kit = kit;
    eventContext?.setEvent(e);
    router.navigate("create/event/5");
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  const sheetRef = useRef<BottomSheet>(null);
  let [kit, setKit] = useState<EventKit[]>(eventContext.event.kit);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.pageTitle}>People should bring?</Text>
      <View style={(styles.section, { alignItems: "flex-start" })}>
        <Button title="Add" onPress={() => sheetRef.current?.snapToIndex(0)} />
      </View>

      <View style={[styles.section, { flex: 1 }, styles.separator]}>
        <ScrollView>
          {kit.map((value, index) => {
            return (
              <KitComponent
                kit={value}
                add={false}
                key={index}
                onButtonPressed={() => {
                  setKit(
                    kit.filter((_, i) => {
                      if (i === index) {
                        return false;
                      }
                      return true;
                    })
                  );
                }}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={{ justifyContent: "flex-end", paddingBottom: 35 }}>
        <NextButton onPressed={next} />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["75%", "100%"]}
        enablePanDownToClose={true}
        index={-1}
        backdropComponent={renderBackdrop}
      >
        <KitSearchModal
          onAdd={(value) => {
            setKit(kit.concat(value));
          }}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25, backgroundColor: "white" },
  pageTitle: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
  section: { marginTop: 5 },
  separator: { borderTopColor: "black", borderTopWidth: 1, borderRadius: 2 },
});

export default KitScreen;
