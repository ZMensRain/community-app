import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileButton = () => {
  function press() {
    console.log("pressed");
  }

  let imageUrl: string | null = "https://reactnative.dev/img/tiny_logo.png";

  return (
    <View style={styles.profile}>
      <Pressable onPress={press}>
        {imageUrl == null ? (
          <Ionicons name="person-circle" size={38}></Ionicons>
        ) : (
          <Image source={{ uri: imageUrl }} style={styles.profile}></Image>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: 38,
    aspectRatio: 1,
    borderRadius: 30,
    margin: 8,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileButton;
