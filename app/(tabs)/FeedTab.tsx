import {
  RefreshControl,
  View,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

import React, { useEffect } from "react";
import EventComponent from "src/components/EventComponent";

import { CommunityEvent } from "src/model/event";
import { getPosts, getPostsParams } from "~/src/utils/supabase";
import { pageStyle } from "~/src/utils/stylingValue";
import { Issue } from "~/src/model/issue";
import IssueCard from "~/src/components/issueCard";
import { router } from "expo-router";
import { useUserContext } from "~/src/contexts/userContext";
import SearchPosts from "~/src/components/shared/searchPosts";

function FeedTab() {
  const userContext = useUserContext();
  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState<(CommunityEvent | Issue)[]>([]);
  const [filters, setFilters] = React.useState<getPostsParams>({
    location: userContext?.state.location,
    limit: 1000,
  });

  const fetchPosts = async (setRefresh: boolean) => {
    const posts = await getPosts(filters);
    if (setRefresh) setRefreshing(false);
    if (!posts) return;
    setPosts(posts);
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
      <SearchPosts onUpdateFilters={(filters) => setFilters(filters)} />
      <FlatList
        data={posts}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default FeedTab;
