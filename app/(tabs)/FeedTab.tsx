import {
  RefreshControl,
  View,
  FlatList,
  ListRenderItemInfo,
  Text,
} from "react-native";

import React, { useEffect } from "react";
import EventComponent from "src/components/EventComponent";

import { CommunityEvent } from "src/model/event";
import { getPosts, getPostsParams } from "~/src/utils/supabase";
import { pageStyle } from "~/src/utils/stylingValue";
import { Issue } from "~/src/model/issue";
import IssueCard from "~/src/components/issueCard";
import { router } from "expo-router";

import SearchPosts from "~/src/components/shared/searchPosts";
import { useUserContext } from "~/src/contexts/userContext";

function FeedTab() {
  const userContext = useUserContext();
  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState<(CommunityEvent | Issue)[]>([]);
  const [filters, setFilters] = React.useState<getPostsParams>({
    limit: 1000,
    location: userContext?.state.location,
    interests: userContext?.state.interests,
  });

  const fetchPosts = async (setRefresh: boolean) => {
    const fetchedPosts = await getPosts(filters);
    if (setRefresh) setRefreshing(false);
    if (!fetchedPosts) return;
    setPosts(fetchedPosts);
  };

  const onIssuePress = (issue: Issue) => router.navigate(`issue/${issue.id}`);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts(true);
  }, [filters]);

  const renderItem = (item: ListRenderItemInfo<CommunityEvent | Issue>) => {
    if (item.item instanceof CommunityEvent)
      return <EventComponent event={item.item} />;
    return (
      <IssueCard
        issue={item.item}
        onPress={() => onIssuePress(item.item as Issue)}
      />
    );
  };

  useEffect(() => {
    fetchPosts(false);
  }, [filters]);

  return (
    <View style={pageStyle}>
      <SearchPosts filters={filters} setFilters={setFilters} />
      {posts.length === 0 && !refreshing && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>
            Nothing here? Is your community location set? Maybe try different
            filters.
          </Text>
        </View>
      )}
      {posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

export default FeedTab;
