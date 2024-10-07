import { Stack } from "expo-router";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileCamera from "~/src/components/ProfileCameraCircle";
import { pageStyle } from "~/src/utils/stylingValue";
import FilledButton from "~/src/components/shared/filledButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { supabase } from "~/src/utils/supabase";
import MapSheet from "./components/mapSheet";
import { UserActionKind, useUserContext } from "~/src/contexts/userContext";
import { LatLng } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { decode } from "base64-arraybuffer";

const EditProfile = () => {
  const userContext = useUserContext();
  if (!userContext) return;
  const headerRight = () => {
    const edited = username != userContext?.state.username;

    const updateUsername = () => {
      if (!userContext) return;
      supabase
        .from("profiles")
        .update({ username: username })
        .eq("id", userContext.state.id);

      userContext.dispatch({
        type: UserActionKind.updateUsername,
        payload: username,
      });
    };

    return (
      edited && <Ionicons name="checkmark" size={24} onPress={updateUsername} />
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
  const updateUserLocation = (coordinate: LatLng) => {
    if (!userContext) return;

    sheetRef.current?.close();
    userContext.dispatch({
      type: UserActionKind.updateLocation,
      payload: coordinate,
    });
    supabase.auth.getUser().then((user) => {
      if (!user.data.user) return;

      supabase
        .from("profiles")
        .update({
          location: `POINT(${coordinate.longitude} ${coordinate.latitude})`,
        })
        .eq("id", user.data.user?.id);
    });
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const updateProfilePicture = async () => {
    const resizeImage = async (uri: string) => {
      if (!uri) return "";
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500 } }],
        {
          compress: 0.5,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );
      return manipResult.base64;
    };

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (result.canceled) return;
    if (!result.assets[0].base64) return;
    const ig = await resizeImage(result.assets[0].uri);

    const r = await supabase.storage.from("profile-pictures").upload(
      `${userContext.state.id}/pfp.jpeg`,
      decode(ig ?? ""),

      {
        contentType: "image/png",
        cacheControl: "3600",
        upsert: true,
      }
    );

    console.log(r);

    if (r.error) {
      Alert.alert("Error", r.error.message);
      return;
    }

    const url = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(r.data?.path!).data.publicUrl;

    let t = await supabase
      .from("profiles")
      .update({ avatar_url: url.toString() })
      .eq("id", userContext.state.id);
    console.log(t);
  };

  const sheetRef = useRef<BottomSheet>(null);

  const [username, setUsername] = useState(userContext.state.username);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerRight: headerRight }} />
      <GestureHandlerRootView style={pageStyle}>
        <View style={pageStyle}>
          <View style={[{ alignItems: "center" }, styles.section]}>
            <ProfileCamera
              onPress={() => updateProfilePicture()}
              id={userContext.state.id}
            />
          </View>

          <Text style={styles.label}>
            Username <Text style={{ color: "red" }}>*</Text>
          </Text>

          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={(v) => setUsername(v)}
          />

          <Text style={styles.label}>Email</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {userContext.state.email}
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
            onPress={() => {
              sheetRef.current?.snapToIndex(0);
            }}
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
        <BottomSheet
          ref={sheetRef}
          snapPoints={["75%", "100%"]}
          enablePanDownToClose={true}
          index={-1}
          backdropComponent={renderBackdrop}
        >
          <MapSheet onSaveLocation={updateUserLocation} />
        </BottomSheet>
      </GestureHandlerRootView>
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
