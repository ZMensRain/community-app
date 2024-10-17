import { Switch, View, Text, Alert, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, margin, padding, titleFonts } from "~/src/utils/stylingValue";
import { useEffect, useState } from "react";
import { getPostsParams } from "~/src/utils/supabase";
import { useUserContext } from "~/src/contexts/userContext";

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
  onUpdateFilters?: (params: getPostsParams) => void;
};

type filterBy = {
  interests: boolean;
  location: boolean;
  tags: boolean;
  types: boolean;
};

const SearchPosts = (props: props) => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<filterBy>({
    interests: false,
    location: false,
    tags: false,
    types: false,
  });
  const [filterValues, setFilterValues] = useState<getPostsParams>({
    limit: 1000,
  });
  const userContext = useUserContext();

  // Update values that are dependent on the current user
  useEffect(() => {
    setFilterValues({
      ...filterValues,
      location: userContext?.state.location,
      interests: userContext?.state.interests,
    });
  }, [userContext?.state]);

  useEffect(() => {
    let filters: getPostsParams = {};
    if (currentFilters.interests) filters.interests = filterValues.interests;
    if (currentFilters.location) filters.location = filterValues.location;
    if (currentFilters.tags) filters.tags = filterValues.tags;
    if (currentFilters.types) filters.types = filterValues.types;
    props.onUpdateFilters?.(filters);
  }, [currentFilters, filterValues]);

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
            value={currentFilters.location}
            onPress={() =>
              setCurrentFilters({
                ...currentFilters,
                location: !currentFilters.location,
              })
            }
          />
          <LabeledSwitch
            label={"Your Interests"}
            value={currentFilters.interests}
            onPress={() =>
              setCurrentFilters({
                ...currentFilters,
                interests: !currentFilters.interests,
              })
            }
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
              <Ionicons name="add" size={24} onPress={() => {}} />
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
