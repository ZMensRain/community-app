import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { supabase } from "../src/utils/supabase";
import { router } from "expo-router";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.navigate("/FeedTab");
      } else {
        router.navigate("/auth/Auth");
      }
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.navigate("/FeedTab");
      } else {
        router.navigate("/auth/Auth");
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
