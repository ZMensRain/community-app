import { View, Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { bodyFonts, titleFonts, tagColors } from "~/src/utils/stylingValue";
import FilledButton from "~/src/components/shared/filledButton";

type props = {
  interests: string[];
  onAddPressed?: () => void;
  onInterestPress?: (interest: string) => void;
  style?: ViewStyle;
  title?: string;
};

const InterestsSection = ({
  interests,
  onAddPressed,
  onInterestPress,
  style,
  title = "Your Interests",
}: props) => {
  return (
    <View style={style}>
      <View style={styles.container}>
        <Text style={styles.h2}>{title}</Text>
        <Pressable onPress={onAddPressed} hitSlop={20}>
          <Ionicons name="add" size={24} />
        </Pressable>
      </View>

      {interests.length > 0 ? (
        <View style={styles.content}>
          {interests.map((val, index) => (
            <View key={index} style={{ margin: 5 }}>
              <FilledButton
                text={val}
                buttonStyle={{
                  ...styles.interest,
                  backgroundColor: tagColors(val).background,
                }}
                onLongPress={() => onInterestPress?.(val)}
              />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.content}>
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
  h2: { fontSize: titleFonts.medium, fontWeight: "semibold" },
  interest: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionFallBackText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: bodyFonts.small,
    width: "100%",
  },
});

export default InterestsSection;
