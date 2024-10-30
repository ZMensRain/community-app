import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Linking, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FilledButton from "~/src/components/shared/filledButton";
import LoadingScreen from "~/src/components/shared/loadingScreen";
import ProfileIcon from "~/src/components/shared/ProfileIcon";
import { Issue, IssueFromDatabase } from "~/src/model/issue";
import { margin, padding } from "~/src/utils/stylingValue";
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
        <View>
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
            enableDynamicSizing={true}
            enablePanDownToClose={false}
            index={1}
            backgroundStyle={{ backgroundColor: "#0000005a" }}
          >
            <BottomSheetView>
              <View style={{ padding: padding.small }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <ProfileIcon
                    id={{ id: issue.creatorId, group: false }}
                    showName={false}
                    size={50}
                  />
                  <Text style={{ color: "white" }}>
                    Status:{" "}
                    <Text style={{ color: issue.fixed ? "#09f96d" : "red" }}>
                      {issue.fixed ? "Resolved" : "Unresolved"}
                    </Text>
                  </Text>
                </View>

                <Text style={{ color: "white", textAlign: "justify" }}>
                  {issue.description}
                </Text>
                <View style={{ gap: 10, marginTop: margin.small }}>
                  <FilledButton
                    text={"Directions"}
                    onPress={() =>
                      Linking.openURL(
                        `geo:${issue.coordinates.latitude},${issue.coordinates.longitude}`
                      )
                    }
                  />
                  <FilledButton
                    text={issue.fixed ? "Unresolved" : "Resolved"}
                    buttonStyle={{
                      backgroundColor: issue.fixed ? "red" : "#09f96d",
                    }}
                    onPress={async () => {
                      setIssue({ ...issue, fixed: !issue.fixed });
                      await supabase.rpc("set_issue_fixed_state", {
                        is_fixed: !issue.fixed,
                        issue_id: issue.id,
                      });
                    }}
                  />
                </View>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </View>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default IssueScreen;
