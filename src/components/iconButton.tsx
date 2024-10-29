import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type props = {
  icon: ReactNode;
  onPress?: () => void;
  children?: ReactNode;
};

const IconButton = ({ icon, children, onPress = () => {} }: props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icon}
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
