import { View } from "react-native";
import MapView from "react-native-maps";

function map() {
  return (
    <View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}
      ></MapView>
    </View>
  );
}

export default map;
