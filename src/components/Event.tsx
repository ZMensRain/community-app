import { StyleSheet, View, Text, Pressable } from "react-native";
import { CommunityEvent } from "../model/event";
import { router } from "expo-router";
import { typeColor } from "../utils/tagColor";

type EventProps = {
  event: CommunityEvent;
};

const EventComponent = (props: EventProps) => {
  return (
    <Pressable
      onPress={() => {
        router.navigate("eventScreen");
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#00000011" : "#00000000",
          borderColor: pressed ? "#E0E0E0" : "#E0E0E0",
        },
        styles.container,
      ]}
    >
      <Text style={styles.title}>{props.event.title}</Text>
      <Text
        style={[
          { color: typeColor(props.event.type), fontWeight: "bold" },
          styles.mt5,
        ]}
      >
        {props.event.type}
      </Text>
      <Text style={[styles.mt5]}>{`${props.event.getLocations()[0]}`}</Text>
      <Text style={[styles.mt5, { color: "#7C7C7C" }]}>
        {props.event.tags.join(", ")}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    overflow: "hidden",
    padding: 15,
    marginVertical: 5,
  },
  title: { fontSize: 20 },
  mt5: {
    marginTop: 5,
  },
});

export default EventComponent;
