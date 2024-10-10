import {
  View,
  Text,
  Alert,
  Pressable,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { useRef } from "react";
import { useContext, useState } from "react";
import { router, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors, pageStyle } from "src/utils/stylingValue";
import KitComponent from "src/components/create/KitComponent";
import NextButton from "src/components/create/NextButton";
import { EventKit } from "src/model/event";
import { EventCreationContext } from "src/contexts/eventCreationContext";
import KitSearchModal from "src/components/create/KitSearchModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import renderBackdrop from "~/src/components/shared/sheetBackdrop";

const KitScreen = () => {
  const eventContext = useContext(EventCreationContext);
  if (eventContext === undefined) {
    Alert.alert("State is missing");
    return;
  }

  const sheetRef = useRef<BottomSheet>(null);
  const [kit, setKit] = useState<EventKit[]>(eventContext.event.kit);

  function next() {
    let e = eventContext!.event;
    e.kit = kit;
    eventContext?.setEvent(e);
    router.navigate("create/event/5");
  }
  const renderKit = (info: ListRenderItemInfo<EventKit>) => (
    <KitComponent
      key={info.index}
      kit={info.item}
      onButtonPressed={() => setKit(kit.filter((_, i) => i !== info.index))}
      add={false}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "People Should Bring",
          headerRight: () => (
            <Pressable onPress={() => sheetRef.current?.snapToIndex(0)}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </Pressable>
          ),
        }}
      />

      <GestureHandlerRootView style={pageStyle}>
        {kit.length > 0 && <FlatList data={kit} renderItem={renderKit} />}

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
                order to participate.
              </Text>
            </View>
          )}
        </>

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
          <KitSearchModal onAdd={(value) => setKit(kit.concat(value))} />
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

export default KitScreen;
