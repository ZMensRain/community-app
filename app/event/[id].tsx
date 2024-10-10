import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { CommunityEvent } from "src/model/event";
import DayCard from "src/components/DayCard";
import {
  bodyFonts,
  titleFonts,
  pageStyle,
  tagColors,
} from "src/utils/stylingValue";
import ProfileIcon from "src/components/shared/ProfileIcon";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "~/src/utils/supabase";
import FilledButton from "~/src/components/shared/filledButton";
import { useUserContext } from "~/src/contexts/userContext";
import LoadingScreen from "~/src/components/shared/loadingScreen";
import HeaderComponent from "./components/headerCmponent";
import KitSection from "./components/kitSection";
import LinkSection from "./components/linkSection";

const EventScreen = () => {
  const [event, setEvent] = useState<CommunityEvent | null>();
  const [isAttending, setAttending] = useState<boolean>(false);
  const { id } = useLocalSearchParams();
  const userContext = useUserContext();

  useEffect(() => {
    if (!id) return;
    if (!userContext) return;
    supabase
      .from("events")
      .select()
      .eq("id", id)
      .then(async (value) => {
        const data = value.data;
        if (!data) return;

        const response = await supabase
          .from("attendingEvent")
          .select("*")
          .eq("event_id", id)
          .eq("user_id", userContext.state.id);

        if (response.data && response.data.length !== 0) setAttending(true);
        const fa = data[0];
        setEvent(CommunityEvent.fromDatabase(fa));
      });
  }, []);

  const onAttendButton = () => {
    setAttending(!isAttending);
    if (!isAttending)
      supabase.from("attendingEvent").upsert({
        user_id: userContext?.state.id,
        event_id: id as string,
        created_at: undefined,
      });
    else {
      supabase
        .from("attendingEvent")
        .delete()
        .eq("user_id", userContext?.state.id ?? "") // Scary make sure it doesn't delete all records for the event id
        .eq("event_id", id as string);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: event ? event.title : "Loading...",
          headerShown: true,
        }}
      />
      {!event ? (
        <LoadingScreen />
      ) : (
        <View style={pageStyle}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderComponent event={event} />

            {/*Description*/}
            <Text selectable={true} style={[styles.description, styles.vMT]}>
              {event.description}
            </Text>

            {/*Day cards*/}
            {event.days.length > 0 && (
              <FlatList
                horizontal={true}
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  height: 300,
                }}
                data={event.days}
                renderItem={(info) => (
                  <DayCard
                    day={info.item}
                    index={info.index}
                    key={info.index}
                  />
                )}
              />
            )}

            {/*Kit to bring section*/}
            {event.kit.length > 0 && <KitSection kit={event.kit} />}

            {/*Links for event*/}
            {event.links.length > 0 && <LinkSection links={event.links} />}

            {/*Attendees*/}
            {event.attendees.length > 0 && (
              <>
                <Text style={styles.h1}>Attendees</Text>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={event.attendees}
                  renderItem={(info) => (
                    <ProfileIcon
                      id={info.item}
                      size={42}
                      showName={false}
                      key={info.index}
                      style={{ marginHorizontal: 5 }}
                    />
                  )}
                />
              </>
            )}

            {/*Event tags*/}
            {event.tags.length > 0 && (
              <>
                <View style={[styles.vMT, styles.eventTags]}>
                  {event.tags.map((tag, index) => (
                    <FilledButton
                      text={tag.toString()}
                      key={index}
                      buttonStyle={{
                        backgroundColor: tagColors(tag).background,
                        padding: 5,
                        borderRadius: 100,
                      }}
                    />
                  ))}
                </View>
              </>
            )}
          </ScrollView>
          <View style={{ marginVertical: 10 }}>
            <FilledButton
              text={isAttending ? "I cannot make it" : "Attend"}
              onPress={onAttendButton}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: bodyFonts.medium,
  },
  h1: {
    fontSize: titleFonts.medium,
    fontWeight: "semibold",
  },
  bodyFont: {
    fontSize: bodyFonts.small,
  },
  vMT: {
    marginVertical: 5,
  },
  eventTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 5,
  },
});

export default EventScreen;
