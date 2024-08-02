import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Session } from "@supabase/supabase-js";
import { getUserData, supabase } from "src/utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";

import { pageStyle } from "~/src/utils/stylingValue";
import ProfileIcon from "~/src/components/shared/ProfileIcon";
import { MapSection, PostsSection, InterestsSection } from "./components";
import FilledButton from "~/src/components/shared/filledButton";

const YourProfile = () => {
  const [username, setUsername] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session == null) return;
      let userData = await getUserData(session?.user.id);

      if (typeof userData === "string") {
        return;
      }
      setUsername(userData["username"]);
      setInterests(userData["interests"]);
      setSession(session);
      setEmail(session?.user.email!);
    });
  }, []);

  if (session === null) {
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
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Your Profile",
          headerRight: () => <Ionicons name="settings-sharp" size={20} />,
        }}
      />
      <View style={pageStyle}>
        <GestureHandlerRootView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ alignItems: "center", width: "100%" }}>
              <ProfileIcon
                id={{ id: "1000", group: false }}
                size={125}
                showName={false}
              />
              <Text style={styles.username}>{username}</Text>
            </View>

            <MapSection />
            <PostsSection />
            <InterestsSection interests={interests} />
            <FilledButton
              text="Sign Out"
              buttonStyle={{ backgroundColor: "red" }}
              onPress={() => {
                supabase.auth.signOut();
              }}
            />
          </ScrollView>
        </GestureHandlerRootView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  username: { fontSize: 30, fontWeight: "medium" },
});

export default YourProfile;
