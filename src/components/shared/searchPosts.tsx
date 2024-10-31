import { View, Text, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  colors,
  margin,
  padding,
  tagColors,
  titleFonts,
} from "~/src/utils/stylingValue";
import { useEffect, useRef, useState } from "react";
import { getPostsParams } from "~/src/utils/supabase";
import { useUserContext } from "~/src/contexts/userContext";
import LabeledSwitch from "./labeledSwitch";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import renderBackdrop from "./sheetBackdrop";
import TagBottomSheet from "./modals/TagBottomSheet";
import TypeBottomSheet from "./modals/typeBottomSheet";
import FilledButton from "./filledButton";
import OutlineButton from "./outlineButton";

type props = {
  onUpdateFilters?: (params: getPostsParams) => void;
};

const SearchPosts = (props: props) => {
  const [showFilters, setShowFilters] = useState(false);
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
    props.onUpdateFilters?.(filterValues);
  }, [filterValues]);

  const tagModalSheetRef = useRef<BottomSheetModal>(null);
  const typeModalSheetRef = useRef<BottomSheetModal>(null);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: showFilters ? "space-between" : "flex-end",
        }}
      >
        {showFilters && (
          <>
            <LabeledSwitch
              label={"Your Location"}
              value={filterValues.location !== undefined}
              onPress={() => {
                if (filterValues.location)
                  setFilterValues({ ...filterValues, location: undefined });
                else
                  setFilterValues({
                    ...filterValues,
                    location: userContext?.state.location,
                  });
              }}
            />
            <LabeledSwitch
              label={"Interests"}
              value={filterValues.interests !== undefined}
              onPress={() => {
                if (filterValues.interests)
                  setFilterValues({ ...filterValues, interests: undefined });
                else
                  setFilterValues({
                    ...filterValues,
                    interests: userContext?.state.interests,
                  });
              }}
            />
          </>
        )}

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
            paddingVertical: padding.small,
            gap: padding.small,
          }}
        >
          <View style={{ width: "100%" }}>
            <View
              style={{
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
                  tagModalSheetRef.current?.present();
                }}
              />
            </View>
          </View>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterValues.tags}
            renderItem={(info) => (
              <View style={{ marginRight: margin.small }}>
                <FilledButton
                  text={info.item}
                  buttonStyle={{
                    backgroundColor: tagColors(info.item).background,
                  }}
                  onLongPress={() => {
                    setFilterValues({
                      ...filterValues,
                      tags: filterValues.tags?.filter((v) => v !== info.item),
                    });
                  }}
                />
              </View>
            )}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: titleFonts.small }}>Types</Text>
            <Ionicons
              name="add"
              size={24}
              onPress={() => {
                typeModalSheetRef.current?.present();
              }}
            />
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterValues.types}
            renderItem={(info) => (
              <View style={{ marginRight: margin.small }}>
                <OutlineButton
                  onLongPress={() =>
                    setFilterValues({
                      ...filterValues,
                      types: filterValues.types?.filter((v) => v !== info.item),
                    })
                  }
                >
                  <Text>{info.item}</Text>
                </OutlineButton>
              </View>
            )}
          />
        </View>
      )}
      <BottomSheetModal
        ref={tagModalSheetRef}
        snapPoints={["75%"]}
        backdropComponent={renderBackdrop}
      >
        <TagBottomSheet
          onTagPicked={(tag) => {
            setFilterValues({
              ...filterValues,
              tags: [...(filterValues.tags ?? []), tag],
            });
          }}
        />
      </BottomSheetModal>
      <BottomSheetModal
        ref={typeModalSheetRef}
        snapPoints={["75%"]}
        backdropComponent={renderBackdrop}
      >
        <TypeBottomSheet
          onTypePicked={(type) => {
            setFilterValues({
              ...filterValues,
              types: [...(filterValues.types ?? []), type],
            });
          }}
        />
      </BottomSheetModal>
    </View>
  );
};

export default SearchPosts;
