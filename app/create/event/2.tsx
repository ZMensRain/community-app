import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useContext } from "react";
import { Formik, FormikValues } from "formik";
import { SelectList } from "react-native-dropdown-select-list";
import * as Yup from "yup";
import { router } from "expo-router";

import { DressCode } from "src/model/event";
import NextButton from "src/components/create/NextButton";
import { EventCreationContext } from "src/contexts/eventCreationContext";
import { bodyFonts, inputStyle, pageStyle } from "~/src/utils/stylingValue";

const UserInputScreen = () => {
  const eventContext = useContext(EventCreationContext);
  if (eventContext === undefined) {
    Alert.alert("State is missing");
    return;
  }

  function next(values: FormikValues) {
    if (eventContext === undefined) {
      Alert.alert("State is missing");
      return;
    }

    let e = eventContext?.event;
    e.title = values["title"];
    e.description = values["description"];
    e.ageRange = {
      min: Number(values["minAge"]),
      max: isNaN(Number(values["maxAge"])) ? null : Number(values["maxAge"]),
    };
    e.dressCode = values["dressCode"];
    eventContext.setEvent(e);
    router.navigate("create/event/3");
  }

  const validation = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    minAge: Yup.number().nonNullable().positive().required(),
    maxAge: Yup.number().positive().nullable(),
  });

  return (
    <View style={pageStyle}>
      <Formik
        initialValues={{
          title: eventContext.event.title,
          description: eventContext.event.description,
          minAge: Number(eventContext.event.ageRange.min),
          maxAge: Number(eventContext.event.ageRange.max),
          dressCode: eventContext.event.dressCode,
        }}
        validationSchema={validation}
        onSubmit={next}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
        }) => (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/*Title*/}
              <View style={styles.section}>
                <Text style={styles.h2}>
                  Title <Text style={[styles.required, styles.h2]}>*</Text>
                </Text>
                <TextInput
                  placeholder="Title"
                  style={inputStyle}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
                {errors.title && (
                  <Text style={[styles.error]}>{errors.title}</Text>
                )}
              </View>

              {/*Description*/}
              <View style={styles.section}>
                <Text style={styles.h2}>
                  Description{" "}
                  <Text style={[styles.required, styles.h2]}>*</Text>
                </Text>
                <TextInput
                  placeholder="Description"
                  style={[inputStyle, { maxHeight: 200, minHeight: 100 }]}
                  numberOfLines={10}
                  textAlignVertical="top"
                  multiline={true}
                  maxLength={1000}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />
                {errors.description && (
                  <Text style={styles.error}>{errors.description}</Text>
                )}
              </View>

              {/*Age range*/}
              <View style={styles.section}>
                <Text style={styles.h2}>
                  Age Limit <Text style={[styles.required, styles.h2]}>*</Text>
                </Text>
                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    placeholder="Minimum"
                    style={[inputStyle, { flex: 0.4 }]}
                    numberOfLines={1}
                    maxLength={3}
                    keyboardType="numeric"
                    value={values.minAge.toString()}
                    onChangeText={handleChange("minAge")}
                    onBlur={handleBlur("minAge")}
                  />

                  <TextInput
                    placeholder="Maximum"
                    style={[inputStyle, { flex: 0.4 }]}
                    numberOfLines={1}
                    maxLength={3}
                    keyboardType="numeric"
                    value={values.maxAge?.toString()}
                    onChangeText={handleChange("maxAge")}
                    onBlur={handleBlur("maxAge")}
                  />
                </View>
                {errors.minAge && (
                  <Text style={styles.error}>{errors.minAge}</Text>
                )}
                {errors.maxAge && (
                  <Text style={styles.error}>{errors.maxAge}</Text>
                )}
              </View>

              {/*Dress code*/}
              <View style={styles.section}>
                <Text style={styles.h2}>
                  Dress Code <Text style={[styles.required, styles.h2]}>*</Text>
                </Text>
                <SelectList
                  setSelected={(val: DressCode) =>
                    setFieldValue("dressCode", val)
                  }
                  defaultOption={{ value: values.dressCode, key: 0 }}
                  data={Object.values(DressCode).map((value, index) => {
                    return { key: index, value: value };
                  })}
                  save="value"
                  placeholder="Dress code"
                  search={false}
                />
                {errors.dressCode && (
                  <Text style={styles.error}>{errors.dressCode}</Text>
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
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  required: { color: "#FF0000" },
  h2: { fontSize: bodyFonts.medium, fontWeight: "bold" },
  section: { marginTop: 25 },
  error: {
    color: "red",
  },
});

export default UserInputScreen;
