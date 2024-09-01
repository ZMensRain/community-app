import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Session } from "@supabase/supabase-js";
import { getUserData, supabase } from "src/utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";

import { pageStyle } from "~/src/utils/stylingValue";
import ProfileIcon from "~/src/components/shared/ProfileIcon";
import {
  MapSection,
  PostsSection,
  InterestsSection,
  AddInterestsSheet,
} from "./components";

import FilledButton from "~/src/components/shared/filledButton";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const YourProfile = () => {
  const [username, setUsername] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session === null) return;
      let userData = await getUserData(session?.user.id);

      if (typeof userData === "string") return;
      if (userData.username === null) return;

      setUsername(userData["username"]);
      setInterests(userData["interests"]);
      setSession(session);
    });
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const onAddInterest = async (value: string) => {
    if (interests.includes(value)) return;
    if (session === null) return;

    setInterests([...interests, value]);
    sheetRef.current?.close();

    //Update server
    let response = await supabase
      .from("profiles")
      .update({ interests: [...interests, value] })
      .eq("id", session.user.id)
      .select();
    if (response.error)
      Alert.alert("Something went wrong", response.error.message);
  };
  const onRemoveInterest = async (value: string) => {
    if (session === null) return;
    let newInterests = interests.filter((val) => {
      if (value.toLowerCase() === val.toLowerCase()) return false;
      return true;
    });
    setInterests(newInterests as string[]);

    //Update server
    let response = await supabase
      .from("profiles")
      .update({ interests: newInterests })
      .eq("id", session.user.id)
      .select();
    if (response.error)
      Alert.alert("Something went wrong", response.error.message);
  };
  if (session === null)
    return (
      <View
        style={[
          pageStyle,
          {
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Your Profile",
          headerRight: () => (
            <Ionicons.Button
              name="settings-sharp"
              size={20}
              onPress={() => router.navigate("profile/editProfile")}
              backgroundColor={"transparent"}
              iconStyle={{ marginRight: 0, color: "black" }}
              underlayColor={"transparent"}
            />
          ),
        }}
      />

      <GestureHandlerRootView>
        <View style={pageStyle}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ alignItems: "center", width: "100%" }}>
              <ProfileIcon
                id={{ id: "1000", group: false }}
                size={125}
                showName={false}
              />
              <Text style={styles.username}>{username}</Text>
            </View>

            <MapSection />
            <PostsSection />
            <InterestsSection
              interests={interests}
              onAddPressed={() => sheetRef.current?.snapToIndex(0)}
              onInterestPress={onRemoveInterest}
            />
            <FilledButton
              text="Sign Out"
              buttonStyle={{ backgroundColor: "red" }}
              onPress={() => {
                supabase.auth.signOut();
              }}
            />
          </ScrollView>
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={["100%"]}
          enablePanDownToClose={true}
          index={-1}
          backdropComponent={renderBackdrop}
        >
          <AddInterestsSheet onAddInterest={onAddInterest} />
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  username: { fontSize: 30, fontWeight: "medium" },
});

export default YourProfile;
