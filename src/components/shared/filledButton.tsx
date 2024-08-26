import {
  TouchableHighlight,
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import { colors, foregroundColor } from "~/src/utils/stylingValue";

type props = {
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  onLongPress?: () => void;
};

const FilledButton = (props: props) => {
  const color =
    props.buttonStyle?.backgroundColor != undefined
      ? props.buttonStyle?.backgroundColor
      : colors.primary;
  return (
    <View style={style.container}>
      <TouchableHighlight
        activeOpacity={0.9}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
      >
        <View style={[style.button, props.buttonStyle]}>
          <Text
            style={[
              {
                color: foregroundColor(color),
                textAlign: "center",
              },
              props.textStyle,
            ]}
          >
            {props.text}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
  },
});

export default FilledButton;
