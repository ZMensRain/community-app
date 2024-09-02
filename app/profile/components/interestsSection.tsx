import { View, Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tagColors } from "~/src/utils/stylingValue";
import { TouchableHighlight } from "react-native-gesture-handler";

type props = {
  interests: string[];
  onAddPressed?: () => void;
  onInterestPress?: (interest: string) => void;
  style?: ViewStyle;
};

const InterestsSection = ({
  interests,
  onAddPressed,
  onInterestPress,
  style,
}: props) => {
  return (
    <View style={style}>
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
                key={index}
                style={{ margin: 5, borderRadius: 10, overflow: "hidden" }}
              >
                <TouchableHighlight onLongPress={() => onInterestPress?.(val)}>
                  <View
                    style={[
                      styles.interest,
                      { backgroundColor: colors.background },
                    ]}
                  >
                    <Text style={{ color: colors.foreground }}>{val}</Text>
                  </View>
                </TouchableHighlight>
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
    </View>
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

    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionFallBackText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
  },
});

export default InterestsSection;
