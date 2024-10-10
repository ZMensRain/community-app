import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableHighlight,
} from "react-native";
import { CommunityEvent } from "../model/event";
import { router } from "expo-router";
import { colors, titleFonts, typeColor } from "../utils/stylingValue";
import { getTimeSincePost } from "../utils/postutils";

type EventProps = {
  event: CommunityEvent;
};

const EventComponent = (props: EventProps) => {
  const onPress = () => {
    router.navigate("event/" + props.event.id);
  };
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
        <Text style={[styles.mt5]}>{`${props.event.getLocations()[0]}`}</Text>
        <Text style={[styles.mt5, { color: "#7C7C7C" }]}>
          {props.event.tags.join(", ")}
        </Text>
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
