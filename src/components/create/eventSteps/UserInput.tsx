import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { dressCode } from "../../../model/event";
import NextButton from "../components/NextButton";
import { useEffect, useState } from "react";

type props = {
  onNextPressed?: (
    title: String,
    description: String,
    minAge: Number,
    maxAge: Number | null
  ) => void;
};

const UserInputStep = (props: props) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [minAge, setMinAge] = useState(0);
  let [maxAge, setMaxAge] = useState<Number | null>(null);

  let [errors, setErrors] = useState<{
    title: String | null;
    description: String | null;
    minAge: String | null;
    maxAge: String | null;
    dressCode: String | null;
  } | null>({
    title: null,
    description: null,
    minAge: null,
    maxAge: null,
    dressCode: null,
  });

  function submit() {
    validate();
    if (errors === null) {
      return;
    }
    props.onNextPressed?.(title, description, minAge, maxAge);
  }

  function validate() {}

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 35 }}>
        {/*Title*/}
        <View>
          <Text style={styles.h2}>
            Title <Text style={[styles.required, styles.h2]}>*</Text>
          </Text>
          <TextInput
            placeholder="Title"
            style={[styles.input]}
            onChangeText={(value) => {
              setTitle(value);
            }}
            value={title}
          />

          <Text style={[styles.error]}>{errors?.title}</Text>
        </View>

        {/*Description*/}
        <View style={styles.section}>
          <Text style={styles.h2}>
            Description <Text style={[styles.required, styles.h2]}>*</Text>
          </Text>
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={(value) => {
              setDescription(value);
            }}
            style={[styles.input, { maxHeight: 200 }]}
            numberOfLines={10}
            multiline={true}
            maxLength={1000}
          />
          {errors?.description !== null && (
            <Text style={[styles.error]}>{errors?.description}</Text>
          )}
        </View>

        {/*Age limit*/}
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
              style={[styles.input, { flex: 0.4 }]}
              numberOfLines={1}
              maxLength={3}
              keyboardType="numeric"
              value={minAge.toString()}
              onChangeText={(value) => {
                if (isNaN(Number(value))) {
                  return;
                }
                setMinAge(Number(value));
              }}
            />

            <TextInput
              placeholder="Maximum"
              style={[styles.input, { flex: 0.4 }]}
              numberOfLines={1}
              maxLength={3}
              keyboardType="numeric"
              value={maxAge?.toString()}
              onChangeText={(value) => {
                if (isNaN(Number(value))) {
                  return;
                }
                setMaxAge(Number(value));
              }}
            />
          </View>
          {(errors?.maxAge !== null || errors?.maxAge !== null) && (
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {errors?.maxAge !== null && (
                <Text style={[styles.error]}>{errors?.minAge}</Text>
              )}
              {errors?.maxAge !== null && (
                <Text style={[styles.error]}>{errors?.maxAge}</Text>
              )}
            </View>
          )}
        </View>

        {/*Dress code*/}
        <View style={styles.section}>
          <Text style={styles.h2}>
            Dress Code <Text style={[styles.required, styles.h2]}>*</Text>
          </Text>
          <SelectList
            setSelected={() => {}}
            data={Object.values(dressCode).map((value, index) => {
              return { key: index, value: value };
            })}
            save="value"
            placeholder="Dress code"
            search={false}
          />
          {errors?.dressCode != null && (
            <Text style={styles.error}>{errors?.dressCode}</Text>
          )}
        </View>
      </ScrollView>
      <View style={{ paddingBottom: 35 }}>
        <NextButton onPressed={submit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 25 },
  required: { color: "#FF0000" },
  h2: { fontSize: 16, fontWeight: "bold" },
  input: {
    backgroundColor: "#E4E4E4",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 25,
  },
  section: { marginTop: 25 },
  error: {
    color: "red",
  },
});

export default UserInputStep;
