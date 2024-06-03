import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Auth from "../src/components/Auth";
import HomeScreen from "../src/screens/HomeScreen";
import { supabase } from "../src/utils/supabase";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <View>{session && session.user ? <HomeScreen /> : <Auth />}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
