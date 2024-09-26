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
  const [markerLocation, setMarkerLocation] = useState<LatLng | null>(null);

  return (
    <View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        onPress={(v) => setMarkerLocation(v.nativeEvent.coordinate)}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {markerLocation && <Marker coordinate={markerLocation} />}
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
            if (!markerLocation) return;
            issueCreationContext.state[1]({
              ...issueCreationContext.state[0],
              coordinates: markerLocation,
            });
            issueCreationContext.onSubmit();
          }}
        />
      </View>
    </View>
  );
};

export default IssueLocationScreen;
