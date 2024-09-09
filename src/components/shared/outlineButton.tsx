import { ReactNode } from "react";
import { ColorValue, StyleSheet, TouchableHighlight, View } from "react-native";
import { colors } from "~/src/utils/stylingValue";

type props = {
  children?: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  borderColor?: ColorValue;
};

const OutlineButton = ({
  children,
  onPress,
  onLongPress,
  borderColor = colors.input,
}: props) => {
  return (
    <View style={[styles.container, { borderColor: borderColor }]}>
      <TouchableHighlight
        onPress={onPress}
        onLongPress={onLongPress}
        underlayColor={borderColor}
      >
        <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
          {children}
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.input,
    overflow: "hidden",
  },
});

export default OutlineButton;
