import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View, Text } from "react-native";
import SearchBar from "~/src/components/create/SearchBar";

import OutlineButton from "~/src/components/shared/outlineButton";
import { EventTypeEnum } from "~/src/model/event";
import { pageStyle } from "~/src/utils/stylingValue";

const IssueTypeScreen = () => {
  const [searched, setSearched] = useState<string>("");
  const getResults = () => {
    let match: Boolean = false;

    return (
      Object.keys(EventTypeEnum)
        .filter((value) => {
          // sets match to true so the user input will not be shown if not needed
          if (!match) {
            match =
              value.toUpperCase() ===
              searched.toUpperCase().replaceAll(" ", "");
          }

          return (
            isNaN(Number(value)) &&
            value
              .toUpperCase()
              .startsWith(searched.toUpperCase().replaceAll(" ", ""))
          );
        })
        /*Adds the content the UserTyped if necessary*/
        .concat(searched !== "" && match === false ? [searched] : [])
        .map((value) => {
          // Converts PascalCase to Title Case
          return value.replace(/([A-Z])/g, " $1").trimStart();
        })
    );
  };

  const onPickType = (type: string) => {
    router.navigate("create/issueReport/2");
  };

  return (
    <View style={[pageStyle, { paddingTop: 10 }]}>
      <SearchBar onTextUpdate={(v) => setSearched(v)} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={getResults()}
        renderItem={(v) => (
          <View style={{ marginTop: 10 }}>
            <OutlineButton onPress={() => onPickType(v.item)}>
              <Text style={{ fontSize: 16 }}>{v.item}</Text>
            </OutlineButton>
          </View>
        )}
      />
    </View>
  );
};

export default IssueTypeScreen;
