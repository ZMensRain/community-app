import { Tabs, router } from "expo-router";
import { View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileButton from "~/src/components/ProfileNavBarButton";

const layout = () => {
  function navigateToCreate() {
    router.navigate("create/entry");
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="FeedTab"
        options={{
          headerTitle: "Feed",
          headerLeft: () => <ProfileButton />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigateToCreate();
              }}
            >
              <Ionicons
                name="create-outline"
                size={32}
                style={{ margin: 5 }}
              ></Ionicons>
            </Pressable>
          ),
          tabBarIcon: () => {
            return (
              <View>
                <Ionicons name="home" size={24}></Ionicons>
              </View>
            );
          },
          tabBarLabel: "Feed",
        }}
      />
      <Tabs.Screen
        name="GroupsTab"
        options={{
          headerTitle: "Groups",
          headerLeft: () => <ProfileButton />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigateToCreate();
              }}
            >
              <Ionicons
                name="create-outline"
                size={32}
                style={{ margin: 5 }}
              ></Ionicons>
            </Pressable>
          ),
          tabBarIcon: () => {
            return (
              <View>
                <Ionicons name="people" size={24}></Ionicons>
              </View>
            );
          },
          tabBarLabel: "Groups",
        }}
      />
      <Tabs.Screen
        name="MapTab"
        options={{
          headerTitle: "Map",
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigateToCreate();
              }}
            >
              <Ionicons
                name="create-outline"
                size={32}
                style={{ margin: 5 }}
              ></Ionicons>
            </Pressable>
          ),
          tabBarIcon: () => {
            return (
              <View>
                <Ionicons name="map" size={24}></Ionicons>
              </View>
            );
          },
          tabBarLabel: "Map",
        }}
      />
    </Tabs>
  );
};

export default layout;
