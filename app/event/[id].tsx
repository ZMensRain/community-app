import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { CommunityEvent } from "src/model/event";
import DayCard from "src/components/DayCard";
import {
  colors,
  pageStyle,
  tagColors,
  typeColor,
} from "src/utils/stylingValue";
import ProfileIcon from "src/components/shared/ProfileIcon";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "~/src/utils/supabase";
import FilledButton from "~/src/components/shared/filledButton";
import { useUserContext } from "~/src/contexts/userContext";

const EventScreen = () => {
  const [event, setEvent] = useState<CommunityEvent | null>();
  const [isAttending, setAttending] = useState<boolean>(false);
  const local = useLocalSearchParams();
  const eventId = local["id"];

  const userContext = useUserContext();

  useEffect(() => {
    if (!eventId) return;
    if (!userContext) return;
    supabase
      .from("events")
      .select()
      .eq("id", eventId)
      .then(async (value) => {
        const data = value.data;
        if (!data) return;

        const response = await supabase
          .from("attendingEvent")
          .select("*")
          .eq("event_id", eventId)
          .eq("user_id", userContext.state.id);
        if (response.data && response.data.length !== 0) {
          setAttending(true);
        }

        setEvent(CommunityEvent.fromDatabase(data[0]));
      });
  }, []);

  if (!event) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
          }}
        />
        <View style={[pageStyle, { justifyContent: "center" }]}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  const onAttendButton = () => {
    setAttending(!isAttending);
    if (!isAttending)
      supabase.from("attendingEvent").upsert({
        user_id: userContext?.state.id,
        event_id: eventId as string,
        created_at: undefined,
      });
    else {
      supabase
        .from("attendingEvent")
        .delete()
        .eq("user_id", userContext?.state.id ?? "") // Scary make sure it doesn't delete all records for the event id
        .eq("event_id", eventId as string);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: event.title,
          headerShown: true,
        }}
      />
      <View style={pageStyle}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginTop: 20,
              backgroundColor: colors.primaryContainer,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <ProfileIcon id={event.hosted_by} size={100} showName={false} />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                flex: 1,
                alignContent: "center",
              }}
            >
              <View>
                <Text
                  style={[
                    styles.top,
                    { color: typeColor(event.type.toString()) },
                    { fontWeight: "bold" },
                  ]}
                >
                  {event.type}
                </Text>
              </View>
              <View>
                <Text style={[styles.top]}>
                  Dress code:{"\n"}{" "}
                  <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                    {event.dressCode}
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={[styles.top]}>
                  Age Limit: {"\n"} {event.ageRange["min"].toString()}yr
                  {event.ageRange["max"] != null
                    ? ` — ${event.ageRange["max"]}yr`
                    : ""}
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.linkText, { fontWeight: "bold" }]}
                  onPress={() => Linking.openURL(event.ticketWebsite ?? "")}
                >
                  Tickets
                </Text>
              </View>
            </View>
          </View>

          {/*Description*/}
          <Text selectable={true} style={[styles.description, styles.vMT]}>
            {event.description}
          </Text>

          {/*Day cards*/}
          <View style={{ flex: 1 }}>
            <ScrollView
              horizontal={true}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                height: 300,
              }}
            >
              {event.days.map((value, index) => {
                return <DayCard day={value} index={index} key={index} />;
              })}
            </ScrollView>
          </View>

          {/*Kit to bring section*/}
          {event.kit.length > 0 && (
            <View>
              <Text style={styles.h1}>You Should Bring</Text>
              <View>
                {event.kit.map((value, index) => {
                  return (
                    <Text style={[styles.bodyFont]} key={index}>
                      • {value}
                    </Text>
                  );
                })}
              </View>
            </View>
          )}

          {/*Links for event*/}
          {event.links.length > 0 && (
            <View style={styles.vMT}>
              <Text style={styles.h1}>Links</Text>
              {event.links.map((link, index) => {
                return (
                  <Text
                    onPress={() => Linking.openURL(link.toString())}
                    key={index}
                    style={[styles.linkText, styles.bodyFont]}
                  >
                    {link}
                  </Text>
                );
              })}
            </View>
          )}

          {/*Attendees*/}
          {event.attendees.length > 0 && (
            <>
              <Text style={styles.h1}>Attendees</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {event.attendees.map((id, index) => {
                  return (
                    <ProfileIcon
                      id={id}
                      size={42}
                      showName={false}
                      key={index}
                    />
                  );
                })}
              </ScrollView>
            </>
          )}

          {/*Event tags*/}
          {event.tags.length > 0 && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  gap: 5,
                }}
              >
                {event.tags.map((tag, index) => {
                  const c = tagColors(tag);

                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: c.background,
                        padding: 5,
                        borderRadius: 100,
                      }}
                    >
                      <Text style={{ color: c.foreground }}>{tag}</Text>
                    </View>
                  );
                })}
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
    </>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
  },
  h1: {
    fontSize: 24,
    fontWeight: "semibold",
  },
  bodyFont: {
    fontSize: 14,
  },
  top: {
    fontSize: 14,
  },
  vMT: {
    marginVertical: 5,
  },

  linkText: { color: colors.primary },
});

export default EventScreen;
