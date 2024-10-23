import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserProvider } from "~/src/contexts/userContext";
import { colors } from "~/src/utils/stylingValue";

const RootLayout = () => {
  return (
    <UserProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerBackTitleVisible: false,
              title: "",
              headerBackButtonMenuEnabled: false,
              headerShown: false,
              headerTintColor: colors.primary,
              headerTitleStyle: { color: "black" },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="create/entry" options={{ headerShown: true }} />
            <Stack.Screen name="index" />
            <Stack.Screen name="auth/signIn" />
            <Stack.Screen name="auth/signUp" />
            <Stack.Screen name="profile/[id]" options={{ headerShown: true }} />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </UserProvider>
  );
};

export default RootLayout;
