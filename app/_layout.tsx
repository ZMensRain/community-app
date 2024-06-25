import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="create/entry"
        options={{
          headerShown: true,
          title: "",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="create/event"
        options={{
          headerShown: false,
          title: "",

          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signIn" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signUp" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile/[id]"
        options={{
          headerShown: true,
          title: "Your profile",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
