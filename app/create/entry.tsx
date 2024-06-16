import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const EntryScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.h1,
          {
            textAlignVertical: "top",
            textAlign: "center",
            margin: 50,
          },
        ]}
      >
        What would you like to create?
      </Text>
      <View style={{ flex: 2 }}>
        <Pressable
          onPress={() => {
            router.navigate("create/event");
          }}
          style={(state) => {
            return [
              styles.button,
              { backgroundColor: state.pressed ? "#2976c5" : "#3a87d6" },
            ];
          }}
        >
          <Text style={styles.buttonText}>Event</Text>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={(state) => {
            return [
              styles.button,
              { backgroundColor: state.pressed ? "#2976c5" : "#3a87d6" },
            ];
          }}
        >
          <Text style={styles.buttonText}>Issue</Text>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={(state) => {
            return [
              styles.button,
              { backgroundColor: state.pressed ? "#2976c5" : "#3a87d6" },
            ];
          }}
        >
          <Text style={styles.buttonText}>Group</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1 },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginHorizontal: 50,
    marginVertical: 10,
    width: "100%",
  },
  buttonText: { color: "#fff", fontSize: 25 },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default EntryScreen;
