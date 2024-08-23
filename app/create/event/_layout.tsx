import { Stack, router } from "expo-router";
import { CommunityEvent, DressCode } from "../../../src/model/event";
import { useState } from "react";
import { EventCreationContext } from "../../../src/contexts/eventCreationContext";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { colors } from "~/src/utils/stylingValue";

const EventCreationLayout = () => {
  let [event, setEvent] = useState(
    new CommunityEvent(
      "to be set",
      { group: false, id: "" },
      "",
      "",
      "Type",
      { min: 1, max: 100 },
      [],
      DressCode.Anything,
      [],
      [],
      "",
      [],
      []
    )
  );
  return (
    <EventCreationContext.Provider value={{ event: event, setEvent: setEvent }}>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          title: "",
        }}
      >
        <Stack.Screen
          name="1"
          options={{
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </Pressable>
            ),
            title: "Pick Type",
          }}
        />
        <Stack.Screen name="2" options={{ title: "Details" }} />
        <Stack.Screen name="3" options={{ title: "Links" }} />
        <Stack.Screen name="6" options={{ title: "Attending" }} />
      </Stack>
    </EventCreationContext.Provider>
  );
};

export default EventCreationLayout;
