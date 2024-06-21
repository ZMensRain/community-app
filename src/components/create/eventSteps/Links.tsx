import { StyleSheet, View, Text, TextInput } from "react-native";
import NextButton from "../components/NextButton";
import { useState } from "react";

type props = { onNextButton: (links: String[], ticketLink: String) => void };

const LinksStep = (props: props) => {
  let [socialLinks, setSocialLinks] = useState<String[]>([]);
  let [ticketLink, setTicketLink] = useState("");
  let [otherLinks, setOtherLinks] = useState<String[]>([]);

  function submit() {
    if (validate() === false) {
      return;
    }
    props.onNextButton(socialLinks.concat(otherLinks), ticketLink);
  }
  function validate() {
    return false;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Links</Text>
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Ticket Website</Text>
        <TextInput
          style={styles.input}
          placeholder="Ticket Website"
          onChangeText={(value) => {
            setTicketLink(value);
          }}
        ></TextInput>
      </View>

      <View style={styles.section}>
        <Text style={styles.inputLabel}>
          Socials
          <Text style={{ fontWeight: "regular", fontSize: 14 }}>
            {" (0/10)"}
          </Text>
        </Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder={`Link1,\nLink2,\nLink3,\n...`}
          multiline={true}
          numberOfLines={10}
          onChangeText={(value) => {
            let links = value.split(",", 10);
            setSocialLinks(links);
          }}
        ></TextInput>
      </View>

      <View style={styles.section}>
        <Text style={styles.inputLabel}>
          Other Links
          <Text style={{ fontWeight: "regular", fontSize: 14 }}>
            {" (0/10)"}
          </Text>
        </Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder={`Link1,\nLink2,\nLink3,\n...`}
          multiline={true}
          numberOfLines={10}
          onChangeText={(value) => {
            let links = value.split(",", 10);
            setOtherLinks(links);
          }}
        ></TextInput>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 35 }}>
        <NextButton onPressed={submit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25 },
  pageTitle: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 25,
  },
  input: {
    backgroundColor: "#E4E4E4",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 25,
  },
  inputLabel: { fontSize: 16, fontWeight: "bold" },
  section: { marginTop: 30 },
});

export default LinksStep;
