import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EventComponent from "~/src/components/EventComponent";
import { CommunityEvent } from "~/src/model/event";
import { colors } from "~/src/utils/stylingValue";

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
                    <View style={{ width: 300, padding: 5 }}>
                      <EventComponent event={post} key={index} />
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
    </>
  );
};

const styles = StyleSheet.create({
  h2: { fontSize: 24, fontWeight: "semibold" },
});

export default PostsSection;
