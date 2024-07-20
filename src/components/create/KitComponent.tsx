import { StyleSheet, View, Text } from "react-native";
import { EventKit } from "../../model/event";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableHighlight } from "react-native-gesture-handler";
type props = {
  kit: EventKit;
  add: boolean;
  onButtonPressed?: (kit: EventKit) => void;
};

const KitComponent = (props: props) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => props.onButtonPressed?.(props.kit)}>
        <View style={styles.button}>
          <Text style={{ textAlignVertical: "center" }}>
            {props.kit.toString()}
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Ionicons name={props.add ? "add" : "close"} size={20} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: 7.5,
    overflow: "hidden",
    borderColor: "#E6E8F2",
    borderWidth: 2,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
});

export default KitComponent;
