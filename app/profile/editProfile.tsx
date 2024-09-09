import { Stack } from "expo-router";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  AlertButton,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileCamera from "~/src/components/ProfileCameraCircle";
import { pageStyle } from "~/src/utils/stylingValue";
import FilledButton from "~/src/components/shared/filledButton";

const EditProfile = () => {
  const headerRight = () => {
    return (
      <Ionicons
        name="checkmark"
        size={24}
        onPress={() => console.log("wwww")}
      />
    );
  };

  const deleteAccount = () => {
    Alert.prompt(
      "Delete Your Account",
      "Enter the code sent to your email to continue",
      [
        { text: "Cancel", style: "cancel", isPreferred: true },
        { text: "Delete Account", style: "destructive" },
      ],
      "plain-text",
      "",
      "default",
      {}
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerRight: headerRight }} />
      <View style={pageStyle}>
        <View style={[{ alignItems: "center" }, styles.section]}>
          <ProfileCamera />
        </View>

        <Text style={styles.label}>
          Username <Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput placeholder="Username" style={styles.input} />

        <Text style={styles.label}>Email</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            (user email)
          </Text>
          <Ionicons
            name="pencil"
            size={20}
            allowFontScaling={false}
            onPress={() => {}}
          />
        </View>

        <Text style={{ fontSize: 22 }}>Your Area</Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderColor: "#E0E0E0",
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
          }}
        >
          <Ionicons name="map" size={24} />
          <Text style={{ textAlignVertical: "center" }}>Set Location</Text>
        </Pressable>
        <View
          style={[
            {
              paddingHorizontal: "25%",
              paddingVertical: 10,

              justifyContent: "space-between",
              flex: 1,
            },
            styles.section,
          ]}
        >
          <FilledButton text="Reset Password" />
          <FilledButton
            text="Delete Account"
            buttonStyle={{ backgroundColor: "red" }}
            onPress={deleteAccount}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: { marginTop: 10 },
  label: { fontSize: 16, fontWeight: "bold" },
  input: {
    marginVertical: 7.5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default EditProfile;
