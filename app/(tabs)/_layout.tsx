import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileButton from "../../src/components/ProfileNavBarButton";

const layout = () => {
  function test() {
    return <ProfileButton></ProfileButton>;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="FeedTab"
        options={{
          headerTitle: "Feed",
          headerRight: test,
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
          headerRight: () => <ProfileButton />,
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
