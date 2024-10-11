import { Stack, router } from "expo-router";

import { useState } from "react";
import {
  EventCreationContext,
  initialCreationState,
} from "../../../src/contexts/eventCreationContext";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { colors } from "~/src/utils/stylingValue";
import { supabase } from "~/src/utils/supabase";
import { CommunityEvent } from "~/src/model/event";

const EventCreationLayout = () => {
  const [event, setEvent] = useState(
    CommunityEvent.clone(initialCreationState)
  );

  const createEvent = async () => {
    const id = (await supabase.auth.getUser()).data.user?.id;
    if (!id) return;

    const finialEvent = event;
    finialEvent.hosted_by = { id: id, group: false };
    router.navigate("FeedTab");
    await supabase.from("events").insert([finialEvent.convertToDatabase()]);

    setEvent(initialCreationState);
  };

  return (
    <EventCreationContext.Provider
      value={{ event: event, setEvent: setEvent, createEvent: createEvent }}
    >
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
      </Stack>
    </EventCreationContext.Provider>
  );
};

export default EventCreationLayout;
