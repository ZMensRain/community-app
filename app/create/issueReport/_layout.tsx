import { Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { colors } from "~/src/utils/stylingValue";
import { IssueReportCreationProvider } from "~/src/contexts/issueReportCreationContext";
import { Issue } from "~/src/model/issue";

const IssueCreationLayout = () => {
  const handleSubmit = (value: Issue) => {
    router.navigate("FeedTab");
  };

  return (
    <IssueReportCreationProvider onSubmit={handleSubmit}>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          title: "",
        }}
      >
        <Stack.Screen
          name="1"
          options={{
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </Pressable>
            ),
            title: "Pick Type",
          }}
        />
        <Stack.Screen
          name="2"
          options={{
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </Pressable>
            ),
            title: "Pick Type",
          }}
        />
      </Stack>
    </IssueReportCreationProvider>
  );
};

export default IssueCreationLayout;
