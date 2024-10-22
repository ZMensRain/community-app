import { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, Button } from "react-native";
import MapView, { LatLng } from "react-native-maps";

type props = {
  onPickLocation?: (locations: LatLng) => void;
};

/// TODO
const LocationPickerModal = (props: props) => {
  return (
    <BottomSheetView style={styles.container}>
      <MapView
        onPress={(v) => {
          props.onPickLocation?.(v.nativeEvent.coordinate);
        }}
        style={{ width: "100%", height: "100%" }}
      ></MapView>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default LocationPickerModal;
