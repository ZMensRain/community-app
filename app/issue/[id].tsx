import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import ProfileIcon from "~/src/components/shared/ProfileIcon";
import { Issue, IssueFromDatabase } from "~/src/model/issue";
import { padding } from "~/src/utils/stylingValue";
import { supabase } from "~/src/utils/supabase";

const IssueScreen = () => {
  const { id } = useLocalSearchParams();
  const [issue, setIssue] = useState<Issue | null>(null);

  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (typeof id !== "string") return;
    supabase
      .from("issues")
      .select("*")
      .eq("id", id)
      .limit(1)
      .then((response) => {
        //TODO: Handle error somehow
        if (response.error !== null) return;
        const issueData = response.data[0];

        const fetchedIssue: Issue = IssueFromDatabase(issueData);
        setIssue(fetchedIssue);
      });
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: issue === null ? "loading..." : issue.type.toString(),
        }}
      />
      {issue ? (
        <GestureHandlerRootView>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: issue.coordinates.latitude,
              longitude: issue.coordinates.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
          >
            <Marker coordinate={issue.coordinates} />
          </MapView>

          <BottomSheet
            ref={sheetRef}
            snapPoints={["5%", "25%", "50%"]}
            enablePanDownToClose={false}
            index={1}
            backgroundStyle={{ backgroundColor: "#0000005a" }}
          >
            <BottomSheetView>
              <View style={{ padding: padding.small }}>
                <ProfileIcon
                  id={{ id: issue.creatorId, group: false }}
                  showName={false}
                  size={50}
                />
                <Text style={{ color: "white", textAlign: "justify" }}>
                  {issue.description}
                </Text>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default IssueScreen;
