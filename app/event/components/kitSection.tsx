import { View, Text, StyleSheet } from "react-native";
import { EventKit } from "~/src/model/event";

type props = { kit: EventKit[] };

const KitSection = ({ kit }: props) => {
  return (
    <View>
      <Text style={styles.h1}>You Should Bring</Text>
      <View>
        {kit.map((value, index) => {
          return (
            <Text style={[styles.bodyFont]} key={index}>
              • {value}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "semibold",
  },
  bodyFont: {
    fontSize: 14,
  },
});

export default KitSection;
