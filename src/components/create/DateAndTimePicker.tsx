import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

import React from "react";
import { View, Platform, StyleSheet, Text } from "react-native";
import IconButton from "../iconButton";
import { titleFonts } from "~/src/utils/stylingValue";

const today = new Date();

type props = {
  label: string;
  onValueSet: (newValue: Date | undefined) => void;
  value: Date;
  mode: "date" | "time";
  error: string | null;
  icon: IconDefinition;
};

const DateAndTimePicker = ({
  mode,
  error,
  icon,
  label,
  value,
  onValueSet,
}: props) => {
  const p = {
    value: value,
    onChange: (_: any, date: Date | undefined) => onValueSet(date),
    mode: mode,
    minimumDate: mode == "date" ? today : undefined,
  };

  const androidButtonPressed = () => DateTimePickerAndroid.open(p);

  return (
    <View style={styles.mt10}>
      <Text style={styles.label}>
        {label}
        <Text style={{ color: "red" }}>*</Text>
      </Text>

      <IconButton
        icon={icon}
        onPress={Platform.OS === "android" ? androidButtonPressed : undefined}
      >
        {Platform.OS === "ios" ? (
          <DateTimePicker
            value={p.value}
            mode={p.mode}
            onChange={p.onChange}
            minimumDate={p.minimumDate}
          />
        ) : (
          <Text>
            {mode == "date"
              ? value.toDateString()
              : `${value.getHours()}:${value.getMinutes()}`}
          </Text>
        )}
      </IconButton>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: titleFonts.small, fontWeight: "semibold" },
  mt10: {
    marginTop: 10,
  },
  error: { color: "red" },
});

export default DateAndTimePicker;
