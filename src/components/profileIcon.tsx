import {
  StyleSheet,
  View,
  Text,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
type props = {
  id: String;
  showName?: boolean;
  size: number;
  isGroup?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

const ProfileIcon = ({ id, showName, size = 42, onPress, isGroup }: props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.picture}>
          <Ionicons
            name={isGroup ? "people" : "person"}
            size={size}
            style={{ alignSelf: "center" }}
          ></Ionicons>
        </View>

        {showName && <Text style={styles.name}>name</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    verticalAlign: "middle",
    flexWrap: "wrap",
    alignItems: "center",
  },
  picture: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 7,
    aspectRatio: 1,
    alignContent: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  name: {
    textAlign: "center",
  },
});

export default ProfileIcon;
