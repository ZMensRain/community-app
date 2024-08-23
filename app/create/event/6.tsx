import { Stack } from "expo-router";
import { Pressable, View, Text, ScrollView } from "react-native";
import { colors, pageStyle, tagColors } from "~/src/utils/stylingValue";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useContext, useRef, useState } from "react";

import TagBottomSheet from "~/src/components/create/TagModal";
import { EventCreationContext } from "~/src/contexts/eventCreationContext";
import FilledButton from "~/src/components/shared/filledButton";

const TagsScreen = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const context = useContext(EventCreationContext);
  if (!context) return <Text>Something went wrong</Text>;
  const [tags, setTags] = useState(context?.event.tags);
  const onTagPicked = (v: string) => {
    sheetRef.current?.close();
    if (tags.includes(v)) return;
    setTags([...tags, v]);
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Tags",
          headerRight: () => (
            <Pressable onPress={() => sheetRef.current?.snapToIndex(0)}>
              <Ionicons name={"add"} size={24} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
      <GestureHandlerRootView>
        <View style={[pageStyle, { paddingTop: 25 }]}>
          {tags.length === 0 ? (
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={{ textAlign: "center" }}>
                Tags make it easier for people to find your event. Adding tags
                is not required but highly encouraged.
              </Text>
            </View>
          ) : (
            <ScrollView>
              <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                {tags.map((v) => (
                  <FilledButton
                    key={v.toString()}
                    text={v.toString()}
                    buttonStyle={{ backgroundColor: tagColors(v).background }}
                  />
                ))}
              </View>
            </ScrollView>
          )}
          <View style={{ paddingBottom: 25 }}>
            <FilledButton text="🎉Finish🎉" />
          </View>
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={["75%", "100%"]}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          index={-1}
        >
          <TagBottomSheet onTagPicked={onTagPicked} />
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

export default TagsScreen;
