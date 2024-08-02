import { View, Text, StyleSheet } from "react-native";

const MapSection = () => {
  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  h2: { fontSize: 24, fontWeight: "semibold" },
});

export default MapSection;
