import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

type props = {
  icon: IconDefinition;
  iconSize?: number;
  onPress?: () => void;
  children?: ReactNode;
};

const IconButton = ({
  iconSize = 24,
  icon,
  children,
  onPress = () => {},
}: props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FontAwesomeIcon
        icon={icon}
        size={iconSize}
        style={{ alignSelf: "center" }}
      />
      <View style={{ paddingLeft: 6 }}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "#aaaaaa",
    borderWidth: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: 6,
  },
});

export default IconButton;
