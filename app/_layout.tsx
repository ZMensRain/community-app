import { Stack } from "expo-router";
import { View } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Auth" options={{ headerShown: false }} />
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
