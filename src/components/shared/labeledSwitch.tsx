import { View, Switch, Platform, Text } from "react-native";
import { colors, margin } from "~/src/utils/stylingValue";

const LabeledSwitch = (props: {
  label: string;
  value: boolean;
  onPress: () => void;
}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Switch
        onChange={props.onPress}
        value={props.value}
        trackColor={{ true: colors.primary }}
        thumbColor={Platform.OS === "android" ? colors.primary : undefined}
      />

      <Text style={{ marginLeft: margin.small }}>{props.label}</Text>
    </View>
  );
};

export default LabeledSwitch;
