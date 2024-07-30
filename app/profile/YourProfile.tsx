import React, { useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  Pressable,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import ProfileCamera from "src/components/ProfileCameraCircle";
import { getUserData, supabase } from "src/utils/supabase";
import { pageStyle } from "~/src/utils/stylingValue";

const profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setEmail(session?.user.email!);
    });
  }, []);

  if (session === null) {
    return (
      <View
        style={{
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  getUserData(session.user.id).then((response) => {
    if (typeof response === "string") {
      return;
    }
    setUsername(response["username"]);
  });

  if (username === "") {
    return (
      <View
        style={[
          pageStyle,
          {
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={pageStyle}>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ alignItems: "center", width: "100%" }}>
            <ProfileCamera />
          </View>

          <View style={[styles.verticallySpaced, styles.mt20]}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
              value={username}
              placeholder="Username"
              autoCapitalize={"words"}
            />
          </View>

          <View style={[styles.verticallySpaced]}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              keyboardType="email-address"
              autoCapitalize={"none"}
            />
          </View>

          <View style={styles.button}>
            <Button onPress={() => supabase.auth.signOut()} title="Sign Out" />
          </View>
        </ScrollView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingVertical: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    marginTop: 100,
  },
  input: {
    margin: 0,
    padding: 20,
    backgroundColor: "#00000011",
    borderRadius: 10,
  },
});

export default profile;