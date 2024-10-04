import { Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, Pressable } from "react-native";
import { colors } from "~/src/utils/stylingValue";
import { IssueReportCreationProvider } from "~/src/contexts/issueReportCreationContext";
import { Issue } from "~/src/model/issue";
import { supabase } from "~/src/utils/supabase";

const IssueCreationLayout = () => {
  const handleSubmit = (value: Issue) => {
    router.navigate("FeedTab");
    supabase
      .from("issues")
      .insert({
        type: value.type.toString(),
        description: value.description.toString(),
        location: `POINT(${value.coordinates.latitude} ${value.coordinates.longitude})`,
      })
      .then((v) => {
        if (v.error) {
          Alert.alert("Something Went Wrong", v.error.message);
        }
      });
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
            title: "Short Description",
          }}
        />
        <Stack.Screen
          name="3"
          options={{
            title: "Location",
          }}
        />
      </Stack>
    </IssueReportCreationProvider>
  );
};

export default IssueCreationLayout;
