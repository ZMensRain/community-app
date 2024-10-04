import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
} from "react-native";
import EventComponent from "~/src/components/EventComponent";
import IssueCard from "~/src/components/issueCard";
import { CommunityEvent } from "~/src/model/event";
import { Issue } from "~/src/model/issue";
import { pageStyle } from "~/src/utils/stylingValue";
import { getPosts, supabase } from "~/src/utils/supabase";

const Posts = () => {
  const local = useLocalSearchParams();
  const userId = local["id"];
  const [posts, setPosts] = useState<(CommunityEvent | Issue)[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const call = async () => {
      let id = userId as string;
      if (userId === "me") {
        const user = (await supabase.auth.getUser()).data.user?.id;
        if (!user) {
          router.back();
          return;
        }

        id = user;
      }

      setPosts(await getPosts(id));
      setLoading(false);
    };
    call();
  }, []);

  const renderItem = (item: ListRenderItemInfo<CommunityEvent | Issue>) => {
    if (item.item instanceof CommunityEvent)
      return <EventComponent event={item.item} />;
    return <IssueCard issue={item.item} onPress={() => {}} />;
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: userId === "me" ? "My posts" : "",
        }}
      />

      <View style={[pageStyle, loading && { justifyContent: "center" }]}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList data={posts} renderItem={renderItem} />
        )}
      </View>
    </>
  );
};

export default Posts;
