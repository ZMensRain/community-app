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
import { router } from "expo-router";

type props = {
  id: Id;
  url?: string;
  size: number;
  showName: boolean;
  onPress?: (id: string) => void;
  style?: ViewStyle;
  children?: ReactNode;
};

const NavigateTo = (id: string) => {
  router.navigate(`profile/${id}`);
};

const ProfileIcon = ({
  id,
  showName,
  size,
  children,
  onPress = NavigateTo,
  style,
  url,
}: props) => {
  const [urlFetched, setUrl] = useState(url);

  useEffect(() => {
    if (url !== undefined) return;
    getUserData(id.id).then((e) => {
      if (typeof e == "string") return;
      setUrl(e.avatar_url ?? "");
    });
  }, []);

  return (
    <Pressable onPress={() => onPress(id.id)} style={[{ width: size }, style]}>
      <View>
        {/*Profile picture or icon*/}
        <View style={styles.profile}>
          {urlFetched ? (
            <Image
              source={{ uri: urlFetched }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Ionicons
              name={id.group ? "people" : "person"}
              size={size}
              style={{}}
              adjustsFontSizeToFit={true}
            />
          )}

          <View style={styles.children}>{children}</View>
        </View>
        {/*Name*/}
        {showName && <Text style={{ textAlign: "center" }}>Hello</Text>}
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
