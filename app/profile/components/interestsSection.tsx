import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tagColors } from "~/src/utils/stylingValue";

type props = { interests: string[]; onAddPressed?: () => void };

const InterestsSection = ({ interests, onAddPressed }: props) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.h2}>Your Interests</Text>
        <Pressable onPress={onAddPressed} hitSlop={20}>
          <Ionicons name="add" size={24} />
        </Pressable>
      </View>

      {interests.length > 0 ? (
        <View
          style={[
            styles.content,
            {
              justifyContent: "flex-start",
            },
          ]}
        >
          {interests.map((val, index) => {
            const colors = tagColors(val);
            return (
              <View
                style={[
                  styles.interest,
                  { backgroundColor: colors.background },
                ]}
                key={index}
              >
                <Text style={{ color: colors.foreground }}>{val}</Text>
                <Ionicons name="close" size={20} color={colors.foreground} />
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={[
            styles.content,
            {
              justifyContent: "center",
            },
          ]}
        >
          <Text style={styles.sectionFallBackText}>
            You don't have any interests saved yet. Interests help us tailor
            your feed.
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexWrap: "wrap",
    flexDirection: "row",
    overflow: "hidden",
  },
  h2: { fontSize: 24, fontWeight: "semibold" },
  interest: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  sectionFallBackText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
  },
});

export default InterestsSection;
