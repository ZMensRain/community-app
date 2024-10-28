import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import FilledButton from "~/src/components/shared/filledButton";
import { titleFonts, pageStyle } from "~/src/utils/stylingValue";

const EntryScreen = () => {
  return (
    <View style={[pageStyle, styles.container]}>
      <Text style={[styles.h1, styles.title]}>
        What would you like to create?
      </Text>

      <View
        style={{
          flex: 1,
          gap: 20,
        }}
      >
        <FilledButton
          text={"Event"}
          textStyle={styles.buttons}
          onPress={() => router.navigate("create/event/1")}
        />

        <FilledButton
          text={"Issue"}
          textStyle={styles.buttons}
          onPress={() => router.navigate("create/issueReport/1")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { alignItems: "stretch", flex: 1 },
  h1: {
    fontSize: titleFonts.large,
    fontWeight: "bold",
  },
  title: { textAlignVertical: "top", textAlign: "center", margin: 25 },
  buttons: {
    fontSize: titleFonts.large,
  },
});

export default EntryScreen;
