import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { CommunityEvent } from "../model/event";
import { router } from "expo-router";
import {
  colors,
  tagColors,
  titleFonts,
  typeColor,
} from "../utils/stylingValue";
import { getTimeSincePost } from "../utils/postutils";

type EventProps = {
  event: CommunityEvent;
};

const EventComponent = (props: EventProps) => {
  const onPress = () => {
    router.navigate("event/" + props.event.id);
  };
  const locations = props.event.getLocations();
  const dates = props.event.days
    .sort((a, b) => b.date.getUTCDate() - a.date.getUTCDate())
    .map((day) => day.date);
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={colors.input}
      onPress={onPress}
    >
      <View>
        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <Text style={{ color: colors.subText }}>
            {getTimeSincePost(props.event.createdAt)}
          </Text>
        </View>

        <Text style={styles.title}>{props.event.title}</Text>

        <Text
          style={[
            { color: typeColor(props.event.type), fontWeight: "bold" },
            styles.mt5,
          ]}
        >
          {props.event.type}
        </Text>

        <Text>
          {dates[0].toDateString()}{" "}
          {dates.length > 1
            ? " - " + dates[dates.length - 1].toDateString()
            : ""}
        </Text>

        <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
          {props.event.tags.map((tag) => {
            const colors = tagColors(tag);
            return (
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: colors.background,
                  padding: 5,
                }}
                key={tag}
              >
                <Text
                  style={{
                    color: colors.foreground,
                  }}
                >
                  {tag}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    overflow: "hidden",
    padding: 10,
    marginVertical: 5,
    borderColor: colors.input,
  },
  title: { fontSize: titleFonts.small },
  mt5: {
    marginTop: 5,
  },
});

export default EventComponent;
