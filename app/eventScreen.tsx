import { Text, View, StyleSheet, ScrollView, Linking } from "react-native";
import { testEvent } from "src/model/event";
import DayCard from "src/components/DayCard";
import { pageStyle, tagColors } from "src/utils/stylingValue";
import ProfileIcon from "src/components/shared/ProfileIcon";
import { Stack } from "expo-router";

const EventScreen = () => {
  const event = testEvent;

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
          <View style={styles.hosted}>
            <Text
              style={[
                styles.h2,
                {
                  alignSelf: "center",
                  marginEnd: 10,
                },
              ]}
            >
              Hosted by
            </Text>
            <ProfileIcon id={event.hosted_by} size={50} showName={false} />
          </View>

          <Text style={styles.bodyFont}>Type: {event.type}</Text>

          <Text style={[styles.bodyFont, styles.vMT]}>
            Age Limit: {event.ageRange["min"].toString()}yr
            {event.ageRange["max"] != null
              ? ` — ${event.ageRange["max"]}yr`
              : ""}
          </Text>

          <Text style={[styles.bodyFont]}>Dress code: {event.dressCode}</Text>

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
              <Text style={styles.h1}>Bring</Text>
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

          {/*People and groups attending*/}
          {event.attendees.length > 0 && (
            <>
              <Text style={styles.h1}>Attending</Text>
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
                      showName={true}
                      key={index}
                    />
                  );
                })}
              </ScrollView>
            </>
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

          {/*Event tags*/}
          {event.tags.length > 0 && (
            <>
              <Text style={styles.h1}>Tags</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                {event.tags.map((tag, index) => {
                  let c = tagColors(tag);

                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: c.background,
                        padding: 10,
                        margin: 5,
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 25,
    fontWeight: "500",
  },
  bodyFont: {
    fontSize: 20,
  },

  vMT: {
    marginVertical: 5,
  },

  linkText: { color: "#3a87d6" },

  hosted: {
    flexDirection: "row",
    verticalAlign: "middle",
    borderRadius: 10,
    padding: 5,
  },
});

export default EventScreen;
