import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getPosts, supabase } from "src/utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";

import { titleFonts, pageStyle } from "~/src/utils/stylingValue";
import ProfileIcon from "~/src/components/shared/ProfileIcon";
import {
  MapSection,
  PostsSection,
  InterestsSection,
  AddInterestsSheet,
} from "./components";

import FilledButton from "~/src/components/shared/filledButton";
import BottomSheet from "@gorhom/bottom-sheet";
import { CommunityEvent } from "~/src/model/event";
import { UserActionKind, useUserContext } from "~/src/contexts/userContext";
import { Issue } from "~/src/model/issue";
import LoadingScreen from "~/src/components/shared/loadingScreen";
import renderBackdrop from "~/src/components/shared/sheetBackdrop";

const YourProfile = () => {
  const [posts, setPosts] = useState<(CommunityEvent | Issue)[]>([]);
  const [isLoading, setLoading] = useState(true);
  const sheetRef = useRef<BottomSheet>(null);
  const userContext = useUserContext();

  if (!userContext) {
    Alert.alert("Something went wrong");
    router.back();
    return <View></View>;
  }

  useEffect(() => {
    getPosts({ userId: userContext.state.id }).then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  const headerRight = () => {
    return (
      <Ionicons.Button
        name="settings-sharp"
        size={20}
        onPress={() => router.navigate("profile/editProfile")}
        backgroundColor={"transparent"}
        iconStyle={{ marginRight: 0, color: "black" }}
        underlayColor={"transparent"}
      />
    );
  };

  const onAddInterest = async (value: string) => {
    if (userContext?.state.interests.includes(value)) return;
    const newInterests = [...userContext.state.interests, value];
    userContext?.dispatch({
      type: UserActionKind.updateInterests,
      payload: newInterests,
    });
    sheetRef.current?.close();

    //Update server
    const response = await supabase
      .from("profiles")
      .update({ interests: newInterests })
      .eq("id", userContext.state.id)
      .select();
    if (response.error)
      Alert.alert("Something went wrong", response.error.message);
  };

  const onRemoveInterest = async (value: string) => {
    let newInterests = userContext.state.interests.filter(
      (val) => value.toLowerCase() !== val.toLowerCase()
    );

    userContext?.dispatch({
      type: UserActionKind.updateInterests,
      payload: newInterests,
    });

    //Update server
    const response = await supabase
      .from("profiles")
      .update({ interests: newInterests })
      .eq("id", userContext.state.id)
      .select();
    if (response.error)
      Alert.alert("Something went wrong", response.error.message);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Your Profile",
          headerRight: headerRight,
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
                url={userContext.state.avatarUrl}
                key={userContext.state.avatarUrl}
              />
              <Text style={styles.username}>{userContext?.state.username}</Text>
            </View>

            <MapSection
              style={styles.section}
              lat={userContext.state.location.latitude}
              long={userContext.state.location.longitude}
            />
            <PostsSection posts={posts} style={styles.section} />
            <InterestsSection
              interests={userContext.state.interests}
              onAddPressed={() => sheetRef.current?.snapToIndex(0)}
              onInterestPress={onRemoveInterest}
              style={styles.section}
            />

            <View style={{ marginVertical: 10 }}>
              <FilledButton
                text="Sign Out"
                buttonStyle={{ backgroundColor: "red" }}
                onPress={() => {
                  supabase.auth.signOut();
                }}
              />
            </View>
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
  username: { fontSize: titleFonts.large, fontWeight: "medium" },
  section: { marginTop: 10 },
});

export default YourProfile;
