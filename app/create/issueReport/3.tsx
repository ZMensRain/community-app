import { useState } from "react";
import { View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import SearchBar from "~/src/components/create/SearchBar";
import FilledButton from "~/src/components/shared/filledButton";
import { useIssueCreationContext } from "~/src/contexts/issueReportCreationContext";
import { colors } from "~/src/utils/stylingValue";

const IssueLocationScreen = () => {
  const issueCreationContext = useIssueCreationContext();
  if (!issueCreationContext) return null;
  const [locationChosen, setLocationChosen] = useState(false);

  return (
    <View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        onPress={(v) => {
          setLocationChosen(true);

          issueCreationContext.state[1]({
            ...issueCreationContext.state[0],
            coordinates: v.nativeEvent.coordinate,
          });
        }}
        showsUserLocation={true}
      >
        <Marker coordinate={issueCreationContext.state[0].coordinates} />
      </MapView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          padding: 10,
        }}
      >
        <View
          style={{ backgroundColor: colors.primaryContainer, borderRadius: 15 }}
        >
          <SearchBar />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          padding: 10,
          bottom: 0,
        }}
      >
        <FilledButton
          text="🎉Finish🎉"
          onPress={() => {
            if (!locationChosen) return;
            issueCreationContext.onSubmit();
          }}
        />
      </View>
    </View>
  );
};

export default IssueLocationScreen;
