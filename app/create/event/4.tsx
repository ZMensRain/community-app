import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import React, { useRef, useCallback } from "react";

import { useContext, useState } from "react";

import { router, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { colors, pageStyle } from "~/src/utils/stylingValue";
import KitComponent from "~/src/components/create/KitComponent";
import NextButton from "~/src/components/create/NextButton";
import { EventKit } from "~/src/model/event";
import { EventCreationContext } from "~/src/contexts/eventCreationContext";
import KitSearchModal from "~/src/components/create/KitSearchModal";

import Ionicons from "@expo/vector-icons/Ionicons";

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
    <>
      <Stack.Screen
        options={{
          title: "People Should Bring",
          headerRight: () => (
            <Ionicons.Button
              name="add"
              size={32}
              onPress={() => sheetRef.current?.snapToIndex(0)}
              color={colors.primary}
              backgroundColor={"transparent"}
              iconStyle={{
                marginRight: 0,
              }}
              underlayColor={"#00000012"}
            />
          ),
        }}
      />
      <GestureHandlerRootView style={pageStyle}>
        <View style={{ flex: 1 }}>
          <>
            {kit.length > 0 && (
              <ScrollView>
                {kit.map((v, index) => (
                  <KitComponent
                    key={index}
                    kit={v}
                    onButtonPressed={() =>
                      setKit(
                        kit.filter((_, i) => {
                          if (i === index) {
                            return false;
                          }
                          return true;
                        })
                      )
                    }
                    add={false}
                  />
                ))}
              </ScrollView>
            )}
          </>

          {/* Text section */}
          <>
            {kit.length == 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  Add kit if your event requires people to bring something in
                  order to participate in your event.
                </Text>
              </View>
            )}
          </>
        </View>

        <View style={{ justifyContent: "flex-end", paddingBottom: 25 }}>
          <NextButton
            onPressed={next}
            text={kit.length <= 0 ? "Skip" : "Next"}
          />
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
    </>
  );
};

const styles = StyleSheet.create({});

export default KitScreen;
