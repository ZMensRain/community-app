import { Stack } from "expo-router";
import { Pressable, View, Text, ScrollView } from "react-native";
import { colors, pageStyle, tagColors } from "~/src/utils/stylingValue";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { useContext, useRef, useState } from "react";

import TagBottomSheet from "~/src/components/create/TagModal";
import { EventCreationContext } from "~/src/contexts/eventCreationContext";
import FilledButton from "~/src/components/shared/filledButton";
import renderBackdrop from "~/src/components/shared/sheetBackdrop";

const TagsScreen = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const context = useContext(EventCreationContext);
  if (!context) return <Text>Something went wrong</Text>;
  const [tags, setTags] = useState(context?.event.tags);

  const onAddTag = (v: string) => {
    sheetRef.current?.close();
    if (tags.includes(v)) return;
    setTags([...tags, v]);
  };

  const onRemoveTag = (v: string) => {
    setTags(tags.filter((value) => value !== v));
  };

  const onFinish = () => {
    let e = context.event;
    e.tags = tags;
    context.setEvent(e);
    context.createEvent();
  };

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
      <GestureHandlerRootView style={[pageStyle]}>
        {tags.length === 0 ? (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ textAlign: "center" }}>
              Tags make it easier for people to find your event. Adding tags is
              not required but highly encouraged.
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
                  onLongPress={() => onRemoveTag(v.toString())}
                />
              ))}
            </View>
          </ScrollView>
        )}
        <View style={{ paddingBottom: 25 }}>
          <FilledButton text="🎉Finish🎉" onPress={onFinish} />
        </View>

        <BottomSheet
          ref={sheetRef}
          snapPoints={["75%", "100%"]}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          index={-1}
        >
          <TagBottomSheet onTagPicked={onAddTag} />
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

export default TagsScreen;
