import { Tabs, router } from "expo-router";
import { View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileIcon from "~/src/components/shared/ProfileIcon";

const layout = () => {
  function navigateToCreate() {
    router.navigate("create/entry");
  }
  function navigateToProfile() {
    router.navigate("profile/[id]");
  }
  const headerLeftComponent = () => (
    <ProfileIcon
      showName={false}
      id={{
        group: false,
        id: "",
      }}
      size={38}
      onPress={navigateToProfile}
      style={{ margin: 5 }}
    />
  );
  const headerRightComponent = () => (
    <Pressable onPress={navigateToCreate}>
      <Ionicons name="create-outline" size={32} style={{ margin: 5 }} />
    </Pressable>
  );

  return (
    <Tabs>
      <Tabs.Screen
        name="FeedTab"
        options={{
          headerTitle: "Feed",
          headerLeft: headerLeftComponent,
          headerRight: headerRightComponent,
          tabBarIcon: () => <Ionicons name="home" size={24} />,
          tabBarLabel: "Feed",
        }}
      />
      <Tabs.Screen
        name="GroupsTab"
        options={{
          headerTitle: "Groups",
          headerLeft: headerLeftComponent,
          headerRight: headerRightComponent,
          tabBarIcon: () => <Ionicons name="people" size={24} />,
          tabBarLabel: "Groups",
        }}
      />
      <Tabs.Screen
        name="MapTab"
        options={{
          headerTitle: "Map",
          headerLeft: headerLeftComponent,
          headerRight: headerRightComponent,
          tabBarIcon: () => <Ionicons name="map" size={24} />,
          tabBarLabel: "Map",
        }}
      />
    </Tabs>
  );
};

export default layout;
