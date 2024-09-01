import { RefreshControl, View, ScrollView, StyleSheet } from "react-native";

import React, { useEffect } from "react";
import EventComponent from "src/components/EventComponent";

import { CommunityEvent } from "src/model/event";
import { supabase } from "~/src/utils/supabase";
import { pageStyle } from "~/src/utils/stylingValue";

function FeedTab() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [events, setEvents] = React.useState<CommunityEvent[]>([]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchEvents().then((events) => {
      setRefreshing(false);
      if (!events) return;
      setEvents(events);
    });
  }, []);

  useEffect(() => {
    fetchEvents().then((events) => {
      setRefreshing(false);
      if (!events) return;
      setEvents(events);
    });
  }, []);

  const fetchEvents = async () => {
    const e = await supabase.from("events").select();
    if (e.data === null) return;
    return e.data.map((data) => CommunityEvent.fromDatabase(data));
  };

  return (
    <View style={pageStyle}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {events.map((e) => {
          return <EventComponent key={e.id} event={e}></EventComponent>;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
  },
});

export default FeedTab;
