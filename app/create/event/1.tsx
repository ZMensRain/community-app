import { View, Alert, FlatList } from "react-native";
import { useContext, useState } from "react";
import { router } from "expo-router";
import { EventCreationContext } from "src/contexts/eventCreationContext";
import TypeButton from "src/components/create/TypeButton";
import SearchBar from "src/components/create/SearchBar";
import { EventType, EventTypeEnum } from "src/model/event";
import { pageStyle } from "~/src/utils/stylingValue";
import { getSearchResults } from "~/src/utils/search";

const PickTypeScreen = () => {
  const event = useContext(EventCreationContext);
  const quickAccess = Object.keys(EventTypeEnum);
  const [searched, setSearched] = useState(String);

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
      <SearchBar onTextUpdate={(text) => setSearched(text.toString())} />
      <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          style={{ alignContent: "center" }}
          showsVerticalScrollIndicator={false}
          data={getSearchResults(searched, quickAccess)}
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
