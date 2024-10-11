import { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, Button } from "react-native";
import { LatLng } from "react-native-maps";

type props = {
  onPickLocation?: (locations: LatLng) => void;
};

/// TODO
const LocationPickerModal = (props: props) => {
  return (
    <BottomSheetView style={styles.container}>
      <Text>Unimplemented</Text>
      <Button
        onPress={() => {
          props.onPickLocation?.({ latitude: 0, longitude: 0 });
        }}
        title={"Set to 0, 0 for now"}
      ></Button>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});

export default LocationPickerModal;
