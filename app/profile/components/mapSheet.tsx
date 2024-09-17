import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import FilledButton from "~/src/components/shared/filledButton";

const MapSheet = ({
  onSaveLocation,
}: {
  onSaveLocation: (coordinate: LatLng) => void;
}) => {
  const [location, setLocation] = useState<LatLng | null>(null);

  return (
    <BottomSheetView>
      <MapView
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}
        onPress={(event) => setLocation(event.nativeEvent.coordinate)}
      >
        {location && <Marker coordinate={location} />}
      </MapView>
      {location && (
        <View style={{ width: "100%", position: "absolute", padding: 10 }}>
          <FilledButton text="Save" onPress={() => onSaveLocation(location)} />
        </View>
      )}
    </BottomSheetView>
  );
};

export default MapSheet;
