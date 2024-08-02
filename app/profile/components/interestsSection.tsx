import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tagColors } from "~/src/utils/stylingValue";

const InterestsSection = ({ interests }: { interests: string[] }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.h2}>Your Interests</Text>
        <Ionicons name="add" size={24} />
      </View>

      <View
        style={{
          justifyContent: interests.length > 0 ? "flex-start" : "center",
          flexWrap: "wrap",
          flexDirection: "row",

          overflow: "hidden",
        }}
      >
        {interests.length > 0 ? (
          interests.map((val, index) => (
            <View
              style={[
                styles.interest,
                { backgroundColor: tagColors(val).background },
              ]}
              key={index}
            >
              <Text style={{ color: tagColors(val).foreground }}>{val}</Text>
              <Ionicons
                name="close"
                size={20}
                color={tagColors(val).foreground}
              />
            </View>
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              fontSize: 15,
            }}
          >
            You don't have any interests saved yet. Interests help us tailor
            your feed.
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  h2: { fontSize: 24, fontWeight: "semibold" },
  interest: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
});

export default InterestsSection;
