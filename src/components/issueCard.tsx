import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Issue } from "../model/issue";
import { colors } from "../utils/stylingValue";
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
          <Text>{getTimeSincePost(issue.createdAt)}</Text>
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
    borderColor: colors.input,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
    padding: 10,
  },
  title: { fontSize: 20 },
  description: { color: "#494949" },
});

export default IssueCard;
