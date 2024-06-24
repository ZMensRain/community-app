import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { ActivityIndicator, AppState, StyleSheet, View } from "react-native";
import { supabase } from "../src/utils/supabase";
import { router } from "expo-router";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.navigate("/FeedTab");
      } else {
        router.navigate("/auth/signUp");
      }
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.navigate("/FeedTab");
      } else {
        router.navigate("/auth/signUp");
      }
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"}></ActivityIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
});
