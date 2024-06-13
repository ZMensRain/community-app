import { Text, View, StyleSheet, ScrollView, Linking } from "react-native";
import { CommunityEvent, testEvent } from "../src/model/event";
import DayCard from "../src/components/DayCard";
import { tagColors } from "../src/utils/tagColor";
import ProfileIcon from "../src/components/profileIcon";

const EventScreen = () => {
  const event = testEvent;

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.h1}>{event.title}</Text>
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
          <View style={styles.circle}></View>
        </View>
        <Text style={styles.bodyFont}>Type: {event.type}</Text>
        <Text style={[styles.ageLimit, styles.bodyFont]}>
          Age Limit: {event.ageRange["min"].toString()}yr
          {event.ageRange["max"] != null ? ` — ${event.ageRange["max"]}yr` : ""}
        </Text>
        <Text style={[styles.dressCode, styles.bodyFont]}>
          Dress code: {event.dressCode}
        </Text>
        <Text selectable={true} style={styles.description}>
          {event.description}
        </Text>

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

        <View>
          <Text style={styles.h1}>Bring</Text>
          <View>
            {event.kit.map((value) => {
              return (
                <Text style={[styles.bringItem, styles.bodyFont]}>
                  • {value}
                </Text>
              );
            })}
          </View>
        </View>
        {event.attendingIds.length > 0 && (
          <>
            <Text style={styles.h1}>Attending</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {event.attendingIds.map((id, index) => {
                return <ProfileIcon id={id} key={index} />;
              })}
            </ScrollView>
          </>
        )}

        {event.links.length > 0 && (
          <View style={styles.linkContainer}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    fontSize: 20,
  },

  circle: {
    backgroundColor: "#aaaaaa",
    borderRadius: 100,
    aspectRatio: 1,
    width: "20%",
    overflow: "hidden",
  },

  description: {
    marginVertical: 10,
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
  ageLimit: {},
  linkContainer: {
    marginTop: 10,
  },
  linkText: { color: "#3a87d6" },
  dressCode: {},
  bringItem: {},
  hosted: {
    flexDirection: "row",
    verticalAlign: "middle",
    borderRadius: 10,
    padding: 5,
  },
});

export default EventScreen;
