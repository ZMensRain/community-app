import { View, Text, StyleSheet } from "react-native";
import { CommunityEvent } from "~/src/model/event";

const PostsSection = ({ posts = [] }: { posts?: CommunityEvent[] }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.h2}>Your Posts</Text>
        <Text>See All</Text>
      </View>
      <View
        style={{
          aspectRatio: 1,

          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {posts.length > 0 ? (
          <Text>TODO</Text>
        ) : (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              You don't seem to have any posts yet. Any events or issues you
              create will appear here. Posts older than 2 years are deleted.
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  h2: { fontSize: 24, fontWeight: "semibold" },
});

export default PostsSection;
