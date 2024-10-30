import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import LoadingScreen from "~/src/components/shared/loadingScreen";
import { useUserContext } from "~/src/contexts/userContext";
import { CommunityEvent } from "~/src/model/event";
import { Issue } from "~/src/model/issue";
import { padding, typeColor } from "~/src/utils/stylingValue";
import { getPosts } from "~/src/utils/supabase";

function MapTab() {
  const userContext = useUserContext();
  const [posts, setPosts] = useState<(CommunityEvent | Issue)[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      getPosts({ location: userContext?.state.location }).then((posts) =>
        setPosts(posts)
      );
    }, [])
  );

  if (posts === null) return <LoadingScreen />;
  if (!userContext) return <LoadingScreen error="No User context" />;
  return (
    <View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}
        initialRegion={{
          latitude: userContext?.state.location.latitude,
          longitude: userContext?.state.location.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {posts.map((post) => {
          if (post instanceof CommunityEvent) {
            return (
              <Marker
                coordinate={post.days[0].location}
                key={post.id}
                onPress={() => router.navigate(`event/${post.id}`)}
              >
                <Callout>
                  <View>
                    <Text>{post.title}</Text>
                    <Text style={{ color: typeColor(post.type) }}>
                      {post.type}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          }
          return (
            <Marker
              coordinate={post.coordinates}
              key={post.id}
              onPress={() => router.navigate(`issue/${post.id}`)}
            >
              <Callout>
                <View style={{ padding: padding.small }}>
                  <Text>{post.type}</Text>
                  <Text style={{ color: post.fixed ? "green" : "red" }}>
                    {post.fixed ? "Resolved" : "Unresolved"}
                  </Text>
                  {post.description.length > 0 && (
                    <Text>{post.description}</Text>
                  )}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

export default MapTab;
