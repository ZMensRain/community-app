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
import {
  bodyFonts,
  titleFonts,
  inputStyle,
  margin,
  padding,
  pageStyle,
} from "~/src/utils/stylingValue";
import FilledButton from "~/src/components/shared/filledButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { supabase } from "~/src/utils/supabase";
import MapSheet from "./components/mapSheet";
import { UserActionKind, useUserContext } from "~/src/contexts/userContext";
import { LatLng } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { decode } from "base64-arraybuffer";
import renderBackdrop from "~/src/components/shared/sheetBackdrop";

const getNewAvatar = async () => {
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
  return await resizeImage(result.assets[0].uri);
};

const EditProfile = () => {
  const userContext = useUserContext();
  if (!userContext) return;
  const sheetRef = useRef<BottomSheet>(null);
  const [username, setUsername] = useState(userContext.state.username);

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
    Alert.alert(
      "Delete Your Account",
      "Are you sure? This action cannot be undone and will delete all your posts.",
      [
        { text: "Cancel", style: "cancel", isPreferred: true },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: async (v) => {
            let f = await supabase.rpc("deleteUser");
            supabase.auth.signOut();
          },
        },
      ]
    );
  };

  const updateUserLocation = (coordinate: LatLng) => {
    if (!userContext) return;

    sheetRef.current?.close();
    userContext.dispatch({
      type: UserActionKind.updateLocation,
      payload: coordinate,
    });

    supabase
      .from("profiles")
      .update({
        location: `POINT(${coordinate.longitude} ${coordinate.latitude})`,
      })
      .eq("id", userContext.state.id)
      .then();
  };

  const updateProfilePicture = async () => {
    const base64Data = await getNewAvatar();
    if (!base64Data) return;

    const response = await supabase.storage.from("profile-pictures").upload(
      `${userContext.state.id}/avatar/${Math.floor(Math.random() * 100)}.jpeg`,
      decode(base64Data),

      {
        contentType: "image/png",
        cacheControl: "3600",
        upsert: true,
      }
    );

    if (response.error) {
      Alert.alert("Error", response.error.message);
      return;
    }

    const url = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(response.data?.path!).data.publicUrl;

    await supabase
      .from("profiles")
      .update({ avatar_url: url.toString() })
      .eq("id", userContext.state.id);

    userContext.dispatch({
      type: UserActionKind.updateAvatarUrl,
      payload: url,
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerRight: headerRight }} />
      <GestureHandlerRootView style={pageStyle}>
        <View style={{ flex: 1 }}>
          <View style={[{ alignItems: "center" }, styles.section]}>
            <ProfileCamera
              onPress={() => updateProfilePicture()}
              id={userContext.state.id}
              url={userContext.state.avatarUrl}
              key={userContext.state.avatarUrl}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>
              Username <Text style={{ color: "red" }}>*</Text>
            </Text>

            <TextInput
              placeholder="Username"
              style={inputStyle}
              value={username}
              onChangeText={(v) => setUsername(v)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Email</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: titleFonts.small,
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
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Your Area</Text>

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
          </View>

          <View style={[styles.buttonSection, styles.section]}>
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
          <BottomSheetView>
            <MapSheet onSaveLocation={updateUserLocation} />
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  section: { marginTop: margin.small },
  label: { fontSize: bodyFonts.medium, fontWeight: "bold" },
  buttonSection: {
    paddingHorizontal: "25%",
    paddingVertical: padding.small,
    justifyContent: "space-between",
    flex: 1,
  },
});

export default EditProfile;
