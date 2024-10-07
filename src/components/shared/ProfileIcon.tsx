import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  Image,
} from "react-native";

import { Id } from "~/src/model/event";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ReactNode, useEffect, useState } from "react";
import { getUserData } from "~/src/utils/supabase";

type props = {
  id: Id;
  url?: string;
  size: number;
  showName: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  children?: ReactNode;
};

const ProfileIcon = (props: props) => {
  const [url, setUrl] = useState(props.url != undefined ? props.url : "");

  useEffect(() => {
    if (props.url) return;
    getUserData(props.id.id).then((e) => {
      if (typeof e == "string") return;
      setUrl(e.avatar_url ?? "");
    });
  }, []);

  return (
    <Pressable
      onPress={props.onPress}
      style={[{ width: props.size }, props.style]}
    >
      <View>
        {/*Profile picture or icon*/}
        <View style={styles.profile}>
          {url.length > 0 ? (
            <Image
              source={{ uri: url }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Ionicons
              name={props.id.group ? "people" : "person"}
              size={props.size}
              style={{}}
              adjustsFontSizeToFit={true}
            />
          )}

          <View style={styles.children}>{props.children}</View>
        </View>
        {/*Name*/}
        {props.showName && <Text style={{ textAlign: "center" }}>Hello</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  profile: {
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: "#eeeeee",
    borderWidth: 2,
    overflow: "hidden",

    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  children: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default ProfileIcon;
