import { Stack } from "expo-router";
import { CommunityEvent, DressCode } from "../../../src/model/event";
import { useState } from "react";
import { EventCreationContext } from "../../../src/contexts/eventCreationContext";

const EventCreationLayout = () => {
  let [event, setEvent] = useState(
    new CommunityEvent(
      "to be set",
      { group: false, id: "" },
      "",
      "",
      "Type",
      { min: 0, max: null },
      [],
      DressCode.Casual,
      [],
      [],
      "",
      [],
      []
    )
  );
  return (
    <EventCreationContext.Provider value={{ event: event, setEvent: setEvent }}>
      <Stack screenOptions={{ headerBackTitle: "", title: "" }}>
        <Stack.Screen
          name="1"
          options={{ headerBackVisible: true }}
        ></Stack.Screen>
        <Stack.Screen name="2"></Stack.Screen>
      </Stack>
    </EventCreationContext.Provider>
  );
};

export default EventCreationLayout;
