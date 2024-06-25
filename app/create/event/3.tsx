import { Formik, FormikValues } from "formik";
import { useContext } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { EventCreationContext } from "../../../src/contexts/eventCreationContext";
import NextButton from "../../../src/components/create/NextButton";

import * as Yup from "yup";
import { router } from "expo-router";

const LinksScreen = () => {
  let eventContext = useContext(EventCreationContext);
  if (eventContext === undefined) {
    Alert.alert("State is missing");
    return;
  }

  function next(values: FormikValues) {
    let e = eventContext!.event;
    e.ticketWebsite = values["ticketWebsite"];
    e.links = values["otherLinks"];
    eventContext?.setEvent(e);
    router.navigate("create/event/4");
  }

  const validation = Yup.object().shape({
    ticketWebsite: Yup.string()
      .url("Must be a valid url https://example.com or http://example.com")
      .notRequired()
      .nullable(),
    otherLinks: Yup.array().of(Yup.string().url()),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Links</Text>
      <Formik
        initialValues={{
          ticketWebsite: eventContext.event.ticketWebsite,
          otherLinks: eventContext.event.links,
        }}
        onSubmit={next}
        validationSchema={validation}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          values,
        }) => (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.section}>
                <Text style={styles.inputLabel}>Ticket Website</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ticket Website"
                  onChangeText={handleChange("ticketWebsite")}
                  onBlur={handleBlur("ticketWebsite")}
                  keyboardType="url"
                  value={values.ticketWebsite ?? ""}
                />
                {errors.ticketWebsite && (
                  <Text style={styles.error}>{errors.ticketWebsite}</Text>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.inputLabel}>Other Links</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Link1,\nLink2,\nLink3,\n...`}
                  multiline={true}
                  numberOfLines={10}
                  keyboardType="url"
                  onChangeText={(value) =>
                    setFieldValue(
                      "otherLinks",
                      value.replaceAll("\n", "").replaceAll(" ", "").split(",")
                    )
                  }
                  onBlur={handleBlur("otherLinks")}
                  value={values.otherLinks.join(",") ?? ""}
                />
                {errors.otherLinks && (
                  <Text style={styles.error}>{errors.otherLinks}</Text>
                )}
              </View>
            </ScrollView>
            <View
              style={{
                marginBottom: 25,
              }}
            >
              <NextButton onPressed={() => handleSubmit()} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25, backgroundColor: "#fff" },
  pageTitle: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 7.5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    borderWidth: 1,
  },
  inputLabel: { fontSize: 16, fontWeight: "bold" },
  section: { marginTop: 30 },
  error: {
    color: "red",
  },
});

export default LinksScreen;
