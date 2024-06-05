import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileCamera = () => {
  return (
    <View style={styles.profile}>
      <View style={styles.profileCamera}>
        <Ionicons name="camera" size={30}></Ionicons>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profile: {
    width: "45%",
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#eeeeee",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  profileCamera: {
    backgroundColor: "#00000010",
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileCamera;
