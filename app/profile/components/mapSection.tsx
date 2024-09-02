import { View, Text, StyleSheet, ViewStyle } from "react-native";
type props = {
  style?: ViewStyle;
};
const MapSection = ({ style }: props) => {
  return (
    <View style={style}>
      <Text style={styles.h2}>Your Area</Text>
      <View
        style={{
          aspectRatio: 1,
          borderColor: "red",
          borderWidth: 1,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Text>TODO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h2: { fontSize: 24, fontWeight: "semibold" },
});

export default MapSection;
