import { StyleSheet, View, Text, Pressable } from "react-native";
import { CommunityEvent } from "../model/event";
import { router } from "expo-router";

type EventProps = {
  event: CommunityEvent;
};

const EventComponent = (props: EventProps) => {
  return (
    <Pressable
      onPress={() => {
        router.navigate("eventScreen");
        console.log("hee");
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#00000011" : "#0000000a",
        },
        styles.container,
      ]}
    >
      <Text style={styles.title}>{props.event.title}</Text>
      <Text>{props.event.tags.join(", ")}</Text>
      <Text style={styles.type}>{props.event.type}</Text>
      <Text>{`${props.event.getLocations()[0]}`}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 2,
    borderRadius: 15,
    overflow: "hidden",
    padding: 10,
    marginVertical: 5,
  },
  title: { fontSize: 20 },
  type: {
    color: "#00afff",
  },
});

export default EventComponent;
