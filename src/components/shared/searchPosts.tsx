import { Switch, View, Text, Alert, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, margin, padding, titleFonts } from "~/src/utils/stylingValue";
import { useState } from "react";
import { LatLng } from "react-native-maps";

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

type props = {
  location: boolean;
  interests: boolean;
  tags?: string[];
  types?: string[];
  onLocationSwitched: () => void;
  onTypesChange: (type: string) => void;
  onTagsChange: (tag: string) => void;
  onInterestsSwitched: () => void;
};

const SearchPosts = (props: props) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Ionicons.Button
          name="filter"
          size={24}
          onPress={() => setShowFilters(!showFilters)}
          style={{ paddingRight: 0 }}
          color={"black"}
          backgroundColor={"transparent"}
          underlayColor={colors.input}
        />
      </View>

      {showFilters && (
        <View
          style={{
            width: "100%",
            paddingTop: padding.small,
            flexDirection: "row",
            gap: padding.small,
            paddingVertical: padding.medium,
            flexWrap: "wrap",
          }}
        >
          <LabeledSwitch
            label={"Your Location"}
            value={props.location}
            onPress={props.onLocationSwitched}
          />
          <LabeledSwitch
            label={"Your Interests"}
            value={props.interests}
            onPress={() => props.onInterestsSwitched}
          />
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: titleFonts.small }}>Tags</Text>
              <Ionicons
                name="add"
                size={24}
                onPress={() => {
                  //TODO Find better solution
                  Alert.prompt("Tag", "", (v) => {
                    props.onTagsChange(v);
                  });
                }}
              />
            </View>
          </View>
          <View style={{ width: "100%", height: 10 }}></View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: titleFonts.small }}>Types</Text>
              <Ionicons name="add" size={24} onPress={() => {}} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchPosts;
