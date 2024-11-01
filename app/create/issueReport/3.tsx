import { useState } from "react";
import { View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

import FilledButton from "~/src/components/shared/filledButton";
import { useIssueCreationContext } from "~/src/contexts/issueReportCreationContext";
import { useUserContext } from "~/src/contexts/userContext";

const IssueLocationScreen = () => {
  const userContext = useUserContext();
  const issueCreationContext = useIssueCreationContext();
  if (!issueCreationContext) return null;
  const [locationChosen, setLocationChosen] = useState(false);

  function handleTap(v: MapPressEvent) {
    if (!issueCreationContext) {
      return;
    }
    setLocationChosen(true);

    issueCreationContext.state[1]({
      ...issueCreationContext.state[0],
      coordinates: v.nativeEvent.coordinate,
    });
  }

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: userContext?.state.location.latitude ?? 0,
          longitude: userContext?.state.location.longitude ?? 0,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={{ width: "100%", height: "100%" }}
        onPress={handleTap}
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
      ></View>
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
