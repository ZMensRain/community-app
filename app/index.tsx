import { useEffect } from "react";
import { Alert, AppState } from "react-native";
import { getUserData, supabase } from "src/utils/supabase";
import { router } from "expo-router";
import {
  User,
  UserActionKind,
  useUserContext,
} from "~/src/contexts/userContext";
import LoadingScreen from "~/src/components/shared/loadingScreen";

const getUpdateUserContextData = async () => {
  let user: User = {
    id: "",
    email: "",
    interests: [],
    location: { latitude: 0, longitude: 0 },
    postIds: [],
    username: "",
    avatarUrl: "",
    discriminator: "user",
  };

  const response = await supabase.auth.getUser();
  if (!response.data.user) return user;

  user.id = response.data.user.id;
  user.email = response.data.user.email ?? "";
  let r = await getUserData(user.id);
  if (typeof r != "string") {
    user.interests = r.interests;
    user.username = String(r.username);
    user.location = r.location;
    user.avatarUrl = r.avatar_url ?? "";
  }
  return user;
};

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
  const userContext = useUserContext();
  if (userContext == null) Alert.alert("Something has gone very wrong");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/FeedTab");
      else router.replace("/auth/signUp");
    });

    getUpdateUserContextData().then((user) => {
      userContext?.dispatch({ type: UserActionKind.setUser, payload: user });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      getUpdateUserContextData().then((user) => {
        userContext?.dispatch({ type: UserActionKind.setUser, payload: user });
      });
      if (session) router.replace("/FeedTab");
      else router.replace("/auth/signUp");
    });
  }, []);

  return <LoadingScreen />;
}
