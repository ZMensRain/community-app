import { Pressable, StyleSheet, View, Text, ViewStyle } from "react-native";

import { Id } from "~/src/model/event";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ReactNode } from "react";
type props = {
  id: Id;
  size: number;
  showName: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  children?: ReactNode;
};

const ProfileIcon = (props: props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[{ width: props.size }, props.style]}
    >
      <View>
        {/*Profile picture or icon*/}
        <View style={styles.profile}>
          <Ionicons
            name={props.id.group ? "people" : "person"}
            size={props.size}
            style={{}}
            adjustsFontSizeToFit={true}
          />
          <View style={styles.children}>{props.children}</View>
        </View>
        {/*Name*/}
        {props.showName && <Text style={{ textAlign: "center" }}>Hello</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  profile: {
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: "#eeeeee",
    borderWidth: 2,
    overflow: "hidden",

    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  children: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default ProfileIcon;
