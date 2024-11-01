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
  filters: getPostsParams;
  setFilters: React.Dispatch<React.SetStateAction<getPostsParams>>;
};

const SearchPosts = ({ filters, setFilters }: props) => {
  const userContext = useUserContext();
  const [showFilters, setShowFilters] = useState(false);

  // Update values that are dependent on the current user
  useEffect(() => {
    setFilters({
      ...filters,
      location: userContext?.state.location,
      interests: userContext?.state.interests,
    });
  }, [userContext?.state]);

  const tagModalSheetRef = useRef<BottomSheetModal>(null);
  const typeModalSheetRef = useRef<BottomSheetModal>(null);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <>
          <LabeledSwitch
            label={"Your Location"}
            value={filters.location !== undefined}
            onPress={() => {
              if (filters.location)
                setFilters({ ...filters, location: undefined });
              else
                setFilters({
                  ...filters,
                  location: userContext?.state.location,
                });
            }}
          />
          <LabeledSwitch
            label={"Interests"}
            value={filters.interests !== undefined}
            onPress={() => {
              if (filters.interests)
                setFilters({ ...filters, interests: undefined });
              else
                setFilters({
                  ...filters,
                  interests: userContext?.state.interests,
                });
            }}
          />
        </>

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
            data={filters.tags}
            renderItem={(info) => (
              <View style={{ marginRight: margin.small }}>
                <FilledButton
                  text={info.item}
                  buttonStyle={{
                    backgroundColor: tagColors(info.item).background,
                  }}
                  onLongPress={() => {
                    setFilters({
                      ...filters,
                      tags: filters.tags?.filter((v) => v !== info.item),
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
            data={filters.types}
            renderItem={(info) => (
              <View style={{ marginRight: margin.small }}>
                <OutlineButton
                  onLongPress={() =>
                    setFilters({
                      ...filters,
                      types: filters.types?.filter((v) => v !== info.item),
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
            setFilters({
              ...filters,
              tags: [...(filters.tags ?? []), tag],
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
            setFilters({
              ...filters,
              types: [...(filters.types ?? []), type],
            });
          }}
        />
      </BottomSheetModal>
    </View>
  );
};

export default SearchPosts;
