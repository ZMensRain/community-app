import { Pressable, StyleSheet, View, Text, ViewStyle } from "react-native";

import { Id } from "~/src/model/event";
import Ionicons from "@expo/vector-icons/Ionicons";
type props = {
  id: Id;
  size: number;
  showName: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

const ProfileIcon = (props: props) => {
  return (
    <Pressable onPress={props.onPress} style={props.style}>
      <View>
        {/*Profile picture or icon*/}
        <View style={{ aspectRatio: 1 }}>
          <Ionicons
            name={
              props.id.group ? "people-circle-outline" : "person-circle-outline"
            }
            size={props.size}
            style={{ alignSelf: "center" }}
          />
        </View>
        {/*Name*/}
        {props.showName && <Text style={{ textAlign: "center" }}>Hello</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({ container: {} });

export default ProfileIcon;
