import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import {
  CommunityEvent,
  Day,
  EventKit,
  EventType,
  dressCode,
} from "../../src/model/event";
import { useState } from "react";
import PickTypeStep from "../../src/components/create/eventSteps/PickType";
import UserInputStep from "../../src/components/create/eventSteps/UserInput";

const CreateEventScreen = () => {
  let [step, setStep] = useState(0);

  let screens = [
    <PickTypeStep
      onTypePicked={() => {
        setStep(step + 1);
      }}
    />,
    <UserInputStep
      onNextPressed={() => {
        setStep(step + 1);
      }}
    />,
  ];

  let type: String | EventType | null;
  let title: String | null;
  let description: String | null;
  let ageRange: { min: Number; max: Number | null } | null;
  let dressCode: dressCode | null;
  let ticketURL: String | null;
  let links: String[] = [];
  let kit: Array<EventKit | String>;
  let days: Day[] = [];
  let hosting: { id: String; isGroup: Boolean } | null;
  let attending: { id: String; isGroup: Boolean }[];

  return screens[step];
};

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1 },
  button: {
    width: "100%",
    backgroundColor: "#00000012",
    padding: 10,
    marginVertical: 1,
  },
  buttonText: {},
});

export default CreateEventScreen;
