import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import EventComponent from "~/src/components/EventComponent";
import IssueCard from "~/src/components/issueCard";
import { CommunityEvent } from "~/src/model/event";
import { Issue } from "~/src/model/issue";
import { colors } from "~/src/utils/stylingValue";

type props = {
  posts?: (CommunityEvent | Issue)[];
  style?: ViewStyle;
};

const renderItem = (info: ListRenderItemInfo<CommunityEvent | Issue>) => {
  if (info.item instanceof CommunityEvent)
    return (
      <View style={{ width: 300, padding: 5 }} key={info.index}>
        <EventComponent event={info.item} key={info.index} />
      </View>
    );
  return (
    <View style={{ width: 300, padding: 5 }} key={info.index}>
      <IssueCard issue={info.item} key={info.index} />
    </View>
  );
};

const PostsSection = ({ posts = [], style }: props) => {
  return (
    <View style={style}>
      <View style={styles.header}>
        <Text style={styles.h2}>Your Posts</Text>
        {posts.length && (
          <Text
            onPress={() => router.navigate("profile/posts/me")}
            style={{ color: colors.primary }}
          >
            See All
          </Text>
        )}
      </View>

      <View style={styles.content}>
        {posts.length > 0 ? (
          <FlatList
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={posts}
            renderItem={renderItem}
          />
        ) : (
          <Text style={styles.fallbackText}>
            You don't seem to have any posts yet. Any events or issues you
            create will appear here. Posts older than 2 years are deleted.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h2: { fontSize: 24, fontWeight: "semibold" },
  content: {
    aspectRatio: 2,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
  },
  fallbackText: {
    textAlign: "center",
    fontSize: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PostsSection;
