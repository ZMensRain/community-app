import React, { useState } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";
import ProfileCamera from "../../src/components/ProfileCameraCircle";

const profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView style={styles.container}>
          <ProfileCamera />
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <TextInput
              style={styles.input}
              editable
              onChangeText={(text) => setUsername(text)}
              value={username}
              placeholder="Username"
              autoCapitalize={"words"}
            />
          </View>
          <View style={[styles.verticallySpaced]}>
            <TextInput
              style={styles.input}
              editable
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              keyboardType="email-address"
              autoCapitalize={"none"}
            />
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    alignItems: "center",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },

  input: {
    margin: 0,
    padding: 20,
    backgroundColor: "#00000011",
    borderRadius: 10,
  },
});

export default profile;
