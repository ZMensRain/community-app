import { View, StyleSheet, Text, Button } from "react-native";
import { Day } from "../model/event";

type DayCardProps = {
  day: Day;
  index: number;
};

const DayCard = (props: DayCardProps) => {
  const address = props.day.locations;
  let isPath: Boolean = false;
  let isPast: Boolean = false;
  //TODO check if is path
  let date = props.day.date;
  let now = new Date();

  if (
    date.getFullYear() < now.getFullYear() ||
    date.getMonth() < now.getMonth() ||
    date.getDate() < now.getDate()
  ) {
    isPast = true;
  }

  return (
    <View
      style={[styles.container, isPast && styles.pastBackground]}
      key={props.index}
    >
      <Text style={[styles.title, isPast && styles.pastText]}>
        Day {props.index + 1}
      </Text>
      <Text style={[styles.date, isPast && styles.pastText]}>
        {props.day.date.toDateString()}
      </Text>
      <Text style={[isPast && styles.pastText]}>
        From: {`${props.day.start["hour"]}:${props.day.start["minute"]}`}
      </Text>
      <Text style={[isPast && styles.pastText]}>
        To: {`${props.day.end["hour"]}:${props.day.end["minute"]}`}
      </Text>
      {isPath === false && (
        <Text style={[isPast && styles.pastText]}>
          {address
            .map((data) => {
              if (typeof data !== "string") {
                let d = data as { lat: Number; lon: Number };
                return `${d["lat"]}, ${d["lon"]}`;
              }
              return data;
            })
            .join(" - ")}
        </Text>
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
  title: { fontSize: 20, fontWeight: "600" },
  date: {},
});

export default DayCard;
