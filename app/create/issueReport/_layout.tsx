import { Stack, router } from "expo-router";
import { CommunityEvent, DressCode } from "../../../src/model/event";
import { useState } from "react";
import { EventCreationContext } from "../../../src/contexts/eventCreationContext";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { colors } from "~/src/utils/stylingValue";
import { supabase } from "~/src/utils/supabase";

const IssueCreationLayout = () => {
  return (
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
    </Stack>
  );
};

export default IssueCreationLayout;
