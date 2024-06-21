import { StyleSheet, View, Text, Pressable } from "react-native";
import { EventKit } from "../../../model/event";
import Ionicons from "@expo/vector-icons/Ionicons";
type props = {
  kit: EventKit | String;
  add: boolean;
  onButtonPressed?: (kit: EventKit | String) => void;
};

const KitComponent = (props: props) => {
  return (
    <View style={styles.container}>
      <Text>{props.kit.toString()}</Text>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Pressable
          onPress={() => props.onButtonPressed?.(props.kit)}
          style={{ backgroundColor: "white" }}
          pressRetentionOffset={30}
        >
          <Ionicons name={props.add ? "add" : "close"} size={20}></Ionicons>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E6E8F2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 7.5,
  },
});

export default KitComponent;
