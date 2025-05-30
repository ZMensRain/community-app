import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileIcon from "./shared/ProfileIcon";

type props = { onPress: () => void; id: string; url?: string };

const ProfileCamera = (props: props) => {
  return (
    <ProfileIcon
      id={{ id: props.id, group: false }}
      size={150}
      showName={false}
      onPress={props.onPress}
      url={props.url}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.profileCamera}>
          <Ionicons name="camera" size={30} color={"white"}></Ionicons>
        </View>
      </View>
    </ProfileIcon>
  );
};
const styles = StyleSheet.create({
  profileCamera: {
    backgroundColor: "#000000a0",
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileCamera;
