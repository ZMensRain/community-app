import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Issue } from "../model/issue";
import { colors, titleFonts } from "../utils/stylingValue";
import { getTimeSincePost } from "../utils/postutils";

type props = { issue: Issue; onPress?: () => void };
const IssueCard = ({ issue, onPress }: props) => {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={colors.input}
      onPress={onPress}
    >
      <View>
        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <Text style={{ color: colors.subText }}>
            {getTimeSincePost(issue.createdAt)}
          </Text>
        </View>
        <Text style={styles.title}>{issue.type}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {issue.description}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderColor: colors.input,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
    padding: 10,
  },
  title: { fontSize: titleFonts.small },
  description: { color: colors.subText },
});

export default IssueCard;
