import { Text, View, StyleSheet, ScrollView } from "react-native";
import { CommunityEvent, testEvent } from "../src/model/event";
import DayCard from "../src/components/DayCard";

const EventScreen = () => {
  const event = testEvent;

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>{event.title}</Text>
          <Text>Hosted by</Text>
          <View style={styles.circle}></View>
        </View>
        <Text>Type: {event.type}</Text>
        <Text>
          Age Limit: {event.ageRange["min"].toString()}
          {event.ageRange["max"] != null ? ` —— ${event.ageRange["max"]}` : ""}
        </Text>
        <View style={styles.description}>
          <Text selectable={true}>{event.description}</Text>
        </View>
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
            {/*TODO make day component*/}
            {event.days.map((value, index) => {
              return <DayCard day={value} index={index} key={index} />;
            })}
          </ScrollView>
        </View>

        <Text>Dress code: {event.dressCode}</Text>
        <View>
          <Text style={styles.title}>Bring</Text>
          <View>
            {event.kit.map((value) => {
              return <Text>•{value}</Text>;
            })}
          </View>
        </View>
        {/*TODO*/}
        <ScrollView horizontal={true}>
          {event.attendingIds.map((id, index) => {
            return <Text key={index}>TODO:{id}</Text>;
          })}
        </ScrollView>
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
    overflow: "hidden",
  },
  description: {
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default EventScreen;
