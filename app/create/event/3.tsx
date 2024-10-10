import { FormikValues, useFormik } from "formik";
import { useContext } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { router } from "expo-router";

import { EventCreationContext } from "src/contexts/eventCreationContext";
import NextButton from "src/components/create/NextButton";
import { bodyFonts, inputStyle, pageStyle } from "~/src/utils/stylingValue";

const LinksScreen = () => {
  const eventContext = useContext(EventCreationContext);
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
    otherLinks: Yup.array().of(Yup.string().url("Must be valid urls")),
  });

  const formik = useFormik({
    initialValues: {
      ticketWebsite: eventContext.event.ticketWebsite,
      otherLinks: eventContext.event.links,
    },
    validationSchema: validation,
    validateOnChange: true,
    onSubmit: next,
  });
  return (
    <View style={pageStyle}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Ticket Website</Text>
          <TextInput
            style={inputStyle}
            placeholder="Ticket Website"
            onChangeText={formik.handleChange("ticketWebsite")}
            onBlur={formik.handleBlur("ticketWebsite")}
            keyboardType="url"
            value={formik.values.ticketWebsite ?? ""}
          />
          {formik.errors.ticketWebsite && (
            <Text style={styles.error}>{formik.errors.ticketWebsite}</Text>
          )}
        </View>

        {/*Other links section*/}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Other Links</Text>
          <TextInput
            style={inputStyle}
            placeholder={`Link1,\nLink2,\nLink3,\n...`}
            multiline={true}
            numberOfLines={10}
            keyboardType="url"
            onChangeText={(value) =>
              formik.setFieldValue(
                "otherLinks",
                value.replaceAll("\n", "").replaceAll(" ", "").split(",")
              )
            }
            onBlur={formik.handleBlur("otherLinks")}
            value={formik.values.otherLinks.join(",") ?? ""}
          />
          {formik.errors.otherLinks && (
            <Text style={styles.error}>{formik.errors.otherLinks}</Text>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          marginBottom: 25,
        }}
      >
        <NextButton
          onPressed={() => formik.handleSubmit()}
          text={
            formik.values.ticketWebsite?.trim() == "" &&
            formik.values.otherLinks.length == 0
              ? "Skip"
              : "Next"
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: { fontSize: bodyFonts.medium, fontWeight: "bold" },
  section: { marginTop: 30 },
  error: {
    color: "red",
  },
});

export default LinksScreen;
