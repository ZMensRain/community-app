import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        title: "",
        headerBackButtonMenuEnabled: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="create/entry" options={{ headerShown: true }} />
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/signIn" />
      <Stack.Screen name="auth/signUp" />
      <Stack.Screen name="profile/[id]" options={{ headerShown: true }} />
      <Stack.Screen
        name="profile/YourProfile"
        options={{ headerShown: true, title: "Your Profile" }}
      />
    </Stack>
  );
};

export default RootLayout;
