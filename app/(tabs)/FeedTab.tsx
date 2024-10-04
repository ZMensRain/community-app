import {
  RefreshControl,
  View,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

import React, { useEffect } from "react";
import EventComponent from "src/components/EventComponent";

import { CommunityEvent } from "src/model/event";
import { supabase } from "~/src/utils/supabase";
import { pageStyle } from "~/src/utils/stylingValue";
import { Issue, IssueFromDatabase } from "~/src/model/issue";
import IssueCard from "~/src/components/issueCard";

function FeedTab() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState<(CommunityEvent | Issue)[]>([]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts().then((events) => {
      setRefreshing(false);
      if (!events) return;
      setPosts(events);
    });
  }, []);

  useEffect(() => {
    fetchPosts().then((events) => {
      setRefreshing(false);
      if (!events) return;
      setPosts(events);
    });
  }, []);

  const fetchPosts = async () => {
    const e = await supabase.from("events").select();
    const i = await supabase.from("issues").select();

    if (e.data === null) return;
    if (i.data === null) return;

    let data = [
      ...e.data.map((data) => CommunityEvent.fromDatabase(data)),
      ...i.data.map((data) => IssueFromDatabase(data)),
    ];

    return data;
  };

  const renderItem = (item: ListRenderItemInfo<CommunityEvent | Issue>) => {
    if (item.item instanceof CommunityEvent)
      return <EventComponent event={item.item} />;
    return <IssueCard issue={item.item} />;
  };

  return (
    <View style={pageStyle}>
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
