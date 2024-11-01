import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
  Text,
} from "react-native";
import EventComponent from "~/src/components/EventComponent";
import IssueCard from "~/src/components/issueCard";
import SearchPosts from "~/src/components/shared/searchPosts";
import { CommunityEvent } from "~/src/model/event";
import { Issue } from "~/src/model/issue";
import { pageStyle } from "~/src/utils/stylingValue";
import { getPosts, getPostsParams, supabase } from "~/src/utils/supabase";

const Posts = () => {
  const local = useLocalSearchParams();
  const userId = local["id"];
  const [posts, setPosts] = useState<(CommunityEvent | Issue)[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<getPostsParams>({});
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

      setPosts(await getPosts({ ...filters, userId: id }));
      setLoading(false);
    };
    call();
  }, [filters]);

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
          <>
            <SearchPosts filters={filters} setFilters={setFilters} />
            {posts.length === 0 && !loading && (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ textAlign: "center" }}>
                  Nothing here? Is your community location set? Maybe try
                  different filters.
                </Text>
              </View>
            )}
            {posts.length > 0 && (
              <FlatList data={posts} renderItem={renderItem} />
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Posts;
