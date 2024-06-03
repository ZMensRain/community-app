import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./src/utils/supabase";
import Auth from "./src/components/Auth";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
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
