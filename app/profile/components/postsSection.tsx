import { router } from "expo-router";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EventComponent from "~/src/components/EventComponent";
import IssueCard from "~/src/components/issueCard";
import { CommunityEvent } from "~/src/model/event";
import { Issue } from "~/src/model/issue";
import { colors } from "~/src/utils/stylingValue";

type props = {
  posts?: (CommunityEvent | Issue)[];
  style?: ViewStyle;
};

const PostsSection = ({ posts = [], style }: props) => {
  return (
    <View style={style}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.h2}>Your Posts</Text>
        {posts.length > 0 && (
          <Text
            onPress={() => router.navigate("profile/posts/me")}
            style={{ color: colors.primary }}
          >
            See All
          </Text>
        )}
      </View>

      <View
        style={{
          aspectRatio: 2,
          borderRadius: 10,
          overflow: "visible",
        }}
      >
        {posts.length > 0 ? (
          <View style={{ flex: 1 }}>
            <ScrollView
              horizontal={true}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
            >
              {posts.map((post, index) => {
                if (post instanceof CommunityEvent)
                  return (
                    <View style={{ width: 300, padding: 5 }} key={index}>
                      <EventComponent event={post} key={index} />
                    </View>
                  );
                return (
                  <View style={{ width: 300, padding: 5 }} key={index}>
                    <IssueCard issue={post} key={index} />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              You don't seem to have any posts yet. Any events or issues you
              create will appear here. Posts older than 2 years are deleted.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h2: { fontSize: 24, fontWeight: "semibold" },
});

export default PostsSection;
