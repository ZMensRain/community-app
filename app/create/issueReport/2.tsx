import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View, StyleSheet, Pressable, Keyboard } from "react-native";
import FilledButton from "~/src/components/shared/filledButton";
import { useIssueCreationContext } from "~/src/contexts/issueReportCreationContext";
import { pageStyle } from "~/src/utils/stylingValue";

const IssueDescriptionScreen = () => {
  const issueCreationContext = useIssueCreationContext();
  if (!issueCreationContext) return null;
  const [description, setDescription] = useState("");

  return (
    <Pressable style={pageStyle} onPress={() => Keyboard.dismiss()}>
      <TextInput
        style={[styles.input, { minHeight: 200 }]}
        placeholder="Description"
        autoCorrect={true}
        multiline={true}
        maxLength={1000}
        onChangeText={(v) => setDescription(v)}
      />
      <View
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
          padding: 10,
          alignItems: "stretch",
        }}
      >
        <FilledButton
          text={description.length > 0 ? "Next" : "Skip"}
          onPress={() => {
            router.push("create/issueReport/3");
            issueCreationContext.state[1]({
              ...issueCreationContext.state[0],
              description: description,
            });
          }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 7.5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default IssueDescriptionScreen;
