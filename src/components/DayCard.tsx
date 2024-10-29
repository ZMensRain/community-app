import {
  View,
  StyleSheet,
  Text,
  Button,
  Linking,
  Pressable,
} from "react-native";
import { Day } from "../model/day";
import { titleFonts } from "../utils/stylingValue";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./iconButton";
type DayCardProps = {
  day: Day;
  index: number;
};

const DayCard = ({ day, index }: DayCardProps) => {
  const location = day.location;
  let isPath: Boolean = false;
  let isPast: Boolean = false;
  //TODO check if is path
  let date = day.date;
  let now = new Date();

  if (
    date.getFullYear() < now.getFullYear() ||
    date.getMonth() < now.getMonth() ||
    date.getDate() < now.getDate()
  )
    isPast = true;

  return (
    <View
      style={[styles.container, isPast && styles.pastBackground]}
      key={index}
    >
      <Text style={[styles.title, isPast && styles.pastText]}>
        Day {index + 1}
      </Text>
      <Text style={[styles.date, isPast && styles.pastText]}>
        {day.date.toDateString()}
      </Text>
      <Text style={[isPast && styles.pastText]}>
        Starts From: {`${day.start["hour"]}:${day.start["minute"]}`}
      </Text>
      <Text style={[isPast && styles.pastText]}>
        Ends At: {`${day.end["hour"]}:${day.end["minute"]}`}
      </Text>
      {isPath === false && (
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            Linking.openURL(`geo:${location.latitude},${location.longitude}`)
          }
        >
          <Ionicons name="location-outline" size={25} />
          <Text>See Location</Text>
        </Pressable>
      )}

      {isPath && <Button title="View Path"></Button>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9999992f",
    height: "100%",
    marginHorizontal: 5,
    padding: 10,
    aspectRatio: 0.9,
    borderRadius: 20,
  },
  pastBackground: {
    backgroundColor: "#00000021",
  },
  pastText: {
    color: "#999999",
  },
  title: { fontSize: titleFonts.small, fontWeight: "600" },
  date: {},
});

export default DayCard;
