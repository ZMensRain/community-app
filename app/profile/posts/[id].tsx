import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import EventComponent from "~/src/components/EventComponent";
import { CommunityEvent } from "~/src/model/event";
import { pageStyle } from "~/src/utils/stylingValue";
import { getPosts, supabase } from "~/src/utils/supabase";

const Posts = () => {
  const local = useLocalSearchParams();
  const userId = local["id"];
  const [posts, setPosts] = useState<CommunityEvent[]>();

  useEffect(() => {
    const call = async () => {
      let id = userId as string;
      if (userId === "me") {
        const user = (await supabase.auth.getUser()).data.user?.id;
        if (!user) {
          router.back();
          return;
        }

        id = user;
      }

      setPosts(await getPosts(id));
    };
    call();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: userId === "me" ? "My posts" : "",
        }}
      />
      <View style={pageStyle}>
        <FlatList
          data={posts}
          renderItem={(val) => {
            if (val.item instanceof CommunityEvent)
              return <EventComponent event={val.item} />;
            return <Text>PlaceHolder</Text>;
          }}
        />
      </View>
    </>
  );
};

export default Posts;
