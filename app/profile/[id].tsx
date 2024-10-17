import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { getPosts, getUserData, supabase } from "src/utils/supabase";
import { Stack, useLocalSearchParams } from "expo-router";
import { titleFonts, pageStyle } from "~/src/utils/stylingValue";
import ProfileIcon from "~/src/components/shared/ProfileIcon";
import { MapSection, PostsSection, InterestsSection } from "./components";
import FilledButton from "~/src/components/shared/filledButton";
import { CommunityEvent } from "~/src/model/event";
import { Issue } from "~/src/model/issue";
import LoadingScreen from "~/src/components/shared/loadingScreen";
import { User } from "~/src/contexts/userContext";

const ViewProfile = () => {
  const [posts, setPosts] = useState<(CommunityEvent | Issue)[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (typeof id != "string") return;
    getUserData(id).then(async (data) => {
      if (typeof data === "string") return;
      const posts = await getPosts({ userId: id, limit: 10 });
      let u: User = {
        avatarUrl: data.avatar_url ?? "",
        discriminator: "user",
        email: "",
        id: id,
        interests: data.interests,
        postIds: [],
        username: data.username ?? "",
        location: data.location,
      };
      setUser(u);
      setPosts(posts);
    });
  }, []);

  if (posts === null || user === null) return <LoadingScreen />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: user.username,
        }}
      />

      <View style={pageStyle}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ alignItems: "center", width: "100%" }}>
            <ProfileIcon
              id={{ id: user.id, group: false }}
              size={125}
              showName={false}
            />
            <Text style={styles.username}>{user.username}</Text>
          </View>

          <MapSection
            style={styles.section}
            lat={user.location.latitude}
            long={user.location.longitude}
            title="Area"
          />
          <PostsSection
            posts={posts}
            style={styles.section}
            title="Posts"
            id={id as string}
          />
          <InterestsSection
            interests={user.interests}
            style={styles.section}
            title="Interests"
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
    </>
  );
};

const styles = StyleSheet.create({
  username: { fontSize: titleFonts.large, fontWeight: "medium" },
  section: { marginTop: 10 },
});

export default ViewProfile;
