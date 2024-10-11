import { View, Text, StyleSheet, ViewStyle } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { titleFonts } from "~/src/utils/stylingValue";
type props = {
  style?: ViewStyle;
  lat: number;
  long: number;
  title?: string;
};
const MapSection = ({ style, lat, long, title = "Your Area" }: props) => {
  return (
    <View style={style}>
      <Text style={styles.h2}>{title}</Text>
      <View
        style={{
          aspectRatio: 1,

          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <MapView
          style={{ width: "100%", height: "100%" }}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          showsBuildings={true}
          scrollEnabled={false}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker coordinate={{ latitude: lat, longitude: long }} />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h2: { fontSize: titleFonts.medium, fontWeight: "semibold" },
});

export default MapSection;
