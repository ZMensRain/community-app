import { View, Alert, FlatList } from "react-native";
import { useContext, useState } from "react";
import { router } from "expo-router";

import { EventCreationContext } from "src/contexts/eventCreationContext";
import TypeButton from "src/components/create/TypeButton";
import SearchBar from "src/components/create/SearchBar";
import { EventType, EventTypeEnum } from "src/model/event";
import { pageStyle } from "~/src/utils/stylingValue";

const PickTypeScreen = () => {
  const event = useContext(EventCreationContext);

  const [searched, setSearched] = useState(String);

  function getTypesText() {
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
  }

  function next(type: EventType) {
    if (event === undefined) {
      Alert.alert("State is missing");
      return;
    }
    let e = event?.event;
    e.type = type;
    event.setEvent(e);
    router.navigate("create/event/2");
  }

  return (
    <View style={pageStyle}>
      <SearchBar
        onTextUpdate={(newText) => {
          setSearched(newText.toString());
        }}
      />
      <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          style={{ alignContent: "center" }}
          showsVerticalScrollIndicator={false}
          data={getTypesText()}
          renderItem={(info) => (
            <TypeButton
              text={info.item}
              key={info.index}
              onPress={(type) => next(type.toString())}
            />
          )}
        />
      </View>
    </View>
  );
};

export default PickTypeScreen;
